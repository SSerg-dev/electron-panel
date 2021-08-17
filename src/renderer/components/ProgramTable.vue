<template>
  <div>
    <div class="locate">
      <section>
        <div class="message">
          <div><Message /></div>
        </div>
        <div class="price">
          <img src="imgs/price/price-up.png" />
        </div>
      </section>

      <table border="0" width="100%" cellpadding="0" cellspacing="0">
        <tbody v-bind:style="{ opacity: isVisible ? 1 : 0 }">
          <!-- 0 -->
          <!-- <tr>
            <ProgramTableDisk />
          </tr> -->
          <!-- <h3 class="white-text">{{isVisible}}</h3> -->
          <!-- 1 -->
          <!-- ДИСКИ -->
          <tr align="center" v-if="this.actives[14].display !== 'none'">
            <!-- //////////////////////////////////////////////// -->
            <td
              v-if="this.actives[24].display !== 'none'"
              colspan="1"
              align="center"
            >
              <button
                v-if="this.isDown.disk === false"
                style="background-image:url('./imgs/blue/blue_long_turbo.png'); width: 832px; height: 105px"
                class="btn black"
                @click="setProgram('disk')"
              >
                <div class="button-title-long">
                  {{ `${actives[14].title}` }}
                </div>
              </button>
              <button
                v-else-if="this.isDown.disk === true"
                style="background-image:url('./imgs/blue/blue_long_turbo_down.png'); width: 832px; height: 105px"
                class="btn black"
                @click="setProgram('disk')"
              >
                <div class="button-title-long">
                  {{ `${actives[14].title}` }}
                </div>
              </button>
            </td>

            <td
              v-else-if="this.actives[24].display === 'none'"
              colspan="1"
              align="center"
            >
              <button
                v-if="this.isDown.disk === false"
                style="background-image:url('./imgs/blue/blue_long.png'); width: 962px; height: 105px"
                class="btn black"
                @click="setProgram('disk')"
              >
                <div class="button-title-long">
                  {{ `${actives[14].title}` }}
                </div>
              </button>
              <button
                v-else-if="this.isDown.disk === true"
                style="background-image:url('./imgs/blue/blue_long_down.png'); width: 962px; height: 105px"
                class="btn black"
                @click="setProgram('disk')"
              >
                <div class="button-title-long">
                  {{ `${actives[14].title}` }}
                </div>
              </button>
            </td>
            <!-- /////////////////////////////////////////////// -->

            <!-- <td colspan="1" v-if="this.actives[24].x2 === true"> -->
            <td
              colspan="1"
              v-if="
                this.actives[24].display !== 'none' &&
                  this.actives[24].x2 === true
              "
            >
              <button
                v-if="this.isDown.disk_x2 === false"
                style="height: 105px"
                class="btn x2"
                @click="setProgram('disk_x2')"
              >
                <img src="imgs/x2/x2_an1.gif" />
              </button>

              <button
                v-if="this.isDown.disk_x2 === true"
                style="height: 105px"
                class="btn x2"
                @click="setProgram('disk_x2')"
              >
                <img src="imgs/x2/x2_an2.gif" />
              </button>
            </td>

            <td colspan="1"></td>
          </tr>

          <!-- 2 -->
          <!-- АНТИМОСКИТ -->
          <tr align="center" v-if="this.actives[15].display !== 'none'">
            <!-- /////////////////////////////////////////////// -->
            <td
              v-if="this.actives[25].display !== 'none'"
              colspan="1"
              align="center"
              heigth="115px"
            >
              <button
                v-if="this.isDown.mosquito === false"
                style="background-image:url('./imgs/blue/blue_long_turbo.png'); width: 832px; height: 105px"
                class="btn black"
                @click="setProgram('mosquito')"
              >
                <div class="button-title-long">
                  {{ `${actives[15].title}` }}
                </div>
              </button>
              <button
                v-else-if="this.isDown.mosquito === true"
                style="background-image:url('./imgs/blue/blue_long_turbo_down.png'); width: 832px; height: 105px"
                class="btn black"
                @click="setProgram('mosquito')"
              >
                <div class="button-title-long">
                  {{ `${actives[15].title}` }}
                </div>
              </button>
            </td>

            <td
              v-if="this.actives[25].display === 'none'"
              colspan="1"
              align="center"
              heigth="115px"
            >
              <button
                v-if="this.isDown.mosquito === false"
                style="background-image:url('./imgs/blue/blue_long.png'); width: 962px; height: 105px"
                class="btn black"
                @click="setProgram('mosquito')"
              >
                <div class="button-title-long">
                  {{ `${actives[15].title}` }}
                </div>
              </button>
              <button
                v-else-if="this.isDown.mosquito === true"
                style="background-image:url('./imgs/blue/blue_long_down.png'); width: 962px; height: 105px"
                class="btn black"
                @click="setProgram('mosquito')"
              >
                <div class="button-title-long">
                  {{ `${actives[15].title}` }}
                </div>
              </button>
            </td>

            <!-- ////////////////////////////////////////////////// -->

            <!-- <td colspan="1" v-if="this.actives[25].x2 === true"> -->
            <td
              colspan="1"
              v-if="
                this.actives[25].display !== 'none' &&
                  this.actives[25].x2 === true
              "
            >
              <button
                v-if="this.isDown.mosquito_x2 === false"
                style="height: 105px"
                class="btn x2"
                @click="setProgram('mosquito_x2')"
              >
                <img src="imgs/x2/x2_an1.gif" />
              </button>

              <button
                v-if="this.isDown.mosquito_x2 === true"
                style="height: 105px"
                class="btn x2"
                @click="setProgram('mosquito_x2')"
              >
                <img src="imgs/x2/x2_an2.gif" />
              </button>
            </td>
            <td colspan="1"></td>
          </tr>

          <!-- 3 -->
          <!-- ЩЕТКА + ПЕНА -->
          <!-- .......................................... -->
          <!-- green_long_x2_color.png -->
          <!-- dev -->
          <!-- <tr align="center" v-if="this.actives[13].display !== 'none'"> -->
          <tr align="center" v-if="this.actives[13].display !== 'none'">
            <!-- 1 -->
            <td
              v-if="
                this.actives[20].display === 'none' &&
                  this.actives[23].display === 'none'
              "
              colspan="1"
              align="center"
              heigth="105px"
            >
              <button
                v-if="this.isDown.brushFoam === false"
                style="background-image:url('./imgs/green/green_long.png'); width: 962px; height: 105px;"
                class="btn black red-size"
                @click="setProgram('brushFoam')"
              >
                <div class="button-title-long">
                  {{ `${actives[13].title}` }}
                </div>
              </button>
              <button
                v-if="this.isDown.brushFoam === true"
                style="background-image:url('./imgs/green/green_long_down.png'); width: 962px; height: 105px;"
                class="btn black red-size"
                @click="setProgram('brushFoam')"
              >
                <div class="button-title-long">
                  {{ `${actives[13].title}` }}
                </div>
              </button>
            </td>
            <!-- 2 -->
            <!-- <td v-else-if="(this.actives[20].display === 'block') && (this.actives[23].display === 'none')" colspan="1" align="center" width="832px" heigth="105px"> -->
            <td
              v-else-if="
                this.actives[20].display === 'block' &&
                  this.actives[23].display === 'none'
              "
              colspan="1"
              align="center"
              heigth="105px"
            >
              <button
                v-if="this.isDown.brushFoam === false"
                style="background-image:url('./imgs/green/green_long_x2.png'); width: 832px; height: 105px;"
                class="btn black red-size"
                @click="setProgram('brushFoam')"
              >
                <div class="button-title-long">
                  {{ `${actives[13].title}` }}
                </div>
              </button>
              <button
                v-if="this.isDown.brushFoam === true"
                style="background-image:url('./imgs/green/green_long_down_x2.png'); width: 832px; height: 105px;"
                class="btn black red-size"
                @click="setProgram('brushFoam')"
              >
                <div class="button-title-long">
                  {{ `${actives[13].title}` }}
                </div>
              </button>
            </td>

            <!-- 3 -->
            <td
              v-else-if="
                this.actives[20].display === 'none' &&
                  this.actives[23].display === 'block'
              "
              colspan="1"
              align="center"
              heigth="105px"
            >
              <button
                v-if="this.isDown.brushFoam === false"
                style="background-image:url('./imgs/green/green_long_x2.png'); width: 832px; height: 105px;"
                class="btn black red-size"
                @click="setProgram('brushFoam')"
              >
                <div class="button-title-long">
                  {{ `${actives[13].title}` }}
                </div>
              </button>
              <button
                v-if="this.isDown.brushFoam === true"
                style="background-image:url('./imgs/green/green_long_down_x2.png'); width: 832px; height: 105px;"
                class="btn black red-size"
                @click="setProgram('brushFoam')"
              >
                <div class="button-title-long">
                  {{ `${actives[13].title}` }}
                </div>
              </button>
            </td>
            <!-- 4 -->
            <td
              v-else-if="
                this.actives[20].display === 'block' &&
                  this.actives[23].display === 'block'
              "
              colspan="1"
              align="center"
              heigth="105px"
            >
              <button
                v-if="this.isDown.brushFoam === false"
                style="background-image:url('./imgs/green/green_long_x2_color.png'); width: 704px; height: 105px;"
                class="btn black red-size"
                @click="setProgram('brushFoam')"
              >
                <div class="button-title-long">
                  {{ `${actives[13].title}` }}
                </div>
              </button>
              <button
                v-if="this.isDown.brushFoam === true"
                style="background-image:url('./imgs/green/green_long_down_x2_color.png'); width: 704px; height: 105px;"
                class="btn black red-size"
                @click="setProgram('brushFoam')"
              >
                <div class="button-title-long">
                  {{ `${actives[13].title}` }}
                </div>
              </button>
            </td>

            <!-- ///////////////////////////////////////////// -->
            <!-- <td colspan="1" v-if="this.actives[25].x2 === true"> -->
            <td
              colspan="1"
              v-if="
                this.actives[20].display !== 'none' &&
                  this.actives[25].x2 === true
              "
            >
              <button
                v-if="this.isDown.brushFoam_color === false"
                style="padding-right: 96px; height: 105px "
                class="btn color"
                @click="setProgram('brushFoam_color')"
              >
                <img src="imgs/color/color_an1.gif" />
              </button>
              <button
                v-if="this.isDown.brushFoam_color === true"
                style="padding-right: 96px; height: 105px "
                class="btn color"
                @click="setProgram('brushFoam_color')"
              >
                <img src="imgs/color/color_an2.gif" />
              </button>
            </td>

            <!-- <td
              style="padding-right: 8.4em;"
              colspan="1"
              v-if="this.actives[23].x2 === true"
            > -->
            <td
              style="padding-right: 8.4em;"
              colspan="1"
              v-if="this.actives[23].display !== 'none'"
            >
              <button
                v-if="this.isDown.brushFoam_x2 === false"
                style="padding-right: 96px; height: 105px"
                class="btn x2"
                @click="setProgram('brushFoam_x2')"
              >
                <img src="imgs/x2/x2_an1.gif" />
              </button>
              <button
                v-if="this.isDown.brushFoam_x2 === true"
                style="padding-right: 96px; height: 105px"
                class="btn x2"
                @click="setProgram('brushFoam_x2')"
              >
                <img src="imgs/x2/x2_an2.gif" />
              </button>
            </td>
          </tr>

          <!-- 4 -->
          <!-- ПЕНА -->
          <tr align="center" v-if="this.actives[5].display !== 'none'">
            <!-- ////////////////////////////////////////////////// -->
            <!-- 1 red_long_x2_color.png -->
            <td
              v-if="
                this.actives[19].display === 'none' &&
                  this.actives[22].display === 'none'
              "
              colspan="1"
              align="center"
              heigth="105px"
            >
              <button
                v-if="this.isDown.foam === false"
                style="background-image:url('./imgs/red/red_long.png'); width: 962px; height: 105px;"
                class="btn black red-size"
                @click="setProgram('foam')"
              >
                <div class="button-title-long">{{ `${actives[5].title}` }}</div>
              </button>
              <button
                v-if="this.isDown.foam === true"
                style="background-image:url('./imgs/red/red_long_down.png'); width: 962px; height: 105px;"
                class="btn black red-size"
                @click="setProgram('foam')"
              >
                <div class="button-title-long">{{ `${actives[5].title}` }}</div>
              </button>
            </td>

            <!-- 2 -->
            <td
              v-else-if="
                this.actives[19].display === 'block' &&
                  this.actives[22].display === 'none'
              "
              colspan="1"
              align="center"
              heigth="105px"
            >
              <button
                v-if="this.isDown.foam === false"
                style="background-image:url('./imgs/red/red_long_x2.png'); width: 832px; height: 105px;"
                class="btn black red-size"
                @click="setProgram('foam')"
              >
                <div class="button-title-long">{{ `${actives[5].title}` }}</div>
              </button>
              <button
                v-if="this.isDown.foam === true"
                style="background-image:url('./imgs/red/red_long_down_x2.png'); width: 832px; height: 105px;"
                class="btn black red-size"
                @click="setProgram('foam')"
              >
                <div class="button-title-long">{{ `${actives[5].title}` }}</div>
              </button>
            </td>

            <!-- 3 -->
            <td
              v-else-if="
                this.actives[19].display === 'none' &&
                  this.actives[22].display === 'block'
              "
              colspan="1"
              align="center"
              heigth="105px"
            >
              <button
                v-if="this.isDown.foam === false"
                style="background-image:url('./imgs/red/red_long_x2.png'); width: 832px; height: 105px;"
                class="btn black red-size"
                @click="setProgram('foam')"
              >
                <div class="button-title-long">{{ `${actives[5].title}` }}</div>
              </button>
              <button
                v-if="this.isDown.foam === true"
                style="background-image:url('./imgs/red/red_long_down_x2.png'); width: 832px; height: 105px;"
                class="btn black red-size"
                @click="setProgram('foam')"
              >
                <div class="button-title-long">{{ `${actives[5].title}` }}</div>
              </button>
            </td>

            <!-- 4 -->
            <td
              v-else-if="
                this.actives[19].display === 'block' &&
                  this.actives[22].display === 'block'
              "
              colspan="1"
              align="center"
              heigth="105px"
            >
              <button
                v-if="this.isDown.foam === false"
                style="background-image:url('./imgs/red/red_long_x2_color.png'); width: 704px; height: 105px;"
                class="btn black red-size"
                @click="setProgram('foam')"
              >
                <div class="button-title-long">{{ `${actives[5].title}` }}</div>
              </button>
              <!-- red_long_x2_color.png -->
              <button
                v-if="this.isDown.foam === true"
                style="background-image:url('./imgs/red/red_long_down_x2_color.png'); width: 704px; height: 105px;"
                class="btn black red-size"
                @click="setProgram('foam')"
              >
                <div class="button-title-long">{{ `${actives[5].title}` }}</div>
              </button>
            </td>

            <!-- //////////////////////////////////////////////// -->

            <!-- <td colspan="1" v-if="this.actives[19].color === true"> -->
            <td
              colspan="1"
              v-if="
                this.actives[19].display !== 'none' &&
                  this.actives[19].color === true
              "
            >
              <button
                v-if="this.isDown.foam_color === false"
                style="padding-right: 96px; height: 105px "
                class="btn color"
                @click="setProgram('foam_color')"
              >
                <img src="imgs/color/color_an1.gif" />
              </button>
              <button
                v-if="this.isDown.foam_color === true"
                style="padding-right: 96px; height: 105px "
                class="btn color"
                @click="setProgram('foam_color')"
              >
                <img src="imgs/color/color_an2.gif" />
              </button>
            </td>

            <!-- <td
              style="padding-right: 8.4em;"
              colspan="1"
              v-if="this.actives[22].x2 === true"
            > -->
            <td
              style="padding-right: 8.4em;"
              colspan="1"
              v-if="this.actives[22].display !== 'none'"
            >
              <!--  -->
              <button
                v-if="this.isDown.foam_x2 === false"
                style="padding-right: 96px; height: 105px"
                class="btn x2"
                @click="setProgram('foam_x2')"
              >
                <img src="imgs/x2/x2_an1.gif" />
              </button>
              <button
                v-if="this.isDown.foam_x2 === true"
                style="padding-right: 96px; height: 105px"
                class="btn x2"
                @click="setProgram('foam_x2')"
              >
                <img src="imgs/x2/x2_an2.gif" />
              </button>
            </td>
          </tr>

          <!-- 5 -->
          <!-- ШАМПУНЬ shampoo -->

          <tr align="left" v-if="this.actives[0].display !== 'none'">
            <!-- v-if="this.actives[21].display !== 'none'" -->
            <!-- ////////////////////////////////////////// -->
            <td
              v-if="this.actives[21].display !== 'none'"
              colspan="1"
              align="center"
              heigth="115px"
            >
              <button
                v-if="this.isDown.shampoo === false"
                style="background-image:url('./imgs/blue/blue_long_turbo.png'); width: 832px; height: 105px"
                class="btn black"
                @click="setProgram('shampoo')"
              >
                <div class="button-title-long">{{ `${actives[0].title}` }}</div>
              </button>
              <button
                v-if="this.isDown.shampoo === true"
                style="background-image:url('./imgs/blue/blue_long_turbo_down.png'); width: 832px; height: 105px"
                class="btn black"
                @click="setProgram('shampoo')"
              >
                <div class="button-title-long">{{ `${actives[0].title}` }}</div>
              </button>
            </td>

            <td
              v-else-if="this.actives[21].display === 'none'"
              colspan="1"
              align="center"
              heigth="115px"
            >
              <button
                v-if="this.isDown.shampoo === false"
                style="background-image:url('./imgs/blue/blue_long.png'); width: 962px; height: 105px"
                class="btn black"
                @click="setProgram('shampoo')"
              >
                <div class="button-title-long">{{ `${actives[0].title}` }}</div>
              </button>
              <button
                v-if="this.isDown.shampoo === true"
                style="background-image:url('./imgs/blue/blue_long_down.png'); width: 962px; height: 105px"
                class="btn black"
                @click="setProgram('shampoo')"
              >
                <div class="button-title-long">{{ `${actives[0].title}` }}</div>
              </button>
            </td>

            <!-- ///////////////////////////////////////// -->

            <!-- <td colspan="1" v-if="this.actives[21].x2 === true"> -->
            <td
              colspan="1"
              v-if="
                this.actives[21].display !== 'none' &&
                  this.actives[21].x2 === true
              "
            >
              <button
                v-if="this.isDown.shampoo_x2 === false"
                style="height: 105px"
                class="btn x2"
                @click="setProgram('shampoo_x2')"
              >
                <img src="imgs/x2/x2_an1.gif" />
              </button>
              <button
                v-if="this.isDown.shampoo_x2 === true"
                style="height: 105px"
                class="btn x2"
                @click="setProgram('shampoo_x2')"
              >
                <img src="imgs/x2/x2_an2.gif" />
              </button>
            </td>

            <td colspan="1"></td>
          </tr>

          <!-- 6 -->
          <!-- ВОДА + ШАМПУНЬ -->
          <tr align="left" v-if="this.actives[1].display !== 'none'">
            <!-- ///////////////////////////////////////////// -->
            <td
              v-if="this.actives[7].display !== 'none'"
              colspan="1"
              align="center"
              heigth="115px"
            >
              <button
                v-if="this.isDown.waterShampoo === false"
                style="background-image:url('./imgs/blue/blue_long_turbo.png'); width: 832px; height: 105px"
                class="btn black"
                @click="setProgram('waterShampoo')"
              >
                <div class="button-title-long noselect">
                  {{ `${actives[1].title}` }}
                </div>
              </button>
              <button
                v-if="this.isDown.waterShampoo === true"
                style="background-image:url('./imgs/blue/blue_long_turbo_down.png'); width: 832px; height: 105px"
                class="btn black"
                @click="setProgram('waterShampoo')"
              >
                <div class="button-title-long noselect">
                  {{ `${actives[1].title}` }}
                </div>
              </button>
            </td>

            <td
              v-else-if="this.actives[7].display === 'none'"
              colspan="1"
              align="center"
              heigth="115px"
            >
              <button
                v-if="this.isDown.waterShampoo === false"
                style="background-image:url('./imgs/blue/blue_long.png'); width: 962px; height: 105px"
                class="btn black"
                @click="setProgram('waterShampoo')"
              >
                <div class="button-title-long noselect">
                  {{ `${actives[1].title}` }}
                </div>
              </button>
              <button
                v-if="this.isDown.waterShampoo === true"
                style="background-image:url('./imgs/blue/blue_long_down.png'); width: 962px; height: 105px"
                class="btn black"
                @click="setProgram('waterShampoo')"
              >
                <div class="button-title-long noselect">
                  {{ `${actives[1].title}` }}
                </div>
              </button>
            </td>

            <!-- v-else-if="this.actives[24].display === 'none'" -->
            <!-- ///////////////////////////////////////////// -->

            <!-- <td colspan="1" v-if="this.actives[7].turbo === true"> -->
            <td
              colspan="1"
              v-if="
                this.actives[7].display !== 'none' &&
                  this.actives[7].turbo === true
              "
            >
              <button
                v-if="this.isDown.waterShampoo_turbo === false"
                style="height: 105px"
                class="btn x2"
                @click="setProgram('waterShampoo_turbo')"
              >
                <img src="imgs/turbo/turbo_up_an3.gif" />
              </button>
              <button
                v-if="this.isDown.waterShampoo_turbo === true"
                style="height: 105px"
                class="btn x2"
                @click="setProgram('waterShampoo_turbo')"
              >
                <img src="imgs/turbo/turbo_up_an4.gif" />
              </button>
            </td>
            <td colspan="1"></td>
          </tr>

          <!-- 7 -->
          <!-- ТЕПЛАЯ ВОДА warmWater -->
          <tr align="left" v-if="this.actives[11].display !== 'none'">
            <!-- ////////////////////////////////////// -->
            <td
              v-if="this.actives[12].display !== 'none'"
              colspan="1"
              align="center"
              heigth="115px"
            >
              <button
                v-if="this.isDown.warmWater === false"
                style="background-image:url('./imgs/blue/blue_long_turbo.png'); width: 832px; height: 105px"
                class="btn black"
                @click="setProgram('warmWater')"
              >
                <div class="button-title-long">
                  {{ `${actives[11].title}` }}
                </div>
              </button>
              <button
                v-if="this.isDown.warmWater === true"
                style="background-image:url('./imgs/blue/blue_long_turbo_down.png'); width: 832px; height: 105px"
                class="btn black"
                @click="setProgram('warmWater')"
              >
                <div class="button-title-long">
                  {{ `${actives[11].title}` }}
                </div>
              </button>
            </td>

            <td
              v-else-if="this.actives[12].display === 'none'"
              colspan="1"
              align="center"
              heigth="115px"
            >
              <button
                v-if="this.isDown.warmWater === false"
                style="background-image:url('./imgs/blue/blue_long.png'); width: 962px; height: 105px"
                class="btn black"
                @click="setProgram('warmWater')"
              >
                <div class="button-title-long">
                  {{ `${actives[11].title}` }}
                </div>
              </button>
              <button
                v-if="this.isDown.warmWater === true"
                style="background-image:url('./imgs/blue/blue_long_down.png'); width: 962px; height: 105px"
                class="btn black"
                @click="setProgram('warmWater')"
              >
                <div class="button-title-long">
                  {{ `${actives[11].title}` }}
                </div>
              </button>
            </td>

            <!-- ///////////////////////////////////////////////////// -->

            <!-- <td colspan="1" v-if="this.actives[12].turbo === true"> -->
            <td
              colspan="1"
              v-if="
                this.actives[12].display !== 'none' &&
                  this.actives[12].turbo === true
              "
            >
              <button
                v-if="this.isDown.warmWater_turbo === false"
                style="height: 105px"
                class="btn x2"
                @click="setProgram('warmWater_turbo')"
              >
                <img src="imgs/turbo/turbo_up_an3.gif" />
              </button>
              <button
                v-if="this.isDown.warmWater_turbo === true"
                style="height: 105px"
                class="btn x2"
                @click="setProgram('warmWater_turbo')"
              >
                <img src="imgs/turbo/turbo_up_an4.gif" />
              </button>
            </td>
            <td colspan="1"></td>
          </tr>

          <!-- 8 -->
          <!-- ХОЛОДНАЯ ВОДА coldWater -->

          <tr align="left" v-if="this.actives[2].display !== 'none'">
            <!-- /////////////////////////////////////////////////// -->
            <!-- v-else-if="this.actives[12].display === 'none'" -->
            <td
              v-if="this.actives[8].display !== 'none'"
              colspan="1"
              align="center"
              heigth="115px"
            >
              <button
                v-if="this.isDown.coldWater === false"
                style="background-image:url('./imgs/blue/blue_long_turbo.png'); width: 832px; height: 105px"
                class="btn black"
                @click="setProgram('coldWater')"
              >
                <div class="button-title-long">{{ `${actives[2].title}` }}</div>
              </button>
              <button
                v-if="this.isDown.coldWater === true"
                style="background-image:url('./imgs/blue/blue_long_turbo_down.png'); width: 832px; height: 105px"
                class="btn black"
                @click="setProgram('coldWater')"
              >
                <div class="button-title-long">{{ `${actives[2].title}` }}</div>
              </button>
            </td>

            <td
              v-else-if="this.actives[8].display === 'none'"
              colspan="1"
              align="center"
              heigth="115px"
            >
              <button
                v-if="this.isDown.coldWater === false"
                style="background-image:url('./imgs/blue/blue_long.png'); width: 962px; height: 105px"
                class="btn black"
                @click="setProgram('coldWater')"
              >
                <div class="button-title-long">{{ `${actives[2].title}` }}</div>
              </button>
              <button
                v-if="this.isDown.coldWater === true"
                style="background-image:url('./imgs/blue/blue_long_down.png'); width: 962px; height: 105px"
                class="btn black"
                @click="setProgram('coldWater')"
              >
                <div class="button-title-long">{{ `${actives[2].title}` }}</div>
              </button>
            </td>
            <!-- /////////////////////////////////////////////////////////// -->

            <!-- <td colspan="1" v-if="this.actives[8].turbo === true"> -->
            <td
              colspan="1"
              v-if="
                this.actives[8].display !== 'none' &&
                  this.actives[8].turbo === true
              "
            >
              <button
                v-if="this.isDown.coldWater_turbo === false"
                style="height: 105px"
                class="btn x2"
                @click="setProgram('coldWater_turbo')"
              >
                <img src="imgs/turbo/turbo_up_an3.gif" />
              </button>
              <button
                v-if="this.isDown.coldWater_turbo === true"
                style="height: 105px"
                class="btn x2"
                @click="setProgram('coldWater_turbo')"
              >
                <img src="imgs/turbo/turbo_up_an4.gif" />
              </button>
            </td>
            <td colspan="1"></td>
          </tr>

          <!-- 9 -->
          <!-- ВОСК И ЗАЩИТА waxProtection -->
          <tr align="left" v-if="this.actives[3].display !== 'none'">
            <!-- ///////////////////////////////////// -->
            <!-- v-else-if="this.actives[8].display === 'none'" -->
            <td
              v-if="this.actives[9].display !== 'none'"
              colspan="1"
              align="center"
              heigth="115px"
            >
              <button
                v-if="this.isDown.waxProtection === false"
                style="background-image:url('./imgs/blue/blue_long_turbo.png'); width: 832px; height: 105px"
                class="btn black"
                @click="setProgram('waxProtection')"
              >
                <div class="button-title-long">{{ `${actives[3].title}` }}</div>
              </button>
              <button
                v-if="this.isDown.waxProtection === true"
                style="background-image:url('./imgs/blue/blue_long_turbo_down.png'); width: 832px; height: 105px"
                class="btn black"
                @click="setProgram('waxProtection')"
              >
                <div class="button-title-long">{{ `${actives[3].title}` }}</div>
              </button>
            </td>

            <td
              v-else-if="this.actives[9].display === 'none'"
              colspan="1"
              align="center"
              heigth="115px"
            >
              <button
                v-if="this.isDown.waxProtection === false"
                style="background-image:url('./imgs/blue/blue_long.png'); width: 962px; height: 105px"
                class="btn black"
                @click="setProgram('waxProtection')"
              >
                <div class="button-title-long">{{ `${actives[3].title}` }}</div>
              </button>
              <button
                v-if="this.isDown.waxProtection === true"
                style="background-image:url('./imgs/blue/blue_long_down.png'); width: 962px; height: 105px"
                class="btn black"
                @click="setProgram('waxProtection')"
              >
                <div class="button-title-long">{{ `${actives[3].title}` }}</div>
              </button>
            </td>

            <!-- ///////////////////////////////////// -->

            <!-- <td colspan="1" v-if="this.actives[9].turbo === true"> -->
            <td
              colspan="1"
              v-if="
                this.actives[9].display !== 'none' &&
                  this.actives[9].turbo === true
              "
            >
              <button
                v-if="this.isDown.waxProtection_turbo === false"
                style="height: 105px"
                class="btn x2"
                @click="setProgram('waxProtection_turbo')"
              >
                <img src="imgs/turbo/turbo_up_an3.gif" />
              </button>
              <button
                v-if="this.isDown.waxProtection_turbo === true"
                style="height: 105px"
                class="btn x2"
                @click="setProgram('waxProtection_turbo')"
              >
                <img src="imgs/turbo/turbo_up_an4.gif" />
              </button>
            </td>
            <td colspan="1"></td>
          </tr>

          <!-- 10 -->
          <!-- СУШКА И БЛЕСК dryShine-->

          <tr align="left" v-if="this.actives[4].display !== 'none'">
            <!-- /////////////////////////////////////////////// -->
            <td
              v-if="this.actives[10].display !== 'none'"
              colspan="1"
              align="center"
              heigth="115px"
            >
              <button
                v-if="this.isDown.dryShine === false"
                style="background-image:url('./imgs/blue/blue_long_turbo.png'); width: 832px; height: 105px"
                class="btn black"
                @click="setProgram('dryShine')"
              >
                <div class="button-title-long">{{ `${actives[4].title}` }}</div>
              </button>
              <button
                v-if="this.isDown.dryShine === true"
                style="background-image:url('./imgs/blue/blue_long_turbo_down.png'); width: 832px; height: 105px"
                class="btn black"
                @click="setProgram('dryShine')"
              >
                <div class="button-title-long">{{ `${actives[4].title}` }}</div>
              </button>
            </td>

            <td
              v-else-if="this.actives[10].display === 'none'"
              colspan="1"
              align="center"
              heigth="115px"
            >
              <button
                v-if="this.isDown.dryShine === false"
                style="background-image:url('./imgs/blue/blue_long.png'); width: 962px; height: 105px"
                class="btn black"
                @click="setProgram('dryShine')"
              >
                <div class="button-title-long">{{ `${actives[4].title}` }}</div>
              </button>
              <button
                v-if="this.isDown.dryShine === true"
                style="background-image:url('./imgs/blue/blue_long_down.png'); width: 962px; height: 105px"
                class="btn black"
                @click="setProgram('dryShine')"
              >
                <div class="button-title-long">{{ `${actives[4].title}` }}</div>
              </button>
            </td>

            <!-- /////////////////////////////////////////////// -->

            <!-- <td colspan="1" v-if="this.actives[10].turbo === true"> -->
            <td
              colspan="1"
              v-if="
                this.actives[10].display !== 'none' &&
                  this.actives[10].turbo === true
              "
            >
              <button
                v-if="this.isDown.dryShine_turbo === false"
                style="height: 105px"
                class="btn x2"
                @click="setProgram('dryShine_turbo')"
              >
                <img src="imgs/turbo/turbo_up_an3.gif" />
              </button>
              <button
                v-if="this.isDown.dryShine_turbo === true"
                style="height: 105px"
                class="btn x2"
                @click="setProgram('dryShine_turbo')"
              >
                <img src="imgs/turbo/turbo_up_an4.gif" />
              </button>
            </td>
            <td colspan="1"></td>
          </tr>

          <!-- !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! -->

          <!-- ПЫЛЕСОС vacuum -->
          <tr align="left">
            <td
              colspan="1"
              align="center"
              v-if="this.actives[16].display !== 'none'"
            >
              <button
                v-if="this.isDown.vacuum === false"
                style="background-image:url('./imgs/marin/marin_short.png'); width: 474px; height: 105px"
                class="btn black"
                @click="setProgram('vacuum')"
              >
                <div class="button-title-long">
                  {{ `${actives[16].title}` }}
                </div>
              </button>
              <button
                v-if="this.isDown.vacuum === true"
                style="background-image:url('./imgs/marin/marin_short_down.png'); width: 474px; height: 105px"
                class="btn black"
                @click="setProgram('vacuum')"
              >
                <div class="button-title-long">
                  {{ `${actives[16].title}` }}
                </div>
              </button>
            </td>

            <!-- ВОЗДУХ air -->
            <td
              colspan="1"
              align="center"
              v-if="this.actives[17].display !== 'none'"
            >
              <button
                v-if="this.isDown.air === false"
                style="background-image:url('./imgs/marin/marin_short.png'); width: 474px; height: 105px"
                class="btn black"
                @click="setProgram('air')"
              >
                <div class="button-title-long">
                  {{ `${actives[17].title}` }}
                </div>
              </button>
              <button
                v-if="this.isDown.air === true"
                style="background-image:url('./imgs/marin/marin_short_down.png'); width: 474px; height: 105px"
                class="btn black"
                @click="setProgram('air')"
              >
                <div class="button-title-long">
                  {{ `${actives[17].title}` }}
                </div>
              </button>
            </td>
          </tr>

          <!-- ОМЫВАТЕЛЬ washer -->

          <tr align="left">
            <td
              colspan="1"
              align="center"
              v-if="this.actives[18].display !== 'none'"
              style="width: 474px;"
            >
              <button
                v-if="this.isDown.washer === false"
                style="background-image:url('./imgs/marin/marin_short.png'); width: 474px; height: 105px"
                class="btn black"
                @click="setProgram('washer')"
              >
                <div class="button-title-long">
                  {{ `${actives[18].title}` }}
                </div>
              </button>
              <button
                v-if="this.isDown.washer === true"
                style="background-image:url('./imgs/marin/marin_short_down.png'); width: 474px; height: 105px"
                class="btn black"
                @click="setProgram('washer')"
              >
                <div class="button-title-long">
                  {{ `${actives[18].title}` }}
                </div>
              </button>
            </td>
            <!-- ТУРБОСУШКА TURBO DRYER turboDryer-->
            <td
              colspan="1"
              align="left"
              v-if="this.actives[26].display !== 'none'"
              style="width: 474px;"
            >
              <button
                v-if="this.isDown.turboDryer === false"
                style="background-image:url('./imgs/marin/marin_short.png'); width: 474px; height: 105px"
                class="btn black"
                @click="setProgram('turboDryer')"
              >
                <div class="button-title-long">
                  {{ `${actives[26].title}` }}
                </div>
              </button>
              <button
                v-if="this.isDown.turboDryer === true"
                style="background-image:url('./imgs/marin/marin_short_down.png'); width: 474px; height: 105px"
                class="btn black"
                @click="setProgram('turboDryer')"
              >
                <div class="button-title-long">
                  {{ `${actives[26].title}` }}
                </div>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapMutations, mapGetters, mapActions } from 'vuex'
