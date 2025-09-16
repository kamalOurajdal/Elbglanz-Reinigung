import { Component, inject, Input } from '@angular/core';
import { BRAND, ICONS, OSSI_SERVICES, Service } from '../../../shared/constants';
import { scrollToId } from '../../../shared/utils/shared.utils';
import { RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: 'app-services',
  imports: [RouterLink],
 
templateUrl: './services.html',
})
export class Services {
  @Input() isHome: boolean = false;
  private title = inject(Title);
  private meta = inject(Meta);
  icons = ICONS;
  brand = BRAND;

  services: Service[] = OSSI_SERVICES;

  ngOnInit() {
    if (this.isHome) return;
    this.title.setTitle(`Unsere Leistungen – Reinigung in Dresden | ${this.brand.name}`);
    this.meta.updateTag({
      name: 'description',
      content: `Büroreinigung, Fensterreinigung, Grundreinigung und Praxisreinigung – professionelle Reinigungslösungen für Firmen und Privathaushalte in Dresden.`
    });
  }
}
