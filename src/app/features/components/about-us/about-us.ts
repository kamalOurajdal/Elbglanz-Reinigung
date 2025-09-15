import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { BRAND } from '../../../shared/constants';


interface FeaturePoint {
  id: string;
  number: string;
  title: string;
  description: string;
  gradient: string;
  shadowColor: string;
  ringColor: string;
  iconBg: string;
}


@Component({
  selector: 'app-about-us',
  imports: [CommonModule],
  templateUrl: './about-us.html'
})
export class AboutUs {
  @Input() isHome:boolean = false;
  private title = inject(Title);
  private meta = inject(Meta);

  brand = BRAND;

  features: FeaturePoint[] = [
    {
      id: 'skilled-staff',
      number: '01',
      title: 'Geschultes Personal',
      description: 'Unsere Reinigungsteams bestehen aus Fachkräften, die professionell ausgebildet sind und durch ihre Expertise, Pünktlichkeit und Sorgfalt überzeugen.',
      gradient: 'bg-gradient-to-br from-blue-500 to-blue-600',
      shadowColor: 'shadow-blue-100/25 hover:shadow-blue-200/50',
      ringColor: 'ring-blue-100/50 hover:ring-blue-200/50',
      iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-blue-500/25'
    },
    {
      id: 'eco-friendly',
      number: '02',
      title: 'Umweltfreundliche Produkte',
      description: 'Wir setzen konsequent auf nachhaltige und umweltschonende Reinigungsprodukte, die effektiv reinigen ohne aggressive Chemikalien.',
      gradient: 'bg-gradient-to-br from-green-500 to-emerald-600',
      shadowColor: 'shadow-green-100/25 hover:shadow-green-200/50',
      ringColor: 'ring-green-100/50 hover:ring-green-200/50',
      iconBg: 'bg-gradient-to-br from-green-500 to-emerald-600 shadow-green-500/25'
    },
    {
      id: 'sensitive-areas',
      number: '03',
      title: 'Erfahrung in sensiblen Bereichen',
      description: 'Ob Arztpraxis, Anwaltskanzlei oder Krankenhaus – wir wissen genau, was in sensiblen Arbeitsumgebungen wichtig ist: Diskretion und höchste Hygienestandards.',
      gradient: 'bg-gradient-to-br from-purple-500 to-indigo-600',
      shadowColor: 'shadow-purple-100/25 hover:shadow-purple-200/50',
      ringColor: 'ring-purple-100/50 hover:ring-purple-200/50',
      iconBg: 'bg-gradient-to-br from-purple-500 to-indigo-600 shadow-purple-500/25'
    },
    {
      id: 'individual-solutions',
      number: '04',
      title: 'Individuelle Lösungen',
      description: 'Kein Gebäude gleicht dem anderen. Nach einer persönlichen Beratung entwickeln wir maßgeschneiderte Reinigungskonzepte für Ihre spezifischen Bedürfnisse.',
      gradient: 'bg-gradient-to-br from-amber-500 to-orange-600',
      shadowColor: 'shadow-amber-100/25 hover:shadow-amber-200/50',
      ringColor: 'ring-amber-100/50 hover:ring-amber-200/50',
      iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-500/25'
    }
  ];

  ngOnInit() {
    if (!this.isHome) {
      this.title.setTitle(`Über uns – ${this.brand.name} Reinigung Dresden`);
      this.meta.updateTag({
        name: 'description',
        content: `Lernen Sie ${this.brand.name} Reinigung kennen: erfahrenes Team, höchste Qualitätsstandards und persönliche Betreuung in Dresden und Umgebung.`
      });
    }
  }
}
