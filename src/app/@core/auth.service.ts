import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {

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
       if (d['status']) {
         this.changeMessage('logged');
       localStorage.setItem('token', d['token']);
       localStorage.setItem('uid', data.username);

       }
       return d['status'];

    });
  }
  newpass(data) {
    return this.http.post(environment.UserApi + 'new', data).toPromise()
    .then((d) => {
       return d['status'];

    });
  }
  forgot(data) {
    return this.http.post(environment.UserApi + 'forgot', data)
    .toPromise();
  }
  async checkLevel() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.token
      })
    };
    try {
      const ok = await this.http.get('https://levelc.rayda.ir/' + `level?q=${Math.random()}`, httpOptions)
      .toPromise();



      return ok['level'];
    } catch (error) {
      console.log('check level :'  + error);
    }
    return false;

  }

IsLoggedIn() {
  return localStorage.token ? true : false;
}


}
