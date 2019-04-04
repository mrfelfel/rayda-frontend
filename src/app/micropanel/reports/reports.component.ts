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
    listcategory: 'reserve',
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
    listname : 'لیست جدید ها',
    listcategory: 'users',
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
   },{
    listname : 'جدید های هفته',
    listcategory: 'users',
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

  public tab:Number = 0;
  public tabs = [{code : 'reserve', name : 'گزارشات رزرو'}, { code: 'users', name: 'لیست کاربران' }];
  private heads = [];
  public search:String;

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

  findTable(){
    let search = this.search;
    for(let i in this.list){
      if(this.list[i]['listname'].includes(search)){
        this.focusTable(this.list[i]);
        break;
      }
    }
  }

  focusTable(table={}){
    for(let i in this.tabs){
      if(this.tabs[i]['code'] == table['listcategory']){
        this.tab = parseInt(i);
        break;
      }
    }
  }
}
