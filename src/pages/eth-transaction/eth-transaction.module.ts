import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EthTransactionPage } from './eth-transaction';

@NgModule({
  declarations: [
    EthTransactionPage,
  ],
  imports: [
    IonicPageModule.forChild(EthTransactionPage),
  ],
})
export class EthTransactionPageModule {}
