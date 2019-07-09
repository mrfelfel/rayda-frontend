import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliverComponent} from './deliver/deliver.component';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: DeliverComponent},

];



@NgModule({
  declarations: [DeliverComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  providers : [],
  entryComponents : [  ],

})
export class DeliverModule { }
