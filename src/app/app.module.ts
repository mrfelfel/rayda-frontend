import { BrowserModule } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import {SnaksService} from './snaks.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import {AuthGuard} from './@core/auth.guard';
import {SocketService} from './@core/socket.service';

import { SafePipe } from './safe.pipe';
import { FormsModule } from '@angular/forms';
import { OutletCoreComponent } from './outlet-core/outlet-core.component';



import localeFa from '@angular/common/locales/fa';




registerLocaleData(localeFa);

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
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [SnaksService, AuthGuard, SocketService],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
