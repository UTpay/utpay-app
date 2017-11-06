<template>
  <v-ons-page>
    <v-ons-toolbar class="home-toolbar">
      <div class="left">
        <v-ons-toolbar-button @click="$store.commit('splitter/toggle')">
          <v-ons-icon icon="ion-navicon, material:md-menu"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
      <div class="center">{{ msg }}</div>
    </v-ons-toolbar>

    <div class="header">
      <img src="../assets/logo.png">
    </div>

    <div class="login-area" style="margin: 10px 10px 30px 10px">
      <v-ons-button modifier="large" style="margin: 5px 0" @click="signUpDialogVisible = true">Sign up</v-ons-button>
      <p style="text-align: center">or</p>
      <v-ons-button modifier="large" style="margin: 5px 0" @click="loginDialogVisible = true">Login</v-ons-button>
    </div>

    <v-ons-list-title>API Endpoints</v-ons-list-title>
    <v-ons-list>
      <v-ons-list-item v-for="item in endpoints" :key="item.url" @click="$ons.notification.toast({message: `${item.method} ${item.url}`, timeout: 2000})">
        <div class="center">{{ item.label }}</div>
      </v-ons-list-item>
    </v-ons-list>

    <v-ons-dialog cancelable :visible.sync="signUpDialogVisible">
      <p style="text-align: center">Sign Up</p>
      <v-ons-list>
        <v-ons-list-header>username</v-ons-list-header>
        <v-ons-list-item>
          <div class="center">
            <v-ons-input placeholder="username" float v-model="name"></v-ons-input>
          </div>
        </v-ons-list-item>

        <v-ons-list-header>email</v-ons-list-header>
        <v-ons-list-item>
          <div class="center">
            <v-ons-input placeholder="example@example.com" float v-model="email"></v-ons-input>
          </div>
        </v-ons-list-item>

        <v-ons-list-header>password</v-ons-list-header>
        <v-ons-list-item>
          <div class="center">
            <v-ons-input placeholder="password" float v-model="password1"></v-ons-input>
          </div>
        </v-ons-list-item>

        <v-ons-list-header>password (again)</v-ons-list-header>
        <v-ons-list-item>
          <div class="center">
            <v-ons-input placeholder="password" float v-model="password2"></v-ons-input>
          </div>
        </v-ons-list-item>
      </v-ons-list>

      <div class="center" style="padding: 6px">
        <v-ons-button modifier="large" @click="signUpDialogVisible = false">Sign up</v-ons-button>
      </div>
    </v-ons-dialog>

    <v-ons-dialog cancelable :visible.sync="loginDialogVisible">
      <p style="text-align: center">Login</p>
      <v-ons-list>
        <v-ons-list-header>username</v-ons-list-header>
        <v-ons-list-item>
          <div class="center">
            <v-ons-input placeholder="username" float v-model="name"></v-ons-input>
          </div>
        </v-ons-list-item>

        <v-ons-list-header>password</v-ons-list-header>
        <v-ons-list-item>
          <div class="center">
            <v-ons-input placeholder="password" float v-model="password"></v-ons-input>
          </div>
        </v-ons-list-item>
      </v-ons-list>

      <div class="center" style="padding: 6px">
        <v-ons-button modifier="large" @click="loginDialogVisible = false">Login</v-ons-button>
      </div>
    </v-ons-dialog>

  </v-ons-page>
</template>

<script>
const serverName = 'http://192.168.10.5:8000'
export default {
  name: 'home',
  data () {
    return {
      msg: 'UTpay',
      endpoints: [
        {
          label: 'トークン発行',
          url: `${serverName}/api/v1/token-auth/`,
          method: 'POST'
        },
        {
          label: 'トークンリフレッシュ',
          url: `${serverName}/api/v1/token-refresh/`,
          method: 'POST'
        },
        {
          label: 'トークン検証',
          url: `${serverName}/api/v1/token-verify/`,
          method: 'POST'
        },
        {
          label: 'ユーザ取得',
          url: `${serverName}/api/v1/users/`,
          method: 'GET'
        },
        {
          label: 'Ethereum アカウント取得',
          url: `${serverName}/api/v1/eth_accounts/`,
          method: 'GET'
        },
        {
          label: 'トランザクション取得',
          url: `${serverName}/api/v1/transactions/`,
          method: 'GET'
        },
        {
          label: 'UTCoin 送金',
          url: `${serverName}/api/v1/transactions/transfer/`,
          method: 'POST'
        }
      ],
      signUpDialogVisible: false,
      loginDialogVisible: false
    }
  },
  methods: {
    goTo (url) {
      window.open(url, '_blank')
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
