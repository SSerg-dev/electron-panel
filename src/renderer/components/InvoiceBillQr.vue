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
      getDefaultPanelNumber: 'getDefaultPanelNumber',
      getReceiptResult: 'getReceiptResult'
    })
  },
  methods: {
    ...mapGetters({
      getQrOptions: 'getQrOptions',
    }),
    ...mapMutations({
    }),

    async getQr() {
      // let year, month, day
      // let hour, minute

      let receiptDate, receiptTime, date, time, sum, fn, fp

      receiptDate = this.getReceiptResult.receipt.date
      receiptTime = this.getReceiptResult.receipt.time
      
      date = this.dateFilter(receiptDate, 'date')
      time = this.dateFilter(receiptTime, 'shorttime')

      const options = date + time // + sum + fn + fp 
      console.log('$$ options', options)


      this.qr = 't=20220819T0201&s=1.00&fn=9287440300907662&i=2154&fp=1590375906&n=1'
    },
  dateFilter(value, format = 'datetime') {
    console.log('$$ format', value, format)
  const options = {}

  options.day = '2-digit'
  options.month = '2-digit'
  options.year = 'numeric'

  options.hour = '2-digit'
  options.minute = '2-digit'
  options.second = '2-digit'

  let year, month, day
  let hour, minute, second

  let result = new Intl.DateTimeFormat('ru-RU', options).format(new Date(value))
  // console.log('$$ result', result)

  year = result.slice(6, 10)
  month = result.slice(3, 5)
  day = result.slice(0, 2)

  hour = result.slice(12, 14)
  minute = result.slice(15, 17)
  second = result.slice(18, 20)

  if (format.includes('date')) result = year + month + day
  if (format.includes('time')) result = hour + minute + second
  if (format.includes('shorttime')) result = hour + minute
  if (format.includes('datetime'))
    result = year + month + day + hour + minute + second

  return result
}

  }, // end methods

  mounted() {
    // console.log('$$ Qr getReceiptResult result-->', this.getReceiptResult)
    this.getQr()
  },
  beforeDestroy() {
  },
  components: {
    VueQrcode
  }
}
</script>

<style scoped>
.qr-code {
  position: absolute;
  margin-top: -30em;
  margin-left: 40.5em;
}
</style>
