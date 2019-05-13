import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  id: number;
  description: string;
  amount: string;
  type: boolean;
  issuer: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, description: 'تراکنش خالی', amount: '0', issuer: 'درگاه پرداخت',  type : true},

];
@Component({
  selector: 'app-finslist',
  templateUrl: './finslist.component.html',
  styleUrls: ['./finslist.component.scss']
})
export class FinslistComponent implements OnInit {
  displayedColumns: string[] = [ 'description', 'amount', 'issuer', 'type'];
  dataSource = ELEMENT_DATA;
  constructor() { }
  showLabels = true;
  view: any[] = [300, 300];
  explodeSlices = false;
  doughnut = true;
  colorScheme = {
    domain: ['#3f51b5', '#f44336']
  };
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
  }

}



