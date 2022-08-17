<template>
  <div>
    <div class="locate">
      <section>
        <div class="message">
          <div><Message /></div>
        </div>

        <!-- v-if="getWetBalance > 0" -->
        <div
          @click="setProgram('price')"
          class="waves-effect price"
          id="button-price"
        >
          <div
            class="button-content-style"
            :class="[
              { 'card-content black-text': !this.isDown.price },
              { 'card-content white-text': this.isDown.price },
            ]"
          >
            <!-- style="content:'\1f4c2'; filter: hue-rotate(180deg) brightness(1.5); margin-right:4px;" -->
            <svg>
              <filter id="color">
                <feColorMatrix
                  type="matrix"
                  values="
                  1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 1 0"
                />
              </filter>
            </svg>
            <div class="emoji">
              {{ `📄` }}
            </div>
          </div>
        </div>

        <!-- v-if="!getIsReceiptRead" -->
        <div
          @click="setProgram('receipt')"
          class="waves-effect receipt"
          id="button-receipt"
        >
          <div
            class="button-content-style"
            :class="[
              { 'card-content black-text': !this.isDown.receipt },
              { 'card-content white-text': this.isDown.receipt },
            ]"
          >
            {{ `🧾` }}
          </div>
        </div>

        <!-- v-if="!getIsMoneyToBonus" -->
        
        
        <!-- dev hidden -->
        
        <div
          @click="setProgram('savemoney')"
          class="waves-effect bonus"
          id="button-bonus"
        >
           
          <div
            class="button-content-style"
            :class="[
              { 'card-content black-text': !this.isDown.bonus },
              { 'card-content white-text': this.isDown.bonus },
            ]"
          >
            <div align="center">
              <ul style="font-size: 0.6em; padding-top: 0em">
                <li>{{ this.currency }}</li>
                <li>
                  <i class="medium material-icons">arrow_downward</i>
                </li>
                <li>
                  <div
                    style="width: 1.8em; border: solid 6px; border-radius: 50%"
                  >
                    {{ `₿` }}
                  </div>
                </li>
              </ul>
            </div>
          </div>

        </div>


        <div v-if="this.isVisibleWashTableBonus" class="savemoney">
          <WashTableBonus :actives="actives" />
        </div>

        <div v-else :key="getWetProgShow">
          <table border="0" width="100%" cellpadding="0" cellspacing="0">
            <tbody v-bind:style="{ opacity: isVisible ? 1 : 0 }">
              <!-- 0 -->
              <!-- ОБЕЗЖИРИВАНИЕ degrease -->
              <tr
                v-if="this.actives[27].display !== 'none'"
                :key="this.keys.keyDegrease"
              >
                <WashTableDegrease :actives="actives" />
              </tr>

              <!-- 1 -->
              <!-- ДИСКИ -->
              <tr
                v-if="this.actives[14].display !== 'none'"
                :key="this.keys.keyDiskEx"
              >
                <WashTableDiskEx :actives="actives" />
              </tr>

              <!-- 2 -->
              <!-- АНТИМОСКИТ -->
              <tr
                v-if="this.actives[15].display !== 'none'"
                :key="this.keys.keyMosquitoEx"
              >
                <WashTableMosquitoEx :actives="actives" />
              </tr>

              <!-- 3 -->
              <!-- ШАМПУНЬ shampoo -->
              <tr
                v-if="this.actives[0].display !== 'none'"
                :key="this.keys.keyShampooEx"
              >
                <WashTableShampooEx :actives="actives" />
              </tr>

              <!-- 4 -->
              <!-- ЩЕТКА + ПЕНА -->
              <tr
                v-if="this.actives[13].display !== 'none'"
                :key="this.keys.keyBrushFoamEx"
              >
                <WashTableBrushFoamEx :actives="actives" />
              </tr>

              <!-- 5 -->
              <!-- ПЕНА -->
              <tr
                v-if="this.actives[5].display !== 'none'"
                :key="this.keys.keyFoamEx"
              >
                <WashTableFoamEx :actives="actives" />
              </tr>

              <!-- 6 -->
              <!-- ВОДА + ШАМПУНЬ -->
              <tr
                v-if="this.actives[1].display !== 'none'"
                :key="this.keys.keyWaterShampooEx"
              >
                <WashTableWaterShampooEx :actives="actives" />
              </tr>

              <!-- 7 -->
              <!-- ХОЛОДНАЯ ВОДА coldWater -->
              <tr
                v-if="this.actives[2].display !== 'none'"
                :key="this.keys.keyColdWaterEx"
              >
                <WashTableColdWaterEx :actives="actives" />
              </tr>

              <!-- 8 -->
              <!-- ТЕПЛАЯ ВОДА warmWater -->
              <tr
                v-if="this.actives[11].display !== 'none'"
                :key="this.keys.keyWarmWaterEx"
              >
                <WashTableWarmWaterEx :actives="actives" />
              </tr>

              <!-- 9 -->
              <!-- ВОСК И ЗАЩИТА waxProtection -->
              <tr
                v-if="this.actives[3].display !== 'none'"
                :key="this.keys.keyWaxProtectionEx"
              >
                <WashTableWaxProtectionEx :actives="actives" />
              </tr>

              <!-- 10 -->
              <!-- СУШКА И БЛЕСК dryShine-->
              <tr
                v-if="this.actives[4].display !== 'none'"
                :key="this.keys.keyDryShineEx"
              >
                <WashTableDryShineEx :actives="actives" />
              </tr>

              <!-- 11 -->
              <!-- ДЕЗИНФЕКЦИЯ disinfection -->
              <tr
                v-if="this.actives[28].display !== 'none'"
                :key="this.keys.keyDisinfection"
              >
                <WashTableDisinfection :actives="actives" />
              </tr>

              <!-- dry group -->
              <!-- vacuum air washer turboDryer -->

              <tr
                v-if="this.actives[16].display !== 'none'"
                :key="this.keys.keyVacuum"
              >
                <WashTableVacuum :actives="actives" />
              </tr>

              <tr
                v-if="this.actives[26].display !== 'none'"
                :key="this.keys.keyTurboDryer"
              >
                <WashTableTurboDryer :actives="actives" />
              </tr>

              <tr
                v-if="this.actives[17].display !== 'none'"
                :key="this.keys.keyAir"
              >
                <WashTableAir :actives="actives" />
              </tr>

              <tr
                v-if="this.actives[18].display !== 'none'"
                :key="this.keys.keyWasher"
              >
                <WashTableWasher :actives="actives" />
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapMutations, mapGetters, mapActions } from 'vuex'
import Message from '@/components/app/Message'
import { Component, Box, Circle, Button } from '@/shapes/index.js'
import sleep from '@/utils/sleep'

