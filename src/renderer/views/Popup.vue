<template>
  <div class="locate">
    <section>
      <div class="row">
        
        <div v-if="!getIsMoneyToBonus ">
          <PopupType :actives="actives" />
        </div>

        <div v-if="getIsMoneyToBonus || getMoneyToBonus > 0">
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
      // this.setActiveProg()
    }
  },
  computed: {
    ...mapGetters({
      getWetProgStatus: 'getWetProgStatus',
      getWetProgShow: 'getWetProgShow',
      getParamsChange: 'getParamsChange',
      getIsMoneyToBonus: 'getIsMoneyToBonus',
      getMoneyToBonus: 'getMoneyToBonus'
    })
  },
  methods: {
    ...mapGetters({
      getPrograms: 'getPrograms',
      getProgramsVacuum: 'getProgramsVacuum'
    }),

    ...mapMutations({
      setRouter: 'setRouter',
      // setIsMoneyToBonus: 'setIsMoneyToBonus'
    }),

    getActiveProgBit() {
      return (this.getWetProgStatus >>> 0).toString(2)
    },

  },
  created() {
    this.actives = this.getPrograms()
  },
  mounted() {
    this.setRouter('/popup')
  },
  beforeDestroy() {
    // this.setIsMoneyToBonus(false)
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
