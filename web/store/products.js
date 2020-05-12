import { Product } from '../models/Product'
import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  products: [],
  product: {},
  form: new Product()
})

export const getters = {
  getField,
}

export const mutations = {
  SET_PRODUCTS: (state, payload) => 
    state.products = payload,
  
  SET_PRODUCT: (state, payload) => 
    state.product = payload,

  REMOVE_PRODUCT: (state, payload) => {
    const index = state.product.findIndex(d => d.id == payload)
    state.product.splice(index, 1)
  },

  CLEAR_FORM: state => state.form = new Product(),

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
      const data = await this.$axios.$get('/api/products')

      commit('SET_PRODUCTS', data)
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
      const data = await this.$axios.$get(`/api/products/${payload.id}`)

      commit('SET_PRODUCT', data)
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
      await this.$axios.$post('/api/products', state.form)
      
      commit('CLEAR_FORM')
      await this.$helpers.notify({
        type: 'success',
        message: 'A new product has been added.',
      })
      dispatch('fetchAll')
    } catch (error) {
      console.log(error)
      return await this.$helpers.notify({
        type: 'error',
        message: 'An product was not added.',
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
      await this.$axios.$put(`/api/products/${payload.id}`, state.form)
      
      commit('CLEAR_FORM')
      dispatch('fetch', payload.id)
      await this.$helpers.notify({
        type: 'success',
        message: 'A product has been updated.',
      })
    } catch (error) {
      console.log(error)
      return await this.$helpers.notify({
        type: 'error',
        message: 'An product was not updated.',
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
      await this.$axios.$delete(`/api/products/${payload.id}`)
      
      commit('REMOVE_PRODUCT', payload.id)
      await this.$helpers.notify({
        type: 'success',
        message: 'A product has been removed.',
      })
    } catch (error) {
      console.log(error)
      return await this.$helpers.notify({
        type: 'error',
        message: 'A product was not removed.',
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
      await this.$axios.$get(`/api/products-archived/restore/${payload.id}`)

      dispatch('fetchAll')
      return await this.$helpers.notify({
        type: 'success',
        message: 'A product has been restored.',
      })
    } catch (error) {
      console.log(error)
      return await this.$helpers.notify({
        type: 'error',
        message: 'A product was not restored.',
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
      await this.$axios.$delete(`/api/products-archived/${payload.id}`)

      dispatch('fetchAll')
      return await this.$helpers.notify({
        type: 'success',
        message: 'A product has been permanently deleted.',
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