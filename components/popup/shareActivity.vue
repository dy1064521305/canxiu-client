<template>
	<view>
		<!-- #ifdef MP -->
		<template v-if="!hideBtn && isLogin">
			<view class="fix-bottom">
				<view class="share-btn" @click="mpTap">{{shareText}}</view>
			</view>
			<view style="height: 130rpx;"></view>
			<status-bar type="bottom"></status-bar>
		</template>
		<!-- #endif -->
		<view v-if="show" class="share-pop acea-row row-column" :style="{height: winH+'px'}">
			<view class="mask" @click="hideMask" :style="{width:750+'rpx', height: winH+'px'}"></view>
			<view class="share-content acea-con acea-row row-center" :style="{width: posterWidth+'rpx'}">
				<slot></slot>
				<image class="poster acea-con" :src="poster" mode="aspectFit"> </image>
			</view>
			<view class="bottom-btns acea-row">
				<view class="acea-con acea-row row-column row-center-wrapper" @click="sharePoster">
					<image class="icon" src="/static/image/icon/weixin.png"></image>
					<text class="bottom-btn-text">分享好友</text>
				</view>
				<template v-if="moments">
					<view class="acea-con acea-row row-column row-center-wrapper" @click="shareMoments">
						<image class="icon" src="https://img.reduxingke.com/2024/01/20/cbbf9202401201603288092.png">
						</image>
						<text class="bottom-btn-text">分享朋友圈</text>
					</view>
				</template>
				<view class="acea-con acea-row row-column row-center-wrapper" @click="savePoster">
					<image class="icon" src="/static/image/icon/download.png"></image>
					<text class="bottom-btn-text">下载图片</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// import {
	// 	getKzShareBanner
	// } from '@/api/user.js'
	// import {
	// 	mapGetters
	// } from 'vuex'
	// import {
	// 	shareImage,
	// 	saveImage,
	// 	umengEventHandle,
	// 	checkAuth
	// } from '@/utils/index.js'
	// import StrongNum from '@/components/StrongNum.vue'

	export default {
		// components: {
		// 	StrongNum
		// },
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
			moments: {
				type: Boolean,
				default: false
			},

		},
		data() {
			return {
				widW: 375,
				winH: '',
				show: false,
				poster: '',
			}
		},
		mounted() {
			const sys = uni.getSystemInfoSync();
			this.safeArea = sys.safeAreaInsets;
			this.winW = sys.windowWidth;
			// #ifdef APP-NVUE
			this.winH = sys.windowHeight;
			uni.$on('nvueOpenSharePopup', (poster) => {
				this.open(poster)
			})
			// #endif
		},
		computed: {
			...mapGetters(['isLogin']),
		},
		methods: {
			hideMask() {
				this.show = false;
				this.$emit('hideMask');
			},
			mpTap() {
				if (this.type) {
					return this.open();
				}
				this.$emit('mp-btn-tap');
			},
			open(poster) {
				// #ifdef APP-NVUE
				setTimeout(() => {
					if (checkAuth(1) !== 200) return;
				}, 500)
				// #endif
				// #ifndef APP-NVUE
				if (checkAuth(1) !== 200) return;
				// #endif
				if (poster && typeof poster == 'string') {
					this.poster = poster;
				} else {
					if (!this.type) return;
				}
				if (this.poster) {
					// #ifdef MP-WEIXIN
					this.sharePoster();
					// #endif
					// #ifndef MP-WEIXIN
					this.show = true;
					// #endif
					umengEventHandle('activity_poster_share');
					return;
				}
				uni.showLoading({
					title: '加载中...'
				})
				let data = {
					type: this.type
				}
				if (this.sid) {
					data.sid = this.sid;
				}
				getKzShareBanner(data).then(res => {
					uni.hideLoading();
					this.poster = res.data.poster;
					// #ifdef MP-WEIXIN
					this.sharePoster();
					// #endif
					// #ifndef MP-WEIXIN
					this.show = true;
					// #endif

					umengEventHandle('activity_poster_share');
				}).catch(err => {
					uni.hideLoading();
					this.$alert(err);
				})

			},
			sharePoster() {
				this.hideMask();
				shareImage(this.poster);
			},
			shareMoments() {
				uni.share({
					provider: "weixin",
					scene: "WXSceneTimeline",
					type: 2,
					imageUrl: this.poster,
					success: function(res) {

						this.$toast(JSON.stringify(res))
					},
					fail: function(err) {
						this.$toast(JSON.stringify(err))
					}
				});
			},
			savePoster() {
				this.$emit('downBury')
				saveImage(this.poster, () => {
					this.hideMask();
					uni.showToast({
						title: '成功保存到相册',
						icon: 'none'
					})
				});
			}
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

	.bjImg {
		background-image: url('https://img.reduxingke.com/2023/07/22/add47202307221438425365.png');
		/* #ifndef APP-NVUE */
		background-size: 100% 100%;
		/* #endif */
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
	}

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
</style>