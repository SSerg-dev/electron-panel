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
                  { 'card teal accent-3': this.isDown.vacuum }
                ]"
              >
                <div
                  class="button-content-style"
                  :class="[
                    { 'card-content black-text': !this.isDown.vacuum },
                    { 'card-content white-text': this.isDown.vacuum }
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
                  { 'card teal accent-3': this.isDown.air }
                ]"
              >
                <div
                  class="button-content-style"
                  :class="[
                    { 'card-content black-text': !this.isDown.air },
                    { 'card-content white-text': this.isDown.air }
                  ]"
                >
                  {{ `${actives[1].title}` }}
                </div>
              </div>
            </td>
          </tr>

          <!-- ОМЫВАТЕЛЬ washer -->
          <tr>
            <td
              v-if="this.actives[2].display === 'block'"
              @click="setProgram('washer')"
            >
              <div
                class="waves-effect button-style"
                :class="[
                  { 'card white': !this.isDown.washer },
                  { 'card teal accent-3': this.isDown.washer }
                ]"
              >
                <div
                  class="button-content-style"
                  :class="[
                    { 'card-content black-text': !this.isDown.washer },
                    { 'card-content white-text': this.isDown.washer }
                  ]"
                >
                  {{ `${actives[2].title}` }}
                </div>
              </div>
            </td>
          </tr>

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
                  { 'card teal accent-3': this.isDown.turboDryer }
                ]"
              >
                <div
                  class="button-content-style"
                  :class="[
                    { 'card-content black-text': !this.isDown.turboDryer },
                    { 'card-content white-text': this.isDown.turboDryer }
                  ]"
                >
                  {{ `${actives[3].title}` }}
                </div>
              </div>
            </td>
          </tr>

          <!-- ЧЕРНЕНИЕ blacking -->
          <tr>
            <td
              v-if="this.actives[4].display === 'block'"
              @click="setProgram('blacking')"
            >
              <div
                class="waves-effect button-style"
                :class="[
                  { 'card white': !this.isDown.blacking },
                  { 'card teal accent-3': this.isDown.blacking }
                ]"
              >
                <div
                  class="button-content-style"
                  :class="[
                    { 'card-content black-text': !this.isDown.blacking },
                    { 'card-content white-text': this.isDown.blacking }
                  ]"
                >
                  {{ `${actives[4].title}` }}
                </div>
              </div>
            </td>
          </tr>

          <!-- ДЕЗИНФЕКЦИЯ disinfection-->
          <tr>
            <td
              v-if="this.actives[5].display === 'block'"
              @click="setProgram('disinfection')"
            >
              <div
                class="waves-effect button-style"
                :class="[
                  { 'card white': !this.isDown.disinfection },
                  { 'card teal accent-3': this.isDown.disinfection }
                ]"
              >
                <div
                  class="button-content-style"
                  :class="[
                    { 'card-content black-text': !this.isDown.disinfection },
                    { 'card-content white-text': this.isDown.disinfection }
                  ]"
                >
                  {{ `${actives[5].title}` }}
                </div>
              </div>
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

import { Component, Box, Circle, Button } from '@/shapes/index.js'

export default {
  data: () => ({
    name: 'vacuum-table',
    //loading: true,
    //records: [],
    active: '',
    timeoutPopup: null,
    isDown: {
      vacuum: false,
      air: false,
      washer: false,
      turboDryer: false,
      blacking: false,
      disinfection: false,
      price: false
    },
    buttonPrice: null,
    delay: 4000
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
      getVacuumNumber: 'getVacuumNumber',
      getWetBalance: 'getWetBalance',

      getPanelType: 'getPanelType',
      getDefaultPanelNumber: 'getDefaultPanelNumber',
      getActiveProgram: 'getActiveProgram',
      getDryBalance: 'getDryBalance'
    })
  },
  watch: {
    getDryBalance(flag) {
      if (parseInt(flag) === 0) {
        this.clearDown()
        this.timeoutPopup = setTimeout(() => {
          this.$router.push('/')
        }, this.delay)
      }
    }
  },
  methods: {
    ...mapActions({
      updateDryStartProgram: 'updateDryStartProgram'
    }),
    ...mapMutations({
      setActiveProgram: 'setActiveProgram'
    }),
    ...mapGetters({}),

    setProgram(program) {
      this.setDown(program)

      this.active = program
      this.setActiveProgram(this.active)

      this.updateDryStartProgram([
        this.getPanelType,
        this.getVacuumNumber,
        this.getActiveProgram,
        this.getDryBalance
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
        justifyContent: 'center'
      })

      if (!+this.getDryBalance > 0) this.buttonPrice.hide()
    }
  },
  mounted() {
    this.setup()
  },

  beforeDestroy() {
    clearTimeout(this.timeoutPopup)
  }
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
