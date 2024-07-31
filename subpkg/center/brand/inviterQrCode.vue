<template>
	<view class="pages acea-row">
		<view class="qr">
			<image :src="code" mode=""></image>
		</view>
		<view class="qr_mess">保存至本地，分享给品牌方对接人进行填写</view>
		<view class="qr_saveImg" @click="save">保存到相册</view>
		<view class="or">
			- 或 -
		</view>
		<view class="qr_saveImg addPp" @click="$jump('/subpkg/center/brand/inviter?id='+partnerInfo.partnerId)">添加品牌信息
		</view>
	</view>
</template>

<script>
	import {
		getPartnerQrCode,
		putImmediate
	} from "@/api/brand.js"
	import storage from '@/utils/storage'
	const {
		environment
	} = require('@/config/environment')
	export default {
		data() {
			return {
				img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/07/ea26360e3bd7416ab7e6aba1fc036385.png",
				code: "",
				partnerInfo: {},
			}
		},
		onLoad() {
			this.code = `${environment.baseURL}/partner/partner/getQrCode?userId=${storage.get('ClientId')}`
			this.getInfo()
		},
		methods: {
			getInfo() {
				putImmediate(storage.get('ClientId')).then(res => {
					this.partnerInfo = res.data
				})
			},
			// save() {

			// 	// // #ifdef APP-PLUS
			// 	// this.$refs['authpup'].open()
			// 	// // #endif
			// 	// // #ifndef APP-PLUS
			// 	// this.changeAuth()
			// 	// // #endif

			// },
			//保存海报
			save() {
				uni.saveImageToPhotosAlbum({
					filePath: this.code,
					success: function() {
						uni.$u.toast('保存成功')
						console.log('save success');
					}
				});
			},
		}

	}
</script>

<style lang="scss" scoped>
	.pages {
		min-height: 100vh;
		flex-direction: column;
		align-items: center;
		background-color: #fff;

		.qr {
			width: 514rpx;
			height: 514rpx;
			margin: 134rpx 0 44rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.qr_mess {
			font-size: 32rpx;
			color: #000000;
		}

		.qr_saveImg {
			margin: 66rpx 0 44rpx;
			width: 622rpx;
			height: 88rpx;
			background: #FFFFFF;
			border-radius: 8rpx;
			border: 2rpx solid #A4D091;
			font-family: PingFangSC, PingFang SC;
			font-weight: bold;
			font-size: 32rpx;
			color: #A4D091;
			line-height: 88rpx;
			text-align: center;
			box-sizing: border-box;
		}

		.or {
			font-size: 32rpx;
			color: #000000;
			margin-bottom: 34rpx;
		}

		.addPp {
			background: #A4D091;
			color: #FFFFFF;
			border: none;
			margin: 26rpx 0 44rpx;
		}
	}
</style>