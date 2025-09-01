import { Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { BRAND, ICONS } from '../../../shared/constants';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Service {
  id: string;
  name: string;
}

interface SubmitResult {
  success?: boolean | null;
  message?: string;
}

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.html',
})
export class Contact {
  brand = BRAND;
  icons = ICONS;

  contactForm: FormGroup;

  // Dropdown / selection state
  showServiceDropdown = false;
  selectedService: Service | null = null;

  // For click-outside close
  @ViewChild('serviceArea', { static: false }) serviceArea?: ElementRef<HTMLElement>;

  submitting = false;
  currentYear = new Date().getFullYear();

  submitResult: SubmitResult = { success: null, message: '' };

  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  constructor() {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, this.phoneValidator()]],
      email: ['', this.emailValidator()],
      service: [null, Validators.required],            // <-- required
      message: [''],
    });
  }

  services: Service[] = [
    { id: 'office-cleaning', name: 'Büro Reinigung' },
    { id: 'construction-cleaning', name: 'Baustellen Reinigung' },
    { id: 'medical-cleaning', name: 'Arztpraxen' },
    { id: 'maintenance-cleaning', name: 'Unterhaltsreinigung' },
    { id: 'deep-cleaning', name: 'Sonderreinigung' },
    { id: 'window-cleaning', name: 'Glasreinigung' },
    { id: 'carpet-cleaning', name: 'Teppichreinigung' },
  ];

  /** Toggle dropdown */
  toggleServiceDropdown(): void {
    this.showServiceDropdown = !this.showServiceDropdown;
    console.log("toggleServiceDropdown", this.showServiceDropdown);

  }

  /** Select a service from the list */
  selectService(service: Service): void {
    this.selectedService = service;
    this.contactForm.patchValue({ service: service.id });   // store id
    this.showServiceDropdown = false;
  }

  /** Close dropdown on outside click */
  @HostListener('document:click', ['$event'])
  onDocumentClick(ev: MouseEvent): void {
    if (!this.showServiceDropdown) return;
    const target = ev.target as Node;
    const inside = this.serviceArea?.nativeElement.contains(target);
    if (!inside) this.showServiceDropdown = false;
  }

  @HostListener('document:keydown.escape')
  onEsc() { this.showServiceDropdown = false; }
  // ---- Validators & helpers ----
  private emailValidator(): ValidatorFn {
    return (control): ValidationErrors | null => {
      const v = (control?.value ?? '').trim();
      if (!v) return null;
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : { invalidEmail: true };
    };
  }

  private phoneValidator(): ValidatorFn {
    return (control): ValidationErrors | null => {
      const v = (control?.value ?? '').trim();
      if (!v) return null;
      return /[0-9+()\-\s]{6,}/.test(v) ? null : { invalidPhone: true };
    };
  }

  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  isValidPhone(phone: string): boolean {
    return /[0-9+()\-\s]{6,}/.test(phone);
  }

  getPhoneLink(): string {
    return `tel:${this.brand.phone.replace(/\s/g, '')}`;
  }
  getEmailLink(): string {
    return `mailto:${this.brand.email}`;
  }

  // ---- Submit ----
  async onSubmit(): Promise<void> {
    if (!this.contactForm.valid || !this.selectedService) return;

    this.submitting = true;
    this.submitResult = { success: null, message: '' };

    try {
      const formData = this.contactForm.value;
      const payload = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        phone: formData.phone.trim(),
        email: formData.email?.trim() || undefined,
        service: this.selectedService.id,                      // ensure correct value
        message: formData.message?.trim() || undefined,
        company: formData.company?.trim() || undefined,
        address: formData.address?.trim() || undefined,
        source: 'website',
      };

      await this.http.post(`/leads`, payload).toPromise();

      this.submitResult = { success: true, message: 'Danke! Wir melden uns in Kürze.' };
      this.contactForm.reset();
      this.selectedService = null;
    } catch (e) {
      this.submitResult = { success: false, message: 'Leider hat das nicht geklappt. Bitte versuchen Sie es erneut.' };
    } finally {
      this.submitting = false;
    }
  }
}
