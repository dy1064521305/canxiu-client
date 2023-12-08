const environment = {
	// 开发环境配置
	development: {
		// 本地部署的后端
	//	baseURL: 'http://192.168.111.58:8080',
			 baseURL: 'http://192.168.124.12:8080',
		//baseURL: 'http://121.41.107.68:8080',
		
	},
	// 生产环境配置
	production: {
		baseURL: 'http://121.41.107.68:8080' // 发布时需要修改为后端实际地址
	}
}

module.exports = {
  environment: environment[process.env.NODE_ENV]
}
