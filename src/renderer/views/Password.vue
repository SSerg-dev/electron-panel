<template>
  <!-- id="overlay" -->
  <div
    class="overlay"
    ref="overlay"
    style="background: none; 
  height: 112em; 
  padding-top: 14em;"
  >
    <!-- dev -->
    <!-- <input style="margin-left: 0em;" class="info-title" onmousemove="this.value = event.clientX+':'+event.clientY"> -->
    <!-- <input style="margin-left: 0em;" class="info-title" onclick="this.value = event.clientX+':'+event.clientY"> -->
    <!--     -->
    <section>
      <form @submit.prevent="">
        <div
          style="
          width: 42em; 
          height: 82em; 
          margin-left: 16em; 
          margin-top: 0em;
          padding-left: 4.5em;
          padding-bottom: 0em;
          border: solid 3px #00B9E3; 
          border-radius: 2em;
          box-shadow: 0px 0px 20px 15px #00b9e3;
          
          "
        >
          <table>
            <tbody>
              <tr>
                <td>
                  <div class="info-title">
                    <div v-if="this.getIsLoginSettingPassword()">
                      <p align="center">
                        Введите пароль <br />
                        для входа в меню настроек
                      </p>
                    </div>
                    <div v-if="!this.getIsLoginSettingPassword()">
                      <p align="center">
                        Введите пароль <br />
                        от аккаунта Alles Bonus
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="display">
                    <input
                      type="password"
                      class="password"
                      v-model="password"
                      autocomplete="tel"
                      required
                      style="font-size: 7.2rem; width: 3.4em;border-bottom: 8px solid #fff; padding-left: 0.36em; padding-top: 0.2em;"
                    />
                  </div>
                </td>
              </tr>

              <tr>
                <!-- row 01 -->
                <td>
                  <button class="btn" @click="setNumber('1')">
                    <!-- <img src="@/assets/svg/k1-up.svg" /> -->
                    <img src="imgs/key/k1-up.png" />
                  </button>
                </td>
                <td>
                  <button class="btn" @click="setNumber('2')">
                    <!-- <img src="@/assets/svg/k2-up.svg" /> -->
                    <img src="imgs/key/k2-up.png" />
                  </button>
                </td>
                <td>
                  <button class="btn" @click="setNumber('3')">
                    <!-- <img src="@/assets/svg/k3-up.svg" /> -->
                    <img src="imgs/key/k3-up.png" />
                  </button>
                </td>
              </tr>

              <tr>
                <td>
                  <button class="btn" @click="setNumber('4')">
                    <!-- <img src="@/assets/svg/k4-up.svg" /> -->
                    <img src="imgs/key/k4-up.png" />
                  </button>
                </td>
                <td>
                  <button class="btn" @click="setNumber('5')">
                    <!-- <img src="@/assets/svg/k5-up.svg" /> -->
                    <img src="imgs/key/k5-up.png" />
                  </button>
                </td>
                <td>
                  <button class="btn" @click="setNumber('6')">
                    <!-- <img src="@/assets/svg/k6-up.svg" /> -->
                    <img src="imgs/key/k6-up.png" />
                  </button>
                </td>
                <td></td>
              </tr>

              <tr>
                <td>
                  <button class="btn" @click="setNumber('7')">
                    <!-- <img src="@/assets/svg/k7-up.svg" /> -->
                    <img src="imgs/key/k7-up.png" />
                  </button>
                </td>
                <td>
                  <button class="btn" @click="setNumber('8')">
                    <!-- <img src="@/assets/svg/k8-up.svg" /> -->
                    <img src="imgs/key/k8-up.png" />
                  </button>
                </td>
                <td>
                  <button class="btn" @click="setNumber('9')">
                    <!-- <img src="@/assets/svg/k9-up.svg" /> -->
                    <img src="imgs/key/k9-up.png" />
                  </button>
                </td>
              </tr>

              <tr>
                <td>
                  <button class="btn" @click="setNumber('0')">
                    <!-- <img src="@/assets/svg/k0-up.svg" /> -->
                    <img src="imgs/key/k0-up.png" />
                  </button>
                </td>
                <td>
                  <button class="btn" @click="backspace">
                    <!-- <img src="@/assets/svg/kdel-up.svg" /> -->
                    <img src="imgs/key/kdel-up.png" />
                  </button>
                </td>
              </tr>
              <!-- row button -->
              <tr>
                <td>
                  <div class="pay-up-title">
                    <div>
                      <button
                        style="border: none; background: #121212;"
                        @click="payUp('password')"
                      >
                        <div class="btn pay-up">
                          <img src="/imgs/pay/pay-up.png" />

                          <div class="button-title-long">
                            {{ 'ПОДТВЕРДИТЬ' }}
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    </section>
    <!-- <input style="margin-left: 0em;" class="info-title" onmousemove="this.value = event.clientX+':'+event.clientY"> -->
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'bonus-bill',
  data: () => ({
    password: '',
    passwordLength: 6,
    totString: '',
    settingPassword: '',

    minX: 190,
    minY: 370,
    maxX: 880,
    maxY: 1600
  }),
  mounted() {
    this.setup()

    this.setRouter('/password')
    this.settingPassword = this.getLoginSettingPassword()
  },
  components: {},
  computed: {
    ...mapGetters({
      getRouter: 'getRouter'
    })
  },
  methods: {
    /* dev */
    setup() {
      const overlay = this.$refs.overlay
      overlay.onclick = evt => {
        if (
          evt.clientX > this.minX &&
          evt.clientY > this.minY &&
          evt.clientX < this.maxX &&
          evt.clientY < this.maxY
        ) {
          return
        } else {
          this.$router.push('/')
        }
      }
    },
    pushRouter() {
      // console.log('+++getRouter-->', this.getRouter)
      this.$router.push(this.getRouter)
    },
    ...mapGetters({
      getLoginBonusPassword: 'getLoginBonusPassword',
      getLoginBonusPhone: 'getLoginBonusPhone',
      getLoginSettingPassword: 'getLoginSettingPassword',
      getIsPayBonusMoney: 'getIsPayBonusMoney',
      getIsLoginSettingPassword: 'getIsLoginSettingPassword'
    }),
    ...mapMutations({
      setLoginBonusPassword: 'setLoginBonusPassword',
      setIsPayBonusMoney: 'setIsPayBonusMoney',
      setIsLoginSettingPassword: 'setIsLoginSettingPassword',
      setRouter: 'setRouter'
    }),
    ...mapActions({}),

    payUp(program) {
      if (
        this.password === this.settingPassword &&
        this.getIsLoginSettingPassword()
      ) {
        this.$router.push('/setting')
        this.setIsLoginSettingPassword(false)
      } else if (!this.getIsLoginSettingPassword()) {
        this.setLoginBonusPassword(this.password)
        //this.setIsPayBonusMoney(true)
        this.$router.push('/card')
      }
    },

    setNumber(num) {
      if (this.totString.length < this.passwordLength)
        this.totString = this.totString + num.toString()
      this.password = this.totString
    },

    backspace() {
      this.totString = this.totString.substring(0, this.totString.length - 1)
      if (this.totString.length === 0) this.password
      this.password = this.totString
    }
  }
}
</script>

