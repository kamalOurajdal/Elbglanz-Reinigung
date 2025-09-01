interface Brand {
  name: string;
  city: string;
  phone: string;
  email: string;
  address: string;
}

export const BRAND: Brand = {
    name: 'Elbglanz Reinigung',
    city: 'Berlin',
    phone: '+49 351 1234567',
    email: 'info@Elbglanz.de',
    address: 'Berlin Str. 12, 01159 Berlin'
  };


export const ICONS: any = {
    broom: 'M2 22l5-5m0 0 4 4M7 17 17 7m3-3 1 1a2 2 0 0 1 0 3L11 16 8 13 20 1',
    sparkles: 'M12 2l1.8 4.2L18 8l-4.2 1.8L12 14l-1.8-4.2L6 8l4.2-1.8L12 2Zm7 9l.9 2.1L22 14l-2.1.9L19 17l-.9-2.1L16 14l2.1-.9L19 11Zm-14 4l.9 2.1L8 18l-2.1.9L5 21l-.9-2.1L2 18l2.1-.9L5 15Z',
    shield: 'M12 2l8 4v6c0 5-3.6 9.8-8 10-4.4-.2-8-5-8-10V6l8-4Z',
    clock: 'M12 6v6l4 2M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Z',
    leaf: 'M3 21s6-1 10-5 5-10 5-10-6 1-10 5-5 10-5 10Zm0 0 6-6',
    building: 'M3 21h18M6 21V3h12v18M9 8h6M9 12h6M9 16h6',
    star: 'M12 3l2.7 5.5L21 10l-4.5 4.1L17.5 20 12 17.5 6.5 20l1-5.9L3 10l6.3-1.5L12 3Z',
    phone: 'M22 16.9v3a2 2 0 0 1-2.2 2 19.7 19.7 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.7 19.7 0 0 1 2.1 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.8.3 1.5.6 2.2a2 2 0 0 1-.5 2.1L8 9a16 16 0 0 0 7 7l1-1.1a2 2 0 0 1 2.1-.5c.7.3 1.4.5 2.2.6a2 2 0 0 1 1.7 1.9Z',
    mail: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 0 8 7 8-7',
    map: 'M9 18l-6 3V6l6-3 6 3 6-3v15l-6 3-6-3V3',
    check: 'M20 6 9 17l-5-5'
  };

export const NAV_ITEMS = [
  { label: 'Startseite', id: 'home' },
  { label: 'Über uns', id: 'about_us' },
  { label: 'Leistungen', id: 'services' },
  { label: 'warum wir', id: 'warum_wir' },
  { label: 'Kundenstimmen', id: 'testimonials' },
  { label: 'FAQ', id: 'faq' },
];
