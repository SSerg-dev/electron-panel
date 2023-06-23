<template>
  <div>
    <div class="back">
      <!--  -->
      <div v-if="this.getPrevRouter === '/program'">
        <div @click="setProgram()" class="card white small-button-square waves-effect">
          <div class="card-content- black-text small-button-title">
            <img style="width: 65%" src="@/assets/imgs/native/undo.png" />
          </div>
        </div>
      </div>
      <!--  -->
      <div v-else>
        <div @click="setProgram()" class="card white small-button waves-effect">
          <div class="card-content- black-text small-button-title">
            <img style="width: 65%" src="@/assets/imgs/native/undo.png" />
          </div>
        </div>
      </div>
      <!--  -->
    </div>

    <div class="list">
      <div>
        <CostList :costs="items" />
      </div>
    </div>

    <div
      v-if="getPanelType !== 'vacuum'"
      class="paginate"
      style="padding-left: 8em"
    >
      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'<'"
        :next-text="'>'"
        :container-class="'pagination'"
      />
    </div>
  </div>
</template>

<script>
/*   */
/* eslint-disable */
import Vue from 'vue'
import paginationMixin from '@/mixins/pagination.mixin'
import { mapGetters, mapMutations } from 'vuex'
import CostList from '@/components/CostList'

// const MAX_LENGTH = 9

