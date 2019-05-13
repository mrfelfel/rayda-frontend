import { Component, OnInit , OnDestroy, Inject, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './deliver.component.html',
  styleUrls: ['./deliver.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})

export class DeliverComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {

    window.location.href = 'https://delivery.rayda.ir';
  }
}

