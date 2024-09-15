<template>
	<view class="my-order">
		<z-paging ref="paging" v-model="orderList" @query="getOrderlistHandle" @onRefresh="refresh">
			<view slot='top'>
				<!-- <u-navbar title="订单管理" placeholder :safeAreaInsetTop="false" :autoBack="true"> </u-navbar> -->
				<view class=" acea-row row-middle" style=" padding: 20rpx 24rpx; background-color: #fff;">
					<view style="flex: 1;">
						<!-- 			<u-search v-model="queryParams.projectName" @search="queryList()" @clear="queryList(1)"
							placeholder="请输入服务项目名称" :clearabled="true" :showAction='false'></u-search> -->

						<view class="input acea-row row-middle">
							<input type="text" @confirm="queryList()" maxlength="36" @input="seachValue"
								v-model="queryParams.projectName" placeholder="请输入服务项目名称">
							<view class="" style="position: absolute; top: 17rpx; right: 20rpx;">
								<u-icon v-if="queryParams.projectName" @click="queryList(1)" color="#D8DCDB"
									name="close-circle"></u-icon>
							</view>
							<view class="input-s" @click="queryList()"></view>

						</view>
					</view>
					<!-- 					<view @click="show" class=" acea-row row-middle">
						<image :style="{'width': '29rpx','margin': 10+'rpx','padding-top':'9rpx'}"
							src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/21/eb78f3eb65ec46fc92b1245b17c64838.png"
							mode="widthFix"></image>
						筛选
					</view> -->
					<view @click="$jump('/subpkg/center/myOrder/screen?info='+JSON.stringify(infoItem))"
						class=" acea-row row-middle">
						<image style="margin: 0 10rpx 5rpx 10rpx;" :style="{'width': '29rpx','padding-top':'9rpx'}"
							src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/21/eb78f3eb65ec46fc92b1245b17c64838.png"
							mode="widthFix"></image>
						筛选
					</view>
				</view>


				<view v-if="statusType=='all'" class="top" style="position: relative;">
					<!-- 	<view class="type">
						<text @click='checkType(0)' :class="[type==0?'text-active':'']">维修</text>
						<text @click='checkType(1)' :class="[type==1?'text-active':'']">维保</text>
					</view> -->
					<view style="width: 90%;">
						<u-tabs :current='current' :list="list1" @click="statusClick" lineColor='#F3B23E' lineWidth="40"
							lineHeight='3' :inactiveStyle="{ color: '#A5A7A7'}">
						</u-tabs>
					</view>
					<view class="type-image" @click="screenShow=!screenShow">
						<u-icon name="list-dot" color="#F3B23E" size="20"></u-icon>
					</view>
					<view class="type-count" v-if='screenShow'>
						<view class="items" v-for="(item,index) in list1" :key="index"
							:class="{on:item.name===typeName}" @click="statusClick(item,index)">
							{{item.name}} <text v-if="item.value">({{item.value||0}})</text>
						</view>
					</view>
				</view>

			</view>
			<view class="orderItems" @click="orderDetail(item)" v-for='(item,index) in orderList' :key='index'>
				<view class="orderItems-top acea-row">
					<view class=" orderItems-top-status acea-row row-between-wrapper">
						<view class="orderItems-top-status-left">
							<view :style="{'color':item.orderStatus=='待接单'||item.orderStatus=='售后中'||item.orderStatus=='待评价'?'#F3B133':
								item.orderStatus=='待上门'?'#3398F3':
								item.orderStatus=='已完成'?'#A5A7A7':'#A4D091'}">
								{{item.orderStatus=='师傅取消'?'师傅已取消,重新指派中':item.repairId!=null&&statusType!='all'?item.repairStatus:item.orderStatus}}
							</view>
						</view>
						<view class="orderItems-top-status-right acea-row row-middle">
							<view>{{item.orderType==1?'产品维保':item.orderType==0?'产品维修':""}}</view>
							<view v-if="item.isUrgent==1||item.isUrgent==2"> 加急 </view>
						</view>
					</view>
					<view class="orderItems-top-order acea-row">订单编号：{{item.orderNumber}}
						<view @click.stop="copy(item.orderNumber)">
							<image
								src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/12/21/57de362ad312499d93634d2ae9021099.png"
								style="width: 29rpx;height: 29rpx;margin-left: 10rpx;"></image>
						</view>
					</view>
				</view>
				<view v-if="cssTypeShow">
					<view class="orderItems-worker acea-row flex-center" v-if="item.workerId&&item.workerId!=null">
						<view class="orderItems-worker-img">
							<image v-if="item.avatarUrl&&item.avatarUrl!=null" :src="item.avatarUrl" mode=""></image>
							<image v-else
								src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/08/12/ea32e75cab3b4381954c83e34b151278.png"
								mode=""></image>

						</view>
						<view class="orderItems-worker-mess">
							<view class="acea-row row-middle ">
								<text style="margin-right: 10rpx;">{{item.workerName}}</text>
								<view class="acea-row">
									<u-rate active-color="#FD5834" readonly v-model="item.levelIdValue" allowHalf
										inactive-color="#b2b2b2" gutter="2"></u-rate>
								</view>
							</view>
							<text class="type line1">工种：<text v-for="(i,index) in item.typeNameList">{{i}}</text></text>
							<!-- <text class="type">工种：{{item.workerType}}</text> -->
						</view>
						<view class="orderItems-worker-phone" @click.stop="showPhoneHandle(item)">
							<image
								src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/08/12/5beeb82b9a3f4952889976a3f009c7d8.png"
								mode=""></image>
						</view>
					</view>
					<view class="orderItems-article acea-row"
						v-if="item.projectDataVoList!=null&&item.projectDataVoList.length!=0"
						v-for="(pro,i) in item.projectDataVoList" :key="i">
						<view class="orderItems-article-left" @click.stop="previewImage(pro.img)">
							<image v-if="pro.img&&Object.prototype.toString.call(pro.img) !== '[object Array]'"
								:src="pro.img" mode=""></image>
							<image v-else
								src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/09/02/23d8137225a440f3a4e19e43d527cc32.png"
								mode=""></image>
						</view>
						<view class="orderItems-article-right">
							<text>{{pro.projectName}}</text>
							<view class="" style="margin: 4rpx 0;">{{pro.typeName}}</view>
							<view class="acea-row row-middle  row-between-wrapper">
								<view>{{pro.discountPrice}}元/个</view>
								<view>x{{pro.projectNumber}}</view>
							</view>
						</view>
					</view>

					<view class="orderItems-time flex-colum">
						<view> <text>上门时间：</text>{{item.workerSignTime||'暂无'}}</view>
						<view v-if="item.orderAddress"> <text>
								报修地址：</text>{{item.orderAddress}}</view>
						<view> <text>所属品牌：</text>{{item.brandName||'暂无'}}品牌</view>
					</view>
				</view>
				<view v-else>
					<view class="orderItems-time flex-colum">
						<view class="acea-row" v-if="item.projectDataVoList&&item.projectDataVoList.length">
							<text>服务内容：</text>{{item.projectDataVoList[0].projectName}}
							<view v-if="item.projectDataVoList.length>1">
								等<text>{{item.projectDataVoList.length-1}}</text>项</view>
						</view>
						<view> <text>上门时间：</text>{{item.workerSignTime||'暂无'}}</view>
						<view> <text>门店名称：</text>{{item.customerName||'暂无'}}</view>
						<view v-if="item.orderAddress"> <text>
								报修地址：</text>{{item.orderAddress}}</view>
						<view> <text>下单人：</text>{{item.orderPerson||'暂无'}}</view>
						<view v-if="item.workerId&&item.workerId!=null"> <text>接单师傅：</text>{{item.workerName||'暂无'}}
						</view>
					</view>
				</view>
				<view class="orderItems-money acea-row row-between-wrapper">
					<view class="orderItems-money-left acea-row row-between-wrapper">
						<text>费用：</text> ¥{{item.orderPrice}}
					</view>
					<view class="orderItems-money-right acea-row row-center row-middle">
						<view class="orderItems-money-right-btn">关闭订单</view>
						<!-- <view class="orderItems-money-right-btn">联系门店</view> -->
						<view class="orderItems-money-right-btn2">指派师傅</view>
						<!-- 	<view class="orderItems-money-right-btn2">更换师傅</view>
						<view class="orderItems-money-right-btn">代确认</view>
						<view class="orderItems-money-right-btn2">邀客户确认</view> -->
					</view>
					<!-- <view class="orderItems-money-right acea-row row-center row-middle">
						
					</view> -->
				</view>
			</view>
		</z-paging>


		<!-- 返修 -->
		<u-modal :show="repairOrderShow" title="温馨提示" showCancelButton confirmColor='#A4D091'
			@cancel="repairOrderShow=false" @confirm="repairOrderHandle">
			<view style="width: 100%;text-align: center;">
				是否确认申请返修?
			</view>
		</u-modal>


		<!-- 筛选 -->
		<u-popup :show="showScreen" @close="showScreen=false" closeable zIndex='100'>
			<view style="margin:70rpx 50rpx;">
				<view style="text-align: center;margin-bottom: 40rpx;font-weight: bold;">
					筛选
				</view>
				<view class="screen">
					<!-- 	<view class="title">
						选择门店
					</view>
					<u-checkbox-group activeColor="#72DAA4" shape="circle" v-model="checkboxValue1" placement="column"
						@change="checkboxChange">
						<u-checkbox :customStyle="{marginBottom: '8px'}" v-for="(item, index) in checkboxList1"
							:key="index" :label="item.name" :name="item.name">
						</u-checkbox>
					</u-checkbox-group> -->
					<view class="title" style="margin-top: 20rpx;">
						时间
					</view>
					<view style="display: flex;flex-wrap: wrap;">
						<view v-for="(ti,index) in times" :key='index' @click="timeChange(ti)"
							:class="[activeTimes==ti?'time-active':'time']">
							{{ti}}
						</view>
					</view>

					<view style="display: flex;margin-top: 20rpx;">
						<view class="date-class">
							<picker class="picker" mode="date" :value="date" :start="startDate" :end="endDate"
								@change="bindDateChangeBegin">
								<text style="color: #A5A7A7;padding-left: 24rpx">{{beginTime}}</text>
							</picker>
							<view style="   display: flex;align-items: center;" @click="dateClear('begin')">
								<u-icon name="close" color="#A5A7A7" size="15"></u-icon>
							</view>
						</view>
						<view
							style="width: 36rpx;height: 4rpx;background: #A5A7A7;border-radius: 2rpx;margin: 30rpx 14rpx;">

						</view>
						<view class="date-class">
							<picker class="picker" mode="date" :value="date" :start="startDate" :end="endDate"
								@change="bindDateChangeEnd">
								<text style="color: #A5A7A7;padding-left: 24rpx">{{endTime}}</text>

							</picker>
							<view style=" display: flex;align-items: center;" @click="dateClear('end')">
								<u-icon name="close" color="#A5A7A7" size="15"></u-icon>
							</view>
						</view>
					</view>

					<view class="btns" style="justify-content: space-evenly;margin-top: 60rpx;">

						<view class="btn-white" @click="refresh">重置</view>
						<view @click="queryList()" class="btn-green">确认</view>

						<!-- 
						<image
							src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/22/c804038468f4457a9f3cfddaceca81f8.png">
						</image>
						<image
							src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/22/d8318d98692148449518ada0130e641b.png">
						</image> -->
					</view>
				</view>
			</view>
		</u-popup>

		<u-toast ref="uToast"></u-toast>
		<!-- 拨打电话 -->
		<u-action-sheet round='20' :closeOnClickAction='false' @select='actionSelect' :closeOnClickOverlay='false'
			:actions="actionList" :show="showPhone"></u-action-sheet>
		<view class="fixedRight acea-row" @click="changeCss">
			<text class="iconfont icon-paixu"></text> 切换
		</view>

		<PopupImage showStyleTop='22%' :show="cssPopShow" @tap-img="closeCssPopShow"
			img="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/09/15/9ea074ca2d494b17bbfdd5b41818761a.png"
			width="750rpx" @close="closeCssPopShow">
		</PopupImage>
	</view>
