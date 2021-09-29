<template>
  <div>
    <div class="locate">
      <router-link to="/setting">
        <div class="back">
          <img src="imgs/key/back.png" />
        </div>
      </router-link>
    </div>

    <!-- <div class="page-title">
        <h3>
          <p>
            --Finance--
          </p>
        </h3>
      </div> -->

    <section>
      <div style="padding-top: 10em;">
        <div>
          <FinanceTable :cash="cash" />
        </div>
      </div>
      <!-- dev -->
      <!-- @click="readCash" -->
      <div class="row right" style="background: yellow; ">
        <div class="col collect">
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

        <div class="col collect">
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
      </div>
      <!--     -->
    </section>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import FinanceTable from '@/components/FinanceTable'

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
    cash: {}
  }),
  computed: {
    ...mapGetters({
      getDefaultPanelNumber: 'getDefaultPanelNumber'
    })
  },
  methods: {
    /* dev */
    ...mapGetters({
      getAllCash: 'getAllCash'         
    }),
    ...mapMutations({
      setAllCash: 'setAllCash' 
    }),
    /*     */

    doCollect() {
      //if(confirm('Подтвердите инкассацию'))
      this.collect()
    },
    async readCash() {
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
      //this.setAllCash(response.cash)
      
      this.cash = this.getAllCash()
      console.log('++cash-->', this.cash)  
      
        
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
    //this.readCash()

    this.setRouter('/finance')
    this.storage = new Storage(this.client, this.url)

    /* const dbf = new Database(new FetchClient())
    console.log(dbf.getData('rand'))
    const url = 'https://jsonplaceholder.typicode.com/posts?_limit=2'
    const url = 'https://jsonplaceholder.typicode.com/users?_limit=2' */
  },
  created() {
    // this.readCash()
    //this.cash = {aaa: 42, bbb: 84 }
  },
  components: {
    FinanceTable
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
  margin-left: 2em;
  z-index: 1;
}
.row {
  padding-top: 10em;
  padding-left: 0em;
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
.collect {
  padding-top: 0em; /* 17.5em; */
  padding-right: 4em;
}
/* dev */
/* .button-setting {
  border: solid 3px #00b9e3;
  font-size: 24px;
} */
.button-setting {
  height: 2em;
  width: 10em;
  border: solid 3px #00b9e3;
  font-size: 24px;
  border-radius: 2rem;
}
</style>
