import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { User } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  pageTitle: string = 'アカウント';

  constructor(public user: User) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
    this.user.getEthAccount();
    console.log('userdata:', this.user.userdata);
  }

}
