<template>
	<view class="page">
		<view class="all" v-for="(item,index) in selectList" :key="index">
			<view class="all-top acea-row row-between-wrapper">
				#{{index+1}}服务项
				<text @click="delItem(item,index)">
					<text class="iconfont icon-shanchu"></text>
					移除此项</text>
			</view>
			<view class="all-type" @click="$jump(-1)" v-if="item.serviceProjectVoList[0]">
				<view class="all-type-price acea-row row-between-wrapper">
					{{item.serviceProjectVoList[0].projectName }}
					<text>{{item.serviceProjectVoList[0].startingFreeDiscount}}元/个
						<text class="iconfont icon-iconmore-copy"></text>
					</text>
				</view>
				<text>分类：{{item.serviceProjectVoList[0].serviceTypeName}}</text>
			</view>
			<view class="all-price  acea-row row-between-wrapper">
				<view class="">服务数量 <text>（单位：个）</text> </view>
				<view class="right">
					<u-number-box min='1' v-model="item.projectNumber" class='number' button-size="26px" color="#ffffff"
						bgColor="#A4D091" @change='val=>numChange(item,val,index)' iconStyle="color: #fff">
					</u-number-box>
				</view>
			</view>
			<view class="all-remark">
				<view>
					<view class="">
						<text style="color: red">*</text><text style="margin:0 30rpx 14rpx 10rpx;">上传视频/图片</text>
					</view>
					<view style="color: #A5A7A7;font-size: 22rpx;margin: 17rpx 0;">
						请上传1-9张现场环境或设备故障视频/图片信息
					</view>
					<view style="width: 100%;margin: 20rpx 0">
						<cl-upload :listStyle="{columnGap: '10rpx',columns:'4',rowGap:'10rpx'}"
							:imageFormData="{size:10}" :videoFromData="{size:10}" :index='index'
							v-model="item.projectImg1" :headers="headers" :action="action"
							@onSuccess="onSuccesss($event,index)" @input='onInput'></cl-upload>
					</view>
				</view>
				<view style="align-items: center;">
					<view style="margin-bottom: 10rpx;">故障描述</view>
					<view style="font-size: 22rpx;color: #A5A7A7;">请简单描述故障或特殊需求备注信息</view>
					<view style='width: 100%; border: 1rpx solid #f5f5f5;border-radius: 10rpx;margin-top: 20rpx;'>
						<u--textarea height='72' border='none' maxlength='200' confirmType="done" v-model="item.remark1"
							placeholder="请输入内容" count></u--textarea>
					</view>
				</view>
			</view>
		</view>

		<view class="button acea-row row-between-wrapper">
			<view class="left">
				<view class=""> <text style="font-size: 22rpx;">￥</text>{{totalScore}} </view>
				<view style="font-size: 24rpx;">共{{this.selectList.length}}项</view>
			</view>
			<view class="btn">保存并提交审核</view>
		</view>
	</view>
</template>

<script>
	import storage from '@/utils/storage'
	const {
		environment
	} = require('@/config/environment')
	export default {
		data() {
			return {
				action: environment.baseURL + '/system/oss/upload',
				headers: {
					token: storage.get('AccessToken')
				},
				customerId: "",
				selectList: [],
				totalScore: 0
			}
		},
		onLoad(options) {
			if (options && options.customerId) {
				this.customerId = options.customerId
			}
			uni.$on('selectList2', (list) => {
				this.selectList = list
				this.selectList.forEach(i => {
					i.projectImg1 = []
					i.remark1 = ''
					i.projectNumber = 1
					i.startingFreeDiscount = i.serviceProjectVoList[0].startingFreeDiscount
					i.allPrices = Number(i.projectNumber) * Number(i.serviceProjectVoList[0]
						.startingFreeDiscount)
				})
				this.totalScore = this.selectList.reduce((pre, cur) => {
					return pre + cur.allPrices
				}, 0)
			})
			console.log(this.selectList, "this.selectList ");
		},
		methods: {
			numChange(item, value, i) {
				let flag = value.value < item.projectNumber ? -1 : 1
				item.projectNumber = value.value
				let obj = item
				this.$set(this.selectList, i, obj)
				this.selectList.forEach(item => {
					item.allPrices = Number(item.projectNumber) * Number(item.startingFreeDiscount)
				})
				this.totalScore = this.selectList.reduce((pre, cur) => {
					return pre + cur.allPrices
				}, 0)

			},
			// 移除服务项
			delItem(item, index) {
				this.$alert('温馨提示', 1, {
					content: '确定移除吗？',
					confirmText: '确认移除',
					cancelText: '我在想想',
				}).then((res) => {
					if (res.confirm) {
						this.selectList.splice(index, 1)
						if (this.selectList.length <= 0) {
							return this.totalScore = 0
						} else {
							this.totalScore = this.selectList.reduce((pre, cur) => {
								return pre + cur.allPrices
							}, 0)
						}
					}
				})

			},
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		height: 100%;
		font-size: 28rpx;
	}

	.all {
		background: #FFFFFF;
		border-radius: 16rpx;
		padding: 24rpx;
		margin: 24rpx;

		&-top {
			color: #666666;

			text {
				color: #212121;
			}

			.iconfont {
				color: $pageColor;
				margin-right: 4rpx;
			}
		}

		&-type {
			margin: 20rpx 0;

			text {
				color: #999;
				font-size: 24rpx;
			}

			&-price {
				font-size: 28rpx;

				text {
					color: #212121;
				}
			}
		}

		&-price {
			text {
				color: #999;
			}
		}

		&-remark {
			font-size: 28rpx;
			color: #3D3F3E;
			padding: 24rpx 0rpx;
			border-top: 1rpx solid #f5f5f5;
			margin-top: 24rpx;
		}
	}

	.button {
		background-color: #fff;

		padding: 24rpx 24rpx 40rpx;

		.left {
			font-size: 28rpx;
			text-align: center;
		}

		.btn {
			width: 50%;
			height: 80rpx;
			text-align: center;
			line-height: 80rpx;
			background: $pageColor;
			border-radius: 16rpx;
			border: 1rpx solid $pageColor;
			color: #fff;
		}

		.btn:nth-child(1) {
			border: 1rpx solid #CCCCCC;
			background: #FFFFFF;
			color: #212121;
		}
	}
</style>