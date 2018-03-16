import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EthTransactionsPage } from './eth-transactions';

@NgModule({
  declarations: [
    EthTransactionsPage,
  ],
  imports: [
    IonicPageModule.forChild(EthTransactionsPage),
  ],
})
export class EthTransactionsPageModule {}
