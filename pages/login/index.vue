<template>
	<view class="login">

		<image src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/1cabf1cc977e4cc29a33272885693202.png" mode="">
		</image>

		<image src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/75537c81465d49b3916abd1ee8694e1f.png" mode="">
		</image>
		<u-icon class='icon' name="close-circle" color="#fff" size="25" @click="goHome"></u-icon>
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
			<view class="fonts">
				<view style="margin-top:3rpx;">
					<view v-if="!checked" class="check" @click="check"></view>
					<view v-else style="width: 26rpx;height: 26rpx;" @click="check">
						<image style="width: 100%;height: 100%;"
							src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/cfc57172d7654b4ea531302d3592eca3.png">
						</image>
					</view>

				</view>
				<view style="margin-left: 8rpx;width:610rpx;">
					未注册手机号登录后将自动生成账号，且代表已阅读并同意
					<text v-for="(item,index) in agreementList" :key="index"
						@click="goAgreement(item)">《{{item.agreementName}}》<text
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

			<view class="bottom">
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

			</view>
		</view>

	</view>
</template>
<script>
	import * as CaptchaApi from '@/api/captcha'
	import {
		getCode,
		getAgreement
	} from '@/api/login.js'
	import {
		isEmpty,
		isPhone
	} from '@/utils/verify.js'




import { setTokenStorage } from '../../utils/token';
import logger from '../../utils/logger';
import { genTestUserSig } from '../../debug/GenerateTestUserSig.js';
const { getTokenStorage } = require('../../utils/token.js');
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
			};
		},
		created() {
			this.getList()
		},
		onLoad(option) {
			const that = this;
			this.setData({
				path: option.path
			});
			uni.getStorage({
				// 获取本地缓存
				key: 'sessionID',
				success(res) {
					that.setData({
						sessionID: res.data
					});
				}
			});
			uni.setStorage({
				key: 'path',
				data: option.path
			});
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
				getAgreement().then(res => {
					console.log(res);
					this.agreementList = res.data
				})
			},
			check() {
				this.checked = !this.checked
			},
			radioChange() {
				console.log(this.check);
			},
			//倒计时定时器
			countDown() {
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
							console.log(result.data);
							this.wxIMLogin(result);
							if (result.data.type == 'Success') {
								const pages = uni.$u.pages();
								console.log(pages);
								apps.type='login'
								pages.some(p => p.route.includes('goodDetails')) ? uni.navigateBack() : uni.switchTab({
									url: '/pages/home/index',
									fail(err) {
										console.log(err)
									}
								})

							} else {
								uni.navigateTo({
									url: '../../subpkg/login/info/info',
									fail(err) {
										console.log(err)
									}
								})
							}
							
						})
						.catch(err => {})

				}
				
			},
			wxIMLogin(result){
				
				// 腾讯im登录
				const userID = this.phone;
				const userSig = genTestUserSig(userID).userSig;
				const SDKAppID = app.globalData.SDKAppID;
				logger.log(`TUI-login | login  | userSig:${userSig} userID:${userID}`);
				this.setData({
					privateAgree: true
				});
				this.setData({
					userID: userID
				});
				
				
				
				
				app.globalData.userInfo = {
					userSig,
					userID
				};
				setTokenStorage({
					userInfo: app.globalData.userInfo
				});
				wx.setStorageSync(`TIM_${getApp().SDKAppID}_isTUIKit`, true);
				
				uni.$TUIKit.login({
					userID: userID,
					userSig: userSig
				}).then(() => {
				}).catch((error) => {
				})
				
				// 登录原生插件
				// // #ifdef APP-PLUS
				// if(typeof(uni.$TUICallKit) == 'undefined') {
				// 	// uni.showToast({
				// 	// 	title: '如果需要音视频功能，请集成插件使用真机运行并且自定义基座调试哦～',
				// 	// 	icon: 'none',
				// 	// 	duration: 3000
				// 	// });
				// 	logger.error('请使用真机运行并且自定义基座调试，否则影响音视频功能～ 插件地址：https://ext.dcloud.net.cn/plugin?id=9035 , 调试地址：https://nativesupport.dcloud.net.cn/NativePlugin/use/use');
				// } else {
				// 	uni.$TUICallKit.login(
				// 		{
				// 			SDKAppID: SDKAppID,
				// 			userID: userID,
				// 			userSig: userSig
				// 		},
				// 		res => {
				// 			console.log(JSON.stringify(res.msg));
				// 			uni.showToast({
				// 				title: 'login',
				// 				icon: 'none'
				// 			});
				// 		}
				// 	);
				// }
				// // #endif
				
			},
			
			
			//查协议内容
			goAgreement(item) {
				console.log(item);
				uni.navigateTo({
					url: '../../subpkg/login/agreementDetailed/agreementDetailed?name=' + item.agreementName
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
