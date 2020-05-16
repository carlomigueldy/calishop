export default ({ app, store }, inject) => {
  inject('helpers', {
    /**
     * Displays a snackbar alert.
     * 
     * message: String e.g. 'You have logged in.'
     * type: String [success, info, error]
     * 
     * @param { Object } 
     * @returns { Void }
     */
    notify ({ 
      message = '', 
      type = '', 
      position = {
        top: true,
        bottom: false,
        right: false,
        left: false
      } 
    } = {}) {
      store.dispatch('alerts/execute', { message, type, position })
    },

    // Add more ...
  })
}