export const state = () => ({
  // 
})

export const getters = {
  isSuperAdmin: state => hasRole('super administrator', state.auth.user.roles),
  isAdmin: state => hasRole('administrator', state.auth.user.roles),
}

export const mutations = {
  // 
}

export const actions = {
  // 
}

// Private Method
// Checks if user contains role specified
const hasRole = (roles, role) => roles.includes(role) 