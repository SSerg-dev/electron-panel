<template>
  <div>
    <div>
      <div class="items">
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
    items: [],
  }),
  created() {
    this.setup() 
  },
  mounted() {
    // this.setup()
  },
  methods: {
    setup() {
      this.items = this.localizes
    },
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


</style>
