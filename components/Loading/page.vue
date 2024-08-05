<template>
	<view class="box acea-row row-center-wrapper">
		<Loading size="80rpx"></Loading>
	</view>
</template>

<script>
	import Loading from '@/components/Loading/index.vue';
	export default {
		name: 'LoadingPage',
		components: {
			Loading
		}
	}
</script>

<style scoped lang="scss">
	.box {
		width: 100%;
		height: 750rpx;
	}
</style>
