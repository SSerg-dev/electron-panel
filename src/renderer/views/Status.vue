<template>
  <div>
    <div class="locate">
      <section>
        <div align="center" class="page-title">
          <div style="width: 800px; margin-top: 50px;" class="info-title">
            <h2>
              <p align="center">
                <!-- Статус выполнения операции: -->
                {{ `The_status_of_the_operation` | localize }}
              </p>
            </h2>
          </div>
        </div>

        <div align="center" class="status">
          <StatusBill />
          <!-- <SettingPanelType /> -->
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import StatusBill from '@/components/StatusBill'

export default Vue.extend({
  date: () => ({
    intervalMainMenu: null
  }),
  computed: {
    ...mapGetters({
      getSecondsGotoMainMenu: 'getSecondsGotoMainMenu',
      getCardMoney: 'getCardMoney'
    })
  },
  methods: {
    ...mapMutations({
      setRouter: 'setRouter'
    })
  },
  mounted() {
    this.setRouter('/status')
  },
  beforeDestroy() {
    clearInterval(this.intervalMainMenu)
  },

  components: {
    StatusBill
  }
})
</script>

<style scoped>
.info-title {
  width: 800px;
  padding-top: 0.5em;
  margin-top: 0em;
  margin-left: 0em;
  /* font-size: 2.5em; */
}
.locate {
  position: relative;
}

.page-title {
  position: absolute;
  margin-top: 18em;
  margin-left: 10em;

  top: 0%;
  left: 0%;
  color: white;
  text-align: right;

  font-family: 'Plumb-Medium';
  font-weight: bold;
  z-index: 1;
}
.status {
  position: absolute;
  margin-top: 60em;
  margin-left: 3em;
}

.description {
  font-family: 'Plumb-Medium';
  font-size: 3.5em;
  font-weight: bold;
}
</style>
