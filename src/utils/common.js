import Vue from 'vue'

export function getSidebarCollapse() {
  return Vue.ls.get('sidebar-collapse')
}

export function setSidebarCollapse(collapsed) {
  return Vue.ls.set('sidebar-collapse', collapsed)
}
