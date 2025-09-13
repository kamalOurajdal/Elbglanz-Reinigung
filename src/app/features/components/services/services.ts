import { Component } from '@angular/core';
import { ICONS, OSSI_SERVICES, Service } from '../../../shared/constants';
import { scrollToId } from '../../../shared/utils/shared.utils';
@Component({
  selector: 'app-services',
  imports: [],
 
templateUrl: './services.html',
})
export class Services {
  icons = ICONS;

  scrollToId = scrollToId;

  services: Service[] = OSSI_SERVICES;
}
