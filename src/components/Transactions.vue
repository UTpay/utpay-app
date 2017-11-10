<template>
  <v-ons-page>
    <v-ons-list>
      <v-ons-list-header>取引履歴</v-ons-list-header>
      <v-ons-list-item tappable v-for="(transaction, index) in transactions"
        :key="index"
        :class="{outgo: transaction.user.username == username, income: transaction.user.username != username}"
        @click="showDetailDialog(transaction.id)"
      >
        [{{ transaction.created_at }}] {{ transaction.amount / 1000 }} UTC
      </v-ons-list-item>
    </v-ons-list>

    <v-ons-dialog cancelable :visible.sync="detailDialogVisible">
      <p style="text-align: center">トランザクション</p>
      <v-ons-list>
        <v-ons-list-header>TxHash</v-ons-list-header>
        <v-ons-list-item @click="goTo(`https://ropsten.etherscan.io/tx/${selectedTransaction.tx_hash}`)">
          <div class="center">
            {{ this.selectedTransaction.tx_hash }}
          </div>
        </v-ons-list-item>

        <v-ons-list-header>From</v-ons-list-header>
        <v-ons-list-item>
          <div class="center">
            {{ this.selectedTransaction.from_address }}
          </div>
        </v-ons-list-item>

        <v-ons-list-header>To</v-ons-list-header>
        <v-ons-list-item>
          <div class="center">
            {{ this.selectedTransaction.to_address }}
          </div>
        </v-ons-list-item>

        <v-ons-list-header>金額</v-ons-list-header>
        <v-ons-list-item>
          <div class="center">
            {{ this.selectedTransaction.amount }} UTC
          </div>
        </v-ons-list-item>

        <v-ons-list-header>日時</v-ons-list-header>
        <v-ons-list-item>
          <div class="center">
            {{ this.selectedTransaction.created_at }}
          </div>
        </v-ons-list-item>
      </v-ons-list>

      <div class="center" style="padding: 6px">
        <v-ons-button modifier="large" @click="closeDetailDialog()">
          閉じる
        </v-ons-button>
      </div>
    </v-ons-dialog>

  </v-ons-page>
</template>

<script>
import axios from 'axios'
import { serverName } from '../config.js'

export default {
  name: 'Transactions',

  data () {
    return {
      token: this.$route.params.token,
      username: '',
      transactions: '',
      selectedTransaction: '',
      detailDialogVisible: false
    }
  },

  created () {
    let url = `${serverName}/api/v1/users/`
    axios.get(url, {headers: {'Authorization': `JWT ${this.token}`}})
      .then(response => {
        const username = response.data.results[0].username
        console.log('username:', username)
        this.username = username
      })
      .catch(e => Promise.reject(new Error(e)))

    url = `${serverName}/api/v1/transactions/?ordering=-id`
    axios.get(url, {headers: {'Authorization': `JWT ${this.token}`}})
      .then(response => {
        const transactions = response.data.results
        console.log('Transactions:', transactions)
        this.transactions = transactions
      })
      .catch(e => Promise.reject(new Error(e)))
  },

  methods: {
    goTo (url) {
      window.open(url, '_blank')
    },
    async showDetailDialog (transactionId) {
      this.detailDialogVisible = true
      const url = `${serverName}/api/v1/transactions/${transactionId}/`
      const response = await axios.get(url, {headers: {'Authorization': `JWT ${this.token}`}})
        .catch(e => Promise.reject(new Error(e)))
      const transaction = response.data
      console.log('selectedTransaction:', transaction)
      this.selectedTransaction = transaction
      this.selectedTransaction.amount /= 1000
      this.selectedTransaction.tx_hash = this.selectedTransaction.tx_hash.substr(0, 39) + '...'
    },
    closeDetailDialog () {
      this.detailDialogVisible = false
    }
  }
}
</script>

<style scoped>
  .income {
    color: green;
  }
  .outgo {
    color: red;
  }
  .dialog-container {
    width: 50%;
  }
  .address {
    width: 50%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
