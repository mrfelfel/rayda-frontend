import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinslistComponent } from './finslist/finslist.component';
import { Routes, RouterModule } from '@angular/router';
import * as material from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MoneyComponent } from './money/money.component';

const routes: Routes = [
  { path: '', component: MoneyComponent },
  { path: 'transactions', component: FinslistComponent},

];
@NgModule({
  declarations: [FinslistComponent, MoneyComponent],
  imports: [
    NgxChartsModule,
    material.MatCardModule,
    material.MatTableModule,
    material.MatTabsModule,
    CommonModule,
    RouterModule.forChild( routes)
  ]
})
export class FinancialModule { }
