import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {AuthService} from '../../../@core/auth.service';
import {SnaksService} from '../../../snaks.service';
import { SocketService } from '../../../@core/socket.service';
@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.scss']
})
export class ShowProfileComponent implements OnInit {

  constructor(private socket: SocketService, private auth: AuthService, private snak: SnaksService, private cdr: ChangeDetectorRef) { }
  d = {
    picture: null,
    fullname: window.localStorage.getItem('viewName') || 'بدون نام',
    username : localStorage.uid,
    password : '',
    new_password : '',
    repeat_password : ''

  };
  lfriends = [];
  transkey = [{
    name: 'نام خانوادگی',
    code: 'family'
  },
  {
    name: 'نام',
    code: 'name'
  }
  ];
  login = 1;
  timer = 1;

      async newPass() {
        if (!this.d.password) {
          this.snak.openSnackBar('گذرواژه فعلی را خالی رها نکنید', 'بستن');
          return;
        }
        if (!this.d.new_password) {
          this.snak.openSnackBar('گذرواژه جدید را خالی رها نکنید', 'بستن');
          return;
        }
        if (this.d.new_password !== this.d.repeat_password) {
          this.snak.openSnackBar('کلمه عبور و تکرار آن باید مطابق باشد', 'بستن');
          return;
        }
        this.snak.snackBar.open('در حال رمزگذاری اطلاعات و ارسال به سرور');
        const finter = setInterval(() => {
            this.timer++;
        }, 1000);

      try {
        this.login = 2;
        const io = await this.auth.newpass(this.d);
        if (io) {
          this.snak.openSnackBar('تغییر موفقیت امیز', 'بستن');
        }
      } catch (error) {
        this.snak.openSnackBar('خطا کلمه عبور شما اشتباه است', 'بستن');

      }
      clearInterval(finter);
      this.timer = 1;
      this.login = 1;
      this.update();
    }
    ngOnInit() {
  }
  update() {
    // Run change detection only for this component when update() method is called.
    this.cdr.detectChanges();
  }

  setValue(name, value) {
      this.d[name] = value;
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

  selectImage() {
    this.snak.openSnackBar('تغییر عکس نیاز به اجازه از واحد مربوطه دارد', 'بستن');
    return null;
    const FILE = (<HTMLInputElement>document.getElementById('file'));
    FILE.click();
    FILE.onchange = () => {
        const file = FILE.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            this.d.picture = reader.result;
            this.cdr.detectChanges();
        };
        reader.readAsDataURL(file);
    };
  }
}
