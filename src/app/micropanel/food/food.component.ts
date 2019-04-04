import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'jalali-moment';
import * as wordify from './index.js';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {

  constructor(     private cdr: ChangeDetectorRef    ) {
     }
     current = {
         year : moment().locale('fa').year().toString(),
         week : moment().jWeek()
     };
     wordify = wordify;
     days = [
      'شنبه',
      'یکشنبه',
      'دوشنبه',
      'سه شنبه',
      'چهار شنبه',
      'پنجشنبه',
      'جمعه'
    ];
    years = [];
    dates = [];
    items = [];
    daysdata = [];
    meals = [{
      value : 1,
      viewValue : 'ناهار'
    },
    {
      value : 2,
      viewValue : 'شام'
    }];

    myControl = new FormControl();
    foods: string[] = ['قرمه سبزی', 'کوکو سبزی', 'کدو حلوایی'];
    filteredOptions: Observable<string[]>;


  ngOnInit() {

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    for (let index = 0; index < 100; index++) {
      const element = 1370 + index;
      this.years.push(element.toString());

    }

     this.MakeWeeks();
  }

  MakeWeeks() {
    this.dates = [];
    // this.current.week = 1;
    const m = moment().locale('fa');
    for (let index = 1; index <= 52; index++) {
      const weekDate = m.year(Number(this.current.year)).week(index);

      const result  = weekDate.clone().startOf('week').format('YYYY/MM/DD');

      this.dates.push(result);



    }

    this.cdr.detectChanges();


  }

  AddBox(item) {
    if (!this.daysdata[item]) {
      this.daysdata[item] = [];
    }
    this.daysdata[item].push({
      meal : 2,
      food : ''
    });
    this.cdr.detectChanges();
  }

  Delete(i , m) {
    this.daysdata[i].splice(m, 1);


    this.cdr.detectChanges();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.foods.filter(option => option.toLowerCase().includes(filterValue));
  }

}
