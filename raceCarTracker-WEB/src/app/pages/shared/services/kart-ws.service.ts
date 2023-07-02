import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Lap } from '../../panel-show/panel-show.component';

@Injectable({
  providedIn: 'root'
})
export class KartWsService {

  private ws = `${environment.URL_WS}`;
  socket;
  // private userId: UserIdProps;

  constructor() {

    this.socket = io(`${this.ws}`, {
      transports: ['websocket'],
    });
    this.socket.on('connect', () => {
      console.log('connect ws');

      // return;
    });
    this.socket.on('user_id', (data) => {
      // this.setUserId(data);
    });
  }

  public listen(eventName: string): Observable<{ action: string, payload: Lap }> {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        console.log('ws listen ==> ', data);

        subscriber.next(data);
      });
    });
  }

  public emit(eventName: string, data: unknown): void {
    this.socket.emit(eventName, data, (ans: any) => {
      console.log('emit ==> ', ans);

    });
  }

  public setUserId(userId: any): void {
    console.log('user ws ==> ', userId);

    // this.userId = userId;
  }

  public getUserId() {
    // return this.userId;
  }
}
