// app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { Header } from './features/components/header/header';
import { Hero } from './features/components/hero/hero';
import { Services } from "./features/components/services/services";
import { WhyUs } from "./features/components/why-us/why-us";
import { Testimonials } from "./features/components/testimonials/testimonials";
import { Faq } from "./features/components/faq/faq";
import { Contact } from "./features/components/contact/contact";
import { Footer } from "./features/components/footer/footer";
import { AboutUs } from "./features/components/about-us/about-us";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Header,
    Hero,
    Services,
    WhyUs,
    Testimonials,
    Faq,
    Contact,
    Footer,
    AboutUs
],
  template: `
    <div
      class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 text-gray-800"
    >
      <!-- NAV -->
      <app-header/>

      <!-- HERO -->
      <app-hero/>

      <app-about-us/>

      <!-- TRUST BAR -->
     <!-- <app-trust-bar/> -->

      <!-- SERVICES -->
      <app-services/>

      <!-- WHY US -->
      <app-why-us/>

      <!-- STATS -->
      <!-- <app-stats/> -->

      <!-- TESTIMONIALS -->
      <app-testimonials/>

  

      <!-- CONTACT / LEAD FORM -->
      <app-contact/>

      <!-- FAQ -->
    <app-faq/>

      <!-- FOOTER -->
      <app-footer/>
    </div>
  `,
})
export class App {

}
