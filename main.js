import Vue from 'vue'
import App from './App'

import Common from './static/js/common.js'
import Config from './static/js/config.js'

Vue.prototype.$Common = Common
Vue.prototype.$Config = Config

Vue.config.productionTip = false

App.mpType = 'app'

import store from '@/store';
let vuexStore = require('@/store/$u.mixin.js');
Vue.mixin(vuexStore);

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);

const app = new Vue({
	store,
    ...App
})

import httpInterceptor from '@/common/http.interceptor.js'
Vue.use(httpInterceptor, app)

app.$mount()


