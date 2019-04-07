import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {

  @Input() type: String;
  @Input() placeholder: String;
  @Input() disabled: Boolean;
  @Input() value: any;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
