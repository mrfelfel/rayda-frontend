import { SwUpdate, SwPush } from '@angular/service-worker';
import * as io from 'socket.io-client';
import { Component, ChangeDetectorRef, OnInit, OnDestroy , Inject} from '@angular/core';
import {Router} from '@angular/router';
import {MediaMatcher} from '@angular/cdk/layout';
import { environment } from './../environments/environment';
import { WindowRefService, ICustomWindow } from './window-ref.service';
import {SnaksService} from './snaks.service';
import {JwtService} from './@core/jwt.service';
import {AuthService} from './@core/auth.service';
import {UniversityService} from './@core/university.service';
import { Http } from '@angular/http';
import { async } from 'q';
const VAPID_PUBLIC = 'BCnMCiUJ2fAFLZsR35QufdKeLCVsi1SGYqvm4tU0HaHG6kPpNZBRgGYAzFH4tMzRMc-qmrjuIHuyS8ty6wxsRtI';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers : [UniversityService, WindowRefService]

})
export class AppComponent implements OnInit, OnDestroy {
  private _window: ICustomWindow;

  clientVersion = '0.1';
  selectedUni =  '';
// tslint:disable-next-line:max-line-length
constructor(private http: Http, private swUpdate: SwUpdate, private swPush: SwPush,  changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router,  public snaks: SnaksService, private jwt: JwtService, private Auth: AuthService, private university: UniversityService,         windowRef: WindowRefService
  ) {
  this.mobileQuery = media.matchMedia('(max-width: 600px)');
  this._mobileQueryListener = () => changeDetectorRef.detectChanges();
  this.mobileQuery.addListener(this._mobileQueryListener);
  this.isDarkTheme = localStorage.getItem('IsDark') === 'true' ? true : false;
  this.selectedUni =  localStorage.getItem('Uni');
  this._window = windowRef.nativeWindow;


}
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
shouldRun = true;
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
              this.socket = io.connect('https://message.rayda.ir/',
               {
               'query': 'token=' + localStorage.token
               });
               this.socket.on('news', ( doo: { message: any; }) => {
                this.snaks.openSnackBar(doo.message, 'بستن');
              });
              this.socket.on('connect', () => {
                // this.snaks.openSnackBar('ارتباط با سرور بر قرار شد', 'بستن');

                this.connected = true;
              });
              this.socket.on('disconnect', () => {
               //  this.snaks.openSnackBar('ارتباط با سرور قطع شد', 'بستن');

               this.connected = false;

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
                {name : 'صفحه اصلی', icon : 'home', viewMenu : true, path: '/', primary : true},
                {name : 'رزرو غذا', icon : 'restaurant', viewMenu : true, path: 'foods', primary : true},
                {name : 'بازار غذا', icon : 'store', viewMenu : true, path: 'foods/bazzar', primary : true},
                {name : 'پروفایل من', icon : 'person', viewMenu : true, path: 'users/profile', primary : true},
                {name : 'کیف پول', icon : 'account_balance_wallet', viewMenu : this.adminRoute, path: 'food', primary : true},
                {name : 'تحویل غذا', icon : 'local_dining', viewMenu : this.adminRoute, path: 'deliver', primary : true},
                {name : 'مدیریت تغذیه', icon : 'hot_tub', viewMenu : this.adminRoute, path: 'panel/food-manage', primary : true},

                {name : 'مدیریت کاربران', icon : 'person', viewMenu : this.adminRoute, path: 'panel/user', primary : true},
                {name : 'مدیریت مالی', icon : 'money', viewMenu : this.adminRoute, path: 'financial', primary : true},
                {name : 'گزارشات ', icon : 'print', viewMenu : this.adminRoute, path: 'panel/reports', primary : true},
                {name : 'آمار ', icon : 'print', viewMenu : this.adminRoute, path: 'stats', primary : true},

                {name : 'مافیا (بازی)', icon : 'gamepad', viewMenu : this.adminRoute, path: 'mafia', primary : true},


              ];
            }
            this.showRoute =  this.Auth.IsLoggedIn();

            this.GetUserData();
        });

      }


ngOnDestroy(): void {
  this.mobileQuery.removeListener(this._mobileQueryListener);
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




}
