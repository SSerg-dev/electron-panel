<template>
  <div class="locate">
    <section>
      <div class="row">

        <!-- <div>
          <PopupType :actives="actives" />
        </div> -->

        <!-- <div v-if="!getIsMoneyToBonus"> -->
        <div>  
          <PopupBonus :actives="actives" />
        </div>

      </div>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import PopupType from '@/components/PopupType'
import PopupBonus from '@/components/PopupBonus'

export default Vue.extend({
  data: () => ({
    actives: [],
    activeProg: []
  }),
  /* dev */
  watch: {
    getParamsChange(flag) {
      this.setActiveProg()
    }
  },
  computed: {
    ...mapGetters({
      getWetProgStatus: 'getWetProgStatus',
      getWetProgShow: 'getWetProgShow',
      getParamsChange: 'getParamsChange',
      getIsMoneyToBonus: 'getIsMoneyToBonus'
    })
  },
  methods: {
    ...mapGetters({
      getPrograms: 'getPrograms',
      getProgramsVacuum: 'getProgramsVacuum'
    }),

    ...mapMutations({
      setRouter: 'setRouter'
    }),

    getActiveProgBit() {
      return (this.getWetProgStatus >>> 0).toString(2)
    },
    setActiveProg() {
      let activeProgNames = []
      this.activeProg = [...this.getActiveProgBit()]
        .reverse()
        .join('')
        .slice(1)

      for (let i = 0; i <= this.activeProg.length; i++) {
        if (
          this.activeProg.toString().slice(i, i + 1) === '0' ||
          this.activeProg.toString().slice(i, i + 1) === 'none'
        ) {
          this.actives[i].display = 'none'
        } else {
          this.actives[i].display = 'block'
          activeProgNames.push(this.actives[i].name)
        }
      }

      return this.actives
    }
  },
  created() {
    this.actives = this.getPrograms()
  },
  mounted() {
    console.log('++Popup')
    
    this.setRouter('/popup')
  },
  components: {
    PopupType,
    PopupBonus
  }
})
</script>

<style scoped>
.row {
  padding-top: 18em;
  padding-left: 4em;
}
.page-title {
  padding-top: 4em;
  color: white;
  margin-left: auto;
  margin-right: auto;
  width: 50em;
  align-items: center;
}
.price-bonus {
  position: absolute;
  margin-top: -0.6em;
  margin-left: 50em;
}
</style>
