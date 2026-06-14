import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export const CONTACT_EMAIL = 'contact@thinknexora.in';

export interface ConsultationForm {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  details: string;
}

interface FormSubmitResponse {
  success: string;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

  sendConsultation(form: ConsultationForm): Observable<FormSubmitResponse> {
    return this.http.post<FormSubmitResponse>(
      this.endpoint,
      {
        _subject: `Think Nexora — Consultation Request from ${form.fullName}`,
        _template: 'table',
        _captcha: 'false',
        name: form.fullName,
        company: form.companyName,
        email: form.email,
        phone: form.phone,
        service: this.formatService(form.service),
        budget: this.formatBudget(form.budget),
        message: form.details,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );
  }

  private formatService(value: string): string {
    const labels: Record<string, string> = {
      branding: 'Branding',
      'corporate-films': 'Corporate Films',
      'digital-marketing': 'Digital Marketing',
      'social-media': 'Social Media Management',
      outdoor: 'Outdoor Advertising',
      'event-branding': 'Event Branding',
    };
    return (labels[value] ?? value) || 'Not specified';
  }

  private formatBudget(value: string): string {
    const labels: Record<string, string> = {
      'under-1l': 'Under ₹1 Lakh',
      '1l-5l': '₹1 – 5 Lakhs',
      '5l-15l': '₹5 – 15 Lakhs',
      '15l-plus': '₹15 Lakhs+',
    };
    return (labels[value] ?? value) || 'Not specified';
  }
}
