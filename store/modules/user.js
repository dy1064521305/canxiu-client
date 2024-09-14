import {
	ACCESS_TOKEN,
	CLIENID
} from '@/store/mutation-types'
import storage from '@/utils/storage'
import * as LoginApi from '@/api/login'
import * as UserApi from '@/api/user'
import {
	putImmediate
} from "@/api/brand.js"
import $cache from '@/utils/cache.js';
import {
	Toast
} from '@/utils/index'

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
	UPDATE_USERPARTNER(state, userInfo) {
		state.userInfo = userInfo;
		$cache.set('userPartner', userInfo);
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
	// 用户登录快捷登录
	LOGIN({
		commit
	}, data) {
		// commit('UPDATE_TOKEN', data.token, data.expires_time);
		return new Promise((resolve, reject) => {
			LoginApi.postLoginPartner(data, {
				custom: {
					catch: true
				}
			}).then(res => {
				const result = res.data;
				loginSuccess(commit, result)
				resolve(res.data);
				// type： 新用户：Register  老用户：Success
				// token
				// clientId，
				// isPartner: true 是否是合伙人

			}).catch(err => {
				Toast(err);
				reject(err);
			}).finally(() => {
				uni.$emit('LOGIN');
			})
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

	/**
	 * 获取合伙人信息
	 * @param {Number} force 默认 使用本地缓存 1 强制重新获取
	 */
	USERPARTNER({
		commit
	}, force) {
		return new Promise((resolve, reject) => {
			let cacheUser = $cache.get('userPartner', true);
			if (force !== 1 && cacheUser && cacheUser.clientId) {
				return resolve(cacheUser);
			}
			putImmediate($cache.get('ClientId')).then(res => {
				commit('UPDATE_USERPARTNER', res.data);
				resolve(res);
			}).catch(err => {
				Toast(err);
				reject(err);
			})
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
			$cache.clear('AccessToken');
			$cache.clear('userInfo');
		})
	}
}