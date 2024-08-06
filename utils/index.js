import {
	TABBAR_PATH
} from '@/config/environment.js'
const {
	environment
} = require('@/config/environment.js')
import storage from '@/utils/storage'

export function numSimpWan(num) {
	if (!num) return 0;
	if (isNaN(num)) return num;
	return num > 9999 ? parseFloat((num / 10000).toFixed(2)) + '万+' : parseInt(num)
}

export function isTabber(url) {
	let route = url.indexOf('?') === -1 ? url : url.split('?')[0];
	return TABBAR_PATH.indexOf(route) > -1;
}

export function jumpUrl(url) {
	if (!url) return
	let methods = '';
	const methodsKey = '://'
	url = '' + url;
	let fullurl = url;
	if (url.indexOf(methodsKey) > 0) {
		let arr = url.split(methodsKey);
		methods = arr[0];
		url = arr[1];
	} else {
		if (!isTabber(url)) {
			methods = 'navigateTo'
		} else {
			methods = 'switchTab'
		}
	}

	if (url == '-1') {
		const routes = getCurrentPages();
		if (routes.length > 1) {
			return uni.navigateBack();
		} else {
			jumpUrl(TABBAR_PATH[0])
		}
	}

	switch (methods) {
		case 'http':
		case 'https':
			let weburl = methods + methodsKey + url
			// #ifdef H5
			return window.open(weburl)
			// #endif
			break;
		case 'navigateTo':
		case 'redirectTo':
		case 'reLaunch':
		case 'switchTab':
			if (url.indexOf('pages/') == 0) {
				url = '/' + url;
			}
			if (isTabber(url)) {
				methods = 'switchTab'
			}
			uni[methods]({
				url
			});
			break;
		case 'mp':
			openMiniProgram(parseQuery(url));
			break;
		case 'toast':
			Toast(url);
			break;
		case 'alert':
			Alert(url);
			break;
		case 'video':
			url = fullurl.replace(/video:\/\//, '');
			uni.navigateTo({
				url: `/pages/annex/video/index?url=${url}`
			});
			break;
		case 'switchBack':
			backToIndex();
			break;
	}
};

export function Toast(title, icon = 'none', duration = 1500) {
	icon = ['none', 'success', 'fail'].indexOf(icon) > -1 ? icon : 'none';
	return new Promise((resolve, reject) => {
		if (!title) return reject('缺少参数');
		uni.showToast({
			title,
			icon,
			duration,
			success: () => {
				setTimeout(() => {
					resolve()
				}, duration)
			}
		})
	})
}

export function Alert(title, isConfirm, options) {
	let content = '';
	if (title.length > 10) {
		content = title;
		title = '提示'
	}
	return new Promise((resolve, reject) => {
		if (!title) return reject('缺少参数');
		uni.showModal({
			title,
			content,
			showCancel: isConfirm == 1 ? true : false,
			confirmText: isConfirm == 1 ? '确认' : '我知道了',
			confirmColor: '#A4D091',
			cancelColor: '#303133',
			success: (res) => {
				resolve(res)
			},
			...options
		})
	})
};


export function copy(data, tip) {
	return new Promise(async (resolve, reject) => {
		if (!data) return reject();
		// let is = await checkPrivacy(1);
		// if (!is) return reject();
		uni.setClipboardData({
			data: '' + data,
			success: () => {
				tip = tip || '复制成功';
				tip && Toast(tip, 'success');
				resolve();
			},
			fail: (err) => {
				console.log(err)
				reject()
			}
		})
	})
}
// 截取URL中的参数
export function queryURLParams(url, paramName) {
	// 正则表达式模式，用于匹配URL中的参数部分。正则表达式的含义是匹配不包含 ?、&、= 的字符作为参数名，之后是等号和不包含 & 的字符作为参数值
	let pattern = /([^?&=]+)=([^&]+)/g;
	let params = {};

	// match用于存储正则匹配的结果
	let match;
	// while 循环和正则表达式 exec 方法来迭代匹配URL中的参数
	while ((match = pattern.exec(url)) !== null) {
		// 在字符串url中循环匹配pattern，并对每个匹配项进行解码操作，将解码后的键和值分别存储在key和value变量中
		let key = decodeURIComponent(match[1]);
		let value = decodeURIComponent(match[2]);

		if (params[key]) {
			if (Array.isArray(params[key])) {
				params[key].push(value);
			} else {
				params[key] = [params[key], value];
			}
		} else {
			// 参数名在 params 对象中不存在，将该参数名和对应的值添加到 params 对象中
			params[key] = value;
		}
	}

	if (!paramName) {
		// 没有传入参数名称, 返回含有所有参数的对象params
		return params;
	} else {
		if (params[paramName]) {
			return params[paramName];
		} else {
			return '';
		}
	}
}

/**
 * 跳转其他微信小程序
 * @param {String} params.appId
 * @param {String} params.path
 * @param {String} params.url 非小程序下起作用
 * @param {String} params.type develop（开发版），trial（体验版），release（正式版）
 */
export function openMiniProgram(params) {
	let env = params.env || 'release'
	// #ifdef MP
	if (!params.appId) return;
	return wx.navigateToMiniProgram({
		appId: params.appId,
		path: decodeURIComponent(params.path),
		envVersion: env
	});
	// #endif
	// #ifdef APP-PLUS
	if (params.ghid) {
		plus.share.getServices(
			res => {
				let sweixin = null;
				for (let i in res) {
					if (res[i].id == 'weixin') {
						sweixin = res[i];
					}
				}
				//唤醒微信小程序
				if (sweixin) {
					return sweixin.launchMiniProgram({
						id: params.ghid,
						type: params.type || 0, //小程序版本  0-正式版； 1-测试版； 2-体验版。
						path: decodeURIComponent(params.path)
					});
				} else {
					return Toast('未检测到微信')
				}
			}
		);
	}
	// #endif
	// #ifdef H5
	if (!params.url) return;
	return jumpUrl(decodeURIComponent(params.url));
	// #endif
}


export function uploadImageHandler(img, successCallback, errorCallback) {
	uni.showLoading({
		title: '图片上传中',
	});
	for (let i = 0; i < img.length; i++) {
		const path = img[i];
		console.log(path, 'path');
		(function(i) {
			setTimeout(function() {
				uni.uploadFile({
					url: environment.baseURL + '/system/oss/upload',
					filePath: path,
					fileType: 'image',
					name: 'file',
					formData: {
						'filename': 'pics'
					},
					header: {
						// #ifdef MP
						"Content-Type": "multipart/form-data",
						// #endif
						Authorization: 'Bearer ' + storage.get('AccessToken')
					},
					success: function(res) {
						uni.hideLoading();
						if (res.statusCode == 403) {
							Toast(res.data)
						} else {
							let data = res.data ? JSON.parse(res.data) : {};
							console.log(data, "data");;
							if (data.code == 200) {
								console.log(data, "@");
								let list = []
								list.push(data.data
									.url)
								successCallback && successCallback(list)
							} else {
								errorCallback && errorCallback(data);
								Toast(data.msg)
							}
						}
					},
					fail: function(res) {
						uni.hideLoading();
						Toast('上传图片失败');
					}
				});
				if (i == res.tempFiles.length - 1) {
					uni.hideLoading();
				}
			}, (i + 1) * 1000);
		})(i)
	}
}