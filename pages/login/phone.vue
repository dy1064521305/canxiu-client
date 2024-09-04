<template>
	<view class="loginss">
		<view class="pageSms">
			<view class="form">
				<view class="form-row acea-row row-middle">
					<text class="iconfont icon-shouji01"></text>
					<input class="flex-con" v-model="phone" type="number" placeholder="请输入手机号"></input>
				</view>
				<view class="form-row acea-row row-middle">
					<text class="iconfont icon-sk"></text>
					<input class="flex-con" v-model="codeVal" type="number" placeholder="请输入短信验证码"></input>
					<text class="btn-send" :class="{on: canSend}" @click="sendSms">{{sendText}}</text>
				</view>

				<button class="form-btn" type="primary" :loading="loading" :disabled="disabled"
					@click="submit">登录</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		isEmpty,
		isPhone
	} from '@/utils/verify.js'
	import storage from '@/utils/storage'
	import {
		getCode,
		bindIds
	} from '@/api/login.js'
	import {
		getInfoById
	} from '@/api/user.js'
	import $cache from '@/utils/cache.js';
	import {
		TABBAR_PATH
	} from '@/config/environment.js'
	const SECOND = 60
	export default {
		data() {
			return {
				phone: '',
				codeVal: '',
				sending: false,
				send: {
					timer: null,
					t: SECOND,
				},
				sendText: '发送验证码',
				loading: false,
				inviteType: 0
			}
		},
		computed: {
			canSend() {
				if (this.sending || this.send.t != SECOND) return false;
				return true;
			},
			disabled() {
				if (!this.phone || !this.codeVal) return true;
				return false;
			}
		},
		onLoad(options) {
			if (options && options.invite) {
				// 判断是不是从二维码邀请过来的如果是去登录后不去门店。而是去邀请的页面。
				this.inviteType = options.invite || 0
			}
		},
		methods: {
			sendSms() {
				//校验手机号
				const that = this
				if (isEmpty(that.phone)) {
					uni.$u.toast('请输入手机号')
					return false
				}
				if (!isPhone(that.phone)) {
					uni.$u.toast('请输入正确的手机号')
					return false
				}
				if (!that.canSend) return false;
				that.sending = true;
				getCode({
					phonenumber: that.phone
				}).then(res => {
					that.$toast('发送成功', 'success');
					that.countdown();
					that.sending = false;
				}).catch(msg => {
					that.$alert(msg);
					that.sending = false;
				})
			},
			countdown() {
				this.send.timer = setInterval(() => {
					if (this.send.t > 0) {
						this.send.t--;
						this.sendText = this.send.t + '秒';
					} else {
						clearInterval(this.send.timer);
						this.send.timer = null;
						this.send.t = SECOND;
						this.sendText = '重新发送';
					}
				}, 1000)
			},
			// 验证表单内容
			validItem() {
				const app = this
				if (isEmpty(app.phone)) {
					uni.$u.toast('请输入手机号')
					return false
				}
				if (isEmpty(app.codeVal)) {
					uni.$u.toast('请输入验证码')
					return false
				}
				return true
			},
			submit() {
				if (this.loading || this.disabled) return;
				this.loading = true;
				let valid = this.validItem();
				if (valid) {
					this.loginHandler();
					// postLoginMobile({
					// 	phone: this.phone,
					// 	captcha: this.codeVal,
					// }).then(res => {
					// }).catch(msg => {
					// 	this.$alert(msg);
					// 	this.loading = false;
					// }).finally(() => {
					// 	// this.loading = false;
					// })
				}

			},
			loginHandler() {
				// data.expires_time = data.expires_time - $cache.time();
				const apps = getApp()
				this.$store.dispatch('Login', {
					phonenumber: this.phone,
					smsCode: this.codeVal,
				}).then(result => {
					if (result.data.type == 'Error') {
						uni.$u.toast(result.data.msg)
						this.loading = false;
						return
					}
					// // #ifdef APP-PLUS
					// plus.push.getClientInfoAsync((info) => {
					// 	let cid = info["clientid"];
					// 	bindIds({
					// 		clientId: info["clientid"],
					// 		userId: result.data.clientId
					// 	}).then(res => {
					// 		this.loading = false;
					// 	})
					// })
					// // #endif
					// #ifndef APP-PLUS
					getInfoById(result.data.clientId).then(res => {
						this.loading = false;
						this.userInfo = res.data
						uni.setStorageSync(`isLogin${storage.get('ClientId')}`, true)
						let arr = res.data.avatarUrl != null ? res.data.avatarUrl.split(',') : []
						console.log(res.data.customerStoreId, "res.data.customerStoreId")
						console.log(this.inviteType, "inviteType")
						if (result.data.type == 'Success' && ((res.data.customerStoreId != null && res.data
									.customerStoreId) || this
								.inviteType == 1)) {
							const pages = uni.$u.pages();
							apps.type = 'login'
							let back_url = $cache.get('authBackUrl');
							this.loading = false;
							$cache.clear('authBackUrl');
							if (back_url) {
								this.$jump(back_url);
							} else {
								this.$toast('登录成功')
								setTimeout(() => {
									this.$jump(-1);
								}, 500)
							}

						} else {
							this.loading = false;
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
					})
					// #endif
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.loginss {
		background: #fff;
		min-height: 100vh;
	}

	.pageSms {
		min-height: 100vh;
		background: url(https://img.reduxingke.com/2024/04/15/cb492202404151356593551.png) no-repeat;
		background-size: 100% auto;
		position: relative;
		box-sizing: border-box;
	}

	.form {
		position: relative;
		padding: 59rpx 54rpx;

		.form-row {
			margin-bottom: 40rpx;
			width: 100%;
			background: #FFFFFF;
			padding: 0 40rpx;
			border-radius: 8rpx;
			font-size: 30rpx;
			box-sizing: border-box;
			border: none !important;

			input {
				width: 100%;
				height: 100%;
				font-size: 1em;
				margin-left: 10rpx;
			}

			&.agreement {
				font-size: 28rpx;

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
					color: #FF7700;
					position: relative;
					top: 4rpx;
				}
			}
		}

		.form-btn {
			font-size: 34rpx;
			width: 640rpx;
			height: 92rpx;
			line-height: 92rpx;
			margin: 64rpx auto 20rpx;
			border-radius: 46rpx;
			background: #F3B23E;
			border-radius: 8rpx;

		}

		.btn-agree {
			font-size: 1em;
			padding: 0;
			margin: 0;
			background: none;
			line-height: 1;
		}

		.form-agreement {
			padding: 0 !important;
			background-color: transparent;
			border-bottom: 0;
			display: flex;
			align-items: center;
			justify-content: center;

			&.agreement {
				text-align: center;
				font-size: 22rpx;
				background-color: transparent;
				border-bottom: 0;
				color: #999;

				.iconfont {
					margin-right: 4rpx;
				}

				.icon-yuanxingweixuanzhong {
					font-size: 28rpx;
					position: relative;
					// top: 2rpx;
				}

				.icon-selectfill {
					font-size: 30rpx;
					color: #FF7700;
					position: relative;
					// top: 2rpx;
				}
			}
		}

		.btn999 {
			margin-top: 30rpx !important;
			background-color: #fff !important;
			border: 1rpx solid #999;
			color: #FF7700;
		}

		.btn-send {
			font-size: 30rpx;
			color: #FF7700;

			&.on {
				color: #FF7700;
			}
		}
	}
</style>