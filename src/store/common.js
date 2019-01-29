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
  SetCollapsed: (state) => {
    state.collapse = true
    state.aSideWidth = '64px'
  },
  SetOpened: (state) => {
    state.collapse = false
    state.aSideWidth = '300px'
  },


  /* SetCollapse: (state, data) => {
    state.collapse = data
  },
  SetASideWidth: (state, data) => {
    state.aSideWidth = data
  }, */
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
