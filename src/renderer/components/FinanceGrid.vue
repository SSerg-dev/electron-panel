<template>
  <div>
    <div class="page-title">
      <h1>
        <!-- | uppercase -->
        <p align="center">{{ `Учет денежных средств` }}</p>
      </h1>
    </div>

    <div id="grid-template">
      <table style="border: solid 3px #00b9e3">
        <!-- <thead>
          <tr>
            <th
              v-for="(column, index) in columns"
              :key="index"
              @click="sortBy(key)"
              :class="{ active: sortKey == key }"
            >
              {{ key | capitalize }}
              <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
              </span>
            </th>
          </tr>
        </thead> -->

        <tbody>
          <tr
            style="border: solid 3px #00b9e3"
            v-for="(item, index) in items"
            :key="index"
          >
            <!-- <td class="cell-style" >
            {{ ` ${ index + 1 } ` }}
            {{ ` ${ JSON.stringify(item)  } ` }}  
            </td> -->

            <td
              class="cell-style"
              v-for="(column, index) in columns"
              :key="index"
            >
              <!-- {{ ` ${ index + 1 } ` }}
            {{ ` ${ JSON.stringify(column)  } ` }}   -->

              <!-- {{ column[index] }} -->
              {{ column }}
            </td>
          </tr>
        </tbody>

        <!-- <tbody>
          <tr style="border: solid 3px #00b9e3">
            <td class="cell-style">
              {{ `A1` }}
            </td>
            <td>
              {{ `A2` }}
            </td>
          </tr>
          <tr>
            <td
              style="
                text-align: left;
                padding-left: 1em;
                border-top: solid 3px #00b9e3;
              "
            >
              {{ `B1` }}
            </td>
            <td style="border-top: solid 3px #00b9e3">
              {{ `B2` }}
            </td>
          </tr>

          <tr>
            <td class="cell-style">
              {{ `D1` }}
            </td>
            <td>
              {{ `D2` }}
            </td>
          </tr>
        </tbody> -->
      </table>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  name: 'finance-grid',

  data: () => ({
    filterKey: '',
    columns: ['date', 'cash', 'card', 'bonus', 'service'],
    items: [
      { date: 1, cash: 11, card: 22, bonus: 33, service: 44 },
      { date: 2, cash: 11, card: 22, bonus: 33, service: 44 },
      { date: 3, cash: 11, card: 22, bonus: 33, service: 44 },
      { date: 4, cash: 11, card: 22, bonus: 33, service: 44 },
    ],
  }), // end data

  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
  },

  computed: {
    // ...mapGetters({}),
    
  },
  created() {},
  mounted() {},
})
</script>

<style scoped>
.page-title {
  margin-top: 4em;
  margin-bottom: 2em;
  /* margin-left: 16.5em; */
  padding-top: 0em;
  color: white;
}
.cell-style {
  text-align: left;
  padding-left: 1em;
}
table {
  margin-top: 0em; /* 20em; */
  margin-left: 3.8em;
  color: white;
  border: 1px solid;
  border-color: white;
  width: 90%;
}
th {
  border: 1px solid;
  border-color: white;
  font-size: 2em;
  text-align: center;
}
td {
  border: 1px solid;
  border-color: white;
  font-size: 2em;
  text-align: center;
  /* border-left-color: aqua; */
}
</style>
