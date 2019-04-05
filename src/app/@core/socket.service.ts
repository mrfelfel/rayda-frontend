import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public socket: SocketIOClient.Socket;
  private connected = false;
  constructor() {
     this.ConnectToserver();

     this.socket.on('disconnect', () => {
       console.log('diss...');
             this.connected = false;
     });
  }

  public connect() {
    this.ConnectToserver();
    return this.socket;
  }

  public disconnect() {
    this.connected = false;
    this.socket.close();
  }

  private ConnectToserver() {
    if (!this.connected) {
      this.socket = io.connect('https://message.rayda.ir/',
      {
      'query': 'token=' + localStorage.token
      });

      this.socket.on('connect', () => {
        this.connected = true;
      });
      }
  }
}
