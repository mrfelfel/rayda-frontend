import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notfound',
  template: '',
})
export class NotfoundComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  ngOnInit() {
    this.dialog.open(NotFoundDialog, { disableClose: true })
  }
}


@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotFoundDialog {
  constructor(private router:Router, private dialogRef: MatDialogRef<NotFoundDialog>){}
  back(){
    this.router.navigate(['../']);
    this.dialogRef.close();
  }
}
