import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Simple file tree component showing a static list of project files.
 * In a real app this could be backed by a service that reads the filesystem.
 */
@Component({
  selector: 'file-tree',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="file-tree">
      <h2 class="section-title">Project Files</h2>
      <ul class="file-list">
        <li *ngFor="let file of files">{{ file }}</li>
      </ul>
    </div>
  `,
  styles: [`
    .file-tree {
      padding: 1rem;
      height: 100%;
      overflow-y: auto;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(8px);
      border-right: 1px solid rgba(255,255,255,0.2);
    }
    .section-title {
      margin: 0 0 0.5rem 0;
      font-size: 1.2rem;
      color: #e0e0e0;
    }
    .file-list {
      list-style: none;
      padding: 0;
      margin: 0;
      color: #fafafa;
    }
    .file-list li {
      padding: 0.3rem 0;
      cursor: pointer;
    }
    .file-list li:hover {
      background: rgba(255,255,255,0.15);
    }
  `]
})
export class FileTreeComponent {
  // Static representation – replace with dynamic data as needed
  files: string[] = [
    'src/app/app.ts',
    'src/app/app.html',
    'src/app/app.css',
    'src/app/app.routes.ts',
    'src/app/components/header/header.component.ts',
    'src/app/components/footer/footer.component.ts',
    // add more as desired
  ];
}
