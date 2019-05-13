import { Component, OnInit , Inject, ChangeDetectorRef} from '@angular/core';
import {ServerService} from '../../@core/server.service';
import { environment } from '../../../environments/environment';
import {SnaksService} from '../../snaks.service';
import {AuthService} from '../../@core/auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor( private http: ServerService, private snaks: SnaksService,
  private Auth: AuthService,
  private cdr: ChangeDetectorRef,
  private router: Router) { }
  base_url = environment.Endpoint;
  d = {
    phone : '',
    username : '',
    code : '',
  };
  loging = false;
  accept = false;
  ngOnInit() {
    this.d.username = localStorage.getItem('user_code_meli');
  }
  checkInput() {
    if ((this.d.phone.length === 0) || (this.d.username.length === 0)) {
      this.snaks.openSnackBar('کد ملی و یا تلفن همراه صحیح نیست', 'بستن');
       this.update();
             return;
    }
    this.loging = true;

     this.Auth.forgot(this.d)
     .then(() => {
      this.router.navigate(['/']);
      this.snaks.openSnackBar('کلمه عبور موقت به شما ارسال شد', 'بستن');
      localStorage.removeItem('user_code_meli');
      this.update();

     })
     .catch(() => {
      this.loging = false;
      this.snaks.openSnackBar('اطلاعات وارد شده با اطلاعات ثبت نامی شما برابر نیست', 'بستن');
      this.update();

     });
  }
  update() {
    // Run change detection only for this component when update() method is called.
    this.cdr.detectChanges();
  }
  get spinnerStyle() { return {color: '#fff'}; }

}
