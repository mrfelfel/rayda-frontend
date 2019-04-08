import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ShowProfileComponent } from './profile/show-profile/show-profile.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {SessionGuard} from '../@core/session.guard';
import * as material from '@angular/material';
import { InputComponent } from './input/input.component';
import { WalletComponent } from './wallet/wallet.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate : [SessionGuard]},
  { path: 'profile', component: ShowProfileComponent},
  { path: 'forgot', component: ForgotPasswordComponent,  canActivate : [SessionGuard]},
  { path: 'wallet', component: WalletComponent }

];
@NgModule({
  declarations: [LoginComponent, ForgotPasswordComponent, ShowProfileComponent, EditProfileComponent, InputComponent, WalletComponent],
  imports: [
    CommonModule,
    material.MatCardModule,
    material.MatInputModule,
    material.MatInputModule,
    material.MatCheckboxModule,
    material.MatFormFieldModule,
    material.MatButtonModule,
    material.MatIconModule,
    material.MatSelectModule,
    material.MatTabsModule,
    material.MatToolbarModule,
    material.MatRippleModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class UsersModule { }
