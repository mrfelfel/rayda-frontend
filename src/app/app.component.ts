import { SwUpdate, SwPush } from '@angular/service-worker';
import * as io from 'socket.io-client';
import { Component, ChangeDetectorRef, OnInit, OnDestroy , Inject, ChangeDetectionStrategy, AfterViewInit, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {MediaMatcher} from '@angular/cdk/layout';
import { environment } from './../environments/environment';
import { WindowRefService, ICustomWindow } from './window-ref.service';
import {SnaksService} from './snaks.service';
import {JwtService} from './@core/jwt.service';
import {AuthService} from './@core/auth.service';
import {UniversityService} from './@core/university.service';
import {SocketService} from './@core/socket.service';

import { Http } from '@angular/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
const VAPID_PUBLIC = 'BCnMCiUJ2fAFLZsR35QufdKeLCVsi1SGYqvm4tU0HaHG6kPpNZBRgGYAzFH4tMzRMc-qmrjuIHuyS8ty6wxsRtI';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers : [UniversityService, WindowRefService, SocketService],
  changeDetection: ChangeDetectionStrategy.OnPush


})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
// tslint:disable-next-line:max-line-length
constructor( private cdr: ChangeDetectorRef, private http: Http, private swUpdate: SwUpdate, private swPush: SwPush,  changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router,  public snaks: SnaksService, private jwt: JwtService, private Auth: AuthService, private socketService: SocketService, private university: UniversityService, windowRef: WindowRefService, private dialog: MatDialog,
private ngZone: NgZone  ) {
  this.mobileQuery = media.matchMedia('(max-width: 600px)');
  this._mobileQueryListener = () => changeDetectorRef.detectChanges();
  this.mobileQuery.addListener(this._mobileQueryListener);
  this.isDarkTheme = localStorage.getItem('IsDark') === 'true' ? true : false;
  this.selectedUni =  localStorage.getItem('Uni');
  this._window = windowRef.nativeWindow;


}
  private _window: ICustomWindow;

  clientVersion = '0.1.1 beta03';
  selectedUni =  '';
  mobileQuery: MediaQueryList;



