import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor( private _http: Http) { }

  get(url) {

    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + localStorage.token);
    return this._http.get(url, {
      headers : headers
    });
  }
  post(url, body) {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + localStorage.token);
    return this._http.post(url, body, {
      headers : headers
    });
  }
  delete(url) {
    const headers = new Headers();

    headers.append('Authorization', 'Bearer ' + localStorage.token);
    return this._http.delete(url, {
      headers : headers
    });
  }
  option(url) {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + localStorage.token);
    return this._http.options(url, {
      headers : headers
    });
  }
  put(url, body) {
    const headers = new Headers();
    headers.append('ClientRayda', 'pwa 1/0');
    headers.append('Authorization', 'Bearer ' + localStorage.token);
    return this._http.put(url, body, {
      headers : headers
    });
  }
}
