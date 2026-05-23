import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * Simple prompt session component mimicking a chat box.
 * Users can type a prompt and see it echoed in the message list.
 * This is a placeholder – you can replace the logic with real backend calls.
 */
@Component({
  selector: 'prompt-session',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="prompt-session">
      <div class="messages" #msgContainer>
        <div *ngFor="let msg of messages" class="message">
          {{ msg }}
        </div>
      </div>
      <div class="input-area">
        <input [(ngModel)]="currentPrompt" (keyup.enter)="sendPrompt()" placeholder="Type your prompt..." />
        <button (click)="sendPrompt()">Send</button>
      </div>
    </div>
  `,
  styles: [`
    .prompt-session {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: rgba(0, 0, 0, 0.05);
      backdrop-filter: blur(4px);
      padding: 1rem;
    }
    .messages {
      flex: 1;
      overflow-y: auto;
      margin-bottom: 1rem;
    }
    .message {
      background: rgba(255,255,255,0.2);
      padding: 0.5rem;
      border-radius: 4px;
      margin-bottom: 0.5rem;
    }
    .input-area {
      display: flex;
      gap: 0.5rem;
    }
    .input-area input {
      flex: 1;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .input-area button {
      padding: 0.5rem 1rem;
      background: #4a90e2;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .input-area button:hover {
      background: #357abd;
    }
  `]
})
export class PromptSessionComponent {
  messages: string[] = [];
  currentPrompt: string = '';

  sendPrompt() {
    const trimmed = this.currentPrompt.trim();
    if (trimmed) {
      this.messages.push('You: ' + trimmed);
      // Echo back as placeholder response
      this.messages.push('Antigravity: ' + trimmed);
      this.currentPrompt = '';
    }
  }
}
