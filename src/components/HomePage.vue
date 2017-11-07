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

    <v-ons-dialog cancelable :visible.sync="signUpDialogVisible">
      <p style="text-align: center">Sign Up</p>
      <v-ons-list>
        <v-ons-list-header>username</v-ons-list-header>
        <v-ons-list-item>
          <div class="center">
            <v-ons-input placeholder="username" float v-model="username"></v-ons-input>
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
        <v-ons-button modifier="large" @click="handleSignUp()">Sign up</v-ons-button>
      </div>
    </v-ons-dialog>

    <v-ons-dialog cancelable :visible.sync="loginDialogVisible">
      <p style="text-align: center">Login</p>
      <v-ons-list>
        <v-ons-list-header>username</v-ons-list-header>
        <v-ons-list-item>
          <div class="center">
            <v-ons-input placeholder="username" float v-model="username"></v-ons-input>
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
        <v-ons-button modifier="large" @click="handleLogin()">
          Login
        </v-ons-button>
      </div>
    </v-ons-dialog>

  </v-ons-page>
</template>

<script>
import axios from 'axios'
import { serverName } from '../config.js'
export default {
  name: 'home',

  data () {
    return {
      msg: 'UTpay',
      username: '',
      email: '',
      password: '',
      password1: '',
      password2: '',
      token: '',
      signUpDialogVisible: false,
      loginDialogVisible: false
    }
  },

  methods: {
    goTo (url) {
      window.open(url, '_blank')
    },

    async handleSignUp () {
      const url = `${serverName}/api/v1/register/`
      if (this.password1 !== this.password2) {
        this.$ons.notification.alert('同じパスワードを入力してください')
        return Promise.reject(new Error('同じパスワードを入力してください。'))
      }
      const res = await axios.post(url, {
        username: this.username,
        email: this.email,
        password: this.password1
      })
      .catch(e => {
        this.$ons.notification.alert('エラーが発生しました。')
        return Promise.reject(new Error(e))
      })
      console.log('User:', res.data)
      this.signUpDialogVisible = false
    },

    async handleLogin () {
      const url = `${serverName}/api/v1/token-auth/`
      const res = await axios.post(url, {
        username: this.username,
        password: this.password
      })
      .catch(e => {
        this.$ons.notification.alert('エラーが発生しました。')
        return Promise.reject(new Error(e))
      })
      console.log('token:', res.data.token)
      this.token = res.data.token
      this.loginDialogVisible = false
    },

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
