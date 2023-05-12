<template>
  <div>
    <section>
      <div class="invoice-style">
        <InvoiceBill />
      </div>
      <div class="collection-item" @click="payUp('program')">
        <div class="card white waves-effect button-style">
          <div class="card-content black-text button-content-style">
            {{ `CONTINUE` | localize }}
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'

import InvoiceBill from '@/components/InvoiceBill'

import { Database } from '@/storage/database.js'
import { Fetch, FetchClient, methods, types } from '@/storage/fetch.js'
import { Storage } from '@/storage/index.js'

import { dateFilter, getRndInteger } from '@/utils/order.js'
import { synchronize } from '@/utils/common.functions'

export default Vue.extend({
  data: () => ({
    name: 'invoice',

    sum: 0,
    cash: true,
    order: '',
    id: 0,

    client: 'fetch',
    url: '',
    storage: null,
    options: {},

    delay: 2000,
    timeoutDelay: null,

    date: new Date()
  }),
  computed: {
    ...mapGetters({
      getReceiptResult: 'getReceiptResult',
      getPanelType: 'getPanelType',
      getWetBalance: 'getWetBalance',
      getDryBalance: 'getDryBalance',
      getPanelNumber: 'getPanelNumber',
      getVacuumNumber: 'getVacuumNumber',
      getWetOrder: 'getWetOrder',
      getDryOrder: 'getDryOrder',
      getControllerTime: 'getControllerTime',
      getControllerDate: 'getControllerDate'

    }),
  },
  methods: {
    ...mapGetters({
      getCreateReceiptOptions: 'getCreateReceiptOptions',
      getReadReceiptOptions: 'getReadReceiptOptions',
      getPrintReceiptOptions: 'getPrintReceiptOptions',

      getIsReceiptRead: 'getIsReceiptRead',
      getIsReceiptCreate: 'getIsReceiptCreate',
      getIsReceiptPrint: 'getIsReceiptPrint',
    }),
    ...mapMutations({
      setRouter: 'setRouter',

      setIsReceiptRead: 'setIsReceiptRead',
      setIsReceiptCreate: 'setIsReceiptCreate',
      setIsReceiptPrint: 'setIsReceiptPrint',

      setReceiptResult: 'setReceiptResult',
      setReadReceiptOptions: 'setReadReceiptOptions',
    }),
    payUp(program) {
      this.$router.push('/program')
    },

    // 01 createReceipt
    async createReceipt() {
      const method = methods[5]
      const type = types[4]

      this.options = this.getCreateReceiptOptions()

      const panelType = this.getPanelType
      switch (panelType) {
        case 'wash':
          this.id = this.getPanelNumber - 1
          this.sum = this.getWetBalance
          break
        case 'vacuum':
          this.id = this.getVacuumNumber - 1
          this.sum = this.getDryBalance
          break
        default:
          break
      }
      this.options.params.unit_id = this.id
      this.options.params.sum = +this.sum
      this.options.params.cash = true
      this.options.params.order = this.order

      const response = await this.storage.getClient(method, this.options, type)
      if (+response.result === 0) {
        this.setIsReceiptCreate(true)

        this.setReadReceiptOptions(response.id)
        this.$message(
          `02 Выполняется createReceipt result--> ${+response.result}`
        )
      } else {
        this.setIsReceiptCreate(false)
        this.$message(`НЕ выполняется createReceipt`)
      }
    },

    // 02 readReceipt
    async readReceipt() {
      const method = methods[6]
      const type = types[4]

      this.options = this.getReadReceiptOptions()

      const response = await this.storage.getClient(method, this.options, type)
      if (response) {
        if (response.receipt && +response.result === 0) {
          this.setIsReceiptRead(true)
          this.$message(
            `01 Выполняется readReceipt result--> ${+response.result}`
          )
          this.setReceiptResult(response)
        } else {
          // this.setIsReceiptRead(false)
          this.$message(`НЕ выполняется readReceipt`)
        }
      }
    },

    // 03 printReceipt
    async printReceipt() {
      const method = methods[7]
      const type = types[4]

      this.options = this.getPrintReceiptOptions()
      const response = await this.storage.getClient(method, this.options, type)
      if (+response.result === 0) {
        this.setIsReceiptPrint(true)
        this.$message(
          `03 Выполняется printReceipt result--> ${+response.result}`
        )
      } else {
        this.setIsReceiptPrint(false)
        this.$message(`НЕ выполняется printReceipt`)
      }
    },

    doInvoice() {
      this.createReceipt()
      this.timeoutDelay = setTimeout(() => {
      this.readReceipt()
      }, this.delay)
    
      // this.printReceipt()
    },
    createOrder() {
      const type = this.getPanelType

      const options = {
        date: this.getControllerDate,
        time: this.getControllerTime
      }
      this.date = synchronize(options)

      const _date = dateFilter(this.date)

      let result, index, prefix, suffix
      suffix = getRndInteger(10000, 99999)

      switch (type) {
        case 'wash':
          if (this.getWetOrder === '') {
            prefix = 'W'
            index = this.getPanelNumber
            result = prefix + index + _date
            // result = prefix + index + date + '_' + suffix.toString()
          } else result = this.getWetOrder
          break
        case 'vacuum':
          if (this.getDryOrder === '') {
            prefix = 'V'
            index = this.getVacuumNumber
            result = prefix + index + _date
            // result = prefix + index + date + '_' + suffix.toString()
          } else result = this.getDryOrder
          break
        default:
          break
      }

      return result
    },
  }, // end methods
  mounted() {
    this.setRouter('/invoice')

    this.url = process.env.VUE_APP_URL_CONNECT
    this.storage = new Storage(this.client, this.url)
    this.order = this.createOrder()
    this.doInvoice()
  },
  beforeDestroy() {
    clearTimeout(this.timeoutDelay)
  },
  components: {
    InvoiceBill,
  },
})
</script>

<style scoped>
.invoice-style {
  background: white;
  margin-left: 10%;
  margin-top: 28em;
  width: 80%;

  border: solid 2px #00b9e3;
  border-radius: 1em;
  box-shadow: 0px 10px 30px #00b9e3;
}
.collection-item {
  margin-top: 3.5em;
  margin-left: 22em;
  background-color: #121212;
  border-color: #121212;
}
.button-style {
  /* padding-left: 2.5em; */
  width: 420px;
  height: 100px;
  border: solid 6px #00b9e3;
  border-radius: 3em;
  box-shadow: 0px 10px 20px #00b9e3;
}
.button-content-style {
  font-size: 3em;
  padding-top: 0.3em;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

