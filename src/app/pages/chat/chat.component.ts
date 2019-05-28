import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {SocketService} from '../../@core/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(private socket: SocketService, private cdr: ChangeDetectorRef) { }


  chats = ``;
  message = '';
  user = ''
  ngOnInit() {


    this.socket.socket.on('chat', (data)=>{
      this.Add(data.uid + ' : ' +  data.message)
    })
  }

  Add(textData){
    this.chats += `${textData} \n`


    const $scroll = document.getElementById('chts')
    $scroll.scrollTop = $scroll.scrollHeight
    this.cdr.markForCheck()
  }

  send(){
    if(!this.message){
      return
    }

    if(this.user === localStorage.uid){
      this.user = ''
      this.message = ''

      this.cdr.markForCheck()
      return
    }
    this.Add(localStorage.uid + ' : ' +  this.message)
    this.socket.socket.emit('chat', {
      uid : this.user,
      message : this.message
    })

    this.message = ''
    this.cdr.markForCheck()

  }
}
