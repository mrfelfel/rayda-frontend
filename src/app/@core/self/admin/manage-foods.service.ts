import { Injectable } from '@angular/core';
import { ServerService } from '../../server.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ManageFoodsService {
  UniversityCode = '';
  food = null;
  self = null;
  base_url = environment.APIEndpoint;
  constructor( private http: ServerService) { }
  addFoods() {
    return this.http.post(this.base_url, {
         'universitycode' : this.UniversityCode,
         'food' : this.food
    }).toPromise()
     .then((d) => {
       return d;
     })
     .catch((e) => {
       return e;
     });
  }
  async addSelfs(UniID) {
    try {
      const d = await this.http.post(this.base_url + 'self/self/' + UniID, this.self).toPromise();
      return d;
    } catch (e) {
      return e;
    }
  }
  addmeals(UniID) {
    return this.http.post(this.base_url + 'self/meal/' + UniID,
          this.food
    ).toPromise();
  }
  Schedule() {
    return this.http.post(this.base_url + 'self/schedule/' + localStorage.getItem('Uni'), this.food).toPromise();
  }
  SetSchedule() {
    console.log(this.food);
    return this.http.post(this.base_url + 'self/scheduling/' + localStorage.getItem('Uni'),
       this.food
    ).toPromise();
  }
  AddGroup() {
    return this.http.post(this.base_url + 'self/group/' + localStorage.getItem('Uni'),
       this.food
    ).toPromise();
  }
}
