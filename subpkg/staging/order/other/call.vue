<template>
	<view class="page">
		<view class="all" v-for="(item,index) in allList" :key="index">
			<view class="name">{{item.name}}</view>
			<view class="items" v-for="(i,m) in item.list" :key="m" @click="call(i.phone)">
				<view class="items-top">{{i.nickName}} <text>({{i.name}})</text> </view>
				<view class="items-phone">{{i.phone}}</view>
			</view>
		</view>
		<!-- 拨打电话 -->
		<u-action-sheet round='20' :closeOnClickAction='false' @select='actionSelect' :closeOnClickOverlay='false'
			:actions="actionList" :show="showPhone"></u-action-sheet>

	</view>
</template>

<script>
	import {
		callPhone
	} from '@/utils/phone.js'
	export default {
		data() {
			return {
				allList: [{
						name: '门店联系人',
						list: [{
							nickName: "账号昵称",
							name: '哇哈',
							phone: '15705622318'
						}]
					},
					{
						name: '门店联系人',
						list: [{
								nickName: "账号昵称",
								name: '哇哈',
								phone: '15705622318'
							},
							{
								nickName: "账号昵称",
								name: '哇哈',
								phone: '15705622318'
							},
						]
					}
				],
				showPhone: false,
				actionList: [{
						name: ''
					},
					{
						name: '呼叫'
					},
					{
						name: '取消'
					},
				], //拨打电话
			}
		},
		onLoad() {

		},
		methods: {
			call(phone) {
				this.showPhone = true
				this.actionList[0].name = phone
			},
			actionSelect(e) {
				console.log(e);
				if (e.name == '取消') {
					this.showPhone = false
				} else {
					// #ifdef APP-PLUS
					callPhone(this.actionList[0].name, 'app')
					// #endif
					// #ifdef MP-WEIXIN
					callPhone(this.actionList[0].name, 'wx')
					// #endif
					this.showPhone = false
				}
			},

		}
	}
</script>

<style lang="scss" scoped>
	.page {
		height: 100%;
		font-size: 28rpx;

		.all {
			.name {
				padding: 20rpx 0 20rpx 24rpx;
			}

			.items {
				background-color: #fff;
				padding: 24rpx;
				border-bottom: 1rpx solid #f5f5f5;

				&-top {
					text {
						color: #999;
						font-size: 24rpx;
						margin-left: 10rpx;
					}
				}

				&-phone {
					color: #999;
					font-size: 24rpx;
					margin-top: 6rpx;
				}
			}

			.items:nth-last-child(1) {
				border-bottom: none;
			}
		}
	}
</style>