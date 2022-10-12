<template>
  <div>
    <div class="page-title">
      <h1>
        <!-- | uppercase | capitalize -->
        <p align="center">{{ `Cash_accounting` | localize }}</p>
      </h1>
    </div>
    <div class="scroll-">
      <table>
        <thead>
          <tr style="border: solid 3px #00b9e3">
            <th
              v-for="(column, index) in columns"
              :key="index"
              @click="sortBy(columns[index])"
              :class="{ active: sortKey == columns[index] }"
            >
              <div>
                <div
                  :class="[
                    { 'opacity-one': index <= 1 },
                    { 'opacity-half': index > 1 },
                  ]"
                >
                  {{ titles[index] | capitalize | localize }}
                  <span
                    class="arrow"
                    :class="sortOrders[columns[index]] > 0 ? 'asc' : 'dsc'"
                  >
                  </span>
                </div>
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, itemIndex) in filteredItems" :key="itemIndex">
            <td
              class="cell-style"
              v-for="(column, columnIndex) in columns"
              :key="columnIndex"
            >
              {{ item[columns[columnIndex]] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { log } from 'util'
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  name: 'finance-grid',

  data: () => ({
    // filterKey: '',
    sortKey: '',
    sortOrders: {},
    index: -1,

    columns: ['timestamp', 'amountCash', 'card', 'bonus', 'service'],
    titles: ['Date', 'Cash', 'Cashless', 'Bonus', 'Service'],

    items: [],

    delay: 0,
    timeoutDelay: null,
    isChange: false,
  }), // end data

  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
      this.isChange = !this.isChange
    },
  },
  computed: {
    ...mapGetters({
      getFinanceCollect: 'getFinanceCollect',
    }),
    filteredItems: function () {
      const sortKey = this.sortKey
      const order = this.sortOrders[sortKey] || 1
      let items = this.items

      if (sortKey) {
        items = items.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      this.isChange
      return items
    },
  },
  created() {
    this.timeoutDelay = setTimeout(() => {
      /* get data */
      this.items = this.getFinanceCollect
    }, this.delay)
  },
  mounted() {
    if (this.columns) {
      this.columns.forEach((key) => {
        this.sortOrders[key] = 1
      })
    }
  },
  beforeDestroy() {
    clearTimeout(this.timeoutDelay)
  },
})
</script>

<style scoped>
.page-title {
  margin-top: 4em;
  margin-bottom: 2em;
  margin-left: 0em;
  padding-top: 0em;
  color: white;
}
.cell-style {
  text-align: center;
  padding-left: 0em;

  border: solid 1px white;
}
table {
  margin-top: 0em; /* 20em; */
  margin-left: 3.8em;
  color: white;
  border: 3px solid;
  border-color: #00b9e3;
  width: 90%;
}
th {
  border: 1px solid;
  color: white; /* rgb(200, 200, 200); */
  border-color: white;
  font-size: 2em;
  text-align: center;

  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
th.active {
  color: #00b9e3;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}
td {
  border: 1px solid;
  border-color: white;
  font-size: 2em;
  text-align: center;
  /* border-left-color: aqua; */
}
.opacity-one {
  opacity: 1;
}
.opacity-half {
  opacity: 0.5;
}
div.scroll {
  /* margin: 4px, 4px; */
  /* padding: 4px; */
  background-color: black;
  width: 71em;
  height: 22em;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: justify;
}
</style>
