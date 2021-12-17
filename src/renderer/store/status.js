/*
    state: {},
    actions: {},
    getters: {},
    mutations: {},
    modules: {}
*/

export default {
  state: {
    messageStatus: -1,
    messages: [
      'Подключение к банковскому терминалу...',
      'Не удалось подключитьсяк банковскому терминалу',
      'Время ожидания истекло',
      'Операция одобрена',
      'Операция отклонена',
      'Следуйте инструкциям на терминале'
    ],
    messageIndex: -1
  }, // end state

  actions: {
    /* async fetchStatus({ commit, getters, dispatch }, limit = 6) {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/posts?_limit=' + limit
        )
        const messageStatus = await response.json()
        commit('setStatusBill', JSON.stringify(messageStatus[5].id))
      } catch (e) {
        console.warn('Error:', e.message)
      }
    } */
  },
  getters: {
    getStatusBill(state) {
      return state.messageStatus
    },
    getStatusBillMessages(state) {
      return state.messages[state.messageIndex]
    }
  },
  mutations: {
    setStatusBill(state, messageStatus) {
      state.messageStatus = messageStatus
      // console.log('state.messageStatus-->', state.messageStatus)
    },
    setStatusBillMessagesIndex(state, messageIndex) {
      state.messageIndex = messageIndex
    }
  }
}
