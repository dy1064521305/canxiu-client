<template>
	<view style="position: relative;">
		<swiper class="notice" :autoplay="true" :interval="3000" :duration="300" vertical circular disable-touch>
			<swiper-item v-for="(item, index) in list" :key="index">
				<view>恭喜用户 <text class="name">{{item.nickname}}</text> 拆红包获得{{item.money}}元奖励 </view>
			</swiper-item>
		</swiper>
		<view v-if="disabled" class="notice-mask"></view>
	</view>
</template>

<script>
	export default {
		name: 'Marquee',
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			},
			disabled: {
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style scoped lang="scss">
	.notice {
		height: 68rpx;
		font-size: 24rpx;
		line-height: 68rpx;
		text-align: center;
		color: #F9DA9A;

		.name {
			color: #fff;
			margin: 0 8rpx;
		}
	}

	.notice-mask {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
