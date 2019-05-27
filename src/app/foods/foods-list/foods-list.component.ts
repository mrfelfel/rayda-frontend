import { Component, OnInit, ViewChild, Inject, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {style, state, animate, transition, trigger} from '@angular/animations';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {BookingService} from '../../@core/self/booking.service';
import {JwtService} from '../../@core/jwt.service';
import {TimeService} from '../../time.service';
import {SnaksService} from '../../snaks.service';
import {ServerService} from '../../@core/server.service';
import {UniversityService} from '../../@core/university.service';
import {SocketService} from '../../@core/socket.service';

import * as moment from 'jalali-moment';
import * as _ from 'lodash';
import { FormControl } from '@angular/forms';
import { ClipboardService } from 'ngx-clipboard';
import { MdcTabActivatedEvent } from '@angular-mdc/web';

interface FoodData {
  dow:  Number;
  ID:   string;
  week: Number;
  year: Number;
  reserve: Boolean;
  meal: string;
  food: string;
  self: string;
  place: string;
}
interface Reservation {
  dow:  Number;
  week: Number;
  year: Number;
  meal: string;
  food: string;
  self: string;
  place: string;
}
@Component({
  selector: 'app-foods',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ],
  templateUrl: './foods-list.component.html',
  styleUrls: ['./foods-list.component.scss'],
  providers : [BookingService, JwtService, TimeService]
})
export class FoodsListComponent implements OnInit, OnDestroy {
   constructor( private snaks: SnaksService,
     public dialog: MatDialog,
     private booking: BookingService,
     private jwt: JwtService,
     private time: TimeService,
     private Server: ServerService,
     private university: UniversityService,
     private activatedRoute: ActivatedRoute,
     private _clipboardService: ClipboardService,
     private cdr: ChangeDetectorRef,
     private socketService: SocketService,
     ) {}
  @ViewChild('tabGroup') tabGroup;
  weekNum = 0;
  yearNum = moment().jYear();
  usocket = this.socketService.socket;
  days = [
    'شنبه',
    'یکشنبه',
    'دوشنبه',
    'سه شنبه',
    'چهار شنبه',
    'پنجشنبه',
    'جمعه'
  ];
  places = [
    'سلف مرکزی',
    'ماشین سازی',
    'امیر المونین'
  ];
  planned = null;
  searched = null;
  selected = new FormControl(0);
  reserved = null;
  liked = null;
  weekurl = null;
  unliked = null;

  tab = 0;
  locked = true;
  error = false;
  message = 'در حال اتصال ...';
  nameSpace = '';

  ft = {y : 0, w : 0};
  transferNational = '';
  tcost = 0;
  cost = 0;
  bcost: Number = 0;
  date = moment().add(8, 'd').startOf('weeks').subtract(1, 'd');

  clone = this.date.clone();

  uid: String = '';
  viewId = localStorage.viewName ? localStorage.viewName : null;

  ngOnInit() {
    const getDate = this.activatedRoute.snapshot.params['id'];


    const NewDate = moment(getDate, 'jYYYY-jMM-jDD').isValid() ? moment(getDate, 'jYYYY-jMM-jDD') : false;
    if (NewDate) {
      this.date = NewDate;
      this.clone = NewDate.clone();
    }
   this.weekNum = moment().jWeek();
   this.clone = this.clone.add(7, 'd');

   if (this.weekNum > 52) {
    this.yearNum++;
   } else {
    this.weekNum++;
   }



    this.DataGram({
      scope : 'reserveSystem',
      address : 'Foodlist/Reserved',
      type : 'object',
    }, (data) => {
      console.log(data)
      if (data.type === 'unreserve') {
        _.remove(this.reserved, {
          dow: data.data.dow,
          food: data.data.food.id,
          meal: data.data.meal.id,
          week: data.data.week,
          year: data.data.year
      });
      } else {
         this.reserved.push({
          dow: data.data.dow,
          food: data.data.food.id,
          meal: data.data.meal.id,
          week: data.data.week,
          year: data.data.year,
          place : data.data.place
      });
      }
      this.update();

      // this.snaks.openSnackBar(data.message, 'بستن');
    });
    this.DataGram({
      scope : 'reserveSystem',
      address : 'Foodlist/user',
      type : 'object',
    }, (data)=>{
      this.cost = data.data.cost;
      this.uid = data.data.uid;
      this.nameSpace = data.data.nameSpace;
      this.update();

    })

    this.DataGram({
      scope : 'reserveSystem',
      address : 'Foodlist/balancing',
      type : 'object',
    }, (data)=>{
      if (data.data.add) {
        this.cost += Number(data.data.cost);
      } else {
        this.cost += Number(data.data.cost * -1);
      }
      this.update();
    })
    /* this.socket.on('planned', (data) => {


      console.log(data);
      this.planned = data;
      this.Dowsearch();

      this.update();

    });
    this.socket.on('noplanned', (data) => {
      console.log(data);
      this.planned = null;
      this.message = 'برای این هفته این برنامه ای وجود ندارد';
      // this.snaks.openSnackBar('برای این هفته هیچ برنامه غذایی تعریف نشده است', 'بستن');

      this.update();
    });
    */
    this.DataGram({
      scope : 'reserveSystem',
      address : 'Foodlist/plan',
      type : 'object',
    }, (data)=>{

      const d = data.data
      if(d.plan){
        this.planned = d.plan;
        this.reserved = d.reserved;

        this.error = !d.mode;
        this.Dowsearch();

        this.update();
      }else {
        this.planned = null;
        this.message = 'برای این هفته این برنامه ای وجود ندارد';
        this.update();

      }
    })
    this.usocket.on('news', (data) => {
      console.log(data);
    });
    this.usocket.emit('query_gram', {
      scope : 'reserveSystem',
      address : 'reserveSystem/actions/Plan',
      info : {
        method : 'GET',
        data : {
          year : this.clone.jYear(),
          week : this.date.jWeek()
        }
      }
    });
    window.history.replaceState( {} , null ,  document.location.protocol +
      '//' + document.location.host + '/foods/' + this.date.format('jYYYY-jMM-jDD'));
  }
  ngOnDestroy() {
    this.reserved = null;
  }
  Dowsearch() {
     this.searched = this.planned.filter((item) => {
          if (item.dow === this.tab) {
            return item;
          }
    });


    if (this.searched.length === 0) {
      this.searched = null;
    }
  }
  Reservedsearch(dow, meal, food, year, week) {
    if (!this.reserved) {
      return false;

    }
    this.searched = this.reserved.find((item) => {
         if ((item.dow === dow) && (item.meal === meal ) && (item.food === food ) && (item.year === year ) && (item.week === week )) {
           return item;
         }
   });
   if (this.searched ) {
        return true;
   }

      return false;
 }
 // get food schedule by week d

