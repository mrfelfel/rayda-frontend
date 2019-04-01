import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinslistComponent } from './finslist/finslist.component';
import { Routes, RouterModule } from '@angular/router';
import * as material from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';

const routes: Routes = [
  { path: 'transactions', component: FinslistComponent},

];
@NgModule({
  declarations: [FinslistComponent],
  imports: [
    NgxChartsModule,
    material.MatCardModule,
    material.MatTableModule,
    CommonModule,
    RouterModule.forChild( routes)
  ]
})
export class FinancialModule { }
