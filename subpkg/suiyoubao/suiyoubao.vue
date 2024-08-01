<template>
	<view class="suiyoubao">

		<view v-if="signInfo.resTips!='签约失败'&&signInfo.resTips!='审核中'">
			<view class="tips">
				实名信息仅用于第三方灵活用工平台进行签约开通接收服务报酬及提现功能，不做其他用途！
			</view>
			<u-sticky>
				<view class="step">
					<view class="top">
						<image @click="back"
							src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/08/24/2681440e618c43049d0ba2e3061548eb.png"
							style="width: 31rpx;height: 31rpx;"></image>
						<view class="line" :style="{ 'background': !isSign ? '#A4D091' : '#F5F9FA' }"></view>
						<image v-if="!isSign"
							src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/08/24/2681440e618c43049d0ba2e3061548eb.png"
							style="width: 31rpx;height: 31rpx;"></image>
						<image v-else
							src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/08/24/eec7a60e16fe46dd87cc9fc78391954c.png"
							style="width: 31rpx;height: 31rpx;"></image>
					</view>
					<view style="display: flex;justify-content: space-between;padding:12rpx 125rpx;">
						<text @click="back">签约状态查询</text>
						<text>绑定银行卡</text>
					</view>
				</view>
			</u-sticky>
			<view class="main">

				<u--form labelPosition="left" :labelStyle='labelStyle' :model="form" :rules="rules" ref="uForm"
					labelWidth='180rpx'>

					<view class="box" style="padding:0" v-if='isSign'>


						<u-form-item label="姓名" prop="inviter" ref="item1" required>
							<u--input v-model="form.inviter" border="none" placeholder="请输入姓名"></u--input>
						</u-form-item>
						<u-form-item label="身份证号" prop="cardNumber" ref="item1" required>
							<u--input v-model="form.cardNumber" border="none" placeholder="请输入身份证号"></u--input>
						</u-form-item>
						<u-form-item label="手机号" prop="phoneNumber" ref="item1" style="border-bottom:none" required>
							<u--input v-model="form.phoneNumber" border="none" placeholder="请输入手机号"></u--input>
						</u-form-item>

					</view>

					<view v-if='!isSign'>
						<view class="box">
							<view class="title">
								上传身份证照片（必填）
							</view>
							<view class="box_tips">
								当前实名信息必须为您的微信、支付宝、银行卡的实名信息一致，否则无法结算工钱
							</view>
							<yk-authpup ref="authpupStorage" type="top" @changeAuth="changeAuthStorage"
								permissionID="WRITE_EXTERNAL_STORAGE"> </yk-authpup>
							<yk-authpup ref="authpupCamera" type="top" @changeAuth="changeAuthCamera"
								permissionID="CAMERA">
							</yk-authpup>
							<view @click="billChooseImage('cardPositiveImg')" class="imgsBox">
								<view class="imgs">
									<image v-if="!cardPositiveImg||cardPositiveImg==null"
										src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/08/30/8bedd72dbbe74f889c8303dfb86462bb.png">
									</image>
									<image v-if="cardPositiveImg!=''&&cardPositiveImg!=null" :src="cardPositiveImg">
									</image>
									<view v-if="!cardPositiveImg||cardPositiveImg==null" class="text">上传身份证人像面</view>
								</view>

							</view>

							<view @click="billChooseImage('cardReverseImg')" class="imgsBox">
								<view class="imgs">
									<image v-if="!cardReverseImg||cardReverseImg==null"
										src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/08/30/3d30759ca087496e944601d776539936.png">
									</image>
									<image v-if="cardReverseImg!=''&&cardReverseImg!=null" :src="cardReverseImg">
									</image>
									<view v-if="!cardReverseImg||cardReverseImg==null" class="text">上传身份证国徽面</view>
								</view>


							</view>
						</view>

						<view class="box" style="padding-bottom: 0;">
							<view class="title">
								绑定提现账号
							</view>
							<view class="box_tips">
								绑定须知</br>
								1、一旦绑定签约成功后，不可修改银行卡信息；</br>
								2、务必绑定本人银行卡信息，否则会签约失败；</br>
							</view>
							<u-form-item label="银行卡" prop="bankNumber" ref="item1" style="border-bottom:none" required>
								<u--input @confirm='getBankInfo' v-model="form.bankNumber" border="none"
									placeholder="请输入你的银行卡" clearable @blur='getBankInfo'
									@keyboardheightchange='getBankInfo'></u--input>
							</u-form-item>
							<u-form-item label="银行名称">
								<u--input v-model="bankName" border="none" disabled placeholder="自动读取"></u--input>
							</u-form-item>

						</view>
					</view>




				</u--form>
			</view>
			<view class="btnbg">
				<view class="btn" @click="submit">
					{{isSign?'下一步':'提交签约信息'}}
				</view>
			</view>
		</view>
		<view v-else-if="signInfo.resTips=='签约失败'||signInfo.resTips=='审核中'" class="empty">
			<image
				:src="signInfo.resTips=='签约失败'?'https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/19/1d6ef49ea1b748608413b54accdffca0.png':'https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/19/eb8627a8450144209788639c10b74e92.png'">
			</image>
			<view>
				{{signInfo.resTips=='签约失败'?'签约失败':'审核中'}}
			</view>
			<view>
				{{signInfo.resTips=='签约失败'?`失败原因:${signInfo.msg}`:'认证信息已提交，请耐心等待认证'}}
			</view>
			<view class="btns">
				<view class="btn-green" @click='btnHandle'>
					{{signInfo.resTips=='签约失败'?'重新编辑提交':'返回首页'}}
				</view>
				<view class="btn-white" @click="showPhone=true">
					联系客服
				</view>

			</view>
		</view>
		<!-- 拨打电话 -->
		<u-action-sheet round='20' :closeOnClickAction='false' @select='actionSelect' :closeOnClickOverlay='false'
			:actions="actionList" :show="showPhone"></u-action-sheet>
		<u-toast ref="uToast"></u-toast>

	</view>
