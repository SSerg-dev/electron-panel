<template>
  <div>
    <div class="locate">
      <section>
        <div class="message">
          <div><Message /></div>
        </div>
        <div v-if="getWetBalance > 0" class="price">
          <img src="imgs/price/price-up.svg" />
        </div>

        <div v-if="getIsReceiptRead" class="price-menu">
          <img src="imgs/price/price-menu.svg" />
        </div>

        <!-- <router-link to="/bonus">
          <div v-if="!getIsMoneyToBonus" class="price-bonus">
            <img src="imgs/price/price-bonus.svg" />
          </div>
        </router-link> -->

        <div
          v-if="getIsMoneyToBonus"
          @click="setProgram('savemoney')"
          class="price-bonus"
        >
          <img src="imgs/price/price-bonus.svg" />
        </div>
      </section>

      <table border="0" width="100%" cellpadding="0" cellspacing="0">
        <tbody v-bind:style="{ opacity: isVisible ? 1 : 0 }">
          <!-- 0 -->
          <!-- ОБЕЗЖИРИВАНИЕ degrease -->
          <tr  v-if="this.actives[27].display !== 'none'">
            <WashTableDegrease :actives="actives" />
          </tr>

          <!-- 1 -->
          <!-- ДИСКИ -->
          <tr  v-if="this.actives[14].display !== 'none'">
            <WashTableDiskEx :actives="actives" />
          </tr>

          <!-- 2 -->
          <!-- АНТИМОСКИТ -->
          <tr  v-if="this.actives[15].display !== 'none'">
            <WashTableMosquitoEx :actives="actives" />
          </tr>

          <!-- 3 -->
          <!-- ШАМПУНЬ shampoo -->
          <tr  v-if="this.actives[0].display !== 'none'">
            <WashTableShampooEx :actives="actives" />
          </tr>

          <!-- 4 -->
          <!-- ЩЕТКА + ПЕНА -->
          <tr  v-if="this.actives[13].display !== 'none'">
            <WashTableBrushFoamEx :actives="actives" />
          </tr>

          <!-- 5 -->
          <!-- ПЕНА -->
          <tr  v-if="this.actives[5].display !== 'none'">
            <WashTableFoamEx :actives="actives" />
          </tr>

          <!-- 6 -->
          <!-- ВОДА + ШАМПУНЬ -->
          <tr  v-if="this.actives[1].display !== 'none'">
            <WashTableWaterShampooEx :actives="actives" />
          </tr>

          <!-- 7 -->
          <!-- ХОЛОДНАЯ ВОДА coldWater -->
          <tr  v-if="this.actives[2].display !== 'none'">
            <WashTableColdWaterEx :actives="actives" />
          </tr>

          <!-- 8 -->
          <!-- ТЕПЛАЯ ВОДА warmWater -->
          <tr  v-if="this.actives[11].display !== 'none'">
            <WashTableWarmWaterEx :actives="actives" />
          </tr>

          <!-- 9 -->
          <!-- ВОСК И ЗАЩИТА waxProtection -->
          <tr  v-if="this.actives[3].display !== 'none'">
            <WashTableWaxProtectionEx :actives="actives" />
          </tr>

          <!-- 10 -->
          <!-- СУШКА И БЛЕСК dryShine-->
          <tr  v-if="this.actives[4].display !== 'none'">
            <WashTableDryShineEx :actives="actives" />
          </tr>

          <!-- 11 -->
          <!-- ДЕЗИНФЕКЦИЯ disinfection -->
          <tr  v-if="this.actives[28].display !== 'none'">
            <WashTableDisinfection :actives="actives" />
          </tr>

          <!-- dry group -->
          <!-- vacuum air washer turboDryer -->

          <tr >
            <td v-if="this.actives[16].display !== 'none'">
              <WashTableVacuum :actives="actives" />
            </td>
            <td v-if="this.actives[26].display !== 'none'">
              <WashTableTurboDryer :actives="actives" />
            </td>
          </tr>
          <tr >
            <td v-if="this.actives[17].display !== 'none'">
              <WashTableAir :actives="actives" />
            </td>

            <td v-if="this.actives[18].display !== 'none'">
              <WashTableWasher :actives="actives" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapMutations, mapGetters, mapActions } from 'vuex'
