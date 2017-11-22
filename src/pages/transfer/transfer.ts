import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public api: Api, public user: User) {
    console.log(user);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransferPage');
  }

  transferForm(transferInfo: any) {
    console.log('transferInfo:', transferInfo);
    this._confirm(transferInfo);
  }

  transfer(transferInfo: any) {
    console.log('transfer');
    console.log(transferInfo);
    const headers = { Authorization: `JWT ${this.user.userdata.token}` };
    let seq = this.api.post('transactions/transfer/', transferInfo, headers).share();

    seq.subscribe(res => {
      console.log(res);
      if (res.success) {
        console.log('ok');
        this._alert('エラー', '送金完了', '正常に送金されました！');
      } else {
        this._alert('エラー', '送金に失敗しました', res.detail);
      }
    }, err => {
      console.error('ERROR', err);
      this._alert('エラー', '送金に失敗しました');
    });
  }

  _confirm(transferInfo: any) {
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
          handler: () => this.transfer(transferInfo)
        }
      ]
    });
    alert.present();
  }

  _alert(title: string, subTitle: string, message?: string = '') {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      message: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
