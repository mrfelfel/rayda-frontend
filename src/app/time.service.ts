import { Injectable } from '@angular/core';
import * as moment from 'jalali-moment';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() { }

  ConvertYearToUnixTime(y = null) {
    if (y) {
    return Math.round((new Date(y, 1, 1, 0, 0, 0)).getTime() / 1000);
     }
  return Math.round((new Date()).getTime() / 1000);
}
  G2Jweek(w, y) {
     if (w < 42) {
       return {w : w + 11, y : y };
     } else {
       return {w : w - 41, y : y + 1 };
     }
  }
  firstDayOfWeek(w) {
    if (w < 42) {
      const weeki = moment().set('week', w + 11).set('year', moment().year() - 1).startOf('week');
      return {
        y :     weeki.jYear(),
        m :     weeki.jMonth() + 1,
        d :     weeki.jDate() - 1
      };
    } else {
      const weeki = moment().set('week', w - 41).set('year', moment().year()).startOf('week');
      return {
        y :     weeki.jYear(),
        m :     weeki.jMonth() + 1,
        d :     weeki.jDate() - 1
      };
    }

  }
}
