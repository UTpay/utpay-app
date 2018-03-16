import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

interface EthTransaction {
  id: number;
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
  templateUrl: 'eth-transaction.html',
})
export class EthTransactionPage {
  pageTitle: string = '取引詳細';

  ethTransaction: EthTransaction;

  constructor(public navParams: NavParams, public viewCtrl: ViewController) {
    this.ethTransaction = navParams.get('ethTransaction');
    console.log('ethTransaction:', this.ethTransaction);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
