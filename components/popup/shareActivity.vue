<template>
	<view>
		<view v-if="show" class="share-pop acea-row row-column" :style="{height: winH+'px'}">
			<view class="mask" @click="hideMask" :style="{width:750+'rpx', height: winH+'px'}"></view>
			<view class="share-content acea-con acea-row row-center"
				:style="{width: posterWidth+'rpx',height:posterHeight +'rpx'}">
				<slot></slot>
				<!-- 	<image :style="{width: posterWidth+'rpx',height:posterHeight+'rpx'}" class="poster acea-con"
					:src="poster" mode="aspectFit"> </image> -->
				<!-- <image :style="{width: posterWidth+'rpx',height:posterHeight+'rpx'}" :src="poster" mode="">
				</image> -->
				<!-- <image :src="tempImage" style="width: 375px; height: 667px;"></image> -->
				<!-- 画布 -->
				<canvas canvas-id="myCanvas" style="width: 628rpx;height: 100%;position: absolute;"></canvas>
				<!-- <button type="warn" class="btn" @click="exportPost">保存海报</button> -->
			</view>
			<view class="bottom-btns acea-row">
				<view class="acea-con acea-row row-column row-center-wrapper" @click="savePoster">
					<image class="icon"
						src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/08/09/472ef96ec8f54f6395ed0408405832c6.png">
					</image>
					<text class="bottom-btn-text">保存海报</text>
				</view>
				<template>
					<view class="acea-con acea-row row-column row-center-wrapper" @click="shareMoments">
						<image class="icon"
							src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/08/09/18204de671a04e72923bb5709ad1fe6d.png">
						</image>
						<text class="bottom-btn-text">朋友圈</text>
					</view>
				</template>
				<view class="acea-con acea-row row-column row-center-wrapper" style="position: relative;"
					@click="sharePoster">
					<image class="icon"
						src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/08/09/fd66c5b760e346b497c6b86b48b9b100.png">
					</image>
					<text class="bottom-btn-text">分享好友</text>
					<!-- #ifdef MP-WEIXIN -->
					<button open-type="share" class="shareBtn"></button>
					<!-- #endif -->
				</view>

			</view>
		</view>

	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import {
		shareImage,
		saveImage,
		appOpenWeixin
	} from '@/utils/index.js'

	export default {
		name: 'PopupShareActivity',
		props: {
			type: Number | String,
			sid: Number | String,
			shareText: {
				type: String,
				default: '分享好友'
			},
			hideBtn: {
				type: Boolean,
				default: false
			},
			posterWidth: {
				type: Number,
				default: 640
			},
			posterHeight: {
				type: Number,

			},
			params: {
				type: Object,
				default: {
					title: '邀请好友'
				}
			}
			// moments: {
			// 	type: Boolean,
			// 	default: false
			// },

		},
		data() {
			return {
				widW: 375,
				winH: '',
				show: false,
				poster: '',
				needLongTapSaveImg: false,
				tempFilePath: "",
				initImagePath: "",
				ctx: '',
				img1Path: 'https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/08/22/354f6d1cb13e4dc7952282e9b082f10c.png', // 图片背景路径
				img2Path: 'https://f0.0sm.com/node0/2024/04/86617AFED06414DC-b3ee7cb6d2a73d90.png', // 图片二维码路径

			}
		},
		mounted() {
			const sys = uni.getSystemInfoSync();
			this.safeArea = sys.safeAreaInsets;
			this.winW = sys.windowWidth;
			// 获取屏幕宽度比率
			this.powerW = uni.getSystemInfoSync().windowWidth / 375;
			// console.log(this.powerW, '宽度比率');


		},
		computed: {
			// ...mapGetters(['isLogin']),
		},

		methods: {
			// // 点击-保存海报
			// async exportPost() {
			// 	// 调用合并图片的方法。
			// 	this.mergeImages();
			// },

			// 合并图片的方法
			async mergeImages(show) {
				console.log(show, 'show');
				// 创建画布 初始化canvas上下文
				const ctx = uni.createCanvasContext('myCanvas', this);
				// 加载第一张图片到canvas上
				const image1 = await this.loadImage(this.img1Path);

				// 在(0,0)位置绘制图片1，图一宽高分别为345px和334px
				console.log(this.powerW, "this.powerWthis.powerWthis.powerW");
				ctx.drawImage(image1, 0, 0, 310 * this.powerW, 460 * this.powerW);

				// 加载第二张图片到canvas上，并设置位置和大小（根据需要调整）
				const image2 = await this.loadImage(this.poster);

				// 在(10,209)位置绘制图片2,图片二宽高75px，可以根据需要调整位置和大小
				ctx.drawImage(image2, 120 * this.powerW, 270 * this.powerW, 76 * this.powerW, 76 * this.powerW);

				// 设置字体样式
				// this.ctx.font = '8px Arial';
				ctx.font = `${(14 * this.powerW).toFixed(0)}px Arial`;
				ctx.fillStyle = '#FFF2DF'; // 设置填充颜色

				// 在 Canvas 上绘制文字
				// 第二个和第三个参数是文字的 x 和 y 坐标
				ctx.fillText('邀请人名字', 20 * this.powerW, 40 * this.powerW);
				// 绘制完成后保存Canvas图片
				// ctx.draw(false, (() => {
				// 	setTimeout(() => {
				// 		uni.canvasToTempFilePath({
				// 			canvasId: 'myCanvas',
				// 			success: (res) => {
				// 				console.log(res.tempFilePath);
				// 				uni.saveImageToPhotosAlbum({
				// 					filePath: res.tempFilePath,
				// 					success() {
				// 						uni.showToast({
				// 							title: '已保存到相册',
				// 							icon: 'success'
				// 						})
				// 					}
				// 				})
				// 			},
				// 			fail: (err) => {
				// 				console.error(err);
				// 			},
				// 			complete: () => {
				// 				this.loading = false
				// 			}
				// 		}, this);
				// 	}, 200);

				// })())
				// // 完成绘制并导出为图片（可选）
				ctx.draw(true, (() => {
					// 这里可以处理合并后的图片，比如保存到相册或上传到服务器等操作。
					// 如果需要导出为文件或上传等操作，可以使用uni.canvasToTempFilePath等方法。	
					setTimeout(() => {
						uni.canvasToTempFilePath({ // res.tempFilePath临时路径
							canvasId: 'myCanvas',
							success: (res) => {
								this.tempFilePath = res.tempFilePath
								if (show) return
								uni.saveImageToPhotos
								Album({ // 保存本地
									filePath: res.tempFilePath,
									success: (response) => {
										uni.showToast({
											title: '保存成功',
											icon: 'success'
										})
									},
									fail: (response) => {
										uni.openSetting({ //打开权限
											success: (
												response) => {
												if (!response
													.authSetting[
														'scope.writePhotosAlbum'
													]) {
													uni.showToast({
														title: '获取权限成功, 再次点击即可保存',
														icon: none
													})
												} else {
													uni.showToast({
														title: '获取权限失败, 无法保存',
														icon: none
													})
												}
											}
										})
									}
								})
							},
							fail: (response) => {}
						}, this)
					}, 1000)
				})());
			},

			// 注：canvas绘图在开发者工具上支持base64图片，在真机上是不可以的, 
			// 需让后台返回图片网络链接通过getimageinfo方法获取临时路径再进行操作 
			loadImage(src) {
				return new Promise((resolve, reject) => {
					uni.getImageInfo({
						src: src, // 图片的URL或临时文件路径
						success: (res) => {
							console.log(res, 1.5);
							// 获取图片的本地路径或临时文件路径，用于在canvas上绘制。
							resolve(res.path);
						},
						fail: reject, // 处理加载失败的情况。
					});
				});
			},
			// generateImageSuccessful(image) {
			// 	console.log(image, "image");
			// 	this.tempImage = image;
			// },

			hideMask() {
				console.log(999);
				this.show = false;
				this.$emit('hideMask');
			},
			open(poster) {
				// if (checkAuth(1) !== 200) return;
				if (poster && typeof poster == 'string') {
					this.poster = poster;
				} else {
					if (!this.type) return;
				}
				if (this.poster) {
					// #ifdef MP-WEIXIN
					// this.sharePoster();
					this.show = true;
					// #endif
					// #ifndef MP-WEIXIN
					this.show = true;
					// #endif
					this.mergeImages(1)
					return;
				}

			},
			sharePoster() {
				this.hideMask();
				// #ifdef MP-WEIXIN
				// #endif
				// #ifndef MP-WEIXIN
				shareImage(this.tempFilePath);
				// #endif
			},
			shareMoments() {
				// #ifdef APP-PLUS
				// let params = {
				// 	imageUrl: 'https://img.reduxingke.com/2024/02/01/02bff202402011509146214.png',
				// 	title: '餐修百万合伙人招募计划',
				// 	path: 'pages/activity/luckyBag/luckybagOther?uid=' + this.userInfo.uid,
				// 	// 分享的app体验版
				// 	// type: 2
				// }
				// params.path = params.path + '&spread=' + uid + '&incode=' + incode + '&noAuth=1';
				// appOpenWeixin(this.params);
				uni.share({
					provider: "weixin",
					scene: "WXSceneTimeline",
					type: 2,
					imageUrl: this.tempFilePath,
					success: function(res) {

						this.$toast(JSON.stringify(res))
					},
					fail: function(err) {
						this.$toast(JSON.stringify(err))
					}
				});
				// #endif
				// #ifndef APP-PLUS
				this.show = false
				this.$emit('hideMask_pyq');

				// this.$refs.uToast.show({
				// 	type: 'waring',
				// 	message: '请点击右上角分享到朋友圈'
				// });

				// #endif


			},
			savePoster() {
				this.$emit('downBury')
				// saveImage(this.tempFilePath, () => {
				// 	this.hideMask();
				// 	uni.showToast({
				// 		title: '成功保存到相册',
				// 		icon: 'none'
				// 	})
				// });
				uni.saveImageToPhotosAlbum({ // 保存本地
					filePath: this.tempFilePath,
					success: (response) => {
						uni.showToast({
							title: '保存成功',
							icon: 'success'
						})
					},
					fail: (response) => {
						uni.openSetting({ //打开权限
							success: (
								response) => {
								if (!response
									.authSetting[
										'scope.writePhotosAlbum'
									]) {
									uni.showToast({
										title: '获取权限成功, 再次点击即可保存',
										icon: none
									})
								} else {
									uni.showToast({
										title: '获取权限失败, 无法保存',
										icon: none
									})
								}
							}
						})
					}
				})
				this.hideMask();
				// saveImage(this.poster, () => {
				// 	this.hideMask();
				// 	uni.showToast({
				// 		title: '成功保存到相册',
				// 		icon: 'none'
				// 	})
				// });
			},
		}
	}