</template>


<script>
	import {
		getQueryOrderList,
		repairOrder,
		valetAllOrderCount
	} from '@/api/order.js'
	import storage from '@/utils/storage'
	import {
		checkMediaType
	} from '@/utils/index'
	import formatter from '@/utils/formatter.js'
	import projectCard from '@/components/projectCard/projectCard.vue'
	import {
		callPhone
	} from '@/utils/phone.js'
	import PopupImage from '@/components/popup/image.vue'
	export default {
		components: {
			projectCard,
			PopupImage
		},
		data() {

			return {
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
				screenShow: false,
				countRate: 3.9,
				repairOrderShow: false,
				repairInfo: {},
				activeTimes: '',
				date: '年月日',
				checkboxValue1: [],
				// 基本案列数据
				checkboxList1: [],
				showScreen: false,
				jiaji: false,
				search: '',
				menuButtonInfoWidth: 0,
				type: 0,
				list1: [{
						name: '全部',
						value: 0,
						val: 'total'
					},
					{
						name: '待审核',
						value: 0,
						val: 'waitExamine'
					}, {
						name: '待接单',
						value: 0,
						val: 'grabOrder'
					}, {
						name: '待签到',
						value: 0,
						val: 'waitDoor'
					}, {
						name: '待服务',
						value: 0,
						val: 'waitService'
					}, {
						name: '服务中',
						value: 0,
						val: 'servicing'
					}, {
						name: '待验收',
						value: 0,
						val: 'waitAcc'
					}, {
						name: '待付款',
						value: 0,
						val: 'waitPay'
					}, {
						name: '待评价',
						value: 0,
						val: 'waitAppraise'
					}, {
						name: '已完成',
						value: 0,
						val: 'finish'
					}, {
						name: '已关闭',
						value: 0,
						val: 'close'
					}
				],
				times: ['最近三天', '最近7天', '最近15天', '近1月', '近2月', '近3月'],
				orderList: [], //订单数据
				current: 0, //当前选中的索引
				currentIndex: 0,
				queryParams: {
					pageSize: 10,
					pageNum: 1,
					endTime: '',
					beginTime: '',
					// queryType 0 - 合伙人订单， 1 - 默认
					queryType: 0
				},
				endTime: '', //显示的时间
				beginTime: '',
				statusType: 'all',
				title: '',
				typeName: "全部",
				infoItem: {},
				cssTypeShow: false,
				cssPopShow: false
			};
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		onReady() {
			//获取小程序胶囊位置
			// #ifdef MP-WEIXIN
			this.menuButtonInfoWidth = uni.getMenuButtonBoundingClientRect().width + 80
			// #endif

		},
		onShow() {
			uni.$once('selectAll', item => {
				this.infoItem = item
				console.log(item, "itemitemitemitemitemitem");
				if (item) {
					this.queryParams.addressRegion = item.addressRegion || ''
					this.queryParams.beginTime = item.beginTime || ''
					this.queryParams.endTime = item.endTime || ''
					this.queryParams.brandId = item.brandId || ''
					this.queryParams.orderSource = item.orderSource || ''
					this.queryParams.partnerOrderType = item.partnerOrderType || ''
					this.queryParams.workerTypeIdList = [...item.workerTypeIdList]
					this.$refs.paging.reload();
				}
			})
		},
		onLoad(option) {
			console.log(option.name);
			this.cssTypeShow = storage.get('listCssType') || false
			if (!this.cssTypeShow) {
				this.cssPopShow = true
			}
			this.queryParams.clientId = storage.get('ClientId')
			// this.queryParams.clientId = '1801434770530971650'
			this.statusType = option.name == '待服务' || option.name == '服务中' || option.name == '待付款' || option.name == '返修' ?
				'status' : 'all'
			console.log(this.statusType);

			this.title = option.name
			this.queryParams.queryStatus = option.name
			if (this.statusType == 'all') {
				this.statusClick({
					name: '全部'
				})
			}
		},

		methods: {
			handleRoute(item) {
				let id = 'C2C' + item.workerId
				const url = `../../subpkgChat/TUI-Chat/chat?conversationID=${id}`;
				uni.navigateTo({
					url
				});
			},
			show() {
				this.showScreen = true
			},
			checkType(num) {
				this.type = num
			},
			//状态切换
			statusClick(item, index) {
				this.typeName = item.name
				if (item.index) {
					this.$refs.paging.reload();
				}
				if (item.name != '全部') {
					this.queryParams.orderStatus = item.name
					this.current = index
				} else {
					this.current = 0
					this.queryParams.orderStatus = ''
				}
				this.screenShow = false
				this.getOrderlistHandle(1, 10)

			},
			getOrderlistHandle(pageNo, pageSize) {
				this.showScreen = false
				this.queryParams.pageNum = pageNo;
				this.queryParams.pageSize = pageSize;
				uni.showLoading({
					mask: true
				});
				getQueryOrderList(this.queryParams).then(res => {
					res.rows.forEach(i => {
						i.projectDataVoList && i.projectDataVoList.forEach((item, index) => {
							let list = item.initialImg != null ? item.initialImg.split(',') : []
							if (list.length) {
								if (list.length > 1) {
									const iterator = list[Symbol.iterator]();
									for (const i of iterator) {
										let data = checkMediaType(i)
										if (data == 'video') {
											item.img = (item.projectImg ? item.projectImg.split(
												',')[0] : [])
											break
										} else {
											item.img = list[0]
										}
									}
								} else {
									let data = checkMediaType(list[0])
									item.img = data == 'video' ? (item.projectImg ?
										item.projectImg.split(',')[0] : []) : list[0]

								}

							} else {
								item.img = i.repairId != null ? (item.projectUrl != null ? item
									.projectUrl.split(',')[0] : []) : (item.projectImg !=
									null ?
									item.projectImg.split(',')[0] : [])
							}

							// item.img = i.repairId != null ? (item.projectUrl != null ? item
							// 	.projectUrl.split(',') : []) : (item.projectImg != null ? item
							// 	.projectImg.split(',') : [])

						})
					})
					uni.hideLoading();
					res.rows.forEach(item => {
						if (item.levelName) {
							switch (item.levelName) {
								case '一星匠人':
									item.levelIdValue = 1
									break;
								case '二星匠人':
									item.levelIdValue = 2
									break;
								case '三星匠人':
									item.levelIdValue = 3
									break;
								case '四星匠人':
									item.levelIdValue = 4
									break;
								case '五星匠人':
									item.levelIdValue = 5
									break;
							}
						}
					})

					this.$refs.paging.completeByTotal(res.rows, res.total);
				})
				valetAllOrderCount({
					clientId: storage.get('ClientId'),
					projectName: this.queryParams.projectName,
					beginTime: this.queryParams.beginTime,
					endTime: this.queryParams.endTime,
					queryType: 0
				}).then(res => {
					this.list1.forEach(item => {
						item.value = res.data[item.val]
					})
				})
			},
			getNum() {

			},
			//条件查询
			queryList(i) {
				console.log(this.queryParams);
				// this.getNum()
				if (i) {
					this.queryParams.projectName = ''
				}
				this.$refs.paging.reload();
			},
			refresh() {
				this.reset()
				// this.getNum()
				this.$refs.paging.reload();
			},
			//日期清空
			dateClear(type) {
				if (type == 'begin') {
					this.queryParams.beginTime = ''
					this.beginTime = ''
				} else {
					this.queryParams.endTime = ''
					this.endTime = ''
				}
			},
			seachValue(e) {
				if (!e.target.value) {
					this.$refs.paging.reload()
				}
			},
			reset() {
				this.queryParams.endTime = ''
				this.queryParams.beginTime = ''
				this.queryParams.projectName = ''
				this.endTime = ''
				this.beginTime = ''
				this.activeTimes = ''
			},
			//订单详情
			orderDetail(item) {
				if (item.repairId != null) {
					let info = {
						type: this.title,
						id: this.title == '返修' ? item.repairId : item.orderId
					}
					uni.navigateTo({
						url: '../../car/repairingOrder/repairingOrder?info=' + JSON.stringify(info)
					})
				} else {
					uni.navigateTo({
						url: '../../car/orderDetail/orderDetail?id=' + item.orderId
					})
				}

			},
			checkboxChange(n) {
				console.log('change', n);
			},
			bindDateChangeBegin: function(e) {
				console.log(e.detail.value);
				this.activeTimes = ''
				this.queryParams.beginTime = e.detail.value + ' 00:00:00'
				this.beginTime = e.detail.value
			},
			bindDateChangeEnd: function(e) {
				this.activeTimes = ''
				this.queryParams.endTime = e.detail.value + ' 23:59:59'
				this.endTime = e.detail.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			timeChange(time) {
				console.log(time);
				this.activeTimes = time
				var date = new Date()
				var list = formatter.getDateByCode(time)

				console.log(list);
				this.queryParams.beginTime = list.startTime + ' 00:00:00'
				this.queryParams.endTime = list.endTime + ' 23:59:59'
			},
			//评价
			appraise(item) {
				console.log(item);
				uni.navigateTo({
					url: '../../subpkg/car/appraise/appraise?id=' + item.orderId
				})
			},
			//支付
			pay(item) {
				console.log(item);
				uni.navigateTo({
					url: '../../car/pay/pay?item=' + encodeURIComponent(JSON.stringify(item))
				})
			},
			backFix(item) {
				this.repairInfo = item
				this.repairOrderShow = true
			},
			//申请返修
			repairOrderHandle() {
				repairOrder(this.repairInfo).then(res => {
					console.log(res);

					this.$refs.uToast.show({
						type: 'error',
						message: res.data.msg
					});
					this.repairOrderShow = false
					this.getOrderlistHandle(1, 10)
					// this.getNum()
				})
			},
			//复制单号
			copy(n) {
				console.log(n);
				uni.setClipboardData({
					data: n,
					success: function() {
						console.log('success');
					}
				});
			},
			showPhoneHandle(item) {
				this.showPhone = true
				this.actionList[0].name = item.workerPhone
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
			previewImage(img) {
				uni.previewImage({
					current: 0,
					urls: [img]
				});
			},
			changeCss() {
				this.cssTypeShow = !this.cssTypeShow
			},
			closeCssPopShow() {

				this.cssPopShow = false
				storage.set('listCssType', true)
			}
		}
	}
</script>


<style>
	page {
		background: #F5F9FA;
	}
</style>

<style lang="scss">
	.my-order {
		.input {
			// width: 563rpx;
			flex: 1;
			padding: 0 30rpx;
			background-color: rgb(242, 242, 242);
			border-radius: 50rpx;
			height: 60rpx;
			line-height: 60rpx;
			position: relative;

			input {
				width: 340rpx;
				height: 62rpx;
				margin-left: 40rpx;
				font-size: 26rpx;
			}

			.input-s {
				position: absolute;
				top: 19rpx;
				left: 30rpx;
				width: 25rpx;
				height: 25rpx;
				background: url("https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/02/31fd266c68a248babb495e4aa76f9408.png") no-repeat;

				background-size: 100% 100%;
			}

		}

		.top {
			background: #fff;
			//padding: 20rpx 20rpx 0 20rpx;

			.type {
				width: 707rpx;
				height: 80rpx;
				margin-bottom: 20rpx;
				border-radius: 14rpx;
				background: #F5F9FA;

				text {
					margin: 10rpx 6rpx;
					display: inline-block;
					width: 340rpx;
					height: 65rpx;
					border-radius: 11rpx;
					font-size: 33rpx;
					text-align: center;
					line-height: 65rpx;
					color: #A5A7A7;
				}

				.text-active {
					background: #fff;
					color: #3D3F3E;
					font-weight: bold;
				}

			}

			.type-image {
				position: absolute;
				top: 24rpx;
				right: 20rpx;
			}

			.type-count {
				background: #FFFFFF;
				padding: 30rpx 24rpx;
				font-size: 24rpx;
				color: #212121;
				display: grid;
				text-align: center;
				grid-template-columns: repeat(3, 1fr);
				grid-column-gap: 24rpx;
				grid-row-gap: 24rpx;


				.items {
					width: 216rpx;
					height: 56rpx;
					background: #F2F2F2;
					border-radius: 8rpx;
					text-align: center;
					line-height: 56rpx;
					color: #212121;
					font-size: 24rpx;

					&.on {
						background: $back-color;
						color: #FFFFFF;
					}

				}

			}


		}

		.orderItems {
			margin: 20rpx;
			border-radius: 16rpx;
			background: #FFFFFF;
			font-size: 28rpx;

			&-top {
				height: 144rpx;
				flex-direction: column;
				justify-content: center;
				padding: 0 24rpx;


				&-status {

					&-right {
						font-size: 24rpx;

						view {
							padding: 2rpx 10rpx;
							border-radius: 10rpx;
							color: #fff;
							background-color: #FD5834;
						}

						view:nth-child(1) {
							background: #D1D6F7;
							color: #313134;
							margin-right: 10rpx;
						}
					}
				}

				&-order {
					font-size: 24rpx;
					color: #999999;
					margin-top: 8rpx;
				}

			}

			&-worker {
				height: 144rpx;
				background: rgba(243, 178, 62, 0.08);
				border-radius: 16rpx;
				padding: 0 30rpx 0 20rpx;
				margin: 0 24rpx 18rpx;

				&-img {
					width: 80rpx;
					height: 80rpx;
					margin-right: 20rpx;

					image {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}

				&-mess {
					flex: 1;
					color: #999999;

					view {
						text {
							color: #212121;
							font-size: 32rpx;
						}
					}

					.type {
						display: inline-block;
						width: 400rpx;
						margin-top: 9rpx;
					}
				}

				&-phone {
					width: 56rpx;
					height: 56rpx;

					image {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}
			}

			&-article {
				padding: 30rpx 20rpx;

				&-left {
					width: 128rpx;
					height: 128rpx;

					image {
						width: 100%;
						height: 100%;
						border-radius: 6rpx;

					}
				}

				&-right {
					color: #999999;
					flex: 1;
					margin-left: 20rpx;

					text {
						color: #212121;
						font-size: 32rpx;
					}
				}
			}

			&-time {
				box-sizing: border-box;
				border-top: 1rpx solid #EBEDF0;
				padding: 28rpx 26rpx 20rpx;
				color: #212121;

				view {
					margin-bottom: 8rpx;
				}

				text {
					color: #999999;
				}

			}

			&-money {
				// height: 96rpx;
				border-top: 1rpx solid #EBEDF0;
				padding: 26rpx 24rpx;

				&-left {
					color: #FD5834;

					text {
						color: #999999;
					}
				}

				&-right {
					view {
						width: 160rpx;
						height: 60rpx;
						line-height: 60rpx;
						text-align: center;
						border-radius: 8rpx;
					}

					&-btn {
						border: 1rpx solid #F3B23E;
						background: #FFFFFF;
						color: #F3B23E;
					}

					&-btn2 {
						border: 1rpx solid #F3B23E;
						background: #F3B23E;
						color: #fff;
						margin-left: 18rpx;
					}
				}
			}
		}

		.orders {
			position: relative;
			margin: 20rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(42, 64, 55, 0.05);
			border-radius: 14rpx;

			.main {
				padding: 20rpx;



				.title {
					display: flex;
					flex-direction: column;
					border-bottom: 2rpx solid #F8F8F8;
					padding-bottom: 20rpx;
					font-size: 26rpx;

					.top {

						// display: flex;
						// justify-content: space-between;
						.appoint {
							color: #fff;
							background-color: black;
							border-radius: 7rpx;
							font-size: 22rpx;
							text-align: center;
							padding: 8rpx 17rpx;
						}

						.right {
							//background-color: red;
							padding: 8rpx 28rpx 8rpx 20rpx;
							font-weight: bold;
							font-size: 34rpx;
							color: #fff;
							display: flex;
							border-radius: 56rpx;
							height: 20%;
							margin-top: 10rpx;
						}
					}

					.bottom {
						display: flex;
						justify-content: space-between;
						width: 100%;
					}
				}

				.time {

					font-size: 25rpx;
					color: #3D3F3E;
					padding-top: 20rpx;
					border-top: 2rpx solid #F8F8F8;
					display: flex;
					justify-content: space-between;
				}


			}
		}

		.btns {
			width: 100%;
			display: flex;
			justify-content: flex-end;

			.btn-white,
			.btn-green {
				width: 199rpx;
				border-radius: 45rpx;
				text-align: center;
				font-size: 30rpx;
				margin: 15rpx 0 0 10rpx;
			}

			.btn-white {
				height: 55rpx;
				background: #FFFFFF;
				border: 4rpx solid$pageColor;
				color: $pageColor;
				line-height: 55rpx;
			}

			.btn-green {
				line-height: 60rpx;
				height: 60rpx;
				background: $pageColor;
				color: #fff;
			}
		}

		.screen {
			height: 500rpx;

			.title {
				font-size: 29rpx;
				color: #3D3F3E;
				font-weight: bold;
				margin-bottom: 30rpx;
			}

			.date-class {
				width: 290rpx;
				height: 60rpx;
				background: #F5F9FA;
				border-radius: 30rpx;
				line-height: 60rpx;
				text-align: center;
				display: flex;
				font-size: 25rpx;

				.picker {
					width: 80%;
				}
			}

			.time,
			.time-active {
				margin: 5rpx 7rpx 20rpx 7rpx;
				width: 203rpx;
				border-radius: 50rpx;
				line-height: 60rpx;
				text-align: center;
				height: 60rpx;
			}

			.time-active {
				background: #f0fbf5;
				border: 2rpx solid $pageColor;
			}

			.time {

				background: #f5f9fa;

			}

			.btn {
				display: flex;

				image {
					width: 337rpx;
					height: 71rpx;
					margin: 69rpx 10rpx;
				}
			}
		}

		::v-deep.u-transition,
		.u-fade-enter-to,
		.u-fade-enter-active {
			z-index: 99 !important;
		}
	}

	.fixedRight {
		position: fixed;
		bottom: 200rpx;
		right: 0;
		padding: 10rpx 14rpx;
		border-radius: 10rpx 0 0 10rpx;
		background-color: $pageColor;
		color: #fff;
		font-size: 24rpx;

		.iconfont {
			-moz-transform: rotate(-90deg);
			-webkit-transform: rotate(-90deg);
			display: block;
		}
	}
</style>