public _mobileQueryListener: () => void;
socket: SocketIOClient.Socket = null;
showReqs = false;
public isDarkTheme = false;
public Me = null;
soso = null;
connected = false;
showRoute = this.Auth.IsLoggedIn();
logedIn = false;
adminRoute = true;
subscription: any;
public Proutes = null;
public check = 0;
public userName = '';
public balance = 0;
public bcost = 0;
shouldRun = true;
public nameIcon = () => {
  const viewName = window.localStorage.getItem('viewName');
  const uid = window.localStorage.getItem('uid');
  if (viewName == null) {
    this.userName = uid;
    return uid.slice(0, 1);
  } else {
    this.userName = viewName;
    return viewName.slice(0, 1) + '.' + viewName[viewName.length - 1];
  }
}
  private RequestPushNotify(swPush: SwPush) {
    console.log('[Push Service] Requesting subscription');
    this.swPush.requestSubscription({
      serverPublicKey: VAPID_PUBLIC
    })
      .then(pushSubscription => {
        this.addSubscriber(pushSubscription)
          .subscribe(
            res => {
              console.log(res);
            },
            err => {
              console.log(err);
            }
          );
      })
      .catch(err => {
        console.error(err);
      });

  }

   async ngOnInit() {

    this.ngZone.runOutsideAngular(() => {
      if ((!localStorage.pushify) && (localStorage.token)) {
        localStorage.setItem('pushify', 'true');
        this.RequestPushNotify(this.swPush);
    }
     if (this.swUpdate.isEnabled) {
         this.swUpdate.available.subscribe((evt) => {
           // localStorage.clear();

            // this.sanks.openSnackBar(' رایدا به روز رسانی شد ' + this.clientVersion, 'بستن');
           // localStorage.removeItem('pushify');
           this.exit();
            setTimeout(() => {
                  window.location.reload();
            }, 1000);
         });

         this.swUpdate.checkForUpdate().then(() => {
             // noop
         }).catch((err) => {
           this.snaks.openSnackBar('مشکل در اپدیت رایدا', 'بستن');
         });
     }
     this.router.events.subscribe(async (d) =>  {
       if ((!localStorage.pushify) && (localStorage.token)) {
         localStorage.setItem('pushify', 'true');
         this.RequestPushNotify(this.swPush);
         }
         if ((this.showRoute === true) && (!this.Proutes) && (this.check === 0)) {
           this.check++;
           try {
             this.adminRoute = await this.Auth.checkLevel();
           } catch (error) {
             this.adminRoute = false;
           }
            this.socket = this.socketService.connect();
            this.socket.on('data_gram', (data) => {
              if (data.type === 'balance') {
                 this.balance = data.balance;
               }

               this.update();

            });
            this.socket.on('error', (data) => {

              if (data.type === 'UnauthorizedError') {
                this.exit();
              }
            });
            this.socket.on('logout', (data) => {
                this.exit();
            });
            this.socket.on('news', ( doo: { message: any; }) => {
             this.snaks.openSnackBar(doo.message, 'بستن');
             this.update();
           });
           this.socket.on('connect', () => {
             // this.snaks.openSnackBar('ارتباط با سرور بر قرار شد', 'بستن');
             this.connected = true;
             this.update();

           });
           this.socket.on('disconnect', () => {
            //  this.snaks.openSnackBar('ارتباط با سرور قطع شد', 'بستن');
            this.connected = false;
            this.update();

           });
           this._window.addEventListener('raychat_ready', function (ets) {

             const raychat = ets.currentTarget['Raychat'];

             raychat.setUser({
               email: `${localStorage.uid}@rayda.ir`,
               name: localStorage.viewName || localStorage.uid,
               about: 'کاربر رایدا',
               avatar: `https://5bf3c8b2b293ba0012ce1945.storage.liara.ir/avatars/${localStorage.uid}.png`,
               metadata: {
                  userId: '1', // String
                  isActive: true // Boolean
               },
               updateOnce: false
              });

          });




           this.Proutes = [
             // tslint:disable-next-line:max-line-length
             {name : 'صفحه اصلی', icon : `<svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/><path d="M0 0h24v24H0z" fill="none"/></svg>`, viewMenu : true, path: '/', primary : true},
                             // tslint:disable-next-line:max-line-length
             {name : 'رزرو غذا', icon : `<svg viewBox="0 0 24 24"><path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/><path fill="none" d="M0 0h24v24H0z"/></svg>`, viewMenu : true, path: 'foods', primary : true},
             // tslint:disable-next-line:max-line-length
             {name : 'بازار غذا', icon : '<svg  viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"/></svg>', viewMenu : true, path: 'foods/bazzar', primary : true},
             // tslint:disable-next-line:max-line-length
             {name : 'پروفایل من', icon : '<svg  viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>', viewMenu : true, path: 'users/profile', primary : true},
             // tslint:disable-next-line:max-line-length
             {name : 'کیف پول', icon : '<svg  viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>', viewMenu : this.adminRoute, path: 'food', primary : true},
             // tslint:disable-next-line:max-line-length
             {name : 'تحویل غذا', icon : '<svg   viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/></svg>', viewMenu : this.adminRoute, path: 'deliver', primary : true},
             // tslint:disable-next-line:max-line-length
             {name : 'مدیریت تغذیه', icon : '<svg  viewBox="0 0 24 24"><circle cx="7" cy="6" r="2"/><path d="M11.15 12c-.31-.22-.59-.46-.82-.72l-1.4-1.55c-.19-.21-.43-.38-.69-.5-.29-.14-.62-.23-.96-.23h-.03C6.01 9 5 10.01 5 11.25V12H2v8c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-8H11.15zM7 20H5v-6h2v6zm4 0H9v-6h2v6zm4 0h-2v-6h2v6zm4 0h-2v-6h2v6zm-.35-14.14l-.07-.07c-.57-.62-.82-1.41-.67-2.2L18 3h-1.89l-.06.43c-.2 1.36.27 2.71 1.3 3.72l.07.06c.57.62.82 1.41.67 2.2l-.11.59h1.91l.06-.43c.21-1.36-.27-2.71-1.3-3.71zm-4 0l-.07-.07c-.57-.62-.82-1.41-.67-2.2L14 3h-1.89l-.06.43c-.2 1.36.27 2.71 1.3 3.72l.07.06c.57.62.82 1.41.67 2.2l-.11.59h1.91l.06-.43c.21-1.36-.27-2.71-1.3-3.71z"/><path fill="none" d="M0 0h24v24H0z"/></svg>', viewMenu : this.adminRoute, path: 'panel/food-manage', primary : true},
             // tslint:disable-next-line:max-line-length
             {name : 'مدیریت کاربران', icon : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M32 22c3.31 0 5.98-2.69 5.98-6s-2.67-6-5.98-6c-3.31 0-6 2.69-6 6s2.69 6 6 6zm-16 0c3.31 0 5.98-2.69 5.98-6s-2.67-6-5.98-6c-3.31 0-6 2.69-6 6s2.69 6 6 6zm0 4c-4.67 0-14 2.34-14 7v5h28v-5c0-4.66-9.33-7-14-7zm16 0c-.58 0-1.23.04-1.93.11C32.39 27.78 34 30.03 34 33v5h12v-5c0-4.66-9.33-7-14-7z"/></svg>`, viewMenu : this.adminRoute, path: 'panel/user', primary : true},
             // tslint:disable-next-line:max-line-length
             {name : 'مدیریت مالی', icon : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M5 8h2v8H5zm7 0H9c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 6h-1v-4h1v4zm7-6h-3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 6h-1v-4h1v4z"/><path fill="none" d="M4 6h16v12H4z"/><path d="M2 4v16h20V4H2zm2 14V6h16v12H4z"/></svg>', viewMenu : this.adminRoute, path: 'financial', primary : true},
             // tslint:disable-next-line:max-line-length
             {name : 'گزارشات ', icon : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/><path d="M0 0h24v24H0z" fill="none"/></svg>', viewMenu : this.adminRoute, path: 'panel/reports', primary : true},
             // tslint:disable-next-line:max-line-length
             {name : 'آمار ', icon : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M38 6H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4zM18 34h-4V20h4v14zm8 0h-4V14h4v20zm8 0h-4v-8h4v8z"/></svg>', viewMenu : this.adminRoute, path: 'panel/charts', primary : true},

            // {name : 'مافیا (بازی)', icon : 'gamepad', viewMenu : this.adminRoute, path: 'mafia', primary : true},


           ];
         }
         this.showRoute =  this.Auth.IsLoggedIn();

         this.GetUserData();
     });
    });

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
        const uid = window.localStorage.getItem('uid');
        this.http.get(`https://payment.rayda.ir/pay/${uid}/${result.bcost}`).toPromise()
        .then((d) => {
          window.location.href = d.json()['message'];
        })
        .catch((e) => {
          this.snaks.openSnackBar(e.json()['message'], 'بستن');
        });
      }
      });
    }


ngOnDestroy(): void {
  this.mobileQuery.removeListener(this._mobileQueryListener);
  this.socket.close();
  // this.update();
}
ngAfterViewInit() {
  // We only want to detach the change detectors after change detection has been
  // performed for the first time
  // this.update();
}
GetUserData() {
}
exit() {
  this.socket.emit('nopush', localStorage.endpoint);
  localStorage.removeItem('token');
  localStorage.removeItem('pushify');
  localStorage.removeItem('uid');

  localStorage.removeItem('endpoint');
  this.router.navigate(['/users/login']);
  this.showRoute = false;
  this.logedIn = false;
  this.check = 0;
  this.Proutes = null;
}

UniSaver() {
  localStorage.setItem('Uni', this.selectedUni);
  this.university.sendMessage('unichanged');
}

drg(ev) {
  console.log(ev);
}
addSubscriber(subscription) {
  const url = `https://message.rayda.ir?token=${localStorage.token}`;
  console.log('[Push Service] Adding subscriber');
  localStorage.setItem('endpoint', subscription.endpoint);
  const body = {
    action: 'subscribe',
    subscription: subscription
  };

  return this.http
    .post(url, body);
}

update() {

  // Run change detection only for this component when update() method is called.
  this.cdr.detectChanges();
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
