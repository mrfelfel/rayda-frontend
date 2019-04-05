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
  @Input() meal:Number;
  @Input() datas = { meal: 0, food: '' };
  @Output() onChange = new EventEmitter();
  myControl = new FormControl();
  public data = { meal: 0, food: '' }
  constructor() { }

  ngOnInit() {
    this.data = this.datas;
  }

  foodFilter(){
    let data = this.data['food']      
    return this.foods.filter(food=>food['name'].toLowerCase().includes(data));
  }
  
  newEmit(){
    this.onChange.emit({
      day: this.day,
      meal: this.meal,
      data: this.data
    });
  }
}
