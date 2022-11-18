<template>
  <!-- id="overlay" -->
  <div
    class="overlay"
    ref="overlay"
    style="background: none; height: 112em; padding-top: 14em"
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
            border: solid 3px #00b9e3;
            border-radius: 2em;
            box-shadow: 0px 0px 20px 15px #00b9e3;
          "
        >
          <table style="margin-left: 1.5em">
            <tbody>
              <tr>
                <td>
                  <div class="info-title">
                    <div v-if="this.getIsLoginSettingPassword()">
                      <p align="center">
                        {{ `Enter_your_password` | localize }} <br />
                        {{ `to_enter_the_settings_menu` | localize }}
                      </p>
                    </div>
                    <div v-if="!this.getIsLoginSettingPassword()">
                      <p align="center">
                        {{ `Enter_your_password` | localize }} <br />
                        {{ `for_Alles_Bonus` | localize }}
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
                      style="
                        font-size: 7.2rem;
                        width: 3.4em;
                        border-bottom: 4px solid #fff;
                        padding-left: 0.36em;
                        padding-top: 0.2em;
                      "
                    />
                  </div>
                </td>
              </tr>

              <tr>
                <!-- row 01 -->
                <!--   waves-effect waves-light -->
                <td>
                  <div
                    @click="setNumber('1')"
                    class="card white waves-effect"
                    style="
                      width: 125px;
                      height: 120px;
                      border: solid 6px #00b9e3;
                      border-radius: 2.5em;
                      box-shadow: 0px 6px 10px #00b9e3;
                    "
                  >
                    <div
                      class="card-content black-text"
                      style="
                        font-size: 5.2rem;
                        padding-left: 2.5rem;
                        padding-top: 0em;
                      "
                    >
                      1
                    </div>
                  </div>
                </td>
                <td>
                  <div
                    @click="setNumber('2')"
                    class="card white waves-effect"
                    style="
                      width: 125px;
                      height: 120px;
                      border: solid 6px #00b9e3;
                      border-radius: 2.5em;
                      box-shadow: 0px 6px 10px #00b9e3;
                    "
                  >
                    <div
                      class="card-content black-text"
                      style="
                        font-size: 5.2rem;
                        padding-left: 2.5rem;
                        padding-top: 0em;
                      "
                    >
                      2
                    </div>
                  </div>
                </td>
                <td>
                  <div
                    @click="setNumber('3')"
                    class="card white waves-effect"
                    style="
                      width: 125px;
                      height: 120px;
                      border: solid 6px #00b9e3;
                      border-radius: 2.5em;
                      box-shadow: 0px 6px 10px #00b9e3;
                    "
                  >
                    <div
                      class="card-content black-text"
                      style="
                        font-size: 5.2rem;
                        padding-left: 2.5rem;
                        padding-top: 0em;
                      "
                    >
                      3
                    </div>
                  </div>
                </td>
              </tr>

              <tr>
                <!-- row 02 -->
                <td>
                  <div
                    @click="setNumber('4')"
                    class="card white waves-effect"
                    style="
                      width: 125px;
                      height: 120px;
                      border: solid 6px #00b9e3;
                      border-radius: 2.5em;
                      box-shadow: 0px 6px 10px #00b9e3;
                    "
                  >
                    <div
                      class="card-content black-text"
                      style="
                        font-size: 5.2rem;
                        padding-left: 2.5rem;
                        padding-top: 0em;
                      "
                    >
                      4
                    </div>
                  </div>
                </td>
                <td>
                  <div
                    @click="setNumber('5')"
                    class="card white waves-effect"
                    style="
                      width: 125px;
                      height: 120px;
                      border: solid 6px #00b9e3;
                      border-radius: 2.5em;
                      box-shadow: 0px 6px 10px #00b9e3;
                    "
                  >
                    <div
                      class="card-content black-text"
                      style="
                        font-size: 5.2rem;
                        padding-left: 2.5rem;
                        padding-top: 0em;
                      "
                    >
                      5
                    </div>
                  </div>
                </td>
                <td>
                  <div
                    @click="setNumber('6')"
                    class="card white waves-effect"
                    style="
                      width: 125px;
                      height: 120px;
                      border: solid 6px #00b9e3;
                      border-radius: 2.5em;
                      box-shadow: 0px 6px 10px #00b9e3;
                    "
                  >
                    <div
                      class="card-content black-text"
                      style="
                        font-size: 5.2rem;
                        padding-left: 2.5rem;
                        padding-top: 0em;
                      "
                    >
                      6
                    </div>
                  </div>
                </td>
              </tr>

              <tr>
                <!-- row 03 -->
                <td>
                  <div
                    @click="setNumber('7')"
                    class="card white waves-effect"
                    style="
                      width: 125px;
                      height: 120px;
                      border: solid 6px #00b9e3;
                      border-radius: 2.5em;
                      box-shadow: 0px 6px 10px #00b9e3;
                    "
                  >
                    <div
                      class="card-content black-text"
                      style="
                        font-size: 5.2rem;
                        padding-left: 2.5rem;
                        padding-top: 0em;
                      "
                    >
                      7
                    </div>
                  </div>
                </td>
                <td>
                  <div
                    @click="setNumber('8')"
                    class="card white waves-effect"
                    style="
                      width: 125px;
                      height: 120px;
                      border: solid 6px #00b9e3;
                      border-radius: 2.5em;
                      box-shadow: 0px 6px 10px #00b9e3;
                    "
                  >
                    <div
                      class="card-content black-text"
                      style="
                        font-size: 5.2rem;
                        padding-left: 2.5rem;
                        padding-top: 0em;
                      "
                    >
                      8
                    </div>
                  </div>
                </td>
                <td>
                  <div
                    @click="setNumber('9')"
                    class="card white waves-effect"
                    style="
                      width: 125px;
                      height: 120px;
                      border: solid 6px #00b9e3;
                      border-radius: 2.5em;
                      box-shadow: 0px 6px 10px #00b9e3;
                    "
                  >
                    <div
                      class="card-content black-text"
                      style="
                        font-size: 5.2rem;
                        padding-left: 2.5rem;
                        padding-top: 0em;
                      "
                    >
                      9
                    </div>
                  </div>
                </td>
              </tr>

              <tr>
                <!-- row 04 -->
                <td>
                  <div
                    @click="setNumber('0')"
                    class="card white waves-effect"
                    style="
                      width: 125px;
                      height: 120px;
                      border: solid 6px #00b9e3;
                      border-radius: 2.5em;
                      box-shadow: 0px 6px 10px #00b9e3;
                    "
                  >
                    <div
                      class="card-content black-text"
                      style="
                        font-size: 5.2rem;
                        padding-left: 2.5rem;
                        padding-top: 0em;
                      "
                    >
                      0
                    </div>
                  </div>
                </td>
                <td>
                  <div
                    @click="backspace"
                    class="card white waves-effect"
                    style="
                      width: 125px;
                      height: 120px;
                      border: solid 6px red;
                      border-radius: 2.5em;
                      box-shadow: 0px 6px 10px red;
                    "
                  >
                    <div
                      class="card-content black-text"
                      style="
                        font-size: 4.2rem;
                        padding-left: 1.8rem;
                        padding-top: 1rem;
                      "
                    >
                      <!-- del -->
                      <i class="medium material-icons">backspace</i>
                    </div>
                  </div>
                </td>
              </tr>
              <!-- row button -->
              <tr>
                <td colspan="3">
                  <div
                    @click="payUp('password')"
                    class="card white waves-effect"
                    style="
                      width: 420px;
                      height: 120px;
                      border: solid 6px #00b9e3;
                      border-radius: 2.5em;
                      box-shadow: 0px 6px 10px #00b9e3;
                    "
                  >
                    <div
                      class="card-content black-text"
                      style="
                        display: flex;
                        justify-content: center;

                        font-size: 3.5em;
                        padding-top: 0.3em;
                      "
                    >
                      {{ `CONFIRM` | localize }}
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
import { log } from 'util'

