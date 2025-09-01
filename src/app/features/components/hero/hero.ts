import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BRAND, ICONS } from '../../../shared/constants';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
})
export class Hero {
  brand = BRAND;
  icons = ICONS;
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