<template>
	<view>
		<view v-show="loginPopShow">
			<view class="popLogin">
				<view class="mask" v-on:click="$store.commit('CLOSE_LOGIN_POP')"></view>
				<slot name="wrapper">
					<view class="wrapper acea-row row-column">
						<view class="title flex-colum">
							<text>欢迎登录，</text>
							<text>餐修让维修更快捷、更标准！</text>
							<view class="">
								未注册手机号验证后即完成注册
							</view>
						</view>
						<view class="content acea-con">
							<button v-if="checkedLogin" class="btn" type="primary" open-type="getPhoneNumber"
								@getphonenumber="getphonenumber">手机号快捷登录</button>
							</button>
							<view v-else class="btn acea-row row-center row-middle" @click="toPhone">手机号快捷登录</view>
							<view class="btn btn2 acea-row row-center row-middle" @click="toPhone(1)">短信验证码登录</view>
							<view class="agreement">
								<view class="fonts acea-row row-middle" @click="checkedLogin = !checkedLogin">
									<view style="margin:3rpx 10rpx 0 0;">
										<view v-if="!checkedLogin" class="check"></view>
										<view v-else>
											<u-icon name="checkmark-circle-fill" color="#F3B23E" size="27rpx"></u-icon>
										</view>

									</view>
									我已阅读并同意
									<!-- <text v-for="(item,index) in agreementListLogin" :key="index"
								@click.stop="goAgreementLogin(item)">《{{item.agreementName}}》<text
									v-if="index!=agreementListLogin.length-1">和</text></text> -->
									<text @click.stop="goAgreementLogin(0)">《注册协议》</text><text>和</text><text
										@click.stop="goAgreementLogin(1)">《隐私协议》</text>
								</view>
							</view>


						</view>

					</view>
				</slot>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import {
		TABBAR_PATH
	} from '@/config/environment.js'
	import $cache from '@/utils/cache.js';
	import {
		getAgreement,
		postLoginPartner
	} from '@/api/login.js'
	import {
		putImmediate
	} from "@/api/brand.js"
	import Routine from '@/config/routine.js';

	// 解密获取手机号
	// import WXBizDataCrypt from "@/static/wx/WXBizDataCrypt.js"
	export default {
		name: 'LoginPop',
		props: {
			inviteType: {
				type: Number,
				default: 0,
			},
		},
		data() {
			return {
				checkedLogin: false,
				agreementListLogin: []
			}
		},
		computed: {
			...mapState(['loginPopShow'])
		},
		created() {
			console.log(this.inviteType, "inviteTypeinviteType");
			this.getListLogin()
		},
		mounted() {},
		methods: {
			//#ifdef MP
			// 小程序获取手机号码
			getphonenumber(e) {
				if (!this.checkedLogin) return this.$toast('请勾选相关协议')
				uni.showLoading({
					title: '加载中'
				});
				Routine.getCode(1)
					.then(code => {
						console.log(e, "@2");
						// this.getUserPhoneNumber(e.detail.encryptedData, e.detail.iv, code);
						this.getUserPhoneNumber(e.detail.code, code);
						// let pc = new WXBizDataCrypt('wx365a28a668734937', session_key);
						// console.log(pc, "pcpc") //data就是最终解密的用户信息
						// let data = pc.decryptData(e.detail.encryptedData, e.detail.iv);
						// console.log(data, "data258") //data就是最终解密的用户信息  
						// this.phone = data.phoneNumber // 手机号
					})
					.catch(error => {
						uni.hideLoading();
					});
			},
			// 小程序获取手机号码回调
			getUserPhoneNumber(phoneCode, code) {
				let data = {
					loginCode: code,
					phoneNumberCode: phoneCode,
				}
				this.loginHandler(data);
			},
			//#endif
			loginHandler(data) {
				this.$store.dispatch('LOGIN', data).then(user => {
					console.log(user, "back_url");
					uni.hideLoading();
					// 二维码邀请的时候的判断
					if (this.inviteType && user.isPartner && user.type == 'Success') {
						putImmediate(user.clientId).then(res => {
							if (res.data) {
								this.$store.commit('CLOSE_LOGIN_POP')
								this.$toast('您已是合伙人!', 'success').then(() => {
									uni.redirectTo({
										url: '../../staging/team/index',
									})
								});

							}
						}).catch(err => {
							this.$alert(err)
							this.$store.commit('CLOSE_LOGIN_POP')
						})
					} else {
						if (this.inviteType) {
							this.$store.commit('CLOSE_LOGIN_POP')
							setTimeout(() => {
								this.$toast('登录成功!', 'success')
							}, 500)
						} else {
							this.$store.commit('CLOSE_LOGIN_POP')
							const currentPagePath = this.getCurrentPagePath();
							uni.reLaunch({
								url: `/${currentPagePath}`
							});
							setTimeout(() => {
								this.$toast('登录成功!', 'success')
							}, 500)
						}

					}

				}).catch(err => {
					uni.hideLoading();
					this.$alert(err);
					this.$store.commit('CLOSE_LOGIN_POP')
				}).finally(() => {
					Routine.refreshCode()
					uni.hideLoading();
				});
			},
			getCurrentPagePath() {
				const pages = getCurrentPages();
				const currentPage = pages[pages.length - 1];
				return currentPage.route; // 获取当前页面的路径
			},
			getListLogin() {
				getAgreement({
					type: '用户端'
				}).then(res => {
					this.agreementListLogin = res.data
				})
			},
			toPhone(i) {
				if (!this.checkedLogin) return this.$toast('请勾选相关协议')
				if (i) {
					this.$jump('/pages/login/phone')
				}
				this.$store.commit('CLOSE_LOGIN_POP')
			},

			//查协议内容
			goAgreementLogin(index) {
				let remark = this.agreementListLogin[index].remark
				uni.navigateTo({
					url: '/subpkg/login/agreementDetailed/agreementDetailed?remark=' +
						encodeURIComponent(JSON
							.stringify(remark))
				})
				this.$store.commit('CLOSE_LOGIN_POP')
			},
		}
	}
