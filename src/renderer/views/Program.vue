<template>
  <div class="post">
    <div>
      <div v-if="this.getPanelType === 'wash'">
        <WashTable :actives="actives" :delay="delay" />
      </div>

      <div v-if="this.getPanelType === 'vacuum'">
        <VacuumTable :actives="activesVacuum" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import WashTable from '@/components/wash/WashTable'
import VacuumTable from '@/components/vacuum/VacuumTable'
import { forEach } from 'lodash'

export default Vue.extend({
  name: 'program',
  data() {
    return {
      actives: [],
      activesVacuum: [],
      delay: 500,
      seconds: 0,
      activeProg: [],
      showProg: [],
      interval: null,
    }
  },
  computed: {
    ...mapGetters({
      getWetProgStatus: 'getWetProgStatus',
      getWetProgShow: 'getWetProgShow',

      getDryProgStatus: 'getDryProgStatus',
      getDryProgShow: 'getDryProgShow',

      getParamsChange: 'getParamsChange',
      getPanelType: 'getPanelType',
      getWetBalance: 'getWetBalance',
      getDryBalance: 'getDryBalance',
    }),
  },
  watch: {
    getParamsChange(flag) {

      const type = this.getPanelType
      switch (type) {
        case 'wash':
          this.setActiveProg()
          break
        case 'vacuum':
          this.setDryActiveProg()
          break
        default:
          break
      }
    },
    getWetBalance(flag) {
      if (+flag === 0) {
        this.$router.push('/')
      }
    },
  },
  methods: {
    ...mapMutations({
      setActiveProgNames: 'setActiveProgNames',
      setRouter: 'setRouter',
    }),

    getActiveProgBit() {
      return (this.getWetProgStatus >>> 0).toString(2)
    },
    getShowProgBit() {
      return (this.getWetProgShow >>> 0).toString(2)
    },
    setActiveProg() {
      
      /* dev */
      let activeProgNames = []
      this.showProg = [...this.getShowProgBit()].reverse().join('')
      /* dev */
      if (this.showProg.length === 26) {
        this.showProg = this.showProg + '0'
      }
      // console.log('$$ this.showProg', this.showProg.length, this.showProg)
      

      for (let i = 0; i < this.showProg.length; i++) {
        if (this.showProg.toString().slice(i, i + 1) === '0') {
          this.actives[i].display = 'none'
        } else {
          this.actives[i].display = 'block'
          activeProgNames.push(this.actives[i].name)
        }
        // console.log(i, '  ', this.actives[i].name, ' -->', this.actives[i].display)
      } 

      // crutch for :( degrease program
      // if (this.showProg.length === 27) {
      //   const index = this.showProg.length
      //   this.actives[index].display = 'none'
      //   activeProgNames.push(this.actives[index].name)

      // }
      // end crutch :(
      this.setActiveProgNames(activeProgNames)

      return this.actives
    },

    /* Dry section */

    getDryActiveProgBit() {
      return (this.getDryProgStatus >>> 0).toString(2)
    },
    getDryShowProgBit() {
      return (this.getDryProgShow >>> 0).toString(2)
    },
    setDryActiveProg() {
      let activeProgNames = []
      const progsNumber = 6

      this.activesVacuum.forEach((element) => (element.display = 'block'))

      this.activeProg = [...this.getDryActiveProgBit()]
        .reverse()
        .join('')
        .slice(1)
      this.showProg = [...this.getDryShowProgBit()].reverse().join('').slice(1)

      // add to and zero symbols
      const deltaIndex = this.activesVacuum.length - this.showProg.length
      for (let index = 0; index < deltaIndex; index++)
        this.showProg = this.showProg + '0'
      // console.log('$$ after this.showProg', this.showProg)

      for (let i = 0; i < this.showProg.length; i++) {
        if (this.showProg.toString().slice(i, i + 1) === '0') {
          this.activesVacuum[i].display = 'none'
        } else if (this.showProg.toString().slice(i, i + 1) === '1') {
          this.activesVacuum[i].display = 'block'
          activeProgNames.push(this.activesVacuum[i].name)
        }
        // console.log(
        //   '$$ this.activesVacuum[i].display',
        //   i,
        //   this.activesVacuum[i].name,
        //   this.activesVacuum[i].display,
        //   this.showProg.length
        // )
      }
      if (this.showProg.length === 0) {
        this.activesVacuum.forEach((element) => (element.display = 'none'))
      }

      return this.activesVacuum
    },
    /* end Dry section */

    ...mapGetters({
      getPrograms: 'getPrograms',
      getProgramsVacuum: 'getProgramsVacuum',
    }),

    /* init(seconds) {
      this.seconds = seconds 
      this.intervalMainMenu = setInterval(() => {
        if (--this.seconds === 0 ) {
          console.log('this.seconds', this.seconds)
          
          return
        }
      }, 1000)
      console.log('seconds', seconds)
    } */
  }, // end methods

  created() {
    this.actives = this.getPrograms()
    this.activesVacuum = this.getProgramsVacuum()
  },
  mounted() {
    this.setRouter('/program')
    /* dev */
    const type = this.getPanelType
    switch (type) {
      case 'wash':
        this.setActiveProg()
        break
      case 'vacuum':
        this.setDryActiveProg()
        break
      default:
        break
    }
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },

  components: {
    VacuumTable,
    WashTable,
  },
})
</script>

<style scoped>
.post {
  position: relative;
  background-color: #121212;
  margin-top: 2.6em;
  margin-left: 1.5em;

}

.page-title {
  color: #fff;
  font-family: 'PlumbSoft-Black';
  font-size: 140px;
  font-weight: 400;
  line-height: 70px;
  text-align: center;
  /* text-decoration: underline; */
}
h5 {
  color: white;
}
</style>
