import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';

import { Api } from '../../providers/api/api';
import { User } from '../../providers/user/user';
import { TransactionPage } from '../transaction/transaction';

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

  constructor(
    private modalCtrl: ModalController,
    public api: Api,
    public user: User
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionsPage');
    this.getTransactions();
  }

  getTransactions() {
    console.log('getTransactions');
    const headers = { 'Authorization': `JWT ${this.user.userdata.token}` };
    let req = this.api.get('transactions/?ordering=-id', null, headers).share();
    req.subscribe(resp => {
      console.log('transactions:', resp['results']);
      this.transactions = resp['results'];
    }, err => {
      console.error('ERROR', err);
    });
    return req;
  }

  presentDetailModal(transaction) {
    const modal = this.modalCtrl.create(TransactionPage, { transaction });
    modal.present();
  }

  doRefresh(refresher) {
    this.getTransactions().subscribe(resp => refresher.complete());
  }

}
