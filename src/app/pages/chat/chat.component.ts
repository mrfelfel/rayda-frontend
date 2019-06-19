import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {SocketService} from '../../@core/socket.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,private socket: SocketService, private cdr: ChangeDetectorRef) { }


  chats = ``;
  message = '';
  user = ''
  sct = 0;
  ngOnInit() {

    this.user = this.activatedRoute.snapshot.params['id'];


    this.socket.socket.on('chat', (datas)=>{

      console.log(datas)
      datas.forEach(data => {
        if((data.from == localStorage.uid) || (data.from == this.user) || (data.to == localStorage.uid) || (data.to == this.user)){
          this.Add(data.from + ' : ' +  data.message)
        }
      });

      const $scroll = document.getElementById('chts')

      $scroll.scrollTop = this.sct

    })

    this.socket.socket.emit('getAllchats', {
      uid : this.user,
    })

  }

  Add(textData){
    this.chats += `${textData} \n \n`
    const $scroll = document.getElementById('chts')

    this.sct += $scroll.scrollHeight + 10
    $scroll.scrollTop = this.sct
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
