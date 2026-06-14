import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService, CONTACT_EMAIL } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  private readonly fb = inject(FormBuilder);
  private readonly contactService = inject(ContactService);

  readonly contactEmail = CONTACT_EMAIL;

  form = this.fb.nonNullable.group({
    fullName: ['', Validators.required],
    companyName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    service: [''],
    budget: [''],
    details: ['', Validators.required],
  });

  submitting = false;
  submitSuccess = false;
  submitError = '';

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.submitSuccess = false;
    this.submitError = '';

    this.contactService.sendConsultation(this.form.getRawValue()).subscribe({
      next: () => {
        this.submitting = false;
        this.submitSuccess = true;
        this.form.reset();
      },
      error: () => {
        this.submitting = false;
        this.submitError =
          'Unable to send your request right now. Please email us directly at contact@thinknexora.in';
      },
    });
  }

  isInvalid(controlName: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && control.touched;
  }
}
