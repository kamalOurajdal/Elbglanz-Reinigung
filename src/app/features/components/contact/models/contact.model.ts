import { FormControl } from "@angular/forms";

export interface ContactModel {
    firstName: string;
    lastName: string;
    phone: string | null;
    email: string | null;
    service: string | null;
    message: string | null;
    source: string;
}

export interface ContactForm {
    firstName: FormControl<string>;
    lastName: FormControl<string>;
    phone: FormControl<string>;
    email: FormControl<string>;
    service: FormControl<string | null>;
    message: FormControl<string | null>;
    source?: FormControl<string>;
}