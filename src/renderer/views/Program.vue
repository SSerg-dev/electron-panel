<template>
  <div>
    
    <section>
      <!-- dev -->
      
      <div v-if="this.getPanelType === 'wash'">
        <ProgramTable :actives="actives" :delay="delay" />
      </div> 

      <!-- <div v-if="this.getPanelType === 'wash'">
        <WashTable :actives="actives" :delay="delay" />
      </div> -->

      <div v-if="this.getPanelType === 'vacuum'">
        <VacuumTable :actives="activesVacuum" />
      </div>

    </section>



  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import ProgramTable from '@/components/ProgramTable'
import WashTable from '@/components/wash/WashTable'
import VacuumTable from '@/components/vacuum/VacuumTable'

export default Vue.extend({
  name: 'program',
  data() {
    return {
      actives: [],
      /* dev */
      activesVacuum: [],

      delay: 1000,

      activeProg: [],
      showProg: [],
      interval: null
      //status: ''
    }
  },

  computed: {
    ...mapGetters({
      getWetProgStatus: 'getWetProgStatus',
      getWetProgShow: 'getWetProgShow',
      getParamsChange: 'getParamsChange',
      getPanelType: 'getPanelType'
    })
  },
  /* dev */
  watch: {
    getParamsChange(flag) {
      // console.log('++watch flag-->', flag)
      this.setActiveProg()
    }
  },
  methods: {
    ...mapMutations({
      setActiveProgNames: 'setActiveProgNames',
      setRouter: 'setRouter'
    }),

    getActiveProgBit() {
      return (this.getWetProgStatus >>> 0).toString(2)
    },
    getShowProgBit() {
      return (this.getWetProgShow >>> 0).toString(2)
    },
    setActiveProg() {
      let activeProgNames = []
      this.activeProg = [...this.getActiveProgBit()]
        .reverse()
        .join('')
        .slice(1)

      this.showProg = [...this.getShowProgBit()]
        .reverse()
        .join('')
        .slice(1) 

      //console.log('this.getWetProgStatus-->', this.getWetProgStatus)
      //console.log('--this.activeProg-->', this.activeProg)
      //console.log('++this.activeProg.length---->', this.activeProg.length)
      //console.log('--------------------------')
      //console.log('this.getWetProgShow-->', this.getWetProgShow)
      //console.log('--this.showProg-->', this.showProg)
      //console.log('++this.showProg.length---->', this.showProg.length)
      //console.log('==========================')
      /*     */

      for (let i = 0; i <= this.activeProg.length; i++) {
        if (this.activeProg.toString().slice(i, i + 1) === '0') {
          this.actives[i].display = 'none'
        } else {
          this.actives[i].display = 'block'
          activeProgNames.push(this.actives[i].name)
        }
      }
      this.setActiveProgNames(activeProgNames)

      // crutch :(

      // turboDryer
     if ((this.showProg.length !== 25))
        this.actives[26].display = 'block'
        else this.actives[26].display = 'none'

      // washer
      let displayBit
      this.showProg.length === 25 
        ? displayBit = this.showProg.slice(-8, -7)
        : displayBit = this.showProg.slice(-9, -8)

      displayBit === '1'
        ? this.actives[18].display = 'block'
        : this.actives[18].display = 'none'

      if(this.showProg.length === 0)
        this.actives[18].display = 'block'   
  
      // end crutch :(


      return this.actives
    },
    ...mapGetters({
      getPrograms: 'getPrograms',
      getProgramsVacuum: 'getProgramsVacuum'
    })
  },

  created() {
    this.actives = this.getPrograms()
    /* dev */
    this.activesVacuum = this.getProgramsVacuum() 
  },
  mounted() {
    
    this.setRouter('/program')
    /* dev */
    this.setActiveProg()
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },

  components: {
    ProgramTable,
    VacuumTable,
    WashTable
  }
})
</script>

<style scoped>
section {
  background-color: #121212;
  margin-top: 2.6em;
  margin-left: 1.5em;
}
.page-title {
  color: #ffffff;
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