export default Vue.extend({
  name: 'cost',
  mixins: [paginationMixin],
  data: () => ({
    isDown: false,
    costs: [],
    actives: [],

    progPrice: [],
    activeProg: [],
    busyProg: [],

    dryProgPrice: [],
    dryActiveProg: [],
    dryBusyProg: [],

    intervalMainMenu: null,
    date: null,
  }), // End Data
  computed: {
    ...mapGetters({
      getDryProgShow: 'getDryProgShow',
      getWetProgShow: 'getWetProgShow',
      getWetProgStatus: 'getWetProgStatus',
      getDryProgPrice: 'getDryProgPrice',
      getWetProgPrice: 'getWetProgPrice',
      getWetBusyPanel: 'getWetBusyPanel',
      getSecondsGotoMainMenu: 'getSecondsGotoMainMenu',
      getParamsChange: 'getParamsChange',
      getActiveProgNames: 'getActiveProgNames',
      getPanelType: 'getPanelType',
      getPrevRouter: 'getPrevRouter',
    }),
  },
  methods: {
    ...mapMutations({
      setRouter: 'setRouter',
    }),
    setDown() {
      this.isDown = !this.isDown
    },
    setProgram() {
      const route = this.getPrevRouter || '/'
      switch (route) {
        case '/program':
          this.$router.push('/program')
          break
        case '/':
          this.$router.push('/')
          break

        default:
          this.$router.push('/')
          break
      }
    },

    getActiveProgBit() {
      const type = this.getPanelType
      let progShow
      switch (type) {
        case 'wash':
          progShow = (this.getWetProgShow >>> 0).toString(2)
          break
        case 'vacuum':
          progShow = (this.getDryProgShow >>> 0).toString(2)
          break
        default:
          console.warn('no progShow')
          break
      }
      return progShow
    },

    getActiveProgInt(bin) {
      return parseInt(bin, 2).toString(10)
    },

    setActiveProg() {
      this.activeProg = [...this.getActiveProgBit()].reverse().join('')
      // console.log('$$ Cost.vue: 106', this.getWetProgPrice)

      if (this.getWetProgPrice !== undefined) {
        this.progPrice = this.getWetProgPrice.toString().split(',')
      }

      for (let i = 0; i <= this.activeProg.length - 1; i++) {
        if (typeof this.costs[i].display !== undefined) {
          this.costs[i].display = this.activeProg.toString().slice(i, i + 1)
        }

        if (typeof this.progPrice !== undefined) {
          /* dev */
          const priceIndex = this.costs[i].id - 1
          this.costs[i].price = this.progPrice[priceIndex]?.toString()
        }
      }
      this.setTurboItems(this.costs)

      return this.costs
    },

    setDryActiveProg() {
      this.dryActiveProg = [...this.getActiveProgBit()].reverse().join('')

      if (this.getDryProgPrice !== undefined) {
        this.dryProgPrice = this.getDryProgPrice.toString().split(',')
      }

      this.dryActiveProg = this.dryActiveProg.slice(1)

      for (let i = 0; i < this.dryActiveProg.length; i++) {
        if (typeof this.costs[i].display !== undefined) {
          this.costs[i].display = this.dryActiveProg?.toString().slice(i, i + 1)
        }
        if (typeof this.dryProgPrice !== undefined)
          this.costs[i].price = this.dryProgPrice[i + 1]?.toString()
      }

      return this.costs
    },

    selectActiveProg(name) {
      return this.getActiveProgNames.find((p) => p === name)
    },

    gotoMainMenu(seconds) {
      this.intervalMainMenu = setInterval(() => {
        if (
          --seconds < 0 &&
          this.getWetBusyPanel === 'false' &&
          this.$route.name !== 'home'
        ) {
          this.$router.push('/')
        }
      }, 1000)
    },
    setTurboItems(costs) {
      let prices = costs.filter(
        (c) =>
          c.name === 'waterShampoo_turbo' ||
          c.name === 'warmWater_turbo' ||
          c.name === 'waxProtection_turbo' ||
          c.name === 'coldWater_turbo' ||
          c.name === 'dryShine_turbo'
      )
      for (let i = 0; i < prices.length; i++) {
        this.setTurboItem(prices[i])
      }
    },

    setTurboItem(price) {
      const name = price.name.slice(0, -6)
      const index = this.costs.findIndex((c) => c.name === name)
      this.costs[index].priceTurbo = price.price
    },
    ...mapGetters({
      // getCosts: 'getCosts',
      getDryCosts: 'getDryCosts',
      getPrograms: 'getPrograms',
    }),
  },
  mounted() {
    this.setRouter('/cost')

    const type = this.getPanelType
    switch (type) {
      case 'wash':
        this.actives = [...this.getPrograms()]
        this.costs = this.actives
        // console.log('$$ Cost.vue: 196', JSON.stringify(this.actives))
        this.setActiveProg()
        this.costs = this.costs.sort((a, b) =>
          a.order > b.order ? 1 : b.order > a.order ? -1 : 0
        )
        break

      case 'vacuum':
        this.costs = this.getDryCosts()
        this.setDryActiveProg()
        break
      default:
        this.costs = []
        console.warn('not getPanelType')
        break
    }

    const displayCosts = this.costs
      .filter((cost) => cost.display === '1')
      .filter((cost) => cost.mode !== 'hide')

    /* common     */
    this.setupPagination(displayCosts)
    this.gotoMainMenu(this.getSecondsGotoMainMenu)
  },
  beforeDestroy() {
    clearInterval(this.intervalMainMenu)
    // this.costs = this.getPrograms()
  },

  components: {
    CostList,
  },
})
</script>

<style scoped>
.back {
  position: fixed;
  top: 10em;
  left: 2em;
  z-index: 99;
}

.list {
  position: fixed;
  top: 21em;
  left: 4em;
  /* margin-bottom: 10em; */
  /* margin-left: 4em; */
  width: 100%;

  color: white;
}
.col {
  width: 100%;
}
.page-title {
  padding-top: 0em;
  color: white;
  margin-left: -3rem;
  margin-right: auto;
  width: 11.5em;
  font-size: 4em;

  font-family: 'Plumb-Medium';
  font-weight: bold;
}
h4 {
  color: white;
}

.paginate {
  font-size: 1em;
  width: 100%;

  position: absolute; /*  absolute; relative;*/
  left: 17em;
  bottom: 10em;

  background: #121212;

  font-family: 'Plumb-Medium';
  font-weight: bold;
}

.small-button {
  width: 125px;
  height: 120px;
  border: solid 6px #00b9e3;
  border-radius: 2.5em;
  box-shadow: 0px 6px 10px #00b9e3;
}
.small-button-square {
  width: 8.5em;
  height: 8.5em;
  border: solid 4px #00b9e3;
  border-radius: 1em;
  box-shadow: 'rgb(64, 196, 255) 0px 10px 20px',
}
.small-button-title {
  padding-top: 1em;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