</template>

<script>
	import storage from '@/utils/storage'
	import bank from '@/utils/bank.js'
	import {
		isEmpty,
	} from '@/utils/verify.js'
	import {
		signSubmit,
		getSignStatus,
		getSignCache
	} from '@/api/money.js'
	import {
		callPhone
	} from '@/utils/phone.js'
	import {
		getInfoById,
	} from '@/api/user.js'
	import {
		getCardInfo,
		getBankCardList
	} from '@/api/bankCard.js'
	const {
		environment
	} = require('../../config/environment')
	export default {
		data() {
			return {
				camera: false,
				storagee: false,
				showPhone: false,
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
				isSign: true,
				bankName: '',
				cardReverseImg: '', //身份证反面照
				cardPositiveImg: '', //正面
				labelStyle: {
					'font-size': '31rpx'
				},
				form: {
					inviter: '',
					phone: '',
					addressDetailed: '',

				},
				signInfo: {
					resTips: 'init'
				},
				rules: {
					'inviter': {
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					},
					'cardNumber': {
						type: 'string',
						required: true,
						message: '请填写身份证号',
						trigger: ['blur', 'change']
					},
					'bankNumber': {
						type: 'string',
						required: true,
						message: '请填写银行卡号',
						trigger: ['blur', 'change']
					},
					'phoneNumber': [{
							type: 'number',
							required: true,
							message: '请输入手机号',
							trigger: ['change', 'blur'],
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// uni.$u.test.mobile()就是返回true或者false的
								return uni.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change
							trigger: ['change', 'blur'],
						}
					]
				},
			}
		},
		onLoad() {
			// this.signInfo.requestResult='签约失败'
			uni.setNavigationBarTitle({
				title: '灵活用工签约'
			})
			this.getInfo()
		},
		methods: {
			getInfo() {
				getSignCache({
					userId: storage.get('ClientId'),
					userType: 'c'
				}).then(res => {
					if (res.data != null) {
						let info = res.data
						this.form.phoneNumber = info.telphone
						this.form.cardNumber = info.talentCard
						this.form.inviter = info.talentName
					} else {
						getInfoById(storage.get('ClientId')).then(res => {
							console.log(res);
							this.form = res.data
						})
					}

				})


			},
			billChooseImage(type) {
				this.types = type
				// #ifdef APP-PLUS
				this.$refs['authpupCamera'].open()
				this.$refs['authpupStorage'].open()
				// #endif
				// #ifdef MP-WEIXIN
				this.upLoadImage()
				// #endif
			},

			changeAuthCamera() {
				this.camera = true

			},

			changeAuthStorage() {
				this.storagee = true
				if (this.camera && this.storagee) {
					this.upLoadImage()
				}
			},
			back() {
				this.isSign = true
			},
			upLoadImage() {
				let that = this
				uni.chooseImage({
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					// sourceType: ['album'], //从相册选择
					success: res => {
						console.log(res);
						uni.showLoading({
							title: '上传中'
						});
						const path = res.tempFiles[0].path;
						this.file = res.tempFiles[0]
						uni.uploadFile({
							url: environment.baseURL + '/system/oss/upload',
							filePath: path,
							name: 'file',
							header: {
								Authorization: "Bearer " + storage.get('AccessToken')
							},
							success: res => {
								let data = JSON.parse(res.data);
								if (data.code == 200) {
									console.log(data);
									uni.hideLoading();
									that.types == 'cardReverseImg' ? that.cardReverseImg = data
										.data
										.url : that.cardPositiveImg =
										data.data.url

									console.log(that.realImg);
									uni.hideLoading();
								}
							}
						});
					}

				});
			},
			getBankInfo() {
				getCardInfo({
					account: this.form.bankNumber
				}).then(res => {
					if (!res.data.validated) {
						this.bankName = ''
						// uni.$u.toast('校验失败')
					} else {
						this.bankName = res.data.bankName
					}

				})


			},
			phoneAuth() {
				// #ifdef APP-PLUS
				this.$refs['authpup'].open()
				// #endif
				// #ifdef MP-WEIXIN
				this.showPhone = true
				// #endif

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
			submit() {

				this.$refs.uForm.validate().then(res => {
					if (!this.isSign) {
						if (!this.cardReverseImg || !this.cardPositiveImg) {
							this.$refs.uToast.show({
								type: 'error',
								message: '请上传身份证'
							});
							return
						}

						signSubmit({
							userId: storage.get('ClientId'),
							userType: "c",
							cardType: "1",
							talentName: this.form.inviter,
							talentCard: this.form.cardNumber,
							payType: "1",
							account: this.form.bankNumber,
							cardReverseImg: this.cardReverseImg,
							cardPositiveImg: this.cardPositiveImg,
							telphone: this.form.phoneNumber
						}).then(res => {
							this.$refs.uToast.show({
								type: res.data.code == 200 ? 'success' : 'error',
								message: res.data.msg
							});
							if (res.data.code == 200) {
								this.signInfo.resTips = '审核中'
							}
						})
					} else {
						console.log('35000000000');
						getSignStatus({
							talentName: this.form.inviter,
							talentCard: this.form.cardNumber,
							userId: storage.get('ClientId'),
							userType: 'c'
						}).then(res => {
							console.log(res);
							this.signInfo = res.data

							if (this.signInfo.resTips == '签约成功') {
								this.$refs.uToast.show({
									type: 'warning',
									message: '该身份证已签约，无需再次签约'
								});
								setTimeout(() => {
									uni.navigateTo({
										url: '../center/myMoney/myCard/myCard'
									})
								}, 800)

							} else if (this.signInfo.requestResult == '未查询到签约数据') {
								this.isSign = false
								//获取银行卡信息
								getBankCardList({
									userId: storage.get('ClientId')
								}).then(res => {
									this.bankName = res.rows[0].bankName
									this.form.bankNumber = res.rows[0].cardNumber
								})
							} else if (this.signInfo.resTips == '签约失败') {
								getSignCache({
									userId: storage.get('ClientId'),
									userType: 'c'
								}).then(res => {
									// console.log(res);
									let info = res.data
									this.cardReverseImg = info.cardReverseImg
									this.cardPositiveImg = info.cardPositiveImg
									this.bankName = info.bankName
									this.form.bankNumber = info.account
								})
								uni.setNavigationBarTitle({
									title: '审核进度'
								})
							}

						})
					}

				})
			},
			btnHandle() {
				if (this.signInfo.resTips == '签约失败') {
					this.signInfo.resTips = ''
					this.isSign = false
				} else {
					uni.switchTab({
						url: '/pages/home/index'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.suiyoubao {
		.tips {
			font-size: 29rpx;
			color: #FF6010;
			padding: 28rpx 36rpx;
			background: #FFF9ED;
			// margin-bottom: 20rpx;
		}

		/deep/.u-input__content__field-wrapper__field {
			background-color: #fff;
		}

		.step {
			background: #fff;
			padding: 40rpx 10rpx 20rpx;

			.top {
				display: flex;
				align-items: center;
				justify-content: center;

				.line {
					width: 289rpx;
					height: 11rpx;
					border-radius: 5rpx;
				}
			}

		}

		.main {
			height: 68vh;
			overflow: scroll;

			.box {
				background: #fff;
				margin: 20rpx 28rpx;
				border-radius: 11rpx;
				padding: 29rpx;

				::v-deep.u-form-item {
					padding: 16rpx 28rpx !important;
					border-bottom: 2rpx solid #F8F8F8;
				}

				.box_tips {
					background: #FCF0F0;
					border-radius: 7rpx;
					padding: 28rpx;
					margin: 21rpx 0;
					font-weight: 500;
					font-size: 25rpx;
					color: #DA2746;
				}

				.title {
					font-size: 31rpx;
					font-weight: 400;
				}

				.imgsBox {
					image {
						width: 481rpx;
						height: 311rpx;
					}

					.imgs {
						text-align: center;
						margin: 31rpx 0;

						.text {
							color: #A5A7A7;
							font-size: 25rpx;
							margin-top: 22rpx;
						}
					}
				}


			}
		}


		.btnbg {
			height: 145rpx;
			position: fixed;
			bottom: 0;
			width: 100%;
			padding-top: 20rpx;
			background: #fff;
			z-index: 10000;

			.btn {
				width: 90%;
				height: 91rpx;
				color: #fff;
				line-height: 91rpx;
				text-align: center;
				border-radius: 50rpx;
				margin: 10rpx auto;
				background: #A4D091;
			}
		}

		.empty {
			text-align: center;

			image {
				width: 403rpx;
				height: 247rpx;
				margin: 322rpx 0 0;
			}

			view:nth-child(3) {
				font-size: 33rpx;
				color: #474948;
				margin: 0 20rpx;
			}

			view:nth-child(2) {
				font-size: 29rpx;
				color: #A5A7A7;
				margin: 23rpx 0 14rpx 0;
			}

			.btns {
				margin-top: 233rpx;

				.btn-white,
				.btn-green {
					margin: 10rpx 46rpx;
					text-align: center;

					font-size: 36rpx;
					border-radius: 11rpx;
				}

				.btn-green {
					padding: 20rpx 188rpx;
					background: linear-gradient(270deg, #A4D091 0%, #ABD39B 100%);
					color: #fff;
				}

				.btn-white {
					padding: 17rpx 188rpx;
					border: 2rpx solid #A6D194;
					color: #A5D092;
				}
			}
		}


	}
</style>