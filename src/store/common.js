const state = {
  collapse: false,
}

const actions = {
  
}

const getters = {
  collapse: state => state.collapse,
}

const mutations = {
  SetCollapse: (state, collapse) => {
    state.collapse = collapse
  },
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
