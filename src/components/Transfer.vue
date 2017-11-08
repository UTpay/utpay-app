<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-back-button>Back</v-ons-back-button>
      </div>
      <div class="center">{{ $options.title }}</div>
    </v-ons-toolbar>

    <v-ons-list>
      <v-ons-list-header>宛先</v-ons-list-header>
      <v-ons-list-item>
        <div class="center">
          <v-ons-input type="text" placeholder="0x..." float v-model="address"></v-ons-input>
        </div>
      </v-ons-list-item>

      <v-ons-list-header>金額</v-ons-list-header>
      <v-ons-list-item>
        <div class="center">
          <v-ons-input type="number" placeholder="0.001" float v-model="amount"></v-ons-input>
        </div>
      </v-ons-list-item>
    </v-ons-list>

    <div class="center" style="padding: 10px">
      <v-ons-button modifier="large" @click="transfer()">
        送金する
      </v-ons-button>
    </div>

    <v-ons-fab
      position="bottom right"
      :style="{ backgroundColor: $ons.platform.isIOS() ? '#4282cc' : null }"
      :visible="true"
      @click="scanBarcode()"
    >
      <v-ons-icon icon="qrcode"></v-ons-icon>
    </v-ons-fab>

  </v-ons-page>
</template>

<script>
import axios from 'axios'
import { serverName } from '../config.js'

export default {
  name: 'Transfer',
  title: 'UTCoin 送金',

  data () {
    return {
      token: this.$route.params.token,
      address: '',
      amount: ''
    }
  },

  methods: {
    scanBarcode () {
      document.addEventListener('deviceready', () => {
        cordova.plugins.barcodeScanner.scan(result => { // eslint-disable-line
          if (result.cancelled) return

          console.log('text:', result.text)
          if (result.text.indexOf('0x') === 0) {
            this.address = result.text
          } else {
            this.$ons.notification.alert('アドレスではありません。')
          }
        }, err => {
          console.error(err)
          this.$ons.notification.alert('エラーが発生しました。')
        })
      }, false)
    },

    async transfer () {
      const isConfirmed = await this.$ons.notification.confirm('送金を確定しますか？')
      if (isConfirmed) {
        const url = `${serverName}/api/v1/transactions/transfer/`
        let params = new URLSearchParams()
        params.append('address', this.address)
        params.append('amount', this.amount)
        const headers = { 'Authorization': `JWT ${this.token}` }
        const response = await axios.post(url, params, { headers })
          .catch(e => {
            this.$ons.notification.alert('エラーが発生しました。')
            return Promise.reject(new Error(e))
          })
        console.log('response:', response.data)
        this.$ons.notification.alert({
          title: '送金完了',
          messageHTML: `<p>正常に送金されました！</p><p>トランザクションの確認に時間がかかる場合があります。</p>`
        })
      }
    }
  }
}
</script>

