<template>
	<view class="pay">
		<view class="top">
			<view class="title">
				实付金额
			</view>
			<view class="money">
				¥{{info.orderPrice}}
			</view>
		</view>
		<view class="method">
			<view style="	font-weight: bold;">
				选择支付方式
			</view>
			<view v-for="(item,index) in list" :key="index" class="box">
				<image :src="item.url"></image>
				<text style="display: inline-block;width:85%;">{{item.name}}</text>
				<view v-if="currentIndex==index" style="display: flex;align-items: center;">
					<image style="width: 32rpx;margin-right: 11rpx;"
						src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/cfc57172d7654b4ea531302d3592eca3.png"
						mode="widthFix"></image>
				</view>
				<view v-else class="un" @click="choseMethod(index)">
					<view class="circle"></view>
				</view>
			</view>
		</view>
		<view class="btn" @click="pay">
			确认支付
		</view>
	</view>
</template>

<script>
		import storage from '@/utils/storage'
	import * as pay from '@/api/pay.js'
	export default {
		data() {
			return {
				list: [{
						name: '微信支付',
						url: 'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/15/a0c74d821d914fa19d1755fd34e7d442.png',
					},
					{
						name: '支付宝支付',
						url: 'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/15/9955d4e3556e402091654a20d34956aa.png',
					},
					{
						name: '集团代付',
						url: 'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/15/7483d75ee78344d7b12762f5585a5bdd.png',
					},
				],
				currentIndex: undefined,
				info:{}
			};
		},
		onLoad(option) {
			this.info= JSON.parse(decodeURIComponent(option.item))
			console.log(this.info);
			// #ifdef MP-WEIXIN
			this.list.splice(1,1)
			// #endif
		},
		methods: {
			choseMethod(i) {
				this.currentIndex = i
			},
			pay() {
				if (this.currentIndex==undefined) {
					uni.showToast({
						title: '请选择支付方式',
						duration: 2000,
						icon:'none'
					});
				}else if(this.currentIndex==0){
					console.log(this.info);
					pay.weChatPay({
						clientId:storage.get('ClientId'),
						orderId:this.info.orderId,
						orderNumber:this.info.orderNumber,
						orderPrice:this.info.orderPrice,
						tradeType:'JSAPI'
					}).then(res=>{
						console.log(res);
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pay {

		.top {
			font-weight: bold;
			text-align: center;
			margin-top: 80rpx;

			.title {
				font-size: 36rpx;
				color: #3D3F3E;

			}

			.money {
				font-size: 54rpx;
				color: #EA6F2F;
				margin-top: 14rpx;
			}
		}

		.method {
			padding: 80rpx 30rpx;

			.box {
				display: flex;
				align-items: center;
				margin: 30rpx 0;
			}

			.un {

				color: #A5A7A7;

				.circle {
					width: 29rpx;
					height: 29rpx;
					border: 1px solid #D8DCDB;
					border-radius: 50%;
					margin-right: 11rpx;
				}
			}

			image {
				width: 54rpx;
				height: 54rpx;
				margin-right: 20rpx;
			}
		}

		.btn {
			width: 663rpx;
			height: 91rpx;
			line-height: 91rpx;
			background: #9FD6BA;
			border-radius: 45rpx;
			font-size: 36pxr;
			color: #FFFFFF;
			text-align: center;
			font-weight: bold;
			margin: 0 auto;
			margin-top: 400rpx;
		}
	}
</style>
