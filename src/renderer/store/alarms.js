/*
    state: {},
    actions: {},
    getters: {},
    mutations: {},
    modules: {}
*/

export default {
  state: {
    alarms: {
      messages: [

        `Check_out_another_post`,
        `Take_screenshot_of_ your_balance`,
        `Contact_the_operator`,
        `Call_tech_support`,
      ],
      messageIndex: -1,
      phone: ''
    },

  }, // end state

  actions: {
  },
  getters: {
    getAlarmsPhone(state) {
      return state.alarms.phone
    },
    getAlarmsMessages(state) {
      // return  state.alarms.messages[state.alarms.messageIndex]
      return  state.alarms.messages 
    }
  },
  mutations: {
    setAlarmsPhone(state, phone) {
      state.alarms.phone = phone
    },
    setAlarmsMessages(state, messages) {
      state.alarms.messages = messages 
    },
  }
}
