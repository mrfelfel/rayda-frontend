import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'jalali-moment';

@Component({
  selector: 'app-bazzar',
  templateUrl: './bazzar.component.html',
  styleUrls: ['./bazzar.component.scss']
})
export class BazzarComponent implements OnInit {

  constructor() { }
  weekNum = moment().jWeek();
  message = '';
  selected = new FormControl(0);
  cost = 0;
  uid = '';
  days = [
    'شنبه',
    'یکشنبه',
    'دوشنبه',
    'سه شنبه',
    'چهار شنبه',
    'پنجشنبه',
    'جمعه'
  ];

  ngOnInit() {
  }

}
