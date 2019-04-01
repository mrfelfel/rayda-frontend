import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MafiaComponent } from './mafia/mafia.component';
import { Routes, RouterModule } from '@angular/router';
import * as material from '@angular/material';

const routes: Routes = [
  { path: '', component: MafiaComponent},

];
@NgModule({
  declarations: [MafiaComponent],
  imports: [
    CommonModule,
    material.MatCardModule,
    RouterModule.forChild(routes)
  ]
})
export class GamesModule { }
