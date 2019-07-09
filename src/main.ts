import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

import 'hammerjs';


platformBrowserDynamic().bootstrapModule(AppModule).then(() => {

if (environment.production) {
  if ('serviceWorker' in navigator ) {
    navigator.serviceWorker.register('ngsw-worker.js');
  }
}

}).catch(err => console.log(err));
