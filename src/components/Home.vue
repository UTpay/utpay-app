<template>
  <v-ons-page>
    <v-ons-toolbar :style="swipeTheme">
      <div class="center">UTpay</div>
    </v-ons-toolbar>

    <v-ons-tabbar
      swipeable
      position="top"
      :tabs="tabs"
      :on-swipe="onSwipe"
      :tabbar-style="swipeTheme"
    />
  </v-ons-page>
</template>

<script>
import Account from './Account.vue'
import Transfer from './Transfer.vue'
import Transactions from './Transactions.vue'

export default {
  data () {
    return {
      animationOptions: {},
      tabs: [
        {
          page: Account,
          label: 'アカウント'
        },
        {
          page: Transfer,
          label: '送金'
        },
        {
          page: Transactions,
          label: '取引履歴'
        }
      ]
    }
  },

  computed: {
    swipeTheme () {
      return {
        transition: `all ${this.animationOptions.duration || 0}s ${this.animationOptions.timing || ''}`
      }
    }
  },

  methods: {
    onSwipe (index, animationOptions) {
      // Apply the same transition as v-ons-tabbar
      this.animationOptions = animationOptions
    }
  }
}
</script>

<style scoped>
  .toolbar__center {
    text-align: center;
  }
</style>
