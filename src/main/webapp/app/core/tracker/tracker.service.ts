import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription, ReplaySubject, Subject } from 'rxjs';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'webstomp-client';

import { AuthServerProvider } from 'app/core/auth/auth-jwt.service';
import { TrackerActivity } from './tracker-activity.model';

@Injectable({ providedIn: 'root' })
export class TrackerService {
  private stompClient: Stomp.Client | null = null;
  private connectionSubject: ReplaySubject<void> = new ReplaySubject(1);
  private connectionSubscription: Subscription | null = null;
  private stompSubscription: Stomp.Subscription | null = null;
  private listenerSubject: Subject<TrackerActivity> = new Subject();

  constructor(private authServerProvider: AuthServerProvider, private location: Location) {}

  connect(): void {
    if (this.stompClient && this.stompClient.connected) {
      return;
    }

    // building absolute path so that websocket doesn't fail when deploying with a context path
    let url = '/websocket/tracker';
    url = this.location.prepareExternalUrl(url);
    const authToken = this.authServerProvider.getToken();
    if (authToken) {
      url += '?access_token=' + authToken;
    }
    const socket: WebSocket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
    const headers: Stomp.ConnectionHeaders = {};
    this.stompClient.connect(headers, () => {
      this.connectionSubject.next();
    });
  }

  disconnect(): void {
    this.unsubscribe();

    this.connectionSubject = new ReplaySubject(1);

    if (this.stompClient) {
      if (this.stompClient.connected) {
        this.stompClient.disconnect();
      }
      this.stompClient = null;
    }
  }

  receive(): Subject<TrackerActivity> {
    return this.listenerSubject;
  }

  subscribe(login: string): void {
    if (this.connectionSubscription) {
      return;
    }

    this.connectionSubscription = this.connectionSubject.subscribe(() => {
      if (this.stompClient) {
        this.stompSubscription = this.stompClient.subscribe(`/topic/${login}`, (data: Stomp.Message) => {
          this.listenerSubject.next(JSON.parse(data.body));
        });
      }
    });
  }

  unsubscribe(): void {
    if (this.stompSubscription) {
      this.stompSubscription.unsubscribe();
      this.stompSubscription = null;
    }

    if (this.connectionSubscription) {
      this.connectionSubscription.unsubscribe();
      this.connectionSubscription = null;
    }
  }

  public sendActivity(user: string, messageSend: string): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send(
        '/topic/message', // destination
        JSON.stringify({ userLoginDest: user, message: messageSend, time: new Date() }), // body
        {} // header
      );
    }
  }
}
