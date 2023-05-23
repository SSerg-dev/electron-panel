<template>
  <div>
    <div class="locate">

    <div class="back">
        <router-link to="/setting">
          <div>
            <img src="@/assets/imgs/key/back.png" />
          </div>
        </router-link>
      </div>

    </div>

    <section>
      <div style="padding-top: 10em">
        <div>
          <FinanceGrid />
        </div>
        <div>
          <FinanceTable />
        </div>
      </div>
      <div class="row button-group">
        <div class="col">
          <router-link to="/finance">
            <!-- v-if="getUsersRole.toLowerCase() === 'admin'" -->
            <button
              v-if="JSON.parse(getUsersIsAccess.panelCollection)"
              style="font-weight: bold"
              class="
                waves-effect waves-light
                lighten-3
                white-text
                button-setting
              "
              type="submit"
              @click="doCollect"
            >
              {{ `Collection` | localize }}
            </button>
          </router-link>
        </div>
        <!-- dev -->
        <!-- <div class="col ">
          <router-link to="/finance">
            <button
              class=" waves-effect waves-light lighten-3 white-text button-setting"
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
// import FinanceChart from '@/components/FinanceChart'
import FinanceGrid from '@/components/FinanceGrid'

// dev methods
import { Database } from '@/storage/database.js'
import { Fetch, FetchClient, methods, types } from '@/storage/fetch.js'
import { Storage } from '@/storage/index.js'

import { ipcRenderer } from 'electron'

export default Vue.extend({
  name: 'finance',
  data: () => ({
    client: 'fetch',
    url: '', 
    storage: null,
    options: {},
    id: 0,
    user: 'user',

    isChart: false,
    cash: {},
    cashTitle: [],

    coins: {},
    bills: {},
    financeCollect: {}
  }),
  computed: {
    ...mapGetters({
      getPanelNumber: 'getPanelNumber',
      getAllCoins: 'getAllCoins',
      getAllBills: 'getAllBills',
      getFinanceCollect: 'getFinanceCollect',
      
      getPanelType: 'getPanelType',
      getUsersRole: 'getUsersRole',
      getUsersIsAccess: 'getUsersIsAccess',
    }),
  },
  methods: {
    ...mapGetters({}),
    ...mapMutations({
      setAllCoins: 'setAllCoins',
      setAllBills: 'setAllBills',
      setFinanceCollect: 'setFinanceCollect'
    }),
    /*     */
    doChart() {
      this.isChart = !this.isChart
    },

    doCollect() {
      if (confirm(`Confirm collection`)) {
        // collect on panel
        let isCollect = false
        if (+this.coins.amountCoin > 0 || +this.bills.amountCoin > 0) {
          isCollect = true
          ipcRenderer.send('async-cash-collect', isCollect)
          this.clearCash()
        }
        // collect on connect
        this.collect()
      }
    },
    clearCash() {
      let isClear = false
      if (+this.coins.amountCoin > 0 || +this.bills.amountBill > 0) {
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
          `Запрос наличных средств панели № ${this.getPanelNumber} выполнен успешно`
        )
      }
    },
    getCashMoney() {
      const options = 'ipcRenderer.send getCashMoney'
      ipcRenderer.send('async-cash-start', options)

      ipcRenderer.on('async-cash-reply', (event, coins, bills) => {
        this.coins = JSON.parse(coins) || {}
        this.bills = JSON.parse(bills) || {}



        this.setAllCoins(this.coins)
        this.setAllBills(this.bills)
      })
    },
    getCollectMoney() {
      const options = 'ipcRenderer.send getCollectMoney'
      ipcRenderer.send('async-read-collect', options)

      ipcRenderer.on('async-collect-reply', (event, collect) => {
        this.financeCollect = JSON.parse(collect) || {}
        this.setFinanceCollect(this.financeCollect)
        
      })


    },


    async collect() {
      const method = methods[1]
      const type = types[4] // ['cash', 'card', 'bonus', 'service', 'common', 'ping', 'finance']

      this.options = this.getCollectOptions()
      const panelType = this.getPanelType
      switch (panelType) {
        case 'wash':
          this.id = this.getPanelNumber - 1
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
          `Инкассация поста № ${this.getPanelNumber} выполнена успешно`
        )
        //this.clearCash()
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
    this.url = process.env.VUE_APP_URL_CONNECT
    this.storage = new Storage(this.client, this.url)

    /* const dbf = new Database(new FetchClient())
    console.log(dbf.getData('rand'))
    const url = 'https://jsonplaceholder.typicode.com/posts?_limit=2'
    const url = 'https://jsonplaceholder.typicode.com/users?_limit=2' */
  },
  created() {
    this.getCashMoney()
    /* dev */
    this.getCollectMoney()
  },
  components: {
    FinanceTable,
    FinanceGrid,
    // FinanceChart,
  },
})
</script>

<style scoped>
.locate {
  position: relative;
}
.back {
  position: fixed;
  top: 11em;
  left: 2.5em;
  z-index: 99;
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
  margin-top: 2em;
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
