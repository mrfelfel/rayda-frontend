import { Injectable } from '@angular/core';
import {ServerService} from './server.service' ;
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  base_url = environment.APIEndpoint;
  constructor(private http: ServerService) {}

  async GetUser() {
    const data = await this.http.get(this.base_url + 'user')
      .toPromise();
    localStorage.setItem('user', JSON.stringify(data.json()));
    return data.json();
  }
}
