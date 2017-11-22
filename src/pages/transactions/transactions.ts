import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Api } from '../../providers/api/api';
import { User } from '../../providers/user/user';

interface Transaction {
  id: number;
  user: any;
  eth_account: any;
  tx_hash: string;
  from_address: string;
  to_address: string;
  amount: number;
  gas: number;
  gas_price: number;
  value: number;
  network_id: number;
  is_active: boolean;
  created_at: string;
};

@IonicPage()
@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html',
})
export class TransactionsPage {

  transactions: Transaction[] = [];
  selected_transaction: Transaction;

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: Api, public user: User) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionsPage');
    this.getTransactions();
  }

  getTransactions() {
    const headers = { 'Authorization': `JWT ${this.user.userdata.token}` };
    let req = this.api.get('transactions/?ordering=-id', null, headers).share();
    req.subscribe(resp => {
      this.transactions = resp['results'];
      console.log('transactions:', this.transactions);
    }, err => {
      console.error('ERROR', err);
    });
  }

}