import Message from '@/components/app/Message'
import { Component, Box, Circle, Button } from '@/shapes/index.js'

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
/* WashTableDisinfection */

export default {
  data: () => ({
    /* dev */
    // testView: '',
    popupDelay: 2000,

    name: 'program-table',
    timeoutDelay: null,
    isVisible: false,
    //loading: true,
    //records: [],
    active: '',
    timeoutPopup: null,
    isDown: {
      washer: false,
      vacuum: false,
      turboDryer: false,
      air: false
    }
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
    WashTableDisinfection
  },
  props: {
    actives: {
      required: true,
      type: Array
    },
    delay: {
      required: true,
      type: Number
    }
  },
  watch: {
    /* testView(flag) {
      console.log('testView-->flag-->', flag)
    } */
  },
  computed: {
    ...mapGetters({
      getPanelType: 'getPanelType',
      getDefaultPanelNumber: 'getDefaultPanelNumber',
      getActiveProgram: 'getActiveProgram',
      getWetBalance: 'getWetBalance',

      getIsReceiptRead: 'getIsReceiptRead',
      getIsReceiptCreate: 'getIsReceiptCreate',
      getIsReceiptPrint: 'getIsReceiptPrint',
      getIsMoneyToBonus: 'getIsMoneyToBonus',
      getWetStopFreeCount: 'getWetStopFreeCount'
    })
  },

  methods: {
    ...mapActions({
      updateStartProgram: 'updateStartProgram'
    }),
    ...mapMutations({
      setActiveProgram: 'setActiveProgram',

      setIsReceiptRead: 'setIsReceiptRead',
      setIsReceiptCreate: 'setIsReceiptCreate',
      setIsReceiptPrint: 'setIsReceiptPrint',
      setIsMoneyToBonus: 'setIsMoneyToBonus',
      setMoneyToBonus: 'setMoneyToBonus'
    }),
    ...mapGetters({}),
    setProgram(program) {
      if (program === 'savemoney') {
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
        this.getWetBalance
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
    },
    saveMoney() {
      if (this.getWetStopFreeCount > 0) {
        this.setIsMoneyToBonus(true)
        this.setMoneyToBonus(this.getWetBalance)
        this.$router.push('/bonus')
      }
    },
    clearDown() {
      this.isDown = Object.fromEntries(
        Object.entries(this.isDown).map(([key, value]) => [key, false])
      )
    },
    setup() {
      this.setIsMoneyToBonus(false)
      this.setMoneyToBonus(0)
      this.initial()
    },
    initial() {
      // classes instances
      /* button bonus */
      
      /* this.buttonBonus = new Button({
        selector: '#button-bonus',

        width: 25, // 28
        height: 23,
        background: 'rgb(255, 255, 255)',
        borderRadius: 3,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }) */

    }
  },
  mounted() {
    if (!this.isVisible) {
      this.timeoutDelay = setTimeout(() => {
        this.isVisible = true
      }, this.delay)
    }
  },
  beforeDestroy() {
    clearTimeout(this.timeoutDelay)
    clearTimeout(this.timeoutPopup)
    this.setIsReceiptRead(false)
  },
  created() {
    this.setup()
  }
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
  margin-top: 8em; /*17.5em 18em; */
  margin-left: 3em; /* 33em; */

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
  padding-right: 0px;


  float: left;
}
td {
  padding-top: 0px;
  padding-bottom: 0px;
  padding-right: 0px;
  padding-left: 0px;

  width: 32em;
  height: 7em;

  float: left;
  /* 
  display: flex;
  align-items: left;
  justify-content: left; 
  */

}

</style>
