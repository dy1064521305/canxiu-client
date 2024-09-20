<template>
	<view class="record">
		<!-- <view v-if="JSON.stringify(activeInfo) ！='{}'" class="have_active"> -->
		<view v-if="activeInfo&&activeInfo.activityId" class="have_active">
			<u-notice-bar v-if="textList.length!=0" style="position: fixed;top: 0;z-index: 99999;width: 100%;"
				:text="textList" direction='column'></u-notice-bar>
			<image class="bg" :src="activeInfo.titleImg"></image>
			<view class="place" :style="{'top':textList.length!=0?'7%':'3%'}">
				<u-icon name="map" size="20" color="#fff"></u-icon>{{address}}
			</view>
			<view class="main">
				<view class="rules" @click="ruleShow=true">
					活动规则
				</view>
				<view class="step_box">
					<view class="btn_one" @click="goUrl('invite')">
						立即邀请门店入驻
					</view>
					<view @click="getCodeShowHandle" class="btn_two">
						面对面扫码邀请
					</view>
				</view>

				<img style="width: 700rpx;height: 635rpx;" src="https://h5-test.canxiukeji.com/img/zhuanshuquanyi.png"
					alt="">
				<view class="my_reward">
					<view class="title">
						<text style="margin-right: 10rpx;font-weight: bold;">我的奖励</text>

					</view>
					<view class="reward_main">
						<view class="reward_box" @click='goUrl("detailed")'>
							<view class="price">
								{{info.accruingAmount||0}}
							</view>
							<view class="type">
								累计获得(元)<u-icon name="arrow-right" color="#A5A7A7" size="14"></u-icon>
							</view>
						</view>
						<view class="reward_box" @click='goUrl("detailed")'>
							<view class="price">
								{{info.unSettleAmount||0}}
							</view>
							<view class="type">
								待结算奖励(元)<u-icon name="arrow-right" color="#A5A7A7" size="14"></u-icon>
							</view>
						</view>
						<view class="reward_box"
							@click="$jump('/subpkg/center/inviteActivity/inviteStoreList?activityId=' +activeInfo.activityId+ '&partnerId='+partnerId )">
							<view class="price">
								{{info.inviteCount||0}}
							</view>
							<view class="type">
								成功邀请(家)<u-icon name="arrow-right" color="#A5A7A7" size="14"></u-icon>
							</view>
						</view>
					</view>
				</view>
				<view class="invite_list">
					<view class="title">
						<text>排行榜</text>
						<text>*仅显示最近10条数据</text>
					</view>

					<view v-for="(item,index) in workerList" :key="index" class="list">
						<view style="display: flex;align-items: center;">
							<image v-if="item.avatarUrl==null"
								src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/06/19/fea1dd65eb384dcf92ca712b4e5463ee.png">
							</image>
							<image v-else style="border-radius: 50%;" :src="item.avatarUrl">
							</image>
						</view>
						<view class="right">
							<view style="display: flex;justify-content: space-between;">
								{{item.inviterName||'暂无昵称'}}
								<text style="color: #FE6801;font-size: 30rpx;">{{item.rewardAmount}}</text>
							</view>
							<view style="display: flex;justify-content: space-between;color: #A5A7A7;margin-top: 6rpx;">
								{{item.serviceAddress||'暂无区域'}}
								<text>
									已邀请
									<text style="color:#FE6801;margin: 0 4rpx;">{{item.inviteCount}}</text>
									家
								</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else class="empty_state">
			<image src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/06/17/4f1a01c68b1e4b43ab9f1ee29ba3ca55.png"
				style="width: 281rpx;height: 247rpx;"></image>
			<view class="title">
				活动策划中….
			</view>
			<view class="btn" style="background:#A4D091;" @click='phoneAuth'>

				联系客服
			</view>
		</view>
		<u-popup :show="ruleShow" @close="ruleShow=false" closeable :overlayStyle="{'touch-action':'none'}">
			<view style="text-align: center;padding: 20rpx 0 ;">活动规则</view>
			<view class="agree-ment">

				<u-parse :content="activeInfo.activityRule"></u-parse>

			</view>
		</u-popup>

		<u-popup :show="getCodeShow" @close="getCodeShow=false" closeable>
			<view class="code_box">
				<view style="text-align: center;padding: 20rpx 0 ;">我的专属二维码</view>
				<view style="margin: 20rpx 0;">
					<image :src="code" @click="previewImage" style="width:560rpx;height: 560rpx;"></image>
				</view>
				<view style="text-align: center;">
					请打开【微信】APP，选择“扫一扫”，</br>此二维码进行注册！
				</view>
			</view>

		</u-popup>

		<yk-authpup ref="authpup" type="top" @changeAuth="changeAuth" permissionID="CALL_PHONE"> </yk-authpup>
		<u-toast ref="uToast"></u-toast>

		<!-- 拨打电话 -->
		<u-action-sheet round='20' :closeOnClickAction='false' @select='actionSelect' :closeOnClickOverlay='false'
			:actions="actionList" :show="showPhone"></u-action-sheet>
	</view>
