<template>
	<view class="invitStore">
		<z-paging ref="paging" v-model="customerList" @query="getList" @onRefresh='reset'>
			<view slot='top'>
				<view class="search">
					<u-search :showAction="false" placeholder="商家名称/联系人电话" @clear='queryList' v-model="query.keyWord"
						@search="queryList">
					</u-search>
					<view class="top_list">
						<view class="status">
							<view class="filter-row acea-row row-middle">
								<view v-for="(item, index) in searchTypes" :key="index"
									class="filter-row-item acea-row row-middle" :class="{on: searchIndex == index}"
									@click="productSort(item, index)">
									{{item.label}}
									<template v-if="item.auto" class="sort">
										<image v-if="(item.order_by!=1||item.order_by!=0) &&searchIndex != index"
											class="twosort" :src="item.img0" mode="">
										</image>
										<view v-if="searchIndex == index">
											<image v-if="item.order_by === 1" :src="item.img_top" mode="">
											</image>
											<image v-else-if="item.order_by ===0" class="bottomsort"
												:src="item.img_bottom" mode="">
											</image>
										</view>
									</template>
								</view>
							</view>
						</view>
						<!-- <view class="status">
							<view :style="{'margin':index==1?'0 16rpx':''}" class="box"
								v-for="(item,index) in searchList" :key="index">
								{{item}}
								<view>
									<view style="margin-left: 10rpx;">
										<view @click.stop="sortIconClick(index,1,true)">
											<u-icon size="12" v-if="query.orderBy!=index||!asc" name="arrow-up-fill"
												color="#D8DCDB"></u-icon>
										</view>
										<view @click.stop="sortIconClick(index,1,false)">
											<u-icon size="12" v-if="query.orderBy==index&&asc" name="arrow-up-fill"
												color="#3D3F3E"></u-icon>
										</view>

									</view>
									<view style="margin-left: 10rpx;">
										<view @click.stop="sortIconClick(index,0,true)">
											<u-icon size="12" v-if="query.orderBy!=index||!desc" name="arrow-down-fill"
												color="#D8DCDB"></u-icon>
										</view>
										<view @click.stop="sortIconClick(index,0,false)">
											<u-icon size="12" v-if="query.orderBy==index&&desc" name="arrow-down-fill"
												color="#3D3F3E"></u-icon>
										</view>
									</view>
								</view>
							</view>
						</view> -->
						<view @click="showScreen=!showScreen">
							<image style="width:22rpx;height: 21rpx;margin-right: 10rpx;"
								src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/06/e73a15fdff4b45bbbc722521a28dec7b.png"
								mode=""></image>筛选
						</view>
					</view>
					<view v-if="showScreen" class="hidden">
						<view class="screen">
							<view class="box" @click="choseIndex=0">
								门店类型{{storeTypeInfo.typeName=='全部类型'?'':`：${storeTypeInfo.typeName}`}}<u-icon size="12"
									name="arrow-down-fill" color="#A4D091"></u-icon>
							</view>
							<view class="box" @click="choseIndex=1">
								所属商圈{{districtInfo.districtName=='全部商圈'?'':`：${districtInfo.districtName}`}}<u-icon
									size="12" name="arrow-down-fill" color="#A4D091"></u-icon>
							</view>

							<pickers types='store' @address="address">
								<view class="box">
									所属区域{{region[0]!='全国'?`：${region[2]}`:''}}<u-icon size="12" name="arrow-down-fill"
										color="#A4D091"></u-icon>
								</view>
							</pickers>


						</view>
						<view :class="['more',storeTypeList.length>=9?'isScroll':'']" v-if="choseIndex!=1">
							<view v-for="(item,index) in storeTypeList" :key="index"
								:class="['more_box',item.typeName==storeTypeInfo.typeName?'active_box':'unactive_box']"
								@click="choseInfoHandle(item,'store')">
								{{item.typeName}}
							</view>


						</view>
						<view :class="['more',districtList.length>=9?'isScroll':'']" v-if="choseIndex!=0">
							<view v-for="(item,index) in districtList" :key="index"
								:class="['more_box',item.districtName==districtInfo.districtName?'active_box':'unactive_box']"
								@click="choseInfoHandle(item,'district')">
								{{item.districtName}}
							</view>
						</view>
						<view class="btns">
							<view class="btn_green" @click="resetSearch">
								重置条件
							</view>
							<view class="btn-white" @click="submit">
								确定
							</view>
						</view>
					</view>
				</view>
				<view v-if="inviteStore!=0" class="alert"
					@click="$jump('/subpkg/center/inviteActivity/inactiveList/inactiveList?activityId='+query.activityId+'&partnerId='+partnerInfo.partnerId)">
					<u-icon name="info-circle-fill" color="#FF991C" size='20'></u-icon>
					<text style="margin-left: 20rpx;">还有{{inviteStore}}家商户未激活账号</text>
				</view>

			</view>

			<view class="boxs" v-for="(item,i) in customerList" :key="i">
				<view class="box_top">
					<view style="display: flex;">
						<view style="display: flex;align-items:center">
							<view class="" v-if="item.storeImg">
								<image :src="item.storeImg"
									style="width: 72rpx;height: 72rpx;margin-right: 20rpx;border-radius: 10rpx;">
								</image>
							</view>
							<image v-else src="../../../static/logo.png"
								style="width: 72rpx;height: 72rpx;margin-right: 20rpx;border-radius: 10rpx;"></image>

						</view>
						<view>
							<view class="">
								{{item.storeName}}
							</view>
							<view class="acea-row row-middle"
								style="font-size: 25rpx;color: #A5A7A7;margin-top: 14rpx;">
								{{item.storeType}}<text style="margin: 0 4rpx;" v-if="item.businessDistrict">|
								</text> {{item.businessDistrict}}

							</view>
						</view>

					</view>
					<view class="call" @click.stop="showPhoneHandle(item)">
						联系ta
					</view>
				</view>
				<view class="box_main">
					<view class="">
						<view class="price">
							{{item.orderCount}}
						</view>
						<view class="title">
							累计下单
						</view>
					</view>
					<view class="">
						<view class="price">
							{{item.unDistributeCount}}
						</view>
						<view class="title">
							待分配订单
						</view>
					</view>
					<view class="">
						<view class="price">
							{{item.rewardAmount}}
						</view>
						<view class="title">
							分成奖励
						</view>
					</view>
				</view>
				<view class="box_bottom">
					<!-- <text style="color: #A5A7A7;">注册时间：2024-12-12 12:1</text>
					<text style="color: #F40000;">*超过30日未登录</text> -->
				</view>
			</view>



		</z-paging>


		<u-action-sheet round='20' :closeOnClickAction='false' @select='actionSelect' :closeOnClickOverlay='false'
			:actions="actionList" :show="showPhone"></u-action-sheet>
	</view>
