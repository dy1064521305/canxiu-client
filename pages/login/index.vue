<template>
	<view class="login">

		<image src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/08/24/b9b58da181d544c8b95ab226eb3d0259.png" mode="">
		</image>

		<image src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/75537c81465d49b3916abd1ee8694e1f.png" mode="">
		</image>
		<!-- 	<u-icon class='icon' name="close-circle" color="#fff" size="25" @click="goHome"></u-icon> -->
		<view class="slogin">
			让餐饮维修更简单
		</view>
		<view class="main">
			<view class="input-box">
				<input type="number" v-model="phone" placeholder="请输入您的手机号">
			</view>
			<view class="input-box">
				<input type="number" v-model="code" placeholder="请输入验证码">
				<text v-if="countDownNum==0" @click="getCode">获取验证码</text>
				<text style="width: 24%;text-align:end;" v-if="countDownNum!=0">{{countDownNum}}s</text>
			</view>
			<view class="fonts" @click="checked = !checked">
				<view style="margin-top:3rpx;">
					<view v-if="!checked" class="check" ></view>
					<view v-else >
						<!-- 	<image style="width: 100%;height: 100%;"
											src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/cfc57172d7654b4ea531302d3592eca3.png">
										</image> -->
						<u-icon name="checkmark-circle-fill" color="#A4D091" size="27rpx"></u-icon>
					</view>

				</view>
				<view style="margin-left: 8rpx;width:610rpx;">
					未注册手机号登录后将自动生成账号，且代表已阅读并同意
					<text v-for="(item,index) in agreementList" :key="index"
						@click.stop="goAgreement(item)">《{{item.agreementName}}》<text
							v-if="index!=agreementList.length-1">、</text></text>
				</view>
			</view>
			<view class="login">
				<view :class="['btn',checked&&phone!=''&&code!=''?'btn-active':'btn-unactive']" @click="login()">
					登 录
				</view>
				<!-- 	<image style="width: 100%;height: 100%;"
					src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/afc56c996d564ba48186af4549a42c71.png"
					mode="" ></image> -->
			</view>

			<!-- 	<view class="bottom">
				<view class='font'>
					<view class="">
						第三方登录
					</view>
					<view class="">
						<image style="width: 83rpx;margin-top: 35rpx;"
							src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/eb942b0c00be4ccc81bea4dc1bf8214b.png"
							mode="widthFix"></image>
					</view>
				</view>

			</view> -->
		</view>

			<view class="index" style="z-index: 999999999999;">
			<wu-app-update></wu-app-update>
		</view>
	</view>
</template>
<script>
	import * as CaptchaApi from '@/api/captcha'
	import {
		getInfoById,
	} from '@/api/user.js'
	import {
		getCode,
		getAgreement,
		bindIds
	} from '@/api/login.js'
	import {
		isEmpty,
		isPhone
	} from '@/utils/verify.js'


	import logger from '../../utils/logger';

	import {
		getUserSig
	} from '@/api/tim.js'

	const app = getApp();



	export default {
		data() {
			return {
				checked: false,
				title: '餐修管理平台',
				subTitle: '欢迎回来，开始工作吧！',
				// 登录账号
				phone: '',
				code: '',
				countDownNum: 0, //获取验证码后倒数
				agreementList: [], //问题协议
				userInfo: {}
			};
		},
		created() {
			this.getList()
		},
		onLoad(option) {
			// const that = this;
			// this.setData({
			// 	path: option.path
			// });
			// uni.getStorage({
			// 	// 获取本地缓存
			// 	key: 'sessionID',
			// 	success(res) {
			// 		that.setData({
			// 			sessionID: res.data
			// 		});
			// 	}
			// });
			// uni.setStorage({
			// 	key: 'path',
			// 	data: option.path
			// });
		},
		watch: {
			// "isLogin": {
			//       immediate: true, // 立即执行
			//      // deep: true, // 深度监听复杂类型内变化
			//       handler (newVal, oldVal) {
			//           console.log(this.checked&&this.phone!=''&&this.code!='');
			//           return this.checked&&this.phone!=''&&this.code!=''
			//       }
			//   }

		},
		methods: {
			getList() {
				getAgreement({
					type: '用户端'
				}).then(res => {
					console.log(res);
					this.agreementList = res.data
				})
			},
		
			radioChange() {
				console.log(this.check);
			},
			//倒计时定时器
			countDown() {
				uni.$u.toast('验证码已发送，请查收短信')
				this.countDownNum = 60
				this.timer = setInterval(() => {
					this.countDownNum--
					if (this.countDownNum <= 0) {
						clearInterval(this.timer);
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
			//获取验证码
			getCode() {
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
					phonenumber: this.phone
				}).then(res => {
					console.log(res);
				})

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

			//查协议内容
			goAgreement(item) {
				console.log(item);
				uni.navigateTo({
					url: '../../subpkg/login/agreementDetailed/agreementDetailed?remark=' + encodeURIComponent(JSON
						.stringify(item.remark))
				})
			},
			//未登录回到首页
			goHome() {
				uni.navigateBack()
				// uni.switchTab({
				// 	url:'/pages/home/index'
				// })
			}
		}
	};
</script>
<style lang="scss" scoped>
	@import 'index.scss';
</style>