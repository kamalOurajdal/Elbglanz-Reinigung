import { Component, inject } from '@angular/core';
import { BRAND, ICONS, NAV_ITEMS } from '../../../shared/constants';
import { scrollToId } from '../../../shared/utils/shared.utils';
import { NgOptimizedImage } from '@angular/common';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { filter } from 'rxjs';

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
  imports: [NgOptimizedImage, RouterLink, RouterLinkActive],
})
export class Header {
  mobileMenuOpen = false;
  currentRoute = '/';

  icons: any = ICONS;

  brand: Brand = BRAND;

  navItems = NAV_ITEMS;

  private router = inject(Router);

  ngOnInit(): void {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        const frag = this.router.parseUrl(this.router.url).fragment;
        if (!frag) return;
        setTimeout(() => {
          this.scrollToId(frag);
        }, 0);
      });
  }

  scrollToId(id: string): void {
    scrollToId(id);

    this.mobileMenuOpen = false;
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}
