/*
    state: {},
    actions: {},
    getters: {},
    mutations: {},
    modules: {}
*/

export default {
  state: {
    status: -1,
    messages: [
      'Подключение к банковскому терминалу...',
      'Не удалось подключитьсяк банковскому терминалу',
      'Время ожидания истекло',
      'Операция одобрена',
      'Операция отклонена',
      'Следуйте инструкциям на терминале'
    ],
    messageIndex: -1
  },
  actions: {
    // fetchStatus
    async fetchStatus({ commit, getters, dispatch }, limit = 6) {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/posts?_limit=' + limit
        )
        const status = await response.json()
        /* console.log('!!!fetchStatus-->', JSON.stringify(status[4].id)) */
        commit('setStatusBill', JSON.stringify(status[5].id))
      } catch (e) {
        console.warn('Error:', e.message)
      }
      //console.log('!!!fetchStatus-->')
    }
  },
  getters: {
    getStatusBill(state) {
      return state.status
    },

    getStatusBillMessages(state) {
      return state.messages[state.messageIndex]
    }
  },
  mutations: {
    setStatusBill(state, status) {
      state.status = status
      console.log('state.status-->', state.status)
    },
    setStatusBillMessagesIndex(state, index) {
      state.messageIndex = index
      /* console.log('state.messageIndex-->', state.messageIndex) */
      console.log('state.messageIndex-->', index)
    }
  }
}
