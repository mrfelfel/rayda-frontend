import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatSnackBarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
}  from '@angular/material';
import {SnaksService} from './snaks.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpModule } from '@angular/http';
import {AuthGuard} from './@core/auth.guard';
import {SocketService} from './@core/socket.service';

import { SafePipe } from './safe.pipe';
import { FormsModule } from '@angular/forms';
import { OutletCoreComponent } from './outlet-core/outlet-core.component';




@NgModule({
  declarations: [
    AppComponent,
    SafePipe,
    OutletCoreComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatSnackBarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    // tslint:disable-next-line:whitespace
    FormsModule,
    HttpModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [SnaksService, AuthGuard, SocketService],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
