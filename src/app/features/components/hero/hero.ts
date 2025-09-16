import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { BRAND, ICONS } from '../../../shared/constants';
import { RouterLink } from '@angular/router';
import { PhoneLinkPipe } from '../../../shared/pipes/format-phone.pipe';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink, PhoneLinkPipe, NgOptimizedImage],
  templateUrl: './hero.html',
})
export class Hero {
  brand = BRAND;
  icons = ICONS;
}