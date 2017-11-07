<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-back-button>Back</v-ons-back-button>
      </div>
      <div class="center">UTCoin 送金</div>
    </v-ons-toolbar>

    <v-ons-list>
      <v-ons-list-header>宛先</v-ons-list-header>
      <v-ons-list-item>
        <div class="center">
          <v-ons-input placeholder="0x..." float v-model="address"></v-ons-input>
        </div>
      </v-ons-list-item>

      <v-ons-list-header>金額</v-ons-list-header>
      <v-ons-list-item>
        <div class="center">
          <v-ons-input placeholder="0.001" float v-model="amount"></v-ons-input>
        </div>
      </v-ons-list-item>
    </v-ons-list>

    <v-ons-fab
      position="bottom right"
      :style="{ backgroundColor: $ons.platform.isIOS() ? '#4282cc' : null }"
      :visible="true"
    >
      <v-ons-icon icon="qrcode"></v-ons-icon>
    </v-ons-fab>

    <div class="center" style="padding: 6px">
      <v-ons-button modifier="large" @click="transfer()">
        送金する
      </v-ons-button>
    </div>

  </v-ons-page>
</template>

<script>
import axios from 'axios'
import { serverName } from '../config.js'

export default {
  name: 'Transfer',

  data () {
    return {
      token: this.$route.params.token,
      address: '',
      amount: ''
    }
  },

  methods: {
    async transfer () {
      const url = `${serverName}/api/v1/transactions/transfer/`
      const res = await axios.post(url, {
        headers: { 'Authorization': `JWT ${this.token}` },
        address: this.address,
        amount: this.amount
      })
      .catch(e => {
        this.$ons.notification.alert('エラーが発生しました。')
        return Promise.reject(new Error(e))
      })
      console.log('res:', res.data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  text-align: center;
}

img {
  max-width: 300px;
}

ons-list-title:not(:first-of-type) {
  margin-top: 30px;
}

ons-card {
  text-align: center;
}

ons-list-item, ons-card {
  cursor: pointer;
}
</style>
