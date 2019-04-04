import { Component, OnInit } from '@angular/core';
import { isArray } from 'util';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  public list:Object[] = [{
    listname : 'لیست کاربران ',
    cols : [{
      view : 'نام',
      code : 'firstname'
    },{
      view : 'نام خانوادگی',
      code : 'lastname'
    }],
    data : [{
      lastname : 'یاحقی',
      firstname : 'محمد جواد',
    },
    {
      lastname : 'یاوری',
      firstname : 'محمد جواد',
    }]
   },{
    listname : 'لیست کاربران ',
    cols : [{
      view : 'نام',
      code : 'firstname'
    },{
      view : 'نام خانوادگی',
      code : 'lastname'
    }],
    data : [{
      firstname : 'محمد جواد',
      lastname : 'یاحقی'
    }]
   }];

  private heads = [];

  ngOnInit(){}

  setHidden(item){
    if(item['hidden'] == null){
      item['hidden'] = false;
    } else {
      item['hidden'] = !item['hidden'];
    }
  }

  setTH(col, i){
    let cols: Object[] = this.heads[i];
    if(cols == null) {
      this.heads[i] = [];
      cols = [];
    }
    if(cols.includes(col['code']) == false){
      this.heads[i].push(col['code']);
    }
    return col['view'];
  }
}
