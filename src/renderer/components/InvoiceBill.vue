<template>
  <!-- -->
  <div v-if="this.getIsReceiptCreate && this.getIsReceiptRead" class="invoice-bill">
    <div class="page-title">
      <p align="center">{{ `${this.getReceiptResult.receipt.org.org}` }}</p>
    </div>

    <table>
      <tbody>
        <tr>
          <td class="td-left">{{ `КАССОВЫЙ ЧЕК / ПРИХОД` }}</td>
          <td class="td-right">{{ `№ док: ${this.getReadReceiptOptions.params.id}` }}</td>
        </tr>
        <tr>
          <td class="td-left">{{ `Кассир` }}</td>
          <td class="td-right">
            {{ `${this.getReceiptResult.receipt.org.cashier}` }}
          </td>
        </tr>
        <tr>
          <td class="td-left">{{ `Услуги автомойки` }}</td>
          <td class="td-right">{{ `${this.getReceiptResult.receipt.sum}` }}</td>
        </tr>
        <tr>
          <td class="td-left">{{ `ИТОГ :` }}</td>
          <td class="td-right">{{ `${this.getReceiptResult.receipt.sum}` }}</td>
        </tr>
        <tr>
          <td class="td-left">{{ `НАЛИЧНЫМИ :` }}</td>
          <td class="td-right">{{ `${this.getReceiptResult.receipt.sum}` }}</td>
        </tr>
        <tr>
          <td class="td-left">{{ `Сумма НДС :` }}</td>
          <td class="td-right">{{ ` без НДС` }}</td>
        </tr>
        <tr>
          <td class="td-left">{{ `РН ККТ : ${this.getReceiptResult.receipt.org.rn}` }}</td>
        
          <td class="td-right">{{ `ИНН : ${this.getReceiptResult.receipt.org.inn}` }}</td>
        </tr>
        <tr class="space"></tr>
        <tr>
          <td class="td-left">{{ `ЗН ККТ : ${this.getReceiptResult.receipt.org.sn}` }}</td>

          <td class="td-right">{{ `` }}</td>
        </tr>
        <tr>
          <td class="td-left">
            {{
              `${this.getReceiptResult.receipt.date} ${this.getReceiptResult.receipt.time}`
            }}
          </td>
          <td class="td-right">{{ `` }}</td>
        </tr>
        <tr>
          <td class="td-left">
            {{ `ФД ${this.getReceiptResult.receipt.fd}` }}
          </td>
          <td class="td-right">{{ `` }}</td>
        </tr>
        <tr>
          <td class="td-left">{{ `ФН ${this.getReceiptResult.receipt.org.fn}` }}</td>
          <td class="td-right">{{ `` }}</td>
        </tr>
        <tr>
          <td class="td-left">
            {{ `ФП ${this.getReceiptResult.receipt.fp}` }}
          </td>
          <td class="td-right">{{ `` }}</td>
        </tr>
        <tr>
          <td class="td-left">
            {{ `ЧЕК : ${this.getReceiptResult.receipt.number}` }}
          </td>
          <td class="td-right">
            {{ `СМЕНА : ${this.getReceiptResult.receipt.session}` }}
          </td>
        </tr>
        <tr>
          <td class="td-left">{{ `СНО : Патент` }}</td>
          <td class="td-right">{{ `` }}</td>
        </tr>
        <tr>
          <td class="td-left">{{ `Сайт ФНС www.nalog.ru` }}</td>
          <td class="td-right">{{ `` }}</td>
        </tr>
      </tbody>
    </table>

    <div>
      <InvoiceBillQr />
    </div>

    <div class="page-title">
      <p align="center">{{ `${this.getReceiptResult.receipt.org.place}` }}</p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

import { mapGetters, mapMutations } from 'vuex'
import InvoiceBillQr from '@/components/InvoiceBillQr'

export default Vue.extend({
  data: () => ({
    name: 'invoice-bill',
  }),
  computed: {
    ...mapGetters({
      getIsReceiptRead: 'getIsReceiptRead',
      getIsReceiptCreate: 'getIsReceiptCreate',
      getIsReceiptPrint: 'getIsReceiptPrint',
      
      getReceiptResult: 'getReceiptResult',
      getReadReceiptOptions: 'getReadReceiptOptions'
    }),
  },
  methods: {
    ...mapMutations({
      setIsReceiptRead: 'setIsReceiptRead',
    }),
  },
  created() {},
  mounted() {
    console.log('this.getIsReceiptCreate && this.getIsReceiptRead', this.getIsReceiptCreate, this.getIsReceiptRead)
    /* if (!this.isVisible) {
      this.timeoutDelay = setTimeout(() => {
        this.isVisible = true
        // rerender after 1 sec.
        // this.setKeys()
      }, (this.delay = 1000))
    } */
  },
  beforeDestroy() {
    // this.setIsReceiptRead(false)
  },
  components: {
    InvoiceBillQr,
  },
})
</script>

<style scoped>
.invoice-bill {
  height: 72em;
  padding-top: 4em;
  border-radius: 2px;
}
.page-title {
  font-size: 2em;
  margin-top: 0em;
  margin-bottom: 0em;
  margin-left: 0em; 
  padding-top: 0em;
  color: rgb(100, 100, 100);
}
.cell-style {
  /* text-align: left; */
  padding-left: 1em;
}
table {
  margin-top: 4em;
  margin-bottom: 4em;
  margin-left: 3em;
  color: rgb(100, 100, 100);
  border: 1px solid;
  border-color: white;
  width: 90%;
}
th {
  border: 1px solid;
  border-color: white;
  font-size: 2em;
  text-align: center;
}
td {
  border: 1px solid;
  border-color: white;
  font-size: 2em;
  /* text-align: center; */
  /* border-left-color: aqua; */
}
.td-left {
  text-align: left;
  width: 50%;
}
.td-right {
  text-align: right;
}
.space {
  height: 2em;
}
</style>
