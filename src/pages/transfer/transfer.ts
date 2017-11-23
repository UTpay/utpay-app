import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { Api } from '../../providers/api/api';
import { User } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-transfer',
  templateUrl: 'transfer.html',
})
export class TransferPage {

  transferInfo: { address: string, amount: string } = {
    address: '',
    amount: ''
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private barcodeScanner: BarcodeScanner,
    public api: Api,
    public user: User
  ) {
    console.log(user);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransferPage');
  }

  doTransfer() {
    console.log('transferInfo:', this.transferInfo);
    this._confirm();
  }

  transfer(transferInfo) {
    console.log('transfer');
    console.log(transferInfo);
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${this.user.userdata.token}`
    };
    let req = this.api.post('transactions/transfer/', transferInfo, headers).share();
    req.subscribe(resp => {
      console.log(resp);
      if (resp['success']) {
        console.log('ok');
        this._alert('送金完了', null, '<p>正常に送金されました！</p><p>トランザクションの確認に時間がかかる場合があります。</p>');
      } else {
        this._alert('エラー', '送金に失敗しました', resp['detail']);
      }
    }, err => {
      console.error('ERROR', err);
      this._alert('エラー', '送金に失敗しました');
    });
  }

  _confirm() {
    const alert = this.alertCtrl.create({
      title: '確認',
      message: '本当に送金しますか？',
      buttons: [
        {
          text: 'キャンセル',
          role: 'cancel',
          handler: () => console.log('Canceled')
        },
        {
          text: '送金する',
          handler: () => this.transfer(this.transferInfo)
        }
      ]
    });
    alert.present();
  }

  _alert(title: string, subTitle: string = '', message: string = '') {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      message: message,
      buttons: ['OK']
    });
    alert.present();
  }

  _scanBarcode() {
    console.log('_scanBarcode');
    this.barcodeScanner.scan().then(result => {
      if (result.cancelled) return
      this.transferInfo.address = result.text;
    }, (err) => {
      console.error('ERROR', err);
    });
  }

}
