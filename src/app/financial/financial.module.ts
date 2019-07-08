import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinslistComponent } from './finslist/finslist.component';
import { Routes, RouterModule } from '@angular/router';
import * as material from '@angular/material';
import { MoneyComponent } from './money/money.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
  { path: '', component: MoneyComponent },
  { path: 'transactions', component: FinslistComponent},

];
@NgModule({
  declarations: [FinslistComponent, MoneyComponent],
  imports: [
    material.MatCardModule,
    material.MatTableModule,
    material.MatTabsModule,
    material.MatAutocompleteModule,
    material.MatInputModule,
    material.MatFormFieldModule,
    material.MatButtonModule,
    material.MatIconModule,
    material.MatToolbarModule,
    material.MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild( routes)
  ]
})
export class FinancialModule { }
