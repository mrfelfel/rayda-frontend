import { Component, OnInit , OnDestroy, Inject, AfterViewInit} from '@angular/core';
import Push from 'push.js';
import {SnaksService} from '../../snaks.service';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import * as io from 'socket.io-client';
import {CardsService} from '../../@core/cards.service';
import {BookingService} from '../../@core/self/booking.service';
import * as moment from 'jalali-moment';
import * as _ from 'lodash';
import * as Chart from 'chart.js';
import ReconnectingWebSocket from 'reconnecting-websocket';
import {ServerService} from '../../@core/server.service';
import { XlsxService } from '../../@core/xlsx.service';
import {UniversityService} from '../../@core/university.service';
import { FormControl } from '@angular/forms';

export interface PeriodicElement {
  meal: string;
  position: number;
  day: string;
  count: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './deliver.component.html',
  styleUrls: ['./deliver.component.scss']
})

export class DeliverComponent implements OnInit, OnDestroy, AfterViewInit {

  // tslint:disable-next-line:max-line-length
  constructor(private dialog: MatDialog, private snaks: SnaksService, private cards: CardsService, private booking: BookingService, private excelService: XlsxService, private http: ServerService , private router: Router, private universityMessage: UniversityService) {

   }

  socket: SocketIOClient.Socket;
  tempD = 'http://localhost:5001';
  mainD = 'https://deliver.rayda.ir';
  winsocket = null;
  wsocket = io.connect(this.mainD,
  {
    'query': 'token=' + localStorage.token
  });
  SelectedDate = {
     week : moment().jWeek(),
     year : moment().jYear(),
     dow  :  Number(moment().jDay())
  };
  date = moment().add(7, 'd').startOf('weeks').subtract(1, 'd');
  clone = this.date.clone().add(7, 'd');


  displayedColumns: string[] = ['position', 'day', 'meal', 'count'];
  // ELEMENT_DATA: PeriodicElement[]
  dataSource = [];
  code_meli = null;
  img_code_meli = null;
  selected = new FormControl(0);
  card = false;
  dowselected = new FormControl(0);

  Sum = 1;
  Mode = 'deliver';
  All = 0;
  card_number = null;
  delivered = [];
  userDelivered = null;
  OfflineDelivered = [];
  NOCARD = false;
  AvailableCard = false;
  UserList = [];
  UserData = []; // UserData OA
  mealList = null;
  foodList = null;
  selectedMeal = null;
  selectedFood = null;
  selectedStatsDay = null;
  selectedStatsMeal = null;
  view_name = '';
  num = 52;
  Plus = 1;
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
  place = this.places[0];

  viewSetting = false;
  foodDeliver = true;
  selectedMeali = '';
  selectedFoodi = '';
  MELI = localStorage.DELIVER_MELI ?   JSON.parse(localStorage.DELIVER_MELI) : false ;

  msg_txt = '';
  card_status = '';
  Planing = [
  ];

  foods = [];
  stats = [];

  meals = [
  {
      name : 'ناهار',
      id : 1,
      enabled : true
  },
  {
    name : 'شام',
    id : 2,
    enabled : true

  },
  {
    name : 'صبحانه',
    id : 3,
    enabled : false

  },
  {
    name : 'سحری',
    id : 4,
    enabled : false

  },
  {
    name : 'افطاری',
    id : 5,
    enabled : false
  },

  ];
  canvas: any;
  ctx: any;







