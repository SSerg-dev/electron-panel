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

export default Vue.extend({
  data: () => ({
    name: 'invoice',
    
    client: 'fetch',
    url: 'https://192.168.1.3/',
    storage: null,
    options: {},
  }),
  computed: {
      ...mapGetters({
      getReceiptResult: 'getReceiptResult'
    })
  },
  methods: {
      ...mapGetters({
      getCreateReceiptOptions: 'getCreateReceiptOptions',
      getReadReceiptOptions: 'getReadReceiptOptions',
      getPrintReceiptOptions: 'getPrintReceiptOptions',

      getIsReceiptRead: 'getIsReceiptRead',
      getIsReceiptCreate: 'getIsReceiptCreate',
      getIsReceiptPrint: 'getIsReceiptPrint',

      // getReceiptResult: 'getReceiptResult'
    }),
    ...mapMutations({
      setRouter: 'setRouter',

      setIsReceiptRead: 'setIsReceiptRead',
      setIsReceiptCreate: 'setIsReceiptCreate',
      setIsReceiptPrint: 'setIsReceiptPrint',

      setReceiptResult: 'setReceiptResult'


    }),
    payUp(program) {
      this.$router.push('/program')
    },

    // 01 readReceipt
    async readReceipt() {
      const method = methods[6]
      const type = types[4]

      this.options = this.getReadReceiptOptions()
      const response = await this.storage.getClient(method, this.options, type)
      if (response) {
        if (+response.result === 0) {
          this.setIsReceiptRead(true)
          this.$message(
            `01 Выполняется readReceipt result--> ${+response.result}`
          )
          this.setReceiptResult(response)

        } else {
          this.setIsReceiptRead(false)
           this.$message(`НЕ выполняется readReceipt`)
        }
      }
    },

    // 02 createReceipt
    async createReceipt() {
      const method = methods[5]
      const type = types[4]

      this.options = this.getCreateReceiptOptions()
      const response = await this.storage.getClient(method, this.options, type)
      if (+response.result === 0) {
        this.setIsReceiptCreate(true)
        this.$message(
          `02 Выполняется createReceipt result--> ${+response.result}`
        )
      } else {
        this.setIsReceiptCreate(false)
        this.$message(`НЕ выполняется createReceipt`)
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
      console.log('!!! Invoice.vue doInvoice()')

      this.readReceipt()
      // this.createReceipt()
      // this.printReceipt()
    },

  },
  mounted() {
    this.setRouter('/invoice')
    
    this.storage = new Storage(this.client, this.url)
    this.doInvoice()


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

