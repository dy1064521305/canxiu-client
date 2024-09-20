<template>
	<view class="pages acea-row">
		<view class="pages-types acea-row row-middle">
			<view class="items" v-for="item in types" :key="item.type" :class="{on:item.type==typeIndex}"
				@click="changeTypes(item.type)">{{item.label}}
			</view>
		</view>
		<view class="qr" :class="{on:typeIndex==2}">
			<image v-show="typeIndex==1" :src="code" mode=""></image>
			<image v-show="typeIndex==2" :src="inviteCode" mode=""></image>
		</view>
		<view class="qr_mess">保存至本地，直接分享或面对面扫码注册</view>
		<view class="qr_saveImg" @click="toInvite">保存到相册</view>
		<!-- <view v-show="typeIndex==1">
			<view style="text-align: center;">
				- 或 -
			</view>
			<view class="qr_saveImg addPp" @click="$jump('/subpkg/center/brand/inviter?id='+partnerInfo.partnerId)">
				添加品牌信息
			</view>
		</view> -->

		<!-- <view class="qr_share" v-show="typeIndex==2">
			<view class="tit">分享至</view>
			<view class="share_img acea-row  row-between-wrapper">
				<view class="share_img_items acea-row flex-colum-center" @click="shareOther" v-for="(item) in shareImg"
					:key="index">
					<image :src="item.img" mode=""></image>
					<text>{{item.type}}</text>
				</view>
			</view>
		</view> -->
		<PopupShareActivity :posterWidth="500" @hideMask_pyq="pyqPop" :params="paramsInfo" ref="share" hide-btn>
		</PopupShareActivity>
		<view v-show="pyqPopShow">
			<view class="popOne acea-row row-center-wrapper" @click="pyqPopShow=false">
				<view class="mask"></view>
				<image src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/08/22/9ee3737764db4fd3ae298dea0a943da6.png"
					mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	import Popup from '@/components/popup/center.vue'
	import PopupShareActivity from './components/shareActivity.vue'
	import {
		getPartnerQrCode,
		getInvitePartnerQrCode,
		putImmediate
	} from "@/api/brand.js"
	import storage from '@/utils/storage'
	const {
		environment
	} = require('@/config/environment')
	import {
		appOpenWeixin
	} from '@/utils/index.js'
	export default {
		components: {
			PopupShareActivity,
			Popup
		},
		data() {
			return {
				code: "",
				inviteCode: "",
				partnerInfo: {},
				types: [{
						type: 1,
						label: "邀请品牌",
					},
					// {
					// 	type: 2,
					// 	label: "邀请门店",
					// },
					// {
					// 	type: 3,
					// 	label: "邀请师傅",
					// },
					{
						type: 2,
						label: "邀请成员",
					},
				],
				shareImg: [
					// {
					// 	type: '复制链接',
					// 	img: 'https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/08/09/bc010fd7d8f84b8a87e173556d176b91.png'
					// },
					{
						type: '保存海报',
						img: 'https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/08/09/472ef96ec8f54f6395ed0408405832c6.png'
					},
					{
						type: '朋友圈',
						img: 'https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/08/09/18204de671a04e72923bb5709ad1fe6d.png'
					},
					{
						type: '分享好友',
						img: 'https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/08/09/fd66c5b760e346b497c6b86b48b9b100.png'
					}
				],

				typeIndex: 1,
				paramsInfo: {},
				pyqPopShow: false,
				userId: storage.get('ClientId')
			}
		},
		onLoad(options) {
			if (options && options.userId) {
				this.userId = options.userId
				console.log(this.userId, "	this.userId ");
			}

			this.code =
				`${environment.baseURL}/partner/partner/invite/brand/getAppletQrCode?userId=${this.userId}`
			this.inviteCode =
				`${environment.baseURL}/partner/partner/invite/partner/getAppletQrCode?userId=${this.userId}`
			this.getInfo()
		},

		methods: {
			getInfo() {
				putImmediate(this.userId).then(res => {
					this.partnerInfo = res.data
				})
			},
			changeTypes(type) {
				this.typeIndex = type
			},
			toInvite() {
				if (this.typeIndex == 1) {
					this.paramsInfo = {
						img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/08/24/483f2847677542139642e508c856d024.png",
						name: this.partnerInfo.realName,
						avatar: this.partnerInfo.avatarUrl,
						index: this.typeIndex,
						id: this.partnerInfo.partnerId,
						porter: this.code
					}
					this.$refs.share.open(this.code, this.paramsInfo);
				} else {
					this.paramsInfo = {
						img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/08/24/a33ff0feed504c7897f0a1ff86a358b7.png",
						name: this.partnerInfo.realName,
						avatar: this.partnerInfo.avatarUrl,
						index: this.typeIndex,
						userId: this.userId,
						porter: this.inviteCode
					}
					this.$refs.share.open(this.inviteCode, this.paramsInfo);
				}
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
					}
				});
			},
			pyqPop() {
				this.pyqPopShow = true
			},
			maskCLose() {
				this.pyqPopShow = false
			}
		},
		//#ifdef MP-WEIXIN
		onShareAppMessage() {
			return new Promise((resolve, reject) => {
				if (this.typeIndex == 1) {
					let url = '/subpkg/center/brand/inviter?id=' + this.partnerInfo.partnerId
					let data = {
						title: '餐修专注智能报修服务，提升故障报修效率！',
						path: url,
						imageUrl: 'https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/08/24/899f507562e247549ee0bddb40b62348.png',
					}
					resolve(data)
				} else {
					let url = '/subpkg/car/partner/new?userId=' + this.userId
					let data = {
						title: '餐修百万合伙人招募计划！',
						path: url,
						imageUrl: 'https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/08/22/d6ba47b337714a0e8ffad99d0fb9fe2d.png',
					}
					resolve(data)
				}
			})
		},
		onShareTimeline() {
			if (this.typeIndex == 1) {
				return {
					query: `userId=${this.userId}`,
					title: '餐修专注智能报修服务，提升故障报修效率！',
					path: '/subpkg/center/brand/MyinviterQrCode',
					imageUrl: 'https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/08/24/899f507562e247549ee0bddb40b62348.png',
				}
			} else {
				return {
					query: `userId=${this.userId}`,
					title: '餐修百万合伙人招募计划！',
					path: '/subpkg/center/brand/MyinviterQrCode',
					imageUrl: 'https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/08/22/d6ba47b337714a0e8ffad99d0fb9fe2d.png',
				}
			}
		},
		//#endif
	}
