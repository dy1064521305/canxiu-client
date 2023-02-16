const environment = {
	// 开发环境配置
	development: {
		// 本地部署的后端
		baseURL: 'http://localhost:8080',
	},
	// 生产环境配置
	production: {
		baseURL: '' // 发布时需要修改为后端实际地址
	}
}

module.exports = {
  environment: environment[process.env.NODE_ENV]
}
