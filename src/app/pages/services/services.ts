import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  standalone: true,
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services {
  services = [
    { num: '01', title: 'Branding', desc: 'Strategic brand identity systems designed for recognition, trust, and long-term positioning.', icon: 'branding' },
    { num: '02', title: 'Corporate Films', desc: 'Cinematic storytelling that elevates brand perception and audience engagement.', icon: 'film' },
    { num: '03', title: 'Digital Marketing', desc: 'Performance-focused campaigns built to generate visibility, leads, and measurable growth.', icon: 'digital-marketing' },
    { num: '04', title: 'Social Media Management', desc: 'Creative content strategies that build digital presence and audience connection.', icon: 'social-media' },
    { num: '05', title: 'Outdoor Advertising', desc: 'High-visibility offline campaigns that strengthen market presence.', icon: 'outdoor' },
    { num: '06', title: 'Event Branding', desc: 'Premium event identity and launch experiences designed for impact.', icon: 'event' }
  ];
}
