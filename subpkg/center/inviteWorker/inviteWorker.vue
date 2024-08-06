<template>
	<view class="record">

		<view v-if="JSON.stringify(activeInfo)!='{}'" class="have_active">
			<image class="bg" :src="activeInfo.titleImg">
			</image>
			<view class="main">
				<view class="rules" @click="ruleShow=true">
					活动规则
				</view>
				<!-- 	<view class="big_title">
					{{activeInfo.activityName}}
				</view> -->
				<view class="step_box">
					<view class="inviteStep">
						<view class="triangleL"></view>
						<view class="stepbtn">
							邀请攻略
						</view>
						<view class="triangleR"></view>
					</view>
					<view class="step">
						<view class="box">
							<view style="height: 60rpx;display: flex;align-items: center;">
								<image style="width: 70rpx;height: 72rpx;"
									src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/06/20/7284348da77f4484bf5806433f1abcac.png">
								</image>
							</view>
							<view style="margin-top: 14rpx;">发送邀请</br>给好友</view>
						</view>
						<u-icon name="arrow-right" color="#F74048" size="20"></u-icon>
						<view class="box">
							<view style="height: 60rpx;display: flex;align-items: center;">
								<image style="width: 59rpx;height: 72rpx;"
									src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/06/20/f9d5f2ef91624c45bdfbfe6275022f37.png">
								</image>
							</view>
							<view style="margin-top: 14rpx;">好友注册</br>并开始接单</view>
						</view>
						<u-icon name="arrow-right" color="#F74048" size="20"></u-icon>
						<view class="box">
							<view style="height: 60rpx;display: flex;align-items: center;">
								<image style="width: 74rpx;height: 72rpx;"
									src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/06/20/7284348da77f4484bf5806433f1abcac.png">
								</image>
							</view>
							<view style="margin-top: 14rpx;">订单完成</br>获得奖励</view>
						</view>
					</view>
					<view class="btn" style="margin-top: 40rpx;" @click="goUrl('invite')">
						立即邀请好友加入
					</view>
					<view @click="getCodeShowHandle"
						style="font-size: 25rpx;color: #3D3F3E;padding: 31rpx 0 16rpx 0;display:flex;justify-content: center;">
						面对面扫码邀请
						<u-icon name="arrow-right" color="#3D3F3E" size="15"></u-icon>
					</view>
				</view>
				<view class="my_reward">
					<view class="title">
						<view style="display: flex;align-items: baseline;">
							<text style="margin-right: 10rpx;font-weight: bold;">我的奖励</text>
							<u-icon @click="question" name="question-circle" color="#F74048" size="15"></u-icon>
						</view>
						<view
							style="color: #A5A7A7;display: flex;justify-content: space-between;font-size: 25rpx;align-items: center;"
							@click='goUrl("detailed")'>
							明细<u-icon name="arrow-right" color="#A5A7A7" size="15"></u-icon></view>
					</view>
					<view class="reward_main">
						<view class="reward_box">
							<view class="price">
								{{info.unSettlementReward}}
							</view>
							<view class="type">
								待结算奖励（元）
							</view>
						</view>
						<view class="reward_box">
							<view class="price">
								{{info.settlementReward}}
							</view>
							<view class="type">
								已结算奖励（元）
							</view>
						</view>
					</view>
				</view>
				<view class="invite_list">
					<view class="title">
						邀请记录
					</view>
					<view class="number_box">
						<view class="box">
							<view class="price">
								{{info.inviteCount}}
							</view>
							<view class="type">
								累计邀请
							</view>
						</view>

						<view class="box">
							<view class="price">
								{{info.completedCount}}
							</view>
							<view class="type">
								已达标
							</view>
						</view>
						<view class="box">
							<view class="price">
								{{info.unCompletedCount}}
							</view>
							<view class="type">
								未达标
							</view>
						</view>
					</view>

					<view v-for="(item,index) in workerList" :key="index" class="list">
						<image v-if="item.avatarUrl==null"
							src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/06/19/fea1dd65eb384dcf92ca712b4e5463ee.png">
						</image>
						<image v-else style="border-radius: 50%;" :src="item.avatarUrl">
						</image>
						<view class="right">
							<view class="" style="font-size: 28rpx;">
								{{item.workerName||'暂无昵称'}}
							</view>
							<view style="font-size: 22rpx;color: #A5A7A7;">
								注册时间：{{item.registerDate}}
							</view>
						</view>

					</view>
					<view v-if="workerList.length!=0"
						style="color: #A5A7A7; font-size: 26rpx; padding: 10rpx 0 10rpx 0;"
						@click="$jump('/subpkg/center/inviteWorker/inviteList?activityId='+activeInfo.activityId+'&inviterId=' +partnerId)">
						仅显示最近10条数据，点击查看全部 >
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

		<!-- <PopupShareActivity ref="share" hide-btn :moments="true"></PopupShareActivity> -->

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
		inviteWorkerList,
		statistics,
		inviteRecord,
		getActivity,
		participation
	} from '@/api/invite.js'
	// import {
	// 	getGetPartnerld
	// } from "@/api/brand.js"
	// import PopupShareActivity from '@/components/popup/shareActivity.vue'
	export default {
		components: {
			ykAuthpup,
			// PopupShareActivity
		},
		data() {
			return {
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
				partnerId: storage.get('ClientId'),
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
					// 活动类型 0 是师傅 1是门店
					activityType: 0,
					inviterId: this.partnerId,
					// 什么端 1是合伙人 0是师傅 2是用户端
					displayTerminal: 2
				}).then(res => {
					if (res.data) {
						this.activeInfo = res.data
						uni.setNavigationBarTitle({
							title: this.activeInfo.activityName || '邀请好友' // 设置导航栏标题为'页面标题'
						});
						this.code =
							`${environment.baseURL}/worker/friend/invite/getQrCode?activityId=${this.activeInfo.activityId}&workerId=${this.partnerId}&userType=2&inviterId=${this.partnerId}&activityType=${this.activeInfo.activityType}`
						statistics({
								inviterId: this.partnerId,
								activityId: this.activeInfo.activityId
							}).then(res => {
								console.log(res);
								this.info = res.data
							}),
							inviteRecord({
								pageSize: 10,
								pageNum: 1,
								// type: null,
								registerDate: formatter.formatDate(new Date(Number(new Date())),
										'yyyy-MM') +
									'-01',
								inviterId: this.partnerId,
								activityId: this.activeInfo.activityId
							}).then(res => {
								console.log(1111);
								this.workerList = res.data.rows

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
						this.activeInfo.userType = 0
						this.activeInfo.partnerId = this.partnerId
						this.getParticipation().then(res => {
							if (res.code == 200) {
								uni.navigateTo({
									url: '../shareInvite/shareInvite?info=' + encodeURIComponent(
										JSON
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
					inviterId: this.partnerId,
					activityId: this.activeInfo.activityId,
					// 2是合伙人 ，0是师傅，1是用户角色
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
				height: 543rpx;
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

				.inviteStep {

					position: absolute;
					top: -31rpx;
					left: 17%;
					display: flex;

					.stepbtn {
						width: 415rpx;
						height: 91rpx;
						background: linear-gradient(270deg, #FE9903 0%, #FB6510 100%);
						box-shadow: 0rpx 5rpx 27rpx 0rpx rgba(0, 0, 0, 0.25);
						border-radius: 11rpx;
						font-size: 36rpx;
						color: #FFFFFF;
						line-height: 91rpx;
						margin-top: -8rpx;
					}

					.triangleL,
					.triangleR {
						width: 32rpx;
						height: 32rpx;
						background: #D0590D;
					}

					.triangleL {

						clip-path: polygon(0% 100%, 100% 100%, 100% 0%)
					}

					.triangleR {
						clip-path: polygon(0 0, 0 100%, 100% 100%);
					}
				}

				.step_box {
					background: #FFFFFF;
					box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(42, 64, 55, 0.05);
					border-radius: 14rpx;
					margin: 600rpx 25rpx 22rpx 25rpx;
					position: relative;
				}

				.step {
					display: flex;
					justify-content: space-evenly;
					padding-top: 90rpx;

					.box {
						display: flex;
						flex-direction: column;
						align-items: center;
						width: 25%;
						margin: 24rpx 0;
						font-size: 25rpx;


						view:nth-child(2) {
							font-size: 25rpx;
							color: #000000;
						}

					}
				}

				.rules {
					width: 46rpx;
					padding: 13rpx 0px;
					background: #625F4B;
					border-radius: 11rpx 0 0 11rpx;
					color: #FFFFFF;
					position: fixed;
					top: 146rpx;
					right: 0;
					z-index: 1;
					font-size: 28rpx;
				}

				.my_reward {
					// height: 276rpx;
					background: #fff;
					box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(42, 64, 55, 0.05);
					border-radius: 14rpx;
					padding: 23rpx 31rpx;
					margin: 0 27rpx;

					.title {
						display: flex;
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

							view {
								margin: 10rpx 0;
								text-align: left;
							}

						}
					}
				}

				.price {
					font-weight: 500;
					font-size: 38rpx;
					color: #F74048;
				}

				.type {
					font-size: 25rpx;
					color: #A5A7A7;
				}

				.invite_list {
					padding: 23rpx 31rpx;
					margin: 21rpx 27rpx;
					background-color: #fff;

					.title {
						text-align: center;
						margin: 28rpx 0;
					}

					.number_box {

						background: #F6F6F6;
						border-radius: 14rpx;
						display: flex;
						justify-content: space-around;
						margin-bottom: 50rpx;

						.box {
							view {
								margin: 28rpx 0;
							}
						}
					}

					.list {
						display: flex;
						margin: 36rpx 0;

						image {
							width: 72rpx;
							height: 72rpx;
							margin-right: 20rpx;
						}

						.right {
							display: flex;
							flex-direction: column;
							text-align: left;
							justify-content: space-between;
							height: 72rpx;
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