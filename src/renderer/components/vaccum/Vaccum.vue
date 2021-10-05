<template>
  <div>
    <section>
      <ul class="collection">
        <!-- 1 first -->
        <li class="collection-item cost" @click="payUp('first')">  
          <div
            class="card white waves-effect"
            style="
                  width: 945px;
                  height: 160px; 
                  border: solid 6px #00B9E3; 
                  border-radius: 4em;
                  box-shadow: 0px 10px 20px #00b9e3;
                  "
          >
            <div
              class="card-content black-text"
              style="
                  font-size: 4em;
                  padding-top: 1.1em;

                  display: flex;
	                align-items: center;
	                justify-content: center;
                  "
            >
              {{ `ОПЛАТИТЬ ПОСТ №1` }}
            </div>
          </div>
        </li>

        <!-- 2 operator -->
        <li class="collection-item cost" @click="payUp('operator')">
          <div
            class="card black waves-effect"
            style="
                  width: 945px;
                  height: 160px; 
                  border: solid 6px #00B9E3; 
                  border-radius: 4em;
                  box-shadow: 0px 10px 20px #00b9e3;
                  "
          >
            <div
              class="card-content white-text"
              style="
                  font-size: 4em;
                  padding-top: 1.1em;

                  display: flex;
	                align-items: center;
	                justify-content: center;
                  "
            >
              {{ `КОНСУЛЬТАНТ` }}
            </div>
          </div>
        </li>

        <!-- 3 second -->
        <li class="collection-item cost" @click="payUp('second')">
          <div
            class="card white waves-effect"
            style="
                  width: 945px;
                  height: 160px; 
                  border: solid 6px #00B9E3; 
                  border-radius: 4em;
                  box-shadow: 0px 10px 20px #00b9e3;
                  "
          >
            <div
              class="card-content black-text"
              style="
                  font-size: 4em;
                  padding-top: 1.1em;

                  display: flex;
	                align-items: center;
	                justify-content: center;
                  "
            >
              {{ `ОПЛАТИТЬ ПОСТ №2` }}
            </div>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'

import { ipcRenderer } from 'electron'

export default Vue.extend({
  
  
  methods: {
    /* dev */
      ...mapMutations ({
      setPanelType: 'setPanelType'
    }),
  
    /*     */

    payUp(program) {
      switch (program) {
        case 'first':
          console.log('first')
          this.setPanelType('wash')

          // this.$router.push('/bonus')
          break
        case 'operator':
          console.log('operator')
          break
        case 'second':
          console.log('second')
          break

        default:
          break
      }
    }
  }
})
</script>

<style scoped>
.collection {
  margin-left: auto;
  margin-right: auto;
  margin-top: 0rem;
  border-color: #121212;
  padding-top: 8rem;
}
.collection-item {
  margin-bottom: 16em;
  background-color: #121212;
  border-color: #121212;
}
section {
  margin-top: 18em;
  margin-left: 3em;
}
</style>
