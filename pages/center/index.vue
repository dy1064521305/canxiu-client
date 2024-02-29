<template>
	<view class="center-con">
		<view v-if="!isLogin" style="padding-top: 330rpx;">
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
		<view v-else class="">
			<image class="bg"
				src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/08/16/ba173089ad4048dcac236e7fa17675b0.png">
			</image>

			<view class="center">

				<view class="info" @click="editInfo">
					<view>
						<image v-if="userInfo.storeImg==null||userInfo.storeImg==''" style="width: 136rpx;height: 136rpx;"
							src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/23/5595ab7226854043abab1449a9067a94.png">
						</image>
						<u--image v-else width='136rpx' height='136rpx' :src="userInfo.storeImg" shape="circle">
						</u--image>
					</view>
					<view class="name">
						<view v-if="userInfo.storeName!=null " style="font-size: 36rpx;">
							{{userInfo.storeName}}
						</view>
						<view style="font-size: 29rpx;">
							{{userInfo.phone}}
						</view>
					</view>
					<view style="display: flex;align-items: center;">
						<image style="width: 16rpx;height: 29rpx;"
							src='http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/6840f46a9289454198777dd3471d456b.png'
							mode=""></image>
					</view>
				</view>
				<view class="tixian" @click="goMyMoney">
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
				</view>
			<!-- 	<view class="order">
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
					<u-cell-group :border='false'>

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

					</u-cell-group>

					
				</view>
				
				<view @click="showPhone=true"
					style="width:100%;margin:0 auto;color: #3398F3; text-align: center; margin:80rpx 0;">
					有疑问？联系客服
				</view>
			</view>
		</view>
		<!-- 拨打电话 -->
		<u-action-sheet round='20' :closeOnClickAction='false' @select='actionSelect' :closeOnClickOverlay='false'
			:actions="actionList" :show="showPhone"></u-action-sheet>
			
			<view class="index">
				<wu-app-update></wu-app-update>
			</view>

	</view>

</template>

<script>
	import storage from '@/utils/storage'
	import {
		getUserWallet
	} from '@/api/money.js'
	import {
		getOrderList
	} from '@/api/order.js'
	import {
		getInfoById,
		queryMyInfo
	} from '@/api/user.js'
	import {
		callPhone
	} from '@/utils/phone.js'
	export default {
		data() {
			return {
				balance: '', //账户余额
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
				isLogin: false,
				userInfo: {}, //用户信息
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
			};
		},
		onTabItemTap: function(item) {
			uni.removeStorage({
				key: 'service_info'
			})
		},
		onShow() {
			this.getList()
			this.isLogin = storage.get('AccessToken')
		},
		methods: {
			getList() {
				//获取用户信息
				if (storage.get('ClientId')) {
					getInfoById(storage.get('ClientId')).then(res => {
						console.log(res);
						this.userInfo = res.data
						//	let arr = res.data.avatarUrl != null ? res.data.avatarUrl.split(',') : []
						this.userInfo.phone = this.geTel(this.userInfo.phoneNumber)
						//	this.fileList.push({url:arr[0]})
					})
					//获取订单数量
					this.orderList.forEach(item => {
						console.log(item);
						getOrderList({
							clientId: storage.get('ClientId'),
							orderStatus: item.name,
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
						this.balance = res.data.balance
					})

				}


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
				uni.navigateTo({
					url: '/pages/login/index'
				})
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


<style>
	page {
		background: #F5F9FA;
	}
</style>
<style lang="scss" scoped>
	.center-con {
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
		height: 543rpx;
	}

	.center {
		padding: 0 29rpx;
		width: 92%;
		position: absolute;
		top: 10rpx;

		.info {
			margin-top: 120rpx;

			display: flex;

			.name {
				width: 80%;
				margin-left: 29rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-evenly;
				color: #3D3F3E;
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