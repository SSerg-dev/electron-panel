<template>
  <div>
    <div class="locate">
      <router-link to="/setting">
        <div class="back">
          <img src="imgs/key/back.png" />
        </div>
      </router-link>
    </div>

    <section>
      <div style="padding-top: 10em">
        <div v-if="!isChart">
          <FinanceTable />
          <!-- <FinanceTable :coins="coins" :bills="bills" /> -->
        </div>
        <!-- <div v-else>
          <FinanceChart :coins="coins" :bills="bills" :cashTitle="cashTitle" />
        </div> -->
      </div>
      <!-- dev -->
      <!-- @click="readCash" -->
      <div class="row button-group">
        <!-- <div class="col">
          <router-link to="/finance">
            <button
              class="
                btn
                waves-effect waves-light
                lighten-3
                white-text
                button-setting
              "
              type="submit"
              @click="readCash"
            >
              {{ 'Наличные' }}
            </button>
          </router-link>
        </div> -->

        <div class="col">
          <router-link to="/finance">
            <button
              v-if="getUsersRole.toLowerCase() === 'admin'"
              class="
                btn
                waves-effect waves-light
                lighten-3
                white-text
                button-setting
              "
              type="submit"
              @click="doCollect"
            >
              {{ 'Инкассация' }}
            </button>
          </router-link>
        </div>
        <!-- dev -->
        <!-- <div class="col ">
          <router-link to="/finance">
            <button
              class="btn waves-effect waves-light lighten-3 white-text button-setting"
              type="submit"
              @click="doChart"
            >
              <div v-if="isChart">
               {{ 'Таблица' }}
              </div> 
              <div v-else>
               {{ 'Диаграмма' }}
              </div>

            </button>
          </router-link>
        </div> -->
        <!--     -->
      </div>
    </section>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import FinanceTable from '@/components/FinanceTable'
import FinanceChart from '@/components/FinanceChart'

// dev methods
import { Database } from '@/storage/database.js'
import { Fetch, FetchClient, methods, types } from '@/storage/fetch.js'
import { Storage } from '@/storage/index.js'

import { ipcRenderer } from 'electron'

export default Vue.extend({
  name: 'finance',
  data: () => ({
    client: 'fetch',
    url: 'https://192.168.1.3/',
    storage: null,
    options: {},
    id: 0,
    user: 'user',

    isChart: false,
    cash: {},
    cashTitle: [],

    coins: {},
    bills: {},
  }),
  computed: {
    ...mapGetters({
      getDefaultPanelNumber: 'getDefaultPanelNumber',
      getAllCoins: 'getAllCoins',
      getAllBills: 'getAllBills',
      getPanelType: 'getPanelType',
      getUsersRole: 'getUsersRole'
    }),
  },
  methods: {
    ...mapGetters({}),
    ...mapMutations({
      setAllCoins: 'setAllCoins',
      setAllBills: 'setAllBills',
    }),
    /*     */
    doChart() {
      this.isChart = !this.isChart
    },

    doCollect() {
      if (confirm('Подтвердите инкассацию')) {
        this.collect()
        // this.clearCash()
       
      }
    },
    clearCash() {
      let isClear = false
      if (this.coins || this.bills) {
        isClear = true
        ipcRenderer.send('async-cash-clear', isClear)
      }
    },

    async readCash() {
      // console.log('$$ Finance.vue readCash')
      const method = methods[2]
      const type = types[6]

      this.options = this.getReadCashOptions()
      const response = await this.storage.getClient(method, this.options, type)

      if (+response.result === 0) {
        this.$message(
          `Запрос наличных средств панели № ${this.getDefaultPanelNumber} выполнен успешно`
        )
      }
    },
    getCashMoney() {
      // let isClear = false
      const options = 'ipcRenderer.send coin from CashBill'
      ipcRenderer.send('async-cash-start', options)

      ipcRenderer.on('async-cash-reply', (event, coins, bills) => {
        this.coins = JSON.parse(coins) || {}
        this.bills = JSON.parse(bills) || {}

        this.setAllCoins(this.coins)
        this.setAllBills(this.bills)

        // if (coins || bills) {
        //   isClear = true
        //   event.sender.send('async-cash-clear', isClear)
        // }
      })
    },

    async collect() {
      const method = methods[1]
      const type = types[4] // ['cash', 'card', 'bonus', 'service', 'common', 'ping', 'finance']

      this.options = this.getCollectOptions()
      const panelType = this.getPanelType
      switch (panelType) {
        case 'wash':
          this.id = this.getDefaultPanelNumber - 1
          break
        case 'vacuum':
          this.id = this.getVacuumNumber - 1
          break
        default:
          break
      }
      this.options.params.unit_id = this.id
      this.options.params.user = this.user

      const response = await this.storage.getClient(method, this.options, type)

      if (+response.result === 0) {
        this.$message(
          `Инкассация поста № ${this.getDefaultPanelNumber} выполнена успешно`
        )
        this.clearCash()
      }
    },
    ...mapGetters({
      getCollectOptions: 'getCollectOptions',
      getReadCashOptions: 'getReadCashOptions',
      // dev
      /* 
      getStoreMoneyOptions: 'getStoreMoneyOptions',
      getCollectOptions: 'getCollectOptions',
      getReadCashOptions: 'getReadCashOptions', // +
      getPingOptions: 'getPingOptions',
      getRegisterKktOptions: 'getRegisterKktOptions',
      getCreateReceiptOptions: 'getCreateReceiptOptions',
      getReadReceiptOptions: 'getReadReceiptOptions',
      getPrintReceiptOptions: 'getPrintReceiptOptions',
      getLoginBonusOptions: 'getLoginBonusOptions', // +
      getQrOptions: 'getQrOptions',
      getAppendBonus: 'getAppendBonus',
      getCompleteWash: 'getCompleteWash' 
      */
      // end dev
    }),
    ...mapMutations({
      setRouter: 'setRouter',
    }),
  },
  async mounted() {
    this.setRouter('/finance')
    this.storage = new Storage(this.client, this.url)

    /* const dbf = new Database(new FetchClient())
    console.log(dbf.getData('rand'))
    const url = 'https://jsonplaceholder.typicode.com/posts?_limit=2'
    const url = 'https://jsonplaceholder.typicode.com/users?_limit=2' */
  },
  created() {
    this.getCashMoney()
  },
  components: {
    FinanceTable,
    FinanceChart,
  },
})
</script>

<style scoped>
.locate {
  position: relative;
}
.back {
  position: absolute;
  margin-top: 8em;
  margin-left: 1.5em;
  z-index: 1;
}
.row {
  padding-top: 0em;
  padding-left: 0em;
  margin-top: 2em;
  margin-right: 2em;
}
.col {
  padding-top: 0em; /* 17.5em; */
  padding-right: 2em;
}
.page-title {
  margin-top: 30em;
  margin-left: 16em; /* 16em; */
  color: white;
}
.page-subtitle {
  margin-left: auto;
  margin-right: auto;
  width: 30em;
}
.button-group {
  padding-left: 16em;
}
.button-setting {
  margin-top: 0em;
  border: solid 0px white;
  font-size: 2em;
  background-color: #00b9e3;
  border-radius: 2rem;
  box-shadow: 6px 6px 10px #00b9e3;
  height: 2em;
  width: 21em;
}
</style>
