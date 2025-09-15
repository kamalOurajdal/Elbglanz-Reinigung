import { Component, inject } from '@angular/core';
import { BRAND, ICONS, NAV_ITEMS } from '../../../shared/constants';
import { scrollToId } from '../../../shared/utils/shared.utils';
import { NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

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
  router = inject(Router);
  mobileMenuOpen = false;
  currentRoute = '/';

  icons: any = ICONS;

  brand: Brand = BRAND;

  navItems = NAV_ITEMS;

  scrollToId(id: string): void {
    scrollToId(id);

    this.mobileMenuOpen = false;
  }

  closeMobileMenuAndScroll(id: string): void {
    this.mobileMenuOpen = false;
    this.scrollToId(id);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}
