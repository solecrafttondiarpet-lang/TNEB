const sharp = require('sharp');
const path = require('path');

async function findChevronWidth(logoPath, height) {
  const { data, info } = await sharp(logoPath)
    .extract({ left: 0, top: 0, width: height, height })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const row = Math.floor(height / 2);
  let lastIconX = 0;

  for (let x = 0; x < height; x++) {
    const i = (row * height + x) * info.channels;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const isWhiteText = r > 210 && g > 210 && b > 210;
    const isColor = Math.max(r, g, b) - Math.min(r, g, b) > 35 && Math.max(r, g, b) > 80;

    if (isColor && !isWhiteText) {
      lastIconX = x;
    }
  }

  return Math.min(height, Math.max(Math.round(lastIconX * 1.02) + 6, Math.round(height * 0.68)));
}

module.exports = { findChevronWidth };
