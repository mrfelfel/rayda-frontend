import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ShowProfileComponent } from './profile/show-profile/show-profile.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as material from '@angular/material';
const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'profile', component: ShowProfileComponent},
  { path: 'forgot', component: ForgotPasswordComponent},

];
@NgModule({
  declarations: [LoginComponent, ForgotPasswordComponent, ShowProfileComponent, EditProfileComponent],
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

    FormsModule, ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class UsersModule { }
