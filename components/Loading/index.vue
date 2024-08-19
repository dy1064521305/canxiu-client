<template>
	<view class="loading" :style="{fontSize: size}">
		<image class="loading-icon"
			src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/08/05/166f26490152425fa96315de73cb3733.png"></image>
	</view>
</template>

<script>
	export default {
		name: 'Loading',
		props: {
			size: {
				type: String,
				default: '28rpx'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.loading {
		display: inline-block;
		width: 1.5em;
		height: 1.5em;
		position: relative;
	}

	.loading-icon {
		width: 1.5em;
		height: 1.5em;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		margin: auto;
		-webkit-animation: load 1s linear infinite;
		animation: load 1s linear infinite;
	}

	@keyframes load {
		from {
			-webkit-transform: rotateZ(0deg);
			transform: rotateZ(0deg);
		}

		to {
			-webkit-transform: rotateZ(360deg);
			transform: rotateZ(360deg);
		}
	}
</style>