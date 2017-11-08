<template>
  <v-ons-page>
    <v-ons-list-title>API Endpoints</v-ons-list-title>
    <v-ons-list>
      <v-ons-list-item @click="getUser()">
        <div class="center">ユーザ取得</div>
      </v-ons-list-item>
      <v-ons-list-item @click="getEthAccounts()">
        <div class="center">Ethereum アカウント取得</div>
      </v-ons-list-item>
      <v-ons-list-item @click="getTransactions()">
        <div class="center">トランザクション取得</div>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
import axios from 'axios'
import { serverName } from '../config.js'

export default {
  name: 'MyPage',

  data () {
    return {
      token: this.$route.params.token
    }
  },

  methods: {
    async getUser () {
      const url = `${serverName}/api/v1/users/`
      const res = await axios.get(url, {headers: {'Authorization': `JWT ${this.token}`}})
      .catch(e => Promise.reject(new Error(e)))
      console.log('User:', res.data.results[0])
    },

    async getEthAccounts () {
      const url = `${serverName}/api/v1/eth_accounts/`
      const res = await axios.get(url, {headers: {'Authorization': `JWT ${this.token}`}})
      .catch(e => Promise.reject(new Error(e)))
      console.log('Eth Accounts:', res.data.results)
    },

    async getTransactions () {
      const url = `${serverName}/api/v1/transactions/`
      const res = await axios.get(url, {headers: {'Authorization': `JWT ${this.token}`}})
      .catch(e => Promise.reject(new Error(e)))
      console.log('Transactions:', res.data.results)
    }
  }
}
</script>

