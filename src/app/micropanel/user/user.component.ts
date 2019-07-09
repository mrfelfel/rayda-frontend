import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { SocketService } from '../../@core/socket.service';


@Component({
  selector: 'app-useri',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  displayedColumns: string[] = ['delete', 'edit', 'info', 'position', 'uid'];
  dataSource = new MatTableDataSource<Object>([]);

  constructor(private dialog:MatDialog, private socket:SocketService) { }
  card = {
    new : false,
  };
  card_number = null;
  winsocket = null;
  len = 100;
  psize = 25;
  ngOnInit() {
    this.dataSource.data = []
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
    const user = this.dialog.open(TheUserComponent, { data: {username: '', password: '', repeat: '', info: false} })

    user.afterClosed().toPromise()
    .then((d)=>{
      delete d.info;
      this.socket.socket.emit('query_gram', {
        scope : 'user',
        address : 'user/manage/add',
        info : {
          method : 'DO',
          data : d
        }
      });
    })
  }

  updateUser(data={}){
    data['info'] = false;
    const user =  this.dialog.open(TheUserComponent, { data })

    user.afterClosed().toPromise()
    .then((d)=>{
      delete d.info;
      this.socket.socket.emit('query_gram', {
        scope : 'user',
        address : 'user/manage/update',
        info : {
          method : 'DO',
          data : d
        }
      });
    })
  }

  deleteUser(data){
    this.socket.socket.emit('query_gram', {
      scope : 'user',
      address : 'user/manage/delete',
      info : {
        method : 'DO',
        data : data
      }
    });
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
export class TheUserComponent {
    constructor( public dialogRef: MatDialogRef<TheUserComponent> , @Inject(MAT_DIALOG_DATA) public data: Object) {}
    onNoClick(): void {
      this.dialogRef.close();
    }
}
