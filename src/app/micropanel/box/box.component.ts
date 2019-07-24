import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent implements OnInit {

  @Input() foods: Object[];
  @Input() meals: Object[];
  @Input() day:Number;
  @Input() meal:string;
  @Input() datas = { meal: '', food: '' };
  @Output() onChange = new EventEmitter();
  @Output() onDelete = new EventEmitter();
  myControl = new FormControl();
  public data = { meal: '', food: '' }
  Stringfood = ''
  public hide: Boolean = true;
  constructor() { }

  ngOnInit() {
    this.data = this.datas;
  }

  foodFilter(){
    let data = this.Stringfood
    return this.foods.filter(food=>food['name'].toLowerCase().includes(data));
  }

  newEmit(){
    this.onChange.emit({
      day: this.day,
      meal: this.meal,
      data: this.data
    });
  }
  Delete(){

    this.onDelete.emit({
      day: this.day,
      meal: this.meal,
    })
  }
}
