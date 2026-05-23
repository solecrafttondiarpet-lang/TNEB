import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit, OnDestroy {
  @ViewChild('heroVideo') heroVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('logoContainer') logoContainer!: ElementRef<HTMLDivElement>;
  isMuted = true;

  clientLogos = [
    'assets/client-logo-01.jpg',
    'assets/client-logo-02.jpg',
    'assets/client-logo-03.jpg',
    'assets/client-logo-04.jpg'
  ];

  testimonials = [
    {
      id: 'testimonial-01',
      quote: 'Think Nexora elevated our brand perception completely. Their campaign strategy and film production quality exceeded every expectation.',
      title: 'Marketing Director',
      company: 'Luxury Real Estate Brand'
    },
    {
      id: 'testimonial-02',
      quote: 'Their creative direction and branding approach helped us stand out instantly in a highly competitive market.',
      title: 'Founder',
      company: 'Lifestyle Brand'
    },
    {
      id: 'testimonial-03',
      quote: 'Professional execution, strong communication, and outstanding creative quality from start to finish.',
      title: 'Managing Partner',
      company: 'Retail Business Group'
    }
  ];

  activeTestimonial = 0;
  private testimonialTimer?: number;

  constructor(private el: ElementRef) {}

  prevTestimonial() {
    this.activeTestimonial = (this.activeTestimonial + this.testimonials.length - 1) % this.testimonials.length;
  }

  nextTestimonial() {
    this.activeTestimonial = (this.activeTestimonial + 1) % this.testimonials.length;
  }

  private startTestimonialAutoplay() {
    this.testimonialTimer = window.setInterval(() => {
      this.nextTestimonial();
    }, 7000);
  }

  private stopTestimonialAutoplay() {
    if (this.testimonialTimer !== undefined) {
      window.clearInterval(this.testimonialTimer);
      this.testimonialTimer = undefined;
    }
  }

  selectTestimonial(index: number) {
    this.activeTestimonial = index;
  }

  ngAfterViewInit() {
    if (this.heroVideo && this.heroVideo.nativeElement) {
      this.heroVideo.nativeElement.muted = this.isMuted;
      this.heroVideo.nativeElement.play().catch(e => console.log('Video autoplay error:', e));
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    }, { threshold: 0.1 });

    const targets = this.el.nativeElement.querySelectorAll('.reveal-on-scroll');
    targets.forEach((t: Element) => observer.observe(t));

    this.startTestimonialAutoplay();
  }

  toggleMute() {
    if (this.heroVideo && this.heroVideo.nativeElement) {
      this.isMuted = !this.isMuted;
      this.heroVideo.nativeElement.muted = this.isMuted;
    }
  }

  scrollLogos(direction: number) {
    if (this.logoContainer && this.logoContainer.nativeElement) {
      const scrollAmount = 300;
      this.logoContainer.nativeElement.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
      });
    }
  }

  ngOnDestroy() {
    this.stopTestimonialAutoplay();
  }
}
