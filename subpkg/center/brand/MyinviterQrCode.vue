<template>
	<view class="pages acea-row">
		<view class="pages-types acea-row row-middle">
			<view class="items" v-for="item in types" :key="item.type" :class="{on:item.type==typeIndex}"
				@click="changeTypes(item.type)">{{item.label}}
			</view>
		</view>
		<view class="qr">
			<image :src="code" mode=""></image>
		</view>
		<view class="qr_mess">保存至本地，直接分享或面对面扫码注册</view>
		<view class="qr_saveImg" @click="save">保存到相册</view>
		<view class="qr_share">
			<view class="tit">分享至</view>
			<view class="share_img acea-row  row-between-wrapper">
				<view class="share_img_items acea-row flex-colum-center">
					<image
						src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/08/09/bc010fd7d8f84b8a87e173556d176b91.png"
						mode=""></image>
					<text>复制链接</text>
				</view>
				<view class="share_img_items acea-row flex-colum-center">
					<image
						src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/08/09/472ef96ec8f54f6395ed0408405832c6.png"
						mode=""></image>
					<text>保存海报</text>
				</view>
				<view class="share_img_items acea-row flex-colum-center">
					<image
						src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/08/09/18204de671a04e72923bb5709ad1fe6d.png"
						mode=""></image>
					<text>朋友圈</text>
				</view>
				<view class="share_img_items acea-row flex-colum-center">
					<image
						src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/08/09/fd66c5b760e346b497c6b86b48b9b100.png"
						mode=""></image>
					<text>分享好友</text>
				</view>


			</view>
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
				types: [{
						type: 1,
						label: "邀请品牌",
					},
					{
						type: 2,
						label: "邀请门店",
					},
					{
						type: 3,
						label: "邀请师傅",
					},
					{
						type: 4,
						label: "邀请成员",
					},
				],
				typeIndex: 1
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
			changeTypes(type) {
				this.typeIndex = type
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

		&-types {
			margin: 46rpx 0 40rpx;

			.items {
				width: 172rpx;
				height: 64rpx;
				border: 2rpx solid $uni-border-color;
				font-size: 28rpx;
				color: $uni-border-color;
				line-height: 64rpx;
				text-align: center;

				&.on {
					width: 172rpx;
					height: 64rpx;
					background: $uni-border-color;
					color: #F9F9F9;
				}
			}

			.items:nth-child(1) {
				border-radius: 8rpx 0rpx 0rpx 8rpx;
				border-right: none;
			}

			.items:nth-child(2) {
				border-right: none;
			}

			.items:nth-child(3) {
				border-right: none;
			}

			.items:nth-last-child(1) {
				border-radius: 0rpx 8rpx 8rpx 0rpx;
			}
		}

		.qr {
			width: 514rpx;
			height: 514rpx;
			margin: 0rpx 0 44rpx;

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
			border: 2rpx solid $uni-border-color;
			font-family: PingFangSC, PingFang SC;
			font-weight: bold;
			font-size: 32rpx;
			color: $uni-border-color;
			line-height: 88rpx;
			text-align: center;
			box-sizing: border-box;
		}

	}

	.qr_share {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 300rpx;
		background: #FFFFFF;
		box-sizing: border-box;
		padding-top: 24rpx;

		.tit {
			text-align: center;
			margin-bottom: 24rpx;
		}

		.share_img {
			padding: 0 55rpx;

			.share_img_items {
				image {
					width: 96rpx;
					height: 96rpx;
					background-color: powderblue;
					border-radius: 50%;
				}

				text {
					font-size: 28rpx;
					color: #3D3F3E;
					margin-top: 20rpx;
				}
			}
		}
	}
</style>