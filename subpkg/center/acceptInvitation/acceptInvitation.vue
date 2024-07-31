<template>
	<view class="acceptInvitation">

		<image class="bg" :style="{'height':activityType==0?'640rpx':'760rpx'}"
			src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/06/20/d68d15e7b9674b3dbca6ae8c1a223e14.png">
		</image>

		<view class="navbar" :style="{'paddingTop':(navbarTop+20)+'rpx','position':'relative'}">
			<!-- #ifdef MP-WEIXIN -->
			<u-icon name="arrow-left" color="#fff" @click="$jump('/pages/home/index')"></u-icon>
			{{activityType==0?'加入闪电豹':'商家注册'}}
			<text></text>
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			{{activityType==0?'加入闪电豹':'商家注册'}}
			<!-- #endif -->
		</view>

		<view class="main">
			<view class="box">
				<view style="padding: 20rpx;">
					<view class="info">
						<image v-if="!userInfo.avatarUrl"
							src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/06/19/fea1dd65eb384dcf92ca712b4e5463ee.png">
						</image>
						<image v-else :src="userInfo.avatarUrl">
						</image>
						<view class="">
							{{userType==2?'合伙人':userInfo.workerName&&userInfo.workerName.slice(0,1)+'师傅'}}</br>
							邀请你{{activityType==0?'加入':'注册'}}
						</view>
					</view>
					<view v-if="activityType==0" class="big_title">
						加入闪电豹</br>
						每日海量订单等你接
					</view>
					<view v-else style="text-align: center;" class="big_title">
						开城钜惠，福利大放送</br>
						新用户入驻可领取！

					</view>


				</view>
				<view v-if="activityType!=0" style="position: relative;">
					<image
						src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/09/e61c2aac754f4261bd19e148567aee5e.png"
						style="width: 395rpx;height: 297rpx;margin-left: 21%;"></image>
					<text style="position: absolute;top: 50rpx;font-weight: bold;color: #FD6617;font-size: 60rpx;top: 29%;
left: 50%;
transform: translate(-50%, -50%);">{{money}}</text>
				</view>
				<view class="login"
					:style="{'position':activityType==1?'relative':'','marginTop':activityType==1?'-40rpx':''}">
					<view style="text-align: center;font-size: 25rpx;
color: #A5A7A7;
padding: 20rpx 0;">
						<view v-if="activityType==0">
							已入住<text style="color:#FD6617 ;">100</text>位师傅，昨日平台订单量<text
								style="color:#FD6617 ;">6666</text>
						</view>
						<view v-else>
							<text style="color:#FD6617 ;">100+</text>师傅·超过<text
								style="color:#FD6617 ;">25w</text>商户使用·覆盖2853个县区
						</view>

					</view>
					<view class="input-box">

						<image
							src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/06/20/c80a003290d7484d891226fab1a1adc6.png"
							style="width: 25rpx;height: 32rpx;"></image>
						<input type="number" v-model="phone" placeholder="请输入您的手机号" @input="phoneInput">
					</view>
					<view class="input-box" v-if="!isExisted">
						<image
							src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/06/20/0c99815f661549a0b00b569e3b3c786e.png"
							style="width: 27rpx;height: 32rpx;"></image>
						<input type="number" v-model="code" placeholder="请输入验证码">
						<text v-if="countDownNum==0" @click="getCodeHandle">重新发送</text>
						<text style="width: 24%;text-align:end;color: #A5A7A7;"
							v-if="countDownNum>0">{{countDownNum}}</text>
					</view>

					<view :class="['btn',checked&&phone!=''?'btn-active':'btn-unactive']" @click="login()">
						接受邀请
					</view>
					<view class="fonts">
						<view style="margin-top:3rpx;">
							<view v-if="!checked" class="check" @click="check"></view>
							<view v-else @click="check">
								<!-- 	<image style="width: 100%;height: 100%;"
											src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/cfc57172d7654b4ea531302d3592eca3.png">
										</image> -->
								<u-icon name="checkmark-circle-fill" color="#FB6E0D" size="30rpx"></u-icon>
							</view>

						</view>

						<view style="margin-left: 8rpx;width:610rpx;">
							我已阅读并同意
							<text v-for="(item,index) in agreementList" :key="index"
								@click="goAgreement(item)">《{{item.agreementName}}》<text
									v-if="index!=agreementList.length-1">、</text></text>
						</view>
					</view>
				</view>
			</view>
			<view @click="getWeChatCode" style="word-break:break-all">
			</view>

		</view>


		<u-popup :show="inviteOkShow" overlayOpacity='1' mode='center' round='10'>


			<view style="padding: 0 20rpx;">
				<!-- #ifdef H5 -->
				<view style="padding: 0 20rpx;">
					<view style="font-size: 33rpx;color: #000000;padding:30rpx 20rpx 20rpx 20rpx;text-align: center;">
						{{isExisted?'当前手机号已注册平台账号':'恭喜，你已注册成功！'}}</br>{{activityType==0?'快前往APP开始接单。':'前往APP领取福利吧！'}}
					</view>
				</view>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<view style="font-size: 33rpx;color: #000000;padding:30rpx 20rpx 20rpx 20rpx;text-align: center;">
					{{isExisted?'当前手机号已注册平台账号':'恭喜，你已注册成功！'}}</br>{{activityType==0?'快前往小程序开始接单。':'前往小程序领取福利吧！'}}
				</view>
				<!-- #endif -->
				<view class="btn-active btn" @click="goApp" style="">
					{{activityType==0?'前往接单':'前往下单'}}
				</view>
			</view>
		</u-popup>

	</view>
