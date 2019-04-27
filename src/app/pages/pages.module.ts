import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import * as material from '@angular/material';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'chat', component: ChatComponent},


];
@NgModule({
  declarations: [HomeComponent, ChatComponent],
  imports: [
    CommonModule,
    material.MatCardModule,
    material.MatButtonModule,
    RouterModule.forChild(routes)
  ]
})
export class PagesModule { }
