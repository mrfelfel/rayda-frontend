import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './@core/auth.guard';
import { MafiaComponent } from './games/mafia/mafia.component';

/*
 routing
*/
const routes: Routes = [
  { path : 'users', loadChildren  : './users/users.module#UsersModule'},

  { path: '', children : [
    { path: '', redirectTo: 'pages/home', pathMatch: 'full'},
    { path: 'pages', loadChildren: './pages/pages.module#PagesModule', canActivate : [AuthGuard]},
    { path : 'foods', loadChildren  : './foods/foods.module#FoodsModule', canActivate : [AuthGuard]},
    { path : 'deliver', loadChildren  : './deliver/deliver.module#DeliverModule', canActivate : [AuthGuard]},
    { path : 'errors', loadChildren  : './errors/errors.module#ErrorsModule', canActivate : [AuthGuard]},
    { path : 'financial', loadChildren  : './financial/financial.module#FinancialModule', canActivate : [AuthGuard]},
    { path : 'panel', loadChildren  : './micropanel/micropanel.module#MicropanelModule', canActivate : [AuthGuard]},
    { path: 'mafia', loadChildren: './games/games.module#GamesModule', canActivate : [AuthGuard]},
  ] },
  { path: '**', redirectTo: 'errors/notfound'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
