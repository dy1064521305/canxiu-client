const environment = {
	// 开发环境配置
	development: {
		baseURL: 'http://vue.ruoyi.vip/prod-api'
	},
	// 生产环境配置
	production: {
		baseURL: 'http://vue.ruoyi.vip/prod-api'
		// baseURL: 'https://fastbuild.run:443',
	}
}
export default environment[process.env.NODE_ENV];