import { Database } from '@/storage/database.js'
import { Fetch, FetchClient, methods, types } from '@/storage/fetch.js'
import { Storage } from '@/storage/index.js'

import WashTableDiskEx from '@/components/wash/actives/WashTableDiskEx'
import WashTableMosquitoEx from '@/components/wash/actives/WashTableMosquitoEx'
import WashTableShampooEx from '@/components/wash/actives/WashTableShampooEx'
import WashTableWaterShampooEx from '@/components/wash/actives/WashTableWaterShampooEx'
import WashTableWarmWaterEx from '@/components/wash/actives/WashTableWarmWaterEx'
import WashTableColdWaterEx from '@/components/wash/actives/WashTableColdWaterEx'
import WashTableWaxProtectionEx from '@/components/wash/actives/WashTableWaxProtectionEx'
import WashTableDryShineEx from '@/components/wash/actives/WashTableDryShineEx'
import WashTableBrushFoamEx from '@/components/wash/actives/WashTableBrushFoamEx'
import WashTableFoamEx from '@/components/wash/actives/WashTableFoamEx'
import WashTableVacuum from '@/components/wash/actives/WashTableVacuum'
import WashTableAir from '@/components/wash/actives/WashTableAir'
import WashTableWasher from '@/components/wash/actives/WashTableWasher'
import WashTableTurboDryer from '@/components/wash/actives/WashTableTurboDryer'
import WashTableDegrease from '@/components/wash/actives/WashTableDegrease'
import WashTableDisinfection from '@/components/wash/actives/WashTableDisinfection'
import WashTableBonus from '@/components/wash/WashTableBonus'

