<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
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
	}
</script>

<style lang="scss">

</style>
