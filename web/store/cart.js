import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  cart: {},
  products: []
})

export const getters = {
  getField,
}

export const mutations = {
  SET_CART: (state, payload) => 
    state.cart = payload,

  REMOVE_CART: (state, payload) => {
    const index = state.cart.findIndex(d => d.id == payload)
    state.cart.splice(index, 1)
  },

  CLEAR_FORM: state => state.form = new Cart(),

  updateField,
}

export const actions = {
  /**
   * Fetch all resources.
   * 
   * @param { Object } context 
   */
  async fetchAll({ commit }) {
    try {
      const data = await this.$axios.$get('/api/cart')

      commit('SET_CART', data)
    } catch (error) {
      console.log(error)
      return await this.$helpers.notify({
        type: 'error',
        message: 'Unable to retrieve data.'
      })
    }
  },

  /**
   * Fetch a single resource.
   * 
   * @param { Object } payload
   * # must have id 
   */
  async fetch({ commit }, payload) {
    try {
      const data = await this.$axios.$get(`/api/cart/${payload.id}`)

      commit('SET_CART', data)
    } catch (error) {
      console.log(error)
      return await this.$helpers.notify({
        type: 'error',
        message: 'Unable to retrieve data.'
      })
    }
  },

  /**
   * Add new data.
   * 
   * @param { Object } context 
   * @param { Object } payload 
   */
  async create({ state, commit, dispatch }) {
    try {
      await this.$axios.$post('/api/cart', state.form)
      
      commit('CLEAR_FORM')
      await this.$helpers.notify({
        type: 'success',
        message: 'A new cart has been added.',
      })
      dispatch('fetchAll')
    } catch (error) {
      console.log(error)
      return await this.$helpers.notify({
        type: 'error',
        message: 'An cart was not added.',
      })
    }
  },

  /**
   * Updates a single resource based on id.
   * 
   * @param { Object } context 
   * @param { Object } payload 
   */
  async update({ state, commit, dispatch }, payload) {
    try {
      await this.$axios.$put(`/api/cart/${payload.id}`, state.form)
      
      commit('CLEAR_FORM')
      dispatch('fetch', payload.id)
      await this.$helpers.notify({
        type: 'success',
        message: 'A cart has been updated.',
      })
    } catch (error) {
      console.log(error)
      return await this.$helpers.notify({
        type: 'error',
        message: 'An cart was not updated.',
      })
    }
  },

  /**
   * Soft deletes a resource.
   * 
   * @param { Object } context 
   * @param { Object } payload 
   */
  async destroy({ commit, dispatch }, payload) {
    try {
      await this.$axios.$delete(`/api/cart/${payload.id}`)
      
      commit('REMOVE_CART', payload.id)
      await this.$helpers.notify({
        type: 'success',
        message: 'A cart has been removed.',
      })
    } catch (error) {
      console.log(error)
      return await this.$helpers.notify({
        type: 'error',
        message: 'A cart was not removed.',
      })
    }
  },

  /**
   * Restores a softly deleted resource.
   * 
   * @param { Object } context 
   * @param { Object } payload 
   */
  async restore({ dispatch }, payload) {
    try {
      await this.$axios.$get(`/api/cart-archived/restore/${payload.id}`)

      dispatch('fetchAll')
      return await this.$helpers.notify({
        type: 'success',
        message: 'A cart has been restored.',
      })
    } catch (error) {
      console.log(error)
      return await this.$helpers.notify({
        type: 'error',
        message: 'A cart was not restored.',
      })
    }
  },

  /**
   * Deletes a resource permanently.
   * 
   * @param { Object } context 
   * @param { Object } payload 
   */
  async forceDestroy({ commit, dispatch }, payload) {
    try {
      await this.$axios.$delete(`/api/cart-archived/${payload.id}`)

      dispatch('fetchAll')
      return await this.$helpers.notify({
        type: 'success',
        message: 'A cart has been permanently deleted.',
      })
    } catch (error) {
      console.log(error)
      return await this.$helpers.notify({
        type: 'error',
        message: 'Could not process your request.',
      })
    }
  },
}