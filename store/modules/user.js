import {
	ACCESS_TOKEN,
	CLIENID
} from '@/store/mutation-types'
import storage from '@/utils/storage'
import * as LoginApi from '@/api/login'
import * as UserApi from '@/api/user'
import $cache from '@/utils/cache.js';
// 登陆成功后执行
const loginSuccess = (commit, result) => {
	// 过期时间30天
	const expiryTime = 30 * 86400
	// 保存tokne和userId到缓存
	storage.set(ACCESS_TOKEN, result.token, expiryTime)
	storage.set(CLIENID, result.clientId, expiryTime)
	// 记录到store全局变量
	commit('SET_TOKEN', result.token),
		commit('SET_CLIENTID', result.clientId)
}

export const state = {
	// 用户认证token
	token: $cache.get('AccessToken') || '',
	// 用户信息
	userInfo: null,
	clientId: '',
	loginPopShow: ""
}
export const getters = {
	isLogin: state => !!state.token,
}
export const mutations = {
	SET_TOKEN: (state, value) => {
		state.token = value
	},
	SET_CLIENTID: (state, value) => {
		state.clientId = value
	},
	SET_USER: (state, value) => {
		state.userInfo = value
		$cache.set('userInfo', userInfo);
	},
	CLOSE_LOGIN_POP(state) {
		state.loginPopShow = false;
	},
	OPEN_LOGIN_POP(state, info) {
		state.loginPopShow = true;
	},
	LOGOUT(state) {
		state.token = '';
		$cache.clear('AccessToken');
		state.userInfo = null;
		$cache.clear('userInfo');
	},
}

export const actions = {

	// 用户登录(普通登录: 输入账号、密码和验证码)
	Login({
		commit
	}, data) {
		return new Promise((resolve, reject) => {
			LoginApi.login(data, {
				custom: {
					catch: true
				}
			}).then(response => {
				const result = response.data;
				loginSuccess(commit, result)
				resolve(response)
			}).catch(reject)
		})
	},

	// 用户信息
	Info({
		commit,
		state
	}) {
		return new Promise((resolve, reject) => {
			if (state.userInfo) {
				return resolve(state.userInfo)
			}
			UserApi.getInfo().then(response => {
				const result = response;
				commit('SET_USER', result)
				resolve(response)
			}).catch(reject)
		})
	},

	// 退出登录
	Logout({
		commit
	}, data) {
		return new Promise((resolve, reject) => {
			uni.removeStorageSync(`isLogin${storage.get('ClientId')}`)
			//  LoginApi.logout(data, { custom: { catch: true } }).then(response => {
			storage.remove(ACCESS_TOKEN)
			storage.remove(CLIENID)

			commit('SET_TOKEN', '')
			commit('SET_CLIENTID', '')
			// resolve(response)
			//  }).catch(reject)
			$cache.clear('userInfo');
		})
	}
}