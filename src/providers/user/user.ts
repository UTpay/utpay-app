import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Api } from '../api/api';

@Injectable()
export class User {
  userdata: { token: string, user: any, account: any } = {
    token: '',
    user: {},
    account: {}
  }

  constructor(private storage: Storage, public api: Api) {}

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    let req = this.api.post('token-auth/', accountInfo).share();
    req.subscribe(
      res => this._loggedIn(res),
      err => console.error('ERROR', err)
    );
    return req;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    let req = this.api.post('register/', accountInfo).share();
    req.subscribe(
      res => {},
      err => console.error('ERROR', err)
    );
    return req;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    // Initialize `userdata`
    this.userdata = {
      token: '',
      user: {},
      account: {}
    };
    this.storage.remove('authToken');
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this.userdata.token = resp.token;
    this.storage.set('authToken', resp.token);
  }

  getAccount() {
    console.log('getAccount');
    const headers = { Authorization: `Bearer ${this.userdata.token}` };
    let req = this.api.get('accounts/', null, headers).share();
    req.subscribe((res: any) => {
      this.userdata.account = res.results[0];
      this.userdata.user = res.results[0].user;
    }, err => {
      console.error('ERROR', err);
    });
  }
}
