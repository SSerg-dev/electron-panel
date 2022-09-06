<template>
  <div>
    <div v-if="isMainMenu">
      <MainMenu :type="type" />
    </div>

    <section v-if="!isMainMenu">
      <ul class="collection">
        <!-- 1 first -->
        <!-- 
          <pre>{{ `ОПЛАТИТЬ  ` }}</pre>
              <div style="color: #00b9e3">{{ `ПОСТ №2` }}</div>
         -->

        <li
          v-if="getVacuum === 1"
          class="collection-item cost"
          @click="payUp('first')"
        >
          <div class="card white waves-effect button-style">
            <div class="card-content black-text button-content-style">
              <div style="color: #00b9e3">{{ `BOX` | localize }}</div>
              <div>{{ `&nbsp` }}</div>
              <div style="color: #00b9e3">{{ `#` | localize }}</div>
              <div style="color: #00b9e3">{{ `1` }}</div>
              <div>{{ `&nbsp &nbsp` }}</div>

              <div>{{ `PAYMENT` | localize }}</div>
            </div>
          </div>
        </li>
        <li
          v-if="getVacuum === 2"
          class="collection-item cost"
          @click="payUp('third')"
        >
          <div class="card white waves-effect button-style">
            <div class="card-content black-text button-content-style">
              <div style="color: #00b9e3">{{ `BOX` | localize }}</div>
              <div>{{ `&nbsp` }}</div>
              <div style="color: #00b9e3">{{ `#` | localize }}</div>
              <div style="color: #00b9e3">{{ `3` }}</div>
              <div>{{ `&nbsp &nbsp` }}</div>
              <div>{{ `PAYMENT` | localize }}</div>
            </div>
          </div>
        </li>

        <!--        -->

        <!-- 2 operator -->

        <li class="collection-item cost" @click="payUp('operator')">
          <div
            class="waves-effect button-style"
            :class="[
              { 'card deep-purple lighten-1': !this.isDown.operator },
              { 'card teal accent-3': this.isDown.operator },
            ]"
            style="border: solid 2px #b39ddb; box-shadow: 0px 15px 20px #7e57c2"
          >
            <div
              class="button-content-style"
              :class="[
                { 'card-content white-text': !this.isDown.operator },
                { 'card-content grey-text': this.isDown.operator },
              ]"
            >
              {{ `CONSULTANT` | localize }}
            </div>
          </div>
        </li>

        <!-- 3 second -->
        <li
          v-if="getVacuum === 1"
          class="collection-item cost"
          @click="payUp('second')"
        >
          <div class="card white waves-effect button-style">
            <div class="card-content black-text button-content-style">
              <div>{{ `PAYMENT` | localize }}</div>
              <div>{{ `&nbsp &nbsp` }}</div>
              <div style="color: #00b9e3">{{ `BOX` | localize }}</div>
              <div>{{ `&nbsp` }}</div>
              <div style="color: #00b9e3">{{ `#` | localize }}</div>
              <div style="color: #00b9e3">{{ `2` }}</div>
            </div>
          </div>
        </li>

        <li
          v-if="getVacuum === 2"
          class="collection-item cost"
          @click="payUp('fourth')"
        >
          <div class="card white waves-effect button-style">
            <div class="card-content black-text button-content-style">
              <div>{{ `PAYMENT` | localize }}</div>
              <div>{{ `&nbsp &nbsp` }}</div>
              <div style="color: #00b9e3">{{ `BOX` | localize }}</div>
              <div>{{ `&nbsp` }}</div>
              <div style="color: #00b9e3">{{ `#` | localize }}</div>
              <div style="color: #00b9e3">{{ `4` }}</div>
            </div>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
import Vue from 'vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'

import MainMenu from '@/components/MainMenu'
import { ipcRenderer } from 'electron'

