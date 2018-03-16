import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

interface Transaction {
  id: number;
  from_address: string;
  to_address: string;
  amount: number;
  is_active: boolean;
  created_at: string;
};

@IonicPage()
@Component({
  selector: 'page-transaction',
  templateUrl: 'transaction.html',
})
export class TransactionPage {
  pageTitle: string = '取引詳細';

  transaction: Transaction;

  constructor(public navParams: NavParams, public viewCtrl: ViewController) {
    this.transaction = navParams.get('transaction');
    console.log('transaction:', this.transaction);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
