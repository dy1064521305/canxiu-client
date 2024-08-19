// #ifdef MP-WEIXIN
import $cache from '@/utils/cache.js';
import {
	Alert,
	Toast
} from '@/utils/index.js'
import {
	downloadFile
} from '@/utils/index.js'

const scopesObj = {
	album: {
		key: 'scope.writePhotosAlbum',
		label: '添加到相册'
	}
};

export default {

	getCode(reload) {
		return new Promise((resolve, reject) => {
			let code = $cache.get('WX_CODE') || '';
			if (reload != 1 && code) {
				return resolve(code);
			}
			uni.getProvider({
				service: 'oauth',
				success: (res) => {
					uni.login({
						provider: res.provider,
						success: (res) => {
							if (res.code) {
								$cache.set('WX_CODE', res.code, 300);
							}
							resolve(res.code);
						},
						fail: (err) => {
							reject('获取code失败' + err);
						}
					})
				},
				fail: (err) => {
					reject('授权失败' + err);
				}
			});
		})
	},

	refreshCode() {
		return new Promise((resolve, reject) => {
			// 使用之后清楚code，不能重复用
			$cache.clear('WX_CODE');
			// 重新获取code，因为这个版本要先获取code，再获取手机号信息
			setTimeout(() => {
				this.getCode().then(code => {
					resolve(code)
				}).catch(err => {
					reject(err);
				})
			}, 300);
		})
	},

	getUserProfile() {
		return new Promise((resolve, reject) => {
			uni.getUserProfile({
				lang: 'zh_CN',
				desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
				success(res) {
					resolve(res);
				},
				fail(res) {
					reject(res);
				}
			})
		})
	},

	hasScope(name) {
		return new Promise((resolve, reject) => {
			if (!name) return reject();
			let scopeName = scopesObj[name] ? scopesObj[name].key : name;

			wx.getSetting({
				success: (res) => {
					let has = res.authSetting[scopeName];
					if (!has) {
						reject();
					} else {
						resolve();
					}
				},
				fail: () => {
					reject()
				}
			})
		})
	},

	requestScope(name) {
		return new Promise((resolve, reject) => {
			this.hasScope(name).then(() => {
				resolve();
			}).catch(() => {
				let scopeName = name;
				let scopeNameText = '相关';
				if (scopesObj[name]) {
					scopeName = scopesObj[name].key;
					scopeNameText = '“' + scopesObj[name].label + '”';
				}
				wx.authorize({
					scope: scopeName,
					success: () => {
						resolve();
					},
					fail: (err) => {
						Alert('检测到您没打开' + scopeNameText + '权限，是否去设置打开？', 1).then(res => {
							if (res.confirm) {
								wx.openSetting({
									success: (res) => {
										resolve();
									},
									fail: (err) => {
										console.log(err)
										reject();
									}
								})
							} else {
								reject();
							}
						})
					}
				})
			})
		})
	},

	hasFile(url) {
		// 判断文件/目录是否存在
		const fs = wx.getFileSystemManager();
		try {
			return fs.accessSync(url)
		} catch (e) {
			console.error(e)
			return false;
		}
	},

	shareImage(url) {
		if (!url || typeof url != 'string') return;
		downloadFile(url, '下载中...', 1).then(path => {
			wx.showShareImageMenu({
				path,
				fail: (err) => {
					Toast(err);
				},
			})
		})
	},

	needOpenPrivacy() {
		return new Promise((resolve) => {
			// 2.32.3 版本后支持
			if (!wx.openPrivacyContract) return resolve(false);
			try {
				wx.getPrivacySetting({
					success: (res) => {
						return resolve(res.needAuthorization)
					},
					fail: (err) => {
						console.log(err)
						return resolve(false)
					}
				})
			} catch (err) {
				console.log(err)
				return resolve(false)
			}
		})
	},

	getSubscribeIds() {
		return new Promise((resolve, reject) => {
			wx.getSetting({
				withSubscriptions: true,
				success: (res) => {
					const {
						mainSwitch,
						itemSettings
					} = res.subscriptionsSetting;
					if (!mainSwitch) return resolve(false)
					return resolve(itemSettings)
				},
				fail: (res) => {
					console.log(res)
					reject(res)
				}
			})
		})
	},

	/**
	 * @description 请求订阅消息
	 * @param tmplIds {string | string[]} 模版id
	 */
	requestSubscribeMsg(tmplIds) {
		return new Promise((resolve, reject) => {
			if (!tmplIds) return reject({
				errorMsg: '缺少参数'
			});
			if (typeof tmplIds == 'string') {
				tmplIds = [tmplIds];
			};

			this.getSubscribeIds().then(idRes => {
				console.log(idRes, "idRes11");
				if (idRes === false) {
					Alert('是否开启通知', 1, {
						cancelText: '以后再说',
						confirmText: '立即开启'
					}).then(res => {
						if (res.confirm) {
							wx.openSetting({
								withSubscriptions: true,
							})
						}
						resolve(false);
					})
				} else if (!idRes) {
					wx.requestSubscribeMessage({
						tmplIds,
						success: (res) => {
							resolve(res);
						},
						fail: (res) => {
							reject(res)
						}
					})
				} else {
					let reqIds = [];
					// accept 同意；reject 拒绝；ban 被封；
					tmplIds.forEach(item => {
						if (!idRes[item] || idRes[item] == 'reject') {
							reqIds.push(item);
						}
					})
					if (!reqIds.length) {
						Toast('消息已订阅');
						resolve(true);
					} else {
						wx.requestSubscribeMessage({
							tmplIds: reqIds,
							success: (res) => {
								resolve(res)
							},
							fail: (res) => {
								reject(res)
							}
						})
					}
				}
			})
		})
	},

}
// #endif