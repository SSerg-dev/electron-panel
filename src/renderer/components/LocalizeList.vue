<template>
  <div>
    <div>
      <div class="items">
        <ul>
          <li>
            <button class="btn-small" @click="setLocale('ru-RU')">
              <!-- <img src= this.items[0].flag /> -->
              <img id="flag" src="@/assets/imgs/language/lang_RU.png"/>
            </button>
          </li>
          <li>
            <button class="btn-small" @click="setLocale('en-GB')">
              <img src="@/assets/imgs/language/lang_EN.png" />
            </button>
          </li>
          <li>
            <button class="btn-small" @click="setLocale('kz-KZ')">
              <img src="@/assets/imgs/language/lang_KZ.png" />
            </button>
          </li>

          <!-- <li>
            <button class="btn-small" @click="setLocale('ru-RU')">
              <img src="@/assets/imgs/language/lang_RU.png" />
            </button>
          </li>
          <li>
            <button class="btn-small" @click="setLocale('en-GB')">
              <img src="@/assets/imgs/language/lang_EN.png" />
            </button>
          </li>
          <li>
            <button class="btn-small" @click="setLocale('kz-KZ')">
              <img src="@/assets/imgs/language/lang_KZ.png" />
            </button>
          </li> -->

          
          <!-- <li>
            <button class="btn-small" @click="setLocale('ru-RU')">
              <img src="@/assets/imgs/language/lang_RU.png" />
            </button>
          </li>
          <li>
            <button class="btn-small" @click="setLocale('en-GB')">
              <img src="@/assets/imgs/language/lang_EN.png" />
            </button>
          </li>
          <li>
            <button class="btn-small" @click="setLocale('kz-KZ')">
              <img src="@/assets/imgs/language/lang_KZ.png" />
            </button>
          </li> -->


        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default Vue.extend({
  name: 'localize-list',
  props: ['localizes'],
  data: () => ({
    locale: '',

    // ------------------------------------
    flagPath: '@/assets/imgs/language/',
    items: [],

    languages: [],
    orderLanguageItems: [],
    selectedLanguages: [],
    selectedItems: [],
  }),
  // ------------------------------------
  created() {
    this.setup()
  },
  mounted() {
    document.onload = this.flag()
    
  },
  computed: {
    ...mapGetters({
      info: 'info',
      getRouter: 'getRouter',
    }),
  },

  methods: {
    ...mapGetters({
      getLanguageNatives: 'getLanguageNatives',
      getConfig: 'getConfig',
    }),
    ...mapMutations({
      setInfo: 'setInfo',
    }),
    flag() {
      // document.getElementById('flag').src = "@/assets/imgs/language/lang_RU.png" //this.items[0].flag
      // document.getElementById('flag').src = "@/assets/imgs/language/lang_RU.png"
      console.log('$$ LocalizeList.vue: 108', document.getElementById('flag').src)
    },

    setLocale(locale) {
      this.locale = locale
      this.setInfo({
        name: this.name,
        locale: this.locale,
      })
      this.pushRouter()
    },
    pushRouter() {
      this.$router.push(this.getRouter)
    },
    // ----------------------------------
    setup() {
      this.items = this.localizes
      // console.log('$$ LocalizeList.vue: 124', this.items[0].flag)
      // document.getElementById('flag').src = "@/assets/imgs/language/lang_RU.png" //this.items[0].flag

    },
    // ----------------------------------
  },
})
</script>

<style scoped>
.page-title {
  padding-top: 6em;
  color: white;
  margin-right: 2em;
}
.back {
  position: fixed;
  top: 11em;
  left: 2.5em;
  z-index: 99;
}

.items {
  /* border: solid white; */
  background: #121212;
  margin: 6em auto;
  margin-left: 4em;
  padding: 0 0;
}
.items li {
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
</style>
