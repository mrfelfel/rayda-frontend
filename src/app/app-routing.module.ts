import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './@core/auth.guard';
import { MafiaComponent } from './games/mafia/mafia.component';

/*
 routing
*/
const routes: Routes = [
  { path : 'users', loadChildren  : () => import('./users/users.module').then(m => m.UsersModule)},

  { path: '', children : [
    { path: '', redirectTo: 'pages/home', pathMatch: 'full'},
    { path: 'pages', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule), canActivate : [AuthGuard]},
    { path : 'foods', loadChildren  : () => import('./foods/foods.module').then(m => m.FoodsModule), canActivate : [AuthGuard]},
    { path : 'deliver', loadChildren  : () => import('./deliver/deliver.module').then(m => m.DeliverModule), canActivate : [AuthGuard]},
    { path : 'errors', loadChildren  : () => import('./errors/errors.module').then(m => m.ErrorsModule), canActivate : [AuthGuard]},
    { path : 'financial', loadChildren  : () => import('./financial/financial.module').then(m => m.FinancialModule), canActivate : [AuthGuard]},
    { path : 'panel', loadChildren  : () => import('./micropanel/micropanel.module').then(m => m.MicropanelModule), canActivate : [AuthGuard]},
    { path: 'mafia', loadChildren: () => import('./games/games.module').then(m => m.GamesModule), canActivate : [AuthGuard]},
  ] },
  { path: '**', redirectTo: 'errors/notfound'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