</template>

<script>
	import storage from '@/utils/storage'
	import {
		callPhone
	} from '@/utils/phone.js'
	import pickers from "../ming-picker/ming-picker.vue"
	import {
		getStoreType,
		inviteCustomerRecord,
		districtList,
		getInactiveList
	} from '@/api/invite.js'
	import {
		getGetPartnerld
	} from "@/api/brand.js"
	const sortImg = 'https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/13/72eb9cbdf6ba47a2bd0c40c22cd579ef.png'
	export default {

		components: {
			pickers
		},
		data() {
			return {
				showScreen: false,
				area: "拱墅区",
				storeTypeInfo: {
					typeId: "",
					typeName: "全部类型"
				},
				districtInfo: {
					districtId: '',
					districtName: '全部商圈'
				},
				choseIndex: 0,
				storeTypeList: [], //店铺类型
				districtList: [],
				customerList: [],
				searchList: ['累计下单', '待分配订单', '分成奖励'],
				query: {
					pageSize: 10,
					pageNum: 1,
					keyWord: '',
					inviterId: '',
					// isAsc: 0,
					// orderBy: 0
				},
				region: ['全国'],
				asc: false,
				desc: false,
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
				showPhone: false, //底部电话显示
				inviteStore: 0,
				partnerInfo: {},
				searchTypes: [{
						label: '累计下单',
						sort_by: 1,
						order_by: 0,
						auto: true,
						img0: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/13/d7c54d6facf1417f85c6fd7f2153e498.png",
						img_top: sortImg,
						img_bottom: sortImg,
					},
					{
						label: '待分配订单',
						sort_by: 2,
						order_by: 0,
						auto: true,
						img0: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/13/d7c54d6facf1417f85c6fd7f2153e498.png",
						img_top: sortImg,
						img_bottom: sortImg,
					},
					{
						label: '分成奖励',
						sort_by: 3,
						order_by: 0,
						auto: true,
						img0: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/13/d7c54d6facf1417f85c6fd7f2153e498.png",
						img_top: sortImg,
						img_bottom: sortImg,
					}
				],
				searchIndex: -2
			};
		},
		onLoad(option) {
			if (option && option.activityId) {
				this.query.activityId = option.activityId
			}
			if (option && option.partnerId) {
				this.query.inviterId = option.partnerId
			}
			this.getLoad()
		},
		methods: {
			productSort(item, index) {
				console.log(item, "rrr");
				console.log(index, "iii");
				if (item.order_by === 2) {
					this.searchTypes[index].order_by = 1
				} else if (item.order_by === 1) {
					this.searchTypes[index].order_by = 0
				} else if (item.order_by === 0) {
					this.searchTypes[index].order_by = 1
				}
				this.query.orderBy = index
				this.query.isAsc = item.order_by
				this.searchIndex = index;
				this.getList()
			},
			getLoad() {
				getStoreType().then(res => {
					this.storeTypeList = [{
						"typeId": "",
						"typeName": "全部类型"
					}, ...res.data]
				})
				districtList().then(res => {
					this.districtList = [{
						"districtId": "",
						"districtName": "全部商圈"
					}, ...res.rows]
				})
				getInactiveList({
					inviterId: this.query.inviterId || '',
					activityId: this.query.activityId
				}).then(res => {
					this.inviteStore = res.data.length
				})

			},
			getList(pageNo, pageSize) {
				inviteCustomerRecord(this.query).then(res => {
					console.log(1111);
					this.$refs.paging.completeByTotal(res.data, res.total);

				})

			},
			reset() {
				this.choseIndex = 0
				this.resetSearch()
				this.query = {
						pageSize: 10,
						pageNum: 1,
						keyWord: '',
						isAsc: '',
						orderBy: '',
						inviterId: this.partnerInfo.partnerld,
						activityId: this.query.activityId
					},
					this.asc = this.desc = false
				this.$refs.paging.reload();
			},
			queryList() {
				this.$refs.paging.reload();
			},
			//升序降序
			sortIconClick(index, type, flag) {
				this.query.orderBy = flag ? index : ''
				if (type == 1) {
					this.desc = false
					this.asc = flag
				} else {
					this.asc = false
					this.desc = flag
				}
				this.query.isAsc = flag ? type : ''
				this.getList()
			},
			address(e) {
				console.log(e) //携带的参数
				this.region = e.value1
			},
			choseInfoHandle(item, type) {
				type == 'store' ? this.storeTypeInfo = item : this.districtInfo = item

			},
			//显示电话
			showPhoneHandle(e) {
				console.log(e);
				this.showPhone = true
				this.actionList[0].name = e.adminPhone
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
			submit() {
				console.log(this.query, '2231212');

				this.query.storeTypeId = this.storeTypeInfo.typeId
				this.query.businessDistrictId = this.districtInfo.districtId
				this.query.region = this.region[0] == '全国' ? '' : this.region.toString().replace(/,/g, "/")

				this.showScreen = false
				this.$refs.paging.reload();
			},
			resetSearch() {
				this.storeTypeInfo = {
					typeId: "",
					typeName: "全部类型"
				}
				this.districtInfo = {
					districtId: '',
					districtName: '全部商圈'
				}
				this.region = ['全国']
			}
		}
	}
</script>

<style lang="scss">
	.invitStore {

		.search {
			background: #fff;
			padding: 20rpx;

			.top_list {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin: 22rpx 10rpx 0;

				.status {
					font-size: 30rpx;

					display: flex;

					.box {
						color: #3D3F3E;
						justify-content: center;
						display: flex;

						border-radius: 14rpx;
					}



				}
			}

		}

		.hidden {
			position: absolute;
			z-index: 10000;
			background-color: #fff;
			left: 0;
			padding: 0 20rpx 20rpx;

			.screen {
				display: flex;
				margin-top: 20rpx;
				flex-wrap: wrap;

				.box {
					background: #ECF7ED;
					border-radius: 30rpx;
					padding: 11rpx 20rpx;
					font-size: 25rpx;
					color: #A4D091;
					display: flex;
					align-items: center;
					margin-right: 10rpx;
					margin-top: 10rpx;
				}
			}

			.isScroll {
				height: 294rpx;
				overflow: scroll;
			}

			.more {
				display: flex;
				flex-wrap: wrap;
				margin: 50rpx 0 100rpx 0;


				.more_box {
					width: 225rpx;
					height: 72rpx;
					font-size: 25rpx;
					box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(42, 64, 55, 0.05);
					border-radius: 4rpx;
					margin: 5rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					text-align: center;
				}

				.unactive_box {
					background: #F5F9FA;
					box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(42, 64, 55, 0.05);
					border: 1rpx solid #979797;
				}

				.active_box {
					color: #A4D091;
					background: #ECF7ED;
					border: 1rpx solid #979797;
					box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(42, 64, 55, 0.05);
					border: 1rpx solid #979797;
				}

			}

			.btns {
				display: flex;

				.btn_green,
				.btn-white {

					text-align: center;
					font-size: 36rpx;
					border-radius: 11rpx;
					margin: 0 10rpx;
				}

				.btn_green {
					width: 337rpx;
					height: 72rpx;
					line-height: 72rpx;
					color: #fff;
					background-color: #A4D091;
				}

				.btn-white {
					width: 331rpx;
					height: 66rpx;
					line-height: 66rpx;
					color: #A4D091;
					background: #FFFFFF;
					border: 4rpx solid #A4D091;
				}
			}

		}



		.alert {
			background: #A4D091;
			border-radius: 7rpx;
			// width: 691rpx;
			// height: 65rpx;
			// line-height: 65rpx;
			padding: 14rpx 0 14rpx 20rpx;
			margin: 20rpx 24rpx 0rpx;
			color: #FFFFFF;
			display: flex;
			font-size: 26rpx;

		}

		.boxs {
			background: #FFFFFF;
			border-radius: 14rpx;
			margin: 20rpx 24rpx 0rpx;
			padding: 20rpx 30rpx;

			.box_top {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.call {
					width: 140rpx;
					height: 56rpx;
					line-height: 56rpx;
					text-align: center;
					border-radius: 14rpx;
					border: 1rpx solid #A4D091;
					color: #A4D091;
				}
			}


			.box_main {
				display: flex;
				justify-content: space-between;
				background: #ECF7ED;
				border-radius: 7rpx;
				padding: 25rpx 32rpx;
				margin: 20rpx 0;
				text-align: center;

				.price {
					color: #A4D091;
				}

				.title {
					font-size: 25rpx;
					color: #A5A7A7;
					margin-top: 7rpx;
				}
			}

			.box_bottom {
				font-size: 25rpx;
				display: flex;
				justify-content: space-between;
			}
		}
	}

	// .filter-row {
	// 	box-sizing: border-box;
	// 	height: 100rpx;

	.filter-row-item {
		color: #999999;
		margin-right: 30rpx;

		&:last-of-type {
			margin-right: 0;
		}

		&.on {
			color: #000;
		}

		image {
			display: inline-block;
			width: 16rpx;
			height: 20rpx;
			margin: 0rpx 6rpx 0;
		}

		.sort {
			width: 14rpx;
			height: 20rpx;
			color: #999999;
		}

		.bottomsort {
			transform: rotate(180deg)
		}
	}

	// }
</style>