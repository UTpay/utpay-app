import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransactionsPage } from './eth-transactions';

@NgModule({
  declarations: [
    TransactionsPage,
  ],
  imports: [
    IonicPageModule.forChild(TransactionsPage),
  ],
})
export class TransactionsPageModule {}
