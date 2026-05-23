import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  icons = [
    { content: '💡', label: 'Innovative Ideas' },
    { content: '🚀', label: 'Growth & Impact' },
    { content: '🌍', label: 'Global Vision' },
    { content: '🧩', label: 'Problem Solving' },
    { content: '🏗️', label: 'Brand Architects' },
    { content: '🧠', label: 'Tech Minds' },
    { content: '🎨', label: 'Creative Hub' },
    { content: '🤝', label: 'Collaboration' }
  ];
}
