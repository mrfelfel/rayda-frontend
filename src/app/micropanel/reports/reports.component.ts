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
    listname : 'لیست کاربران ',
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
  public search:String = '';

  ngOnInit(){}

  setHidden(item){
    if(item['hidden'] == null){
      item['hidden'] = false;
    } else {
      item['hidden'] = !item['hidden'];
    }
  }

  calcCategory(item){
    for(let i in this.tabs){
      if(this.tabs[i]['code'] == item['listcategory']){
        return this.tabs[i]['name'];
        break;
      }
    }
  }

  showContent(item){
    if(item['forceHide'] == true) return false;
    if(item['listcategory'] == this.tabs[parseInt(this.tab.toString())]['code']){
      return true;
    } else {
      return false;
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

  endSearch(){
    for(let i in this.list){
      this.list[i]['forceHide'] = false;
    }
    this.search = '';
  }

  findTable(item){    
    let name = item['listname'], category = item['listcategory'];
    for(let i in this.list){
      this.list[i]['forceHide'] = true;
      if(this.list[i]['listname'] == name && this.list[i]['listcategory'] == category){
        this.list[i]['forceHide'] = false;
        this.focusTable(this.list[i]);
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
