import { Component } from '@angular/core';

@Component({
  selector: 'app-stats',
  imports: [],
  templateUrl: './stats.html'
})
export class Stats {

  stats = [
    { label: 'Jahre Erfahrung', value: '8+' },
    { label: 'Zufriedene Kunden', value: '300+' },
    { label: 'Teamgröße', value: '25' },
    { label: 'Städte', value: '6' },
  ];
}
