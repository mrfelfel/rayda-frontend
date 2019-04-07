import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  public cards: Object[] =  [{
    code : 1,
    name : 'کیف پول اصلی',
    data : {
      enter : 0,
      export : 0,
      exporting : 0
    }
  }];
  constructor() { }

  ngOnInit() {
  }

}
