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
      <div style="padding-top: 10em;">
        <div v-if="!isChart">
          <FinanceTable :cash="cash" />
        </div>
        <div v-else>
          <FinanceChart :cash="cash" :cashTitle="cashTitle" />
        </div>

      </div>
      <!-- dev -->
      <!-- @click="readCash" -->
      <div class="row button-group">
        <div class="col ">
          <router-link to="/finance">
            <button
              class="btn waves-effect waves-light lighten-3 white-text button-setting"
              type="submit"
              @click="readCash"
            >
              {{ 'Наличные' }}
            </button>
          </router-link>
        </div>

        <div class="col ">
          <router-link to="/finance">
            <button
              class="btn waves-effect waves-light lighten-3 white-text button-setting"
              type="submit"
              @click="doCollect"
            >
              {{ 'Инкассация' }}
            </button>
          </router-link>
        </div>
        <!-- dev -->
        <div class="col ">
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
        </div>
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

export default Vue.extend({
  name: 'finance',
  data: () => ({
    client: 'fetch',
    url: 'https://192.168.1.3/',
    storage: null,
    options: {},

    isChart: false,
    cash: {},
    cashTitle: []
  }),
  computed: {
    ...mapGetters({
      getDefaultPanelNumber: 'getDefaultPanelNumber',
      getAllCash: 'getAllCash',
      getCashTitle: 'getCashTitle',
    })
  },
  methods: {
    /* dev */
    ...mapGetters({
      //getAllCash: 'getAllCash'
      //getCashTitle: 'getCashTitle' 
    }),
    ...mapMutations({
      setAllCash: 'setAllCash'
    }),
    /*     */
    doChart() {
      this.isChart = !this.isChart 
    },

    doCollect() {
      if(confirm('Подтвердите инкассацию'))
        this.collect()
    },
    async readCash() {
      console.log('++readCash')
      // cash
      const method = methods[2]
      const type = types[6] /* types[4] */ // ['cash', 'card', 'bonus', 'service', 'common', 'ping', 'finance']

      this.options = this.getReadCashOptions()
      const response = await this.storage.getClient(method, this.options, type)

      if (+response.result === 0) {
        // console.log('Finance readCash response OK!-->', JSON.stringify(response.result) )
        // console.log('readCash Returned data:', JSON.stringify(response))
        this.$message(
          `Запрос наличных средств панели № ${this.getDefaultPanelNumber} выполнен успешно`
        )
      }
      /* dev */ 
      // !!! uncomment in relase
      //this.setAllCash(response.cash)

      this.cash = this.getAllCash
      this.cashTitle = this.getCashTitle 

      //console.log('++cash-->', this.cash)
      //console.log('++this.cashTitle-->', this.cashTitle)
    },

    async collect() {
      const method = methods[1]
      const type = types[4] // ['cash', 'card', 'bonus', 'service', 'common', 'ping', 'finance']

      this.options = this.getCollectOptions()
      const response = await this.storage.getClient(method, this.options, type)

      if (+response.result === 0)
        this.$message(
          `Инкассация панели № ${this.getDefaultPanelNumber} выполнена успешно`
        )
    },
    ...mapGetters({
      getCollectOptions: 'getCollectOptions',
      getReadCashOptions: 'getReadCashOptions'
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
      /* setPanelMoneyNumber: 'setPanelMoneyNumber',
      setPanelMoneyType: 'setPanelMoneyType',
      setPanelMoneySum: 'setPanelMoneySum',
      setPanelMoneyDetail: 'setPanelMoneyDetail' */
      setRouter: 'setRouter'
    })
  },
  async mounted() {
    //this.cash = this.getAllCash
    //this.cashTitle = this.getCashTitle
    
    this.setRouter('/finance')
    this.storage = new Storage(this.client, this.url)

    /* const dbf = new Database(new FetchClient())
    console.log(dbf.getData('rand'))
    const url = 'https://jsonplaceholder.typicode.com/posts?_limit=2'
    const url = 'https://jsonplaceholder.typicode.com/users?_limit=2' */
  },
  created() {
    this.cash = this.getAllCash
    this.cashTitle = this.getCashTitle
    
  },
  components: {
    FinanceTable,
    FinanceChart
  }
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
  padding-left: 7em;
}
.button-setting {
  margin-top: 0em;
  border: solid 3px #00b9e3;
  font-size: 2em;
  border-radius: 2rem;
  box-shadow: 6px 6px 10px #00b9e3;
}
.btn {
  height: 2em;
  width: 9em;
  border: solid;
  /* border-width: 1px; */
  border-color: #00b9e3;
  background-color: #26a69a;
}
</style>