</template>

<script>
	import ykAuthpup from "@/components/yk-authpup/yk-authpup";
	const {
		environment
	} = require('../../../config/environment')
	import formatter from '@/utils/formatter.js'
	import storage from '@/utils/storage'
	import {
		getClientStatisticsRank,
		inviteCustomerRecord,
		getActivity,
		participation,
		getStatisticsRank
	} from '@/api/invite.js'
	import {
		getGetPartnerld
	} from "@/api/brand.js"

	export default {
		components: {
			ykAuthpup
		},
		data() {
			return {
				textList: [],
				workerList: [],
				ruleShow: false,
				content: '',
				getCodeShow: false,
				info: {},
				code: '',
				activeInfo: {},
				address: '',
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
				area: '',
				partnerId: storage.get('ClientId')
			};
		},
		onLoad(options) {
			if (options && options.partnerId) {
				// this.partnerId = options.partnerId || ''
				this.address = options.region ? options.region.replace(/\//g, '-') : ''

			}
			this.getList()

		},
		methods: {
			getList() {
				getActivity({
					cityScope: this.address,
					activityType: 1,
					inviterId: this.partnerId,
					displayTerminal: 2
				}).then(res => {
					if (res.data) {
						console.log(res, '2333333');
						this.activeInfo = res.data
						uni.setNavigationBarTitle({
							title: this.activeInfo.activityName || '邀请商家' // 设置导航栏标题为'页面标题'
						});
						this.code =
							`${environment.baseURL}/worker/friend/invite/getQrCode?activityId=${this.activeInfo.activityId}&workerId=${	this.partnerId}&userType=2&inviterId=${	this.partnerId}&activityType=${this.activeInfo.activityType}`
						getStatisticsRank({
								inviterId: this.partnerId,
								activityId: this.activeInfo.activityId
							}).then(res => {
								console.log(res);
								this.info = res.data
							}),
							getClientStatisticsRank({
								pageSize: 10,
								pageNum: 1,
								activityId: this.activeInfo.activityId,
							}).then(res => {
								res.rows.forEach(item => {
									// let arr = item.serviceAddress.split('/')
									// item.region = arr[1] + '-' + arr[2]
									this.textList.push(
										`${item.inviterName||'一位用户'}已累计获得￥${item.rewardAmount}订单分成奖励`
									)
								})
								this.workerList = res.rows
							})
					} else {
						this.activeInfo = {}
						console.log(this.activeInfo);
					}

				})


			},
			actionSelect(e) {
				console.log(e);
				let phone = '0571-88387761'
				if (e.name == '取消') {
					this.showPhone = false
				} else {
					uni.makePhoneCall({
						phoneNumber: phone, //电话号码
						success(ress) {
							console.log("拨打电话成功", ress)
						},
						fail(err) {
							console.log("拨打电话失败", 'err')
						}
					});
					this.showPhone = false
				}
			},
			phoneAuth() {
				// #ifdef APP-PLUS
				this.$refs['authpup'].open()
				// #endif
				// #ifdef MP-WEIXIN
				this.showPhone = true
				// #endif
			},
			changeAuth() {
				this.showPhone = true
			},
			goUrl(type) {
				switch (type) {
					case 'detailed':
						uni.navigateTo({
							url: '../inviteWorker/inviteRewards?info=' + JSON
								.stringify({
									activityId: this.activeInfo.activityId,
									inviterId: this.partnerId,
									type: 'customer'
								})
						})
						break;
					case 'invite':
						this.activeInfo.partnerId = this.partnerId
						this.activeInfo.userType = 2
						this.getParticipation().then(res => {
							if (res.code == 200) {
								uni.navigateTo({
									url: '../shareInvite/shareInvite?info=' +
										encodeURIComponent(JSON
											.stringify(this
												.activeInfo))
								})
							}
						})

						break;
				}

			},
			getParticipation() {
				const result = participation({
					// inviterId: '1802941870416785409',
					inviterId: this.partnerId,
					activityId: this.activeInfo.activityId,
					userType: 2
				}).then(res => {
					return res
				}).catch(error => {
					return error
				})
				return result
			},
			question() {
				this.$refs.uToast.show({
					message: '仅统计显示你参与本期活动所获得奖励金额数。'
				});
			},
			getCodeShowHandle() {
				this.getParticipation().then(res => {
					if (res.code == 200) {
						this.getCodeShow = true
					}
				})
			},
			previewImage() {
				uni.previewImage({
					current: 0,
					urls: [this.code]
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.record {

		.have_active {
			.bg {
				width: 100%;
				height: 648rpx;

			}

			.place {
				position: absolute;
				display: flex;
				padding: 12rpx 14rpx;
				background: rgba(0, 0, 0, 0.45);
				border-radius: 7rpx;
				left: 6%;
				color: #fff;
			}

			.main {
				width: 100%;
				text-align: center;
				position: absolute;
				top: 10rpx;

				.big_title {
					font-size: 65rpx;
					color: #FFF7CB;
					margin: 104rpx auto 0 auto;
					width: 80%;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					display: inline-block;

				}



				.step_box {
					margin: 479rpx 94rpx 22rpx 94rpx;

					// position: relative;
					.btn_one {
						background: linear-gradient(180deg, #FFD79E 0%, #FFFFF8 100%);
						border-radius: 11rpx;
						font-size: 36rpx;
						color: #FF6900;
						padding: 19rpx 133rpx;
					}

					.btn_two {
						margin-top: 20rpx;
						border-radius: 11rpx;
						border: 2rpx solid #FFFAE2;
						background-color: #FF6900;
						font-size: 36rpx;
						color: #FFFAE2;
						padding: 19rpx 133rpx;
					}
				}

				.rules {
					width: 44rpx;
					padding: 13rpx 0px;
					background: #625F4B;
					border-radius: 11rpx 0 0 11rpx;
					color: #FFFFFF;
					position: fixed;
					font-size: 26rpx;
					top: 146rpx;
					right: 0;
					z-index: 1;
				}

				.my_reward {
					// height: 276rpx;
					background: #fff;
					box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(42, 64, 55, 0.05);
					border-radius: 14rpx;
					padding: 23rpx 31rpx;
					margin: 10rpx 27rpx 0 27rpx;

					.title {
						display: flex;
						justify-content: space-between;
					}

					.reward_main {
						display: flex;
						// height: 228rpx;
						margin-top: 15rpx;

						.reward_box {
							flex: 1;
							display: flex;
							flex-direction: column;
							justify-content: space-evenly;
							margin-top: 10rpx;

							view {
								// margin: 10rpx 0;
								text-align: left;

							}

						}
					}
				}

				.price {
					font-weight: 500;
					font-size: 38rpx;
					color: #FE6801;
				}

				.type {
					font-size: 25rpx;
					color: #A5A7A7;
					display: flex;
					align-items: center;
					margin: 15rpx 0 10rpx !important;
				}

				.invite_list {
					padding: 23rpx 31rpx;
					margin: 21rpx 27rpx;
					background-color: #fff;

					.title {
						display: flex;
						justify-content: space-between;
						align-items: flex-end;

						text:first-child {
							font-size: 36rpx;
						}

						text:nth-child(2) {
							font-size: 25rpx;
							color: #A5A7A7;
						}
					}

					.list {
						display: flex;
						margin: 30rpx 0;
						// height: 72rpx;

						image {
							width: 80rpx;
							height: 80rpx;
							margin-right: 20rpx;
						}

						.right {
							width: 100%;
							font-size: 28rpx;
							display: flex;
							flex-direction: column;
							text-align: left;
							justify-content: space-between;
							height: 100%;
						}
					}
				}
			}
		}

		.btn {
			//margin: 0 auto;
			width: 415rpx;
			height: 91rpx;
			background: linear-gradient(180deg, #F73F4A 0%, #FA4F34 100%);
			border-radius: 45rpx;
			font-size: 36rpx;
			color: #FFFFFF;
			line-height: 91rpx;
			text-align: center;
			margin: 0 auto;
		}

		.empty_state {
			text-align: center;
			margin-top: 50%;

			.title {
				font-size: 29rpx;
				color: #A5A7A7;
				margin: 30rpx 0 79rpx 0;
			}


		}

		.code_box {
			height: 58vh;
			background: linear-gradient(181deg, #A4D091 0%, #FFFFFF 100%);
			text-align: center;
		}

		.agree-ment {
			padding: 20rpx;
			height: 500rpx;
			overflow-y: scroll; // 超出滚动
			overscroll-behavior: none; // 禁止滚动溢出

			/deep/.ql-size-huge {
				font-size: 64rpx;
			}

			/deep/.ql-size-small {
				font-size: 20rpx;
			}

			/deep/.ql-size-large {
				font-size: 40rpx;
			}
		}

	}
</style>