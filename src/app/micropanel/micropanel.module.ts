import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { Routes, RouterModule } from '@angular/router';
import * as material from '@angular/material';
import { FoodComponent } from './food/food.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  { path: 'user', component: UserComponent},
  { path: 'reports', component: ReportsComponent},
  { path: 'food-manage', component: FoodComponent},

];
// hi
@NgModule({
  declarations: [UserComponent, FoodComponent, ReportsComponent],
  imports: [
    CommonModule,
    material.MatIconModule,
    material.MatCardModule,
    material.MatTabsModule,
    material.MatFormFieldModule,
    material.MatInputModule,
    material.MatButtonModule,
    material.MatSlideToggleModule,
    material.MatButtonToggleModule,
    RouterModule.forChild(routes)
  ]
})
export class MicropanelModule { }
