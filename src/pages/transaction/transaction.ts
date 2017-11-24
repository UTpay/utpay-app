import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

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
  selector: 'page-transaction',
  templateUrl: 'transaction.html',
})
export class TransactionPage {
  transaction: Transaction;

  constructor(public navParams: NavParams, public viewCtrl: ViewController) {
    this.transaction = navParams.get('transaction');
    console.log('transaction:', this.transaction);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
