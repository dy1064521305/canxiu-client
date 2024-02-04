<script>
	// APP 和 小程序平台
	// #ifdef  APP-PLUS || MP-WEIXIN   
	// import TIM from 'tim-wx-sdk';
	// import COS from 'cos-wx-sdk-v5';
	// #endif

	// #ifdef H5
	// import TIM from 'tim-js-sdk';
	// import TIMUploadPlugin from 'tim-upload-plugin'
	// logger.error(' TUIKit 暂不支持 H5 / web ，请使用者自己完成兼容哦，页面刷新可能会导致报错，需要重新登录 ');
	// #endif

	import logger from './utils/logger'; // app.js
	// import storage from '@/utils/storage'
	// import {
	// 	genTestUserSig
	// } from './debug/GenerateTestUserSig.js';

	// 首先需要通过 uni.requireNativePlugin("ModuleName") 获取 module
	// #ifdef APP-PLUS
	// const TUICallKit = uni.requireNativePlugin('TencentCloud-TUICallKit');
	// logger.log(`| app |  TencentCloud-TUICallKit | TUICalling: ${TUICallKit}`);
	// if (typeof(TUICallKit) == 'undefined') {
	// 	logger.error(
	// 		'如果需要音视频功能，请集成原生插件，使用真机运行并且自定义基座调试哦～ 插件地址：https://ext.dcloud.net.cn/plugin?id=9035 , 调试地址：https://nativesupport.dcloud.net.cn/NativePlugin/use/use'
	// 	);
	// }
	// #endif
	export default {
		onLaunch() {

			// 加载系统信息
			this.$store.dispatch('SystemInfo');
			
			// #ifdef APP-PLUS
			plus.push.setAutoNotification(true); // 在程序运行时接收到的消息在系统消息中心显示
			//监听接收透传消息事件
			plus.push.addEventListener('receive', function(msg) {
				// 在线消息
				console.log('离线消息1', msg)
				plus.runtime.setBadgeNumber(0); //清除app角标
				plus.push.clear(); //清空通知栏
				console.log('准备跳转111');
				uni.switchTab({
					url: '/pages/msg/index'
				})
				在线时创建本地通知栏图标消息
				plus.push.createMessage(msg.content, msg, options);
			}, false);
			//监听系统通知栏消息点击事件
			plus.push.addEventListener('click', function(msg) {
				// 离线消息
				console.log('离线消息2', msg)
				plus.runtime.setBadgeNumber(0); //清除app角标
				plus.push.clear(); //清空通知栏
				console.log('准备跳转111');
			}, false);
			// #endif
			
			
			// 监听推送
			// uni.onPushMessage((res) => {
			// 			console.log("收到推送消息：",res) //监听推送消息
			// 		})
			// const SDKAppID = 1400802214;
			// uni.setStorageSync(`TIM_${SDKAppID}_isTUIKit`, true);
			// 重点注意： 为了 uni-app 更好地接入使用 tim，快速定位和解决问题，请勿修改 uni.$TUIKit 命名。
			// 如果您已经接入 tim ，请将 uni.tim 修改为 uni.$TUIKit。
			// uni.$TUIKit = TIM.create({
			// 	SDKAppID: SDKAppID
			// });
			// #ifndef H5
			// uni.$TUIKit.registerPlugin({
			// 	'cos-wx-sdk': COS
			// });
			// #endif

			// #ifdef H5
			// uni.$TUIKit.registerPlugin({
			// 	'tim-upload-plugin': TIMUploadPlugin
			// })
			// #endif
			// 将原生插件挂载在 uni 上
			// #ifdef APP-PLUS
			// uni.$TUICallKit = TUICallKit;
			// #endif
			// 如果您已创建了 tim，请将 tim 实例挂载在 wx 上，且不可以修改 wx.$TIM（修改变量可能导致 TUICallKit 组件无法正常使用）, 完成 TUICallKit 初始化，
			// 如果您没有创建，可以不传
			// #ifdef MP-WEIXIN
			// wx.$TIM = uni.$TUIKit;
			// #endif
			// uni.$TUIKitTIM = TIM;
			// uni.$TUIKitEvent = TIM.EVENT;
			// uni.$TUIKitVersion = TIM.VERSION;
			// uni.$TUIKitTypes = TIM.TYPES; // 监听系统级事件
			// uni.$resetLoginData = this.resetLoginData();
			// uni.$TUIKit.on(uni.$TUIKitEvent.SDK_READY, this.onSDKReady);
			// uni.$TUIKit.on(uni.$TUIKitEvent.SDK_NOT_READY, this.onSdkNotReady);
			// uni.$TUIKit.on(uni.$TUIKitEvent.KICKED_OUT, this.onKickedOut);
			// uni.$TUIKit.on(uni.$TUIKitEvent.ERROR, this.onTIMError);
			// uni.$TUIKit.on(uni.$TUIKitEvent.NET_STATE_CHANGE, this.onNetStateChange);
			// uni.$TUIKit.on(uni.$TUIKitEvent.SDK_RELOAD, this.onSDKReload);


		},
		onHide() {},
		globalData: {
			index: undefined, // 默认参数 也可设置为空
			// userInfo: userID userSig token phone
			userInfo: null,
			// 个人信息
			userProfile: null,
			isTUIKit: true,
			headerHeight: 0,
			statusBarHeight: 0,
			SDKAppID: 1400802214
		},
		methods: {
			// TODO:
			resetLoginData() {
				this.globalData.expiresIn = '';
				this.globalData.sessionID = '';
				this.globalData.userInfo = {
					userID: '',
					userSig: '',
					token: '',
					phone: ''
				};
				this.globalData.userProfile = null;
				logger.log(`| app |  resetLoginData | globalData: ${this.globalData}`);
			},
			onTIMError() {},
			onSDKReady(event) {
				  console.info(123132321321321)
				  uni.$emit('totalUnreadCount',{msg:'tim准备就绪'})
			},
			onNetStateChange() {},
			onSDKReload() {},
			onSdkNotReady() {},
			onKickedOut() {
				uni.showToast({
					title: '您被踢下线',
					icon: 'error'
				});
				uni.navigateTo({
					url: './pages/TUI-Login/login'
				});
			}
		}
	}
</script>


<style>
	page {

		background: #F5F9FA;
	}
</style>
<style lang="scss">
	@import "@/uni_modules/uview-ui/index.scss";
</style>
