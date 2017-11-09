<template>
  <v-ons-page>
    <v-ons-card>
      <img class="qrcode" :src="getQRcodeUrl()" alt="QR code">
      <div class="title">
        @{{ ethAccount.user.username }}
      </div>
      <div class="content">
        <p>{{ ethAccount.user.email }}</p>
        <p class="address">{{ ethAccount.address }}</p>
        <v-ons-list>
          <v-ons-list-header>残高</v-ons-list-header>
          <v-ons-list-item>{{ balance.balance }} UTC</v-ons-list-item>
          <v-ons-list-item>{{ balance.eth_balance }} ETH</v-ons-list-item>
        </v-ons-list>
      </div>
    </v-ons-card>
  </v-ons-page>
</template>

<script>
import axios from 'axios'
import { serverName } from '../config.js'

export default {
  name: 'Account',

  data () {
    return {
      token: this.$route.params.token,
      ethAccount: '',
      balance: '',
      qrcode: ''
    }
  },

  async created () {
    // Get ETH Account
    let url = `${serverName}/api/v1/eth_accounts/`
    let response = await axios.get(url, {headers: {'Authorization': `JWT ${this.token}`}})
      .catch(e => Promise.reject(new Error(e)))
    this.ethAccount = response.data.results[0]

    // Get balance
    url = `${serverName}/api/v1/eth_accounts/${this.ethAccount.address}/get_balance/`
    response = await axios.get(url, {headers: {'Authorization': `JWT ${this.token}`}})
      .catch(e => Promise.reject(new Error(e)))
    this.balance = response.data
  },

  methods: {
    getQRcodeUrl () {
      return this.ethAccount.qrcode
    }
  }
}
</script>

<style scoped>
  .qrcode {
    width: 100%;
  }
  .address {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
