import { Injectable, Pipe, PipeTransform } from '@angular/core';


@Injectable({ providedIn: 'root' })
@Pipe({
  name: 'phoneLink',
})
export class PhoneLinkPipe implements PipeTransform {
   transform(value: string): string {
    if (!value) return '';

    // Remove spaces and keep only digits and "+"
    const cleaned = value.replace(/\s+/g, '').replace(/[^+\d]/g, '');

    // Return tel: link
    return `tel:${cleaned}`;
  }
}
