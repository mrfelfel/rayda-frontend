import { Component, OnInit, ChangeDetectorRef,Inject } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'jalali-moment';
import * as wordify from './index.js';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {

  public foodsColumns: String[] = ['delete', 'edit', 'name', 'price', 'type', 'descriptions'];
  public foodsData: Object[] = [];
  public foodTypes: Object[] = [{ code: '', name: 'پرهزینه' }, { code: '', name: 'متوسط هزینه' }, { code: '', name: 'کم هزینه' }];
  public foodData: any = { name: '', price: 0, type: [], descriptions: '' };
  public mealsColumns: String[] = ['delete', 'edit', 'name', 'price', 'places', 'description'];
  public mealsData: Object[] = [];
  public mealData = { name: '', price: '', places: [], description: '' };
  public places: Object[] = [{ code: 1, name: 'امیر المومنین' }, { code: 2, name: 'اصلی ' }, { code: 3, name: 'ماشین سازی ' }];
  public placeControl = new FormControl();
  public filteredPlaces: Observable<object[]>;
  public placeColumns: String[] = ['delete', 'name'];
  public placeData: Object = { name: '' };
  public placesData: Object[] = [{ name: 'مرکز اصلی' }];
  public editMode: Boolean = false;
  public updateMode: Boolean = false;
  public allHeadOptions = [{
    name: 'نام',
    code: 'firstname'
  }, {
    name: 'نام خانوادگی',
    code: 'lastname'
  }];
  public isSelectedAllOptions = false;
  public allHeadOptionsSelected = [];
  public allSearchOption = "";
  public selectedAllDataOptions = [];
  public allDataOptionsSelected = [{
    firstname: 'نام شخص',
    lastname: 'نام خوادگی شخص'
  }];
  public allDataOptionsChecked = false;
  constructor(private cdr: ChangeDetectorRef, private dialog:MatDialog) {
  }
  current = {
    year: moment().locale('fa').year().toString(),
    week: moment().jWeek()
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

  addNewPlace() {
    if (this.placeData['name'].length == 0) return;
    this.placesData.push(this.placeData);
    this.placeData = { name: '' }
    this.cdr.detectChanges();
  }

  deletePlace(index) {
    this.placesData.splice(index, 1);
  }

  setAllHeadOptions(item){
    if(this.allHeadOptionsSelected.includes(item)){
      let i = this.allHeadOptionsSelected.indexOf(item);
      this.allHeadOptionsSelected.splice(i, 1);
    } else {
      this.allHeadOptionsSelected.push(item);
    }
  }
  selectAllDataOptions(){
    if(this.allDataOptionsChecked == false){
      this.selectedAllDataOptions = [];
      this.selectedAllDataOptions = Array.from(Array(this.allDataOptionsSelected.length), (a,b)=> b);
      this.isSelectedAllOptions = true;
    } else {
      this.selectedAllDataOptions = [];
      this.isSelectedAllOptions = false;
    }
    this.allDataOptionsChecked = !this.allDataOptionsChecked;
  }

  selectOneDataOptions(index){
    this.isSelectedAllOptions = false;
    if(this.selectedAllDataOptions.includes(index)){
      let i = this.selectedAllDataOptions.indexOf(index);
      this.selectedAllDataOptions.splice(i, 1);
    } else {
      this.selectedAllDataOptions.push(index);
    }
  }
  deleteAllSelectedData(){
    this.isSelectedAllOptions = false;
    for(let i in this.selectedAllDataOptions){
      let index = this.selectAllDataOptions[i];
      this.allDataOptionsSelected.splice(index, 1);
    }
    this.selectedAllDataOptions = [];
  }

  addNewData(){
    this.dialog.open(AddNewData, { data: { allHeadOptionsSelected: this.allHeadOptionsSelected } }).afterClosed().toPromise().then(data=>{
      if(data != null){
        this.allDataOptionsSelected = this.allDataOptionsSelected.concat(data);
        this.cdr.detectChanges();
      }
    });
  }
}



@Component({
  selector: 'app-add-new-data',
  templateUrl: './addData.html',
  styleUrls: ['./food.component.scss']
})
export class AddNewData implements OnInit{
  public allDataOptionsSelected = [];
  public selectedAllDataOptions = [];
  public isSelectedAllOptions = false;
  public allDataOptionsChecked = false;
  constructor(public dialogRef: MatDialogRef<AddNewData>,
    @Inject(MAT_DIALOG_DATA) public data: any){}

  ngOnInit(){

  }
  selectAllDataOptions(){
    if(this.allDataOptionsChecked == false){
      this.selectedAllDataOptions = [];
      this.selectedAllDataOptions = Array.from(Array(this.allDataOptionsSelected.length), (a,b)=> b);
      this.isSelectedAllOptions = true;
    } else {
      this.selectedAllDataOptions = [];
      this.isSelectedAllOptions = false;
    }
    this.allDataOptionsChecked = !this.allDataOptionsChecked;
  }

  selectOneDataOptions(index){
    this.isSelectedAllOptions = false;
    if(this.selectedAllDataOptions.includes(index)){
      let i = this.selectedAllDataOptions.indexOf(index);
      this.selectedAllDataOptions.splice(i, 1);
    } else {
      this.selectedAllDataOptions.push(index);
    }
  }

  submit(action=false){
    if(action == true){
      let data = [];
      for(let i in this.selectedAllDataOptions){
        let index = this.selectedAllDataOptions[i];
        data.push(this.allDataOptionsSelected[index]);
      }
      this.dialogRef.close(data);
    } else {
      this.dialogRef.close(null);
    }
  }
}