<style scoped>
.info-title {
  position: absolute;

  width: 100%;
  padding-top: 0em;
  padding-left: 0em;
  padding-right: 0em;
  padding-bottom: 0em;

  margin-top: 0em;
  margin-left: -7em;
  font-size: 3em;

  color: #ffffff;
  text-align: center;
  font-family: 'Plumb-Medium';
}
.location {
  position: relative;
  padding-left: 14em;
}

.display {
  width: 430px; /* 520px; */
  position: absolute;
  margin-top: 0em;
  margin-left: 2.8em;
  z-index: 1;
}
.password {
  margin: 0 auto;
  width: 220px;
  height: 125px;
  color: #ffffff;
  text-align: left;
  font-family: 'Plumb-Medium';
  text-transform: uppercase;
}

/* dev */
.pay-up-title {
  position: absolute;
  /* padding-left: 3em; */
  margin-top: -3em;
  margin-left: 3.2em;
  z-index: 1;
}
.num {
  padding-left: 5rem;
}
table,
th,
td {
  /* border: solid; */
  border: none;

  height: 150px;
  width: 150px;

  border-color: #121212;
}
tr {
  padding-left: 0em;
}
.btn {
  background-color: #121212;
}
.pay-up {
  margin-top: 4em;
  margin-left: 0em;
}
.button-title-long {
  position: relative;
  top: -8rem;
  left: 3rem;
  color: black;
  font-size: 3rem;
  font-weight: bold;
  text-align: left;
  z-index: 1;

  font-family: 'Plumb-Medium';
  text-transform: uppercase;
}
/*  */
</style>
