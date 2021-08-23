<template>
  <div class="col s12">
    <div
      class="card grey lighten-3"
      style="height: 80px; border: solid 3px #00B9E3; border-radius: 2rem; margin-left:7.5em;"
    >
      <div class="card-content black-text">
        <div class="input-field" style="margin-top: -0.5em;">
            <select class="page-title white-text" ref="select" v-model="current">    
            <option v-for="(n, index) in items" :key="index" :value="n.id">
              <div class="dropdown-setting">
                {{ n.title }}
              </div>
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapMutations } from "vuex";

export default Vue.extend({
  name: "setting-panel-item",
  data: () => ({
    select: null,
    current: null,
    title: "",

    items: [
      { id: 1, title: "Цветную пену" },
      { id: 2, title: "ОБЕЗЖИРИВАНИЕ" },
      { id: 3, title: "ПОРОГИ" },
      
    ],

  }),
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select, {
      constrainWidth: true,
    });
    M.updateTextFields();
  },
  methods: {
    ...mapGetters({
      //getDefaultPanelNumber: "getDefaultPanelNumber",
    }),
    ...mapMutations({
      //setDefaultPanelNumber: "setDefaultPanelNumber",
    }),
  },
  computed: {
    ...mapGetters({
      //getPanelType: "getPanelType",
    }),
  },
  watch: {
    current(itemId) {
      //console.log('itemId-->', itemId)
      const { id, title } = this.items.find((n) => n.id === itemId);
      this.select = title;
      //this.setDefaultPanelNumber(id);
    },
  },
  created() {
    //const defaultPanelNumber = this.getDefaultPanelNumber();
    //const { id, title } = this.items[defaultPanelNumber - 1];

    const { id, title } = this.items[0];
    this.current = id;
    this.select = title; 
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
});
</script>

<style scoped>

.input-field {
  margin-left: 0em;
  margin-top: 0em;
}

</style>
