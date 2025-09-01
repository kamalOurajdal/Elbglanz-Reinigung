import { Component } from '@angular/core';
import { ICONS } from '../../../shared/constants';

interface Service {
  title: string;
  icon: string;
  desc: string;
}

@Component({
  selector: 'app-services',
  imports: [],
  templateUrl: './services.html',
})
export class Services {
  icons = ICONS;


  scrollToId(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

    services: Service[] = [
    {
      title: 'Büroreinigung',
      icon: 'building',
      desc: 'Gründliche Reinigung für Büros und Co-Working Spaces.',
    },
    {
      title: 'Baustellen‑/Grundreinigung',
      icon: 'broom',
      desc: 'Nach Bauarbeiten oder Umzug – tiefenrein & staubfrei.',
    },
    {
      title: 'Arztpraxen & Kliniken',
      icon: 'shield',
      desc: 'Hygienestandards mit definierten Checklisten.',
    },
    {
      title: 'Glas/Fenster',
      icon: 'sparkles',
      desc: 'Streifenfreier Glanz für Glasflächen & Schaufenster.',
    },
    {
      title: 'Teppiche/Polster',
      icon: 'leaf',
      desc: 'Materialschonende Pflege & Geruchsneutralisierung.',
    },
    {
      title: 'Unterhaltsreinigung',
      icon: 'clock',
      desc: 'Planbare Intervalle – täglich, wöchentlich, monatlich.',
    },
  ];
}
