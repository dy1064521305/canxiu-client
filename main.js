import App from './App'
import Vue from 'vue'
import uView from 'uni_modules/uview-ui'
//全局分享
import mixinShare from '@/polyfill/share.js'
// 全局mixins，用于实现setData等功能';
import Mixin from './polyfill/mixins';
import {
	jumpUrl,
	copy,
	Toast,
	Alert
} from '@/utils'
Vue.mixin(Mixin);

Vue.use(uView)
Vue.mixin(mixinShare)
// canxiuclientalias
// canxiu
Vue.config.productionTip = false

// 全局方法
Vue.prototype.$toast = Toast
Vue.prototype.$alert = Alert
Vue.prototype.$jump = jumpUrl
Vue.prototype.$copy = copy
App.mpType = 'app'

import store from '@/store';
// 全局的暂无数据
import EmptyPage from '@/components/empty/emptyPage.vue'
Vue.component('empty-page', EmptyPage);
// 顶部的距离
import StatusBar from '@/components/StatusBar.vue'
Vue.component('status-bar', StatusBar);

const app = new Vue({
	store,
	...App
})

// 引入请求封装，将app参数传递到配置中
require('@/config/http.interceptor.js')(app)

app.$mount()