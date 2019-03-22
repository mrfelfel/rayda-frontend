import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { ServerService } from '../../@core/server.service';
import { JwtService } from '../../@core/jwt.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  constructor(private http: ServerService, private jwt: JwtService) {

  }

  base_url = environment.APIEndpoint;

  GetSelfsList(UniID) {
      return this.http.get(this.base_url + 'self/self/' + UniID ).toPromise();
  }
  GetBooking(UniID) {
    return this.http.get(this.base_url + 'self/booking/' + UniID).toPromise();
  }
  GetMeals(UniID) {
    return this.http.get(this.base_url + 'self/meal/' + UniID  + '?gt=0').toPromise();
  }
  GetFoods(UniID) {
    return this.http.get(this.base_url + 'self/food/' + UniID + '?gt=0').toPromise();
  }
  GetGroup(UniID) {
    return this.http.get(this.base_url + 'self/group/' + UniID).toPromise();
  }
  GetMyGroup(UniID) {
  return this.http.get(this.base_url + 'self/mygroup/' + UniID).toPromise();
  }
  GetSchedules(UniID) {
    return this.http.get(this.base_url + 'self/schedule/' + UniID).toPromise();
  }
  GetSchedule(UniID, w, y) {
    return this.http.get(this.base_url + 'self/filterSchedule/' + UniID + '?week=' + w + '&year=' + y).toPromise();
  }
  FoodBooking(UniID, topost) {
     return this.http.post(this.base_url + 'self/booking/' + UniID, topost).toPromise();
   }
  FoodUnBooking(UniID, topost) {
    return this.http.post(this.base_url + 'self/unbooking/' + UniID, topost);
  }
  GetBookedByDow(UniID, y, w , d) {
    return this.http.get(this.base_url + 'self/reportsDow/' + UniID + '?week=' + w + '&year=' + y + '&dow='  + d).toPromise();

  }
  GetDeliveredByDow(UniID, y, w , d) {
    return this.http.get(this.base_url + 'self/reportsDeliveredDow/' + UniID + '?week=' + w + '&year=' + y + '&dow='  + d).toPromise();

  }
}