</script>

<style scoped lang="scss">
	.popLogin {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 200;

		.mask {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			background-color: $uni-bg-color-mask;
		}

		.wrapper {
			width: 100%;
			position: absolute;
			bottom: 0;
			left: 0;
			background: linear-gradient(to bottom right, #FDF2E0, #FFFEFE 50%, #FFFEFE);
			// background-color: $uni-text-color-inverse;
			background-color: $uni-text-color-inverse;
			border-radius: 24rpx 24rpx 0 0;
			overflow: hidden;
			box-sizing: border-box;
			padding: 56rpx 56rpx 0 56rpx;

			.title {
				font-size: 32rpx;
				position: relative;
				width: 100%;
				font-size: #212121;
				box-sizing: border-box;

				text {
					margin-bottom: 10rpx;
				}

				view {
					font-size: 32rpx;
					color: #999999;
				}
			}

			.content {
				// padding: 30rpx;
				padding-bottom: 50rpx;
				padding-bottom: calc(30rpx+ constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
				padding-bottom: calc(30rpx + env(safe-area-inset-bottom)); ///兼容 IOS>11.2/				
				box-sizing: border-box;
				overflow: scroll;
				margin-top: 50rpx;

				uni-button {
					margin-right: 0;
					margin-left: 0;
				}

				/* #ifdef MP-WEIXIN */
				button {
					margin-right: 0;
					margin-left: 0;
				}

				/* #endif */

				.btn {
					width: 638rpx;
					height: 96rpx;
					line-height: 96rpx;
					background: #2F2F2F;
					margin-bottom: 16rpx;
					border-radius: 16rpx;
					color: #FFFEFE;
					font-size: 30rpx;

				}

				.btn2 {
					height: 94rpx;
					background: #FFFFFF;
					border: 2rpx solid #666666;
					color: #666666;
				}

				.agreement {
					font-size: 24rpx;
					color: #999999;
					margin: 32rpx 0;

					.fonts {
						display: flex;
						width: 686rpx;
						height: 65rpx;
						font-size: 22rpx;
						color: #A5A7A7;
						line-height: 30rpx;
						margin-left: 70rpx;

						.check {
							width: 22rpx;
							height: 22rpx;
							border: 2rpx solid #A5A7A7;
							border-radius: 50%;
						}

						text {
							color: #666666;
						}
					}
				}

				&.on {
					padding: 6rpx 0 0 0;
					margin: 0 40rpx 30rpx 30rpx;
					border-top: 1rpx solid #E8E8E8;
				}
			}
		}
	}
</style>