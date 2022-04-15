<template>
  <div>
    <!--  margin-bottom: 8px;  -->
    <div class="col s6">
      <div
        class="card grey lighten-3"
        style="height: 220px; border: solid 3px #00B9E3; border-radius: 2rem;"
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
                  class="btn waves-effect waves-light black-text button-setting"
                  type="submit"
                  @click="setService('ten')"
                >
                  <div >
                    {{ `+ ${getIncrement}` }}
                  </div>

                  <i class="material-icons right"></i>
                </button>
              </td>
              <td>
                <button
                  class="btn waves-effect waves-light  black-text button-setting"
                  type="submit"
                  @click="setService('balance')"
                >
                  {{ `Сбросить` }}
                  <i class="material-icons right"></i>
                </button>
              </td>
            </tr>

            <tr>
              <td>
                <button
                  class="btn waves-effect waves-light black-text button-setting"
                  type="submit"
                  @click="setService('door')"
                >
                  {{ `Открыть дверь` }}
                  <i class="material-icons right"></i>
                </button>
              </td>

              <td>
                <button
                  class="btn waves-effect waves-light black-text button-setting"
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
      getServiceBalance: 'getServiceBalance',
      getIncrement: 'getIncrement'
    })
  },
  methods: {
    ...mapActions({
      updateOpenDoor: 'updateOpenDoor',
      updatePlusTen: 'updatePlusTen',
      updateClearBalance: 'updateClearBalance',
      updateReboot: 'updateReboot'
    }),

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
    }
  }
})
</script>

<style scoped>
table {
  /* border-spacing: 2px; */
  border: none;
}
tr {
  margin-left: 0em;
}
td {
  width: 236px;
  border: none;
  align-content: justify;
  /* justify; */
  padding-bottom: 10px;
  padding-left: 6px;
}
button {
  width: 220px;
}
/* .button-setting {
  height: 2em;
  border: solid 1px white;
  font-size: 1.5em;
  border-radius: 2em;
  background-color: #00b9e3;
} */
.button-setting {
  height: 2em;
  border: solid 2px #00b9e3;
  font-weight: 500;
  font-size: 1.5em;

  border-radius: 2em;
  background-color: #e0e0e0;
}
</style>
