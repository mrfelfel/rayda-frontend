import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  base_url = environment.APIEndpoint;
  constructor(private server: ServerService) { }



  GetByCard(University, identify, meal, week, dow) {
       return this.server.get(this.base_url + 'self/delivery/' + University + '?id=' + identify +
        '&meal=' + meal
        + '&dow=' + dow
        + '&week=' + week
        );
  }
  DefineCard(University, topost) {
    return this.server.post(this.base_url + 'user/CardDefine/' + University, topost);
  }
  RemoveCard(University, topost) {
    return this.server.post(this.base_url + 'user/RemoveCard/' + University, topost);
  }
}
