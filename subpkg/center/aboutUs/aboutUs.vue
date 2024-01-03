<template>
	<view class="about-us">
		<u-cell-group>
			<u-cell size="large">
				<view slot="title">
					<text class="u-cell-text">名称</text>
					<text>餐修用户端</text>
				</view>
			</u-cell>
			<u-cell size="large">
				<view slot="title">
					<text class="u-cell-text">客服电话</text>
					<text>400-5213-1255</text>
				</view>
			</u-cell>
			<u-cell size="large">
				<view slot="title">
					<text class="u-cell-text">版权所有</text>
					<text>浙江餐修科技有限公司</text>
				</view>
			</u-cell>
			<u-cell size="large">
				<view slot="title">
					<text class="u-cell-text">当前版本</text>
					<text>V{{appVersion}}</text>
				</view>
			</u-cell>

		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				appVersion:''
			};
		},
		onLoad() {
			let that=this
			uni.getStorage({
				key:'SYSTEM_INFO',
				success(res) {
					console.log(res);
					that.appVersion=res.data.appVersion
				}
			})
		},
	}
</script>

<style lang="scss" scoped>
	.about-us {
		background-color: #fff;
		margin-top: 20rpx;

		.u-cell-text {
			font-weight: bold;
			width:24%;
			display: inline-block;
			font-size: 31rpx;
		}
	}
</style>
