import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {AuthService} from '../../../@core/auth.service';
import {SnaksService} from '../../../snaks.service';
@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.scss']
})
export class ShowProfileComponent implements OnInit {

  constructor(private auth: AuthService, private snak: SnaksService, private cdr: ChangeDetectorRef) { }
  d = {
    username : localStorage.uid,
    password : '',
    new_password : '',
    repeat_password : ''

  };
  login = 1;
  timer = 1;

      async newPass() {        
        if (!this.d.password) {
          this.snak.snackBar.open('گذرواژه فعلی را خالی رها نکنید');
          return;
        }
        if (!this.d.new_password) {
          this.snak.snackBar.open('گذرواژه جدید را خالی رها نکنید');
          return;
        }
        if (this.d.new_password !== this.d.repeat_password) {
          this.snak.snackBar.open('کلمه عبور و تکرار آن باید مطابق باشد');
          return;
        }
        this.snak.snackBar.open('در حال تبادل با سرور');
        const finter = setInterval(() => {
            this.timer++;
        }, 1000);

      try {
        this.login = 2;
        const io = await this.auth.newpass(this.d);
        if (io) {
           this.snak.snackBar.open('تغییر موفقیت امیز');
        }
      } catch (error) {
        this.snak.snackBar.open('خطا کلمه عبور شما اشتباه است');

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

  setValue(name, value){
    if(name == 'd.password'){
      this.d.password = value;
    }
    if(name == 'd.new_password'){
      this.d.new_password = value;
    }
    if(name == 'd.repeat_password'){
      this.d.repeat_password = value;
    }
  }
}