import Message from '@/components/app/Message'
/* programs */
import ProgramTableDisk from '@/components/program/ProgramTableDisk'

export default {
  data: () => ({
    name: 'program-table',
    timeoutDelay: null,
    isVisible: false,
    //loading: true,
    //records: [],
    active: '',
    timeoutPopup: null,
    isDown: {
      disk: false,
      disk_x2: false,
      mosquito: false,
      mosquito_x2: false,
      brushFoam: false,
      brushFoam_color: false,
      brushFoam_x2: false,
      foam: false,
      foam_color: false,
      foam_x2: false,
      shampoo: false,
      shampoo_x2: false,
      waterShampoo: false,
      waterShampoo_turbo: false,
      warmWater: false,
      warmWater_turbo: false,
      coldWater: false,
      coldWater_turbo: false,
      waxProtection: false,
      waxProtection_turbo: false,
      dryShine: false,
      dryShine_turbo: false,
      washer: false,
      vacuum: false,
      turboDryer: false,
      air: false,
      brushShampoo: false
    }
  }),
  components: {
    Message,
    ProgramTableDisk
  },
  props: {
    actives: {
      required: true,
      type: Array
    },
    delay: {
      required: true,
      type: Number
    }
  },
  computed: {
    ...mapGetters({
      getPanelType: 'getPanelType',
      getDefaultPanelNumber: 'getDefaultPanelNumber',
      getActiveProgram: 'getActiveProgram',
      getWetBalance: 'getWetBalance'

      //getWetProgShow: 'getWetProgShow', // '116321902'
      //getWetProgStatus: 'getWetProgStatus',
      //getWetProgPrice: 'getWetProgPrice',
    })
  },
  methods: {
    ...mapActions({
      updateStartProgram: 'updateStartProgram'
    }),
    ...mapMutations({
      setActiveProgram: 'setActiveProgram'
    }),
    ...mapGetters({}),
    setProgram(program) {
      this.active = program
      this.setActiveProgram(this.active)
      this.setDown(program)

      this.updateStartProgram([
        this.getPanelType,
        this.getDefaultPanelNumber,
        this.getActiveProgram,
        this.getWetBalance
      ])

      this.timeoutPopup = setTimeout(() => {
        this.$router.push('/popup')
      }, 2000)
    },
    setDown(program) {
      this.clearDown()
      switch (program) {
        case 'disk':
          this.isDown.disk = true
          break
        case 'disk_x2':
          this.isDown.disk = true
          this.isDown.disk_x2 = true
          break
        case 'mosquito':
          this.isDown.mosquito = true
          break
        case 'mosquito_x2':
          this.isDown.mosquito = true
          this.isDown.mosquito_x2 = true
          break
        case 'brushFoam':
          this.isDown.brushFoam = true
          break
        case 'brushFoam_color':
          this.isDown.brushFoam = true
          this.isDown.brushFoam_color = true
          break
        case 'brushFoam_x2':
          this.isDown.brushFoam = true
          this.isDown.brushFoam_x2 = true
          break
        case 'foam':
          this.isDown.foam = true
          break
        case 'foam_color':
          this.isDown.foam = true
          this.isDown.foam_color = true
          break
        case 'foam_x2':
          this.isDown.foam = true
          this.isDown.foam_x2 = true
          break
        case 'shampoo':
          this.isDown.shampoo = true
          break
        case 'shampoo_x2':
          this.isDown.shampoo = true
          this.isDown.shampoo_x2 = true
          break
        case 'waterShampoo':
          this.isDown.waterShampoo = true
          break
        case 'waterShampoo_turbo':
          this.isDown.waterShampoo = true
          this.isDown.waterShampoo_turbo = true
          break
        case 'warmWater':
          this.isDown.warmWater = true
          break
        case 'warmWater_turbo':
          this.isDown.warmWater = true
          this.isDown.warmWater_turbo = true
          break
        case 'coldWater':
          this.isDown.coldWater = true
          break
        case 'coldWater_turbo':
          this.isDown.coldWater = true
          this.isDown.coldWater_turbo = true
          break
        case 'waxProtection':
          this.isDown.waxProtection = true
          break
        case 'waxProtection_turbo':
          this.isDown.waxProtection = true
          this.isDown.waxProtection_turbo = true
          break
        case 'dryShine':
          this.isDown.dryShine = true
          break
        case 'dryShine_turbo':
          this.isDown.dryShine = true
          this.isDown.dryShine_turbo = true
          break
        case 'washer':
          this.isDown.washer = true
          break
        case 'vacuum':
          this.isDown.vacuum = true
          break
        case 'turboDryer':
          this.isDown.turboDryer = true
          break
        case 'air':
          this.isDown.air = true
          break

        /*  */
        default:
          break
      }
    },
    clearDown() {
      this.isDown = Object.fromEntries(
        Object.entries(this.isDown).map(([key, value]) => [key, false])
      )
    },
    setup() {
    /* dev */
    this.actives[20].display = 'block'
    this.actives[23].display = 'block'

    this.actives[19].display = 'block'
    this.actives[22].display = 'block'

    }
  },
  mounted() {
    if (!this.isVisible) {
      this.timeoutDelay = setTimeout(() => {
        this.isVisible = true
      }, this.delay)
    }
  },
  beforeDestroy() {
    clearTimeout(this.timeoutDelay)
    clearTimeout(this.timeoutPopup)
  },
  created() {
    this.setup()
  }
}
</script>

