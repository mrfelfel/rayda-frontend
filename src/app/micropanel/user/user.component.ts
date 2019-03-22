import { Component, OnInit } from '@angular/core';
import ReconnectingWebSocket from 'reconnecting-websocket';
@Component({
  selector: 'app-useri',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor() { }
  card = {
    new : false,
  };
  card_number = null;
  winsocket = null;
  ngOnInit() {
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
  websocketstart(websocketServerLocation) {
    this.winsocket = new ReconnectingWebSocket(websocketServerLocation);
  }
  ErrorMsg(data) {
  }
}
