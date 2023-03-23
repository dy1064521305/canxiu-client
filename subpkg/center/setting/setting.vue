<template>
	<view class="">
		<view style="background-color: #fff;margin-top: 20rpx;">
			<u-cell-group>
					<u-cell
					icon='http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/22/218734d44ff9424eb9d9ef890a54d97e.png'
					title="个人信息" isLink @click="goInfo"></u-cell>
				<u-cell
					icon="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/22/39968dbaf39248618dbbbeef564e5c91.png"
					title="关于我们" isLink url="../aboutUs/aboutUs"></u-cell>
			</u-cell-group>


			<view class="button" @click="showLoginOut=true">
				退出登录
			</view>

			<u-modal :show="showLoginOut" confirmColor='#8dd8b1' @cancel='cancel' @confirm="loginOut" title="提示"
				showCancelButton>
				<view class="slot-content" style="text-align: center;">
					确定退出账号？
				</view>

			</u-modal>
		</view>
	</view>

</template>

<script>
	import storage from '@/utils/storage'
	import {
		getInfoById
	} from '@/api/user.js'
	export default {
		data() {
			return {
				showLoginOut: false, //是否退出提示框
			};
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

			},
			cancel() {
				this.showLoginOut = false
			},
			goInfo(){
				//获取用户信息
				if (storage.get('ClientId')) {
					getInfoById(storage.get('ClientId')).then(res => {
						console.log(res);
						let userInfo={}
						userInfo = res.data
						let arr = res.data.avatarUrl!=null?res.data.avatarUrl.split(','):[]
						//	this.fileList.push({url:arr[0]})
						let list={
							userInfo:userInfo,
							type:'info'
						}
						uni.navigateTo({
						
							url: '../personalInfo/personalInfo?item=' + JSON.stringify(list)
						})
					})
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
		background: #9FD6BA;
		border-radius: 45rpx;
		font-size: 36rpx;
		color: #FFFFFF;
		line-height: 91rpx;
		text-align: center;
		position: absolute;
		bottom: 200rpx;
		left: 43rpx;
	}
</style>
