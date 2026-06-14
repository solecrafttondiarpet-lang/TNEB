import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements AfterViewInit, OnDestroy {
  constructor(private readonly cdr: ChangeDetectorRef) {}

  @ViewChild('scratchCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('revealStack', { static: true }) stackRef!: ElementRef<HTMLDivElement>;
  @ViewChild('particlesContainer', { static: true }) particlesRef!: ElementRef<HTMLDivElement>;

  icons = [
    { content: '💡', label: 'Innovative Ideas' },
    { content: '🚀', label: 'Growth & Impact' },
    { content: '🌍', label: 'Global Vision' },
    { content: '🧩', label: 'Problem Solving' },
    { content: '🏗️', label: 'Brand Architects' },
    { content: '🧠', label: 'Tech Minds' },
    { content: '🎨', label: 'Creative Hub' },
    { content: '🤝', label: 'Collaboration' },
  ];

  revealComplete = false;

  private ctx: CanvasRenderingContext2D | null = null;
  private isDrawing = false;
  private resizeObserver: ResizeObserver | null = null;
  private lastScratchPoint: { x: number; y: number } | null = null;
  private strokeCount = 0;
  private readonly revealThreshold = 0.12;
  private readonly minStrokesToReveal = 5;

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!this.ctx) {
      return;
    }

    this.resizeObserver = new ResizeObserver(() => this.resizeAndRedraw());
    this.resizeObserver.observe(this.stackRef.nativeElement);

    canvas.addEventListener('mousedown', this.onMouseDown);
    canvas.addEventListener('mouseup', this.onPointerUp);
    canvas.addEventListener('mouseleave', this.onPointerUp);
    canvas.addEventListener('mousemove', this.onMouseMove);
    canvas.addEventListener('touchstart', this.onTouchStart, { passive: false });
    canvas.addEventListener('touchend', this.onTouchEnd, { passive: false });
    canvas.addEventListener('touchcancel', this.onTouchEnd, { passive: false });
    canvas.addEventListener('touchmove', this.onTouchMove, { passive: false });

    const sizingImage = new Image();
    sizingImage.src = 'assets/thinknexora1.jpeg';
    sizingImage.onload = () => {
      const stack = this.stackRef.nativeElement;
      stack.style.aspectRatio = `${sizingImage.naturalWidth} / ${sizingImage.naturalHeight}`;
      this.resizeAndRedraw();
    };

    requestAnimationFrame(() => this.resizeAndRedraw());
  }

  ngOnDestroy(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) {
      return;
    }

    this.resizeObserver?.disconnect();
    canvas.removeEventListener('mousedown', this.onMouseDown);
    canvas.removeEventListener('mouseup', this.onPointerUp);
    canvas.removeEventListener('mouseleave', this.onPointerUp);
    canvas.removeEventListener('mousemove', this.onMouseMove);
    canvas.removeEventListener('touchstart', this.onTouchStart);
    canvas.removeEventListener('touchend', this.onTouchEnd);
    canvas.removeEventListener('touchcancel', this.onTouchEnd);
    canvas.removeEventListener('touchmove', this.onTouchMove);
  }

  private readonly onMouseDown = (event: MouseEvent): void => {
    if (this.revealComplete) {
      return;
    }
    this.isDrawing = true;
    this.lastScratchPoint = null;
    this.strokeCount++;
    this.scratchAt(event);
  };

  private readonly onPointerUp = (): void => {
    if (!this.isDrawing) {
      return;
    }
    this.isDrawing = false;
    this.lastScratchPoint = null;
    this.checkReveal();
    if (!this.revealComplete && this.strokeCount >= this.minStrokesToReveal) {
      this.completeReveal();
    }
  };

  private scratchRadius(): number {
    const stack = this.stackRef.nativeElement;
    return Math.max(95, Math.min(stack.clientWidth, stack.clientHeight) * 0.19);
  }

  private readonly onMouseMove = (event: MouseEvent): void => {
    this.scratchAt(event);
  };

  private readonly onTouchStart = (event: TouchEvent): void => {
    event.preventDefault();
    if (this.revealComplete) {
      return;
    }
    this.isDrawing = true;
    this.lastScratchPoint = null;
    this.strokeCount++;
    if (event.touches[0]) {
      this.scratchAt(event.touches[0]);
    }
  };

  private readonly onTouchEnd = (event: TouchEvent): void => {
    event.preventDefault();
    this.onPointerUp();
  };

  private readonly onTouchMove = (event: TouchEvent): void => {
    event.preventDefault();
    if (event.touches[0]) {
      this.scratchAt(event.touches[0]);
    }
  };

  private resizeAndRedraw(): void {
    if (this.revealComplete || !this.ctx) {
      return;
    }

    const stack = this.stackRef.nativeElement;
    const canvas = this.canvasRef.nativeElement;
    const width = Math.round(stack.clientWidth);
    const height = Math.round(stack.clientHeight);

    if (width < 1 || height < 1) {
      return;
    }

    canvas.width = width;
    canvas.height = height;
    this.drawScratchCard(width, height);
  }

  private drawScratchCard(width: number, height: number): void {
    if (!this.ctx) {
      return;
    }

    const ctx = this.ctx;
    const cx = width / 2;
    const cy = height / 2;
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, width, height);

    const foil = ctx.createLinearGradient(0, 0, width, height);
    foil.addColorStop(0, '#b8924a');
    foil.addColorStop(0.22, '#f0dfa0');
    foil.addColorStop(0.45, '#fff4c8');
    foil.addColorStop(0.55, '#e8c96e');
    foil.addColorStop(0.78, '#f5e6a8');
    foil.addColorStop(1, '#a67c3a');
    ctx.fillStyle = foil;
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.globalAlpha = 0.22;
    for (let i = -height; i < width + height; i += 8) {
      ctx.strokeStyle = i % 16 === 0 ? 'rgba(255,255,255,0.9)' : 'rgba(180,140,60,0.5)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + height * 0.55, height);
      ctx.stroke();
    }
    ctx.restore();

    ctx.save();
    ctx.globalAlpha = 0.28;
    for (let i = -width; i < width + height; i += 14) {
      const stripe = ctx.createLinearGradient(i, 0, i + 8, height);
      stripe.addColorStop(0, 'rgba(255,255,255,0)');
      stripe.addColorStop(0.5, 'rgba(255,255,255,0.95)');
      stripe.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = stripe;
      ctx.fillRect(i, 0, 8, height);
    }
    ctx.restore();

    const shine = ctx.createRadialGradient(cx * 0.85, cy * 0.55, 0, cx, cy, Math.max(width, height) * 0.65);
    shine.addColorStop(0, 'rgba(255,255,255,0.5)');
    shine.addColorStop(0.35, 'rgba(255,255,255,0.08)');
    shine.addColorStop(1, 'rgba(0,0,0,0.05)');
    ctx.fillStyle = shine;
    ctx.fillRect(0, 0, width, height);

    const inset = 12;
    ctx.strokeStyle = 'rgba(255,255,255,0.45)';
    ctx.lineWidth = 2;
    ctx.strokeRect(inset, inset, width - inset * 2, height - inset * 2);
    ctx.strokeStyle = 'rgba(160,120,50,0.35)';
    ctx.lineWidth = 1;
    ctx.strokeRect(inset + 5, inset + 5, width - (inset + 5) * 2, height - (inset + 5) * 2);

    const coinR = Math.min(width, height) * 0.16;
    this.drawGpayMedallion(ctx, cx, cy, coinR);
    this.drawFoilSparkles(ctx, cx, cy, coinR, width, height);
  }

  private drawGpayMedallion(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number): void {
    const coin = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.35, r * 0.05, cx, cy, r);
    coin.addColorStop(0, '#fff9e8');
    coin.addColorStop(0.45, '#f0d878');
    coin.addColorStop(0.85, '#c9a03a');
    coin.addColorStop(1, '#9a7428');
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = coin;
    ctx.fill();

    ctx.strokeStyle = 'rgba(255,255,255,0.6)';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.82, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(180,130,40,0.4)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.58, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,252,235,0.85)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(210,170,80,0.35)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.strokeStyle = 'rgba(190,150,60,0.3)';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(angle) * r * 0.22, cy + Math.sin(angle) * r * 0.22);
      ctx.lineTo(cx + Math.cos(angle) * r * 0.48, cy + Math.sin(angle) * r * 0.48);
      ctx.stroke();
    }
  }

  private drawFoilSparkles(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    coinR: number,
    width: number,
    height: number,
  ): void {
    const positions = [
      [0.18, 0.22],
      [0.82, 0.2],
      [0.15, 0.78],
      [0.85, 0.75],
      [0.5, 0.12],
      [0.5, 0.88],
    ];
    for (const [rx, ry] of positions) {
      this.drawSparkle(ctx, width * rx, height * ry, 5);
    }
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const dist = coinR * 1.45 + (i % 2) * 10;
      this.drawSparkle(ctx, cx + Math.cos(angle) * dist, cy + Math.sin(angle) * dist, 3 + (i % 3));
    }
  }

  private drawSparkle(ctx: CanvasRenderingContext2D, x: number, y: number, size: number): void {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = 'rgba(255,255,255,0.75)';
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.lineTo(size * 0.28, 0);
    ctx.lineTo(0, size);
    ctx.lineTo(-size * 0.28, 0);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-size, 0);
    ctx.lineTo(0, size * 0.28);
    ctx.lineTo(size, 0);
    ctx.lineTo(0, -size * 0.28);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  private scratchAt(event: MouseEvent | Touch): void {
    if (!this.isDrawing || !this.ctx || this.revealComplete) {
      return;
    }

    const coords = this.getPointerCoordinates(event);
    if (!coords) {
      return;
    }

    const radius = this.scratchRadius();
    const ctx = this.ctx;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = radius * 2.8;

    if (this.lastScratchPoint) {
      ctx.beginPath();
      ctx.moveTo(this.lastScratchPoint.x, this.lastScratchPoint.y);
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(coords.x, coords.y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';

    this.lastScratchPoint = coords;

    if (this.strokeCount >= 2) {
      this.checkReveal();
    }
  }

  private getPointerCoordinates(event: MouseEvent | Touch): { x: number; y: number } | null {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY,
    };
  }

  private checkReveal(): void {
    if (!this.ctx || this.revealComplete) {
      return;
    }

    const canvas = this.canvasRef.nativeElement;
    const pixels = this.ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparent = 0;

    for (let i = 3; i < pixels.length; i += 16) {
      if (pixels[i] === 0) {
        transparent++;
      }
    }

    const sampled = pixels.length / 4 / 4;
    const percent = transparent / sampled;

    if (percent >= this.revealThreshold) {
      this.completeReveal();
    }
  }

  private completeReveal(): void {
    if (this.revealComplete) {
      return;
    }

    this.revealComplete = true;
    this.isDrawing = false;
    this.cdr.detectChanges();

    const canvas = this.canvasRef.nativeElement;
    canvas.style.transition = 'opacity 0.65s ease';
    canvas.style.opacity = '0';
    canvas.style.pointerEvents = 'none';

    setTimeout(() => {
      canvas.style.display = 'none';
    }, 650);

    this.createParticles();
  }

  private createParticles(): void {
    const container = this.particlesRef.nativeElement;
    container.innerHTML = '';

    for (let i = 0; i < 80; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 2}s`;
      container.appendChild(particle);
    }
  }
}
