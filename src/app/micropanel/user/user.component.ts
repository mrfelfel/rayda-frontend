import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import ReconnectingWebSocket from 'reconnecting-websocket';
import {MatPaginator, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-useri',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['delete', 'edit', 'info', 'position', 'username'];
  dataSource = new MatTableDataSource<Object>([]);

  constructor(private dialog:MatDialog) { }
  card = {
    new : false,
  };
  card_number = null;
  winsocket = null;
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = [{
      username: 'mail.google.com'
    }]
    const os = navigator.platform;

    let OSName = 'Unknown OS';
    if (os.indexOf('Win') !== -1) { OSName = 'Windows'; }
    if (os.indexOf('Mac') !== -1) { OSName = 'MacOS'; }
    if (os.indexOf('X11') !== -1) { OSName = 'UNIX'; }
    if (os.indexOf('Linux') !== -1) { OSName = 'Linux'; }

    if (OSName === 'Windows') {
      this.websocketstart('ws://localhost:4000/soso');



      this.winsocket.onopen = () => {


      this.winsocket.onmessage = (messageEvent) => {
        const wsMsg = messageEvent.data;
        let data = JSON.parse(wsMsg).data.data;
        console.log(data);
        if (data === '') {
          this.ErrorMsg('لطفا دوباره کارت بزنید');
        }
        if (data.startsWith('3b868001f0')) {
          data = data.replace('3b868001f0', '');
        } else if (data.startsWith('3bf99100ff9181713c40000a80')) {
         data = data.replace('3bf99100ff9181713c40000a80', '');
         data = data.slice(0, -2);
       } else {
        this.ErrorMsg('این نوع کارت در حال حاضر پشتیبانی نمیشود');
         return;
       }
       this.card_number = data.toUpperCase();
       this.card.new = true;
      };


    };
    }
  }

  addUser(){
    this.dialog.open(TheUserComponent, { data: {username: '', password: '', repeat: '', info: false} })
  }

  updateUser(data={}){
    data['info'] = false;
    this.dialog.open(TheUserComponent, { data })
  }

  infoUser(data){
    data['info'] = true;
    this.dialog.open(TheUserComponent, { data });
  }

  websocketstart(websocketServerLocation) {
    this.winsocket = new ReconnectingWebSocket(websocketServerLocation);
  }
  ErrorMsg(data) {
  }
}

@Component({
  selector: 'app-useri',
  templateUrl: './newUser.html',
})
export class TheUserComponent{
    constructor( public dialogRef: MatDialogRef<TheUserComponent> , @Inject(MAT_DIALOG_DATA) public data: Object) {}
    onNoClick(): void {
      this.dialogRef.close();
    }
}