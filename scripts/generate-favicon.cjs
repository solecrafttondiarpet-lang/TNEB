const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const toIco = require('to-ico');
const { findChevronWidth } = require('./favicon-crop.cjs');

const publicDir = path.join(__dirname, '..', 'public');
const logoPath = path.join(publicDir, 'logo.png');
const masterPath = path.join(publicDir, 'favicon-master.png');

async function createMasterBuffer() {
  const meta = await sharp(logoPath).metadata();
  const cropWidth = await findChevronWidth(logoPath, meta.height);

  const masterBuffer = await sharp(logoPath)
    .extract({ left: 0, top: 0, width: cropWidth, height: meta.height })
    .resize(512, 512, {
      fit: 'fill',
      kernel: 'lanczos3',
    })
    .png({ compressionLevel: 9 })
    .toBuffer();

  await sharp(masterBuffer).toFile(masterPath);
  return { masterBuffer, cropWidth, height: meta.height };
}

async function renderSize(masterBuffer, size) {
  let pipeline = sharp(masterBuffer).resize(size, size, {
    kernel: 'lanczos3',
    fit: 'fill',
  });

  if (size <= 32) {
    pipeline = pipeline.sharpen({ sigma: 0.35, m1: 0.45, m2: 0.3 });
  }

  return pipeline.png({ compressionLevel: 9, effort: 10 }).toBuffer();
}

async function main() {
  const { masterBuffer, cropWidth, height } = await createMasterBuffer();
  const sizes = [16, 32, 48, 64, 180, 192, 512];
  const rendered = {};

  for (const size of sizes) {
    rendered[size] = await renderSize(masterBuffer, size);
    await fs.promises.writeFile(path.join(publicDir, `favicon-${size}.png`), rendered[size]);
  }

  await fs.promises.writeFile(path.join(publicDir, 'apple-touch-icon.png'), rendered[180]);

  const ico = await toIco([rendered[16], rendered[32], rendered[48]]);
  await fs.promises.writeFile(path.join(publicDir, 'favicon.ico'), ico);

  const base64 = rendered[512].toString('base64');
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="Think Nexora">
  <image width="32" height="32" href="data:image/png;base64,${base64}"/>
</svg>`;

  await fs.promises.writeFile(path.join(publicDir, 'favicon.svg'), svg);
  console.log(`Generated favicons (crop ${cropWidth}x${height} -> 512px master)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
