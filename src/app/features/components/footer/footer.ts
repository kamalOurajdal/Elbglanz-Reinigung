import { Component } from '@angular/core';
import { BRAND, ICONS, NAV_ITEMS } from '../../../shared/constants';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html'
})
export class Footer {
  icons = ICONS;
  brand = BRAND;

  navItems = NAV_ITEMS;
  currentYear = new Date().getFullYear();

   getEmailLink(): string {
    return `mailto:${this.brand.email}`;
  }

  getPhoneLink(): string {
    return `tel:${this.brand.phone.replace(/\s/g, '')}`;
  }

   scrollToId(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