<style scoped>
.message {
  position: absolute;
  margin-top: -10em;
  margin-left: 4em; /* 16em; */

  font-family: 'Plumb-Medium';
  font-weight: normal; /* bold; */
  z-index: 1;
}

table {
  position: absolute;
  margin-top: 16.5em; /*17.5em 18em; */
  margin-left: 0em; /* 33em; */

  font-family: 'Plumb-Medium';
  font-weight: bold;
  z-index: 1;

  /* margin: auto; */
  text-align: left;

  /* table-layout: fixed; */
}

tr {
  text-align: center;
  height: 115px;

  float: left;
}
td {
  padding-top: 0px;
  padding-bottom: 0px;
  padding-right: 0px;
  padding-left: 0px;

  height: 105px;
  width: 474px;

  /* border-style: solid;
  border-color: white; */
  /* float: left; */
}
.right-col {
  padding-right: 0rem;
  margin-left: -3rem;
}
.marin-short-rigth {
  padding-right: 6rem;
}
.turbo {
  background-color: #121212;
  width: 0rem;
  height: 0rem;

  /* position: absolute;
  top: 27.2%;
  left: 77.3%;
  opacity: 1; */
}
.x2 {
  background-color: #121212;
  width: 0rem;
  height: 0rem;

  /* position: absolute;
  top: 18.8%;
  left: 89.0%;
  opacity: 1; */
}
.color {
  border-color: white;
  background-color: #121212;
  width: 0rem;
  height: 0rem;

  /* position: absolute; */
  /* top: 18.8%; */
  /* left: 50.0%; */
  /* opacity: 1; */
}
/* *********************************** */
.button-title-long {
  position: relative;
  top: 0%;
  left: 6%;
  color: black;
  font-size: 3.5rem;
  font-weight: bold;
  text-align: left;

  font-family: 'Plumb-Medium';
}
/* Plumb-Medium */
.description {
  font-family: 'Plumb-Medium';
  font-size: 20px;
  font-weight: bold;
}
/*  */
.red-size {
  width: 704px;
  height: 105px;
}
/* dev */
.page-title {
  margin-top: -5em;
  margin-left: 0em;
  color: white;

  font-size: 3em;
  font-family: 'Plumb-Medium';
  font-weight: bold;
  z-index: 1;
}
.price {
  position: absolute;
  margin-top: 0em;
  margin-left: -1em;
}
</style>
