<template>
	<view class="loginss">
		<view class="page">
			<header-index title="一键授权" listen-scroll :offset-top="85" :scroll-top="scrollTop" type="dark">
				<view>一键授权</view>
			</header-index>
			<image class="logo" src="@/static/logo.png" mode="widthFix"></image>
			<!-- 让餐饮维修更简单 -->
			<view class="text-c">
				申请授权您的公开信息(昵称、头像等)
			</view>
			<view class="form">

				<!-- #ifdef MP -->
				<!-- <button class="form-btn" type="primary" open-type="getPhoneNumber"
						@getphonenumber="getphonenumber">本机号码登录</button> -->

				<button class="form-btn weixin acea-row row-center-wrapper" hover-class="none" @tap="getUserProfile">
					<image class="icon" src="/static/img/wechat.png" mode="aspectFit" v-if="!isShenhe"></image>
					<text v-if="!isShenhe">微信</text> 一键登录
				</button>
				<!-- #endif -->
				<!-- #ifdef APP-PLUS -->
				<button class="form-btn weixin acea-row row-center-wrapper" hover-class="none" @tap="wechatLogin">
					<image class="icon" src="/static/img/wechat.png" mode="aspectFit"></image>
					微信一键登录
				</button>
				<!-- #endif -->

				<view v-if="!supportPrivacy" class="form-row agreement acea-row row-center-wrapper" @click="agreement">
					<text v-if="!isAgree" class="iconfont icon-yuanxingweixuanzhong"></text>
					<text v-else class="iconfont icon-selectfill"></text>
					我已阅读<text class="color-theme" @click.stop="toFuwu">《服务协议》</text>和<text class="color-theme"
						@click.stop="toPrivacy">《隐私政策》</text>
				</view>
				<view v-else class="form-row agreement acea-row row-center-wrapper">
					<button open-type="agreePrivacyAuthorization" class="btn-agree acea-row row-middle"
						@click="privacyHandle">
						<text v-if="!isAgree" class="iconfont icon-yuanxingweixuanzhong"></text>
						<text v-else class="iconfont icon-selectfill"></text>
						我已阅读
					</button>
					<text class="color-theme" @click="openAgree">《小程序隐私保护指引》</text>
				</view>
				<!-- #ifndef MP-WEIXIN -->
				<view class="tip">
					<text @click="toLoginSms">其他手机号登录</text>
				</view>
				<!-- #endif -->
				<!-- #ifdef MP -->
				<button @click="$jump(-1)" class="cancelBtn">取消本次操作</button>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN  -->
				<view class="loginOther" @click="toLoginSms"></view>
				<!-- #endif -->

			</view>
		</view>
		<popup-privacy @close="isAgree=false" @confirm="isAgree=true"></popup-privacy>
	</view>
</template>

