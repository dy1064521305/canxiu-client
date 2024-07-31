<template>
	<view class="inactiveList">
		<z-paging ref="paging" v-model="dataList" @query="getList">
			<view class="box" v-for="(item,index) in dataList" :key="index">
				<view class="left">
					<view style="color: #000000;">
						<text>商户ID： </text>
						{{item.clientId}}
					</view>
					<view style="font-size: 25rpx;color: #A5A7A7;margin-top: 14rpx;">
						<text>注册时间：</text>
						{{item.registerDate}}
					</view>
				</view>
				<view class="call" @click.stop="showPhoneHandle(item.phoneNumber)">
					联系ta
				</view>
			</view>

		</z-paging>

		<u-action-sheet round='20' :closeOnClickAction='false' @select='actionSelect' :closeOnClickOverlay='false'
			:actions="actionList" :show="showPhone"></u-action-sheet>
	</view>
</template>

<script>
	import {
		getInactiveList
	} from '@/api/invite.js'
	import storage from '@/utils/storage'
	import {
		callPhone
	} from '@/utils/phone.js'
	export default {
		data() {
			return {
				dataList: [],
				query: {
					pageSize: 10,
					pageNum: 1,
					inviterId: "",
				},
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
			};
		},
		onLoad(option) {
			if (option && option.activityId) {
				this.query.activityId = option.activityId
				this.query.inviterId = option.partnerId
			}
		},
		methods: {
			getList(pageNo, pageSize) {
				this.query.pageNum = pageNo;
				this.query.pageSize = pageSize;
				getInactiveList(this.query).then(res => {
					this.$refs.paging.completeByTotal(res.data, res.total);
					//this.info=res.data
				})
			},
			//显示电话
			showPhoneHandle(e) {
				console.log(e);
				this.showPhone = true
				this.actionList[0].name = e
			},
			actionSelect(e) {
				console.log(e);
				if (e.name == '取消') {
					this.showPhone = false
				} else {
					// #ifdef APP-PLUS
					callPhone(e.name, 'app')
					// #endif
					// #ifdef MP-WEIXIN
					callPhone(e.name, 'wx')
					// #endif
					this.showPhone = false
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.inactiveList {


		.box {
			background-color: #fff;
			padding: 28rpx;
			border-bottom: 1rpx solid #F8F8F8;
			font-size: 31rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 20rpx;

			.left {
				font-size: 28.99rpx;
			}

			.call {
				width: 140rpx;
				height: 56rpx;
				line-height: 56rpx;
				text-align: center;
				border-radius: 14rpx;
				border: 1rpx solid #A4D091;
				font-size: 28rpx;
				color: #A4D091;
			}
		}
	}
</style>