<template>
  <div>
    <div class="locate">
      <section>
        <div class="message">
          <div><Message /></div>
        </div>

        <div
          v-if="this.getDryBalance > 0"
          @click="setProgram('price')"
          class="waves-effect price"
          id="button-price"
        >
          <div class="emoji">
            {{ `📄` }}
          </div>
        </div>
      </section>

      <table border="0" width="100%" cellpadding="0" cellspacing="0">
        <tbody>
          <!-- ПЫЛЕСОС vacuum -->
          <tr>
            <td
              v-if="this.actives[0].display === 'block'"
              @click="setProgram('vacuum')"
            >
              <div
                class="waves-effect button-style"
                :class="[
                  { 'card white': !this.isDown.vacuum },
                  { 'card teal accent-3': this.isDown.vacuum },
                ]"
              >
                <div
                  class="button-content-style"
                  :class="[
                    { 'card-content black-text': !this.isDown.vacuum },
                    { 'card-content white-text': this.isDown.vacuum },
                  ]"
                >
                  {{ `${actives[0].title}` }}
                </div>
              </div>
            </td>
          </tr>

          <!-- ВОЗДУХ air -->
          <tr>
            <td
              v-if="this.actives[1].display === 'block'"
              @click="setProgram('air')"
            >
              <div
                class="waves-effect button-style"
                :class="[
                  { 'card white': !this.isDown.air },
                  { 'card teal accent-3': this.isDown.air },
                ]"
              >
                <div
                  class="button-content-style"
                  :class="[
                    { 'card-content black-text': !this.isDown.air },
                    { 'card-content white-text': this.isDown.air },
                  ]"
                >
                  {{ `${actives[1].title}` }}
                </div>
              </div>
            </td>
          </tr>

          <!-- ОМЫВАТЕЛЬ washer -->
          <!-- <tr>
            <td
              v-if="this.actives[2].display === 'block'"
              @click="setProgram('washer')"
            >
              <div
                class="waves-effect button-style"
                :class="[
                  { 'card white': !this.isDown.washer },
                  { 'card teal accent-3': this.isDown.washer },
                ]"
              >
                <div
                  class="button-content-style"
                  :class="[
                    { 'card-content black-text': !this.isDown.washer },
                    { 'card-content white-text': this.isDown.washer },
                  ]"
                >
                  {{ `${actives[2].title}` }}
                </div>
              </div>
            </td>
          </tr> -->

          <!-- ТУРБОСУШКА turboDryer-->
          <tr>
            <td
              v-if="this.actives[3].display === 'block'"
              @click="setProgram('turboDryer')"
            >
              <div
                class="waves-effect button-style"
                :class="[
                  { 'card white': !this.isDown.turboDryer },
                  { 'card teal accent-3': this.isDown.turboDryer },
                ]"
              >
                <div
                  class="button-content-style"
                  :class="[
                    { 'card-content black-text': !this.isDown.turboDryer },
                    { 'card-content white-text': this.isDown.turboDryer },
                  ]"
                >
                  {{ `${actives[3].title}` }}
                </div>
              </div>
            </td>
          </tr>

          <!-- ЧЕРНЕНИЕ blacking -->
          <!-- <tr>
            <td
              v-if="this.actives[4].display === 'block'"
              @click="setProgram('blacking')"
            >
              <div
                class="waves-effect button-style"
                :class="[
                  { 'card white': !this.isDown.blacking },
                  { 'card teal accent-3': this.isDown.blacking },
                ]"
              >
                <div
                  class="button-content-style"
                  :class="[
                    { 'card-content black-text': !this.isDown.blacking },
                    { 'card-content white-text': this.isDown.blacking },
                  ]"
                >
                  {{ `${actives[4].title}` }}
                </div>
              </div>
            </td>
          </tr> -->

          <!-- ДЕЗИНФЕКЦИЯ disinfection-->
          <!-- <tr>
            <td
              v-if="this.actives[5].display === 'block'"
              @click="setProgram('disinfection')"
            >
              <div
                class="waves-effect button-style"
                :class="[
                  { 'card white': !this.isDown.disinfection },
                  { 'card teal accent-3': this.isDown.disinfection },
                ]"
              >
                <div
                  class="button-content-style"
                  :class="[
                    { 'card-content black-text': !this.isDown.disinfection },
                    { 'card-content white-text': this.isDown.disinfection },
                  ]"
                >
                  {{ `${actives[5].title}` }}
                </div>
              </div>
            </td>
          </tr> -->
          <!--  -->
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapMutations, mapGetters, mapActions } from 'vuex'
import Message from '@/components/app/Message'
import EventBus from '@/bus/EventBus'

