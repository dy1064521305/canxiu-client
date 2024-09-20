 <template>
 	<view class="page">
 		<u-navbar safeAreaInsetTop placeholder @leftClick='leftClick' title="指派师傅">

 		</u-navbar>
 		<view class="bg">
 			<view class="bg-t">请选择您指派的师傅</view>
 			<view class="bg-m">优先派单给你指定师傅，但是师傅超30分钟未响应，订单将自动回到接单大厅由其他师傅进行接单</view>
		<!-- 	<view style="height: 72vh;overflow: scroll;"> -->
				<view class="bg-c" v-for="(item,i)  in workerList" :key="i">
					<view class="bg-c-top" v-if="item.isExclusive=='1'">专属师傅</view>
					<view class="bg-c-content acea-row">
						<view class="bg-c-content-img">
							<image v-if="item.avatarUrl!=null"
								:src="item.avatarUrl"
								mode=""></image>
							<image v-else
								src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/06/19/fea1dd65eb384dcf92ca712b4e5463ee.png"
								mode=""></image>
						</view>
						<view class="bg-c-content-peo">
							<view class="bg-c-content-peo-t acea-row row-middle">
								<text>{{item.workerName}}</text>
								<image :src="item.levelIcon" mode=""></image>
							</view>
							<view class="bg-c-content-peo-z">已合作 <text>{{item.cooperationCount}}</text> 次 </view>
							<view class="bg-c-content-peo-z">服务区域：{{item.region}}</view>
							<view class="bg-c-content-peo-z">工种信息：{{item.workerTypes}}</view>
						</view>
					</view>
					<view class="bg-c-type acea-row row-between-wrapper">
						<view class="bg-c-type-item">完成服务 <text>{{item.completedCount}}</text>单 </view>
						<!-- 	<view class="bg-c-type-item">返修率 <text>0.0%</text></view>
						<view class="bg-c-type-item">履约率 <text>100%</text> </view> -->
					</view>
				
					<view class="bg-c-btn" @click="isZhiPaiHandle(item.workerId)">
						<view :class="{on:iszhiList.includes(item.workerId)}">
							{{iszhiList.includes(item.workerId)?'已指派':'指派ta'}}
						</view>
					</view>
				</view>
				<view v-if="cooperationWorker&&cooperationWorker.length!=0">
					<view class="acea-row row-middle row-center" style="color:#A5A7A7; font-size:25.36rpx; margin-top: -6px;">
						-合作过的师傅-</view>
					<view class="lists" v-for="(item,i)  in cooperationWorker" :key="i">
						<view class="lists-item">
							<view class="lists-item-top acea-row">
								<view class="lists-item-top-img">
									<image v-if="item.avatarUrl!=null"
										:src="item.avatarUrl"
										mode=""></image>
									<image v-else
										src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/06/19/fea1dd65eb384dcf92ca712b4e5463ee.png"
										mode=""></image>
								</view>
								<view class="lists-item-top-peo">
									<view class="lists-item-top-peo-t acea-row row-middle">
										<text>{{item.workerName}}</text>
									</view>
									<view class="lists-item-top-peo-z">已合作 <text>{{item.cooperationCount}}</text> 次 </view>
									<view class="lists-item-top-peo-z">服务区域：{{item.region}}</view>
									<view class="lists-item-top-peo-z">工种信息：{{item.workerTypes}}</view>
								</view>
							</view>
							<view class="lists-item-bottom acea-row row-middle">
								<view class="lists-item-bottom-btn" :class="{on:iszhiList.includes(item.workerId)}"
									@click="isZhiPaiHandle(item.workerId)">
									{{iszhiList.includes(item.workerId)?'已指派':'指派ta'}}
								</view>
							</view>
						</view>
					</view>
				</view>
		<!-- 	</view> -->
		</view>
 	

 	</view>
 </template>

 <script>
 	import storage from '@/utils/storage'
 	import {
 		findWorker
 	} from '@/api/order.js'
 	export default {
 		data() {
 			return {
 				iszhiList: [],
 				serviceIds: [],
 				workerList: [],
 				cooperationWorker: [],
				allWorkerList:[]
 			}
 		},
 		onLoad(option) {
 			let info = JSON.parse(option.info)
 			if (info.workerList) {
 				this.iszhiList = info.workerList.map(item => item.workerId)
 			}
 			console.log(this.iszhiList);
 			this.serviceIds = info.serviceIds
 			console.log(this.serviceIds);
 			this.getList()
 		},
 		methods: {
 			getList() {
 				findWorker({
 					clientId: storage.get('ClientId'),
 					serviceIds: this.serviceIds
 				}).then(res => {

 					res.data.forEach(item => {
 						item.iszhi = false
 						let arr = item.serviceAddress.split('/')
 						item.region = arr[1] + '-' + arr[2]
 						if (item.isExclusive =='0') {
 							this.cooperationWorker.push(item)
 						}else{
							this.workerList.push(item)
							
						}
 					})
					this.allWorkerList=res.data
 				})
 			},
 			isZhiPaiHandle(id) {
 				let bool = this.iszhiList.includes(id)
 				console.log(bool);
 				if (bool) {
					console.log(id,this.iszhiList);
 					let index = this.iszhiList.findIndex(item => {
 						return item == id
 					})
 					this.iszhiList.splice(index, 1)
					console.log(index);
 				} else {
 					this.iszhiList.push(id)
 				}
				console.log(this.iszhiList);
 			},
 			leftClick() {
				console.log('hidehiade');
				let arr = []
				this.allWorkerList.forEach(item => {
					if (this.iszhiList.includes(item.workerId)) {
						arr.push(item)
					}
				})
				this.iszhiList=[]
 				const pages = uni.$u.pages()
 				pages[pages.length - 2].$vm.getWorkerlist(arr)
 				uni.navigateBack()
 			}
 		}
 	}
 </script>

 <style lang="scss" scoped>
 	.page {
 		min-height: 100vh;

 		.bg {
 			height: 638rpx;
 			background: url("https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/02/e567cd96188046f69c4d51b698277b0c.png") no-repeat;
 			background-size: 100% 100%;
 			padding: 36rpx 30rpx 0;
 			font-size: 26rpx;
 			color: #FFFFFF;

 			&-t {
 				font-family: PingFangSC, PingFang SC;
 				font-weight: 500;
 				font-size: 43rpx;
 			}

 			&-m {
 				font-family: PingFangSC, PingFang SC;
 				font-weight: 500;
 				font-size: 25rpx;
 				margin: 20rpx 0 50rpx;
 			}

 			&-c {
 				// height: 419rpx;
 				background: #FFFFFF;
 				border-radius: 14rpx;
 				position: relative;
 				padding: 28rpx 20rpx;
 				box-sizing: border-box;
				margin-bottom: 20rpx;
 				&-top {
 					position: absolute;
 					top: 0;
 					width: 139rpx;
 					height: 45rpx;
 					background-color: #A4D091;
 					border-radius: 14rpx 0 0 0;
 					text-align: center;
 					line-height: 45rpx;
 					font-size: 25rpx;
					z-index: 10;
					left: 0;
 				}

 				&-content {
 					// height: 181rpx;

 					&-img {
 						width: 181rpx;
 						height: 181rpx;
 						// background-color: #ececec;
 						border-radius: 50%;

 						image {
 							width: 100%;
 							height: 100%;
 							border-radius: 10rpx;
 						}
 					}

 					&-peo {
 						margin-left: 32rpx;

 						&-t {
 							font-family: PingFangSC, PingFang SC;
 							font-weight: 500;
 							font-size: 33rpx;
 							color: #3D3F3E;
 							margin-bottom: 18rpx;

 							image {
 								width: 136rpx;
 								height: 33rpx;
 								margin-left: 10rpx;

 							}
 						}

 						&-z:nth-child(3) {
 							margin: 5rpx 0;
 						}

 						&-z {
 							max-width: 434rpx;
 							ord-wrap: break-word;
 							word-break: normal;
 							color: #A5A7A7;

 							text {
 								color: #A6D193;
 								font-weight: 500;
 							}
 						}
 					}
 				}

 				&-type {
 					height: 65rpx;
 					background: #ECF7ED;
 					border-radius: 7rpx;
 					padding: 0 12rpx;
 					margin: 30rpx 0;
 					font-size: 25rpx;

 					&-item {
 						color: #A5A7A7;

 						text {
 							color: #A4D091;
 							font-weight: 500;
 						}
 					}
 				}

 				&-btn {
 					width: 100%;
 					display: flex;
 					justify-content: flex-end;

 					view {
 						width: 143rpx;
 						height: 60rpx;
 						background: #A4D091;
 						border-radius: 10rpx;
 						text-align: center;
 						line-height: 60rpx;
 						font-size: 29rpx;

 						// margin-right: 16rpx;
 						&.on {
 							border: 1rpx solid #A4D091;
 							background: #fff;
 							color: #A4D091;
 						}
 					}


 				}
 			}
 		}

 		.lists {

 			margin-top: 16rpx;
 			// padding: 0 30rpx;

 			&-item {
 				margin-bottom: 22rpx;
 				background: #FFFFFF;
 				border-radius: 14rpx;

 				&-top {
 					padding: 26rpx 30rpx;

 					&-img {
 						width: 100rpx;
 						height: 100rpx;
 						// background: #ECF7ED;

 						image {
 							width: 100%;
 							height: 100%;
 							border-radius: 14rpx;
 						}
 					}

 					&-peo {
 						margin-left: 24rpx;

 						&-t {
 							font-family: PingFangSC, PingFang SC;
 							font-weight: 500;
 							font-size: 33rpx;
 							color: #3D3F3E;
 							margin-bottom: 14rpx;
 						}

 						&-z:nth-child(3) {
 							margin: 5rpx 0;
 						}

 						&-z {
 							font-size: 24rpx;
 							max-width: 434rpx;
 							ord-wrap: break-word;
 							word-break: normal;
 							color: #A5A7A7;

 							text {
 								color: #A6D193;
 								font-weight: 500;
 							}
 						}
 					}
 				}

 				&-bottom {
 					border-top: 1rpx solid #E5E5E5;
 					padding: 22rpx 48rpx;
 					justify-content: flex-end;

 					&-btn {
 						width: 143rpx;
 						height: 60rpx;
 						background: #A4D091;
 						border-radius: 14rpx;
 						text-align: center;
 						line-height: 60rpx;
 						font-size: 29rpx;
 						color: #fff;

 						&.on {
 							border: 1rpx solid #A4D091;
 							background: #fff;
 							color: #A4D091;
 						}
 					}


 				}

 			}
 		}
 	}
 </style>