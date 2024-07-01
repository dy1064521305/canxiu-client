import App from './App'
import Vue from 'vue'
import uView from 'uni_modules/uview-ui'

// 全局mixins，用于实现setData等功能';
import Mixin from './polyfill/mixins';
Vue.mixin(Mixin);

Vue.use(uView)

// canxiuclientalias
// canxiu
Vue.config.productionTip = false

App.mpType = 'app'

import store from '@/store';
// 全局的暂无数据
import EmptyPage from '@/components/empty/emptyPage.vue'
Vue.component('empty-page', EmptyPage);

const app = new Vue({
	store,
	...App
})

// 引入请求封装，将app参数传递到配置中
require('@/config/http.interceptor.js')(app)

app.$mount()