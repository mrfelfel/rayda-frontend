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

  public foodsColumns:String[] = ['delete', 'edit', 'name', 'price', 'type', 'descriptions'];
  public foodsData:Object[] = [{
    name: 'پیتزا',
    price: 100000,
    type: ['پرهزینه'],
    descriptions: 'غذای مشتی'
  }];
  public foodTypes:Object[] = [{ code: '', name: 'پرهزینه'}, { code: '', name: 'متوسط هزینه' }, { code: '', name: 'کم هزینه' }];
  public foodData = { name: '', price: 0, type : '', descriptions : '' }
  public mealsColumns:String[] = ['delete', 'edit', 'name', 'price', 'places', 'description'];
  public mealsData:Object[] = [{
    name : 'شام',
    description : 'وعده معمولی',
    price : 15500,
    places : [1,2,3]
   }];
   public mealData = { name: '', price: '', places: [], description: '' }
   public places: Object[] =  [{code : 1,  name : 'امیر المومنین'},{code : 2,  name : 'اصلی '},{code : 3,  name : 'ماشین سازی '}];
   public placeControl = new FormControl();
   public filteredPlaces: Observable<object[]>;

  public editMode:Boolean = false;
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

    myControl = new FormControl();
    filteredOptions: Observable<object[]>;


  ngOnInit() {
    this.filteredPlaces = this.placeControl.valueChanges
    .pipe(
      startWith(''),
      map(value => {
        value = value.toLowerCase();
        return this.places.filter(plcae=>plcae['name'].toLowerCase().includes(value));
      })
    );

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

  private _filter(value: string): object[] {
    const filterValue = value.toLowerCase();
    return this.foodsData.filter(food=>food['name'].toLowerCase().includes(filterValue));
  }

  getPlace(index){
    for(let i in this.places){
      if(this.places[i]['code'] == index){
        return this.places[i]['name'];
        break;
      }
    }
  }

  onPlaceSelect(event){
    let index = event['option']['value'];
    if(this.mealData.places.includes(index) == false){
      this.mealData.places.push(index);
    }
  }

  removePlaceChip(index){
    const i = this.mealData.places.indexOf(index);

    if (i >= 0) {
      this.mealData.places.splice(i, 1);
    }
  }

  newFood(){
    this.foodsData.push(this.foodData);
    this.foodData = { name: '', price: 0, type : '', descriptions : '' };
    this.editMode = false;
  }

  newMeal(){
    this.mealsData.push(this.mealData);
    this.mealData = { name: '', price: '', places: [], description: '' };
    this.editMode = false;
  }
}
