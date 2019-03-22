import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {

  constructor() {
     }
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
