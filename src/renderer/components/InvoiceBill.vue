<template>
  <div class="invoice-bill">
    <div class="page-title">
      <p align="center">{{ `ИП КОЛОМИЕЦ ВИКТОР ВИТАЛЬЕВИЧ` }}</p>
      <p align="center">{{ `г. Санкт-Петербург` }}</p>
    </div>

    <table >
      <tbody>
        <tr>
          <td class="td-left">{{ `КАССОВЫЙ ЧЕК / ПРИХОД` }}</td>
          <td class="td-right">{{ `№ док: 999` }}</td>
        </tr>
        <tr>
          <td class="td-left">{{ `Кассир` }}</td>
          <td class="td-right">{{ `Коломиец В.В` }}</td>
        </tr>
        <tr>
          <td class="td-left">{{ `Услуги автомойки` }}</td>
          <td class="td-right">{{ ` = 1` }}</td>
        </tr>
        <tr>
          <td class="td-left">{{ `ИТОГ :` }}</td>
          <td class="td-right">{{ ` = 1` }}</td>
        </tr>
        <tr>
          <td class="td-left">{{ `НАЛИЧНЫМИ :` }}</td>
          <td class="td-right">{{ ` = 1` }}</td>
        </tr>
        <tr>
          <td class="td-left">{{ `Сумма НДС :` }}</td>
          <td class="td-right">{{ ` без НДС` }}</td>
        </tr>
        <tr>
          <td class="td-left">{{ `РН ККТ : 0004910320025320` }}</td>
          <td class="td-right">{{ `ИНН : 343600164360` }}</td>
        </tr>
        <tr class="space"></tr>
        <tr>
          <td class="td-left">{{ `ЗН ККТ : 550101013289` }}</td>
          <td class="td-right">{{ `` }}</td>
        </tr>
        <tr>
          <td class="td-left">{{ `19.08.2022 02:01` }}</td>
          <td class="td-right">{{ `` }}</td>
        </tr>
        <tr>
          <td class="td-left">{{ `ФД 2154` }}</td>
          <td class="td-right">{{ `` }}</td>
        </tr>
        <tr>
          <td class="td-left">{{ `ФН 9287440300907662` }}</td>
          <td class="td-right">{{ `` }}</td>
        </tr>
        <tr>
          <td class="td-left">{{ `ЧЕК : 6` }}</td>
          <td class="td-left">{{ `СМЕНА : 413` }}</td>
        </tr>
        <tr>
          <td class="td-left">{{ `СНО : Патент` }}</td>
          <td class="td-right">{{ `` }}</td>
        </tr>
        <tr>
          <td class="td-left">{{ `Сайт ФНС www.nalog.ru` }}</td>
          <td class="td-right">{{ `` }}</td>
        </tr>

      </tbody>
    </table>

    <div class="page-title">
      <p align="center">{{ `Автомойка самообслуживания` }}</p>
    </div>
    
  </div>
</template>

<script>
import Vue from 'vue'

import { mapGetters, mapMutations } from 'vuex'

export default Vue.extend({
  data: () => ({
    name: 'invoice-bill',
  }),
  computed: {},
  methods: {},
  mounted() {},
  components: {},
})
</script>

<style scoped>
.invoice-bill {
  height: 72em;
  padding-top: 4em;
  border-radius: 2px;
}
.page-title {
  font-size: 2em;
  margin-top: 0em;
  margin-bottom: 0em;
  margin-left: 0em; /* 16em; */
  padding-top: 0em;
  color: rgb(100, 100, 100);
}
.cell-style {
  /* text-align: left; */
  padding-left: 1em;
}
table {
  margin-top: 4em;
  margin-bottom: 4em;
  margin-left: 3em;
  color: rgb(100, 100, 100);
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
  /* text-align: center; */
  /* border-left-color: aqua; */
}
.td-left{
  text-align: left;
  width: 50%;
}
.td-right{
  text-align: right;
}
.space {
  height: 2em;
}
</style>
