import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ContactModel } from './models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}


  sendEmail(data: ContactModel) {
    return this.http.post(`${environment.api}contact`, data);
  }

}
