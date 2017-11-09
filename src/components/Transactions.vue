<template>
  <v-ons-page>
    <v-ons-list>
      <v-ons-list-header>取引履歴</v-ons-list-header>
      <v-ons-list-item tappable v-for="(transaction, index) in transactions" :key="index" :class="{outgo: 1 == 1}">
        [{{ transaction.created_at }}] {{ transaction.amount }} UTC
      </v-ons-list-item>
    </v-ons-list>
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
      transactions: ''
    }
  },

  created () {
    const url = `${serverName}/api/v1/transactions/?ordering=-id`
    axios.get(url, {headers: {'Authorization': `JWT ${this.token}`}})
      .then(response => {
        const transactions = response.data.results
        console.log('Transactions:', transactions)
        this.transactions = transactions
      })
      .catch(e => Promise.reject(new Error(e)))
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
</style>