</template>


<script>
	// import CallApp from "callapp-lib";
	const {
		environment
	} = require('../../../config/environment')
	import storage from '@/utils/storage'

	import {
		isEmpty,
		isPhone
	} from '@/utils/verify.js'
	import {
		openMiniProgram
	} from '@/utils/index.js'
	import {
		getInfoById,
	} from '@/api/user.js'
	import {
		getAgreement,
		getCode,
		workerIsRegister,
		clientIsRegister,
	} from '@/api/login.js'
	import {
		activityData,
		workerSmsLogin,
		clientSmsLogin,
		activityCoupon
	} from '@/api/invite.js'

	export default {
		data() {
			return {
				inviteOkShow: false,
				checked: false,
				agreementList: [],
				countDownNum: 0, //获取验证码后倒数
				phone: '',
				code: '',
				navbarTop: 0,
				isExisted: 'init', //是否是新用户
				userInfo: {},
				activityId: '',
				workerId: '',
				res: '',
				userType: '',
				inviterId: '',
				money: '',
				activityType: ''
			}
		},

		onShow() {

			// #ifdef H5
			// 	var ua = window.navigator.userAgent.toLowerCase();
			// 	if (ua.match(/MicroMessenger/i) == 'micromessenger') {

			// 		this.checkWeChatCode()

			// 	}
			// #endif

		},
		onLoad(option) {
			// #ifdef H5
			let search = window.location.href;
			let params = search.split('?')[1].split('&');

			this.activityId = params[0].split('=')[1]
			this.inviteCode = params[1].split('=')[1]
			this.workerId = params[2].split('=')[1]
			this.userType = params[3].split('=')[1]
			this.inviterId = params[4].split('=')[1]
			this.activityType = params[5].split('=')[1]
			console.log(this.activityId);

			var ua = window.navigator.userAgent.toLowerCase();
			// if (ua.match(/MicroMessenger/i) == 'micromessenger') {
			// 	// uni.$u.toast("这是微信浏览器")
			// 	this.getWeChatCode()

			// }
			// #endif
			// #ifdef MP-WEIXIN
			console.log(option, '21666666666');
			this.activityId = option.activityId
			this.inviteCode = option.inviteCode
			this.workerId = option.workerId
			this.userType = option.userType
			this.inviterId = option.inviterId
			this.activityType = option.activityType
			// #endif
			this.getList()
			uni.getSystemInfo({
				success: (res) => {
					const {
						statusBarHeight
					} = res
					// #ifdef MP-WEIXIN
					let heieght = wx.getMenuButtonBoundingClientRect();
					this.navbarTop = heieght.top + statusBarHeight;
					// #endif
					// #ifdef APP-PLUS
					this.navbarTop = statusBarHeight
					// #endif
				},
			})
		},
		methods: {
			//方法:用来提取code
			getUrlCode() {
				return decodeURIComponent((new RegExp('[?|&]' + 'code' + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) ||
					[, ''])[1].replace(/\+/g, '%20')) || null
			},
			//检查浏览器地址栏中微信接口返回的code
			checkWeChatCode() {
				var code = this.getUrlCode()
				uni.showToast({
					title: `微信code=${code}`
				})
				uni.request({
					url: `https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxdda3db80e92e5b2b&secret=0abb33f39f8dc024189ecb9633049df6&code=${code}&grant_type=authorization_code`
				}).then(res => {
					this.res = res
					console.log(res, '18222222222');
				})

			},
			//请求微信接口，用来获取code
			getWeChatCode() {
				let local = encodeURIComponent(window.location.href); //获取当前页面地址作为回调地址
				let appid = 'wxdda3db80e92e5b2b'

				//通过微信官方接口获取code之后，会重新刷新设置的回调地址【redirect_uri】
				window.location.href =
					"https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
					appid +
					"&redirect_uri=" +
					local +
					"&response_type=code&scope=snsapi_base&state=1#wechat_redirect";

			},

			getList() {
				if (this.activityType == 0) {
					getAgreement({
						type: '维修师端'
					}).then(res => {
						this.agreementList = res.data
					})

				} else {
					getAgreement({
						type: '用户端'
					}).then(res => {
						this.agreementList = res.data
					})
					activityCoupon(this.activityId).then(res => {
						this.money = res.data ? res.data.couponAmount : '0.00'
					})
				}


				getInfoById(this.inviterId != 'null' ? this.inviterId : this.workerId).then(res => {
					this.userInfo = res.data != null ? res.data : {}
				})

				activityData({
					statisticsType: 1,
					activityType: this.activityType,
					activityId: this.activityId
				}).then(res => {})

			},
			check() {
				this.checked = !this.checked
			},
			//倒计时定时器
			countDown() {
				uni.$u.toast('验证码已发送，请查收短信')
				this.countDownNum = 60
				this.timer = setInterval(() => {
					this.countDownNum--
					if (this.countDownNum <= 0) {
						clearInterval(this.timer);
						this.countDownNum = 0
					}
				}, 1000)

			},
			phoneInput() {
				setTimeout(() => {
					if (this.phone == '') this.isExisted = 'init'
				}, 1000)

			},
			// 验证表单内容
			validItem() {
				const app = this
				if (isEmpty(app.phone)) {
					uni.$u.toast('请输入手机号')
					return false
				}
				if (isEmpty(app.code)) {
					uni.$u.toast('请输入验证码')
					return false
				}
				if (this.checked == false) {
					uni.$u.toast('请勾选相关协议')
					return false
				}
				return true
			},
			//查协议内容
			goAgreement(item) {
				console.log(item);
				uni.navigateTo({
					url: '../../login/agreementDetailed/agreementDetailed?content=' + encodeURIComponent(
						JSON.stringify(item.remark))
				})
			},
			//获取验证码
			getCodeHandle() {
				//校验手机号
				const app = this
				app.code = ''
				if (isEmpty(app.phone)) {
					uni.$u.toast('请输入手机号')
					return false
				}
				if (!isPhone(app.phone)) {
					uni.$u.toast('请输入正确的手机号')
					return false
				}
				this.countDown()

				getCode({
					phonenumber: app.phone
				}).then(res => {})


			},
			goApp() {
				let that = this
				// #ifdef H5
				var u = navigator.userAgent;

				var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端
				var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

				//android端
				if (isAndroid) {
					//安卓app的scheme协议
					if (that.activityType == 0) {
						window.location.href = "intent://#Intent;scheme=canxiuworker;package=com.cx.worker;end";
					} else {
						window.location.href = "intent://#Intent;scheme=canxiu;package=com.jsfw.cxkhd;end";
					}

					// window.location.href = 'canxiuworker://';
					setTimeout(function() {
						let hidden = window.document.hidden || window.document.mozHidden || window.document
							.msHidden || window.document.webkitHidden
						if (typeof hidden == "undefined" || hidden == false) {
							//应用宝下载地址 
							if (that.activityType == 0) {
								window.location.href = "https://a.app.qq.com/o/simple.jsp?pkgname=com.cx.worker";

							} else {
								window.location.href = "https://a.app.qq.com/o/simple.jsp?pkgname=com.jsfw.cxkhd";
							}

						}
					}, 2000);
				}
				//ios端
				if (isIOS) {
					var ua = window.navigator.userAgent.toLowerCase();
					if (ua.match(/MicroMessenger/i) == 'micromessenger') {
						setTimeout(function() {
							location.href =
								`https://a.app.qq.com/o/simple.jsp?pkgname=${that.activityType==0?'com.cx.worker':'com.jsfw.cxkhd'}`;
						}, 500);

					}

					//ios的scheme协议
					window.location.href = that.activityType == 0 ? 'canxiuworker://' : 'canxiu://'
					setTimeout(function() {
						let hidden = window.document.hidden || window.document.mozHidden || window.document
							.msHidden || window.document.webkitHidden
						if (typeof hidden == "undefined" || hidden == false) {
							//App store下载地址
							if (that.activityType == 0) {
								window.location.href = `https://apps.apple.com/cn/app/餐修师傅端/id6448500875`;
							} else {
								window.location.href = `https://apps.apple.com/cn/app/餐修/id6448409793`;
							}

						}
					}, 800);
				}
				// #endif

				// #ifdef MP-WEIXIN
				if (this.activityType == 0) {
					that.$jump('/pages/login/index')
				} else {
					openMiniProgram({
						appId: 'wx365a28a668734937',
						path: 'pages/home/index',
						ghid: 'gh_06220a7bf72f',
					})
				}

				// #endif
			},

			// 确认登录
			login() {
				console.log(environment.baseURL);
				if (this.isExisted == 'init') {
					if (isEmpty(this.phone)) {
						uni.$u.toast('请输入手机号')
						return
					}
					if (this.checked == false) {
						uni.$u.toast('请勾选相关协议')
						return false
					}

					if (this.activityType == 0) {
						workerIsRegister({
							phoneNumber: this.phone,
							activityId: this.activityId
						}).then(res => {
							if (!res.data.activityStatus) {
								uni.$u.toast('活动已结束')
							} else {
								this.isExisted = res.data.isExisted
								if (!this.isExisted) {
									this.getCodeHandle()
								} else {
									this.inviteOkShow = true
								}
							}
						})

					} else {
						console.log(this.phone);
						clientIsRegister({
							phoneNumber: this.phone,
							activityId: this.activityId
						}).then(res => {
							if (!res.data.activityStatus) {
								uni.$u.toast('活动已结束')
							} else {
								this.isExisted = res.data.isExisted
								if (!this.isExisted) {
									this.getCodeHandle()
								} else {
									this.inviteOkShow = true
								}
							}
						})
					}

				} else {
					let valid = this.validItem();
					if (valid) {
						if (this.activityType == 0) {
							workerSmsLogin({
								phonenumber: this.phone,
								smsCode: this.code,
								inviteCode: this.inviteCode,
								activityId: this.activityId,
								inviterUserType: this.userType
							}).then(res => {
								if (res.data.type != 'Error') {
									this.inviteOkShow = true
									this.isExisted = res.data.isExisted
								} else {
									this.code = ''
									uni.$u.toast(res.data.msg)
								}
							})
						} else {
							clientSmsLogin({
								phonenumber: this.phone,
								smsCode: this.code,
								inviteCode: this.inviteCode,
								activityId: this.activityId,
								inviterUserType: this.userType
							}).then(res => {
								if (res.data.type != 'Error') {
									this.inviteOkShow = true
									this.isExisted = res.data.isExisted
								} else {
									this.code = ''
									uni.$u.toast(res.data.msg)
								}
							})
						}

					}
				}

			},
		}
	}
