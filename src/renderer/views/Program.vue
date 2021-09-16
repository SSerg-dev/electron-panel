<template>
  <div>
    <!--  -->
    <br /><br />

    <div class="row">
      <div class="col s2"></div>
      <div class="col s10">
        <!-- <h4>
          <pre class="white-text">{{ getWetProgStatus }}</pre>
        </h4> -->
      </div>
    </div>

    <section>
      <div class="row">
        <ProgramTable 
        :actives="actives" 
        :delay="delay"
        />
      </div>
      <!-- 
        <VaccumTable :actives="actives" :number="first" />
       -->
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import ProgramTable from '@/components/ProgramTable'

export default Vue.extend({
  name: 'program',
  data() {
    return {
      actives: [],
      delay: 1000,

      activeProg: [],
      /* dev */
      showProg: [],
      interval: null
      //status: ''
    }
  },

  computed: {
    ...mapGetters({
      getWetProgStatus: 'getWetProgStatus',
      getWetProgShow: 'getWetProgShow',
    })
  },
  /* dev */
  methods: {
    ...mapMutations({
      setActiveProgNames: 'setActiveProgNames',
      setRouter: 'setRouter'
    }),

    getActiveProgBit() {
      return (this.getWetProgStatus >>> 0).toString(2)
    },
    /* dev */
    getShowProgBit() {
      return (this.getWetProgShow >>> 0).toString(2)
    },

    setActiveProg() {
      let activeProgNames = []
      
      /* dev */
      this.activeProg = [...this.getActiveProgBit()]
        .reverse()
        .join('')
        .slice(1)

      this.showProg = [...this.getShowProgBit()]
        .reverse()
        .join('')
        .slice(1) 

      console.log('this.getWetProgStatus-->', this.getWetProgStatus)
      console.log('++this.activeProg-->', this.activeProg)
      console.log('--------------------------')
      console.log('this.getWetProgShow-->', this.getWetProgShow)
      console.log('++this.showProg---->',this.showProg)
      console.log('==========================')
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
      //console.log('setActiveProgNames-->')

      //  turboDryer
      /* this.getWetProgStatus === '133693438' 
        ? this.actives[26].display = 'none'
        : this.actives[26].display = 'block' */

      // washer
      /* this.getWetProgStatus === '133955583' 
        ? this.actives[18].display = 'none'
        : this.actives[18].display = 'block' */


      //this.actives[18].display = 'block'
      //this.actives[26].display = 'none'

      return this.actives
    },
    ...mapGetters({
      getPrograms: 'getPrograms'
    })
  },

  created() {
    this.actives = this.getPrograms()
    // console.log('Program-->',  JSON.stringify(this.actives) )
    /* dev */
    //this.updateCount++
    //this.updateCount-- 
  },
  mounted() {
    this.setRouter('/program')
    this.$store.state.params.length > 0
      ? //? this.setActiveProg()
        (this.interval = setInterval(() => this.setActiveProg(), 2000))
      : this.$error('$store.state.params no data $error')
     


  },
  beforeDestroy() {
    clearInterval(this.interval)
  },

  components: {
    ProgramTable
  }
})
</script>

<style scoped>
section {
  background-color: #121212;
  margin-top: -1rem;
  margin-left: 1.5rem;
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
.row {
  margin-top: -0.8rem;
  margin-left: 1.5rem;
}
</style>
