import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from '../../pipes/safe.pipe';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, SafePipe],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio {
  projects = [
    {
      title: 'Cavinkare Garden Chikki Leaflet Design',
      description: 'A professional and clean layout design for Cavinkare Garden Chikki Leaflet A5, utilizing elegant brand colors and food illustrations.',
      imageUrl: 'assets/portfolio-1.jpg',
      embedUrl: 'https://www.behance.net/embed/project/248644095?ilo0=1',
      behanceUrl: 'https://www.behance.net/gallery/248644095/Cavinkare-Garden-Chikki-Leaflet-A5'
    },

    {
      title: 'Kovilpatti Bombay Sweets Identity',
      description: 'Traditional and premium packaging branding for Kovilpatti Bombay Sweets, emphasizing regional heritage and quality packaging layout.',
      imageUrl: 'assets/portfolio-3.jpg',
      embedUrl: 'https://www.behance.net/embed/project/248645173?ilo0=1',
      behanceUrl: 'https://www.behance.net/gallery/248645173/Kovilpatti-Bombay-Sweets-Identity'
    },
    {
      title: 'Veer Dairy / Veer Milk Centre Branding',
      description: 'Cohesive branding, signage, and marketing designs for Veer Dairy, enhancing visual brand awareness and customer experience.',
      imageUrl: 'assets/portfolio-2.jpg',
      embedUrl: 'https://www.behance.net/embed/project/248645949?ilo0=1',
      behanceUrl: 'https://www.behance.net/gallery/248645949/Veer-Dairy-Veer-Milk-Centre-Branding'
    },
    {
      title: 'Aachi Frispo Tubes Chips Packaging Design',
      description: 'Creative and eye-catching packaging layout design for Aachi Frispo Tubes Chips, focusing on bold branding and snack shelf appeal.',
      imageUrl: 'assets/portfolio-4.jpg',
      embedUrl: 'https://www.behance.net/embed/project/248644387?ilo0=1',
      behanceUrl: 'https://www.behance.net/gallery/248644387/Aachi-Frispo-Tubes-Chips-Packaging-Design'
    }
  ];

  selectedProject: any = null;

  openProject(project: any) {
    this.selectedProject = project;
  }

  closeProject() {
    this.selectedProject = null;
  }
}
