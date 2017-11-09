import actions from './actions.js'

const state = {
  messages: []
}

const getters = {
  messages: state => {
    return state.messages
  }
}

const mutations = {
  ADD_MESSAGE: (state, message) => {
    state.messages.push(message)
  },
  REMOVE_MESSAGE: (state, id) => {
    state.messages.some(function(message, index) {
      if (message.id == id) {
        state.messages.splice(index, 1)
      }
    })
  }
}

const module = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default module
