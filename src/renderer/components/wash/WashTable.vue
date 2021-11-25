<template>
  <div>
    <div class="locate">
      <section>
        <div class="message">
          <div><Message /></div>
        </div>
        <div  v-if="getWetBalance > 0" class="price">
          <img src="imgs/price/price-up.png" />
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
          <!-- <tr align="center" v-if="this.actives[13].display !== 'none'">
            
            <td
              v-if="
                this.actives[20].display === 'none' &&
                  this.actives[23].display === 'none'
              "
              colspan="1"
              align="center"
              heigth="105px"
            >
              <button
                v-if="this.isDown.brushFoam === false"
                style="background-image:url('./imgs/green/green_long.png'); width: 962px; height: 105px;"
                class="btn black red-size"
                @click="setProgram('brushFoam')"
              >
                <div class="button-title-long">
                  {{ `${actives[13].title}` }}
                </div>
              </button>
              <button
                v-if="this.isDown.brushFoam === true"
                style="background-image:url('./imgs/green/green_long_down.png'); width: 962px; height: 105px;"
                class="btn black red-size"
                @click="setProgram('brushFoam')"
              >
                <div class="button-title-long">
                  {{ `${actives[13].title}` }}
                </div>
              </button>
            </td>
            
            <td
              v-else-if="
                this.actives[20].display === 'block' &&
                  this.actives[23].display === 'none'
              "
              colspan="1"
              align="center"
              heigth="105px"
            >
              <button
                v-if="this.isDown.brushFoam === false"
                style="background-image:url('./imgs/green/green_long_x2.png'); width: 832px; height: 105px;"
                class="btn black red-size"
                @click="setProgram('brushFoam')"
              >
                <div class="button-title-long">
                  {{ `${actives[13].title}` }}
                </div>
              </button>
              <button
                v-if="this.isDown.brushFoam === true"
                style="background-image:url('./imgs/green/green_long_down_x2.png'); width: 832px; height: 105px;"
                class="btn black red-size"
                @click="setProgram('brushFoam')"
              >
                <div class="button-title-long">
                  {{ `${actives[13].title}` }}
                </div>
              </button>
            </td>

            
            <td
              v-else-if="
                this.actives[20].display === 'none' &&
                  this.actives[23].display === 'block'
              "
              colspan="1"
              align="center"
              heigth="105px"
            >
              <button
                v-if="this.isDown.brushFoam === false"
                style="background-image:url('./imgs/green/green_long_x2.png'); width: 832px; height: 105px;"
                class="btn black red-size"
                @click="setProgram('brushFoam')"
              >
                <div class="button-title-long">
                  {{ `${actives[13].title}` }}
                </div>
              </button>
              <button
                v-if="this.isDown.brushFoam === true"
                style="background-image:url('./imgs/green/green_long_down_x2.png'); width: 832px; height: 105px;"
                class="btn black red-size"
                @click="setProgram('brushFoam')"
              >
                <div class="button-title-long">
                  {{ `${actives[13].title}` }}
                </div>
              </button>
            </td>
            
            <td
              v-else-if="
                this.actives[20].display === 'block' &&
                  this.actives[23].display === 'block'
              "
              colspan="1"
              align="center"
              heigth="105px"
            >
              <button
                v-if="this.isDown.brushFoam === false"
                style="background-image:url('./imgs/green/green_long_x2_color.png'); width: 704px; height: 105px;"
                class="btn black red-size"
                @click="setProgram('brushFoam')"
              >
                <div class="button-title-long">
                  {{ `${actives[13].title}` }}
                </div>
              </button>
              <button
                v-if="this.isDown.brushFoam === true"
                style="background-image:url('./imgs/green/green_long_down_x2_color.png'); width: 704px; height: 105px;"
                class="btn black red-size"
                @click="setProgram('brushFoam')"
              >
                <div class="button-title-long">
                  {{ `${actives[13].title}` }}
                </div>
              </button>
            </td>

            <td
              colspan="1"
              v-if="
                this.actives[20].display !== 'none' &&
                  this.actives[25].x2 === true
              "
            >
              <button
                v-if="this.isDown.brushFoam_color === false"
                style="padding-right: 96px; height: 105px "
                class="btn color"
                @click="setProgram('brushFoam_color')"
              >
                <img src="imgs/color/color_an1.gif" />
              </button>
              <button
                v-if="this.isDown.brushFoam_color === true"
                style="padding-right: 96px; height: 105px "
                class="btn color"
                @click="setProgram('brushFoam_color')"
              >
                <img src="imgs/color/color_an2.gif" />
              </button>
            </td>

            <td
              style="padding-right: 8.4em;"
              colspan="1"
              v-if="this.actives[23].display !== 'none'"
            >
              <button
                v-if="this.isDown.brushFoam_x2 === false"
                style="padding-right: 96px; height: 105px"
                class="btn x2"
                @click="setProgram('brushFoam_x2')"
              >
                <img src="imgs/x2/x2_an1.gif" />
              </button>
              <button
                v-if="this.isDown.brushFoam_x2 === true"
                style="padding-right: 96px; height: 105px"
                class="btn x2"
                @click="setProgram('brushFoam_x2')"
              >
                <img src="imgs/x2/x2_an2.gif" />
              </button>
            </td>
          </tr> -->

          <tr v-if="this.actives[13].display !== 'none'" style="height: 110px;">
             <WashTableBrushFoam :actives="actives"/>
          </tr>

          <!-- 4 -->
          <!-- ПЕНА -->
          <tr align="center" v-if="this.actives[5].display !== 'none'">
            <td
              v-if="
                this.actives[19].display === 'none' &&
                  this.actives[22].display === 'none'
              "
              colspan="1"
              align="center"
              heigth="105px"
            >
              <button
                v-if="this.isDown.foam === false"
                style="background-image:url('./imgs/red/red_long.png'); width: 962px; height: 105px;"
                class="btn black red-size"
                @click="setProgram('foam')"
              >
                <div class="button-title-long">{{ `${actives[5].title}` }}</div>
              </button>
              <button
                v-if="this.isDown.foam === true"
                style="background-image:url('./imgs/red/red_long_down.png'); width: 962px; height: 105px;"
                class="btn black red-size"
                @click="setProgram('foam')"
              >
                <div class="button-title-long">{{ `${actives[5].title}` }}</div>
              </button>
            </td>

            <!-- 2 -->
            <td
              v-else-if="
                this.actives[19].display === 'block' &&
                  this.actives[22].display === 'none'
              "
              colspan="1"
              align="center"
              heigth="105px"
            >
              <button
                v-if="this.isDown.foam === false"
                style="background-image:url('./imgs/red/red_long_x2.png'); width: 832px; height: 105px;"
                class="btn black red-size"
                @click="setProgram('foam')"
              >
                <div class="button-title-long">{{ `${actives[5].title}` }}</div>
              </button>
              <button
                v-if="this.isDown.foam === true"
                style="background-image:url('./imgs/red/red_long_down_x2.png'); width: 832px; height: 105px;"
                class="btn black red-size"
                @click="setProgram('foam')"
              >
                <div class="button-title-long">{{ `${actives[5].title}` }}</div>
              </button>
            </td>

            <!-- 3 -->
            <td
              v-else-if="
                this.actives[19].display === 'none' &&
                  this.actives[22].display === 'block'
              "
              colspan="1"
              align="center"
              heigth="105px"
            >
              <button
                v-if="this.isDown.foam === false"
                style="background-image:url('./imgs/red/red_long_x2.png'); width: 832px; height: 105px;"
                class="btn black red-size"
                @click="setProgram('foam')"
              >
                <div class="button-title-long">{{ `${actives[5].title}` }}</div>
              </button>
              <button
                v-if="this.isDown.foam === true"
                style="background-image:url('./imgs/red/red_long_down_x2.png'); width: 832px; height: 105px;"
                class="btn black red-size"
                @click="setProgram('foam')"
              >
                <div class="button-title-long">{{ `${actives[5].title}` }}</div>
              </button>
            </td>

            <!-- 4 -->
            <td
              v-else-if="
                this.actives[19].display === 'block' &&
                  this.actives[22].display === 'block'
              "
              colspan="1"
              align="center"
              heigth="105px"
            >
              <button
                v-if="this.isDown.foam === false"
                style="background-image:url('./imgs/red/red_long_x2_color.png'); width: 704px; height: 105px;"
                class="btn black red-size"
                @click="setProgram('foam')"
              >
                <div class="button-title-long">{{ `${actives[5].title}` }}</div>
              </button>
              <button
                v-if="this.isDown.foam === true"
                style="background-image:url('./imgs/red/red_long_down_x2_color.png'); width: 704px; height: 105px;"
                class="btn black red-size"
                @click="setProgram('foam')"
              >
                <div class="button-title-long">{{ `${actives[5].title}` }}</div>
              </button>
            </td>

            <td
              colspan="1"
              v-if="
                this.actives[19].display !== 'none' &&
                  this.actives[19].color === true
              "
            >
              <button
                v-if="this.isDown.foam_color === false"
                style="padding-right: 96px; height: 105px "
                class="btn color"
                @click="setProgram('foam_color')"
              >
                <img src="imgs/color/color_an1.gif" />
              </button>
              <button
                v-if="this.isDown.foam_color === true"
                style="padding-right: 96px; height: 105px "
                class="btn color"
                @click="setProgram('foam_color')"
              >
                <img src="imgs/color/color_an2.gif" />
              </button>
            </td>

            <td
              style="padding-right: 8.4em;"
              colspan="1"
              v-if="this.actives[22].display !== 'none'"
            >
              <button
                v-if="this.isDown.foam_x2 === false"
                style="padding-right: 96px; height: 105px"
                class="btn x2"
                @click="setProgram('foam_x2')"
              >
                <img src="imgs/x2/x2_an1.gif" />
              </button>
              <button
                v-if="this.isDown.foam_x2 === true"
                style="padding-right: 96px; height: 105px"
                class="btn x2"
                @click="setProgram('foam_x2')"
              >
                <img src="imgs/x2/x2_an2.gif" />
              </button>
            </td>
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
          <tr v-if="this.actives[4].display !== 'none'" style="height: 125px;">
             <WashTableDryShine :actives="actives"/>
          </tr>

          <!-- ПЫЛЕСОС vacuum -->
          <tr align="left" style="margin-top: -0.5em;">
            <td
              colspan="1"
              align="center"
              v-if="this.actives[16].display !== 'none'"
            >
              <button
                v-if="this.isDown.vacuum === false"
                style="background-image:url('./imgs/marin/marin_short.png'); width: 474px; height: 105px"
                class="btn black"
                @click="setProgram('vacuum')"
              >
                <div class="button-title-long">
                  {{ `${actives[16].title}` }}
                </div>
              </button>
              <button
                v-if="this.isDown.vacuum === true"
                style="background-image:url('./imgs/marin/marin_short_down.png'); width: 474px; height: 105px"
                class="btn black"
                @click="setProgram('vacuum')"
              >
                <div class="button-title-long">
                  {{ `${actives[16].title}` }}
                </div>
              </button>
            </td>

            <!-- ВОЗДУХ air -->
            <td
              colspan="1"
              align="center"
              v-if="this.actives[17].display !== 'none'"
            >
              <button
                v-if="this.isDown.air === false"
                style="background-image:url('./imgs/marin/marin_short.png'); width: 474px; height: 105px"
                class="btn black"
                @click="setProgram('air')"
              >
                <div class="button-title-long">
                  {{ `${actives[17].title}` }}
                </div>
              </button>
              <button
                v-if="this.isDown.air === true"
                style="background-image:url('./imgs/marin/marin_short_down.png'); width: 474px; height: 105px"
                class="btn black"
                @click="setProgram('air')"
              >
                <div class="button-title-long">
                  {{ `${actives[17].title}` }}
                </div>
              </button>
            </td>
          </tr>

          <!-- ОМЫВАТЕЛЬ washer -->
          <tr align="left" style="margin-top: -0.5em;">
            <td
              colspan="1"
              align="center"
              v-if="this.actives[18].display !== 'none'"
              style="width: 474px;"
            >
              <button
                v-if="this.isDown.washer === false"
                style="background-image:url('./imgs/marin/marin_short.png'); width: 474px; height: 105px"
                class="btn black"
                @click="setProgram('washer')"
              >
                <div class="button-title-long">
                  {{ `${actives[18].title}` }}
                </div>
              </button>
              <button
                v-if="this.isDown.washer === true"
                style="background-image:url('./imgs/marin/marin_short_down.png'); width: 474px; height: 105px"
                class="btn black"
                @click="setProgram('washer')"
              >
                <div class="button-title-long">
                  {{ `${actives[18].title}` }}
                </div>
              </button>
            </td>
          
            <!-- ТУРБОСУШКА TURBO DRYER turboDryer-->
            <td
              colspan="1"
              align="left"
              v-if="this.actives[26].display !== 'none'"
              style="width: 474px;"
            >
              <button
                v-if="this.isDown.turboDryer === false"
                style="background-image:url('./imgs/marin/marin_short.png'); width: 474px; height: 105px"
                class="btn black"
                @click="setProgram('turboDryer')"
              >
                <div class="button-title-long">
                  {{ `${actives[26].title}` }}
                </div>
              </button>
              <button
                v-if="this.isDown.turboDryer === true"
                style="background-image:url('./imgs/marin/marin_short_down.png'); width: 474px; height: 105px"
                class="btn black"
                @click="setProgram('turboDryer')"
              >
                <div class="button-title-long">
                  {{ `${actives[26].title}` }}
                </div>
              </button>
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
// WashTableBrushFoam
import WashTableBrushFoam from '@/components/wash/actives/WashTableBrushFoam'




