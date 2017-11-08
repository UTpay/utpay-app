<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-back-button>Back</v-ons-back-button>
      </div>
      <div class="center">{{ $options.title }}</div>
    </v-ons-toolbar>

    <div class="header">
      <img src="../assets/logo.png">
    </div>

    <div class="login-area" style="margin: 10px 10px 30px 10px">
      <v-ons-button modifier="large" style="margin: 10px 0" @click="signUpDialogVisible = true">Sign up</v-ons-button>
      <p style="text-align: center">or</p>
      <v-ons-button modifier="large" style="margin: 10px 0" @click="loginDialogVisible = true">Login</v-ons-button>
    </div>

    <v-ons-dialog cancelable :visible.sync="signUpDialogVisible">
      <p style="text-align: center">Sign Up</p>
      <v-ons-list>
        <v-ons-list-header>username</v-ons-list-header>
        <v-ons-list-item>
          <div class="center">
            <v-ons-input type="text" placeholder="username" float v-model="username"></v-ons-input>
          </div>
        </v-ons-list-item>

        <v-ons-list-header>email</v-ons-list-header>
        <v-ons-list-item>
          <div class="center">
            <v-ons-input type="email" placeholder="example@example.com" float v-model="email"></v-ons-input>
          </div>
        </v-ons-list-item>

        <v-ons-list-header>password</v-ons-list-header>
        <v-ons-list-item>
          <div class="center">
            <v-ons-input type="password" placeholder="password" float v-model="password1"></v-ons-input>
          </div>
        </v-ons-list-item>

        <v-ons-list-header>password (again)</v-ons-list-header>
        <v-ons-list-item>
          <div class="center">
            <v-ons-input type="password" placeholder="password" float v-model="password2"></v-ons-input>
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
            <v-ons-input type="text" placeholder="username" float v-model="username"></v-ons-input>
          </div>
        </v-ons-list-item>

        <v-ons-list-header>password</v-ons-list-header>
        <v-ons-list-item>
          <div class="center">
            <v-ons-input type="password" placeholder="password" float v-model="password"></v-ons-input>
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
  name: 'Home',
  title: 'UTpay',

  data () {
    return {
      username: '',
      email: '',
      password: '',
      password1: '',
      password2: '',
      signUpDialogVisible: false,
      loginDialogVisible: false
    }
  },

  methods: {
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
          this.$ons.notification.alert({
            title: 'Sign up',
            message: 'エラーが発生しました。'
          })
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
          this.$ons.notification.alert({
            title: 'Login',
            message: 'username または password が間違っています。'
          })
          return Promise.reject(new Error(e))
        })
      console.log('token:', res.data.token)
      this.loginDialogVisible = false
      this.$router.push({ name: 'Home2', params: { token: res.data.token } })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.toolbar--material__center {
  text-align: center;
  margin-right: 56px;
}

.header {
  text-align: center;
}

img {
  max-width: 300px;
}

ons-list-title:not(:first-of-type) {
  margin-top: 30px;
}

ons-list-item {
  cursor: pointer;
}
</style>
