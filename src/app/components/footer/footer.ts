import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SOCIAL_LINKS } from '../../data/social-links';

@Component({
  selector: 'app-footer',
  imports: [RouterModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  socialLinks = SOCIAL_LINKS;
}
