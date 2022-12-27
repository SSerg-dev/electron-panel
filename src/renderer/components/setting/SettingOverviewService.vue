<template>
  <div>
    <!--  margin-bottom: 8px;  -->
    <div>
      <div
        class="card grey lighten-3"
        style="height: 220px; width: 48%; border: solid 3px #00b9e3; border-radius: 2rem"
      >
        <div class="card-content black-text">
          <!-- <span class="card-title">Сервисы: </span> -->
          <span class="card-title">{{ `Services` | localize }} {{`:`}} </span>
          
          <p style="font-size: 24px">
            <!-- {{ `Сервисный баланс: ${getServiceBalance}` }} -->
            {{ `Service_balance` | localize }} {{`: ${getServiceBalance}`}} 
          </p>

          <table>
            <tr>
              <td>
                <!-- v-if="getUsersRole.toLowerCase() === 'admin'" -->
                <button
                  v-if="JSON.parse(getUsersIsAccess.panelPlusTen)"
                  class="btn waves-effect waves-light black-text button-setting"
                  
                  type="submit"
                  @click="setService('ten')"
                >
                  <div>
                    {{ `+ ${getIncrement}` }}
                  </div>

                  <i class="material-icons right"></i>
                </button>
              </td>
              <td>
                <button
                  class="btn waves-effect waves-light black-text button-setting"
                  :class="[
                  {'button-setting': JSON.parse(getUsersIsAccess.panelPlusTen)},
                  {'button-setting-large': !JSON.parse(getUsersIsAccess.panelPlusTen)}
                  ]"
                  type="submit"
                  @click="setService('balance')"
                >
                  {{ `Reset` | localize }}
                  <i class="material-icons right"></i>
                </button>
              </td>
            </tr>

            <tr>
              <td>
                <button
                  v-if="JSON.parse(getUsersIsAccess.panelOpen)"
                  class="btn waves-effect waves-light black-text button-setting"
                  type="submit"
                  @click="setService('door')"
                >
                  {{ `Open_the_door` | localize }}
                  <i class="material-icons right"></i>
                </button>
              </td>

              <td>
                <button
                  class="btn waves-effect waves-light black-text button-setting"
                  type="submit"
                  @click="setService('reboot')"
                >
                  {{ `Reboot` | localize }}
                  <i class="material-icons right"></i>
                </button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!--  -->
</template>

<script>
import Vue from 'vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default Vue.extend({
  name: 'setting-overview-service',
  data: () => ({}),
  mounted() {
    this.setService('balance')
    // console.log('$$ getUsersRole', this.getUsersRole)
  },
  computed: {
    ...mapGetters({
      getWetBalance: 'getWetBalance',
      getServiceBalance: 'getServiceBalance',
      getIncrement: 'getIncrement',
      getUsersRole: 'getUsersRole',
      getUsersName: 'getUsersName',
      getUsersIsAccess: 'getUsersIsAccess',
    }),
  },
  
  methods: {
    ...mapActions({
      updateOpenDoor: 'updateOpenDoor',
      updatePlusTen: 'updatePlusTen',
      updateClearBalance: 'updateClearBalance',
      updateReboot: 'updateReboot',
    }),
    ...mapGetters({}),

    ...mapMutations({}),

    setService(service) {
      switch (service) {
        case 'door':
          this.updateOpenDoor()
          break
        case 'ten':
          this.updatePlusTen(this.getWetBalance)
          break
        case 'balance':
          this.updateClearBalance()
          break
        case 'reboot':
          this.updateReboot()
          break
        default:
          break
      }
    },
  },
})
</script>

<style scoped>
table {
  border: none;
}
tr {
  margin-left: 0em;
}
td {
  width: 232px;
  border: none;
  padding-bottom: 10px;
  padding-left: 6px;
}
.button-setting {
  width: 220px;
  height: 2em;
  border: solid 2px #00b9e3;
  font-weight: 500;
  font-size: 1.5em;

  border-radius: 2em;
  background-color: #e0e0e0;
}
.button-setting-large {
  width: 220px; /* 450px */
  height: 2em;
  border: solid 2px #00b9e3;
  font-weight: 500;
  font-size: 1.5em;
  

  border-radius: 2em;
  background-color: #e0e0e0;
}

</style>
