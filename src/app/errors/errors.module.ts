import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayerrorComponent } from './payerror/payerror.component';
import { Routes, RouterModule } from '@angular/router';
import * as material from '@angular/material';
import { NotfoundComponent,NotFoundDialog } from './notfound/notfound.component';
const routes: Routes = [
  { path: 'pay', component: PayerrorComponent},
  { path: 'notfound', component: NotfoundComponent},


];
@NgModule({
  declarations: [PayerrorComponent, NotfoundComponent,NotFoundDialog],
  imports: [
    CommonModule,
    material.MatIconModule,
    material.MatCardModule,
    material.MatDialogModule,
    material.MatButtonModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [NotFoundDialog]
})
export class ErrorsModule { }
