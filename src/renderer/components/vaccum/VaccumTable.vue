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

        <!-- <div
          v-if="this.number === 'first'"
          class="price"
          style="margin-left: 58em"
        >
          <img src="imgs/price/price-up.png" />
        </div>

        <div
          v-if="this.number === 'second'"
          class="price"
          style="margin-left: 1.8em"
        >
          <img src="imgs/price/price-up.png" />
        </div> -->

      </section>

      <table border="0" width="100%" cellpadding="0" cellspacing="0">
        <tbody>
          <!-- !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! -->

          <!-- ПЫЛЕСОС vacuum -->

          <tr align="left">
            <td
              colspan="1"
              align="center"
              v-if="this.actives[0].display === 'block'"
            >
              <button
                v-if="this.isDown.vacuum === false"
                style="background-image:url('./imgs/marin/marin_short.png'); width: 474px; height: 105px"
                class="btn black"
                @click="setProgram('vacuum')"
              >
                <div class="button-title-long">
                  {{ `${actives[0].title}` }}
                </div>
              </button>
              <button
                v-if="this.isDown.vacuum === true"
                style="background-image:url('./imgs/marin/marin_short_down.png'); width: 474px; height: 105px"
                class="btn black"
                @click="setProgram('vacuum')"
              >
                <div class="button-title-long">
                  {{ `${actives[0].title}` }}
                </div>
              </button>
            </td>

            <!-- ВОЗДУХ air -->
            <td
              colspan="1"
              align="center"
              v-if="this.actives[1].display === 'block'"
            >
              <button
                v-if="this.isDown.air === false"
                style="background-image:url('./imgs/marin/marin_short.png'); width: 474px; height: 105px"
                class="btn black"
                @click="setProgram('air')"
              >
                <div class="button-title-long">
                  {{ `${actives[1].title}` }}
                </div>
              </button>
              <button
                v-if="this.isDown.air === true"
                style="background-image:url('./imgs/marin/marin_short_down.png'); width: 474px; height: 105px"
                class="btn black"
                @click="setProgram('air')"
              >
                <div class="button-title-long">
                  {{ `${actives[1].title}` }}
                </div>
              </button>
            </td>
          </tr>

          <!-- ОМЫВАТЕЛЬ washer -->

          <tr align="left">
            <td
              colspan="1"
              align="center"
              v-if="this.actives[2].display === 'block'"
              style="width: 474px;"
            >
              <button
                v-if="this.isDown.washer === false"
                style="background-image:url('./imgs/marin/marin_short.png'); width: 474px; height: 105px"
                class="btn black"
                @click="setProgram('washer')"
              >
                <div class="button-title-long">
                  {{ `${actives[2].title}` }}
                </div>
              </button>
              <button
                v-if="this.isDown.washer === true"
                style="background-image:url('./imgs/marin/marin_short_down.png'); width: 474px; height: 105px"
                class="btn black"
                @click="setProgram('washer')"
              >
                <div class="button-title-long">
                  {{ `${actives[2].title}` }}
                </div>
              </button>
            </td>
            <!-- ТУРБОСУШКА turboDryer-->
            <td
              colspan="1"
              align="left"
              v-if="this.actives[3].display === 'block'"
              style="width: 474px;"
            >
              <button
                v-if="this.isDown.turboDryer === false"
                style="background-image:url('./imgs/marin/marin_short.png'); width: 474px; height: 105px"
                class="btn black"
                @click="setProgram('turboDryer')"
              >
                <div class="button-title-long">
                  {{ `${actives[3].title}` }}
                </div>
              </button>
              <button
                v-if="this.isDown.turboDryer === true"
                style="background-image:url('./imgs/marin/marin_short_down.png'); width: 474px; height: 105px"
                class="btn black"
                @click="setProgram('turboDryer')"
              >
                <div class="button-title-long">
                  {{ `${actives[3].title}` }}
                </div>
              </button>
            </td>
          </tr>
          
          <!-- ЧЕРНЕНИЕ blacking -->

          <tr align="left">
            <td
              colspan="1"
              align="center"
              v-if="this.actives[4].display === 'block'"
              style="width: 474px;"
            >
              <button
                v-if="this.isDown.blacking === false"
                style="background-image:url('./imgs/marin/marin_short.png'); width: 474px; height: 105px"
                class="btn black"
                @click="setProgram('blacking')"
              >
                <div class="button-title-long">
                  {{ `${actives[4].title}` }}
                </div>
              </button>
              <button
                v-if="this.isDown.blacking === true"
                style="background-image:url('./imgs/marin/marin_short_down.png'); width: 474px; height: 105px"
                class="btn black"
                @click="setProgram('blacking')"
              >
                <div class="button-title-long">
                  {{ `${actives[4].title}` }}
                </div>
              </button>
            </td>
            <!-- ДЕЗИНФЕКЦИЯ disinfection-->
            <td
              colspan="1"
              align="left"
              v-if="this.actives[5].display === 'block'"
              style="width: 474px;"
            >
              <button
                v-if="this.isDown.disinfection === false"
                style="background-image:url('./imgs/marin/marin_short.png'); width: 474px; height: 105px"
                class="btn black"
                @click="setProgram('disinfection')"
              >
                <div class="button-title-long">
                  {{ `${actives[5].title}` }}
                </div>
              </button>
              <button
                v-if="this.isDown.disinfection === true"
                style="background-image:url('./imgs/marin/marin_short_down.png'); width: 474px; height: 105px"
                class="btn black"
                @click="setProgram('disinfection')"
              >
                <div class="button-title-long">
                  {{ `${actives[5].title}` }}
                </div>
              </button>
            </td>
          </tr>

          <!-- dev -->

          <tr align="left">
            <td
              colspan="1"
              align="left"
              v-if="this.actives[5].display === 'block'"
              style="width: 474px;"
              @click="setProgram('disinfection')"
            >
              <div
                v-if="this.isDown.disinfection === false"
                class="card white waves-effect"
                style="
                width: 945px;
                  height: 105px; 
                  border: solid 6px #50E3C2; 
                  border-radius: 4em;
                  box-shadow: 0px 10px 20px #50E3C2;
                "
              >
                <div 
                  class="card-content black-text"  
                  style="
                  font-size: 3.5em;
                  padding-top: 0.2em;

                  display: flex;
	                align-items: center;
	                justify-content: center;
                  "
                >
                  {{ `${actives[5].title}` }}
                </div>
              </div>

              <div
                v-if="this.isDown.disinfection === true"
                class="card teal accent-3 waves-effect"
                style="
                width: 945px;
                  height: 105px; 
                  border: solid 6px #50E3C2; 
                  border-radius: 4em;
                  box-shadow: 0px 10px 20px #50E3C2;
                "
              >
                <div 
                  class="card-content black-text"
                  style="
                  font-size: 3.5em;
                  padding-top: 0.2em;

                  display: flex;
	                align-items: center;
	                justify-content: center;
                  "
                >
                  {{ `${actives[5].title}` }}
                </div>
              </div>
              
              <!-- <button
                v-if="this.isDown.disinfection === true"
                style="background-image:url('./imgs/marin/marin_short_down.png'); width: 474px; height: 105px"
                class="btn black"
                @click="setProgram('disinfection')"
              >
                <div class="button-title-long">
                  {{ `${actives[5].title}` }}
                </div>
              </button> -->

            </td>
          </tr>

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

