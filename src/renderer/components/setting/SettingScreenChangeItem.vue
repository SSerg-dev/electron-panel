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
import { stringify } from "querystring";
import Vue from "vue";
import { mapGetters, mapMutations } from "vuex";

export default Vue.extend({
  name: "setting-panel-item",
  
  props: {
    changeItemIds: {
      type: Array,
      required: false
    },
  }, 

  data: () => ({
    select: null,
    current: null,
    title: "",

    items: [
      { id: 1, title: "ДИСКИ" },
      { id: 2, title: "АНТИМОСКИТ" },
      { id: 3, title: "ШАМПУНЬ" },
      
    ],

  }),
  mounted() {

   console.log('changeItemIds-->',JSON.stringify(changeItemIds) )

    /* const changeItems = this.changeItemIds.map((id) => {
      const result = this.items.filter( item => item.id === id ) 
      return result  
    })
    console.log('changeItems-->', changeItems) */

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
    /* dev */
   //console.log('++this.chanmessagesgeItemIds-->', JSON.stringify(this.changeItemIds) )  
   //const arr = JSON.stringify(this.changeItemIds).split(',')
   //console.log('arr 0-->', arr[0])
   //console.log('arr 1-->', arr[1])
   //let str = JSON.stringify(this.changeItemIds)
   //str = str.slice(1)
   //str = str.slice(str.length)
   // console.log('str-->', str)  


   


    /* const changeItems = this.changeItemIds.map((id) => {
      const result = this.items.filter( item => item.id === id ) 
      return rJesult  
    })
    console.log('changeItems-->', changeItems) */
    /*     */

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
