import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SocketService } from '../../@core/socket.service';
import * as moment from 'jalali-moment';

export interface PeriodicElement {
  id: number;
  description: string;
  amount: string;
  type: boolean;
  issuer: string;
  balance:number;
  date:string;
}

let ELEMENT_DATA: PeriodicElement[] = [

];
@Component({
  selector: 'app-finslist',
  templateUrl: './finslist.component.html',
  styleUrls: ['./finslist.component.scss']
})
export class FinslistComponent implements OnInit {
  displayedColumns: string[] = [ 'description', 'amount', 'issuer', 'type', 'balance', 'date'];
  dataSource = ELEMENT_DATA;
  constructor(private socket: SocketService, private cdr: ChangeDetectorRef) { }
  showLabels = true;
  showTable = false;
  view: any[] = [300, 300];
  explodeSlices = false;
  doughnut = true;
  colorScheme = {
    domain: ['#3f51b5', '#f44336']
  };
  page = 0;
  len = 0;
  public single = [
    {
      'name': 'موفق',
      'value': 2,
    },
    {
      'name': 'ناموفق',
      'value': 1
    }
  ];
  ngOnInit() {
    this.showTable = false;
    this.dataSource = []
    this.GetDataQuery()
    this.socket.socket.on('data_gram', (data) => {
      if((data.scope === "wallet") && (data.address === 'wallet/transactions') && (data.type === 'object')){
        if (data.data.mode === 'init') {
          let blc = 0;
          this.len = 0

          data.data.data.transactions.forEach(element => {

            if(element.type == "UP"){

              blc+= element.amount
            }else {
              blc-= element.amount

            }
            const resultBlc = blc

            console.log(element.description)



              const date =  moment(element.date, 'jYYYY-jMM-jDDTHH:mm:ssZ .')


            let rdate = date.format('HH:mm:ss |  jYYYY/jMM/jDD ')
            let transaction =  {id: element._id, description: element.description, amount: element.amount, issuer: element.issuer,  type : element.type=="UP"?true:false, balance : resultBlc, date : rdate}

            this.dataSource.unshift(transaction)
            this.len++;
          });

          console.log(this.dataSource)

          this.dataSource.sort(function(a, b) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return  moment(b.date, 'HH:mm:ss |  jYYYY/jMM/jDD ').unix() - moment(a.date, 'HH:mm:ss |  jYYYY/jMM/jDD ').unix();
          });
          this.showTable = false;
          this.update();

          this.showTable = true;
             this.update();

        }
      }

    });
  }

  update() {
    // Run change detection only for this component when update() method is called.
    if (!this.cdr['destroyed']) {
      this.cdr.detectChanges();
    }

  }


  GetDataQuery(){
    this.socket.socket.emit('query_gram', {
      scope : 'financial',
      address : 'user/wallet/transactions',
      info : {
        method : 'GET',
        data : {
          page : this.page
        }
      }
    });
  }

  NextPage(){

    this.page++;
    this.GetDataQuery()
  }

}



