import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'jalali-moment';
import * as wordify from './index.js';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {

  public foodsColumns: String[] = ['delete', 'edit', 'name', 'price', 'type', 'descriptions'];
  public foodsData: Object[] = [];
  public foodTypes: Object[] = [{ code: '', name: 'پرهزینه'}, { code: '', name: 'متوسط هزینه' }, { code: '', name: 'کم هزینه' }];
  public foodData: any = { name: '', price: 0, type : [], descriptions : '' };
  public mealsColumns: String[] = ['delete', 'edit', 'name', 'price', 'places', 'description'];
  public mealsData: Object[] = [];
   public mealData = { name: '', price: '', places: [], description: '' };
   public places: Object[] =  [{code : 1,  name : 'امیر المومنین'}, {code : 2,  name : 'اصلی '}, {code : 3,  name : 'ماشین سازی '}];
   public placeControl = new FormControl();
   public filteredPlaces: Observable<object[]>;
   public placeColumns: String[] = ['delete', 'name'];
   public placeData: Object = { name: '' };
   public placesData: Object[] = [{ name: 'مرکز اصلی'}];
  public editMode: Boolean = false;
  public updateMode: Boolean = false;
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
        return this.places.filter(plcae => plcae['name'].toLowerCase().includes(value));
      })
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

      const result = weekDate.clone().startOf('week').format('YYYY/MM/DD');

      this.dates.push(result);



    }

    this.cdr.detectChanges();


  }

  AddBox(item) {
    if (this.daysdata[item] == null) {
      this.daysdata[item] = [{ meal: 0, food: '' }];
    } else {
      this.daysdata[item].push({
        meal: 0,
        food: ''
      });
    }
    this.cdr.detectChanges();
  }

  Delete(event) {
    const i = event['day'], m = event['meal'];
    this.daysdata[i].splice(m, 1);


    this.cdr.detectChanges();
  }

  getPlace(index) {
    for (const i in this.places) {
      if (this.places[i]['code'] === index) {
        return this.places[i]['name'];
        break;
      }
    }
  }

  onPlaceSelect(event) {
    const index = event['option']['value'];
    if (this.mealData.places.includes(index) === false) {
      this.mealData.places.push(index);
    }
  }

  removePlaceChip(index) {
    const i = this.mealData.places.indexOf(index);

    if (i >= 0) {
      this.mealData.places.splice(i, 1);
    }
  }

  newFood() {
    if (this.updateMode === false) {
      this.foodsData.push(this.foodData);
    }
    this.foodData = { name: '', price: 0, type: '', descriptions: '' };
    this.editMode = false;
  }

  newMeal() {
    if (this.updateMode === false) {
      this.mealsData.push(this.mealData);
    }
    this.mealData = { name: '', price: '', places: [], description: '' };
    this.editMode = false;
  }

  onBoxChange(event) {
    this.daysdata[event['day']][event['meal']] = event['data'];
  }

  startScheduling() {

    console.log(this.daysdata);
  }

  addNewPlace(){
    if(this.placeData['name'].length == 0) return;
    this.placesData.push(this.placeData);
    this.placeData = { name: '' }
    this.cdr.detectChanges();
  }

  deletePlace(index){
    this.placesData.splice(index,1);
  }
}
