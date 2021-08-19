<template>
  <div>
    <!--  -->
    <div class="col s6">
      <!--  -->
      <div class="card grey lighten-3" style="height: 160px; border: solid 3px #00B9E3; border-radius: 2rem;">
        <div class="card-content black-text">
          <span class="card-title">Минимальная сумма безналичными:</span>

          <tbody>
            <tr>
              <td>
                <!-- style="border: solid 3px #00B9E3; font-size: 24px;" -->
                <button
                  class="btn waves-effect waves-light lighten-3 white-text button-setting"
                  type="submit"
                  @click="setNumber('-10')"
                >
                  {{ "-10" }}
                  <i class="material-icons right"></i>
                </button>
              </td>

              <td>
                <div style="margin-left: 10px" class="display">{{ display + `  руб.` }}</div>
              </td>

              <td>
                <button
                  class="btn waves-effect waves-light lighten-3 white-text button-setting"
                  type="submit"
                  @click="setNumber('+10')"
                >
                  {{ "+10" }}
                  <i class="material-icons right"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </div>
      </div>
    </div>
  </div>

  <!--  -->
</template>

<script>
import Vue from "vue";
import { mapMutations } from "vuex";

export default {
  data: () => ({
    amount: 0,
    amountString: "",
    display: 0,
    length: 0,
    title: "",
    body: "",
  }),

  methods: {
    ...mapMutations({}),

    setNumber(num) {
      if (num >= 10 || num == -10) {
        if (this.amount + parseInt(num) < 1000) this.amount += parseInt(num);
      }

      if (this.amount < 0) this.amount = 0;
      this.amountString = this.amount.toString();
      this.display = this.amountString;
    },
  },
};
</script>

<style scoped>
.display {
  /* style="font-size: 1.2em;" */
  font-size: 24px;
}
.btn {
  font-size: 15px;
  border: solid 1px black;
  background-color: #26A69A;
}
td {
  width: 128px;
  /* border: solid 1px black; */
}
.button-setting {
  border: solid 3px #00B9E3; 
  font-size: 24px;
  border-radius: 2rem;
}
</style>
