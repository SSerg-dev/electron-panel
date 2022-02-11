<template>
  <div>
    <div class="locate">
      <section>
        <div class="message">
          <div><Message /></div>
        </div>
        <div  v-if="getWetBalance > 0" class="price">
          <img src="imgs/price/price-up.svg" />
        </div>
        <div  v-if="getIsReceiptRead" class="price-menu">
          <img src="imgs/price/price-menu.svg" />
        </div>
        <div  v-if="getIsMoneyToBonus" class="price-bonus">
          <img src="imgs/price/price-bonus.svg" /> 
        </div>
      </section>

      <table border="0" width="100%" cellpadding="0" cellspacing="0">
        <tbody v-bind:style="{ opacity: isVisible ? 1 : 0 }">

          <!-- 1 -->
          <!-- ДИСКИ -->
          <tr v-if="this.actives[14].display !== 'none'" style="height: 110px;">
             <WashTableDisk :actives="actives"/>
          </tr>  
          
          <!-- 2 -->
          <!-- АНТИМОСКИТ -->
          <tr v-if="this.actives[15].display !== 'none'" style="height: 110px;">
             <WashTableMosquito :actives="actives"/>
          </tr>

          <!-- 3 -->
          <!-- ЩЕТКА + ПЕНА -->
          <tr v-if="this.actives[13].display !== 'none'" style="height: 110px;">
             <WashTableBrushFoam :actives="actives"/>
          </tr>

          <!-- 4 -->
          <!-- ПЕНА -->
          <tr v-if="this.actives[5].display !== 'none'" style="height: 110px;">
             <WashTableFoam :actives="actives"/>
          </tr> 

          <!-- 5 -->
          <!-- ШАМПУНЬ shampoo -->
          <tr v-if="this.actives[0].display !== 'none'" style="height: 110px;">
             <WashTableShampoo :actives="actives"/>
          </tr>

          <!-- 6 -->
          <!-- ВОДА + ШАМПУНЬ -->
          <tr v-if="this.actives[1].display !== 'none'" style="height: 110px;">
             <WashTableWaterShampoo :actives="actives"/>
          </tr>

          <!-- 7 -->
          <!-- ТЕПЛАЯ ВОДА warmWater -->
          <tr v-if="this.actives[11].display !== 'none'" style="height: 110px;">
             <WashTableWarmWater :actives="actives"/>
          </tr>

          <!-- 8 -->
          <!-- ХОЛОДНАЯ ВОДА coldWater -->
          <tr v-if="this.actives[2].display !== 'none'" style="height: 110px;">
             <WashTableColdWater :actives="actives"/>
          </tr>

          <!-- 9 -->
          <!-- ВОСК И ЗАЩИТА waxProtection -->
          <tr v-if="this.actives[3].display !== 'none'" style="height: 110px;">
             <WashTableWaxProtection :actives="actives"/>
          </tr>

          <!-- 10 -->
          <!-- СУШКА И БЛЕСК dryShine-->
          <tr v-if="this.actives[4].display !== 'none'" style="height: 110px;">
             <WashTableDryShine :actives="actives"/>
          </tr>

          <!-- dry group -->
          <!-- vacuum air washer turboDryer -->

          <tr>

            <td v-if="this.actives[16].display !== 'none'" style="height: 110px;">
             <WashTableVacuum :actives="actives"/>
            </td>
            
          <td v-if="this.actives[17].display !== 'none'" style="height: 110px;">
             <WashTableAir :actives="actives"/>
            </td>
          
            <td v-if="this.actives[18].display !== 'none'" style="height: 110px;">
             <WashTableWasher :actives="actives"/>
            </td>
            
            <td v-if="this.actives[26].display !== 'none'" style="height: 110px;">
             <WashTableTurboDryer :actives="actives"/>
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
import WashTableDisk from '@/components/wash/actives/WashTableDisk'
import WashTableMosquito from '@/components/wash/actives/WashTableMosquito'
import WashTableShampoo from '@/components/wash/actives/WashTableShampoo'
import WashTableWaterShampoo from '@/components/wash/actives/WashTableWaterShampoo'
import WashTableWarmWater from '@/components/wash/actives/WashTableWarmWater'
import WashTableColdWater from '@/components/wash/actives/WashTableColdWater'
import WashTableWaxProtection from '@/components/wash/actives/WashTableWaxProtection'
import WashTableDryShine from '@/components/wash/actives/WashTableDryShine'
import WashTableBrushFoam from '@/components/wash/actives/WashTableBrushFoam'
import WashTableFoam from '@/components/wash/actives/WashTableFoam'
import WashTableVacuum from '@/components/wash/actives/WashTableVacuum'
import WashTableAir from '@/components/wash/actives/WashTableAir'
import WashTableWasher from '@/components/wash/actives/WashTableWasher'
import WashTableTurboDryer from '@/components/wash/actives/WashTableTurboDryer'



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
      air: false,
      
    }
  }),
  components: {
    Message,
    WashTableDisk,
    WashTableMosquito,
    WashTableShampoo,
    WashTableWaterShampoo,
    WashTableWarmWater,
    WashTableColdWater,
    WashTableWaxProtection,
    WashTableDryShine,
    WashTableBrushFoam,
    WashTableFoam,
    WashTableVacuum,
    WashTableAir,
    WashTableTurboDryer,
    WashTableWasher
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
      getIsMoneyToBonus: 'getIsMoneyToBonus'
      
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
      setIsMoneyToBonus: 'setIsMoneyToBonus'
      
    }),
    ...mapGetters({}),
    setProgram(program) {
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
    clearDown() {
      this.isDown = Object.fromEntries(
        Object.entries(this.isDown).map(([key, value]) => [key, false])
      )
    },
    setup() {
      this.setIsMoneyToBonus(false)
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
  margin-top: 18em; /*17.5em 18em; */
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
  height: 115px;

  float: left;
}
td {
  padding-top: 0px;
  padding-bottom: 0px;
  padding-right: 0px;
  padding-left: 0px;

  height: 105px;
  width: 474px;

  float: left;
/*   display: flex;
  align-items: left;
  justify-content: left;
 */


}
.right-col {
  padding-right: 0rem;
  margin-left: -3rem;
}
.marin-short-rigth {
  padding-right: 6rem;
}
.turbo {
  background-color: #121212;
  width: 0rem;
  height: 0rem;

}
.x2 {
  background-color: #121212;
  width: 0rem;
  height: 0rem;

}
.color {
  border-color: white;
  background-color: #121212;
  width: 0rem;
  height: 0rem;

}
.button-title-long {
  position: relative;
  top: 0%;
  left: 6%;
  color: black;
  font-size: 3.5rem;
  font-weight: bold;
  text-align: left;

  font-family: 'Plumb-Medium';
}
/* Plumb-Medium */
.description {
  font-family: 'Plumb-Medium';
  font-size: 20px;
  font-weight: bold;
}
/*  */
.red-size {
  width: 704px;
  height: 105px;
}
.page-title {
  margin-top: -5em;
  margin-left: 0em;
  color: white;

  font-size: 3em;
  font-family: 'Plumb-Medium';
  font-weight: bold;
  z-index: 1;
}
.price {
  position: absolute;
  margin-top: -0.6em;
  margin-left: 0em;
}
.price-menu {
  position: absolute;
  margin-top: 9em;
  margin-left: 0em;
}
.price-bonus {
  position: absolute;
  margin-top: -0.6em;
  margin-left: 62em;
}
</style>
