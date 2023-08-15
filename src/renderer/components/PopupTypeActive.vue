<template>
  <div class="locate">
    <form @submit.prevent="">
      <div class="form">
        <table style="margin-left: 1em; margin-top: 6em">
          <tbody>
            <!-- row 01 -->
            <tr class="image">
              <td colspan="2">
                <div id="green-image" class="active">
                  <img src="@/assets/imgs/actives/green-active-m.svg" />
                </div>
                <div id="blue-image" class="active">
                  <img src="@/assets/imgs/actives/blue-active-m.svg" />
                </div>
                <div id="red-image" class="active">
                  <img src="@/assets/imgs/actives/red-active-m.svg" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'

import { Component, Box, Circle, Button } from '@/shapes/index.js'
import Message from '@/components/app/Message'
import EventBus from '@/bus/EventBus'

export default {
  data: () => ({
    // classes
    greenImage: null,
    blueImage: null,
    redImage: null,

    activeProgram: '',

    timeoutDelay: null,
    timeoutPopup: null,
    timeoutToProgram: null,
  }),

  props: {
    // actives: {
    //   required: true,
    //   type: Array,
    // },
  },

  computed: {
    ...mapGetters({
      getPanelType: 'getPanelType',
      getPanelNumber: 'getPanelNumber',
      getActiveProgram: 'getActiveProgram',
      getWetBalance: 'getWetBalance',
    }),
  },

  methods: {
    showActive(program) {
      switch (program) {
        // blue -------------------------
        case 'disk':
        case 'disk_x2':
        case 'mosquito_x2':
        case 'shampoo':
        case 'shampoo_x2':
        case 'waterShampoo':
        case 'waterShampoo_turbo':
        case 'coldWater':
        case 'coldWater_turbo':
        case 'warmWater':
        case 'warmWater_turbo':
        case 'waxProtection':
        case 'waxProtection_turbo':
        case 'dryShine':
        case 'dryShine_turbo':
          this.blueImage.show()
          this.greenImage.hide()
          this.redImage.hide()

          // this.$router.push('/program')
          break

        // green ------------------------
        case 'brushFoam':
        case 'brushFoam_color':
        case 'brushFoam_x2':
          this.blueImage.hide()
          this.greenImage.show()
          this.redImage.hide()

          // this.$router.push('/program')
          break

        // red --------------------------
        case 'foam':
        case 'foam_color':
        case 'foam_x2':
          this.blueImage.hide()
          this.greenImage.hide()
          this.redImage.show()

          // this.$router.push('/program')
          break

        default:
          // this.$router.push('/program')
          break
      }
    },
    setup() {
      this.initial()
      this.greenImage.hide()
      this.blueImage.hide()
      this.redImage.hide()
    },
    initial() {
      // image classes instances
      this.greenImage = new Box({
        selector: '#green-image',
      })

      this.blueImage = new Box({
        selector: '#blue-image',
      })

      this.redImage = new Box({
        selector: '#red-image',
      })
    },
  }, // end methods

  created() {
    this.activeProgram = this.getActiveProgram
  },
  mounted() {
    this.setup()
    this.showActive(this.activeProgram)

    this.timeoutToProgram = setTimeout(() => {
      this.$router.push('/program')
    }, 2000)
  },

  beforeDestroy() {
    clearTimeout(this.timeoutDelay)
    clearTimeout(this.timeoutPopup)
    clearTimeout(this.timeoutToProgram)
  },

  components: {
    Message,
  },
}
</script>

<style scoped>
.form {
  width: 67em;
  height: 82em;
  position: absolute;
  right: 4em;
}

.info-title {
  height: 1.5em;
  font-size: 4.2em; /* 4.75em; */
  color: white;
}
table,
tr,
td {
  border: none;
  border-color: white;
}
.button-group {
  padding-left: 0em;
}

.message {
  position: absolute;
  margin-top: -36em;
  margin-left: 15em;

  font-family: 'Roboto-Medium';
  font-weight: normal; /* bold; */
  text-align: justify;
  z-index: 1;
}
.image {
  height: 54em;
}
.button-black-title {
  font-size: 4em;
  color: black;
}
.button-white-title {
  font-size: 4em;
  color: white;
}
.locate {
  position: relative;
  text-align: center;
}
.back {
  position: absolute;
  margin-top: -22em;
  margin-left: -2em;
  z-index: 1;
}
.active {
  padding-left: 4.5rem;
  padding-bottom: 6rem;
}
.small-button {
  width: 125px;
  height: 120px;
  border: solid 6px #00b9e3;
  border-radius: 2.5em;
  box-shadow: 0px 6px 10px #00b9e3;
}
.small-button-title {
  padding-top: 1em;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
