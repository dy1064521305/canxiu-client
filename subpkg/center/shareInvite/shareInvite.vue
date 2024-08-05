<template>
	<view class="shareInvite">
		<view class="poster" :style="{background:'url('+bg+') no-repeat',backgroundSize:'100% 100%'}">
			<image class="code" :src="code" mode=""></image>
			<canvas class="poster-canvas" canvas-id="myCanvas" v-if="imageRectInfo.length>0&&loading"
				:style="{width: imageRectInfo[0].width+'px',height: imageRectInfo[0].height+'px'}"></canvas>

		</view>

		<!-- <canvas canvas-id="myCanvas" style="width: 690rpx;height: 668rpx;position: absolute;left: 100%;"></canvas> -->

		<view class="bottom">
			<view class="title">
				分享至
			</view>
			<view class="list">
				<view v-for="(item,index) in list" :key="index" @click="goHandle(item.type)" class="box">
					<view style="height: 60rpx;display: flex;align-items: center;position: relative;">

						<image style="width: 60rpx;height: 60rpx;" :src="item.img"></image>
					</view>
					<text style="margin-top: 14rpx;">{{item.type}}</text>
					<!-- #ifdef MP-WEIXIN -->
					<button open-type="share" v-if="index===3"></button>
					<button v-if="index===2" @click.stop="shareToTimeline"></button>
					<!-- #endif -->
				</view>
			</view>
		</view>

		<yk-authpup ref="authpup" type="top" @changeAuth="changeAuth" permissionID="WRITE_EXTERNAL_STORAGE">
		</yk-authpup>

		<u-toast ref="uToast"></u-toast>

	</view>
</template>

