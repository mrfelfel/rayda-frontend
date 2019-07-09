import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rosot',
  templateUrl: './outlet-core.component.html',
  styleUrls: ['./outlet-core.component.scss']
})
export class OutletCoreComponent implements OnInit {

  constructor() { 

    setTimeout(() => {
      document.getElementById('mainLoading').style.display = 'none';
      document.getElementById('mainContent').removeAttribute('style');
    }, 500);
  }

  ngOnInit() {
  }

}
