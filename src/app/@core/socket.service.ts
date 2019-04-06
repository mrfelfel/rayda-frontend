import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public socket: SocketIOClient.Socket;
  public connected = false;
  public d = 0;
  constructor() {
    this.d++;
    console.log(this.d);
     this.ConnectToserver();
     this.socket.on('disconnect', () => {
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
