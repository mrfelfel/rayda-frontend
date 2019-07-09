import { Component, OnInit, ChangeDetectorRef,Inject } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'jalali-moment';
import * as wordify from './index.js';
import { SocketService } from '../../@core/socket.service';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {SnaksService} from '../../snaks.service';


@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {

  public foodsColumns: String[] = ['delete', 'edit', 'name', 'price', 'type', 'descriptions'];
  public foodsData: Object[] = [];
  public foodTypes: Object[] = [{ id: '', name: 'پرهزینه' }, { id: '', name: 'متوسط هزینه' }, { id: '', name: 'کم هزینه' }];
  public foodData: any = { id: 'def', name: '', price: 0, type: [], descriptions: '', Foodstuffs : [] };
  public mealsColumns: String[] = ['delete', 'edit', 'name', 'price', 'places', 'description'];
  public mealsData: Object[] = [];
  public mealData: any = { id: 'def', name: '', price: '', places: [], description: '' };
  public placeControl = new FormControl();
  public filteredPlaces: Observable<object[]>;
  public placeColumns: String[] = ['delete', 'name'];
  public placeData: Object = { name: '', id :  '' };
  public selfData: Object = { name: '', id :  '' };
  public placeEdit = true
  public placesData: Object[] = [];
  public selfsData: [] = [];

  public editMode: Boolean = false;
  public updateMode: Boolean = false;
  public allHeadOptions = [{
    name: 'نام',
    id: 'firstname'
  }, {
    name: 'نام خانوادگی',
    id: 'lastname'
  }];
  public isSelectedAllOptions = false;
  public allHeadOptionsSelected = [];
  public allSearchOption = "";
  public selectedAllDataOptions = [];
  public allDataOptionsSelected = [];
  public allDataOptionsChecked:Boolean = false;
  public groupName = null;
  public groupCode = null;
  public groupEditMode:Boolean = false;
  public groups = [];
  constructor(private cdr: ChangeDetectorRef,private socket:SocketService, private dialog:MatDialog, private snaks:SnaksService) {
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
  times = [];
  daysdata = [];
  selectedAlg = '2';
  myControl = new FormControl();
  filteredOptions: Observable<object[]>;


  ngOnInit() {
    this.AddTime();
    this.filteredPlaces = this.placeControl.valueChanges
      .pipe(
        startWith(''),
        map(value => {
          return this.placesData.filter(plcae => plcae['name'].includes(value));
        })
      );

    for (let index = 0; index < 100; index++) {
      const element = 1370 + index;
      this.years.push(element.toString());

    }

    this.MakeWeeks();

    this.findAllPlace()
  }


  AddTime() {
    if (this.times.length >= 5) {

      return;
    }
    this.times.push('00:00');
  }
  changeAlg() {
    this.times = [];
    this.AddTime();
  }
  MakeWeeks() {
    this.dates = [];
    // this.current.week = 1;
    const m = moment().locale('fa');
    for (let index = 0; index <= 53; index++) {
      let weekDate = m.year(Number(this.current.year)).week(index);


      const result = weekDate.clone().startOf('week').format('YYYY/MM/DD');

      this.dates.push(result);

      if(index == 53){
        let newYear = Number(this.current.year)
        newYear++
        this.current.year = newYear.toString()
        weekDate = m.year(Number(this.current.year)).week(2);

        const result = weekDate.clone().startOf('week').format('YYYY/MM/DD');

        this.dates.push(result);

      }

    }

    this.cdr.detectChanges();


  }

  AddBox(item) {
    if (this.daysdata[item] == null) {
      this.daysdata[item] = [{ meal: null, food: null }];
    } else {
      this.daysdata[item].push({
        meal: null,
        food: null
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
    for (const i in this.placesData) {
      if (this.placesData[i]['id'] === index) {
        return this.placesData[i]['name'];
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
    let address = 'planning/manage/food/update'
    if (this.updateMode === false) {
      address = 'planning/manage/food/add'
      this.foodsData.push(this.foodData);
    }
    this.socket.SyncQueryGram( {
      scope : 'reserveSystem',
      address : address,
      timeout : 2000,
      info : {
        method : 'DO',
        data : {
          data : this.foodData
        }
      }
    });
    this.foodData = { name: '', price: 0, type: '', descriptions: '' };
    this.editMode = false;
  }

  newMeal() {
    let address = 'planning/manage/meal/update'
    if (this.updateMode === false) {
      address = 'planning/manage/meal/add'
      this.mealsData.push(this.mealData);
    }

    this.socket.SyncQueryGram({
      scope : 'reserveSystem',
      address : address,
      timeout : 2000,
      info : {
        method : 'DO',
        data : {
          data : this.mealData
        }
      }
    })
    .then((d)=>{
      console.log(d)
    })
    this.mealData = { id : '', name: '', price: '', places: [], description: '' };
    this.editMode = false;
  }

  onBoxChange(event) {
    this.daysdata[event['day']][event['meal']] = event['data'];
  }

  startScheduling() {



    for (let index = 0; index < this.daysdata.length; index++) {
      const element = this.daysdata[index];
      element.forEach(delement => {
        if(!delement.food) {
          this.snaks.openSnackBar('غذا را انتخاب کنید' , 'بستن')
        }

        if(!delement.meal) {
          this.snaks.openSnackBar('وعده را انتخاب کنید' + index , 'بستن')
        }
      });
    }


  }

  addNewPlace() {
    if (this.placeData['name'].length == 0) return;


    let placesData = [...this.placesData]
    placesData.push(this.placeData);
    this.placeData = { name: '' }

    this.socket.SyncQueryGram({
      scope : 'reserveSystem',
      address : 'planning/manage/place/add',
      timeout : 3000,
      info : {
        method : 'DO',
        data : {
          data : placesData,
          updateMode : false
        }
      }
    })
    .then((data)=>{



      this.placesData = data['data'].data.list;

      this.cdr.markForCheck();

    })
    .catch((e)=>{

      this.snaks.openSnackBar('سرویس رزرو و برنامه ریزی غذایی در دسترس نیست', 'بستن')

      this.cdr.markForCheck();


    })
  }
  findAllPlace() {
    this.socket.SyncQueryGram({
      scope : 'reserveSystem',
      address : 'planning/manage/place/get',
      timeout : 5000,
      info : {
        method : 'DO',
        data : {
          data : this.placesData,
          updateMode : false
        }
      }
    })
    .then((data)=>{

      this.placesData = data['data'].data.list;

      this.cdr.markForCheck();

    })
    .catch((e)=>{


      console.log(e)

      this.snaks.openSnackBar('سرویس رزرو و برنامه ریزی غذایی در دسترس نیست', 'بستن')

      this.cdr.markForCheck();


    })
  }

  deletePlace(index) {
    this.placesData.splice(index, 1);
    this.socket.SyncQueryGram({
      scope : 'reserveSystem',
      address : 'planning/manage/place/add',
      timeout : 10000,
      info : {
        method : 'DO',
        data : {
          data : this.placesData,
          updateMode : false
        }
      }
    })
    .then((d)=>{
      this.cdr.markForCheck();
    })
    .catch((e)=>{

      this.placeEdit = false
      this.snaks.openSnackBar('سرویس رزرو و برنامه ریزی غذایی در دسترس نیست', 'بستن')
      this.cdr.markForCheck();


    })
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

  setEditGroup(data){
    this.groupName = data['name'];
    this.groupCode = data['code'];
    this.allDataOptionsSelected = data['data'];
    this.groupEditMode = true;
    this.editMode = true;
  }

  saveGroup(){
    this.groups.push({
      id: this.groups.length, // <=
      name: this.groupName,
      data: this.allDataOptionsSelected
    })
    this.closeGroup();
  }

  editGroup(){
    this.closeGroup();
  }

  closeGroup(){
    this.groupName = null;
    this.groupCode = null;
    this.groupEditMode = false;
    this.allDataOptionsChecked = false;
    this.allDataOptionsSelected = [];
    this.allHeadOptionsSelected = [];
    this.allSearchOption = null;
    this.isSelectedAllOptions = false;
    this.selectedAllDataOptions = [];
    this.editMode = false;
  }


}



@Component({
  selector: 'app-add-new-data',
  templateUrl: './addData.html',
  styleUrls: ['./food.component.scss']
})
// tslint:disable-next-line:component-class-suffix
export class AddNewData implements OnInit {
  public allDataOptionsSelected = [];
  public selectedAllDataOptions = [];
  public isSelectedAllOptions = false;
  public allDataOptionsChecked = false;
  public search = null;
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
      }for(let i in this.selectedAllDataOptions){
        let index = this.selectedAllDataOptions[i];
        data.push(this.allDataOptionsSelected[index]);
      }
      this.dialogRef.close(data);
    } else {
      this.dialogRef.close(null);
    }
  }
  greaterThan(sub, num) {
    return sub < num;
  }
}
