import { Component, OnInit , Inject, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit, OnChanges} from '@angular/core';
import {AuthService} from '../../@core/auth.service';
import {Router} from '@angular/router';
import {SnaksService} from '../../snaks.service';

import {ServerService} from '../../@core/server.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers : [AuthService],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class LoginComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor( private snaks: SnaksService, public Auth: AuthService, private router: Router, private server: ServerService, private cdr: ChangeDetectorRef) {

  }
   d = {username: '', password: ''};
   loging = false;
   FindImage = false;
   message = '';
   show_forgot = true;
   offline = false;
   onSubmit() {

    if (this.offline) {
         this.snaks.openSnackBar('اتصال شما به اینترنت بر قرار نیست', 'بستن');
         this.update();
         return;
    }

    // alert('ورود تا ساعت 8 امشب 22 بهمن 1397 به دلیل ورود به نسخه رسمی غیر مجاز است');
    // return;
     this.loging = true;
     this.Auth.login(this.d)
     .then((data) => {
       if (data) {
           this.router.navigate(['/']);
       }
     })
     .catch((err) => {
       console.log(err.status);
      if (err.status === 401) {
        this.loging = false;
        this.snaks.openSnackBar('نام کاربری یا کلمه عبور صحیح نیست', 'بستن');
        this.d.password = '';
        localStorage.setItem('user_code_meli', this.d.username);
      }
      if (err.status === 400) {
        this.loging = false;
        this.snaks.openSnackBar('نام کاربری و رمز عبور را وارد کنید', 'بستن');
      }
      if (err.status === 0) {
        this.loging = false;
        this.snaks.openSnackBar('خطا در برقراری ارتباط با ابر رایدا', 'بستن');
      }

      this.update();

     });
   }
  ngOnInit() {
    window.onoffline = () => {

      this.offline = true;
    };
    window.ononline = () => {

      this.offline = false;
    };
  }

  update() {
    // Run change detection only for this component when update() method is called.
    this.cdr.detectChanges();
   }
}