export default {
  data: () => ({
    /* dev */
    // testView: '',

    name: 'program-table',
    timeoutDelay: null,
    isVisible: false,
    //loading: true,
    //records: [],
    active: '',
    timeoutPopup: null,
    isDown: {
      disk: false,
      disk_x2: false,
      mosquito: false,
      mosquito_x2: false,
      brushFoam: false,
      brushFoam_color: false,
      brushFoam_x2: false,
      foam: false,
      foam_color: false,
      foam_x2: false,
      shampoo: false,
      shampoo_x2: false,
      waterShampoo: false,
      waterShampoo_turbo: false,
      warmWater: false,
      warmWater_turbo: false,
      coldWater: false,
      coldWater_turbo: false,
      waxProtection: false,
      waxProtection_turbo: false,
      dryShine: false,
      dryShine_turbo: false,
      washer: false,
      vacuum: false,
      turboDryer: false,
      air: false,
      brushShampoo: false
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
    WashTableBrushFoam
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
      getWetBalance: 'getWetBalance'

      //getWetProgShow: 'getWetProgShow', // '116321902'
      //getWetProgStatus: 'getWetProgStatus',
      //getWetProgPrice: 'getWetProgPrice',
    })
  },
  methods: {
    ...mapActions({
      updateStartProgram: 'updateStartProgram'
    }),
    ...mapMutations({
      setActiveProgram: 'setActiveProgram'
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
      }, 2000)
    },
    setDown(program) {
      this.clearDown()
      switch (program) {
        case 'disk':
          this.isDown.disk = true
          break
        case 'disk_x2':
          this.isDown.disk = true
          this.isDown.disk_x2 = true
          break
        case 'mosquito':
          this.isDown.mosquito = true
          break
        case 'mosquito_x2':
          this.isDown.mosquito = true
          this.isDown.mosquito_x2 = true
          break
        case 'brushFoam':
          this.isDown.brushFoam = true
          break
        case 'brushFoam_color':
          this.isDown.brushFoam = true
          this.isDown.brushFoam_color = true
          break
        case 'brushFoam_x2':
          this.isDown.brushFoam = true
          this.isDown.brushFoam_x2 = true
          break
        case 'foam':
          this.isDown.foam = true
          break
        case 'foam_color':
          this.isDown.foam = true
          this.isDown.foam_color = true
          break
        case 'foam_x2':
          this.isDown.foam = true
          this.isDown.foam_x2 = true
          break
        case 'shampoo':
          this.isDown.shampoo = true
          break
        case 'shampoo_x2':
          this.isDown.shampoo = true
          this.isDown.shampoo_x2 = true
          break
        case 'waterShampoo':
          this.isDown.waterShampoo = true
          break
        case 'waterShampoo_turbo':
          this.isDown.waterShampoo = true
          this.isDown.waterShampoo_turbo = true
          break
        case 'warmWater':
          this.isDown.warmWater = true
          break
        case 'warmWater_turbo':
          this.isDown.warmWater = true
          this.isDown.warmWater_turbo = true
          break
        case 'coldWater':
          this.isDown.coldWater = true
          break
        case 'coldWater_turbo':
          this.isDown.coldWater = true
          this.isDown.coldWater_turbo = true
          break
        case 'waxProtection':
          this.isDown.waxProtection = true
          break
        case 'waxProtection_turbo':
          this.isDown.waxProtection = true
          this.isDown.waxProtection_turbo = true
          break
        case 'dryShine':
          this.isDown.dryShine = true
          break
        case 'dryShine_turbo':
          this.isDown.dryShine = true
          this.isDown.dryShine_turbo = true
          break
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

        /*  */
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
      /* dev */
      this.actives[20].display = 'block'
      this.actives[23].display = 'block'

      this.actives[19].display = 'block'
      this.actives[22].display = 'block'
      
      //this.actives[18].display = 'block'
      // this.testView = this.actives[24].display

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
  margin-top: 17.5em; /*17.5em 18em; */
  margin-left: 0em; /* 33em; */

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
  margin-top: 4em;
  margin-left: 0em;
}
</style>
