import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { BRAND } from '../../../shared/constants';

interface Testimonial {
  name: string;
  role: string;
  text: string;
  location: string;
  stars: number;
}

@Component({
  selector: 'app-testimonials',
  imports: [CommonModule],
  templateUrl: './testimonials.html',
  styles: [
    `
      @keyframes infinite-scroll {
        from {
          transform: translateX(0);
        }
        to {
          transform: translateX(-50%);
        }
      }

      /* Apply the animation to the track container.
        - animation: The keyframes, duration, timing function, and iteration count.
        - will-change: A performance hint for the browser.
      */
      .animate-infinite-scroll {
        animation: infinite-scroll 50s linear infinite;
        will-change: transform;
      }

      /* Accessibility: Pause the animation for users who prefer reduced motion. */
      @media (prefers-reduced-motion: reduce) {
        .animate-infinite-scroll {
          animation: none;
        }
      }
    `,
  ],
})
export class Testimonials {
  @Input() isHome: boolean = false;
  private title = inject(Title);
  private meta = inject(Meta);

  brand = BRAND;
  
  testimonials: Testimonial[] = [
    {
      name: 'Lukas R.',
      role: 'Unternehmer',
      location: 'Dresden',
      text: 'Mit Ossi Cleaning ist unser Büro immer sauber und gepflegt. Die Mitarbeiter sind zuverlässig und arbeiten sehr gründlich. Wir können sie nur weiterempfehlen.',
      stars: 5,
    },
    {
      name: 'Martina H.',
      role: 'Privatkunden',
      location: 'Leipzig',
      text: 'Seit Ossi Cleaning bei uns zu Hause reinigt, haben wir deutlich mehr Zeit für die Familie. Alles läuft unkompliziert und absolut vertrauenswürdig.',
      stars: 5,
    },
    {
      name: 'Jonas K.',
      role: 'Büroleiter',
      location: 'Chemnitz',
      text: 'Unsere Büroräume sind immer top in Schuss. Besonders beeindruckt uns die Flexibilität, auch bei kurzfristigen Terminen. Wirklich ein starker Partner.',
      stars: 5,
    },
    {
      name: 'Anna S.',
      role: 'Praxismanagerin',
      location: 'Dresden',
      text: 'Für unsere Praxis war Sauberkeit schon immer entscheidend. Ossi Cleaning sorgt seit Monaten zuverlässig dafür, dass alles hygienisch und einladend ist. Sehr empfehlenswert!',
      stars: 5,
    },
  ];

  getStarArray(count: number): number[] {
    return Array(count).fill(0);
  }

  ngOnInit() {
    if (this.isHome) return;
    this.title.setTitle(`Kundenstimmen – ${this.brand.name} Reinigung Dresden`);
    this.meta.updateTag({
      name: 'description',
      content: `Echte Bewertungen unserer Kunden: hohe Qualität, Zuverlässigkeit und herausragender Service in Dresden und Umgebung.`
    });
  }
}
