import { Component } from '@angular/core';
import { BRAND, ICONS, NAV_ITEMS } from '../../../shared/constants';
import { scrollToId } from '../../../shared/utils/shared.utils';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './footer.html'
})
export class Footer {
  scrollToId = scrollToId;
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
}
