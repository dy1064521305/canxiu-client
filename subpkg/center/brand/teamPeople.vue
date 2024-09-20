<template>
	<view class="page">
		<z-paging ref="paging" v-model="dataList" @query="getList(1,10)" @onRefresh='refresh()'>
			<view slot='top'>
				<view class="data-box acea-row row-middle">
					<view class="input acea-row row-middle">
						<view class=" acea-row row-middle">
							<view style="display: flex;align-items: center; font-size: 28rpx;" @click="showAction=true">
								{{whereType}}
								<view class="acea-row row-middle" style="margin-left: 10rpx;">
									<u-icon name="arrow-down-fill" size="10"></u-icon>
								</view>
							</view>
							<input type="text" @confirm="search()" v-model="searchValue" @input="seachValue"
								:placeholder="'请输入'+whereType">
							<view class="" style="position: absolute; top: 17rpx; right: 70rpx;">
								<u-icon v-if="searchValue" @click="search(1)" color="#D8DCDB"
									name="close-circle"></u-icon>
							</view>
							<view class="input-s" @click="search()"></view>
						</view>
					</view>
				</view>
			</view>
			<view class="page-list" v-for="(item,index) in dataList" @click="sure(item)" :key="index">
				<view class="page-list-item acea-row row-between-wrapper">
					<view class="page-list-item-left acea-row">
						<view class="image">
							<image v-if="item.avatarUrl==null||item.avatarUrl==''||item.avatarUrl=='null'"
								src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/23/5595ab7226854043abab1449a9067a94.png">
							</image>
							<image v-else :src="item.avatarUrl" mode=""></image>
						</view>
						<view class="page-list-item-left-name flex-colum">
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
					</view>
					<view class="page-list-item-right acea-row row-middle">
						<image v-if="item.partnerId==partnerId"
							src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/26/0533ff643a9b40acaa0fb32980d58842.png"
							mode=""></image>
						<image v-else
							src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/26/73f7603eb003465fa5198a7fb04cd22e.png"
							mode=""></image>
					</view>

				</view>
			</view>
			<view slot="bottom" class="content-btn  acea-row row-center" @click="saveEdit">
				<view>
					确定设置
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
			margin-top: 16rpx;

			&-item {
				&-left {
					.image {
						width: 80rpx;
						height: 80rpx;

						image {
							width: 100%;
							height: 100%;
							border-radius: 50%;
						}
					}

					&-name {
						font-size: 24rpx;
						color: #999999;
						margin-left: 20rpx;
						justify-content: space-between;
						padding: 4rpx 0;

						view {
							font-size: 28rpx;
							color: #212121;

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
				}

				&-right {
					image {
						width: 32rpx;
						height: 32rpx;
					}
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
</style>