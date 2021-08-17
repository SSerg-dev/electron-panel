<template>
  <div>
    <!--  margin-bottom: 8px;  -->
    <div class="col s6">
      <div
        class="card grey lighten-3"
        style="height: 200px; border: solid 3px #00B9E3; border-radius: 2rem;"
      >
        <div class="card-content black-text">
          <span class="card-title">Сервисы: </span>
          <!-- 1.5em -->
          <p style="font-size: 24px;">
            {{ `Сервисный баланс: ${getServiceBalance}` }}
          </p>

          <table>
            <tr>
              <td>
                <!-- style="border: solid 3px #00B9E3;" -->
                <button
                  class="btn waves-effect waves-light lighten-3 white-text button-setting"
                  type="submit"
                  @click="setService('ten')"
                >
                  {{ `+100` }}
                  <i class="material-icons right"></i>
                </button>
              </td>
              <td>
                <button
                  
                  class="btn waves-effect waves-light  white-text button-setting"
                  type="submit"
                  @click="setService('balance')"
                >
                  {{ `Сбросить баланс` }}
                  <i class="material-icons right"></i>
                </button>
              </td>
            </tr>

            <tr>
              <td>
                <button
                  class="btn waves-effect waves-light white-text button-setting"
                  type="submit"
                  @click="setService('door')"
                >
                  {{ `Открыть дверь` }}
                  <i class="material-icons right"></i>
                </button>
              </td>

              <td>
                <button
                  class="btn waves-effect waves-light white-text button-setting"
                  type="submit"
                  @click="setService('reboot')"
                >
                  {{ `Перегрузить` }}
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
  mounted() {},
  computed: {
    ...mapGetters({
      getWetBalance: 'getWetBalance',
      getServiceBalance: 'getServiceBalance'
    })
  },
  methods: {
    ...mapActions({
      updateOpenDoor: 'updateOpenDoor',
      updatePlusTen: 'updatePlusTen',
      updateClearBalance: 'updateClearBalance',
      updateReboot: 'updateReboot'
    }),

    ...mapMutations({
      //setServiceBalance: 'setServiceBalance'
    }),

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
    }
  }
})
</script>

<style scoped>
table {
  border-spacing: 2px;
}
td {
  width: 236px;
  border: solid 1px #eee;
  align-content: justify;
  /* justify; */
  padding-bottom: 10px;
}
button {
  width: 234px;
}
.button-setting {
  border: solid 3px #00b9e3;
  font-size: 24px;
  border-radius: 2rem;
}
.btn {
  background-color: #1E6F68; 
}
</style>
