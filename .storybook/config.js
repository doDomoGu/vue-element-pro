import Vue from 'vue'

import '@/config/element-variables.scss'
import Element from 'element-ui'
Vue.use(Element)

import Storage from 'vue-ls';
import { STORAGE_OPTIONS } from '@/config/constantVariables'
Vue.use(Storage, STORAGE_OPTIONS);

import { configure } from '@storybook/vue';
import { addParameters } from '@storybook/vue'; // <- or your storybook framework

addParameters({
  backgrounds: [
    { name: 'twitter', value: '#00aced', default: true },
    { name: 'facebook', value: '#3b5998' },
  ],
});


// import { addParameters } from '@storybook/vue';
// import { create } from '@storybook/theming';
// // Option defaults:
// addParameters({
//   options: {
//     theme: create({
//       base: 'light',
//       brandTitle: 'Storybook',
//       brandUrl: 'https://storybook.js.org',
//       // To control appearance:
//       // brandImage: 'http://url.of/some.svg',
//     }),
//     isFullScreen: false
//   },
// });

// automatically import all files ending in *.stories.js
// const req = require.context('../stories', true, /.stories.js$/);
// const req = require.context('../stories', true, /index.stories.js$/);
// function loadStories() {
//   req.keys().forEach(filename => req(filename));
// }

// configure(loadStories, module);

configure(() => require('../stories/index.stories.js'), module);