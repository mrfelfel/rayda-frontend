import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContenteditableModule } from '@ng-stack/contenteditable';
import { DeliverComponent, BuyDialog, NewDow } from './deliver/deliver.component';
import * as material from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { FillPipe } from '../@core/fill.pipe';
import {UniversityService} from '../@core/university.service';
const routes: Routes = [
  { path: '', component: DeliverComponent},

];

import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [DeliverComponent, FillPipe, BuyDialog, NewDow],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    ContenteditableModule,
    ChartsModule,
    material.MatCardModule,
    material.MatFormFieldModule,
    material.MatButtonModule,
    material.MatSelectModule,
    material.MatInputModule,
    material.MatSlideToggleModule,
    material.MatListModule,
    material.MatDialogModule,
    material.MatTabsModule,
    material.MatSliderModule,
    material.MatTableModule,
    RouterModule.forChild(routes),
  ],
  providers : [UniversityService],
  entryComponents : [ BuyDialog, NewDow ],

})
export class DeliverModule { }
