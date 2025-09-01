import { Component } from '@angular/core';
import { BRAND } from '../../../shared/constants';

interface FAQ {
  q: string;
  a: string;
}

@Component({
  selector: 'app-faq',
  imports: [],
  templateUrl: './faq.html'
})
export class Faq {

  brand = BRAND;

  faqs: FAQ[] = [
    {
      q: 'Welche Bereiche decken Sie ab?',
      a: 'Büros, Praxen, Baustellen, Gastronomie/Einzelhandel, Fenster/Glas, Teppiche/Polster u.v.m.',
    },
    {
      q: 'Bringen Sie Material mit?',
      a: 'Ja. Wir bringen alle benötigten Mittel & Geräte mit – nachhaltig und materialschonend.',
    },
    {
      q: 'Wie läuft die Angebotserstellung?',
      a: 'Schreiben Sie uns über das Formular oder rufen Sie uns unter +49 351 1234567 an. Wir antworten Ihnen innerhalb von 24 Stunden auf alle Fragen oder Terminwünsche.',
    },
    {
      q: 'Sind Sie versichert?',
      a: 'Ja, inklusive Haftpflichtversicherung. Unser Team ist geschult und background‑geprüft.',
    },
    {
      q: 'In welchen Städten arbeiten Sie?',
      a: `Aktuell in ${this.brand.city} und Umgebung. Auf Anfrage auch deutschlandweit.`,
    },
  ];
}
