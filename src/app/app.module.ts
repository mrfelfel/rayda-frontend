import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent, DialogOverviewExampleDialog } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as material from '@angular/material';
import {SnaksService} from './snaks.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpModule } from '@angular/http';
import {AuthGuard} from './@core/auth.guard';
import {UniversityService} from './@core/university.service';
import { SafePipe } from './safe.pipe';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    DialogOverviewExampleDialog,
    SafePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    material.MatToolbarModule,
    material.MatSidenavModule,
    material.MatListModule,
    material.MatSnackBarModule,
    material.MatButtonModule,
    material.MatFormFieldModule,
    material.MatSelectModule,
    material.MatMenuModule,
    material.MatIconModule,
    material.MatDialogModule,
    material.MatInputModule,
    FormsModule,
    HttpModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [SnaksService, AuthGuard, UniversityService],
  entryComponents: [DialogOverviewExampleDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
