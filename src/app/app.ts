
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { Header } from './features/components/header/header';
import { Footer } from "./features/components/footer/footer";
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Header,
    Footer,
    RouterOutlet
],
  template: `
    <div
      class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 text-gray-800 scroll-mt-40"
    >
      <app-header/>
      <main>
        <router-outlet></router-outlet>
      </main>
      <app-footer/>
    </div>
  `,
})
export class App {
}
