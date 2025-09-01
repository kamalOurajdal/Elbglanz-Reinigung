import { Component } from '@angular/core';
import { ICONS } from '../../../shared/constants';

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
  icons = ICONS;

   whyUs: WhyUsItem[] = [
    {
      icon: 'leaf',
      title: 'Öko‑freundlich',
      desc: 'Zertifizierte, materialschonende Reinigungsmittel.',
    },
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
}
