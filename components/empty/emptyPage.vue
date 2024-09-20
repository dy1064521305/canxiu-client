<template>
	<view class="empty-box">
		<image v-if="img" :src="img" mode="widthFix"></image>
		<template v-else>
			<image src="@/static/img/mess.png" mode="widthFix"></image>
			<!-- <image v-if="type=='mess'" src="@/static/img/mess.png" mode="widthFix"></image> -->
			<!-- <image v-else-if="type=='gift'" src="/static/image/empty/gift.png" mode="widthFix"></image>
			<image v-else-if="type=='invitation'" src="/static/image/empty/invitation.png" mode="widthFix"></image>
			<image v-else-if="type=='message'" src="/static/image/empty/message.png" mode="widthFix"></image>
			<image v-else-if="type=='record'" src="/static/image/empty/record.png" mode="widthFix"></image>
			<image v-else src="https://img.reduxingke.com/2023/09/15/c0541202309151111097478.png" mode="widthFix"></image> -->
		</template>
		<view v-if="title" class="font-big">{{title}}</view>
		<view v-if="msg" class="font-small color-gray mt-10">{{msg}}</view>
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props: {
			type: {
				type: String,
				default: 'search',
			},
			img: {
				type: String,
			},
			title: {
				type: String,
				default: '',
			},
			msg: {
				type: String,
				default: '',
			},
		}
	}
</script>

<style lang="scss" scoped>
	.empty-box {
		padding: 200rpx 0;
		text-align: center;
		position: relative;
		z-index: 9;

		image {
			display: block;
			width: 280rpx;
			margin: auto;
		}
	}
</style>