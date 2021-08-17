<template>
  <div>
    <div class="page-title">
      <h3>
          Popup screen<br />
          Помощь клиенту
      </h3>
    </div>

    <section>
      <div class="row">
        <div><PopupType /></div>
      </div>
    </section>
  </div>
</template>

<script  >

import Vue from 'vue'
import { mapMutations } from 'vuex'
import PopupType from '@/components/PopupType'

export default Vue.extend({
  data: () => ({
  }),
  computed: {
  },
  methods: {
    ...mapMutations({
      setRouter: 'setRouter'
    })
  },
  mounted() {
    this.setRouter('/popup')
  },
  components: {
    PopupType
  },
})
</script>

<style scoped>
.row {
  padding-top: 15rem;
  padding-left: 4rem;
}
.page-title {
  padding-top: 30px;
  color: white;
  margin-left: auto;
  margin-right: auto;
  width: 50em;
  align-items: center;
}

</style>
