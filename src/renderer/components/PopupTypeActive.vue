<template>
  <section>
    <div class="message" style="background: none;">
      <div><Message /></div>
    </div>

    <!-- <div class="message" style="background: yellow;">
      <span class="white-text">{{ this.getDefaultPanelNumber }}</span>
    </div> -->

    <form @submit.prevent="">
      <div class="form">
        <table style="margin-left: 1em;">
          <tbody>
            <!-- turbo -->
            <div>
              <!-- row 01 -->
              <tr class="info-title">
                <td colspan="2">
                  <p align="center">
                    {{ `${this.messages[0]}` }}
                    <!-- {{ this.getDefaultPanelNumber }} -->
                  </p>
                </td>
              </tr>

              <!-- row 02 -->
              <tr>
                <!-- standard -->
                <td>
                  <div
                    class="waves-effect button-standard-style"
                    :class="[
                      { 'card white': true },
                      { 'card light-blue accent-2': !true }
                    ]"
                  >
                    <div
                      class="button-content-standard-style"
                      :class="[
                        { 'card-content black-text': true },
                        { 'card-content white-text': !true }
                      ]"
                    >
                      {{ `${this.buttonTitle[0]}` }}
                    </div>
                  </div>
                </td>

                <!-- turbo -->
                <td>
                  <div
                    class="waves-effect button-turbo-style"
                    :class="[{ 'card white': true }, { 'card red': !true }]"
                  >
                    <div
                      class="button-content-turbo-style"
                      :class="[
                        { 'card-content black-text': true },
                        { 'card-content white-text': !true }
                      ]"
                    >
                      {{ `${this.buttonTitle[1]}` }}
                    </div>
                  </div>
                </td>
              </tr>

              <!-- row 03 -->
              <tr>
                <td colspan="2">
                  <div>
                    <img src="imgs/actives/blue-active.svg" />
                  </div>
                </td>
              </tr>
            </div>
            <!-- end turbo -->



          </tbody>
        </table>
      </div>
    </form>
  </section>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'

import Message from '@/components/app/Message'

export default {
  data: () => ({
    messages: [
      `Выберите давление:`,
      `Выберите цвет пены:`,
      `Выберите дозацию химии:`
    ],
    messageIndex: -1,

    buttonTitle: [
      `СТАНДАРТ`,
      `ТУРБО`,
      `БЕЛАЯ`,
      `ЦВЕТНАЯ`,
      `СТАНДАРТ`,
      `ДВОЙНАЯ`
    ],
    buttonTitleIndex: -1
  }),
  /* props: {
    active: {
      required: true,
      type: String
    }
  }, */
  computed: {
    ...mapGetters({
      getDefaultPanelNumber: 'getDefaultPanelNumber'
    })
  },
  components: {
    Message
  }
}
</script>

<style scoped>
.form {
  width: 67em;
  height: 88em;
  margin-left: 0em;
  margin-top: 11em;
  padding-left: 0em;
  padding-bottom: 0em;

  border: solid 3px #00b9e3;
  border-radius: 2em;
  box-shadow: 0px 0px 10px 10px #00b9e3;
}

.info-title {
  /* position: absolute; */

  /* width: 800px; */
  padding-top: 0em;
  padding-left: 0em;
  padding-right: 0em;
  padding-bottom: 0em;

  margin-top: 0em;
  margin-left: 0em;
  font-size: 4.75em;

  color: #fff;
  text-align: center;
  font-family: 'Plumb-Medium';
}
table,
th,
td {
  border: none;
  border-color: white;
  /*  */
}

.button-standard-style {
  display: flex;
  align-items: center;
  justify-content: center;

  padding-left: 0em;
  margin-left: 0em;
  padding-top: 0em;
  width: 445px;
  height: 360px;
  border: solid 6px #40c4ff;
  border-radius: 40px;
  box-shadow: 0px 6px 10px #40c4ff;
}
.button-content-standard-style {
  font-size: 4em;
  margin-left: 0em;
  padding-top: 0.5em;
  padding-right: 0.7em;
}

.button-turbo-style {
  display: flex;
  align-items: center;
  justify-content: center;

  padding-left: 0em;
  margin-left: 1em;
  padding-top: 0em;
  width: 445px;
  height: 360px;
  border: solid 6px #f44336;
  border-radius: 40px;
  box-shadow: 0px 6px 10px #f44336;
}
.button-content-turbo-style {
  font-size: 4em;
  margin-left: 0em;
  padding-top: 0.5em;
  padding-right: 0.7em;
}
.message {
  position: absolute;
  margin-top: -36em;
  margin-left: 15em;

  font-family: 'Plumb-Medium';
  font-weight: normal; /* bold; */
  text-align: justify;
  z-index: 1;
}
.number {
  position: absolute;
  margin-top: -32em;
  margin-left: 17em;
  color: #fff;

  font-size: 5em;

  font-family: 'Plumb-Medium';
  font-weight: normal;
  text-align: justify;
  z-index: 1;
}
</style>
