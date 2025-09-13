import { Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { OSSI_SERVICES, Service } from '../../../shared/constants';
import { ContactService } from './contact.service';

interface SubmitResult {
  success?: boolean | null;
  message?: string;
}

interface ContactForm {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  phone: FormControl<string>;
  email: FormControl<string>;
  service: FormControl<string | null>;
  message: FormControl<string | null>;
  source: FormControl<string>;
}

interface ContactModel {
  firstName: string;
  lastName: string;
  phone: string | null;
  email: string | null;
  service: string | null;
  message: string | null;
  source: string;
}

// Brand constants - you can replace these with your actual brand information
const BRAND = {
  phone: '+49 30 12345678',
  email: 'kontakt@reinigungsservice.de',
  address: 'Musterstraße 123, 10115 Berlin',
  locationUrl: 'https://maps.google.com/?q=Musterstraße+123,+10115+Berlin'
};

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.html'
})
export class Contact {
  private readonly contactService = inject(ContactService);
  // Brand information
  brand = BRAND;

  // Form and validation state
  contactForm: FormGroup<ContactForm>;
  submitting = false;
  submitResult: SubmitResult = { success: null, message: '' };

  // Dropdown state
  showServiceDropdown = false;
  selectedService: Service | null = null;

  // ViewChild for dropdown click detection
  @ViewChild('serviceArea', { static: false }) serviceArea?: ElementRef<HTMLElement>;

  // Current year for any copyright or date displays
  currentYear = new Date().getFullYear();

  // Services list
  services: Service[] = OSSI_SERVICES;

  // Dependency injection
  private fb = inject(NonNullableFormBuilder);
  private http = inject(HttpClient);

  constructor() {
    this.contactForm = this.initializeForm();
  }

  /**
   * Initialize the reactive form with validation
   */
  private initializeForm(): FormGroup<ContactForm> {
    return this.fb.group<ContactForm>({
      firstName: this.fb.control<string>('', [Validators.required]),
      lastName: this.fb.control<string>('', [Validators.required]),
      phone: this.fb.control<string>(''),
      email: this.fb.control<string>(''),
      service: this.fb.control<string | null>(null, [Validators.required]),
      message: this.fb.control<string | null>(null),
      source: this.fb.control<string>('website'),
    }, { 
      validators: [this.requirePhoneOrEmail()] 
    });
  }

  /**
   * Custom validator to require either phone or email
   */
  private requirePhoneOrEmail(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const phoneControl = group.get('phone');
      const emailControl = group.get('email');
      
      if (!phoneControl || !emailControl) return null;
      
      const phone = phoneControl.value?.trim() || '';
      const email = emailControl.value?.trim() || '';
      
      // Check if at least one field has a valid value
      const hasValidPhone = phone && this.isValidPhone(phone);
      const hasValidEmail = email && this.isValidEmail(email);
      
      return hasValidPhone || hasValidEmail ? null : { contactRequired: true };
    };
  }

  /**
   * Validate email format
   */
  isValidEmail(email: string): boolean {
    if (!email?.trim()) return true; // empty is valid for individual check
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  /**
   * Validate phone format
   */
  isValidPhone(phone: string): boolean {
    if (!phone?.trim()) return true; // empty is valid for individual check
    return /^[+]?[\d\s\-\(\)]{6,}$/.test(phone.trim());
  }

  /**
   * Check if phone field has validation errors to show
   */
  get phoneHasErrors(): boolean {
    const phoneControl = this.contactForm.get('phone');
    if (!phoneControl) return false;
    
    const phoneValue = phoneControl.value?.trim() || '';
    return phoneControl.touched && phoneValue.length > 0 && !this.isValidPhone(phoneValue);
  }

  /**
   * Check if email field has validation errors to show
   */
  get emailHasErrors(): boolean {
    const emailControl = this.contactForm.get('email');
    if (!emailControl) return false;
    
    const emailValue = emailControl.value?.trim() || '';
    return emailControl.touched && emailValue.length > 0 && !this.isValidEmail(emailValue);
  }

  /**
   * Check if the contact requirement error should be shown
   */
  get showContactRequiredError(): boolean {
    const phoneControl = this.contactForm.get('phone');
    const emailControl = this.contactForm.get('email');
    
    return !!(
      this.contactForm.errors?.['contactRequired'] && 
      (phoneControl?.touched || emailControl?.touched) &&
      !this.phoneHasErrors && 
      !this.emailHasErrors
    );
  }

  /**
   * Check if form is valid including service selection
   */
  get isFormValid(): boolean {
    return this.contactForm.valid && !!this.selectedService;
  }

  /**
   * Toggle service dropdown visibility
   */
  toggleServiceDropdown(): void {
    this.showServiceDropdown = !this.showServiceDropdown;
    console.log('toggleServiceDropdown', this.showServiceDropdown);
  }

  /**
   * Select a service from the dropdown list
   */
  selectService(service: Service): void {
    this.selectedService = service;
    this.contactForm.patchValue({ service: service.title });
    this.showServiceDropdown = false;
  }

  /**
   * Close dropdown when clicking outside
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.showServiceDropdown) return;
    
    const target = event.target as Node;
    const isInsideDropdown = this.serviceArea?.nativeElement?.contains(target);
    
    if (!isInsideDropdown) {
      this.showServiceDropdown = false;
    }
  }

  /**
   * Close dropdown on Escape key
   */
  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.showServiceDropdown = false;
  }

  /**
   * Handle form submission
   */
  onSubmit() {
    if (!this.isFormValid) {
      console.log('Form is not valid');
      return;
    }

    this.submitting = true;
    this.submitResult = { success: null, message: '' };

    
    const formData = this.contactForm.value;
    
    if (!formData || !this.selectedService || !formData.firstName || !formData.lastName) {
      throw new Error('Required form data is missing');
    }

    const payload: ContactModel = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone || null,
      email: formData.email || null,
      service: this.selectedService.title,
      message: formData.message || null,
      source: formData.source || 'website'
    };

    this.contactService.sendEmail(payload).subscribe({
      next: (response) => {
        this.submitting = false;
        this.submitResult = { success: true, message: 'Email sent successfully!' };
        this.resetForm();
      },
      error: (error) => {
        this.submitting = false;
        this.submitResult = { success: false, message: 'Failed to send email. Please try again later.' };
        // this.submitResult = { success: true, message: 'Email sent successfully!' };
        console.error('Email sending error:', error);
      }
    });
  }


  /**
   * Reset form to initial state
   */
  private resetForm(): void {
    this.contactForm.reset();
    this.contactForm.patchValue({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      service: null,
      message: null,
      source: 'website'
    });
    this.selectedService = null;
    this.showServiceDropdown = false;
  }

  /**
   * Handle phone number input formatting (optional)
   */
  onPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/[^\d+\-\s\(\)]/g, '');
    
    // Basic phone number formatting - you can enhance this
    if (value && !value.startsWith('+') && !value.startsWith('0')) {
      value = '+49 ' + value;
    }
    
    this.contactForm.patchValue({ phone: value });
  }
}