import { CartProduct, create } from '../models/CartProduct'
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
   * Add item to shopping cart.
   * 
   * @param { Object } context 
   * @param { Object } payload 
   */
  async add({ state, commit, dispatch }, payload) {
    try {
      const item = {
        product_id: payload.id,
        price: payload.price
      }
      const data = create(item)
      
      // else if user is authenticated, save to DB
      if ( this.$auth.loggedIn ) {
        addToCart({
          strategy: 'api',
          data
        })
      }

      // if not authenticated, save to local storage
      else {
        addToCart({
          strategy: 'local',
          data
        })
      }
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

/**
 * Adds an item to the shopping cart.
 * 
 * @param { Object } payload 
 */
const addToCart = async (payload) => {
  // save the items into the shopping cart of a user in DB
  if (payload.strategy === 'api') {
    try {
      const res = await $nuxt.$axios.get(`/api/cart/add/${payload.data.product_id}/${payload.data.quantity}`)
      console.log('CartProduct response', res)
    } catch (error) {
      const statusCode = error.response.status || 500
      if (statusCode === 500) {
        return $nuxt.$helpers.notify({
          type: "error",
          message: "Can't add item to cart, it is already in your shopping cart.",
          position: {
            bottom: true,
            left: true
          }
        })
      }
    }
  }
  
  // only save the items in shopping cart locally
  else if (payload.strategy === 'local') {
    let cartProducts = JSON.parse(localStorage.getItem('cart_products'))
    if ( !cartProducts ) {
      localStorage.setItem('cart_products', JSON.stringify([]))
      cartProducts = JSON.parse(localStorage.getItem('cart_products'))
    }

    cartProducts.push(payload.data)    
    localStorage.setItem('cart_products', JSON.stringify(cartProducts))
    console.log('CartProduct added locally', cartProducts)
  }

  return await $nuxt.$helpers.notify({
    message: 'An item has been added to cart.',
    position: {
      bottom: true,
      left: true
    }
  })
}