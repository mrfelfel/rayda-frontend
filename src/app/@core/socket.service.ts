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
    },
    timeout : 0
  }){
    const timeout = data.timeout
    delete data.timeout

    // is not connected
    this.socket.emit('query_gram', data);
    return new Promise((resolve,reject)=>{
        if(!this.socket.connected){
          setTimeout(() => {
            reject({
              status : 0,
              message : 'connection notfound ...'
            });
          }, 3000);
        }
        const settime = setTimeout(() => {
        reject({
          status : -1,
          message : 'request timeout ...'
        })
        }, timeout);
        this.socket.on('data_gram', (bdata)=>{
          if((bdata.scope == data.scope) && (bdata.address == data.address)){
            clearTimeout(settime)
            resolve(bdata);

          }
        })
    })

  }

  private tryReconnect() {

  }
  private ConnectToserver() {
      this.socket = io.connect('https://message.rayda.ir/public',
      {
           'query': 'token=' + localStorage.token, 
            upgrade: false,
            transports: ['websocket']
      });

      this.socket.on('connect', () => {
        this.connected = true;
      });



  }
}
