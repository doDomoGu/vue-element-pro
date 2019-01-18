const state = {
  collapse: false,
  aSideWidth: '300px'
}

const actions = {
  
}

const getters = {
  collapse: state => state.collapse,
  aSideWidth: state => state.aSideWidth,
}

const mutations = {
  SetCollapse: (state, data) => {
    state.collapse = data
  },
  SetASideWidth: (state, data) => {
    state.aSideWidth = data
  },
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
