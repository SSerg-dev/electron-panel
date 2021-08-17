<template>
  <div>
    <h1>{{ 'Params = ' + paramsCount}}</h1>
    <!-- <h4>{{ getWetProgShow }}</h4> -->


    <div class="post" v-for="(post, index) in validPosts"
    :key="index">
      <h3>{{ post.title }}</h3>
      <p>{{ post.body }}</p>
    </div>

    <!-- <div class="param" v-for="(param, index) in validParams"
    :key="index">
      <h6>{{ (index + 1) +
        '    ' +
        param.title +
        '    value = ' +
        param.value }}</h6>
    </div> -->

    <!-- <PostForm /> -->

  </div>
</template>

<script >

import Vue from 'vue'
import { mapGetters,  mapActions } from "vuex"
import PostForm from '@/components/PostForm'

export default Vue.extend({

  computed: mapGetters({
    validPosts: 'validPosts',
    postsCount: 'postsCount',
    /* validParams: 'validParams', */
    paramsCount: 'paramsCount',
    getWetProgShow: 'getWetProgShow'
  }),

  methods: mapActions({
    fetchPosts: 'fetchPosts'
    /* validParams: 'validParams' */

  }),

  async mounted() {
    this.fetchPosts()
    /* this.validParams() */
  },
  components: { PostForm }
})
</script>

<style>
.done {
  text-decoration: line-through;
}
.param {
  border: 1px solid white;
  border-radius: 5px;
  margin-bottom: 1rem;
  color: white;
  width: 80%;
  margin-left: 5rem;
  padding-left: 2rem;
}
h2 {
  color: white;
}
h1 {
  color: white;
}
h4 {
  color: white;
}
</style>
