<template>
  <div>
    <a name="top"></a>
    <div class="row head-content">
      <div class="col s2">
        <router-link to="/">
          <div class="back">
            <img src="imgs/key/back.png" />
          </div>
        </router-link>
      </div>
      <div class="col s7">
        <div class="page-title">
          <!-- СТОИМОСТЬ ПРОГРАММ -->
          <!-- <h4>{{getWetProgShow}}</h4> -->
          <!-- <h4>{{ getWetProgStatus }}</h4> -->
          <!-- <h4 align="left">{{ getWetProgPrice }}</h4> -->

          <!-- <h4>{{ getWetBusyPanel }}</h4> -->
          <!-- <h4 align="left">{{ getParamsChange }}</h4> -->
          <!-- <h4 align="left">{{ this.$store.state.isParamsChange }}</h4> -->

          <!-- <h4 align="left"><pre class="white-text"> {{status}} </pre></h4> -->
        </div>
      </div>
    </div>

    <section id="content">
      <div class="row">
        <!-- <div class="col"><CostList :costs="costs" /></div> -->
        <div class="col"><CostList :costs="items" /></div>
      </div>
      <a name="bottom"></a>
    </section>

    <div class="paginate">
      <!-- <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        :container-class="'pagination'"
      /> -->
      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="''"
        :next-text="''"
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

    progPrice: [],
    activeProg: [],
    busyProg: [],
    /* dev */
    dryProgPrice: [],
    dryActiveProg: [],
    dryBusyProg: [],

    //interval: null,
    intervalMainMenu: null,
    date: null

    //order = [0, 9, 10, 8, 5, 1, 7, 2, 3, 4, 11, 12, 13, 6,14,15,16,17,18,19,20,21]
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
      /* dev */
      getPanelType: 'getPanelType'
    })
  },
  watch: {
    getParamsChange(flag) {
      //console.log(' watch flag-->', flag)
      
      /* dev */
      /* const type = this.getPanelType
      switch (type) {
        case 'wash':
          this.costs = this.getCosts()
          this.setActiveProg()
          break
        case 'vaccum':
          this.costs = this.getDryCosts()
          this.setDryActiveProg()
          break
        default:
          this.costs = []
          console.warn('not getPanelType')
          break
      } */

    }
  },
  methods: {
    ...mapMutations({
      setRouter: 'setRouter'
    }),
    setDown() {
      this.isDown = !this.isDown
    },

    getActiveProgBit() {
      //return (this.getWetProgShow >>> 0).toString(2)

      const type = this.getPanelType
      let progShow
      switch (type) {
        case 'wash':
          progShow = (this.getWetProgShow >>> 0).toString(2)
          break
        case 'vaccum':
          progShow = (this.getDryProgShow >>> 0).toString(2)
          break
        default:
          console.warn('no progShow')
          break
      }
      //console.log('++progShow-->', progShow)
      return progShow

    },

    getActiveProgInt(bin) {
      return parseInt(bin, 2).toString(10)
    },

    setActiveProg() {
      console.log('---setActiveProg')

      this.activeProg = [...this.getActiveProgBit()].reverse().join('')
      if (this.getWetProgPrice !== undefined) {
        this.progPrice = this.getWetProgPrice.toString().split(',')
      }
      for (let i = 0; i <= this.activeProg.length; i++) {
        if (typeof this.costs[i].display !== undefined) {
          //console.log('++this.selectActiveProg(this.costs[i].name)-->', i, this.selectActiveProg(this.costs[i].name))
          /* dev  ??? */
          //if (!this.selectActiveProg(this.costs[i].name))
          this.costs[i].display = this.activeProg.toString().slice(i, i + 1)
          //else this.costs[i].display = 0
        }
        if (typeof this.progPrice !== undefined)
          this.costs[i].price = this.progPrice[i + 1]?.toString()
      }

      this.setTurboItems(this.costs)

      return this.costs
    },
    /* dev */
    setDryActiveProg() {
      this.dryActiveProg = [...this.getActiveProgBit()].reverse().join('')
      //console.log('this.dryActiveProg-->', this.dryActiveProg)
      if (this.getDryProgPrice !== undefined) {
        this.dryProgPrice = this.getDryProgPrice.toString().split(',')
        //console.log('this.dryProgPrice-->', this.dryProgPrice)
      }
      
      for (let i = 0; i < this.dryActiveProg.length - 1; i++) {
      //for (let i = 1; i < this.dryActiveProg.length; i++) {  
        console.log('this.costs-->', JSON.stringify(this.costs[i].display))
        if (typeof this.costs[i].display !== undefined) {
          this.costs[i].display = this.dryActiveProg?.toString().slice(i, i + 1)
        }
        if (typeof this.dryProgPrice !== undefined)
          this.costs[i].price = this.dryProgPrice[i + 1]?.toString()
      }

      return this.costs
    },

    selectActiveProg(name) {
      return this.getActiveProgNames.find(p => p === name)
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
      //console.log('!!!setTurboItems')

      let prices = costs.filter(
        c =>
          c.name === 'waterShampoo_turbo' ||
          c.name === 'warmWater_turbo' ||
          c.name === 'waxProtection_turbo' ||
          c.name === 'coldWater_turbo' ||
          c.name === 'dryShine_turbo'
      )
      for (let i = 0; i < prices.length; i++) {
        this.setTurboItem(prices[i])
      }
      //console.log("this.costs-->", JSON.stringify(this.costs))
    },

    setTurboItem(price) {
      const name = price.name.slice(0, -6)
      const index = this.costs.findIndex(c => c.name === name)
      this.costs[index].priceTurbo = price.price
      //console.log("priceTurbo->", this.costs[index].priceTurbo);
    },
    ...mapGetters({
      getCosts: 'getCosts',
      getDryCosts: 'getDryCosts'
    })
  },
  mounted() {
    this.setRouter('/cost')

    const type = this.getPanelType
      switch (type) {
        case 'wash':
          this.costs = this.getCosts()
          this.setActiveProg()
          break
        case 'vaccum':
          this.costs = this.getDryCosts()
          this.setDryActiveProg()
          break
        default:
          this.costs = []
          console.warn('not getPanelType')
          break
      }

    const displayCosts = this.costs
      .filter(cost => cost.display === '1')
      .filter(cost => cost.mode !== 'hide')
  
   
    /* common     */
    this.setupPagination(displayCosts)
    this.gotoMainMenu(this.getSecondsGotoMainMenu)
  },
  beforeDestroy() {
    //clearInterval(this.interval)
    clearInterval(this.intervalMainMenu)
  },

  components: {
    CostList
  }
})
</script>

<style scoped>
.row {
  padding-top: 4rem;
  margin-bottom: 0rem;
  margin-left: 4em;
  width: 1080px;

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
.back {
  padding-top: 0rem;
  padding-left: 0rem;
}
#head {
  margin-top: 0em;
  margin-bottom: 0em;
  margin-left: -0.5em;

  padding-top: 0em;
  padding-bottom: 0em;
  /* padding-right: 10em; */

  position: fixed;
  /* position: relative; */
  color: #121212;
  z-index: 1000;
}
.head-content {
  padding-top: -1em;
  padding-bottom: 4em;
}

.paginate {
  font-size: 1em;
  width: 100%;
  /* height: 0px; */
  position: fixed;
  left: 20em;

  bottom: 16em;

  background: #121212;
  /* border: solid darkcyan; */

  font-family: 'Plumb-Medium';
  font-weight: bold;
}

#content {
  margin-top: -4em;
}
</style>
