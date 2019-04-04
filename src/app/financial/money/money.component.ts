import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-money',
  templateUrl: './money.component.html',
  styleUrls: ['./money.component.scss']
})
export class MoneyComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  onSelect(event){
    if(event == 2){
      this.router.navigate(['/panel/reports'], { queryParams: { 'code': 'financial' } })
    }
  }
}
