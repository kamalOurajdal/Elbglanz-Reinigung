import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { BRAND } from '../../../shared/constants';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team.html',
  styles: [],
})
export class Team {
  @Input() isHome: boolean = false;
  private title = inject(Title);
  private meta = inject(Meta);

  brand = BRAND;
  
  director = {
    name: 'Lvana Chi haja',
    title: 'Directeur général',
    photoSrc: 'assets/images/team/director.jpg',
    photoAlt: 'Portrait of the Directeur général',
    bio: 'Mit über 10 Jahren Erfahrung in der Reinigungsbranche führt Max unser Team mit Leidenschaft und Engagement für höchste Qualitätsstandards. Seine Vision von exzellenter Servicequalität und kundenorientiertem Arbeiten prägt unser Unternehmen und garantiert Ihnen erstklassige Reinigungslösungen.',
  };

  ngOnInit() {
    if (this.isHome) return;
    this.title.setTitle(`Unser Team – ${this.brand.name} Reinigung Dresden`);
    this.meta.updateTag({
      name: 'description',
      content: `Lernen Sie unser engagiertes Team kennen – motivierte Fachkräfte, die mit Erfahrung und Leidenschaft für Sauberkeit sorgen.`
    });
  }
}

