import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  deferredPrompt = null;
  install = false;
  constructor() { }

  ngOnInit() {

  window.addEventListener('beforeinstallprompt', async (e) => {
      try {
          await e.preventDefault();
          this.deferredPrompt = e;
          console.log('[Installer] : Before installing.');
           if (!localStorage.installedPwa) {
            this.install = true;
           }
      } catch (error) {
          console.warn('[Installer Error] : ' + error);
      }
  });
  window.addEventListener('appinstalled', (evt) => {
      this.install = false;
      console.log('[Installer] : App installed.');
  });

  }
  installfunc() {
    if (this.deferredPrompt == null) { return; } else {
        this.deferredPrompt.prompt();
        this.deferredPrompt.userChoice
        .then((choiceResult) => {
            this.deferredPrompt = null;
            if (choiceResult['outcome'] === 'accepted') {
                localStorage.installedPwa = 'installed';
                return true;
            } else {
                return false;
            }
        });
    }
}

}