export default {
  data: () => ({
    name: 'vaccum-table',
    //loading: true,
    //records: [],
    active: '',
    timeoutPopup: null,
    isDown: {
      /* dev */
      vacuum: false,
      air: false,
      washer: false,
      turboDryer: false,
      blacking: false,
      disinfection: false
    }
  }),

  components: {
    Message
  },

  props: {
    actives: {
      required: true,
      type: Array
    },
    number: {
      type: String,
      default: '' //'second'
    }
  },
  computed: {
    ...mapGetters({
      getVaccumNumber: 'getVaccumNumber',
      getWetBalance: 'getWetBalance'


      //getPanelType: 'getPanelType',
      //getDefaultPanelNumber: 'getDefaultPanelNumber',
      //getActiveProgram: 'getActiveProgram',
      //getWetBalance: 'getWetBalance',
    })
  },
  methods: {
    ...mapActions({
      //updateStartProgram: 'updateStartProgram'
    }),
    ...mapMutations({
      //setActiveProgram: 'setActiveProgram'
    }),
    ...mapGetters({}),
    /* setProgram(program) {
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
    }, */
    setDown(program) {
      this.clearDown()
      switch (program) {
        /* dev */
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

        default:
          break
      }
    },
    setProgram(program) {
      /* dev */
      console.log('vaccumProgram-->', program)
      this.setDown(program)
      /*    */


      /* this.active = program
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
      }, 2000) */
    },
    clearDown() {
      this.isDown = Object.fromEntries(
        Object.entries(this.isDown).map(([key, value]) => [key, false])
      )
    }
  },
  mounted() {
    console.log(
      'mounted getVaccumNumber-->',
      JSON.stringify(this.getVaccumNumber)
    )
  },
  beforeDestroy() {
    //console.log('beforeDestroy ProgramTable-->',  JSON.stringify(this.actives) )
    clearTimeout(this.timeoutPopup)
  }
}
</script>

<style scoped>
/* dev */
.locate {
  position: relative;
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
  margin-top: 16.5em; /* 18em; */
  margin-left: 2em; /* 33em; */

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
.price {
  position: absolute;
  margin-top: 4em;
  margin-left: 1.5em;
  
}
</style>
