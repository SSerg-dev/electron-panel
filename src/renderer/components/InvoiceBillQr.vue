<template>
  <div>
    <div>
      <div class="qr-code">
        <vue-qrcode :value="qr" :scale="6.5" :margin="2" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import VueQrcode from 'vue-qrcode'

export default {
  name: 'invoice-bill-qr',

  data: () => ({
    qr: '',
  }),
  computed: {
    ...mapGetters({
      getPanelNumber: 'getPanelNumber',
      getReceiptResult: 'getReceiptResult',
      getReadReceiptOptions: 'getReadReceiptOptions'
    }),
  },
  methods: {
    ...mapGetters({
      getQrOptions: 'getQrOptions',
    }),
    ...mapMutations({}),

    async getQr() {
      let receiptDate, receiptTime, date, time, sum, fn, document, fp, n
      let year, month, day
      let hour, minute

      receiptDate = this.getReceiptResult.receipt.date
      receiptTime = this.getReceiptResult.receipt.time
      sum =  Number.parseFloat(this.getReceiptResult.receipt.sum).toFixed(2) 
      fn = this.getReceiptResult.receipt.org.fn
      document = this.getReadReceiptOptions.params.id //'2410'
      fp = this.getReceiptResult.receipt.fp
      n = '1'

      year = receiptDate.slice(0, 4)
      month = receiptDate.slice(5, 7)
      day = receiptDate.slice(8, 10)

      hour = receiptTime.slice(0, 2)
      minute = receiptTime.slice(3, 5)

      date = year + month + day
      time = hour + minute

      const url =
        't=' +
        date +
        'T' +
        time +
        '&s=' +
        sum +
        '&fn=' +
        fn +
        '&i=' +
        document +
        '&fp=' +
        fp +
        '&n=' + 
        n
      this.qr = url
      // 't=20220819T0201&s=1.00&fn=9287440300907662&i=2154&fp=1590375906&n=1'
    },
  }, // end methods

  mounted() {
    this.getQr()
  },
  beforeDestroy() {},
  components: {
    VueQrcode,
  },
}
</script>

<style scoped>
.qr-code {
  position: absolute;
  margin-top: -30em;
  margin-left: 40.5em;
}
</style>
