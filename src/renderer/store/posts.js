export default {
  state: {
    posts: [{ id: '', title: '', body: '', userId: '' }]
  },
  actions: {
  // Post
  async fetchPosts({ commit, getters, dispatch }, limit = 3) {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts?_limit=' + limit
      )
      const posts = await response.json()
      commit('updatePosts', posts)
    } catch (e) {
      console.warn('Error:', e.message)
    }
  },
  },
  getters: {
    // Post
    validPosts(state) {
      return state.posts.filter(p => {
        return p.title && p.body
      })
    },
    postsCount(state, getters) {
      return getters.validPosts.length
    },
    // Param
    validParams(state) {
      return state.params.filter(p => {
        return p.title && p.value
      })
    },
    paramsCount(state, getters) {
      return getters.validParams.length
    }
  },

  mutations: {
    // Post
    updatePosts(state, posts) {
      state.posts = posts
    },
    createPost(state, newPost) {
      state.posts.unshift(newPost)
      console.log('posts', state.posts)
    },
    // Param
    updateParams(state, params) {
      state.params = params
    }
  }
}
