import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  type: null,
  show: false,
  message: null,
  vertical: false,
  timeout: 6000,
  color: 'dark',
  absolute: false,
  position: {
    top: true,
    bottom: false,
    left: false,
    right: false,
  },
})

export const getters = {
  getField,
}

export const mutations = {
  executeAlert: (state, payload) => {
    state.show = true
    state.type = payload.type || null
    state.message = payload.message || null
    state.color = payload.color || 'dark'
  },
  
  updateField,
}

export const actions = {
  /**
   * Triggers the snackbar.
   * 
   * @param { Boolean } show 
   * @param { String } message 
   * @param { String } type # success or error 
   */
  execute({ commit }, payload) {
    commit('executeAlert', payload)
  },
}