<script>
	const {
		environment
	} = require('../../../config/environment')
	import storage from '@/utils/storage'
	import {
		getShareLink,
		getQrCode,
		activityData
	} from '@/api/invite.js'
	import {
		queryURLParams
	} from '@/utils/index'
	export default {
		data() {
			return {
				bg: '',
				code: '',
				imageRectInfo: [],
				loading: false,
				activeInfo: {},
				link: undefined,
				type: '',
				list: [{
						type: '复制链接',
						img: 'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/06/18/8eaf4f09525a459cba2a07f470bdee78.png'
					},
					{
						type: '保存海报',
						img: 'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/06/18/6093d33ebfbe4ba69b63272c0f979596.png'
					},
					{
						type: '朋友圈',
						img: 'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/06/18/083814b70fe84bf4acdfece67d65abcf.png'
					},
					{
						type: '分享好友',
						img: 'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/06/18/2f032233f7674a499a8f3122aea35d04.png'
					}
				]
			}
		},
		onLoad(option) {
			this.activeInfo = JSON.parse(decodeURIComponent(option.info))
			this.type = option.type || ''
			//判断是否是单页面
			if (uni.getLaunchOptionsSync().scene != 1154) {
				this.type = ''
			}
			// let workerId = option.workerId ? option.workerId : storage.get('workerId')
			if (this.type) {
				this.list.splice(2, 3)
			}
			this.bg = this.activeInfo.activityPoster
			let infoId = this.activeInfo
			// 固定 1客户 0师傅 2合伙人
			getShareLink({
				activityId: this.activeInfo.activityId,
				workerId: infoId.partnerId,
				activityType: this.activeInfo.activityType,
				userType: 2,
				inviterId: infoId.partnerId
			}).then(res => {
				console.log(res, '-');
				this.link = res.data

			})
			this.code =
				`${environment.baseURL}/worker/friend/invite/getQrCode?activityId=${this.activeInfo.activityId}&workerId=${infoId.partnerId}&userType=2&inviterId=${infoId.partnerId}&activityType=${this.activeInfo.activityType}`
			wx.showShareMenu({
				menus: ['shareAppMessage',
					'shareTimeline'
				], //'shareAppMessage'打开分享好友功能 | 'shareTimeline'打开分享到朋友圈功能
			});

		},
		onReady() {
			// 此处获取两张图片的宽高,本地图片路径
			Promise.all([this.getImageRectInfo('.poster', this.bg), this.getImageRectInfo('.code', this.code)]).then(
				res => {
					this.imageRectInfo = res
					console.log(this.imageRectInfo, "22222");
				})
		},
		onShareAppMessage(res) {
			this.activityDataHandle()
			return {
				title: this.activeInfo.shareTitle,
				desc: this.activeInfo.shareContent,
				imageUrl: this.activeInfo.shareImg,
				path: `/subpkg/center/acceptInvitation/acceptInvitation?activityId=${this.activeInfo.activityId}&inviteCode=${queryURLParams(this.link, 'inviteCode')}&workerId=${storage.get('ClientId')}&userType=2&inviterId=${storage.get('ClientId')}&activityType=${this.activeInfo.activityType}`,
			}
		},
		onShareTimeline() {
			return {
				title: this.activeInfo.shareTitle,
				imageUrl: this.activeInfo.shareImg,
				query: `info=${encodeURIComponent(JSON.stringify(this.activeInfo))}&type=share&workerId=${storage.get('ClientId')}`
			}
		},
		methods: {
			shareToTimeline() {
				this.activityDataHandle()
				console.log('请点击右上角分享到朋友圈');
				this.$refs.uToast.show({
					type: 'waring',
					message: '请点击右上角分享到朋友圈'
				});
			},
			// 将海报保存到本地
			savePoster() {
				if (this.imageRectInfo.length < 2 || this.loading) return uni.showToast({
					title: '未准备好，请稍候',
					icon: 'none'
				})
				this.loading = true
				const ctx = uni.createCanvasContext('myCanvas', this)
				// 绘制第一张图片
				const item1 = this.imageRectInfo[0]
				ctx.drawImage(item1.tempFilePath, 0, 0, item1.width, item1.height);
				// 绘制第二张图片
				const item2 = this.imageRectInfo[1]
				ctx.drawImage(item2.tempFilePath, item1.width - item2.width, item1.height - item2.height, item2.width,
					item2.height);
				// 绘制完成后保存Canvas图片
				ctx.draw(false, (() => {
					setTimeout(() => {
						uni.canvasToTempFilePath({
							canvasId: 'myCanvas',
							success: (res) => {
								console.log(res.tempFilePath);
								uni.saveImageToPhotosAlbum({
									filePath: res.tempFilePath,
									success() {
										uni.showToast({
											title: '已保存到相册',
											icon: 'success'
										})
									}
								})
							},
							fail: (err) => {
								console.error(err);
							},
							complete: () => {
								this.loading = false
							}
						}, this);
					}, 200);

				})())
			},
			// 获取图片路径,并将图片链接下载为本地链接
			getImageRectInfo(seletor, path) {
				return new Promise((resolve, reject) => {
					uni.createSelectorQuery().in(this).select(seletor)
						.boundingClientRect((data) => {
							uni.downloadFile({
								url: path,
								success: (suc) => {
									resolve(Object.assign(data, suc))
								},
								fail: (err) => {
									reject(err)
								}
							})
						})
						.exec();
				})
			},
			changeAuth() {
				// uni.saveImageToPhotosAlbum({
				// 	filePath: this.imageUrl,
				// 	success: function() {
				// 		uni.$u.toast('保存成功')
				// 		console.log('save success');
				// 	}
				// });
				this.savePoster();
			},
			goHandle(type) {
				if (this.type) {
					this.$refs.uToast.show({
						type: 'waring',
						message: '请前往小程序进行操作'
					});
					return
				}

				switch (type) {
					case '复制链接':
						uni.setClipboardData({
							data: this.link,
							success: function() {

							}
						});
						break;
					case '保存海报':
						// #ifdef APP-PLUS
						this.$refs['authpup'].open()
						// #endif 
						// #ifdef MP-WEIXIN
						this.changeAuth()
						// #endif 
						break;
					case '朋友圈':
						this.activityDataHandle()
						// #ifdef APP-PLUS
						uni.share({
							provider: "weixin",
							scene: "WXSceneTimeline",
							type: 0,
							href: this.link,
							title: this.activeInfo.shareTitle,
							summary: this.activeInfo.shareContent,
							imageUrl: this.activeInfo.shareImg,

							success: (res) => {
								console.log("success:" + JSON.stringify(res));

							},
							fail: (err) => {
								console.log("fail:" + JSON.stringify(err));
								err.errCode == '-8' && this.goUrl()


							}
						});
						// #endif 
						break;
					case '分享好友':
						// #ifdef APP-PLUS
						this.activityDataHandle()
						uni.share({
							provider: "weixin",
							scene: "WXSceneSession",
							type: 0,
							//href:'http://uniapp.dcloud.io/',
							href: this.link,
							title: this.activeInfo.shareTitle,
							summary: this.activeInfo.shareContent,
							imageUrl: this.activeInfo.shareImg,
							success: (res) => {
								console.log("success:" + JSON.stringify(res));

							},
							fail: (err) => {
								console.log("fail:" + JSON.stringify(err));
								err.errCode == '-8' && this.goUrl()
							}
						});
						// #endif 
						break;
				}
			},
			activityDataHandle() {
				activityData({
					statisticsType: 0,
					activityType: this.activeInfo.activityType,
					activityId: this.activeInfo.activityId
				}).then(res => {})
			},
			goUrl() {
				this.$refs.uToast.show({
					type: 'info',
					message: '未安装微信客户端'
				});
				setTimeout(() => {
					plus.runtime.openURL(
						'https://a.app.qq.com/o/simple.jsp?pkgname=com.tencent.mm',
						function(res) {
							console.log(res);
						});
				}, 1000)
			}
		}
	}
</script>

<style lang="scss">
	.shareInvite {
		.img {
			margin: 20rpx;
			height: 75vh;
			display: flex;
			position: relative;
		}

		.poster {
			position: relative;
			// width: 100%;
			height: 74vh;
			margin: 27rpx 42rpx;

			image {
				position: absolute;
				width: 30vw;
				height: 30vw;
				bottom: 0px;
				right: 0px;
			}

			.poster-canvas {
				position: absolute;
				opacity: 0;
				pointer-events: none;
				z-index: 1
			}
		}

		.code {
			position: absolute;
			width: 195rpx;
			height: 195rpx;
			bottom: 10rpx;
			right: 10rpx;
		}

		.bottom {
			background: #fff;
			position: fixed;
			bottom: 0;
			width: 100%;

			height: 22vh;

			.title {
				text-align: center;
				margin: 20rpx 0 40rpx 0;
			}

			.list {
				display: flex;
				justify-content: space-evenly;

				.box {
					position: relative;
					display: flex;
					flex-direction: column;
					align-items: center;
					// width: 25%;
					margin: 24rpx 0;
					font-size: 25rpx;

					button {
						position: absolute;
						width: 100%;
						height: 100%;
						opacity: 0;
						top: 0;
						left: 0;
					}

					view:first-child {
						color: #3D3F3E;
					}

					view:nth-child(2) {

						color: #A5A7A7;
					}

				}
			}
		}
	}
</style>