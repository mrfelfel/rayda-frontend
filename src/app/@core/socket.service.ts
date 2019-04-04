import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public socket: SocketIOClient.Socket;
  private connected = false;
  constructor() {
    if (!this.connected) {
    this.socket = io.connect('https://message.rayda.ir/',
    {
    'query': 'token=' + localStorage.token
    });

    this.connected = true;
    }
   }

  public connect() {
    return this.socket;
  }

  public disconnect() {
    this.socket.close();
  }
}