</script>

<style lang="scss">
	.acceptInvitation {
		.navbar {
			text-align: center;
			color: #fff;
			padding: 0 20rpx;
			/* #ifdef MP-WEIXIN */
			display: flex;
			justify-content: space-between;
			align-items: center;
			/* #endif */
		}

		.bg {
			width: 100%;

			// margin-top: 100rpx;
			position: absolute;
		}

		.btn {
			// width: 496rpx;
			height: 91rpx;
			color: #fff;
			// line-height: 91rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 11rpx;
			margin: 17rpx 20rpx 20rpx;
			/* #ifdef H5 */
			margin-bottom: 30rpx;
			/* #endif */
			/* #ifdef APP-PLUS */
			margin-bottom: 30rpx;
			/* #endif */
			/* #ifdef MP-WEIXIN */
			margin-bottom: -20rpx;
			/* #endif */
		}

		.btn-active {
			background: linear-gradient(270deg, #FC9900 0%, #FB6510 100%);
		}

		.btn-unactive {
			background: #b8b8b8;
		}

		.main {
			position: relative;
			width: 100%;
			// text-align: center;
			position: absolute;
			// top: 10rpx;

			.box {
				padding: 30rpx;

				.info {
					display: flex;
					align-items: center;
					color: #FFFCF1;

					image {
						width: 37px;
						height: 37px;
						margin-right: 20rpx;
						border-radius: 50%;
					}
				}

				.big_title {
					font-size: 58rpx;
					color: #FFFCF1;
					margin: 29rpx 0;
				}

				.login {
					background: #FFFFFF;
					box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(42, 64, 55, 0.05);
					border-radius: 14rpx;
					padding: 20rpx 0;

					.input-box {
						padding-left: 40rpx;
						//margin: 0 auto;
						left: 43rpx;
						// width: 608rpx;
						height: 91rpx;
						background: #FFF8EE;
						border-radius: 11rpx;
						display: flex;
						align-items: center;
						margin: 10rpx 20rpx;

						image {
							margin-right: 10rpx;
						}

						input {
							width: 69%;
							height: 100%;
						}
					}



					.input-box:nth-child(2) {

						text {
							font-size: 29rpx;
							color: #A4D091;
							// margin-top: 25rpx;
						}
					}

					.fonts {
						margin: 29rpx 48rpx;
						display: flex;
						// width: 686rpx;
						height: 65rpx;
						font-size: 22rpx;
						color: #A5A7A7;
						line-height: 30rpx;

						.check {
							width: 24rpx;
							height: 24rpx;
							border: 2rpx solid #A5A7A7;
							border-radius: 50%;
						}

						text {
							color: #FB6E0D;
						}
					}


				}
			}

		}
	}
</style>