<template>
	<view class="invited">
		<view class="top">
			邀您注册餐修
		</view>
		<view class="img">
			<image style="width: 584rpx;"
				src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/09/50d721bf293546fcbc55ccba7f287382.png"
				mode="widthFix"></image>
		</view>
		<view class="box">
			<view style="border-bottom:2rpx solid  #F8F8F8 ;">
				<text>手机号</text>
				<input v-model="phone" type="text" placeholder="请输入手机号">
			</view>
			<view style="border-bottom:2rpx solid  #F8F8F8 ;">
				<text>邀请码</text>
				<input type="text">
			</view>
			<view style="display: flex;">
				<text>验证码</text>
				<input style="width: 60%;" v-model="code" type="text" placeholder="请输入验证码">
				<text v-if="countDownNum==0" style="color: #9FD6BA;" @click="getCode">获取验证码</text>
				<text style="color: #9FD6BA;margin-left:50rpx;" v-if="countDownNum!=0">{{countDownNum}}s</text>
			</view>
		</view>
		<view class="btn" @click="xiazai()">
			注册并下载APP
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
				已阅读并同意
				<text v-for="(item,index) in agreementList" @click="goAgreement(item)">《{{item.agreementName}}》<text
						v-if="index!=agreementList.length-1">、</text></text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getCode,
		getAgreement
	} from '@/api/login.js'
	import {
		isEmpty,
		isPhone
	} from '@/utils/verify.js'
	export default {
		data() {
			return {
				phone: '18974241028',
				code: '',
				countDownNum: 0, //获取验证码后倒数
				agreementList: [], //问题协议
				checked: false,
			};
		},
		onLoad() {
			this.getList()
		},
		methods: {
			getList() {
				getAgreement().then(res => {
					console.log(res);
					this.agreementList = res.data
				})
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
			//获取验证码
			getCode() {
				//校验手机号
				const app = this
				app.code = ''
				if (isEmpty(app.phone)) {
					console.log(11111111);
					uni.$u.toast('请输入手机号')
					return false
				}
				if (!isPhone(app.phone)) {
					uni.$u.toast('请输入正确的手机号')
					return false
				}
				this.countDown()
				// getCode({
				// 	phonenumber: this.phone
				// }).then(res => {
				// 	console.log(res);
				// })

			},
			check() {
				this.checked = !this.checked
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
			// 确认下载
			xiazai() {
				const app = this
				let valid = app.validItem();
				if (valid) {
					console.log(1111);
			
				}
			},
			//查协议内容
			goAgreement(item) {
				console.log(item);
				uni.navigateTo({
					url:'../../login/agreementDetailed/agreementDetailed?name='+item.agreementName
				})
			},
		}
	}
</script>

<style lang="scss">
	.invited {
		height: 100vh;
		background: url('http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/09/a6ab08fb6b014e3a9e539d41ae8fda89.png') no-repeat;
		background-size: 100% 73%;

		.top {
			font-size: 33rpx;
			color: #FFFFFF;
			font-weight: 600;
			text-align: center;
			padding-top: 90rpx;
		}

		.img {
			text-align: center;
			margin-top: 45rpx;
		}

		.box {
			width: 692rpx;
			height: 341rpx;
			background: #FFFFFF;
			box-shadow: 0px 0px 4px 0px rgba(42, 64, 55, 0.05);
			border-radius: 14rpx;
			margin: 267rpx auto 380rpx auto;

			display: flex;
			flex-direction: column;
			justify-content: space-evenly;

			view {
				padding: 30rpx 0;
				margin: 0 26rpx;
				display: flex;

				text {
					font-weight: 600;
				}

				input {
					margin-left: 20rpx;
				}
			}
		}

		.btn {
			width: 663rpx;
			height: 91rpx;
			background: #9FD6BA;
			border-radius: 45rpx;
			color: #fff;
			line-height: 91rpx;
			text-align: center;
			margin: 20rpx auto;
			font-weight: 600;
			font-size: 36rpx;
		}

		.fonts {
			margin: 29rpx 48rpx;
			display: flex;
			width: 686rpx;
			height: 65rpx;
			font-size: 22rpx;
			color: #A5A7A7;
			line-height: 30rpx;

			.check {
				width: 22rpx;
				height: 22rpx;
				border: 2rpx solid #A5A7A7;
				border-radius: 50%;
			}

			text {
				color: #9FD6BA;
			}
		}
	}
</style>