<script>
	import $cache from '@/utils/cache.js';
	import {
		TABBAR_PATH
	} from '@/config/environment.js'
	import {
		mapState,
		mapGetters
	} from 'vuex';

	// #ifdef MP
	import Routine from '@/config/routine';
	// import {
	// 	routineAuth,
	// 	getUserPhone
	// } from '@/api/api.js';
	// #endif
	// #ifdef H5
	// import Wechat from '@/config/wechat.js'
	// #endif
	// #ifdef APP-PLUS
	// import {
	// 	appWechatAuth
	// } from '@/api/api.js'
	// #endif
	// import {
	// 	getUserDevice
	// } from '@/api/user.js'

	// import {
	// 	checkPrivacy
	// } from '@/utils/index.js'
	import HeaderIndex from '@/components/header/index.vue';
	// import PopupPrivacy from '@/components/popup/privacy.vue'

	const app = getApp();

	export default {
		components: {
			// PopupPrivacy,
			HeaderIndex
		},
		data() {
			return {
				scrollTop: 0,
				loading: false,
				code: '',
				authKey: '',
				isAgree: false,
				otheruid: "",
				otherid: "",
				otherproductid: "",
				showAvatarPop: false,
				supportPrivacy: false,
			}
		},
		computed: {
			...mapState(["userInfo", 'loginLogo'])
		},
		onLoad(options) {
			// #ifdef MP
			if (wx.openPrivacyContract) {
				this.supportPrivacy = true
			}
			// #endif
			if (options.otheruid) {
				this.otheruid = options.otheruid
			}
			if (options.otherid) {
				this.otherid = options.otherid
			}

		},
		methods: {
			// #ifdef MP
			// 小程序获取手机号码
			getphonenumber(e) {
				uni.showLoading({
					title: '加载中'
				});
				Routine.getCode(1)
					.then(code => {
						this.getUserPhoneNumber(e.detail.encryptedData, e.detail.iv, code);
					})
					.catch(error => {
						uni.hideLoading();
					});
			},
			// 小程序获取手机号码回调
			getUserPhoneNumber(encryptedData, iv, code) {
				let data = {
					encryptedData: encryptedData,
					iv: iv,
					code: code,
					key: this.authKey,
					spread_code: '',
					spread_spid: "",
				}
				if (this.otheruid && this.otherid) {
					data.spread_spid = this.otheruid
					data.product_id = this.otherid
					data.is_help = 1
				}
				getUserPhone(data)
					.then(res => {
						uni.hideLoading();
						this.loginHandler(res.data);
					})
					.catch(err => {
						uni.hideLoading();
						this.$alert(err);
					}).finally(() => {
						Routine.refreshCode()
					});
			},
			// 确认登录
			login() {

				const app = this
				let valid = app.validItem();
				const apps = getApp()
				if (valid) {

					//	app.isLoading = true
					app.$store.dispatch('Login', {
							phonenumber: app.phone,
							smsCode: app.code,
						}).then(result => {

							if (result.data.type == 'Error') {
								uni.$u.toast(result.data.msg)
								return
							}
							// #ifdef APP-PLUS
							plus.push.getClientInfoAsync((info) => {
									let cid = info["clientid"];
									console.log({
										cid: info["clientid"],
										userId: result.data.clientId
									});
									bindIds({
										clientId: info["clientid"],
										userId: result.data.clientId
									}).then(res => {
										console.log(res);
									})
								}),
								// #endif


								getInfoById(result.data.clientId).then(res => {
									console.log(res);
									this.userInfo = res.data
									uni.setStorageSync(`isLogin${storage.get('ClientId')}`, true)
									let arr = res.data.avatarUrl != null ? res.data.avatarUrl.split(',') : []
									if (result.data.type == 'Success' && res.data.customerStoreId) {
										const pages = uni.$u.pages();
										console.log(pages);
										apps.type = 'login'
										if (pages.some(p => p.route.includes('goodDetails'))) {
											var pagess = getCurrentPages();
											var prevPage = pagess[pagess.length - 2]; //上一个页面
											var object = {
												name: "back"
											}
											prevPage.$vm.otherFun(object);
											uni.navigateBack()
										} else {
											uni.switchTab({
												url: '/pages/home/index',
												fail(err) {
													console.log(err)
												}
											})
										}

									} else {

										// uni.navigateTo({
										// 	url: '../../subpkg/login/info/info?id=' + result.data.clientId,
										// 	fail(err) {
										// 		console.log(err)
										// 	}
										// })
										let info = {
											type: 'login',
											storeInfo: {
												storeImg: res.data.storeImg,
												storeName: res.data.storeName,
												storeTypeId: res.data.storeTypeId,
											}
										}
										uni.navigateTo({
											url: '../../subpkg/center/myStore/addStore/addStore?info=' +
												encodeURIComponent(JSON.stringify(info))
										})
									}
									//	this.fileList.push({url:arr[0]})
								})

							// getUserSig().then(res => {
							// 	uni.$TUIKit.login({
							// 		userID: result.data.clientId,
							// 		userSig: res.msg
							// 	}).then(function(imResponse) {
							// 		console.log('-----------1111111111111111111111'); // 登录成功
							// 		console.log(imResponse); // 登录成功
							// 		console.log('22222222222222222222222222222'); // 登录成功
							// 		if (imResponse.data.repeatLogin === true) {
							// 			// 标识帐号已登录，本次登录操作为重复登录。v2.5.1 起支持
							// 			console.log(imResponse.data.errorInfo);
							// 		}
							// 	}).catch((error) => {})
							// })

						})
						.catch(err => {})

				}
			},

			getUserProfile() {
				if (!this.isAgree) return this.$toast('请先阅读并同意协议');
				if (this.loading) return;
				uni.showLoading({
					title: '正在登录中'
				});
				this.loading = true;
				Routine.getCode(1).then(code => {
					this.loginHandler();
					// routineAuth({
					// 		code: code,
					// 	}).then(res => {
					// 		this.loading = false;
					// 		uni.hideLoading();
					// 		if (res.data.key) {
					// 			uni.showModal({
					// 				title: '是否同意获取您的手机号',
					// 				content: '获取您的手机号授权，用以追踪记录订单及获得的佣金',
					// 				cancelText: '拒绝',
					// 				confirmText: '同意',
					// 				confirmColor: '#FF7700',
					// 				success: (res1) => {
					// 					if (res1.confirm) {
					// 						this.$jump('redirectTo://pages/auth/phone?key=' +
					// 							res.data.key + '&uid=' + this
					// 							.otheruid + "&id=" + this.otherid);
					// 					} else if (res1.cancel) {
					// 						console.log('用户点击取消');
					// 					}
					// 				}
					// 			});

					// 		} else {
					// 			this.loginHandler(res.data);
					// 		}
					// 	})
					// 	.catch(err => {
					// 		this.loading = false;
					// 		uni.hideLoading();
					// 		this.$alert(err);
					// 	})
				})
			},
			// #endif
			loginHandler() {
				// console.log(data, "222222222222");
				// data.expires_time = data.expires_time - $cache.time();
				this.$store.dispatch('Login', {
					phonenumber: 18069791811,
					smsCode: 952700,
				}).then(user => {
					let back_url = $cache.get('authBackUrl') || TABBAR_PATH[0];
					this.$toast('登录成功!', 'success').then(() => {
						$cache.clear('authBackUrl');
						this.$jump('redirectTo:/' + back_url);
					});
				});
			},
			toLoginSms() {
				// this.$jump('redirectTo://pages/login/index');
			},
			//#ifdef APP-PLUS
			wechatLogin() {
				if (!this.isAgree) return this.$toast('请先阅读并同意协议');
				uni.login({
					provider: "weixin",
					onlyAuthorize: true, // 微信登录仅请求授权认证
					success: (res) => {
						// console.log(res, "res");
						this.loginHandler()

					},
					fail: (err) => {
						// this.$alert('很抱歉！安卓用户暂无法微信授权登录，请前往微信小程序进行使用')
						if (err && err.code != '-100' && err.code != '-2') {
							this.$alert(JSON.stringify(err))
						}
					}
				})
			},
			//#endif
			agreement() {
				this.isAgree = !this.isAgree;
			},
			//#ifdef MP-WEIXIN
			async privacyHandle() {
				this.agreement();
			},
			//#endif
			toFuwu() {
				// this.$jump('https://m.reduxingke.com/pages/article/detail?id=27')
				this.$jump('/pages/article/detail?id=27')
			},
			toPrivacy() {
				this.$jump('https://m.reduxingke.com/privacy.html?t=' + Date.parse(new Date()))
			},
			openAgree() {
				uni.openPrivacyContract()
			},
		}
	}