 SetWeek(p): void {

   this.planned = null;
   this.error = false;
   this.message = 'دریافت اطلاعات'
   if (p === 'next') {
    this.date = this.date.add(7, 'd');
          this.weekNum++;
   } else if (p === 'previous') {
    this.date = this.date.subtract(7, 'd');
    this.weekNum--;
   } else if (p === 'current') {
    this.date = moment().add(1, 'd').startOf('weeks').subtract(1, 'd');

    this.weekNum = moment().jWeek();
   }



   this.clone = this.date.clone().add(7, 'd');
  this.usocket.emit('query_gram', {
    scope : 'reserveSystem',
    address : 'reserveSystem/actions/Plan',
    info : {
      method : 'GET',
      data : {
        year : this.clone.jYear(),
        week : this.date.jWeek()
      }
    }
  });
  window.history.replaceState( {} , null ,  document.location.protocol +
    '//' + document.location.host + '/foods/' + this.date.format('jYYYY-jMM-jDD'));

    this.update();
 }
 // get week d unix time
 GetUnixTime() {
 return moment().unix();
 }
 DayWeekPlusPlus(y, m, d, dp) {
   const mome = moment(y + '/' + m + '/' + d, 'jYYYY/jM/jD');
   const result = moment.unix(mome.unix() + dp * 86400);

   /* let f = d+ dp
   if(f> mome.endOf("jMonth").jDates()){
        m++
        f = f - mome.endOf("jMonth").jDates()
   }else{
     f = d+dp
   }
   if(m > 12){
     m = 1
     y++
   }*/
   return result;
 }

getDateOfISOWeek(w, y) {
  const d = (1 + (w - 1) * 7); // 1st of January + 7 days for each week

   const simple =  new Date(y, 1, d);
   return {y : simple.getFullYear() , m : simple.getMonth(), d : simple.getDate()};
}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '300px',
      data: {bcost: this.bcost }
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      if (!result) {
        this.snaks.openSnackBar('انصراف از پرداخت', 'بستن');
      }
      if (!result.bcost) {
        this.snaks.openSnackBar('انصراف از پرداخت', 'بستن');
      }

