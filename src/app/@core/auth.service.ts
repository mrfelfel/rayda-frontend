import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: Http) {

  }
  private messageSource = new BehaviorSubject('hello');
  currentMessage = this.messageSource.asObservable();
  base_url = environment.Endpoint;
  changeMessage(message: string) {
   this.messageSource.next('hi');
 }
  login(data) {
    return this.http.post(environment.UserApi + 'login', data).toPromise()
    .then((d) => {
       if (d.json().status) {
         this.changeMessage('logged');
       localStorage.setItem('token', d.json().token);
       localStorage.setItem('uid', data.username);

       }
       return d.json().status;

    });
  }
  newpass(data) {
    return this.http.post(environment.UserApi + 'new', data).toPromise()
    .then((d) => {
       return d.json().status;

    });
  }
  forgot(data) {
    return this.http.post(environment.UserApi + 'forgot', data)
    .toPromise();
  }
  async checkLevel() {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + localStorage.token);
    try {
      const ok = await this.http.get('https://levelc.rayda.ir/' + `level?q=${Math.random()}`, {
        headers : headers
      })
      .toPromise();



      return ok.json().level;
    } catch (error) {
      console.log('check level :'  + error);
    }
    return false;

  }

IsLoggedIn() {
  return localStorage.token ? true : false;
}
}