  NewFood() {
    const food = {
        name : 'نام غذا - برای ویرایش کلیک کنید',
        description : 'توضیحات برای ویرایش کلیک کنید'
    };

    this.foods.push(food);

    // this.FromLocalStorage(this.foods);
  }
  NewDow() {
    const dialogRef = this.dialog.open(NewDow, {
      width: '250px',
      data: {foods: this.foods, meals : this.meals, meal : '', food : '' }
    });
  }
  DelFood(index) {
    this.foods.splice(index, 1);
    // this.FromLocalStorage(this.foods);
  }
  SubmitFood(index) {
    alert(index);
  }
  ngAfterViewInit() {


  }
  ngOnInit() {



    this.wsocket.on('delivered', (data) => {
      if (data.delivered) {
        this.userDelivered = data.delivered;
        this.playAudio('finish.ogg');
        this.Sum++;
      } else {
        this.userDelivered = null;
        this.card_number = null;
        this.card_number = null;
        this.playAudio('error.ogg');
      }
      Push.create(data.message, {
        body : data.message
      });
      this.snaks.openSnackBar(data.message, 'بستن');

    });
    this.wsocket.on('delivermsg', (data) => {
      this.msg_txt = data.message;
    });
    this.wsocket.on('user_uid', (data) => {
      this.img_code_meli = data.uid;
    });
    this.wsocket.on('view_name', (data) => {
      this.view_name = data;
    });
    this.wsocket.on('card_true', (data) => {
      if (data) {
        this.AvailableCard = true;
        this.card_status = 'کارت کاربر فعال است';
      } else {
        this.card_status = 'این کاربر هیچ کارت فعالی در سیستم ندارد';
      }
    });
    this.wsocket.on('deliverstats', (data) => {
      console.log(data);
      this.All = Number(data.all);
      this.Sum = Number(data.delivered);

    });

    this.wsocket.on('refresh', (data) => {
      window.location.reload();
    });
    this.wsocket.on('reserveds', (data) => {
      this.UserData = data;
    });
    this.wsocket.on('weekdata', (data) => {

      const v = _.filter(data, {
        dow : 0,
      });
      if (v) {
        // this.dataSource.push({position: 1, meal: 'ناهار', day: 'شنبه', count: 1});

      }
      console.log(v.length);

    });
    const os = navigator.platform;

    let OSName = 'Unknown OS';
    if (os.indexOf('Win') !== -1) { OSName = 'Windows'; }
    if (os.indexOf('Mac') !== -1) { OSName = 'MacOS'; }
    if (os.indexOf('X11') !== -1) { OSName = 'UNIX'; }
    if (os.indexOf('Linux') !== -1) { OSName = 'Linux'; }

    if (OSName === 'Linux') {
      this.socket = io('http://localhost:1591');
      this.socket.on('card-inserted', (data) => {
        if (data.startsWith('3b868001f0')) {
           data = data.replace('3b868001f0', '');
        }
        if (data.startsWith('3bf99100ff9181713c40000a80')) {
          data = data.replace('3bf99100ff9181713c40000a80', '');
          data = data.slice(0, -2);
        }
        this.card_number = data.toUpperCase();
        this.code_meli = null;
        this.NewDeliver();
      });
    }
    if (OSName === 'Windows') {
      this.websocketstart('ws://localhost:4000/soso');



      this.winsocket.onopen = () => {


      this.winsocket.onmessage = (messageEvent) => {
        const wsMsg = messageEvent.data;
        let data = JSON.parse(wsMsg).data.data;
        console.log(data);
        if (data === '') {
          this.ErrorMsg('لطفا دوباره کارت بزنید');
        }
        if (data.startsWith('3b868001f0')) {
          data = data.replace('3b868001f0', '');
        } else if (data.startsWith('3bf99100ff9181713c40000a80')) {
         data = data.replace('3bf99100ff9181713c40000a80', '');
         data = data.slice(0, -2);
       } else {
        this.ErrorMsg('این نوع کارت در حال حاضر پشتیبانی نمیشود');
         return;
       }
       this.card_number = data.toUpperCase();
        this.code_meli = null;
        this.NewDeliver();
      };


    };
    }

  }
  NewDeliver() {
    let data = '';
    let card = false;
    this.card = false;
    this.view_name = '';
    if (this.code_meli) {
      data = this.code_meli;
    } else {
      card = true;
      this.card = true;
      data = this.card_number;
    }
    console.log(this.selected.value === 0);
    if (this.selected.value === 0) {
    this.wsocket.emit('deliver', {
         card : card,
         place : this.place,
         meal : 2,
         uid : data,
   });
   return;
  }

   // this.delivered.push('ثبت در خواستی جدید');

  }
  CardDefine() {
    this.wsocket.emit('defcard', {
         card : this.card_number,
         uid : this.code_meli,
   });
   this.card_number = '';
   this.code_meli = '';
   // this.delivered.push('ثبت در خواستی جدید');

  }
  RemoveCard() {
    this.wsocket.emit('remcard', {
         card : this.card_number,
   });
   // this.delivered.push('ثبت در خواستی جدید');

  }
  ExExport() {
    const user = this.UserData;

    const transkey = [{
        name: 'نام خانوادگی',
        code: 'family'
      },
      {
        name: 'نام',
        code: 'name'
      }, {
        name: 'کد ملی',
        code: 'IDNumber'
      }, {
        name: 'شناسه یکتا',
        code: 'uid'
      }, {
        name: 'محل تحویل',
        code: 'place'
      }, {
        name: 'شناسه دانشجویی',
        code: 'EmployeeNumber'
      }
    ];
    this.excelService.exportAsExcelFile(this.ObjectTranslator(user , transkey), 'list');
  }
  ngOnDestroy() {
    this.wsocket.disconnect();
    if (this.winsocket) {
      this.winsocket.close();
    }
    if (this.socket) {
      this.socket.disconnect();
    }

  }
  ToggleSetting() {
    if (this.viewSetting) {
      this.viewSetting = false;
    } else {
      this.viewSetting = true;

    }
  }
  ToggleDeliver() {
    if (this.foodDeliver) {
      this.foodDeliver = false;
    } else {
      this.foodDeliver = true;

    }
  }
  playAudio(n) {
    const audio = new Audio();
    audio.src = '/assets/' + n;
    audio.load();
    audio.play();
  }
  Getmicro() {
    this.snaks.openSnackBar('به همگام شد', 'بستن');
  }
   GetDataWeekly(d, i) {



  }
  Getstats() {
    console.log(this.SelectedDate.week);
    this.wsocket.emit('getweekstats', {
      week : this.SelectedDate.week,
    });
  }
  FromLocalStorage(item) {
     localStorage.setItem('foods', JSON.stringify(item));
     if (!item) {
      if (!localStorage.foods) {
        return [];
      }
      return JSON.parse(localStorage.foods);

     }
  }
  openBuyDialog(): void {
    const nc = '';
    const cost = 0;
    const dialogRef = this.dialog.open(BuyDialog, {
      width: '270px',
      data: {national: nc, cost : cost}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result.national) {
        this.snaks.openSnackBar('در حال حاضر غیر فعال است', 'بستن');
      }
    });
  }
  SetLocalMeli(): void {
    localStorage.DELIVER_MELI =  JSON.stringify(this.MELI);
  }
  NoCard() {
    this.wsocket.emit('NoCard', {
      uid : this.code_meli,
   });
    this.code_meli = null;
    this.img_code_meli = null;
    this.snaks.openSnackBar(' در صف اعمال جریمه قرار گرفت', 'بستن');

  }
  ErrorMsg(msg) {
    this.playAudio('error.ogg');
      Push.create(msg, {
        body : msg
    });
      this.snaks.openSnackBar(msg, 'بستن');
  }
  AcceptMsg(msg) {
    this.playAudio('finish.ogg');
    Push.create(msg, {
      body : msg
    });
    this.snaks.openSnackBar(msg, 'بستن');
  }
  websocketstart(websocketServerLocation) {
    this.winsocket = new ReconnectingWebSocket(websocketServerLocation);
  }
  ObjectTranslator(Objects, kt) {
    for (let i = 0; i < Objects.length; i++) {
      Object.keys(Objects[i]).forEach((item, index) => {

        kt.forEach((x) => {
          if (x.code === item) {
            Object.defineProperty(Objects[i], x.name,
            Object.getOwnPropertyDescriptor(Objects[i], x.code));
            delete Objects[i][x.code];
          }
        });

      });
    }



    return Objects;
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'buy-dialog',
  templateUrl: './dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class BuyDialog {

  constructor(
    public dialogRef: MatDialogRef<BuyDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'new-dialog',
  templateUrl: './newdow.html',
})
// tslint:disable-next-line:component-class-suffix
export class NewDow {

  constructor(
    public dialogRef: MatDialogRef<NewDow>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  onNoClick(): void {
    this.dialogRef.close();
  }

}