      if (result.bcost) {
        if (Number(result.bcost) < 1000) {
          this.snaks.openSnackBar('خطا مبلغ ورودی حداقل باید 1000 ریال باشد', 'بستن');
           return;
        }
        this.snaks.snackBar.open('در حال اتصال به بانک ...', 'بستن', {
          duration : 60000,
        });
      // tslint:disable-next-line:max-line-length
      this.Server.get(`https://payment.rayda.ir/pay/${this.uid}/${result.bcost}?q=${Math.random()}`)      .toPromise()
      .then((d) => {
        window.location.href = d.json()['message'];
      })
      .catch((e) => {
        this.snaks.openSnackBar(e.json()['message'], 'بستن');
      });
    }
    });
  }
  openTransferDialog(): void {
    const dialogRef = this.dialog.open(TransferDialog, {
      width: '250px',
      data: {cost: this.tcost, national : this.transferNational }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
                return;
      }
      if (Number(result.cost) < 1) {
        this.snaks.openSnackBar('خطا مبلغ ورودی حداقل باید 1 ریال باشد', 'بستن');
         return;
      }
      if (result.cost <= this.cost) {
        // this.socket.emit('transfer', result);

        this.usocket.emit('query_gram', {
          scope : 'financial',
          address : 'user/wallet/transfer',
          info : {
            method : 'DO',
            data : result
          }
        });
      } else {
        this.snaks.openSnackBar('عدم موجودی کافی', 'بستن');
      }
    });
  }
  reserve(item, button) {
    if (!this.viewId) {
      this.snaks.openSnackBar('به دلیل نقص در اطلاعات امکان رزرو وجود ندارد', 'بستن');
      return;
    }

    if (item.lock) {
      this.snaks.openSnackBar('رزرو این وعده غیر فعال است', 'بستن');
         return;
    }
    if (this.error) {
      this.snaks.openSnackBar('رزرو این هفته غیر فعال است ', 'بستن');
         return;
    }

    console.log(this.cost)
    if (this.cost === 0) {
      this.snaks.openSnackBar('موجودی کافی نیست', 'بستن');
         return;
    }
        item.week = this.date.jWeek();
        item.year = this.clone.jYear();
        item.type = 'reserve'
          this.usocket.emit('query_gram', {
            scope : 'reserveSystem',
            address : 'reserveSystem/actions/reserveFood',
            info : {
              method : 'DO',
              data : item
            }
          });




  }
  unreserve(item) {
    if (!this.viewId) {
      this.snaks.openSnackBar('به دلیل نقص در اطلاعات امکان رزرو وجود ندارد', 'بستن');
      return;
    }
    if (item.lock) {
      this.snaks.openSnackBar('لغو رزرو این وعده غیر فعال است', 'بستن');
         return;
    }
    if (this.error) {
      this.snaks.openSnackBar('لغو این هفته غیر فعال است ', 'بستن');
         return;
    }
    item.week = this.date.jWeek();
    item.year = this.clone.jYear();
    item.type = 'unreserve'

    this.usocket.emit('query_gram', {
      scope : 'reserveSystem',
      address : 'reserveSystem/actions/reserveFood',
      info : {
        method : 'DO',
        data : item
      }
    });
  }
  checking(item) {
    if (!this.reserved) {
      return false;

    }
    const index = _.find(this.reserved, { food : item.food.id, meal : item.meal.id, dow: item.dow, week : this.date.jWeek(),
       year : this.clone.jYear()});
    if (index ) {
      return true;
    }
     return false;
  }
  likeChecking(item) {
    const index = _.find(this.liked, { food : item.food.id, meal : item.meal.id, dow: item.dow, week : this.weekNum,
       year : this.clone.jYear()});
    if (index ) {
      return true;
    }
     return false;
  }
  unlikeChecking(item) {
    const index = _.find(this.liked, { food : item.food.id, meal : item.meal.id, dow: item.dow, week : this.weekNum,
       year : this.clone.jYear()});
    if (index ) {
      return true;
    }
     return false;
  }
  deliverChecking(item) {
    const index = _.find(this.reserved, {stop : false ,
       food : item.food.id, meal : item.meal.id, dow: item.dow, week : this.date.jWeek(),
        year : this.clone.jYear()});
    if (index ) {
      return true;
    }
     return false;
  }
  Placefinder(item) {
    const index = _.find(this.reserved, {
       food : item.food.id, meal : item.meal.id, dow: item.dow, week : this.date.jWeek(), year : this.clone.jYear()});
    if (index ) {
      return index;
    }
     return null;
  }
   sleep(delay) {
    const start = new Date().getTime();
    while (this.timeChecker(start, delay)) {

    }

  }
  urlButton() {
   this._clipboardService.copyFromContent(document.location.protocol +
    '//' + document.location.host + '/foods/' + this.date.format('jYYYY-jMM-jDD'));
   this.snaks.openSnackBar('در کلیپ بورد شما ذخیره شد', 'بستن');
   this.update();

  }
  update() {
    // Run change detection only for this component when update() method is called.
    this.cdr.markForCheck();
  }
  private timeChecker(start: number, delay: any) {
    // tslint:disable-next-line:no-unused-expression
    return new Date().getTime() < start + delay;
  }

  private logTab(event: MdcTabActivatedEvent): void {
    console.log(event.index);
    this.tab = event.index;

    this.update();
  }
  private DataGram(input,callback){
    this.usocket.on('data_gram', (data) => {
      if((data.scope === input.scope) && (data.address === input.address) && (data.type === input.type)){
        callback(data.data)
      }
    });
  }
}



@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'transfer-dialog',
  templateUrl: 'transfer.html',
})
// tslint:disable-next-line:component-class-suffix
export class TransferDialog {

  constructor(
    public dialogRef: MatDialogRef<TransferDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'sell-dialog',
  templateUrl: 'sell.html',
})
// tslint:disable-next-line:component-class-suffix
export class SellDialog {

  constructor(
    public dialogRef: MatDialogRef<SellDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

