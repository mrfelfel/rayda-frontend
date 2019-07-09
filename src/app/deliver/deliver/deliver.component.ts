import { Component, OnInit , OnDestroy, Inject, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './deliver.component.html',
  styleUrls: ['./deliver.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})

export class DeliverComponent implements OnInit {

  constructor(private router: Router) {

  }

  ngOnInit() {
    const win = window.open(`https://delivery.rayda.ir/login?token=${localStorage.token}`, '_blank');
    win.focus();
    this.router.navigate(['/']);

  }
}

