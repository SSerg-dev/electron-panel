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
      /* 'Подключение к банковскому терминалу...' */
      `Connection_to_the_bank_terminal`,
      /* 'Не удалось подключитьсяк банковскому терминалу' */
      `Failed_to_connect_to_the_bank_terminal`,
      /* 'Время ожидания истекло' */
      `Timed_out`,
      /* 'Операция одобрена' */
      `Operation_approved`,
      /* 'Операция отклонена' */
      `Operation_rejected`,
      /* 'Следуйте инструкциям на терминале' */
      `Follow_the_instructions_on_the_terminal`
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
    },
    setStatusBillMessagesIndex(state, messageIndex) {
      state.messageIndex = messageIndex - 0  /* 0 - 5 */
    }
  }
}
