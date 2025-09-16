import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { BRAND } from '../../../shared/constants';
import { PhoneLinkPipe } from "../../../shared/pipes/format-phone.pipe";

@Component({
  selector: 'app-not-found',
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-32 lg:py-16">
      <div class="max-w-4xl mx-auto text-center">
        
        <!-- Main 404 Section -->
        <div class="relative">
          <!-- Decorative Elements -->
          <div class="absolute -top-20 -left-20 w-40 h-40 bg-blue-100 rounded-full opacity-60 animate-pulse"></div>
          <div class="absolute -bottom-10 -right-16 w-32 h-32 bg-blue-50 rounded-full opacity-40 animate-pulse delay-1000"></div>
          
          <!-- 404 Number with Cleaning Icon -->
          <div class="relative mb-8">
            <h1 class="text-8xl sm:text-9xl lg:text-[12rem] font-bold text-blue-600/20 select-none">
              404
            </h1>
            <div class="absolute inset-0 flex items-center justify-center">
              <!-- Cleaning Icon -->
              <div class="bg-white rounded-full p-6 shadow-2xl border-4 border-blue-100 animate-bounce">
                <svg 
                  class="w-16 h-16 text-blue-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div class="mb-8">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Seite nicht gefunden
          </h2>
          <p class="text-lg text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
            Entschuldigung! Die Seite, die Sie suchen, wurde möglicherweise verschoben, gelöscht oder existiert nicht. 
            Aber keine Sorge – wir helfen Ihnen gerne weiter!
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button 
            (click)="goHome()"
            class="group relative px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Zur Startseite</span>
            </div>
          </button>
          
          <button 
            (click)="goBack()"
            class="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Zurück</span>
            </div>
          </button>
        </div>

        <!-- Contact Info -->
        <div class="mt-16 text-center bg-gray-50 rounded-2xl p-8">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">
            Immer noch nicht gefunden, was Sie suchen?
          </h3>
          <p class="text-gray-600 mb-6">
            Unser Team hilft Ihnen gerne weiter. Kontaktieren Sie uns direkt!
          </p>
          <div class="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <a 
              [href]="brand.phone | phoneLink" 
              class="flex items-center space-x-3 text-blue-600 hover:text-blue-700 font-medium transition-colors group"
            >
              <div class="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </div>
              <span>{{brand.phone}}</span>
            </a>
            <a 
              href="mailto:{{brand.email}}" 
              class="flex items-center space-x-3 text-blue-600 hover:text-blue-700 font-medium transition-colors group"
            >
              <div class="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <span>{{brand.email}}</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  `,
  standalone: true,
  imports: [PhoneLinkPipe],
})
export class NotFound {
  router = inject(Router);

  brand = BRAND;

  goHome(): void {
    this.router.navigate(['/']);
  }

  goBack(): void {
    window.history.back();
  }
}