import { Database } from '@/storage/database.js'
import { Fetch, FetchClient, methods, types } from '@/storage/fetch.js'
import { Storage } from '@/storage/index.js'

import { Component, Box, Circle, Button } from '@/shapes/index.js'
import { dateFilter, getRndInteger, log } from '@/utils/order.js'

export default {
  data: () => ({
    name: 'vacuum-table',
    //loading: true,
    //records: [],
    client: 'fetch',
    url: 'https://192.168.1.3/',
    storage: null,
    options: {},
    order: '',

    active: '',
    timeoutPopup: null,
    isDown: {
      vacuum: false,
      air: false,
      washer: false,
      turboDryer: false,
      blacking: false,
      disinfection: false,
      price: false,
    },
    buttonPrice: null,
    delay: 4000,
  }),

  components: {
    Message,
  },

  props: {
    actives: {
      required: true,
      type: Array,
    },
    number: {
      type: String,
      default: '', //'second'
    },
  },
  computed: {
    ...mapGetters({
      getVacuumNumber: 'getVacuumNumber',
      getWetBalance: 'getWetBalance',
      getDryBalance: 'getDryBalance',
      getDryPaidBonus: 'getDryPaidBonus',

      getPanelType: 'getPanelType',
      getDefaultPanelNumber: 'getDefaultPanelNumber',

      getActiveProgram: 'getActiveProgram',
      getActiveProgramNumber: 'getActiveProgramNumber',

      getWetOrder: 'getWetOrder',
      getDryOrder: 'getDryOrder',
    }),
  },
  watch: {
    getDryBalance(flag) {

      /* dev */
      if (+flag === 0) {
      // if (+flag < 2) {
        this.completeDry()
        
        if (this.getDryPaidBonus > 0) {
        this.chargeBonusMoney()
        }

        this.clearDown()
        this.timeoutPopup = setTimeout(() => {
          this.$router.push('/')
        }, this.delay)
      }
    },
  },
  methods: {
    ...mapActions({
      updateDryStartProgram: 'updateDryStartProgram',
    }),
    ...mapMutations({
      setActiveProgram: 'setActiveProgram',
      setCompleteWash: 'setCompleteWash',
      setChargeBonus: 'setChargeBonus',
    }),
    ...mapGetters({
      getCompleteWash: 'getCompleteWash',
      getChargeBonus: 'getChargeBonus',
      getProfile: 'getProfile',
    }),

    /* dev */
    // ----------------------------------
    // ЗАВЕРШИТЬ ПЫЛЕСОС

    async completeDry() {
      console.log('++completeDry-->')

      const method = methods[11]
      const type = types[4]

      this.options = this.getCompleteWash()
      
      if (!this.order) this.order = this.createOrder() /* 'W220220504143549' */
      this.options.params.order = this.order

      this.options.params.programs[0].program_id = this.getActiveProgramNumber
      this.options.params.programs[0].program_name =
        this.actives[this.getActiveProgramNumber - 1].title

      this.options.params.programs[0].program_quantity = 0.42 // ??

      this.setCompleteWash(this.options.params)
      this.options = this.getCompleteWash()

      console.log(
        'completeDry options-->this.options-->',
        JSON.stringify(this.options)
      )

      const response = await this.storage.getClient(method, this.options, type)

      if (+response.result === 0) {
        this.$message(`Программа пылесоса закончена успешно`)
        if (this.$route.name !== 'home') this.$router.push('/')
      } else {
        this.$message(`Ошибка:  ${response.error}`)
      }
    },
    createOrder() {
      const type = this.getPanelType
      const date = dateFilter(new Date())
      let result, index, prefix, suffix
      suffix = getRndInteger(10000, 99999)

      switch (type) {
        case 'wash':
          if (this.getWetOrder === '') {
            prefix = 'W'
            index = this.getDefaultPanelNumber
            result = prefix + index + date
            // result = prefix + index + date + '_' + suffix.toString()
          } else result = this.getWetOrder
          break
        case 'vacuum':
          if (this.getDryOrder === '') {
            prefix = 'V'
            index = this.getVacuumNumber
            result = prefix + index + date
            // result = prefix + index + date + '_' + suffix.toString()
          } else result = this.getDryOrder
          break
        default:
          break
      }

      return result
    },
    // ----------------------------------
    // СПИСАТЬ БОНУСЫ ИЗ ОБЛАКА
    // ----------------------------------
    async chargeBonusMoney() {
      // console.log('++chargeBonusMoney')

      const method = methods[13]
      const type = types[4]

      this.options = this.getChargeBonus()
      this.sum = this.getDryPaidBonus

      
      this.options.params.sum = +this.sum
      this.options.params.cash = this.cash
      this.options.params.order = this.order

      const prefix = '+'
      const profile = this.getProfile()

      this.options.params.phone = prefix + profile.phone

      this.setChargeBonus(this.options.params)
      this.options = this.getChargeBonus()
      /* dev */
      // this.options.params.sum = 4

      console.log(
        '++chargeBonusMoney-->options-->this.options-->',
        JSON.stringify(this.options)
      )
      const response = await this.storage.getClient(method, this.options, type)
      if (+response.result === 0) {
        this.$message(`У Вас СПИСАНО ${this.options.params.sum} бонуса(ов) `)
        if (this.$route.name !== 'home') this.$router.push('/')
      } else {
        this.$message(`Ошибка:  ${response.error}`)
      }
    },
    // ----------------------------------

    /*     */

    setProgram(program) {
      this.setDown(program)

      this.active = program
      this.setActiveProgram(this.active)

      this.updateDryStartProgram([
        this.getPanelType,
        this.getVacuumNumber,
        this.getActiveProgram,
        this.getDryBalance,
      ])
    },
    setDown(program) {
      this.clearDown()
      switch (program) {
        case 'vacuum':
          this.isDown.vacuum = true
          break
        case 'air':
          this.isDown.air = true
          break
        case 'washer':
          this.isDown.washer = true
          break
        case 'turboDryer':
          this.isDown.turboDryer = true
          break
        case 'blacking':
          this.isDown.blacking = true
          break
        case 'disinfection':
          this.isDown.disinfection = true
          break
        case 'price':
          this.isDown.price = true
          this.$router.push('/cost')
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
    setup() {
      this.initial()
    },
    initial() {
      // classes instances

      /* button price */
      this.buttonPrice = new Button({
        selector: '#button-price',

        width: 8.5,
        height: 8.5,
        background: 'rgb(255, 255, 255)',
        border: '0.4em solid rgb(64, 196, 255)',
        boxShadow: 'rgb(64, 196, 255) 0px 10px 20px',
        borderRadius: 2,
        fontSize: '1em',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      })

      if (!+this.getDryBalance > 0) this.buttonPrice.hide()
    },
  },
  mounted() {
    this.storage = new Storage(this.client, this.url)
    this.order = this.getCompleteWash().params.order

    this.setup()
  },

  beforeDestroy() {
    clearTimeout(this.timeoutPopup)
  },
}
</script>

<style scoped>
/* dev */
.locate {
  /* position: relative; */
  text-align: center;
}
.message {
  position: absolute;
  margin-top: -10em;
  margin-left: 17em; /* 16em; */

  font-family: 'Plumb-Medium';
  font-weight: normal; /* bold; */
  text-align: justify;
  z-index: 1;
}
table {
  position: absolute;
  margin-top: 18em; /* 18em; 16.5em; */
  margin-left: 2.5em; /* 33em; */

  font-family: 'Plumb-Medium';
  font-weight: bold;
  z-index: 1;

  /* margin: auto; */
  text-align: left;

  /* table-layout: fixed; */
}

tr {
  /* text-align: center; */
  height: 130px;

  float: left;
}
td {
  padding-top: 0px;
  padding-bottom: 0px;
  padding-right: 0px;
  padding-left: 0px;

  height: 105px;
  width: 474px;
}

.price {
  position: absolute;
  margin-top: 0em;
  margin-left: 0.5em;
}
.emoji {
  font-size: 5em;
  padding-bottom: 0em;
}
.button-style {
  padding-top: 0em;
  width: 945px;
  height: 105px;
  border: solid 6px #1de9b6;
  border-radius: 4em;
  box-shadow: 0px 10px 20px #1de9b6;
}
.button-content-style {
  font-size: 3.5em;
  padding-top: 0.2em;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
