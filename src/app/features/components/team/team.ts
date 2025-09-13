import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-team-2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team.html',
  styles: [],
})
export class Team {
  director = {
    name: 'Lvana Chi haja',
    title: 'Directeur général',
    photoSrc: 'assets/images/team/director.jpg',
    photoAlt: 'Portrait of the Directeur général',
    bio: 'Mit über 10 Jahren Erfahrung in der Reinigungsbranche führt Max unser Team mit Leidenschaft und Engagement für höchste Qualitätsstandards. Seine Vision von exzellenter Servicequalität und kundenorientiertem Arbeiten prägt unser Unternehmen und garantiert Ihnen erstklassige Reinigungslösungen.',
    email: 'max.mustermann@ossi-reinigung.de',
    phone: '+49 351 1234567',
  };
}

