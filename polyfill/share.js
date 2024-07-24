export default {
	data() {
		return {
			shareTitle: '餐修-让维修更简单',
			sharePath: '/pages/home/index',
			shareImageUrl: 'https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/24/5217493e2f0a4041a21076db3058d121.jpg',
			pageTitle: '',
			pageRoute: null,
			pagePath: '',
			pageParams: '',
			pageFullPath: '',
			pageEnterTime: 0,
			pageLeaveTime: 0,
			lastFullPath: '',
			pageExposureExtraParam: {}
		}
	},
	onLoad(options) {
		this.setCurrentPage();
	},
	onShow() {
		this.pageEnterTime = new Date().getTime();
	},
	// #ifdef MP
	onShareAppMessage: function() {
		let path = this.getCurrentPageUrl(this.pageRoute)
		return {
			title: this.shareTitle,
			path: this.sharePath || path,
			imageUrl: this.shareImageUrl
		};
	},
	onShareTimeline: function() {
		let user = this.$store.state.userInfo;
		let uid = user && user.uid ? user.uid : '';
		let incode = user && user.invite_code ? user.invite_code : '';
		let path = this.getCurrentPageUrl(this.pageRoute)
		return {
			title: this.shareTitle,
			path: this.sharePath || path,
			imageUrl: this.shareImageUrl
		};
	},
	// #endif
	methods: {
		setCurrentPage() {
			const routes = getCurrentPages();
			if (!routes || !routes.length) return null;
			const app = getApp();
			const count = routes.length;
			const lastPage = count > 1 ? this.getCurrentPageUrl(routes[count - 2]) : '';
			this.lastFullPath = lastPage;
			app.globalData.lastPage = lastPage;
			const pageRoute = routes[count - 1];
			this.pageRoute = pageRoute;
			this.pagePath = pageRoute.route;
			this.pageParams = pageRoute.options;
			this.pageFullPath = this.getCurrentPageUrl(pageRoute);
			app.globalData.lastPage = this.pageFullPath;
		},
		getCurrentPageUrl(route, params) {
			if (!route) return '';
			params = params || {};
			let url = '/' + route.route;
			let options = {
				...route.options,
				...params
			};
			for (let k in options) {
				let val = options[k];
				if (url.indexOf('?') > -1) {
					url += '&';
				} else {
					url += '?';
				}
				url += k + '=' + val;
			}
			return url
		},
	},
}