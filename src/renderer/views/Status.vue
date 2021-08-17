<template>
  <div>
    <div class="locate">
      <section>

        
        <div align="center" class="page-title">
            
            <div style="width: 800px; margin-top: 40px;" class="info-title">
              <p align="center">
                Статус выполнения операции:
              </p>
            </div>
          
        </div>

        <div align="center" class="status">
          <StatusBill />
          <!-- <SettingPanelType /> -->
        </div>
        
      </section>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import StatusBill from '@/components/StatusBill'
//import SettingPanelType from '@/components/setting/SettingPanelType'

export default Vue.extend({
  date: () => ({
    intervalMainMenu: null,
      
  }),
  computed: {
    ...mapGetters({
      //getWetBusyPanel: 'getWetBusyPanel',
      //getSecondsGotoMainMenu: 'getSecondsGotoMainMenu'
    })
  },
  methods: {
    ...mapMutations({
      setRouter: 'setRouter'
    })
    /* gotoMainMenu(seconds) {
      this.intervalMainMenu = setInterval(() => {
        if (
          --seconds < 0 &&
          this.getWetBusyPanel === 'false' &&
          this.$route.name !== 'home'
        ) {
          this.$router.push('/')
        }
      }, 1000)
    }, */

  },
  mounted() {

    this.setRouter('/status')

    //this.gotoMainMenu(this.getSecondsGotoMainMenu)
  },
  beforeDestroy() {
    clearInterval(this.intervalMainMenu)
  },

  components: {
    StatusBill,
    //SettingPanelType,
  }
})
</script>

<style scoped>
.info-title {
  width: 800px;
  padding-top: 0.5em; 
  margin-top: 0em; 
  margin-left: 0em; 
  font-size: 3em;
}
.locate {
  position: relative;
}

.page-title {
  position: absolute;
  margin-top: 20em;
  margin-left: 10em;

  top: 0%;
  left: 0%;
  color: white;
  text-align: right; 

  font-family: 'Plumb-Medium';
  font-weight: bold;
  z-index: 1;
}
.status {
  position: absolute;
  margin-top: 60em;
  margin-left: 3em;
}

.description {
  font-family: 'Plumb-Medium';
  font-size: 20px;
  font-weight: bold;
}
</style>