var sha1 = require('sha-1')

export default {
  name: 'bonus-bill',
  data: () => ({
    password: '',
    salt: '61839E54F17AB4CE3D47',
    hash: '',
    passwordLength: 6,
    totString: '',
    settingPassword: '',

    minX: 190,
    minY: 370,
    maxX: 880,
    maxY: 1600,
  }),
  mounted() {
    this.setup()

    this.setRouter('/password')
    this.settingPassword = this.getLoginSettingPassword()
  },
  components: {},
  computed: {
    ...mapGetters({
      getRouter: 'getRouter',
    }),
  },
  methods: {
    setup() {
      const overlay = this.$refs.overlay
      overlay.onclick = (evt) => {
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
      // getLoginBonusPhone: 'getLoginBonusPhone',
      getLoginSettingPassword: 'getLoginSettingPassword',
      getIsLoginSettingPassword: 'getIsLoginSettingPassword',
    }),
    ...mapMutations({
      setLoginBonusPassword: 'setLoginBonusPassword',
      setIsPayBonusMoney: 'setIsPayBonusMoney',
      setIsLoginSettingPassword: 'setIsLoginSettingPassword',
      setRouter: 'setRouter',
    }),
    ...mapActions({}),

    payUp(program) {
      if (this.check() && this.getIsLoginSettingPassword()) {
        this.$router.push('/setting')
        this.setIsLoginSettingPassword(false)
      } else if (!this.getIsLoginSettingPassword()) {
        this.setLoginBonusPassword(this.password)

        this.setIsPayBonusMoney(true)
        // console.log('$$ Password this.$router.push/card')
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
    },
    check() {
      // password
      const strPass = this.password
      // salt
      const hexSalt = this.salt
      let strSalt = ''

      for (let n = 0; n < hexSalt.length; n += 2) {
        strSalt += String.fromCharCode(parseInt(hexSalt.substr(n, 2), 16))
      }
      const result = strPass + strSalt
      this.hash = sha1(result)
      
      const password = this.hash
      const index = this.$store.state.users.passwords.findIndex(
        (p) => p === password
      )
      if (index === -1 || this.password.length < 4) return false

      const comma = ','
      const arrayAccess = this.$store.state.users.access[index].split(comma)

      // set access B&D
      this.$store.state.users.isAccess.mainMenu = arrayAccess[1]
      this.$store.state.users.isAccess.mainDiagnostic = arrayAccess[2]
      this.$store.state.users.isAccess.mainPosts = arrayAccess[3]
      this.$store.state.users.isAccess.mainSetting = arrayAccess[4]
      this.$store.state.users.isAccess.mainStatistic = arrayAccess[5]
      this.$store.state.users.isAccess.mainFinance = arrayAccess[6]

      // set access panels
      this.$store.state.users.isAccess.panelCollection = arrayAccess[7]
      this.$store.state.users.isAccess.panelPlusTen = arrayAccess[8]
      this.$store.state.users.isAccess.panelOpen = arrayAccess[0]

      return true
    },
  },
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
  margin-left: -7.5em;
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
  margin-top: -1.5em;
  margin-left: 0.8em;
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
  margin-top: -2em;
  margin-left: 3.2em;
  z-index: 1;
}
.num {
  padding-left: 0em;
}
table,
th,
td {
  border: none;
  height: 150px;
  width: 150px;
  padding-right: 1.5em;
  /* border-color: #121212; */
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
