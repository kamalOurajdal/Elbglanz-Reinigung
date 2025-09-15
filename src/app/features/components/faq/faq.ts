import { Component, inject, Input } from '@angular/core';
import { BRAND } from '../../../shared/constants';
import { Meta, Title } from '@angular/platform-browser';
import { PhoneLinkPipe } from '../../../shared/pipes/format-phone.pipe';

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
  @Input() isHome: boolean = false;
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private phoneLinkPipe = inject(PhoneLinkPipe);

  brand = BRAND;

  formatPhone = this.phoneLinkPipe.transform(this.brand.phone);


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
      a: `Schreiben Sie uns über das formular oder rufen Sie uns unter <a href="${this.formatPhone}" class="text-purple-600 hover:text-purple-700 underline font-medium">${this.brand.phone}</a> an. Wir antworten Ihnen innerhalb von 24 Stunden auf alle Fragen oder Terminwünsche.`, 
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

  ngOnInit() {
    if (this.isHome) return;
    this.title.setTitle(`FAQ – Häufige Fragen | ${this.brand.name} Reinigung Dresden`);
    this.meta.updateTag({
      name: 'description',
      content: `Hier finden Sie Antworten zu häufigen Fragen rund um Leistungen, Preise, Abläufe und Versicherungen bei ${this.brand.name} Reinigung.`
    });
  }
}
