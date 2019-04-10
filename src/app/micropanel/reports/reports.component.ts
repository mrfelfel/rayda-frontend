import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  public list:Object[] = [{
    listname : 'لیست کاربران ',
    listcategory: 'reserve',
    page: {
      start: 1,
      end: 5,
      current: 1
    },
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
   }];

  public tab:Number = 0;
  public tabs = [{code : 'reserve', name : 'گزارشات رزرو'}, { code: 'users', name: 'لیست کاربران' }];
  private heads = [];
  public search:String = '';
  public searcher:Boolean = false;

  constructor(private activatedRoute:ActivatedRoute, private cdr: ChangeDetectorRef){}

  ngOnInit(){
    this.activatedRoute.queryParamMap.subscribe(query=>{
      let code = query.get('code');
      if(code != null){
        let selected = false;
        for(let i in this.tabs){
          let tab = this.tabs[i];
          if(tab['code'] == code){
            this.tab = parseInt(i);
            selected = true;
            break;
          }
        }
        if(selected == false){
          this.tab = 0;
        }
      } else {
        this.tab = 0;
      }
    });
  }

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
    this.searcher = false;
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

  startRange(start=0, end=0){
    let array = [];
    for(let i = start; i <=end; i++) array.push(i);
    return array;
  }

  setPage(index, value){
    let old = this.list[index]['page']['current'];
    this.list[index]['page']['current'] = value;
    if(old < value){      
      if(value - old != 1 || value == this.list[index]['page']['end']){
        this.list[index]['page']['start']+=1;
        this.list[index]['page']['end']+=1;
      }
    } else if(value < old){
      if(this.list[index]['page']['start']-1 <= 0){
        this.list[index]['page']['start'] = 1
      } else {
        this.list[index]['page']['start']-=1;
        this.list[index]['page']['end']-=1;
      }
    }    
  }
}
