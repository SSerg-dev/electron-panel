<template>
  <div>
    <div>
      <div class="items">
        <!-- <ul>
          <li>
            <button class="btn-small" @click="setLocale('ru-RU')">
              <img :src="imagePath" />
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
        </ul> -->

        <ul>
          <LocalizeItem
            v-for="(item, index) in items"
            :item="item"
            :index="index"
            :key="index"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import LocalizeItem from '@/components/LocalizeItem'

export default Vue.extend({
  name: 'localize-list',
  props: ['localizes'],
  data: () => ({
    locale: '',

    // ------------------------------------
    imagePath: require('@/assets/imgs/language/lang_FIN.png'),
    // imagePath: require(this.items[0].flag),

    items: [],
  }),
  // ------------------------------------
  created() {
    this.setup()
  },
  mounted() {
    this.changeImage()
  },
  computed: {
    ...mapGetters({
      info: 'info',
      getRouter: 'getRouter',
    }),
  },

  methods: {
    ...mapGetters({}),
    ...mapMutations({}),

    changeImage() {
      // this.imagePath = require(`@/assets/imgs/language/lang_KZ.png`)
      // this.imagePath = require(this.items[0].flag)
      // if (`@/assets/imgs/language/lang_KZ.png` === this.items[2].flag) {
      //   console.log('$$ LocalizeList.vue: 108', true)
      // }
      // console.log('$$ LocalizeList.vue: 113', this.items[0].flag)
    },

    pushRouter() {
      this.$router.push(this.getRouter)
    },
    // ----------------------------------
    setup() {
      this.items = this.localizes
      // console.log('$$ LocalizeList.vue: 130', this.items[0].flag)
    },
    // ----------------------------------
  },
  components: {
    LocalizeItem,
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

/* :root {
  --image-path: url('../assets/imgs/language/lang_RU.png');
} */

/* img {
  src: var(--image-path);
} */
</style>
