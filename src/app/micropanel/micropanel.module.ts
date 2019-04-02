import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { Routes, RouterModule } from '@angular/router';
import * as material from '@angular/material';
import { FoodComponent } from './food/food.component';
import { ReportsComponent } from './reports/reports.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsComponent } from './charts/charts.component';


const routes: Routes = [
  { path: 'user', component: UserComponent},
  { path: 'reports', component: ReportsComponent},
  { path: 'food-manage', component: FoodComponent},
  { path: 'charts', component: ChartsComponent }

];
// hi
@NgModule({
  declarations: [UserComponent, FoodComponent, ReportsComponent, ChartsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    material.MatIconModule,
    material.MatAutocompleteModule,
    material.MatCardModule,
    material.MatTabsModule,
    material.MatChipsModule,
    material.MatSelectModule,
    material.MatFormFieldModule,
    material.MatInputModule,
    material.MatButtonModule,
    FormsModule,
    material.MatSlideToggleModule,
    material.MatButtonToggleModule,
    RouterModule.forChild(routes)
  ]
})
export class MicropanelModule { }
