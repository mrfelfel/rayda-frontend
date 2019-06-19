import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { promise } from 'protractor';
import { resolve } from 'path';
import { reject } from 'q';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public socket: SocketIOClient.Socket;
  public connected = false;
  constructor() {
  }

  public connect() {
    this.ConnectToserver();
    return this.socket;
  }

  public disconnect() {
    this.connected = false;
    this.socket.close();
  }

  public QueryGram(data = {
    scope : '',
    address : '',
    info : {
      method : '',
      data : {}
    }
  }){
    this.socket.emit('query_gram', data);
  }
  public SyncQueryGram(data = {
    scope : '',
    address : '',
    info : {
      method : '',
      data : {}
    }
  }){
    this.socket.emit('query_gram', data);

    return new Promise((resolve,reject)=>{
      this.socket.on('data_gram', (bdata)=>{
        if((bdata.scope == data.scope) && (bdata.address == data.address)){
          resolve(bdata);
        }
      })

      setTimeout(() => {
        reject('error server is not respond')
      }, 8000);
    })

  }

  private tryReconnect() {

  }
  private ConnectToserver() {
      this.socket = io.connect('https://message.rayda.ir/',
      {
      'query': 'token=' + localStorage.token
      });

      this.socket.on('connect', () => {
        this.connected = true;
      });



  }
}
