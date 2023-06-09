import _ from 'lodash'
import store from '../store'

export default {
  data() {
    return {
      page: +this.$route.query.page || 1,
      pageSize: 12,
      pageCount: 0,
      allItems: [],
      items: [], 
    }
  },
  methods: {
    pageChangeHandler(page) {
      this.$router.push(`${this.$route.path}?page=${page}`)
      this.items = this.allItems[page - 1] || this.allItems[0]

      // console.log('$$ pagination.mixin.js: 19', page, this.items)
      
      store.state.paginate = page
    },
    setupPagination(allItems) {
      this.allItems = _.chunk(allItems, this.pageSize)
      this.pageCount = _.size(this.allItems)
      this.items = this.allItems[this.page - 1] || this.allItems[0]
    },

    
  }
}
