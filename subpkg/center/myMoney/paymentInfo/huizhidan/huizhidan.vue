<template>
	<view class="huizhidan">
		<img v-for="(img,i) in imgs" :key="i" :src="img" style="width: 100%;height: 700rpx;" @click='imgPre(i)' mode=''>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {},
				imgs: []
			};
		},
		onLoad(option) {

			this.info = JSON.parse(option.info)
			console.log(this.info);
				this.imgs = this.info.receipt.split(',')
		},
		methods: {
			imgPre(i) {
				uni.previewImage({
					current: i,
					urls: this.imgs
				});

			}
		}
	}
</script>

<style lang="scss">
</style>