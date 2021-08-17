
<template>
  <div>
  <ul class="sidenav app-sidenav" :class="{open: value}">

    <router-link
      v-for="(link, index) in links"
      :key=index
      tag="li"
      active-class="active"
      :to="link.url"
      :exact="link.exact"
    >
      <a href="#" class="waves-effect Default pointer">{{link.title}}</a>
    </router-link>
  </ul>
  </div>
</template>

<script>

export default {
  props: ['value'],
  data: () => ({
    links: [
      { title: 'СТОИМОСТЬ ПРОГРАММ', url: '/cost', exact: true },
      { title: 'НАЛИЧНЫМИ', url: '/cash' },
      { title: 'БАНКОВСКОЙ КАРТОЙ', url: '/card' },
      { title: 'БОНУСАМИ', url: '/bonuses' }

    ]
  })

}
</script>

<style scoped>
  .sidenav {
    margin-top: 3em;
  }
</style>


