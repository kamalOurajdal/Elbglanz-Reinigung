import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';


interface Testimonial {
  name: string;
  role: string;
  text: string;
  location: string;
  stars: number;
}


@Component({
  selector: 'app-testimonials',
  imports: [],
  templateUrl: './testimonials.html',
    styles: [`
    @keyframes scroll-rtl {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-50%);
      }
    }

    .animate-scroll-rtl {
      animation: scroll-rtl 30s linear infinite;
      width: calc(200%);
    }

   

    @media (prefers-reduced-motion: reduce) {
      .animate-scroll-rtl {
        animation: none;
      }
    }
  `]
})
export class Testimonials implements AfterViewInit, OnDestroy {

   testimonials: Testimonial[] = [
    {
      name: 'Klaus Weber',
      role: 'Geschäftsführer',
      location: 'München',
      text: 'Dank der professionellen Beratung konnten wir unsere Produktivität um 40% steigern. Die Zusammenarbeit war von Anfang an hervorragend und die Ergebnisse sprechen für sich.',
      stars: 5
    },
    {
      name: 'Sabine Müller',
      role: 'Marketing Direktorin',
      location: 'Hamburg',
      text: 'Endlich ein Partner, der unsere Vision versteht! Die digitale Transformation unseres Unternehmens war ein voller Erfolg. Wir sind begeistert von der Qualität und dem Service.',
      stars: 5
    },
    {
      name: 'Thomas Schmidt',
      role: 'IT-Leiter',
      location: 'Berlin',
      text: 'Herausragende technische Expertise und ein Team, das wirklich zuhört. Die Implementierung verlief reibungslos und unser System läuft seitdem perfekt.',
      stars: 5
    },
    {
      name: 'Andrea Fischer',
      role: 'Inhaberin',
      location: 'Köln',
      text: 'Als kleines Unternehmen waren wir skeptisch, aber die individuelle Betreuung und die maßgeschneiderten Lösungen haben uns überzeugt. Top Preis-Leistungs-Verhältnis!',
      stars: 5
    },
    {
      name: 'Michael Hoffmann',
      role: 'Vertriebsleiter',
      location: 'Frankfurt',
      text: 'Seit der Zusammenarbeit haben sich unsere Verkaufszahlen verdoppelt. Die strategische Beratung war goldwert und die Umsetzung professionell.',
      stars: 5
    },
    {
      name: 'Julia Becker',
      role: 'Personalchefin',
      location: 'Stuttgart',
      text: 'Dank der neuen Prozesse sparen wir täglich Stunden an Arbeitszeit. Das Team ist kompetent, freundlich und immer erreichbar. Absolute Empfehlung!',
      stars: 5
    },
    {
      name: 'Robert Wagner',
      role: 'Prokurist',
      location: 'Düsseldorf',
      text: 'Die Optimierung unserer Lieferkette war ein Gamechanger. Pünktliche Lieferung, professionelle Abwicklung und messbare Ergebnisse - was will man mehr?',
      stars: 5
    },
    {
      name: 'Christine Braun',
      role: 'Geschäftsführerin',
      location: 'Leipzig',
      text: 'Von der ersten Beratung bis zur finalen Umsetzung - alles perfekt! Unser neues Corporate Design bringt uns deutlich mehr Anfragen und Kunden.',
      stars: 5
    },
    {
      name: 'Alexander Klein',
      role: 'Entwicklungsleiter',
      location: 'Berlin',
      text: 'Innovative Ansätze und moderne Technologien haben unser Produkt auf das nächste Level gebracht. Die Expertise des Teams ist beeindruckend.',
      stars: 5
    },
    {
      name: 'Petra Zimmermann',
      role: 'Filialleiterin',
      location: 'Nürnberg',
      text: 'Der Kundenservice ist beispielhaft und die Ergebnisse übertreffen unsere Erwartungen. Wir fühlen uns bestens betreut und gut aufgehoben.',
      stars: 5
    },
    {
      name: 'Stefan Koch',
      role: 'Operations Manager',
      location: 'Hannover',
      text: 'Effiziente Prozesse, klare Kommunikation und termingerechte Lieferung. Die Partnerschaft hat unser Unternehmen nachhaltig gestärkt.',
      stars: 5
    },
    {
      name: 'Monika Richter',
      role: 'Inhaberin',
      location: 'Bremen',
      text: 'Die digitale Präsenz unseres Wellness-Centers hat sich komplett verwandelt. Mehr Online-Buchungen und zufriedenere Kunden - einfach perfekt!',
      stars: 5
    }
  ];

  getStarArray(count: number): number[] {
    return Array(count).fill(0);
  }

  // Get a reference to the <div #scroller> element from the template
  @ViewChild('scroller') scroller!: ElementRef<HTMLDivElement>;

  // A reference to the event listener so we can remove it later
  private scrollListener!: () => void;

  constructor() { }

  ngAfterViewInit(): void {
    // We set up the listener in AfterViewInit to ensure the element is available
    this.setupInfiniteScroll();
  }

  setupInfiniteScroll(): void {
    const scrollerEl = this.scroller.nativeElement;

    this.scrollListener = () => {
      // Calculate the halfway point of the entire scrollable width
      const scrollWidth = scrollerEl.scrollWidth;
      const halfwayPoint = scrollWidth / 2;
      
      // Get the current horizontal scroll position
      const scrollLeft = scrollerEl.scrollLeft;

      // If the user scrolls past the first set of items...
      if (scrollLeft >= halfwayPoint) {
        // ...teleport them back to the start of the identical items.
        // We subtract the width of one full set of items to maintain the visual position.
        scrollerEl.scrollLeft -= halfwayPoint;
      }
    };

    // Add the scroll event listener
    scrollerEl.addEventListener('scroll', this.scrollListener);
  }

  ngOnDestroy(): void {
    // IMPORTANT: Clean up the event listener to prevent memory leaks
    if (this.scroller && this.scrollListener) {
      this.scroller.nativeElement.removeEventListener('scroll', this.scrollListener);
    }
  }

  // Your existing getStarArray function
}
