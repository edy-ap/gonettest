import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { Router } from '@angular/router';
import { LoginService } from 'app/core/login/login.service';
import { TrackerActivity } from 'app/core/tracker/tracker-activity.model';
import { TrackerService } from 'app/core/tracker/tracker.service';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  authSubscription?: Subscription;
  subscription?: Subscription;

  messages: TrackerActivity[] = [];

  message = '';
  userDest = '';

  users = ['user1', 'user2', 'user3', 'user4'];

  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private router: Router,
    private loginService: LoginService,
    private trackerService: TrackerService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
      this.users = this.users.filter(element => element !== account?.login);
      this.userDest = this.users[0] ?? '';
      this.trackerService.subscribe(account?.login ?? "");
      this.subscription = this.trackerService.receive().subscribe((message: TrackerActivity) => {
        message.deliveryTime = new Date().getTime() - new Date(message.time).getTime();
        this.messages.push(message);
      });
    });
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.loginModalService.open();
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  send(): void{
    this.trackerService.sendActivity( this.userDest, this.message);
    this.message = '';
  }
}