</script>

<style lang="scss" scoped>
	.pages {
		min-height: 100vh;
		flex-direction: column;
		align-items: center;
		background-color: #fff;

		&-types {
			margin: 80rpx 0 50rpx;

			.items {
				width: 172rpx;
				height: 64rpx;
				border: 2rpx solid $uni-border-color;
				font-size: 28rpx;
				color: $uni-border-color;
				line-height: 64rpx;
				text-align: center;
				background-color: $backGroundColor;

				&.on {
					width: 172rpx;
					height: 64rpx;
					background: $uni-border-color;
					color: #F9F9F9;
				}
			}

			.items:nth-child(1) {
				border-radius: 50rpx 0rpx 0rpx 50rpx;
				border-right: none;
			}

			.items:nth-last-child(1) {
				border-radius: 0rpx 50rpx 50rpx 0rpx;
				border-left: none;
			}
		}

		.qr {
			height: 550rpx;
			margin: 40rpx 0 30rpx;

			image {
				width: 472rpx;
				height: 472rpx;
				margin: 0 auto;
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
			background-color: $backGroundColor;
			border-radius: 50rpx;
			border: 2rpx solid $uni-border-color;
			font-family: PingFangSC, PingFang SC;
			font-weight: bold;
			font-size: 32rpx;
			color: $uni-border-color;
			line-height: 86rpx;
			text-align: center;
			box-sizing: border-box;
		}

		.qr_saveImg2 {
			margin: 40rpx 0 44rpx;
		}

		.addPp {
			background: $uni-border-color;
			color: #FFFFFF;
			border: none;
			margin: 40rpx 0 44rpx;
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
		border-top: 1rpx solid $uni-border-color;

		.tit {
			text-align: center;
			margin-bottom: 34rpx;
		}

		.share_img {
			padding: 0 70rpx;

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

	.popOne {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;

		.mask {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			background-color: $uni-bg-color-mask;
		}

		image {
			width: 500rpx;
			height: 764rpx;
			position: absolute;
			top: 0;
			right: 20rpx;
			/* #ifdef H5 */
			top: 88rpx;
			/* #endif */
		}

	}
</style>