export default Vue.extend({
  name: 'vacuum',

  data: () => ({
    active: '',
    timeoutPopup: null,
    timeoutDelay: null,
    delay: 500,
    isDown: {
      stop: false,
      operator: false,
    },

    isMainMenu: false,
    type: 'vacuum',
    //number:
  }),
  computed: {
    ...mapGetters({
      getVacuumNumber: 'getVacuumNumber',
      getVacuum: 'getVacuum',
      getWetBalance: 'getWetBalance',

      getPanelType: 'getPanelType',
      getDefaultPanelNumber: 'getDefaultPanelNumber',

      getActiveProgram: 'getActiveProgram',
      getWetBalance: 'getWetBalance',
      getIsFooter: 'getIsFooter',

      getVacuumNumber: 'getVacuumNumber',
      getDryActive: 'getDryActive'
    }),
  },
  watch: {
    getDryActive(flag) {
      // console.log('$$ flag', flag)
    },
    getVacuumNumber(value) {
      // console.log('$$ value', value)
    }
  },
  components: {
    MainMenu,
  },
  created() {
    this.isMainMenu = false
    /* dev */
    //console.log('--getIsFooter-->', this.getIsFooter)
    this.setIsFooter(false)
    //console.log('++getIsFooter-->', this.getIsFooter)
  },
  beforeDestroy() {
    this.isMainMenu = false
    /* dev */
    this.setIsFooter(true)
  },

  methods: {
    /* dev */
    ...mapMutations({
      setPanelType: 'setPanelType',
      setActiveProgram: 'setActiveProgram',
      setVacuumNumber: 'setVacuumNumber',
      setIsFooter: 'setIsFooter',
      setDryBalance: 'setDryBalance',
    }),
    ...mapActions({
      updateDryStartProgram: 'updateDryStartProgram',
    }),

    /*     */
    /* dev */
    relaunch(index) {
      // this.setDryBalance(0)
      const options = { index: index }
      ipcRenderer.send('async-relaunch-start', options)
    },

    payUp(program) {
      let index = 0
      switch (program) {
        case 'first':
          index = 1
          this.isMainMenu = true
          break
        case 'third':
          index = 3
          this.isMainMenu = true
          break
        case 'operator':
          this.setProgram(program)
          break
        case 'second':
          index = 2
          this.isMainMenu = true
          break
        case 'fourth':
          index = 4
          this.isMainMenu = true
          break

        default:
          break
      }
      if (index > 0) {
        this.relaunch(index)
        this.setVacuumNumber(index)
      }
    },
    setProgram(program) {
      console.log('++setProgram-->', program)
      this.active = program //+
      this.setActiveProgram(this.active)
      this.setDown(program)
      /* dev */
      this.updateDryStartProgram([
        this.getPanelType,
        this.getVacuumNumber,
        this.getActiveProgram,
        this.getDryBalance,
      ])

      this.timeoutPopup = setTimeout(() => {
        this.$router.push('/popup')
      }, this.delay)
    },

    setDown(program) {
      this.clearDown()
      switch (program) {
        case 'stop':
          this.isDown.stop = true
          this.timeoutDelay = setTimeout(() => {
            this.isDown.stop = false
          }, this.delay)
          break
        case 'operator':
          this.isDown.operator = true
          this.timeoutDelay = setTimeout(() => {
            this.isDown.operator = false
          }, this.delay)
          break

        default:
          break
      }
    },
    clearDown() {
      this.isDown = Object.fromEntries(
        Object.entries(this.isDown).map(([key, value]) => [key, false])
      )
    },
  },
})
</script>

<style scoped>
.collection {
  margin-left: auto;
  margin-right: auto;
  margin-top: 0rem;
  border-color: #121212;
  padding-top: 8rem;
}
.collection-item {
  margin-bottom: 16em;
  background-color: #121212;
  border-color: #121212;
}
section {
  margin-top: 18em;
  margin-left: 3em;
}
.button-style {
  width: 945px;
  height: 160px;
  border: solid 6px #00b9e3;
  border-radius: 4em;
  box-shadow: 0px 10px 20px #00b9e3;
}
.button-content-style {
  font-size: 4em;
  padding-top: 1.1em;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
