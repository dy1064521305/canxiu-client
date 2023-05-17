<template>
	<view>

	</view>
</template>

<script>
	export default {
		onLoad() {
			const value = uni.getStorageSync('launchFlag');
			if (value) {
				// 如何已经有，直接去home首页
				uni.navigateTo({
					url: '/pages/welcome/welcome'
				});
			} else {
				// 没有值，跳到引导页，并存储，下次打开就不会进去引导页
				uni.setStorage({
					key: 'launchFlag',
					data: true
				});
				uni.redirectTo({
					url: '/pages/swiper/swiper'
				});
			}
		},
		methods: {
			// getList() {
			// 	//维修车列表
			// 	getCarList({
			// 		clientId: storage.get('ClientId')
			// 	}).then(res => {
			// 		console.log(res,'<<<<<<<<<<getCarList>>>>>>>>>>>',storage.get('ClientId'));

			// 		let allNum = 0
			// 		res.data.forEach(item => {
			// 			allNum += item.children.length

			// 		})
			// 		uni.setTabBarBadge({ //显示数字
			// 			index: 2, //tabbar下标
			// 			text: String(allNum) //数字
			// 		})
			// 	})
			// },
		}
	}
</script>

<style lang="scss">

</style>
