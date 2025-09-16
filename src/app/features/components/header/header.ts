import { Component } from '@angular/core';
import { BRAND, ICONS, NAV_ITEMS } from '../../../shared/constants';
import { scrollToId } from '../../../shared/utils/shared.utils';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Brand {
  name: string;
  city: string;
  phone: string;
  email: string;
  address: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  imports: [NgOptimizedImage, RouterLink],
})
export class Header {
  mobileMenuOpen = false;
  currentRoute = '/';

  icons: any = ICONS;

  brand: Brand = BRAND;

  navItems = NAV_ITEMS;

  scrollToId(id: string): void {
    scrollToId(id);

    this.mobileMenuOpen = false;
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}
