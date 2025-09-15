import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Hero } from '../hero/hero';
import { Services } from '../services/services';
import { WhyUs } from '../why-us/why-us';
import { Testimonials } from '../testimonials/testimonials';
import { Faq } from '../faq/faq';
import { Contact } from '../contact/contact';
import { AboutUs } from '../about-us/about-us';
import { Team } from '../team/team';
import { Meta, Title } from '@angular/platform-browser';
import { BRAND } from '../../../shared/constants';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Hero,
    Services,
    WhyUs,
    Testimonials,
    Faq,
    Contact,
    AboutUs,
    Team,
  ],
  template: `
    <div
      class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 text-gray-800"
    >
      <!-- HERO -->
      <app-hero />

      <app-about-us [isHome]="true"/>

      <!-- SERVICES -->
      <app-services [isHome]="true"/>

      <!-- WHY US -->
      <app-why-us [isHome]="true"/>
      <!-- <app-team></app-team> -->
      <app-team [isHome]="true"/>

      <!-- TESTIMONIALS -->
      <app-testimonials [isHome]="true"/>

      <!-- CONTACT / LEAD FORM -->
      <app-contact [isHome]="true"/>

      <!-- FAQ -->
      <app-faq [isHome]="true"/>
    </div>
  `,
})
export class Home {
  private title = inject(Title);
  private meta = inject(Meta);
  brand = BRAND;

  ngOnInit() {    
    this.title.setTitle(
      `${this.brand.name} Reinigung Dresden | Büro- & Gebäudereinigung`
    );
    this.meta.updateTag({
      name: 'description',
      content:
        'Professionelle Büro- und Gebäudereinigung in Dresden – zuverlässig, umweltfreundlich und mit 100 % Zufriedenheitsgarantie. Jetzt kostenloses Angebot sichern!',
    });
  }
}
