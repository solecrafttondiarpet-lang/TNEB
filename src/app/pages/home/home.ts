import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SERVICES, TRUST_STATS, WHY_CHOOSE_US } from '../../data/site-content';

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

  servicesPreview = SERVICES;
  trustStats = TRUST_STATS;
  whyChooseUs = WHY_CHOOSE_US;

  featuredProjects = [
    {
      title: 'Cavinkare Garden Chikki Leaflet Design',
      imageUrl: 'assets/portfolio-1.jpg',
      alt: 'Cavinkare Garden Chikki leaflet branding design by Think Nexora',
    },
    {
      title: 'Kovilpatti Bombay Sweets Identity',
      imageUrl: 'assets/portfolio-3.jpg',
      alt: 'Kovilpatti Bombay Sweets brand identity design by Think Nexora',
    },
    {
      title: 'Veer Dairy Branding',
      imageUrl: 'assets/portfolio-2.jpg',
      alt: 'Veer Dairy and Veer Milk Centre branding by Think Nexora',
    },
    {
      title: 'Aachi Frispo Tubes Chips Packaging',
      imageUrl: 'assets/portfolio-4.jpg',
      alt: 'Aachi Frispo Tubes Chips packaging design by Think Nexora',
    },
  ];

  clientLogos = [
    { src: 'assets/client-logo-01.jpg', alt: 'Think Nexora client brand logo — trusted partner' },
    { src: 'assets/client-logo-02.jpg', alt: 'Think Nexora client brand logo — industry leader' },
    { src: 'assets/client-logo-03.jpg', alt: 'Think Nexora client brand logo — premium brand' },
    { src: 'assets/client-logo-04.jpg', alt: 'Think Nexora client brand logo — national brand' },
  ];

  testimonials = [
    {
      id: 'testimonial-01',
      quote: 'Think Nexora elevated our brand perception completely. Their campaign strategy and film production quality exceeded every expectation.',
      title: 'Marketing Director',
      company: 'Luxury Real Estate Brand',
    },
    {
      id: 'testimonial-02',
      quote: 'Their creative direction and branding approach helped us stand out instantly in a highly competitive market.',
      title: 'Founder',
      company: 'Lifestyle Brand',
    },
    {
      id: 'testimonial-03',
      quote: 'Professional execution, strong communication, and outstanding creative quality from start to finish.',
      title: 'Managing Partner',
      company: 'Retail Business Group',
    },
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
    if (this.heroVideo?.nativeElement) {
      this.heroVideo.nativeElement.muted = this.isMuted;
      this.heroVideo.nativeElement.play().catch(() => undefined);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      { threshold: 0.1 },
    );

    const targets = this.el.nativeElement.querySelectorAll('.reveal-on-scroll');
    targets.forEach((t: Element) => observer.observe(t));

    this.startTestimonialAutoplay();
  }

  toggleMute() {
    if (this.heroVideo?.nativeElement) {
      this.isMuted = !this.isMuted;
      this.heroVideo.nativeElement.muted = this.isMuted;
    }
  }

  ngOnDestroy() {
    this.stopTestimonialAutoplay();
  }
}
