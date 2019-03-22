import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayerrorComponent } from './payerror/payerror.component';
import { Routes, RouterModule } from '@angular/router';
import * as material from '@angular/material';
import { NotfoundComponent } from './notfound/notfound.component';
const routes: Routes = [
  { path: 'pay', component: PayerrorComponent},
  { path: 'notfound', component: NotfoundComponent},


];
@NgModule({
  declarations: [PayerrorComponent, NotfoundComponent],
  imports: [
    CommonModule,
    material.MatIconModule,
    material.MatCardModule,
    RouterModule.forChild(routes)
  ]
})
export class ErrorsModule { }