import { dateFilter, getRndInteger, log } from '@/utils/order.js'

export default {
  data: () => ({
    popupDelay: 2000,
    intervalFirstTimer: null,
    intervalSecondTimer: null,
    intervalThirdTimer: null,
    seconds: 0,

    name: 'program-table',
    timeoutDelay: null,
    isVisible: false,
    isVisibleWashTableBonus: false,

    /*  */
    keys: {
      keyDegrease: 1,
      keyDiskEx: 2,
      keyMosquitoEx: 3,
      keyShampooEx: 4,
      keyBrushFoamEx: 5,
      keyFoamEx: 6,
      keyWaterShampooEx: 7,
      keyColdWaterEx: 8,
      keyWarmWaterEx: 9,
      keyWaxProtectionEx: 10,
      keyDryShineEx: 11,
      keyDisinfection: 12,

      keyVacuum: 13,
      keyTurboDryer: 14,
      keyAir: 15,
      keyWasher: 16,
    },

    client: 'fetch',
    url: 'https://192.168.1.3/',
    storage: null,
    options: {},
    order: '',

    active: '',
    timeoutPopup: null,
    timeoutSetUp: null,
    isDown: {
      washer: false,
      vacuum: false,
      turboDryer: false,
      air: false,
      price: false,
      receipt: false,
      bonus: false,
    },
    buttonPrice: null,
    buttonReceipt: null,
    buttonBonus: null,

    emoji: '',
    currency: '',
    symbol: '',
    currencies: [],
  }),
  components: {
    Message,
    WashTableDiskEx,
    WashTableMosquitoEx,
    WashTableShampooEx,
    WashTableWaterShampooEx,
    WashTableWarmWaterEx,
    WashTableColdWaterEx,
    WashTableWaxProtectionEx,
    WashTableDryShineEx,
    WashTableBrushFoamEx,
    WashTableFoamEx,
    WashTableVacuum,
    WashTableAir,
    WashTableTurboDryer,
    WashTableWasher,
    WashTableDegrease,
    WashTableDisinfection,
    WashTableBonus,
  },
  props: {
    actives: {
      required: true,
      type: Array,
    },
    delay: {
      required: true,
      type: Number,
    },
  },

  watch: {
    getWetBalance(flag) {
      // console.log('$$ getWetBalance-->', flag)

      // if (+flag === 0) {
      if (+flag <= 1) {
        console.log('$$ this.completeWash-->', flag)
        this.completeWash()
        if (this.getWetPaidBonus > 0 && this.getIsBonusMoney) {
          this.chargeBonusMoney()
          /* dev */
          this.updateWetBonusMoney(0)
        }
      }
    },

    getIsReceiptRead(flag) {
      // console.log('getIsReceiptRead', flag)
      // if (flag) {
      //   this.buttonReceipt.show()
      //   this.flex()
      // } else this.buttonReceipt.hide()
    },

    /* dev hidden */
    getIsMoneyToBonus(flag) {
      console.log('++getIsMoneyToBonus', flag) 
      if (flag) {
        this.buttonBonus.show()
        this.flex()
        this.setMoneyToBonus(this.getWetBalance)
        this.setTimer('first', this.getSecondsFirstTimer)
      } else {
        this.buttonBonus.hide()
      }
    },
    getWetProgShow(flag) {
      // console.log('getWetProgShow', flag, this.actives[14])
    },
    seconds(flag) {
      console.log('++this.seconds-->flag--> ', flag)
      // console.log('this.getIsFirstTimer-->', this.getIsFirstTimer)

      if (flag < 0 || !this.getIsFirstTimer) {
        // this.setMoneyToBonus(0)
        this.setIsMoneyToBonus(false)
        clearInterval(this.intervalFirstTimer)
      }
    },
    /* dev hidden */
    getWetStopFreeCount(flag) {
      if (flag > 0) {
        this.buttonBonus.show()
        this.flex()
      } else {
        this.buttonBonus.hide()
      }
    },
    getSecondsBonusTimer(flag) {
      if (flag > 0) {
        /* dev */
        // this.setIsMoneyToBonus(true)
        // this.buttonBonus.show()
        // this.flex()
      } else {
        // this.setIsMoneyToBonus(false)
        // this.buttonBonus.hide()
      }
    },
    getIsMoneyToBonusNo(flag) {
      if (flag) this.isVisibleWashTableBonus = false
      // else this.isVisibleWashTableBonus = true
    },
  },
  computed: {
    ...mapGetters({
      getPanelType: 'getPanelType',
      getDefaultPanelNumber: 'getDefaultPanelNumber',
      getVacuumNumber: 'getVacuumNumber',

      getActiveProgram: 'getActiveProgram',
      getActiveProgramNumber: 'getActiveProgramNumber',

      getWetBalance: 'getWetBalance',
      getDryBalance: 'getDryBalance',

      getWetProgStatus: 'getWetProgStatus',
      getWetProgShow: 'getWetProgShow',

      getIsReceiptRead: 'getIsReceiptRead',
      getIsReceiptCreate: 'getIsReceiptCreate',
      getIsReceiptPrint: 'getIsReceiptPrint',
      getIsMoneyToBonus: 'getIsMoneyToBonus',
      getWetStopFreeCount: 'getWetStopFreeCount',
      getSecondsBonusTimer: 'getSecondsBonusTimer',
      getIsFirstTimer: 'getIsFirstTimer',
      getIsMoneyToBonusNo: 'getIsMoneyToBonusNo',
      getSecondsFirstTimer: 'getSecondsFirstTimer',

      getInitCurrency: 'getInitCurrency',
      getDefaultCurrency: 'getDefaultCurrency',

      getWetPaidBonus: 'getWetPaidBonus',

      getWetOrder: 'getWetOrder',
      getDryOrder: 'getDryOrder',

      getIsBonusMoney: 'getIsBonusMoney',
    }),
  },

  methods: {
    ...mapActions({
      updateStartProgram: 'updateStartProgram',
    
      updateWetBonusMoney: 'updateWetBonusMoney'
    }),
    ...mapMutations({
      setActiveProgram: 'setActiveProgram',

      setIsReceiptRead: 'setIsReceiptRead',
      setIsReceiptCreate: 'setIsReceiptCreate',
      setIsReceiptPrint: 'setIsReceiptPrint',

      setIsMoneyToBonus: 'setIsMoneyToBonus',
      setMoneyToBonus: 'setMoneyToBonus',
      setSecondsBonusTimer: 'setSecondsBonusTimer',
      setIsFirstTimer: 'setIsFirstTimer',

      setCompleteWash: 'setCompleteWash',
      setChargeBonus: 'setChargeBonus',
    }),
    ...mapGetters({
      getPrintReceiptOptions: 'getPrintReceiptOptions',
      getCompleteWash: 'getCompleteWash',
      getChargeBonus: 'getChargeBonus',
      getProfile: 'getProfile',

      // getLoginBonusPhone: 'getLoginBonusPhone'
      // getIsReceiptPrint: 'getIsReceiptPrint'
    }),
    setProgram(program) {
      if (program === 'price') {
        this.isDown.price = true
        this.buttonPrice.background = 'rgb(64, 196, 255)'
        this.setDown()
        this.$router.push('/cost')
        return
      }
      if (program === 'receipt') {
        this.printReceipt()
        this.isDown.receipt = true
        this.buttonReceipt.background = 'rgb(64, 196, 255)'
        /* dev */
        this.$router.push('/invoice')
        this.setDown()
        return
      }
      if (program === 'savemoney') {
        this.isDown.bonus = true
        this.buttonBonus.background = 'rgb(64, 196, 255)'
        this.setDown()
        /* dev */
        this.saveMoney()
        return
      }

      this.active = program
      this.setActiveProgram(this.active)
      this.setDown(program)

      this.updateStartProgram([
        this.getPanelType,
        this.getDefaultPanelNumber,
        this.getActiveProgram,
        this.getWetBalance,
      ])

      this.timeoutPopup = setTimeout(() => {
        this.$router.push('/popup')
      }, this.popupDelay)
    },
    setDown(program) {
      this.clearDown()

      switch (program) {
        case 'washer':
          this.isDown.washer = true
          break
        case 'vacuum':
          this.isDown.vacuum = true
          break
        case 'turboDryer':
          this.isDown.turboDryer = true
          break
        case 'air':
          this.isDown.air = true
          break

        default:
          break
      }
      this.timeoutSetUp = setTimeout(() => {
        try {
          this.clearDown()
        } catch (err) {}
      }, 500)
    },
    saveMoney() {
      /* dev */
      if (this.getWetStopFreeCount >= 0) {
        /* if (this.getSecondsBonusTimer >= 0) { */
        this.isVisibleWashTableBonus = true
      }
    },
    // printReceipt
    async printReceipt() {
      const method = methods[7]
      const type = types[4]

      this.options = this.getPrintReceiptOptions()
      const response = await this.storage.getClient(method, this.options, type)
      if (+response.result === 0) {
        this.setIsReceiptPrint(true)
        this.$message(
          `03 Выполняется панелью  на запрос печати чека result--> ${+response.result}`
        )
      } else {
        this.setIsReceiptPrint(false)
        this.$message(`НЕ выполняется панелью  на запрос печати чека`)
      }
      // console.log('++ WashTable-->getIsReceiptPrint-->', this.getIsReceiptPrint)
    },
    // ----------------------------------
    // ЗАВЕРШИТЬ МОЙКУ

    async completeWash() {
      // console.log('++completeWash-->')

      const method = methods[11]
      const type = types[4]

      this.options = this.getCompleteWash()

      if (!this.order) this.order = this.createOrder() /* 'W220220504143549' */
      this.options.params.order = this.order

      this.options.params.programs[0].program_id = this.getActiveProgramNumber
      this.options.params.programs[0].program_name =
        this.actives[this.getActiveProgramNumber - 1]?.title

      /* dev */
      this.options.params.programs[0].program_quantity = 0.42

      this.setCompleteWash(this.options.params)
      this.options = this.getCompleteWash()

      // console.log(
      //   'completeWash options-->this.options-->',
      //   JSON.stringify(this.options)
      // )
      const response = await this.storage.getClient(method, this.options, type)

      if (+response.result === 0) {
        this.$message(`Программа мойки закончена успешно`)
        if (this.$route.name !== 'home') this.$router.push('/')
      } else {
        this.$message(`Ошибка:  ${response.error}`)
      }
    },
    // ----------------------------------
    // СПИСАТЬ БОНУСЫ ИЗ ОБЛАКА
    // ----------------------------------
    async chargeBonusMoney() {
      console.log('++chargeBonusMoney')

      const method = methods[13]
      const type = types[4]

      this.options = this.getChargeBonus()
      this.sum = this.getWetPaidBonus

      this.options.params.sum = +this.sum
      this.options.params.cash = this.cash
      this.options.params.order = this.order

      const prefix = '+'
      const profile = this.getProfile()

      this.options.params.phone = prefix + profile.phone

      this.setChargeBonus(this.options.params)
      this.options = this.getChargeBonus()

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
    clearDown() {
      this.isDown = Object.fromEntries(
        Object.entries(this.isDown).map(([key, value]) => [key, false])
      )
      this.buttonPrice.background = 'rgb(255, 255, 255)'
      this.buttonReceipt.background = 'rgb(255, 255, 255)'
      this.buttonBonus.background = 'rgb(255, 255, 255)'
    },
    setup() {
      this.initCurrency()
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

      // button-receipt
      this.buttonReceipt = new Button({
        selector: '#button-receipt',

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

      // button bonus
      /* dev hidden */
      this.buttonBonus = new Button({
        selector: '#button-bonus',

        width: 8.5,
        height: 17.5,
        background: 'rgb(255, 255, 255)',
        border: '0.4em solid rgb(64, 196, 255)',
        boxShadow: 'rgb(64, 196, 255) 0px 10px 20px',
        borderRadius: 2,
        fontSize: '1em',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      })

      if (!+this.getWetBalance > 0) this.buttonPrice.hide()
      /* dev */
      if (this.getIsReceiptRead) this.buttonReceipt.hide()
      if (!this.getIsMoneyToBonus) this.buttonBonus.hide()

      // end classes instances
    },
    initCurrency() {
      const { id, title, key, emoji, currency, symbol } = this.getInitCurrency

      this.current = id
      this.select = title

      this.emoji = emoji
      this.currency = currency
      this.symbol = symbol
      /*     */
    },
    flex() {
      this.buttonBonus.display = 'flex'
      this.buttonBonus.alignItems = 'center'
      this.buttonBonus.justifyContent = 'center'
    },

    runFirstTimer(seconds) {
      this.intervalFirstTimer = setInterval(() => {
        // todo
        this.seconds = seconds--
        this.setSecondsBonusTimer(seconds)
      }, 1000)
      // reset timer
      this.setIsFirstTimer(true)
    },
    runSecondTimer(seconds) {
      this.intervalSecondTimer = setInterval(() => {
        // todo
        if (--seconds < 0) {
          clearInterval(this.intervalSecondTimer)
        }
      }, 1000)
      return
    },
    runThirdTimer(seconds) {
      this.intervalThirdTimer = setInterval(() => {
        // todo
        if (--seconds < 0) {
          clearInterval(this.intervalThirdTimer)
        }
      }, 1000)
      return
    },

    setTimer(type, seconds) {
      switch (type) {
        case 'first':
          this.runFirstTimer(seconds)
          break
        case 'second':
          this.runSecondTimer(seconds)
          break
        case 'third':
          this.runThirdTimer(seconds)
          break

        default:
          break
      }
    },
    setKeys() {
      this.keys = Object.fromEntries(
        Object.entries(this.keys).map(([key, value], index) => [
          key,
          (index + 1) * 10,
        ])
      )
      // console.log('this.keys-->', this.keys)
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

    /*     */
  }, // end methods
  mounted() {

    this.storage = new Storage(this.client, this.url)
    this.order = this.getCompleteWash().params.order

    if (!this.isVisible) {
      this.timeoutDelay = setTimeout(() => {
        this.isVisible = true
        // rerender after 1 sec.
        this.setKeys()
      }, (this.delay = 1000))
    }
    this.setup()
  },
  beforeDestroy() {
    clearTimeout(this.timeoutDelay)
    clearTimeout(this.timeoutPopup)
    clearTimeout(this.timeoutSetUp)

    clearInterval(this.intervalFirstTimer)
    clearInterval(this.intervalSecondTimer)
    clearInterval(this.intervalThirdTimer)

    this.setIsReceiptRead(false)
    // this.setIsMoneyToBonus(false)
  },
  created() {
    // this.initial()
    // this.setup()
  },
}
</script>

<style scoped>
.message {
  position: absolute;
  margin-top: -10em;
  margin-left: 17em;

  font-family: 'Plumb-Medium';
  font-weight: normal; /* bold; */
  text-align: justify;
  z-index: 1;
}

table {
  position: absolute;
  /* position: relative; */
  margin-top: 18em; /*8em 17.5em 18em; */
  margin-left: 2.5em; /* 33em; */

  font-family: 'Plumb-Medium';
  font-weight: bold;
  z-index: 1;

  /* margin: auto; */
  text-align: left;

  /* table-layout: fixed; */
}

tr {
  text-align: center;
  height: 120px;
  padding-left: 0px;
  padding-right: 0px;

  float: left;
  /* display: flex;
  flex-direction: row;
  justify-content: space-between; */
}
td {
  padding-top: 0px;
  padding-bottom: 0px;
  padding-right: 0px;
  padding-left: 0px;

  width: 32em;
  height: 7em;

  /* float: left; */
}

.price {
  position: absolute;
  margin-top: 0em;
  margin-left: 0.5em;
}
.receipt {
  position: absolute;
  margin-top: 9.2em;
  margin-left: 0.5em;
}
.bonus {
  position: absolute;
  margin-top: 0em;
  margin-left: 62em;
}
.savemoney {
  position: absolute;
  margin-top: 12em;
  margin-left: 2em;
}

.button-content-style {
  font-size: 5em;
  margin-left: 0em;
  padding-top: 0em;
  padding-right: 0em;

  /* display: flex;
  align-items: center;
  justify-content: center; */
}
/* dev */
svg {
  display: none;
}

.emoji {
  -webkit-filter: url(#color);
  filter: url(#color);
}
</style>
