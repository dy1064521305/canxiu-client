<template>
	<view class="box acea-row row-center-wrapper">
		<Loading></Loading>
		<text class="text">加载中...</text>
	</view>
</template>

<script>
	import Loading from '@/components/Loading/index.vue';
	export default {
		name: 'LoadingMore',
		components: {
			Loading
		}
	}
</script>

<style scoped lang="scss">
	.box {
		width: 100%;
		height: 60rpx;
	}

	.text {
		font-size: 24rpx;
		margin-left: 12rpx;
		color: #666;
	}
</style>
