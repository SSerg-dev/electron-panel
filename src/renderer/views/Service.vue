<template>
  <div class="page-title">
    <h3>Service & OPCUAClient</h3>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'

export default Vue.extend({
  data: () => ({}),
  mounted() {
    console.log('MOUNTED')
    //try {} catch (e) {}
    try {
      ipcRenderer.send(
        'panel',
        JSON.stringify({ type: 'Post', number: 0 })
      )
      ipcRenderer.on('OPCUA', (evt, payload) => {
        // console.log(payload)
      })
    } catch (e) {
      console.warn('Error:', e.message)
    }
  }
})
</script>

<style scoped>
.page-title {
  padding-top: 30px;
  color: white;
  margin-left: auto;
  margin-right: auto;
  width: 50em;
  align-items: center;
}
</style>
