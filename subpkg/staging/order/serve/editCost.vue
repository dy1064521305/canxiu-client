<template>
	<view class="page">
		<z-paging ref="paging" v-model="dataList" @query="getList(1,10)" @onRefresh='refresh()'>
			<view slot='top'>
			</view>
			<view class="button acea-row row-between-wrapper">
				<view class="btn" @click="showAction=true">全部移除</view>
				<view class="btn" @click="$jump(-1)">+添加费用项</view>
			</view>
			<view class="page-list" v-for="(item,index) in dataList" @click="sure(item)" :key="index">
				<view class="page-list-item acea-row row-between-wrapper">
					<view class="page-list-item-left acea-row flex-colum">
						<view class="acea-row row-middle">
							<view class="name line1">
								{{item.realName}}
							</view>
							<view class="color">
								{{item.partnerType==1?'中级':item.partnerType==2?'高级':'初级'}}合伙人
							</view>
						</view>
						<text>{{item.region}}</text>
					</view>
					<view class="page-list-item-right acea-row row-middle">
						<text>
							<text class="iconfont icon-shanchu"></text>
							移除此项</text>
					</view>

				</view>
				<view class="price">
					<view class="  acea-row row-between-wrapper">
						单价
						<input style="text-align: right;" type="text" placeholder="请输入单价" />
					</view>
					<view class=" acea-row row-between-wrapper">
						数量
						<view class="right">
							<u-number-box min='1' v-model="projectNumber" class='number' button-size="26px"
								color="#ffffff" bgColor="#A4D091" @change='val=>numChange(item,val,index)'
								iconStyle="color: #fff">
							</u-number-box>

						</view>
					</view>
				</view>
			</view>
			<view slot="bottom" class="content-btn  acea-row row-center" @click="saveEdit">
				<view>
					保存编辑
				</view>
			</view>
			<u-action-sheet round='20' :closeOnClickAction='false' @select='actionSelect_two'
				:closeOnClickOverlay='false' :actions="showTypeChange" :show="showAction"></u-action-sheet>
		</z-paging>

	</view>
</template>

<script>
	import {
		getTeamList
	} from "@/api/brand.js"
	import storage from '@/utils/storage'
	const img_no = 'https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/26/73f7603eb003465fa5198a7fb04cd22e.png'
	const img_yes = 'https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/26/0533ff643a9b40acaa0fb32980d58842.png'
	export default {
		data() {
			return {

				where: {
					realName: "",
					cellPhone: "",
					startTime: "",
					endTime: "",
					regionList: [],
					relationType: "",
					userId: storage.get('ClientId'),
					pageSize: 10,
					pageNum: 1
				},
				dataList: [],
				whereType: '姓名',
				showAction: false,
				searchValue: "",
				showTypeChange: [{
						name: '姓名'
					},
					{
						name: '手机号'
					},
					{
						name: '取消'
					},
				],
				partnerId: "",
				realName: "",
			}
		},
		onLoad(options) {
			if (options && options.partnerId) {
				this.partnerId = options.partnerId || ''
			}
		},
		methods: {
			getList(pageNo, pageSize) {
				this.showScreen = false
				this.where.pageNum = pageNo
				this.where.pageSize = pageSize
				getTeamList(this.where).then(res => {
					if (!res.data) {
						this.dataList = []
					}
					// res.rows.forEach(item => {
					// 	item.img_no = img_no
					// 	item.img_yes = img_yes
					// 	item.check = false
					// })
					this.$refs.paging.completeByTotal(res.rows, res.total);

				})
			},
			search(i) {
				if (i) {
					this.searchValue = ''
					this.where.realName = ''
					this.where.cellPhone = ""
				} else {
					if (this.whereType == '姓名') {
						this.where.realName = this.searchValue
						this.where.cellPhone = ""
					} else {
						this.where.cellPhone = this.searchValue
						this.where.realName = ""
					}
				}

				this.$refs.paging.reload()
			},
			actionSelect_two(e) {
				if (e.name == '取消') {
					this.showAction = false
				} else {
					this.whereType = e.name
					this.showAction = false
				}
			},
			sure(item) {
				this.partnerId = item.partnerId
				this.realName = item.realName

			},
			saveEdit() {
				if (!this.partnerId || this.partnerId == 'null') return this.$toast('请先选择')
				uni.$emit('brandTeam', {
					partnerId: this.partnerId,
					realName: this.realName
				})
				setTimeout(() => {
					this.$jump(-1)
				}, 600)
			},
			refresh() {
				this.where = {
						realName: "",
						cellPhone: "",
						startTime: "",
						endTime: "",
						regionList: [],
						relationType: "",
						userId: storage.get('ClientId'),
						pageSize: 10,
						pageNum: 1
					},
					this.$refs.paging.reload();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		height: 100%;

		.data-box {
			background: #fff;
			padding: 22rpx 22rpx 16rpx 22rpx;

			&.on {
				padding: 22rpx 22rpx 22rpx 22rpx;
			}

			.input {
				// width: 563rpx;
				flex: 1;
				padding: 0 30rpx;
				background-color: rgb(242, 242, 242);
				border-radius: 50rpx;
				height: 62rpx;
				position: relative;

				input {
					width: 340rpx;
					height: 62rpx;
					margin-left: 20rpx;
					font-size: 26rpx;
				}

				.input-s {
					position: absolute;
					top: 19rpx;
					right: 30rpx;
					width: 25rpx;
					height: 25rpx;
					background: url("https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/02/31fd266c68a248babb495e4aa76f9408.png") no-repeat;
					background-size: 100% 100%;
				}

			}
		}

		&-list {
			background-color: #fff;
			padding: 24rpx 30rpx 24rpx 22rpx;
			margin: 20rpx;
			box-sizing: border-box;
			border-radius: 18rpx;

			&-item {
				&-left {
					font-size: 24rpx;
					color: #999999;
					justify-content: space-between;
					padding: 4rpx 0;

					view {
						font-size: 28rpx;
						color: #212121;
						margin-bottom: 6rpx;

						.name {
							max-width: 380rpx;
						}

						.color {
							display: inline-block;
							background: $pageColor;
							font-size: 20rpx;
							padding: 2rpx 8rpx;
							color: #fff;
							border-radius: 6rpx;
							margin-left: 10rpx;
						}
					}

				}

				&-right {
					font-size: 28rpx;

					.iconfont {
						color: $pageColor ;
						margin-right: 10rpx;
					}
				}

			}

			.price {
				padding: 20rpx;
				background: #F5F5F5;
				font-size: 28rpx;
				margin-top: 20rpx;

				text {
					color: #999999;
				}

				.right {
					margin-top: 10rpx;
				}
			}
		}

		.content-btn {
			height: 130rpx;
			background-color: #FFFFFF;
			padding: 26rpx 22rpx 8rpx;

			view {
				width: 100%;
				height: 88rpx;
				background: $pageColor;
				border-radius: 8rpx;
				font-family: PingFangSC, PingFang SC;
				font-weight: 500;
				font-size: 32rpx;
				color: #FFFFFF;
				text-align: center;
				line-height: 88rpx;
			}
		}
	}

	.button {
		padding: 24rpx 24rpx 0rpx;

		.btn {
			width: 48%;
			height: 80rpx;
			text-align: center;
			line-height: 80rpx;
			background: $pageColor;
			border-radius: 16rpx;
			border: 1rpx solid $pageColor;
			color: #fff;
		}

		.btn:nth-child(1) {
			border: 1rpx solid #f5f5f5;
			background: #FFFFFF;
			color: #212121;
		}
	}
</style>