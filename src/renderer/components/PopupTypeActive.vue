<template>
  <!-- <div class="page-title">
    <div>PopupTypeActive</div>
  </div> -->
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
        <table style="margin-left: 1.5em;">
          <tbody>
            <tr>
              <td>
                <div class="info-title">
                  <div>
                    <p align="center">
                      Введите пароль <br />
                      для входа в меню настроек
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
                    style="font-size: 7.2rem; width: 3.4em;border-bottom: 4px solid #fff; padding-left: 0.36em; padding-top: 0.2em;"
                  />
                </div>
              </td>
            </tr>
            <!-- <img src="@/assets/svg/k1-up.svg" /> -->

            <tr>
              <!-- row 01 -->
              <!--   waves-effect waves-light -->
              <td>
                <div
                  class="card white waves-effect"
                  style="
                  width: 125px;
                  height: 120px; 
                  border: solid 6px #00B9E3; 
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
                  border: solid 6px #00B9E3; 
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
                  border: solid 6px #00B9E3; 
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
                  border: solid 6px #00B9E3; 
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
                        border: solid 6px #00B9E3; 
                        border-radius: 2.5em;
                        box-shadow: 0px 6px 10px #00b9e3;
                        "
                >
                  <div
                    class="card-content black-text"
                    style="
                        font-size: 3.5em;
                        padding-left: 2rem;
                        padding-top: 0.3em;
                        "
                  >
                    {{ `ПОДТВЕРДИТЬ` }}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
  </section>
</template>

<style scoped>
.page-title {
  padding-top: 4em;
  color: white;
  margin-left: auto;
  margin-right: auto;
  width: 50em;
  align-items: center;
  font-size: 4em;
}
</style>
