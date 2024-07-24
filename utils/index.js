import {
	TABBAR_PATH
} from '@/config/environment.js'

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
			confirmColor: '#FF7700',
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