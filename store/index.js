import Vue from 'vue'
import Vuex from 'vuex'
import $cache from '@/utils/cache.js';
import * as UserApi from '@/api/user'
import * as LoginApi from '@/api/login'
import {
	Toast
} from '@/utils/index'
Vue.use(Vuex)

const files = require.context("./modules", false, /\.js$/);
let modules = {
	state: {
		return: {
			// token: $cache.get('token') || '',
			// userInfo: $cache.get('userInfo', true),
		}
	},
	getters: {
		// uid: state => {
		// 	if (!state.userInfo) return 0
		// 	return state.userInfo.clientId || 0
		// },
		// isLogin: state => !!state.token,
	},
	mutations: {
		// UPDATE_TOKEN(state, token, expires_time) {
		// 	state.token = token;
		// 	$cache.set('token', token, expires_time);
		// },
		// UPDATE_USERINFO(state, userInfo) {
		// 	state.userInfo = userInfo;
		// 	$cache.set('userInfo', userInfo);
		// },
		// LOGOUT(state) {
		// 	state.token = '';
		// 	$cache.clear('token');
		// 	state.userInfo = null;
		// 	$cache.clear('userInfo');
		// },
	},
	actions: {
		// LOGIN({
		// 	commit
		// }, data) {
		// 	commit('UPDATE_TOKEN', data.token, data.expires_time);
		// 	return new Promise((resolve, reject) => {
		// 		setTimeout(() => {
		// 			LoginApi.login(data, {
		// 				custom: {
		// 					catch: true
		// 				}
		// 			}).then(res => {
		// 				commit('UPDATE_USERINFO', res.data);
		// 				resolve(res.data);
		// 			}).catch(err => {
		// 				Toast(err);
		// 				reject(err);
		// 			}).finally(() => {
		// 				uni.$emit('LOGIN');
		// 			})
		// 		}, 300)
		// 	})
		// },
		// /**
		//  * 获取用户信息
		//  * @param {Number} force 默认 使用本地缓存 1 强制重新获取
		//  */
		// USERINFO({
		// 	commit
		// }, force) {
		// 	return new Promise((resolve, reject) => {
		// 		let cacheUser = $cache.get('userInfo', true);
		// 		if (force !== 1 && cacheUser && cacheUser.clientId) {
		// 			return resolve(cacheUser);
		// 		}
		// 		UserApi.getInfo().then(res => {
		// 			commit('UPDATE_USERINFO', res);
		// 			resolve(res);
		// 		}).catch(err => {
		// 			Toast(err);
		// 			reject(err);
		// 		})
		// 	})
		// },
	},
};

files.keys().forEach((key) => {
	Object.assign(modules.state, files(key)["state"] || {});
	Object.assign(modules.mutations, files(key)["mutations"] || {});
	Object.assign(modules.actions, files(key)["actions"] || {});
	Object.assign(modules.getters, files(key)["getters"] || {});
});
console.log(modules, "modules");
const store = new Vuex.Store(modules);
export default store;