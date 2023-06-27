<template>
  <li>
    <!-- <button class="btn-small" @click="setLocale('en-GB')">
      <img src="@/assets/imgs/language/lang_EN.png" />
    </button> -->

    <button class="btn-small" @click="setLocale()">
      <img src="@/assets/imgs/language/lang_FIN.png" />
    </button>
    
  </li>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default Vue.extend({
  name: 'localize-item',
  props: ['item', 'index'],
  data: () => ({
    locale: '',
    flag: '',
  }),



  mounted() {
    this.locale = this.item.locale
    this.flag = 
    console.log('$$ LocalizeItem.vue: 33', this.locale)
    // this.locale = this.item[this.index].locale
    // this.flag = this.item[this.index].flag

  },
  computed: {
    ...mapGetters({
      getRouter: 'getRouter',
    }),
  },
  methods: {
    ...mapMutations({
      setInfo: 'setInfo',
      setPaginate: 'setPaginate',
    }),
    setLocale(/* locale */) {
      // this.locale = locale
      this.setInfo({
        name: this.name,
        locale: this.locale,
      })
      this.pushRouter()
    },
    pushRouter() {
      this.$router.push(this.getRouter)
    },
  },
})
</script>

<style scoped>

li {
  background: #121212;
  margin-right: 0;
  padding-bottom: 0;
  display: inline;
}
.btn,
.btn-large,
.btn-small {
  background-color: #121212;
  padding-bottom: 18em;
}

/*  */
/* :root {
  --image-path: url('../assets/imgs/language/lang_RU.png');
} */

/* img {
  src: var(--image-path);
} */

</style>
