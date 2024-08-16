const environment = {
	// 开发环境配置
	development: {
		// 本地部署的后端
		// baseURL: 'http://192.168.41.7:8080',
		// baseURL: 'http://192.168.111.238:8080',
		// baseURL: 'http://121.41.107.68:8080',
		//baseURL: 'http://192.168.124.12:8080',
		// 后端永奇
		// baseURL: 'http://192.168.100.123:8080',
		// 王攀
		// baseURL: 'http://192.168.100.122:8080',
		// baseURL: 'http://121.40.253.155:8080',
		baseURL: 'https://www-test.canxiukeji.com/prod-api',
		// baseURL: 'https://www.canxiukeji.com/prod-api',

	},
	// 生产环境配置
	production: {
		// baseURL: 'http://121.41.107.68:8080' ,// 发布时需要修改为后端实际地址
		// baseURL: 'http://121.40.253.155:8080' ,// 发布时需要修改为后端实际地址
		baseURL: 'https://www-test.canxiukeji.com/prod-api',
		// baseURL: 'https://www.canxiukeji.com/prod-api',
	}
}

module.exports = {
	environment: environment[process.env.NODE_ENV],
	// 缓存时间 0 永久
	EXPIRE: 0,
	// 首页底部菜单页
	TABBAR_PATH: [
		'/pages/home/index',
		'/pages/service/service',
		'/pages/TUI-Conversation/conversation/conversation',
		'/pages/order/order',
		'/pages/center/index',
	],
}