import { User, mapUser } from '../models/User.js'
import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  archivedUsers: [],
  archivedUser: {},
  users: [],
  user: {},
  form: new User()
})

export const getters = {
  activeUsers: state => state.users
    .filter(data => data.authorized)
    .map( mapUser ),

  inactiveUsers: state => state.users
    .filter(data => !data.authorized)
    .map( mapUser ),

  archivedUsers: state => state.archivedUsers
    .map( mapUser ),
  
  getField,
}

export const mutations = {
  SET_ARCHIVED_USERS: (state, payload) => 
    state.archivedUsers = payload,

  SET_ARCHIVED_USER: (state, payload) =>
    state.archivedUser = payload,
  
  SET_USERS: (state, payload) => 
    state.users = payload,

  SET_USER: (state, payload) =>
    state.user = payload,

  REMOVE_USER: (state, payload) => {
    const index = state.users.findIndex(d => d.id == payload)
    state.users.splice(index, 1)
  },

  CLEAR_FORM: state => state.form = new User(),

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
      const data = await this.$axios.$get('/api/users')

      console.assert(data.length > 0, "No users found")
      commit('SET_USERS', data)
    } catch (error) {
      console.log(error)
      return await this.$helpers.notify({
        type: 'error',
        message: 'Unable to retrieve data.'
      })
    }
  },

  /**
   * Fetch all resources.
   * 
   * @param { Object } context 
   */
  async fetchAllDeactivated({ commit }) {
    try {
      const data = await this.$axios.$get('/api/users')

      console.assert(data.length > 0, "No users found")
      commit('SET_USERS', data)
    } catch (error) {
      console.log(error)
      return await this.$helpers.notify({
        type: 'error',
        message: 'Unable to retrieve data.'
      })
    }
  },

  /**
   * Fetch all archived resources.
   * 
   * @param { Object } context 
   */
  async fetchAllArchived({ commit }) {
    try {
      const data = await this.$axios.$get('/api/users-archived')

      console.assert(data.length > 0, "No users found")
      commit('SET_ARCHIVED_USERS', data)
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
      const data = await this.$axios.$get(`/api/users/${payload.id}`)

      commit('SET_USER', data)
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
  async fetchArchived({ commit }, payload) {
    try {
      const data = await this.$axios.$get(`/api/users-archived/${payload.id}`)

      commit('SET_ARCHIVED_USER', data)
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
      await this.$axios.$post('/api/users', state.form)
      
      commit('CLEAR_FORM')
      await this.$helpers.notify({
        type: 'success',
        message: 'A new user has been added.',
      })
      dispatch('fetchAll')
    } catch (error) {
      console.log(error)
      return await this.$helpers.notify({
        type: 'error',
        message: 'An user was not added.',
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
      await this.$axios.$put(`/api/users/${payload.id}`, state.form)
      
      commit('CLEAR_FORM')
      dispatch('fetch', payload.id)
      await this.$helpers.notify({
        type: 'success',
        message: 'A user has been updated.',
      })
    } catch (error) {
      console.log(error)
      return await this.$helpers.notify({
        type: 'error',
        message: 'An user was not updated.',
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
      await this.$axios.$delete(`/api/users/${payload.id}`)
      
      commit('REMOVE_USER', payload.id)
      await this.$helpers.notify({
        type: 'success',
        message: 'A user has been removed.',
      })
    } catch (error) {
      console.log(error)
      return await this.$helpers.notify({
        type: 'error',
        message: 'A user was not removed.',
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
      await this.$axios.$get(`/api/users-archived/restore/${payload.id}`)

      dispatch('fetchAll')
      return await this.$helpers.notify({
        type: 'success',
        message: 'A user has been restored.',
      })
    } catch (error) {
      console.log(error)
      return await this.$helpers.notify({
        type: 'error',
        message: 'A user was not restored.',
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
      await this.$axios.$delete(`/api/users-archived/${payload.id}`)

      dispatch('fetchAll')
      return await this.$helpers.notify({
        type: 'success',
        message: 'A user has been permanently deleted.',
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