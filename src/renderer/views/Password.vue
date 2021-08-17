<template>
  <div>
    <section>
      <form @submit.prevent="">
        <div
          class="location"
          style="padding-top: 40em; padding-right: 0em;margin-left: 0.em;"
        >
          <div class="info-title">
            <p v-if="this.getIsLoginSettingPassword()" align="center">
              Введите пароль для входа в меню настроек
            </p>
            <p v-else align="center">
              Введите пароль от аккаунта Alles Bonus
            </p>
          </div>

          <div class="display" style="padding-left: 4em"> 
            <input
              type="password"
              class="password"
              v-model="password"
              autocomplete="tel"
              required
              style="font-size: 7.2rem; height: 8rem; border-bottom: 6px solid #fff; padding-left: 0.4em"
              
            />
          </div>

          <div class="row" style="padding-top: 10em;">
            <div class="col s6 num">
              <table>
                <tbody>
                  <tr>
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
                </tbody>
              </table>
            </div>
            <div class="col s2"></div>
          </div>
        </div>

        <div class="pay-up-title">
          <div>
            <button
              style="margin-left: -4.0em; border: none; background: #121212; width: 0px"
              @click="payUp('password')"
            >
              <div class="btn pay-up">
                <img src="/imgs/pay/pay-up.png" />

                <div style="padding-right: 3.2em;" class="button-title-long">
                  {{ 'ПОДТВЕРДИТЬ' }}
                </div>
              </div>
            </button>
          </div>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'bonus-bill',
  data: () => ({
    password: '',
    passwordLength: 8,
    totString: '',
    settingPassword: ''
  }),
  mounted() {
    this.setRouter('/password')
    this.settingPassword = this.getLoginSettingPassword()
  },
  components: {},
  computed: {
    ...mapGetters({})
  },
  methods: {
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
      } 
      else if (!this.getIsLoginSettingPassword()) {
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
  padding-right: 2em;
  padding-bottom: 0em;

  margin-top: -4em;
  margin-left: -3.5em;
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
  padding-left: 14em;
  margin-top: 0em;
  margin-left: 0em;
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
.btn {
  background-color: #121212;
}
.pay-up {
  margin-top: 4rem;
  margin-left: 11rem;
}
.button-title-long {
  position: relative;
  top: -8rem;
  left: 5rem;
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
