import { Component, inject, Input } from '@angular/core';
import { BRAND, ICONS } from '../../../shared/constants';
import { Meta, Title } from '@angular/platform-browser';

interface WhyUsItem {
  icon: string;
  title: string;
  desc: string;
}


@Component({
  selector: 'app-why-us',
  imports: [],
  templateUrl: './why-us.html',
})
export class WhyUs {
  @Input() isHome: boolean = false;
  private title = inject(Title);
  private meta = inject(Meta);
  icons = ICONS;

  brand = BRAND;

   whyUs: WhyUsItem[] = [
    {
      icon: 'shield',
      title: 'Versichert & geprüft',
      desc: 'Geschultes Team, Haftpflichtversicherung inklusive.',
    },
    {
      icon: 'clock',
      title: 'Flexibel',
      desc: 'Termine nach Bedarf – auch kurzfristig & am Wochenende.',
    },
    {
      icon: 'sparkles',
      title: '100% Zufriedenheitsgarantie',
      desc: 'Wir kommen nach – ohne Zusatzkosten.',
    },
  ];

  ngOnInit() {
    if (!this.isHome) {
      this.title.setTitle(`Warum ${this.brand.name} Reinigung – Qualität & Vertrauen`);
      this.meta.updateTag({
        name: 'description',
        content: `Darum entscheiden sich Kunden für uns: umweltfreundliche Methoden, versicherte Leistungen, geschultes Fachpersonal und flexible Termine.`
      });
    }
  }
}
