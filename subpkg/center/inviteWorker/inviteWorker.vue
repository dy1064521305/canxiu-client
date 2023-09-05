<template>
	<view class="record">
		<view class="notice">
			<image src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/04/06c7fa758d564ca084ed11ab1d10787d.png"
				style="width:32rpx ;height: 29rpx;padding:10rpx 0 10rpx 30rpx;"></image>
			<text style="margin-left: 20rpx;">当前已邀请【{{workerList.length}}】人，请继续加油！</text>
		</view>

		<scroll-view v-if='workerList!=0' scroll-top="0" scroll-y="true" class="main">
			<view v-for="(item,index) in workerList" :key='index' class="box">
				<view class="images">
					<u-avatar size="70" :src="item.avatarUrl" shape="circle"></u-avatar>
				</view>
				<view class="right">
					<view class="">
						{{item.nickName}}
					</view>
					<view style="color: #A5A7A7;font-size: 25rpx;">
						注册时间：{{item.regisTime}}
					</view>
				</view>
			</view>
		</scroll-view>
		<view v-else class="main">
			<u-empty 
			marginTop='250'
				icon="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/04/cb8a19a85cd14c86ad85b72b97ea2d1e.png"
				text='您还未邀请师傅'
				>
			</u-empty>
		</view>

		<view class="btn">
			邀请师傅加入
		</view>


	</view>
</template>

<script>
	import storage from '@/utils/storage'
	import {
		inviteWorkerList
	} from '@/api/invite.js'
	export default {
		data() {
			return {
				workerList:[]
			};
		},
		onLoad() {
			this.getList()
		},
		methods: {
			getList() {
				inviteWorkerList({
					userId: storage.get('ClientId'),
					s: 'c'
				}).then(res => {
					console.log(res)
					this.workerList = res.data
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.record {
		.notice {
			position: fixed;
			/* #ifdef H5 */
			top: 80rpx;
			/* #endif */

			/* #ifdef APP-PLUS */
			top: -3rpx;
			/* #endif */
			/* #ifdef MP-WEIXIN */
			top: -3rpx;
			/* #endif */
			display: flex;
			align-items: center;
			width: 750rpx;
			height: 45rpx;
			background: #FFF0E9;
			font-size: 25rpx;
			color: #EC5722;
		}

		.main {
			width: 100%;
			height: 80vh;
			overflow: hidden;
			padding-top: 50rpx;

			.box {
				margin: 20rpx auto;
				width: 707rpx;
				height: 174rpx;
				background: #FFFFFF;
				box-shadow: 0px 0px 4px 0px rgba(42, 64, 55, 0.05);
				border-radius: 14rpx;
				display: flex;
				align-items: center;

				.images {
					width: 21%;
					margin-left: 20rpx;
				}

				.right {
					display: flex;
					flex-direction: column;
					justify-content: space-evenly;
					height: 100%;
				}
			}
		}

		.btn {
			//margin: 0 auto;
			width: 663rpx;
			height: 91rpx;
			background: #A4D091;
			border-radius: 45rpx;
			font-size: 36rpx;
			color: #FFFFFF;
			line-height: 91rpx;
			text-align: center;
			position: fixed;
			bottom: 50rpx;
			left: 50rpx;
		}
	}
</style>
