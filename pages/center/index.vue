<template>
	<common-page>
		<view class="page">
			<view v-if="!isLogin" style="padding-top:31vh">
				<u-empty mode="permission"
					icon="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/04/04/99b6e40d11194c5bae53b199773db5b6.png"
					text="您还未登录">
				</u-empty>
				<view class="btns">
					<view @click="quxiao">
						取消
					</view>
					<view @click="login">
						去登录
					</view>
				</view>
			</view>
			<view v-else>
				<view class="bg"></view>
				<view class="center">
					<view class="info acea-row row-between-wrapper">
						<view class="acea-row" @click.stop="goInfo">
							<view class="info-image">
								<image
									v-if="userInfo.avatarUrl==null||userInfo.avatarUrl==''||userInfo.avatarUrl=='null'"
									src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/23/5595ab7226854043abab1449a9067a94.png">
								</image>
								<u--image v-else width='80rpx' height='80rpx' :src="userInfo.avatarUrl" shape="circle">
								</u--image>
							</view>
							<view class="name  flex-colum">
								<view class="name-left">
									{{userInfo.clientName||'暂无'}}
								</view>
								<!-- 	<view class="grade" @click.stop="$jump('/subpkg/car/partner/index')"
								v-if="partnerInfo==null">
								申请合伙人
							</view> -->
								<view class="grade">
									{{userInfo.phone}}
								</view>
							</view>
						</view>
						<!-- <view style="display: flex;align-items: center;">
						<image style="width: 16rpx;height: 29rpx;"
							src='http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/6840f46a9289454198777dd3471d456b.png'
							mode=""></image>
					</view> -->

					</view>
					<view class="balance acea-row  row-between-wrapper">
						<view class="balance-two " @click="$jump('/pages/users/reward/coupon')">
							<view class="balance-two-num ">
								{{couponNum||0}}
							</view>
							<text>优惠券</text>
						</view>
						<view class="balance-two " @click="$jump('/subpkg/center/myMoney/myMoney')">
							<view class="balance-two-num ">
								{{totalAmount||0}}
							</view>
							<text>钱包余额</text>
						</view>
					</view>
					<view class="order_list acea-row row-between-wrapper">
						<view class="order_list-item" v-for="(item,index) in list"
							@click="$jump('/subpkg/center/myOrder/myOrder?name='+item.name)" :key="item.val">
							<view class="image">
								<image :src="item.img" mode=""></image>
								<view class="topValue acea-row row-between-wrapper" v-if="item.num">{{item.num}}</view>
							</view>
							<text>{{item.name}}</text>
						</view>
					</view>
					<view class="teamMy acea-row row-between-wrapper" v-if="partnerInfo != null">
						<view class="teamMy-item flex-colum" @click="$jump('/subpkg/staging/team/index')">
							<view class="acea-row row-between-wrapper">
								<text style="font-size: 32rpx;">团队管理</text>
								<u-icon name="arrow-right" color="#AEDD94" size="16"></u-icon>
							</view>
							<view style="margin-top: 8rpx;">团队人数：{{partnerInfo.teamCount||0}}人</view>
						</view>
						<view class="teamMy-item flex-colum" @click="$jump('/subpkg/center/myMoney/invest/account')">
							<view class="acea-row row-between-wrapper">
								<text style="font-size: 32rpx;">我的投资款</text>
								<u-icon name="arrow-right" color="#FD9C2B" size="16"></u-icon>
							</view>
							<view style="margin-top: 8rpx;">账户余额：¥{{partnerInfo.investmentBalance||0}}</view>
						</view>
					</view>
					<!-- <view class="counts">
					<view class="counts-title">
						<view>门店订单数据</view>
						<view style="margin-right: 30rpx;" @click="$jump('/subpkg/center/myOrder/myOrder?name=全部订单')">
							全部></view>
					</view>
					<view class="counts-status">
						<view class="counts-status-items acea-row " v-for="(item,index) in orderList2" :key="index">
							<view class="counts-status-items-value">{{item.num||0}}</view>
							<text>{{item.label}}</text>
						</view>
					</view>
						<view class="counts-other acea-row">
						<view class="counts-other-items acea-row">
							今日待上门<text>12</text>
						</view>
						<view class="counts-other-items acea-row">
							今日异常订单<text>12</text>
						</view>
					</view>
				</view> -->
					<!-- <view class="swiperBanner"></view> -->
					<view class="counts">
						<text class="counts-title">常用功能</text>
						<view class="counts-type acea-row">
							<view class="counts-type-all " @click="toDetail(i)" v-for="(i) in useList" :key="i.id">
								<image :class="'img-'+i.id" :src="i.img" mode=""></image>
								<view>{{i.label}}</view>
							</view>

						</view>
					</view>
					<view class="setUp">
						<view class="setUp-list acea-row row-between-wrapper" @click="toUrl(item)"
							v-for="(item) in typeList.slice(0,3)" :key="item.id">
							<view class="setUp-list-left">
								<image :src="item.img" :class="'img-'+item.id" mode=""></image>
								<text>{{item.label}}</text>
							</view>
							<view class="setUp-list-right">
								<u-icon name="arrow-right" color="#959595" size="18"></u-icon>
							</view>
						</view>
					</view>
					<view class="setUp" v-if="partnerInfo==null">
						<view class="setUp-list acea-row row-between-wrapper" @click="toUrl(item)"
							v-for="(item) in typeList.slice(3,4)" :key="item.id">
							<view class="setUp-list-left">
								<image :src="item.img" :class="'img2-'+item.id" mode=""></image>
								<text>{{item.label}}</text>
							</view>
							<view class="setUp-list-right">
								<u-icon name="arrow-right" color="#959595" size="18"></u-icon>
							</view>
						</view>
					</view>
					<!-- <view class="tixian" @click="goMyMoney">
					<view class="imgPlace">
						<image style="width: 36rpx;"
							src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/21/baaacef4cc9f4aecad3f6458f07d7fdf.png"
							mode="widthFix"></image>
					</view>
					<text style="font-size: 29rpx;" class='color'>账户余额:</text>
					<view style="width: 47%;">
						<text style="font-size: 36rpx;margin: 0 10rpx;" class='color'>{{balance}}</text>
						<text style="font-size: 22rpx;" class='color'>元</text>
					</view>
					<view class="btn">
						去提现
					</view>
				</view> -->
					<!-- <view class="order">
					<view class="title">
						<text>我的订单</text>
						<text @click='allOrder'>全部订单</text>
						<view @click='allOrder'>
							<image style="width:14rpx;height: 25rpx;"
								src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/0e15ed9e53ec47569b535aaffb6b0d7b.png">
							</image>
						</view>
					</view>
					<view class="main">
						<view v-for="(item,index) in orderList" :key='index' class="box" @click="goOrder(item,index)">
							<view style="height: 60rpx;display: flex;align-items: center;position: relative;">

								<image style="width: 54rpx;" :src="item.url" mode="widthFix"></image>
								<view style="position: absolute;top: 0;left: 28rpx;">
									<u-badge max="99" :value="item.num"></u-badge>
								</view>
							</view>
							<text style="margin-top: 14rpx;">{{item.name}}</text>
						</view>
					</view>

				</view> -->
					<!-- 	<view class="hetong">
					<view class="imgPlace">
						<image style="width: 36rpx;"
							src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/21/a5a0b58c2d674bacb335cb758d4fca3d.png"
							mode="widthFix"></image>
					</view>
					<view style="font-size: 29rpx;color: #EC5722;font-weight: bold;">
						您有一份待签署的合同
					</view>
					<view class="imgPlace">
						<image style="width:16rpx;height: 29rpx;margin-left:264rpx;"
							src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/70424656f30f43468b85803f2c59fe7e.png">
						</image>
					</view>
				</view>
				<view class="vip">
					<view class="imgPlace">
						<image style="width: 45rpx;"
							src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/21/0b4f4e98830c41afb8abb111fa3498ab.png"
							mode="widthFix"></image>
					</view>
					<text style="font-size: 29rpx;color: #EBDFC0;">开通立享会员权益</text>
					<view class="btn">
						立即开通
					</view>
				</view> -->
					<view class="my">
						<!--	<view class="title">我的服务</view>
					<view class="main">
						 <view class="box">
							<view class='img'>
								<image style="width: 54rpx;height: 46rpx;"
									src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/bc5a61260236484e840a1ddb5090bace.png">
								</image>
							</view>
							<text>优惠券</text>
						</view>
						<view class="box" @click="fuwuClick('address')">
							<view class='img'>
								<image style="width: 48rpx;height: 56rpx;"
									src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/cdd0134f2d7e4200af485661223615eb.png">
								</image>
							</view>
							<text>我的地址</text>
						</view>
						<view class="box" @click="showPhone=true">
							<view class='img'>
								<image style="width: 55rpx;height: 56rpx;"
									src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/ac09219e58a84b6e9edbb63508138c70.png">
								</image>
							</view>
							<text>联系客服</text>
						</view>
						<view class="box" @click="fuwuClick('invite')">
							<view class='img'>
								<image style="width: 48rpx;height: 54rpx;"
									src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/21/47c98144cb6a456c9767451b3d0db13f.png">
								</image>
							</view>
							<text>邀请奖励</text>
						</view>
						<view class="box" @click="fuwuClick('invoice')">
							<view class='img'>
								<image style="width: 46rpx;height: 53rpx;"
									src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/f44ea061b78849129614c02e0deb3cdd.png">
								</image>
							</view>
							<text>我的发票</text>
						</view>
						<view class="box" @click="fuwuClick('set')">
							<view class='img'>
								<image style="width: 54rpx;height: 51rpx;"
									src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/21/1eab510981eb44e98c97646c650bfb5d.png"
									mode="widthFix"></image>
							</view>
							<text style="margin-left:-3rpx;">设置</text>
						</view>
					</view> -->
						<!-- <u-cell-group :border='false'>
						<u-cell size='large' isLink url="../../subpkg/car/myAddress/myAddress">
							<view slot="title" style="display: flex;align-items: center;">
								<image src="../../static/center/address.png"></image>
								<view class="title">
									我的地址
								</view>
							</view>

						</u-cell>
						<u-cell size='large' isLink url="../../subpkg/center/invite/invite">
							<view slot="title" style="display: flex;align-items: center;">
								<image src="../../static/center/invite.png"></image>
								<view class="title">
									邀请奖励
								</view>
							</view>

						</u-cell>
						<u-cell size='large' isLink url="../../subpkg/center/myInvoice/myInvoice">
							<view slot="title" style="display: flex;align-items: center;">
								<image src="../../static/center/invoice.png"></image>
								<view class="title">
									我的发票
								</view>
							</view>

						</u-cell>
						<u-cell size='large' isLink url="../../subpkg/center/setting/setting">
							<view slot="title" style="display: flex;align-items: center;">
								<image src="../../static/center/setting.png"></image>
								<view class="title">
									设置
								</view>
							</view>

						</u-cell>
					</u-cell-group> -->


					</view>

					<!-- <view @click="showPhone=true"
					style="width:100%;margin:0 auto;color: #3398F3; text-align: center; margin:80rpx 0; ">
					有疑问？联系客服
				</view> -->
				</view>
			</view>
			<!-- 拨打电话 -->
			<u-action-sheet round='20' :closeOnClickAction='false' @select='actionSelect' :closeOnClickOverlay='false'
				:actions="actionList" :show="showPhone"></u-action-sheet>


		</view>
	</common-page>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import storage from '@/utils/storage'
	import {
		getUserWallet
	} from '@/api/money.js'
	import {
		getOrderList,
		queryOrderCount
	} from '@/api/order.js'
	import {
		getInfoById,
		queryMyInfo,
		getOrderStatics,
		getCouponList
	} from '@/api/user.js'
	import {
		callPhone
	} from '@/utils/phone.js'
	import {
		putImmediate
	} from "@/api/brand.js"
	import $cache from '@/utils/cache.js';
	export default {
		data() {
			return {
				totalAmount: 0, //账户余额
				actionList: [{
						name: '0571-88387761'
					},
					{
						name: '呼叫'
					},
					{
						name: '取消'
					},
				], //拨打电话
				showPhone: false, //底部电话显示
				userInfo: {}, //用户信息
				couponNum: 0,
				useList: [{
						id: 0,
						img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/01/07a80dbb32384b938c78184567842312.png",
						label: "地址管理",
						url: "/subpkg/car/myAddress/myAddress"
					},
					{
						id: 1,
						img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/01/8bdc159406b841fd946f943af4f31aee.png",
						label: "门店管理",
						url: "/subpkg/center/myStore/myStore"
					},
					{
						id: 2,
						img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/01/ecd9fc9012614c4b81cf4c0c4987fddb.png",
						label: "优惠卷",
						url: "/pages/users/reward/coupon"
					},
					{
						id: 3,
						img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/01/0014a1afca2c45f884445a2635df407e.png",
						label: "钱包余额",
						url: "/subpkg/center/myMoney/myMoney"
					},
					{
						id: 4,
						label: '邀请师傅',
						img: 'https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/13/5356f25f26ec464b929b0d380bead987.png',
						url: "/subpkg/center/inviteWorker/inviteWorker"
					},
					// {
					// 	id: 5,
					// 	label: '邀请品牌',
					// 	img: 'https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/13/9e22b888d28e43f9bbec2316ea9c364b.png',
					// 	// url: "/subpkg/center/brand/inviterQrCode"
					// 	url: "/subpkg/center/brand/MyinviterQrCode"
					// },
					{
						id: 6,
						label: '邀请门店',
						img: 'https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/13/e98f2f8ab0a9476f9ceb030c1b83745a.png',
						url: "/subpkg/center/inviteActivity/inviteActivity"
					},
					// {
					// 	id: 7,
					// 	img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/10/74c5b5bf7ea94a2f9aa0c6a5e74da786.png",
					// 	label: "师傅管理",
					// 	url: "/subpkg/staging/workers/workers"
					// },
					// 注意，id>3的会提示先申请合伙人
				],
				list: [{
						name: '待服务',
						img: 'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/01/09/b4ac3b7d1a7d4a5e91d82e4a4fcad32d.png',
						num: 0,
						val: 'waitService',
					},
					{
						name: '服务中',
						img: 'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/01/09/ad35c651adda44e9be897bc7d1a4b193.png',
						num: 0,
						val: 'servicing',
					},
					{
						name: '待付款',
						img: 'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/01/09/9244875972c54c91a934c1265cd95eb4.png',
						num: 0,
						val: 'waitPay',
					},
					{
						name: '返修',
						img: 'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/01/09/64ca56e7c5ef40ffa55f2339198effe5.png',
						num: 0,
						val: 'repair',
					},
					{
						name: '全部订单',
						img: 'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/01/09/57449f60ec5e4d189e21a6aa57e4f15c.png',
						num: 0,
						val: 'total',
					},
				],
				orderList2: [{
						label: "待接单",
						value: "grabOrder",
						num: 0,
					},
					{
						label: "待上门",
						value: "waitDoor",
						num: 0,
					},
					{
						label: "待验收",
						value: "waitAcc",
						num: 0,
					},
					{
						label: "待付款",
						value: "waitPay",
						num: 0,
					},
					{
						label: "返修中",
						value: "repairing",
						num: 0,
					},
					{
						label: "完工/关闭",
						value: "finishClose",
						num: 0,
					},
				],
				orderList: [{
						url: '../../static/center/daijiedan.png',
						name: '待接单',
						num: undefined
					},
					{
						url: '../../static/center/daishangmen.png',
						name: '待上门',
						num: undefined
					},
					{
						url: '../../static/center/daiyanshou.png',
						name: '待验收',
						num: undefined
					},
					{
						url: '../../static/center/daizhifu.png',
						name: '待支付',
						num: undefined
					},
					{
						url: '../../static/center/shouhouzhong.png',
						name: '售后中',
						num: undefined
					},

				],
				typeList: [{
						id: 0,
						img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/01/266f8fc9d00b4e67b40dd52f66a66ec5.png",
						label: "帮助中心",
						url: "/subpkg/center/setting/setting"
					},
					// {
					// 	id: 1,
					// 	img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/01/3c00a6d37f0b4a3d94ba09cd8f6abb41.png",
					// 	label: "建议反馈",
					// 	url: ""
					// },
					{
						id: 2,
						img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/01/cc78fbf88e5e476eafdeef2fe0c9a6d6.png",
						label: "联系客服",
						url: ""
					},
					{
						id: 3,
						img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/01/123b55e3dda2476bbad24b537a24c185.png",
						label: "关于我们",
						url: "/subpkg/center/aboutUs/aboutUs"
					},
					// {
					// 	id: 4,
					// 	img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/01/7320eca633d8472692bceca08d92aae4.png",
					// 	label: "我是师傅",
					// 	url: ""
					// },
					// {
					// 	id: 5,
					// 	img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/01/68c1018663124c87a10a016b25eabae0.png",
					// 	label: "我是商家/品牌连锁",
					// 	url: ""
					// },
					{
						id: 6,
						img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/16/bc36c90670804e7fae1c865ccf174c43.png",
						label: "申请成为合伙人",
						url: "/subpkg/car/partner/index"
					},
				],
				partnerInfo: {},
				listAvatar: {}
			}
		},
		onTabItemTap: function(item) {
			uni.removeStorage({
				key: 'service_info'
			})
		},
		computed: {
			...mapGetters(['isLogin'])
		},
		onLoad() {},
		onShow() {
			if (this.isLogin) {
				this.getList()
				this.getOrderlistHandle(1, 10)
				this.getInfo()
			}
		},
		methods: {
			getList() {
				//获取用户信息
				if (storage.get('ClientId')) {
					getInfoById(storage.get('ClientId')).then(res => {
						this.userInfo = res.data
						//	let arr = res.data.avatarUrl != null ? res.data.avatarUrl.split(',') : []
						this.userInfo.phone = this.geTel(this.userInfo.phoneNumber)
						//	this.fileList.push({url:arr[0]})
						let userInfo = {}
						userInfo = res.data
						this.listAvatar = {
							userInfo: userInfo,
							type: 'info'
						}
					})
					//获取订单数量
					this.orderList.forEach(item => {
						getOrderList({
							clientId: storage.get('ClientId'),
							orderStatus: item.label,
							pageSize: 10,
							pageNum: 1
						}).then(res => {
							item.num = res.total
						})
					})
					getUserWallet({
						userId: storage.get('ClientId'),
						userType: 'c'
					}).then(res => {
						this.totalAmount = res.data.totalAmount
					})
					getOrderStatics(storage.get('ClientId')).then(res => {
						this.orderList2.forEach(item => {
							item.num = res.data[item['value']]
						})
					})
					getCouponList({
						clientId: storage.get('ClientId')
					}).then(res => {

						this.couponNum = res.total
					})

				}


			},
			getInfo() {
				putImmediate(storage.get('ClientId')).then(res => {
					this.partnerInfo = res.data
				})
			},
			//全部订单
			allOrder() {
				uni.navigateTo({
					url: '../../subpkg/center/myOrder/myOrder'
				})
			},
			//修改个人信息
			editInfo() {
				let list = {
					userInfo: this.userInfo,
					type: 'edit'
				}
				uni.navigateTo({
					url: '../../subpkg/center/personalInfo/personalInfo?item=' + JSON.stringify(list)
				})
			},
			//我的服务
			fuwuClick(type) {
				switch (type) {
					case 'invoice':
						uni.navigateTo({
							url: '../../subpkg/center/myInvoice/myInvoice'
						})
						break;
					case 'address':
						uni.navigateTo({
							url: '../../subpkg/car/myAddress/myAddress'
						})
						break;
					case 'set':
						uni.navigateTo({
							url: '../../subpkg/center/setting/setting'
						})
						break;
					case 'invite':
						uni.navigateTo({
							url: '../../subpkg/center/invite/invite'
						})
						break;
				}
			},

			//电话号码星号
			geTel(tel) {
				var reg = /^(\d{3})\d{4}(\d{4})$/;
				return tel.replace(reg, "$1****$2");
			},
			//我的余额
			goMyMoney() {
				uni.navigateTo({
					url: '../../subpkg/center/myMoney/myMoney'
				})
			},
			//跳转到订单页面
			goOrder(info, index) {
				let item = {
					name: info.name,
					index: index + 1
				}
				uni.navigateTo({
					url: '../../subpkg/center/myOrder/myOrder?item=' + JSON.stringify(item)
				})
			},
			//取消登录
			quxiao() {
				uni.switchTab({
					url: '/pages/home/index'
				})
			},
			//去登录
			login() {
				// #ifdef MP-WEIXIN
				// $cache.set('authBackUrl', "pages/center/index")
				this.$store.commit('OPEN_LOGIN_POP')
				// #endif
				// #ifndef MP-WEIXIN
				uni.navigateTo({
					url: '/pages/login/index'
				})
				// #endif
			},
			actionSelect(e) {
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
			// 跳转
			toUrl(item) {
				if (item.id == 2) {
					this.showPhone = true
				} else {
					this.$jump(item.url)
				}
				// switch (id){
				// 	case value:
				// 		break;
				// 	default:
				// 		break;
				// }
			},
			getOrderlistHandle(pageNo, pageSize) {
				queryOrderCount({
					clientId: storage.get('ClientId')
				}).then(res => {
					this.list.forEach(item => {
						item.num = res.data[item.val]
					})
				})
			},
			toDetail(i) {
				if (i.id > 3) {
					if (this.partnerInfo == null) return this.$toast('请先申请合伙人噢')
					let par = this.partnerInfo
					switch (i.id) {
						case 4:
							this.$jump(i.url + '?partnerId=' + par.partnerId + '&region=' + par.region)
							break;
						case 6:
							this.$jump(i.url + '?partnerId=' + par.partnerId + '&region=' + par.region)
							break;
							// case 7:
							// 	this.$jump(i.url + '?partnerId=' + par.partnerId)
							// 	break;

							// case 8:
							// 	this.$jump(i.url + '?partnerId=' + par.partnerId)
							// 	break;
						default:
							this.$jump(i.url + '?partnerId=' + par.partnerId)
							break;
					}

				} else {
					this.$jump(i.url)
				}
			},
			goInfo() {
				uni.navigateTo({
					url: '/subpkg/users/setting/my-setting'
				})
			},

		}
	}
</script>


<style>
	page {
		background: #F5F9FA;
	}
</style>
<style lang="scss" scoped>
	.page {
		position: relative;
	}

	.btns {
		display: flex;
		justify-content: space-evenly;
		margin: 50rpx auto;
		width: 63%;

		view {
			width: 180rpx;
			height: 60rpx;
			border-radius: 45rpx;
			text-align: center;
			line-height: 60rpx;
			font-size: 28rpx;
		}

		view:first-child {
			background: #A4D091;
			color: #fff;
		}

		view:nth-child(2) {
			background: #FFFFFF;
			border: 4rpx solid #A4D091;
			color: #A4D091;
		}
	}

	.imgPlace {
		display: flex;
		align-items: center;
		margin: 0 20rpx;
	}

	.bg {
		width: 100%;
		// height: 409rpx;
		height: 566rpx;
		// background: linear-gradient(181deg, #A4D091 0%, #FFFFFF 100%);
		background: url('https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/08/14/621dacc5be8b4f7cb865e63baa7ec2ec.png') no-repeat;
		background-size: 100% 100%;
	}

	.center {
		padding: 0 30rpx 100rpx;
		width: 100%;
		box-sizing: border-box;
		position: absolute;
		top: 10rpx;

		.info {
			margin-top: 186rpx;
			display: flex;

			.info-image {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				margin-right: 24rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.name {
				color: #212121;
				font-size: 32rpx;

				&-left {
					max-width: 400rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.grade {
					color: #999;
					font-size: 24rpx;
					margin-top: 2rpx;
				}
			}
		}

		.balance {
			height: 174rpx;
			display: flex;

			&-two {
				width: 40%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				box-sizing: border-box;


				&-num {
					font-weight: bold;
					font-size: 45rpx;
					color: #000000;
				}

				text {
					font-size: 22rpx;
					color: #5E625C;
					margin-top: 6rpx;
				}
			}
		}

		.order_list {
			height: 126rpx;
			background: #FFFFFF;
			border-radius: 14rpx;
			font-family: PingFangSC, PingFang SC;
			font-weight: 500;
			font-size: 22rpx;
			color: #3D3F3E;
			padding: 0 28rpx;

			&-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.image {
					width: 38rpx;
					height: 36rpx;
					position: relative;

					image {
						width: 100%;
						height: 100%;
					}

					.topValue {
						position: absolute;
						top: -20rpx;
						right: -15rpx;
						height: 22rpx;
						background: #EC5722;
						border-radius: 200rpx;
						padding: 2rpx 10rpx 4rpx;
						font-size: 18rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						color: #fff;
					}
				}

				text {
					margin-top: 7rpx;
				}
			}
		}

		.teamMy {
			margin-top: 20rpx;
			height: 160rpx;
			font-family: PingFangSC, PingFang SC;
			font-weight: 500;

			&-item {
				width: 340rpx;
				height: 100%;
				background: linear-gradient(324deg, #D6F0C6 0%, #f2ffeb 50%, #F3FBEE 100%);
				color: #ABDC90;
				border-radius: 16rpx;
				font-size: 28rpx;
				padding: 0 16rpx 0 20rpx;
				box-sizing: border-box;
			}

			&-item:nth-last-child(1) {
				background: linear-gradient(141deg, #FDF8F2 0%, #fff7ef 50%, #F7DFD0 100%);
				color: #FD9C2B;
			}
		}

		.counts {
			background: #FFFFFF;
			border-radius: 14rpx;
			margin-top: 20rpx;
			padding-top: 20rpx;
			box-sizing: border-box;
			font-size: 25rpx;
			color: #3D3F3E;

			&-title {
				font-family: PingFangSC, PingFang SC;
				font-weight: 600;
				font-size: 28rpx;
				margin-left: 30rpx;
				display: flex;
				justify-content: space-between;
			}

			&-status {

				width: 100%;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
				margin-top: 30rpx;

				&-items {
					width: 33%;
					// padding: 24rpx 0;
					flex-direction: column;
					align-items: center;
					// justify-content: center;
					height: 130rpx;

					&-value {
						font-weight: bold;
						color: #A4D091;
						font-size: 33rpx;
						margin-bottom: 8rpx;
					}
				}
			}

			&-other {
				height: 82rpx;
				line-height: 82rpx;
				border-top: 1rpx solid #ececec;

				&-items {
					width: 50%;
					justify-content: center;

					text {
						font-family: PingFangSC, PingFang SC;
						font-weight: bold;
						font-size: 25rpx;
						color: #A4D091;
						margin-left: 6rpx;

					}
				}
			}

			&-type {
				padding: 20rpx 0 40rpx;
				justify-content: space-around;
				margin-top: 22rpx;
				display: grid;
				text-align: center;
				grid-template-columns: repeat(4, 1fr);
				grid-column-gap: 0rpx;
				grid-row-gap: 42rpx;

				&-all {
					image {
						width: 58rpx;
						height: 58rpx;
					}

					.img-0 {
						width: 58rpx;
						height: 58rpx;
					}

					.img-1 {
						width: 64rpx;
						height: 58rpx;
					}

					.img-2 {
						width: 59rpx;
						height: 58rpx;
					}

					.img-3 {
						width: 55rpx;
						height: 58rpx;
					}

					view {
						font-size: 25rpx;
						color: #3D3F3E;
						margin-top: 15rpx;
					}
				}
			}
		}

		.swiperBanner {
			height: 164rpx;
			border-radius: 14rpx;
			background-color: #F1F8EE;
			margin-top: 20rpx;
		}

		.setUp {
			padding: 0 20rpx;
			background-color: #fff;
			border-radius: 14rpx;
			margin-top: 22rpx;

			&-list {
				height: 100rpx;
				border-bottom: 1rpx solid #ececec;

				&-left {
					display: flex;
					align-items: center;

					image {
						width: 38rpx;
						height: 36rpx;
						margin-left: 26rpx;


						&.img-3 {
							width: 43rpx;
						}

						&.img2-5 {
							width: 39rpx;
						}

						&.img2-6 {
							width: 43rpx;
						}
					}

					text {
						font-size: 25rpx;
						color: #333333;
						margin-left: 18rpx;
					}
				}

				&-right {}
			}

			&-list:nth-last-child(1) {
				border-bottom: none;
			}
		}

		.tixian {
			margin-top: 40rpx;
			height: 109rpx;
			background: #EBDFC0;
			border-radius: 14rpx;
			display: flex;
			line-height: 109rpx;

			.color {
				color: #432E1A;
				font-weight: bold;
			}

			.btn {
				width: 144rpx;
				height: 62rpx;
				background: #432E1A;
				border-radius: 31rpx;
				font-size: 29rpx;
				line-height: 62rpx;
				color: #EBDFC0;
				text-align: center;
				margin: auto 0;
			}
		}

		.order {
			margin-top: 18rpx;
			height: 238rpx;
			background: #FFFFFF;

			border-radius: 14rpx;

			.title {
				padding: 22rpx;
				align-items: center;
				display: flex;

				text:first-child {
					font-size: 33rpx;
					color: #3D3F3E;
					font-weight: bold;
					width: 80%;
				}

				text:nth-child(2) {
					font-size: 25rpx;
					width: 18%;
					color: #CBCFCE;
				}

				text:nth-child(3) {
					display: flex;
					align-items: center;
				}
			}

			.main {
				margin-top: 10rpx;
				display: flex;
				justify-content: space-evenly;

				.box {
					flex: 1;
					display: flex;
					flex-direction: column;
					align-items: center;


				}
			}
		}

		.hetong {
			height: 80rpx;
			background: rgba(236, 87, 34, 0.1);
			border-radius: 14rpx;
			border: 2rpx solid #EC5722;
			margin-top: 18rpx;
			display: flex;
			align-items: center;
		}

		.vip {
			height: 109rpx;
			background: linear-gradient(90deg, #12151A 0%, #373C44 100%);
			border-radius: 14rpx;
			margin-top: 18rpx;
			display: flex;
			align-items: center;

			.btn {
				width: 172rpx;
				height: 62rpx;
				background: linear-gradient(90deg, #EBDFC0 0%, #FFE7A7 100%);
				border-radius: 31rpx;
				font-size: 29rpx;
				line-height: 62rpx;
				color: #432E1A;
				text-align: center;
				margin-left: 180rpx;
			}
		}

		// .my {
		// 	margin-top: 18rpx;
		// 	height: 380rpx;
		// 	background: #FFFFFF;

		// 	.title {
		// 		padding: 22rpx;

		// 		font-size: 33rpx;
		// 		color: #3D3F3E;
		// 		font-weight: bold;
		// 		width: 80%;
		// 	}

		// 	.main {
		// 		margin-top: 10rpx;
		// 		display: flex;
		// 		flex-wrap: wrap;

		// 		.box {
		// 			width: 25%;
		// 			display: flex;
		// 			flex-direction: column;
		// 			align-items: center;
		// 			margin-bottom: 34rpx;

		// 			.img {
		// 				height: 60rpx;
		// 				display: flex;
		// 				align-items: center;
		// 			}

		// 			text {
		// 				margin-top: 14rpx;
		// 			}
		// 		}
		// 	}
		// }


		.my {
			margin-top: 20rpx;
			background: #FFFFFF;
			border-radius: 14rpx;

			image {
				width: 56rpx;
				height: 56rpx;
			}

			.title {
				font-weight: bold;
				margin-left: 20rpx;
				font-size: 30rpx;
			}
		}
	}
</style>