<template>
  <div>
    <div class="page-title">
      <h1>
        <!-- | uppercase -->
        <p align="center">{{ `Учет денежных средств` }}</p>
      </h1>
    </div>

    <div id="grid-template">
      <table>
        <thead>
          <tr style="border: solid 3px #00b9e3">
            <th
              v-for="(column, index) in columns"
              :key="index"
              @click="sortBy(columns[index], index)"
              :class="{ active: sortKey == columns[index] }"
            >
              <!-- {{ columns[index] | capitalize }} -->
              {{ titles[index] | capitalize }}
              <span
                class="arrow"
                :class="sortOrders[index] > 0 ? 'asc' : 'dsc'"
              >
              </span>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            
            v-for="(item, index) in filteredItems"
            :key="index"
          >
            <td
              class="cell-style"
              v-for="(column, index) in columns"
              :key="index"
            >
              {{ item[columns[index]] }}
            </td>
          </tr>
        </tbody>
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
    sortKey: '',
    sortOrders: {},
    index: -1,

    // columns: ['date', 'cash', 'card', 'bonus', 'service'],
    // timestamp
    columns: ['timestamp', 'amountCash', 'card', 'bonus', 'service'],
    titles: ['дата', 'наличные', 'безналичние', 'бонусы', 'сервисные'],

    items: [],

    delay: 0,
    timeoutDelay: null,

  }), // end data

  methods: {
    sortBy: function (key, index) {
      this.index = index
      this.sortKey = key
      this.sortOrders[index] = this.sortOrders[index] * -1
      // console.log('$$ this.index', this.index, this.sortKey, this.sortOrders[index])
      // --------------------------------

      // --------------------------------
    },
  },
  computed: {
    ...mapGetters({
      getFinanceCollect: 'getFinanceCollect',
    }),
    filteredItems: function () {
      // console.log('$$ filteredItems', this.sortKey)
      const sortKey = this.sortKey
      const filterKey = this.filterKey && this.filterKey.toLowerCase()
      const order = this.sortOrders[sortKey] || 1

      let items = this.items
      if (filterKey) {
        items = items.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        items = items.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return items
    },
  },
  created() {
    this.timeoutDelay = setTimeout(() => {
      /* data */
      this.items = this.getFinanceCollect
    }, this.delay)

  },
  mounted() {
    // [
    //   { date: 1, cash: 41, card: 21, bonus: 31, service: 41 },
    //   { date: 2, cash: 32, card: 22, bonus: 32, service: 42 },
    //   { date: 3, cash: 23, card: 23, bonus: 33, service: 43 },
    //   { date: 4, cash: 14, card: 24, bonus: 34, service: 44 },
    // ]
    if (this.columns) {
      this.columns.forEach((column, index) => {
        this.sortOrders[index] = 1
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
  /* margin-left: 16.5em; */
  padding-top: 0em;
  color: white;
}
.cell-style {
  text-align: center;
  padding-left: 0em;
   
  border: solid 1px white
  
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
</style>
