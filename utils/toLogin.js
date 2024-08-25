import LoginPop from '@/components/popup/login'

export default {
	install(Vue) {
		const Profile = Vue.extend(LoginPop)
		// 弹出登录
		Vue.prototype.$openLogin = function(params) {
			const instance = new Profile()
			instance._props._specia = params
			instance.vm = instance.$mount()
			const query = uni.createSelectorQuery().in(this);
			console.log(query, "query")
			console.log(document, "document")
			const LoginEle = document.body.lastElementChild
			query.select('.popLogin').boundingClientRect((rect) => {
				// 获取 body 元素的最后一个子元素
				console.log(rect, "rect")
				const lastElementChild = rect ? rect.lastElementChild : null;
				console.log(lastElementChild, "lastElementChild")
			}).exec();
			console.log(LoginEle, "LoginEle")
			console.log(LoginEle.className, "****123");
			if (LoginEle.className === 'popLogin') return
			setTimeout(() => document.body.appendChild(instance.vm.$el))
			return instance
		}

		// 关闭登录
		Vue.prototype.$closeLogin = function() {
			const instance = new Profile()
			instance.vm = instance.$mount()
			// const LoginEle = document.body.lastElementChild
			// console.log(this.$refs, "InviteEle123");
			// const query = uni.createSelectorQuery().in(this);
			// console.log(query, "query123")
			// query.select('.popLogin').boundingClientRect((rect) => {
			// 	// 获取 body 元素的最后一个子元素
			// 	console.log(rect, "rect12323")
			// 	const lastElementChild = rect ? rect.lastElementChild : null;
			// 	console.log(lastElementChild, "lastElementChild")
			// }).exec();
			// if (LoginEle.className !== 'popLogin') return
			// console.log(LoginEle, "InviteEle");
			document.body.removeChild(LoginEle)
			return instance
		}
	}
}