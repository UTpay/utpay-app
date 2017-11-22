import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { User } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public user: User) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
    this.user.getEthAccount();
    console.log(this.user.userdata);
  }

}
