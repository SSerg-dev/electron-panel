<template>
  <div>
    <div class="locate">

      <!-- <dev v-if="this.number === 'first'">
        <router-link to="/">
          <div class="back">
            <img src="imgs/key/back.png" />
          </div>
        </router-link>
      </dev> -->

      <section>
        <div class="message">
          <div><Message /></div>
        </div>

        <div
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
        </div>
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
          <!-- dev -->
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
                  {{ `${actives[2].title}` }}
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
                  {{ `${actives[3].title}` }}
                </div>
              </button>
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
      getVaccumNumber: 'getVaccumNumber'
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
      console.log('vaccumProgram-->', program)
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
.back {
  position: absolute;
  margin-top: 9.2em;
  margin-left: 0em;
  z-index: 1;
}
.message {
  position: absolute;
  margin-top: -4em;
  margin-left: 16em; /* 16em; */

  font-family: 'Plumb-Medium';
  font-weight: normal; /* bold; */
  z-index: 1;
}

table {
  position: absolute;
  margin-top: 24em; /* 18em; */
  margin-left: 1.5em; /* 33em; */

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

  /* border-style: solid;
  border-color: white; */
  /* float: left; */
}
.right-col {
  padding-right: 0rem;
  margin-left: -3rem;
}

.turbo {
  background-color: #121212;
  width: 0rem;
  height: 0rem;

  /* position: absolute;
  top: 27.2%;
  left: 77.3%;
  opacity: 1; */
}
.x2 {
  background-color: #121212;
  width: 0rem;
  height: 0rem;

  /* position: absolute;
  top: 18.8%;
  left: 89.0%;
  opacity: 1; */
}
.color {
  border-color: white;
  background-color: #121212;
  width: 0rem;
  height: 0rem;

  /* position: absolute; */
  /* top: 18.8%; */
  /* left: 50.0%; */
  /* opacity: 1; */
}
/* *********************************** */
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
/* dev */
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
  margin-top: 9em;
  margin-left: 60em;
  z-index: 1000;
}
</style>
