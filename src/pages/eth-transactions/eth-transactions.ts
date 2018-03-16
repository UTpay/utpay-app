import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';

import { Api } from '../../providers/api/api';
import { User } from '../../providers/user/user';
import { EthTransactionPage } from '../eth-transaction/eth-transaction';

interface EthTransaction {
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
  templateUrl: 'eth-transactions.html',
})
export class EthTransactionsPage {
  pageTitle: string = '取引履歴';

  ethTransactions: EthTransaction[] = [];

  constructor(
    private modalCtrl: ModalController,
    public api: Api,
    public user: User
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad EthTransactionsPage');
    this.getEthTransactions();
  }

  getEthTransactions() {
    console.log('getEthTransactions');
    const headers = { 'Authorization': `Bearer ${this.user.userdata.token}` };
    let req = this.api.get('eth_transactions/?ordering=-id', null, headers).share();
    req.subscribe(resp => {
      console.log('eth_transactions:', resp['results']);
      this.ethTransactions = resp['results'];
    }, err => {
      console.error('ERROR', err);
    });
    return req;
  }

  presentDetailModal(ethTransaction) {
    const modal = this.modalCtrl.create(EthTransactionPage, { ethTransaction });
    modal.present();
  }

  doRefresh(refresher) {
    this.getEthTransactions().subscribe(resp => refresher.complete());
  }

}
