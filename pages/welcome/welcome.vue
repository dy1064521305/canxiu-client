<template>
	<view class="container">
			<image src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/d41787b9de9b4297a56a408ccc6c1b3c.png" mode=""></image>
		<image src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/75537c81465d49b3916abd1ee8694e1f.png" mode=""></image>
		<image src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/5977b5c469e74618b390530e1c18fb75.png" mode=""></image>
		<image src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/9fcc269355a74bbc88555c445e67a791.png" mode=""></image>
		<view class="time" @click="pass">
			{{countDownNum}}跳过
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: '',
				countDownNum: 3
			};
		},
	
	onShow() {
		this.countDown()
	},
	methods: {
		//倒计时定时器
		countDown() {
			this.timer = setInterval(() => {
				this.countDownNum--	
				if (this.countDownNum <= 0) {
					clearInterval(this.timer);
					this.go()
				}
			}, 1000)

		},
		pass() {
			clearInterval(this.timer);
			this.go()
		},
		go() {
			uni.switchTab({
				url: '../home/index',
				fail(err) {
					console.log(err)
				}
			})
		}
	}
	}
</script>

<style lang="scss" scoped>
	.container {
		position: relative;
		height: 100vh;

		image:first-child {
			height: 100%;
			width: 100%;
		}

		image:nth-child(2) {
			position: absolute;
			width: 216rpx;
			height: 105rpx;
			//top: 489rpx;
			top: 29%;
			left: 266rpx;
		}

		image:nth-child(3) {
			position: absolute;
			width: 380rpx;
			height: 74rpx;
			//top: 812rpx;
			top: 50%;
			left: 190rpx;
		}

		image:nth-child(4) {
			position: absolute;
			width: 399rpx;
			height: 40rpx;
			//top: 888rpx;
			top: 55%;
			left: 174rpx;
		}

		.time {
			position: absolute;
			bottom: 84rpx;
			right: 50rpx;
			width: 112rpx;
			height: 52rpx;
			border-radius: 20px;
			background-color: azure;
			color: gray;
			text-align: center;
			line-height: 52rpx;
		}
	}
</style>
