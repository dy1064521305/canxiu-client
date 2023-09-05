<template>
	<view class="customer">
		<view class="tab">
			<view v-for="(item,index) in list" :key="index" @click="tabChange(index)">
				<view
					:style="{'display': 'flex','width': '100%','align-items': 'center','padding-left':index==0?'84rpx': '45rpx'}">
					{{item}}
					<image @click="question(item)" v-if="index!=0"
						style="width: 31rpx;height: 31rpx;margin-left: 10rpx;"
						src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/0b076ac258454779a88431fc8f26cb56.png"
						mode="">
					</image>
				</view>
				<view v-if="current==index" class="line">
				</view>
			</view>

		</view>
		<view style="margin: 20rpx;">
			共{{custormerList.length}}个客户
		</view>
		<view v-if="custormerList.length!=0">
			<view v-for="(item,index) in custormerList" :key="index" class="box">
				<view class="images">
					<u-avatar size="70" :src="item.avatarUrl" shape="circle"></u-avatar>
				</view>
				<view class="right">
					<view class="">
						{{item.nickName}}
					</view>
					<view style="color: #A5A7A7;font-size: 25rpx;">
						锁粉时间：{{item.regisTime}}
					</view>
				</view>
			</view>
		</view>
		<u-empty v-else marginTop='220'
			icon="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/04/cb8a19a85cd14c86ad85b72b97ea2d1e.png"
			text='您还未邀请客户'>
		</u-empty>

		<u-popup :show="show" @close="show=false" mode="bottom">
			<view style="padding:30rpx 40rpx 500rpx 40rpx;text-align: center;">
				<text style="font-weight: 600;">{{title}}</text>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import storage from '@/utils/storage'
	import {
		inviteCustormerList
	} from '@/api/invite.js'
	export default {
		data() {
			return {
				list: ['全部', '已锁粉客户', '失效客户'],
				current: 0,
				show: false,
				title: '',
				custormerList: []
			};
		},
		onLoad() {
			this.getList()
		},
		methods: {
			tabChange(i) {
				this.current = i
			},
			question(item) {
				this.title = item
				this.show = true
			},
			getList() {
				inviteCustormerList({
					userId: storage.get('ClientId'),
					s: 'c'
				}).then(res => {
					console.log(res)
					this.custormerList = res.data
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.customer {
		.tab {
			width: 100%;
			height: 76rpx;
			background: #fff;
			display: flex;
			padding-left: 18rpx;
			line-height: 62rpx;
			padding-top: 28rpx;

			view {
				width: 30%;

				.line {
					width: 109rpx;
					height: 14rpx;
					background: linear-gradient(90deg, #72DAA4 0%, #A4D091 100%);
					border-radius: 7rpx;
					margin: 0 auto;
				}

			}

		}

		.box {
			width: 707rpx;
			height: 174rpx;
			margin: 10rpx auto;
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
</style>
