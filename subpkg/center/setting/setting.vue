<template>
	<view class="">
		<view style="background-color: #fff;margin-top: 20rpx;">
			<!-- 	<a @click='goInfo'>
				<image src="../../../static/center/info.png"></image>
				<text>个人信息</text>
				<u-icon name="arrow-right" color="#e7e9e9"></u-icon>
			</a> -->
			<!-- 	<a @click='goAboutUs'>
				<image src="../../../static/center/aboutUs.png"></image>
				<text>关于我们</text>
				<u-icon name="arrow-right" color="#e7e9e9"></u-icon>
			</a> -->
			<a @click='goUrl(0,"隐私协议")'>
				<image src="../../../static/center/zc.png"></image>
				<text>隐私协议</text>
				<u-icon name="arrow-right" color="#e7e9e9"></u-icon>
			</a>
			<a @click='goUrl(1,"注册协议")'>
				<image src="../../../static/center/xieyi.png"></image>
				<text>注册协议</text>
				<u-icon name="arrow-right" color="#e7e9e9"></u-icon>
			</a>
			<a @click='isCancellation=true'>
				<image src="../../../static/center/reset.png"></image>
				<text>注销账号</text>
				<u-icon name="arrow-right" color="#e7e9e9"></u-icon>
			</a>




			<!-- 	<u-cell-group>
				<u-cell
					icon='http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/22/218734d44ff9424eb9d9ef890a54d97e.png'
					title="个人信息" isLink ></u-cell>
				<u-cell
					icon="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/22/39968dbaf39248618dbbbeef564e5c91.png"
					title="关于我们" isLink url="../aboutUs/aboutUs"></u-cell>
				<a href="static/privacyAgreement.html">
					<image
						src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/22/39968dbaf39248618dbbbeef564e5c91.png"
						style="width: 32rpx;height: 32rpx;"></image>
					<text>隐私政策</text>
					<u-icon name="arrow-right" color="#e7e9e9"></u-icon>
				</a>
				<a href="static/registrationAgreement.html">
					<image
						src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/22/39968dbaf39248618dbbbeef564e5c91.png"
						style="width: 32rpx;height: 32rpx;"></image>
					<text>注册协议</text>
					<u-icon name="arrow-right" color="#e7e9e9"></u-icon>
				</a>

				<u-cell
					icon="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/22/39968dbaf39248618dbbbeef564e5c91.png"
					title="注销账号" isLink @click="isCancellation=true"></u-cell>
			</u-cell-group>
 -->

			<!-- <view class="button" @click="showLoginOut=true">
				退出登录
			</view> -->

			<u-modal :show="showLoginOut" confirmColor='#A4D091' @cancel='cancel' @confirm="loginOut" title="提示"
				showCancelButton>
				<view class="slot-content" style="text-align: center;">
					确定退出账号？
				</view>

			</u-modal>

			<u-modal :show="isCancellation" confirmColor='#A4D091' @cancel='isCancellation=false'
				@confirm="cancellation" title="提示" showCancelButton>
				<view class="slot-content" style="text-align: center;">
					确定注销账号？
				</view>

			</u-modal>
		</view>
	</view>

</template>

<script>
	import storage from '@/utils/storage'
	import {
		getInfoById,
		deleteUser
	} from '@/api/user.js'
	import {
		getAgreement
	} from '@/api/login.js'
	export default {
		data() {
			return {
				showLoginOut: false, //是否退出提示框
				isCancellation: false, //是否注销账号
				agreementList: []
			};
		},
		onLoad() {
			getAgreement({
				type: '用户端'
			}).then(res => {
				console.log(res);
				this.agreementList = res.data
			})
		},
		methods: {

			loginOut() {
				const app = this
				const apps = getApp()
				apps.type = 'loginOut'
				uni.switchTab({
					url: '/pages/home/index'
				})
				app.$store.dispatch('Logout').then(result => {
						console.log(1111);

						// uni.switchTab({
						// 	url: '/pages/index/index',
						// 	fail(err) {
						// 		console.log(err)
						// 	}
						// })
					})
					.catch(err => {})
				uni.$TUIKit.logout().then(res => {
					console.info(res)
				})
			},
			cancel() {
				this.showLoginOut = false
			},
			goInfo() {
				//获取用户信息
				if (storage.get('ClientId')) {
					getInfoById(storage.get('ClientId')).then(res => {
						console.log(res);
						let userInfo = {}
						userInfo = res.data
						let arr = res.data.avatarUrl != null ? res.data.avatarUrl.split(',') : []
						//	this.fileList.push({url:arr[0]})
						let list = {
							userInfo: userInfo,
							type: 'info'
						}

						uni.navigateTo({

							url: '../personalInfo/personalInfo?item=' + JSON.stringify(list)
						})
					})
				}

			},
			cancellation() {
				deleteUser(storage.get('ClientId')).then(res => {
					this.isCancellation = false
					uni.showToast({
						title: '注销成功',
						duration: 800
					});
					uni.removeStorageSync(`address_refreash${storage.get('ClientId')}`)
					uni.removeStorageSync(`city${storage.get('ClientId')}`)
					uni.removeStorageSync(`address_info${storage.get('ClientId')}`)
					uni.removeStorageSync("AccessToken")
					uni.removeStorageSync("ClientId")
					uni.removeStorageSync(`isLogin${storage.get('ClientId')}`)
					setTimeout(function() {
						uni.switchTab({
							url: '/pages/center/index'
						})
					}, 800)
				})
			},
			goAboutUs() {
				uni.navigateTo({
					url: '../aboutUs/aboutUs'
				})
			},
			goUrl(i, type) {
				console.log(this.agreementList);
				let info = {
					name: type,
					content: getContent(this.agreementList, type)
				}

				uni.navigateTo({
					url: './privacyRegistrationAgreement/privacyRegistrationAgreement?info=' + encodeURIComponent(
						JSON
						.stringify(info)),

				})

				function getContent(arr, str) {
					let remark = ''

					arr.forEach(item => {
						if (item.agreementName.indexOf(str) != -1) {
							remark = item.remark
						}
					})
					return remark
				}
			}
		}
	}
</script>

<style>
	page {
		background: #F5F9FA;
	}
</style>
<style lang="scss" scoped>
	.button {

		width: 663rpx;
		height: 91rpx;
		background: #A4D091;
		border-radius: 45rpx;
		font-size: 36rpx;
		color: #FFFFFF;
		line-height: 91rpx;
		text-align: center;
		position: absolute;
		bottom: 200rpx;
		left: 43rpx;

	}

	a {
		text-decoration: none;
		color: #303133;
		display: flex;
		border-bottom: 2rpx solid #f0f0f1;
		padding: 0 28rpx;
		font-size: 25rpx;
		height: 112rpx;
		align-items: center;

		image {
			width: 39rpx;
			height: 39rpx;
		}

		text {
			margin-left: 10rpx;
			display: inline-block;
			width: 90%;
			font-size: 29rpx;
			font-weight: bold;
		}
	}
</style>