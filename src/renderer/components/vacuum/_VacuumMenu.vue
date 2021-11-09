<template>
  <div>
    
    <section>
      
      <div>
        <div class="first-vacuum">
          <VacuumTable :actives="actives" :number="first" />
        </div>

        <div class="second-vacuum">
          >
          <VacuumTable :actives="actives" :number="second" />
        </div>
      </div>
 
      

    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import VacuumTable from '@/components/vacuum/VacuumTable'

export default Vue.extend({
  name: 'vacuum',
  data() {
    return {
      actives: [],
      first: 'first',
      second: 'second',
      activeProg: [],
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
      getProgramsVacuum: 'getProgramsVacuum'
    })
  },
  created() {
    // 01
    this.actives = this.getProgramsVacuum()
  },
  mounted() {
    // 02
    console.log('++VacuumMenu')
  
  },
  
  components: {
    VacuumTable
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
.first-vacuum {
  margin-top: 0em;
  margin-left: 1.5em;
}
.second-vacuum { 
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
