import Vue from 'vue'

import '@/config/element-variables.scss'
import Element from 'element-ui'
Vue.use(Element)

import Storage from 'vue-ls';
import { STORAGE_OPTIONS } from '@/config/constantVariables'
Vue.use(Storage, STORAGE_OPTIONS);

import { configure } from '@storybook/vue';

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
