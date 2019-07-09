import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-money',
  templateUrl: './money.component.html',
  styleUrls: ['./money.component.scss']
})
export class MoneyComponent implements OnInit {

  myControl = new FormControl();
  options: Object[] = [{
    cardId:1,
    uid:4311370891,
    firstname: 'محمد جواد',
    lastname : 'یاحقی',
    emnumber : 96111147154031
  }];
  filteredOptions: Observable<Object[]>;
  public user:Object = null;
  public search:String = '';
  private tab:Number = 0;
  constructor(private router:Router) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): Object[] {
    try {
      const filterValue = value.toLowerCase();    
      return this.options.filter(option => {
        if(option['uid'].toString().toLowerCase().includes(filterValue)) return true;
        else if(option['emnumber'].toString().toLowerCase().includes(filterValue)) return true;
          else if(option['firstname'].toString().toLowerCase().includes(filterValue)) return true;
          else if(option['lastname'].toString().toLowerCase().includes(filterValue)) return true;
        else{}
      });
    } catch (error) {
      
    }
  }

  selectOne(data={}){
    this.user = data;
  }

  onSelect(event){
    if(event == 2){
      this.router.navigate(['/panel/reports'], { queryParams: { 'code': 'financial' } })
    } else {
      this.tab = parseInt(event);
    }
  }
}
