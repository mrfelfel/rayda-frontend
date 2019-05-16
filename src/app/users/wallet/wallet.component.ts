import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { SocketService } from '../../@core/socket.service';
import * as moment from 'jalali-moment';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit, OnDestroy {

  public cards =  [{
    code : 1,
    name : 'کیف پول اصلی',
    data : {
      value : null,
      enter : null,
      export : null,
      exporting : null
    }
  }];
  constructor(private socket : SocketService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {


    this.socket.socket.emit('query_gram', {
      scope : 'financial',
      address : 'user/wallet/data',
      info : {
        method : 'GET',
        data : {}
      }
    });

    this.socket.socket.on('data_gram', (data) => {
      if((data.scope === "wallet") && (data.address === 'wallet/home') && (data.type === 'object')){
        if (data.data.mode === 'init') {


          this.cards[0].data.value = data.data.data.value



        }
      }
      this.update()

    });
  }

  update() {
    // Run change detection only for this component when update() method is called.
    if (!this.cdr['destroyed']) {
      this.cdr.detectChanges();
    }
  
  }

  ngOnDestroy(){
  }

}
