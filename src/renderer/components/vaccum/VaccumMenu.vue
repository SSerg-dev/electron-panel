<template>
  <div>
    
      <!-- <div v-if="this.getPanelType === 'vaccum'">
        <span class="white-text">{{ getVaccumNumber }}</span>
      </div> -->
    
    <section>
      
      <div>
        <div class="first-vaccum">
          <VaccumTable :actives="actives" :number="first" />
        </div>

        <div class="second-vaccum">
          >
          <VaccumTable :actives="actives" :number="second" />
        </div>
      </div>
 
      <!-- <div class="price">
          <img src="imgs/price/price-up.png" />
        </div> -->
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import VaccumTable from '@/components/vaccum/VaccumTable'

export default Vue.extend({
  name: 'vaccum',
  data() {
    return {
      actives: [],
      first: 'first',
      second: 'second',
      activeProg: [],
      interval: null
    }
  },

  computed: {
    ...mapGetters({
      //getWetProgStatus: 'getWetProgStatus'
    })
  },

  methods: {
    /* getActiveProgBit() {
      return (this.getWetProgStatus >>> 0).toString(2)
    }, */
    /* setActiveProg() {
      this.activeProg = [...this.getActiveProgBit()]
        .reverse()
        .join('')
        .slice(1)
      for (let i = 0; i <= this.activeProg.length; i++) {
        this.activeProg.toString().slice(i, i + 1) === '0'
          ? (this.actives[i].display = 'none')
          : (this.actives[i].display = 'block')
      }
      this.actives[18].display = 'block'

      return this.actives
    }, */
    ...mapGetters({
      getProgramsVaccum: 'getProgramsVaccum'
    })
  },
  created() {
    // 01
    this.actives = this.getProgramsVaccum()
  },
  mounted() {
    // 02
    //? this.setActiveProg()
    //this.interval = setInterval(() => this.setActiveProg(), 2000)
    // 03
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },

  components: {
    VaccumTable
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
.first-vaccum {
  margin-top: 0em;
  margin-left: 1.5em;
}
.second-vaccum { 
  margin-top: 0em;
  margin-left: 1.5em;
  padding-top: 44em;
}
/* .price {
  position: absolute;
  margin-top: -40em;
  margin-left: 62em;
  z-index: 1000;
} */
</style>
