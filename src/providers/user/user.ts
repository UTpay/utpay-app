import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';

@Injectable()
export class User {
  userdata: { token: string, user: any, ethAccount: any, balance: any } = {
    token: '',
    user: {},
    ethAccount: {},
    balance: {}
  }

  constructor(public api: Api) { }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    let seq = this.api.post('token-auth/', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      this._loggedIn(res);
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    let seq = this.api.post('signup', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      this._loggedIn(res);
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this.userdata = null;
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this.userdata.token = resp.token;
  }

  getEthAccount() {
    console.log('getEthAccount');
    const headers = { Authorization: `JWT ${this.userdata.token}` };
    let seq = this.api.get('eth_accounts/', null, headers).share();
    seq.subscribe((res: any) => {
      this.userdata.ethAccount = res.results[0];
      this.userdata.user = res.results[0].user;

      // Get balance
      seq = this.api.get(`eth_accounts/${this.userdata.ethAccount.address}/get_balance/`, null, headers).share();
      seq.subscribe((res: any) => {
        this.userdata.balance = res;
        console.log(this.userdata);
      }, err => {
        console.error('ERROR', err);
      });
    }, err => {
      console.error('ERROR', err);
    });
  }
}
