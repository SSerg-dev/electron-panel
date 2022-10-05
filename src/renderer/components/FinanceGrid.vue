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
        <thead>
          <tr>
            <th
              v-for="(column, index) in columns"
              :key="index"
              @click="sortBy(columns[index])"
              :class="{ active: sortKey == columns[index] }"
            >
              
              {{ columns[index] | capitalize }}
              
              <span 
              class="arrow" :class="sortOrders[columns[index]] > 0 ? 'asc' : 'dsc'">
              </span>
            
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            style="border: solid 3px #00b9e3"
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
    columns: ['date', 'cash', 'card', 'bonus', 'service'],
    items: [
      { date: 1, cash: 11, card: 21, bonus: 31, service: 41 },
      { date: 2, cash: 12, card: 22, bonus: 32, service: 42 },
      { date: 3, cash: 13, card: 23, bonus: 33, service: 43 },
      { date: 4, cash: 14, card: 24, bonus: 34, service: 44 },
    ],
    /* dev */
    sortKey: '',
    sortOrders: {},
  }), // end data

  methods: {
    sortBy(key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
      console.log('$$ this.sortKey', this.sortKey)
    },
  },

  computed: {
    // ...mapGetters({}),
    filteredItems: function () {
      let sortKey = this.sortKey
      let filterKey = this.filterKey && this.filterKey.toLowerCase()
      let order = this.sortOrders[sortKey] || 1
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
      console.log('$$ items', items)
      return items
    },
  },
  created() {},
  mounted() {
    // this.columns.forEach(function (key) {
    //   this.sortOrders[key] = 1
    // })
    // console.log('$$ this.columns', this.columns)

    /* data */
    this.columns.array.forEach((column, index) => {
      this.sortOrders[index] = 1
    })
    console.log('$$ this.columns', this.columns, this.sortOrders)
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