</script>

<style scoped>
	.fix-bottom {
		width: 750rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 10;
		padding: 20rpx 30rpx;
		/* #ifndef APP-NVUE */
		padding-bottom: calc(20rpx+ constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
		padding-bottom: calc(20rpx + env(safe-area-inset-bottom)); ///兼容 IOS>11.2/	
		box-sizing: border-box;
		/* #endif */
		background-color: #fff;
		border-top: 2rpx solid #f5f5f5;
	}

	.share-btn {
		font-size: 30rpx;
		text-align: center;
		line-height: 88rpx;
		color: #fff;
		background-color: #FF7700;
		border-radius: 44rpx;
	}

	.share-pop {
		width: 750rpx;
		/* #ifndef APP-NVUE */
		height: 100vh;
		/* #endif */
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
	}

	.mask {
		/* #ifndef APP-NVUE */
		width: 100%;
		height: 100%;
		/* #endif */
		/* #ifdef APP-NVUE */
		flex: 1;
		/* #endif */
		position: absolute;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
	}



	.share-content {
		/* height: 100%; */
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		position: relative;
		/* #ifndef APP-NVUE */
		margin: 120rpx auto 40rpx;
		/* #endif */
		/* #ifdef APP-NVUE */
		margin: 80rpx 55rpx 40rpx;
		/* #endif */
	}

	.poster {
		/* #ifndef APP-NVUE */
		width: 100%;
		height: 100%;
		/* #endif */
		/* #ifdef APP-NVUE */
		width: 400px;
		height: 560px;
		/* #endif */
	}

	.posterContent {
		width: 640rpx;
		height: 940rpx;
		background-color: #FFF7F0;
		z-index: 20;
	}

	/* .bjImg {
		background-image: url('https://img.reduxingke.com/2023/07/22/add47202307221438425365.png');
		width: 100%;
		height: 764rpx;
		display: flex;
		justify-content: center;

	}

	.bjImgList {
		width: 560rpx;
		height: 514rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		position: absolute;
		top: 262rpx;
		padding: 30rpx 20rpx 0;
	} */

	.contents {
		padding: 20rpx 30rpx;
		align-items: center;
	}

	.contents_left {}

	.contents_leftimg {
		width: 202rpx;
		height: 46rpx;
	}

	.contents_lefttext {
		font-size: 24rpx;
		color: #939292;
		margin-top: 24rpx;
	}

	.contents_rightimg {
		width: 140rpx;
		height: 140rpx;
	}

	.bottom-btns {
		width: 750rpx;
		height: 250rpx;
		padding: 40rpx;
		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		/* #endif */
		background-color: #fff;
		border-radius: 20rpx 20rpx 0 0;
		z-index: 1;
	}

	.bottom-btn-text {
		font-size: 24rpx;
		text-align: center;
		color: #333;
	}

	.icon {
		width: 100rpx;
		height: 100rpx;
		margin-bottom: 12rpx;
	}

	.product {
		background-color: #fff;
		margin-bottom: 18rpx;
		border-radius: 20rpx;
	}

	.cover {
		width: 152rpx;
		height: 152rpx;
		position: relative;
		margin-right: 16rpx;
	}

	.cover-img {
		width: 100%;
		height: 100%;
		border-radius: 20rpx 0 0 20rpx;
	}

	.tip-butie {
		height: 44rpx;
		position: absolute;
		top: -4rpx;
		left: 0;
		z-index: 2;
		font-size: 22rpx;
		line-height: 32rpx;
		color: #fff;
		padding: 0 10rpx;
		background-image: url('https://img.reduxingke.com/2023/05/25/7c55b202305251456005297.png');
		/* #ifndef APP-NVUE */
		background-repeat: no-repeat;
		background-size: 100% 100%;
		/* #endif */
	}

	.masks {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		background-color: rgba(0, 0, 0, 0.3);
		font-size: 30rpx;
		line-height: 246rpx;
		text-align: center;
		color: #fff;
		border-radius: 20rpx 0 0 20rpx;
	}

	.info {
		padding: 10rpx 0rpx;
		padding-left: 0;
		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		/* #endif */
	}

	.title {
		width: 390rpx;
		font-size: 24rpx;
		height: 34rpx;
		margin-bottom: 20rpx;
		/* #ifndef APP-NVUE */
		white-space: nowrap;
		/* #endif */
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.icon-pt {
		/* #ifndef APP-NVUE */
		display: inline-block;
		/* #endif */
		width: 22rpx;
		height: 22rpx;
		position: relative;
		top: 2rpx;
		margin-right: 4rpx;
	}

	.tip-type {
		/* #ifndef APP-NVUE */
		display: inline-block;
		/* #endif */
		height: 28rpx;
		font-size: 16rpx;
		line-height: 28rpx;
		color: #fff;
		padding: 0 4rpx;
		background-color: #FF7700;
		border-radius: 4rpx;
		margin-right: 4rpx;
		position: relative;
		top: -4rpx;
	}

	.price-con {
		font-size: 20rpx;
		margin-bottom: 10rpx;
		display: flex;
		align-items: center;
	}

	.price-bulie {
		margin-left: 10rpx;
	}

	.price-bulietext {
		width: 136rpx;
		height: 36rpx;
		background-image: linear-gradient(274deg, #FFEBDA 0%, #FFDCDC 100%, #FFE4DC 100%);
		font-size: 24rpx;
		text-align: center;
		color: #D43E00;
		line-height: 36rpx;
		padding: 4rpx 10rpx;
		border-radius: 0 20rpx 20rpx 0;
		position: relative;
		top: -6rpx;
	}

	.price-bulieImg {
		width: 36rpx;
		height: 36rpx;
		background-image: linear-gradient(137deg, #FF7700 0%, #FF074A 100%);
		// box-shadow: inset 0rpx 2rpx 10rpx 2rpx rgba(255,255,255,0.5);
		/* #ifndef APP-NVUE */
		display: inline-block;
		/* #endif */
	}

	.btn-tg {
		width: 100%;
		height: 40rpx;
		font-size: 22rpx;
		line-height: 40rpx;
		color: #FF6600;
		background-color: #FFF1DC;
		border-radius: 24rpx;


	}

	.btn-tg-fee {
		margin-left: 18rpx;
	}

	.tip-fan {
		position: absolute;
		top: 0rpx;
		right: 0;
		width: 146rpx;
		height: 42rpx;
		background-image: url('https://img.reduxingke.com/2023/07/22/2ec03202307221309388101.png');
		/* #ifndef APP-NVUE */
		background-size: 100% 100%;
		background-repeat: no-repeat;
		/* #endif */


	}

	.tip-fantext {
		font-size: 26rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 42rpx;
		margin-left: 40rpx;
	}

	.shareBtn {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
</style>