</script>

<style lang="scss" scoped>
	.loginss {
		background: #fff;
		min-height: 100vh;
	}

	.pagelogin {
		min-height: 100vh;
		background: url(https://img.reduxingke.com/2024/04/15/cb492202404151356593551.png) no-repeat;
		background-size: 100% auto;
		position: relative;
		box-sizing: border-box;

		.logo {
			width: 100%;
			margin: 138rpx auto 24rpx;
		}

		.loginGuide {
			display: block;
			width: 640rpx;
			margin: 0 auto;
		}

		.btn-agree {
			font-size: 1em;
			padding: 0;
			margin: 0;
			background: none;
			line-height: 1;
		}

		.form {
			// padding: 40rpx;

			.form-btn {
				// font-size: 36rpx;
				// margin: 68rpx 120rpx 0;
				// border-radius: 44rpx;
				// border: 2rpx solid #c0c4cc;
				width: 640rpx;
				height: 92rpx;
				border-radius: 46rpx;
				margin: 158rpx auto 20rpx;
				font-size: 34rpx;

				.icon {
					width: 46rpx;
					height: 46rpx;
					margin-right: 10rpx;
				}

				&.weixin {
					background-color: #00C15E;
					// border: 2rpx solid #e6e6e6;
					color: #fff;
				}
			}

			.form-row {
				padding: 0 !important;

				&.agreement {
					font-size: 22rpx;
					background-color: transparent;
					border-bottom: 0;

					.iconfont {
						margin-right: 4rpx;
					}

					.icon-yuanxingweixuanzhong {
						font-size: 28rpx;
						position: relative;
						// top: 2rpx;
					}

					.icon-selectfill {
						font-size: 32rpx;
						color: $color-theme;
						position: relative;
						// top: 2rpx;
					}
				}
			}

		}

		.tip {
			font-size: 24rpx;
			text-align: center;
			// color: $uni-text-color-grey;
			color: #333;
			margin-top: 30rpx;

			.iconfont {
				font-size: 24rpx;
			}
		}

		.cancelBtn {
			margin: 90rpx 120rpx 0;
			border-radius: 44rpx;
			font-size: 30rpx;
		}

		.loginOther {
			width: 100rpx;
			height: 100rpx;
			// background: red;
			z-index: 9;
			position: absolute;
			right: 0;
			bottom: 80rpx;
		}

	}


	.page {
		min-height: 100vh;
		position: relative;
		padding-top: 150rpx;
		background: url('https://static1.reduxingxuan.com/2022/06/18/b6dca202206181421082657.png') no-repeat #fff;
		background-size: 100% auto;
		box-sizing: border-box;


		.logo {
			display: block;
			width: 180rpx;
			height: auto;
			margin: 0 auto 50rpx;
			border-radius: 10rpx;
		}

		.btn-agree {
			font-size: 1em;
			padding: 0;
			margin: 0;
			background: none;
			line-height: 1;
		}

		.form {
			padding: 40rpx;

			.form-btn {
				font-size: 36rpx;
				margin: 68rpx 120rpx 0;
				border-radius: 44rpx;
				border: 2rpx solid #c0c4cc;

				.icon {
					width: 60rpx;
					height: 60rpx;
					margin-right: 12rpx;
				}

				&.weixin {
					background-color: $uni-text-color-inverse;
					border: 2rpx solid #e6e6e6;
					color: #1da938;
				}
			}

			.form-row {
				&.agreement {
					font-size: 28rpx;
					background-color: transparent;
					border-bottom: 0;

					.iconfont {
						margin-right: 4rpx;
					}

					.icon-yuanxingweixuanzhong {
						font-size: 38rpx;
						position: relative;
						top: 2rpx;
					}

					.icon-selectfill {
						font-size: 44rpx;
						color: $color-theme;
						position: relative;
						top: 4rpx;
					}
				}
			}

		}

		.tip {
			font-size: 28rpx;
			text-align: center;
			color: $uni-text-color-grey;
			margin-top: 90rpx;
		}

		.cancelBtn {
			margin: 90rpx 120rpx 0;
			border-radius: 44rpx;
			font-size: 30rpx;
		}

		.loginOther {
			width: 100rpx;
			height: 100rpx;
			// background: red;
			z-index: 9;
			position: absolute;
			right: 0;
			bottom: 80rpx;
		}

	}
</style>