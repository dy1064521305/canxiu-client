<template>
	<view class="myCard">
		<view style="font-size: 31rpx;text-align: center;margin-bottom: 30rpx;">
			{{num==0?'请输入本人身份信息':num==1?'请绑定持卡人本人的银行卡':'验证银行卡预留手机号'}}
		</view>
		<view style="margin: 0 30rpx;">
			<view v-show="num==0">
				<u--form labelPosition="left" :label-style='labelStyle' :model="model1" :rules="rules1" ref="form1"
					labelWidth='150rpx'>
					<u-form-item label="姓名" prop="info.name" borderBottom>
						<u--input v-model="model1.info.name" border="none" placeholder="请输入姓名"></u--input>
					</u-form-item>
					<u-form-item label="身份证" prop="info.myNumber" borderBottom>
						<view style="display: flex;">
							<u--input v-model="model1.info.myNumber" border="none" placeholder="请输入本人身份证号"></u--input>
							<!-- 	<image
								src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/04/03/af49c9cbdf6545b2b941ee25d447f2fa.png"
								style="width: 45rpx;height: 40rpx;"></image> -->
						</view>

					</u-form-item>

				</u--form>
			</view>

			<view v-show="num==1">
				<u--form labelPosition="left" :label-style='labelStyle' :model="model2" :rules="rules1" ref="form2"
					labelWidth='180rpx'>
					<u-form-item label="持卡人" borderBottom>
						<u--input disabled disabledColor="#ffffff" v-model="model2.card.name" border="none"></u--input>
					</u-form-item>
					<u-form-item label="卡号" prop="card.cardNumber" borderBottom>
						<u--input v-model="model2.card.cardNumber" @blur='getBankInfo' border="none"
							placeholder="持卡人本人银行卡号"></u--input>
					</u-form-item>
					<u-form-item label="卡类型" borderBottom>
						<view style="display: flex;">
							<u--input disabled disabledColor="#ffffff" v-model="cardType" border="none"
								placeholder="自动读取"></u--input>
							<!-- 	<view @click.stop="goTypes" style="width: 15%;display: flex;justify-content: flex-end;">
								<u-icon name="arrow-right" color="#ccc" size="20"></u-icon>
							</view> -->

						</view>

					</u-form-item>
					<u-form-item label="手机号" prop="card.phone" borderBottom>
						<view style="display: flex;width: 100%;">
							<u--input v-model="model2.card.phone" border="none" placeholder="请输入手机号"></u--input>
							<view @click.stop='showPhoneMotal=true'
								style="width: 15%;display: flex;justify-content: flex-end;">
								<u-icon name="error-circle" color="#ccc" size="20"></u-icon>
							</view>
						</view>

					</u-form-item>

				</u--form>
			</view>

			<view v-show="num==2">
				<view class="box">
					<text class="label">手机号</text>
					<input style="height: 100%;" v-model="model2.card.phone" type="text" disabled>
				</view>
				<view class="box">
					<text class="label">验证码</text>
					<input style="height: 100%;width: 56%;" v-model="code" type="text" placeholder="请输入验证码">
					<text style="color: #A5A7A7;" v-if="countDownNum==0" @click="getCodeHandle">获取验证码</text>
					<text style="width: 24%;text-align:end;color: #A5A7A7;"
						v-if="countDownNum!=0">{{countDownNum}}s</text>
				</view>
			</view>

		</view>



		<view class="btns">
			<view v-if="num!=0" style="width: 335rpx;" class="btn-white" @click="num--">
				上一步
			</view>
			<view style="width: 335rpx;" class="btn-green" @click="next">
				{{num==2?'添加银行卡':'下一步'}}
			</view>
		</view>

		<!-- 手机号说明 -->
		<u-modal :show="showPhoneMotal" width="500rpx" title="手机号说明" confirmColor='#A4D091'
			@confirm="showPhoneMotal=false">
			<view style="width: 100%;text-align: center;">
				手机号为银行预留手机号即办理该银行卡时所填写的手机号，如没有预留、忘记手机号码或已经停用，可联系银行客服更新处理。
			</view>
		</u-modal>
	</view>
</template>

<script>
	import {
		getCode,
	} from '@/api/login.js'
	import bank from '@/utils/bank.js'
	import storage from '@/utils/storage'
	import {
		validateSmsCode
	} from '@/api/captcha.js'
	import {
		addBankCard
	} from '@/api/bankCard.js'
	export default {
		data() {
			return {
				code: '',
				showPhoneMotal: false,
				num: 0,
				labelStyle: {
					'font-size': '30rpx',
					'font-weight': 'bold'
				},
				countDownNum: 0, //获取验证码后倒数
				model1: {
					info: {
						name: '',
						myNumber: '',
					}
				},
				model2: {
					card: {
						name: '',
						cardNumber: '',
						//6214837409745597
						phone: '',
					}
				},
				rules1: {
					'info.name': {
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					},
					'info.myNumber': {
						type: 'string',
						required: true,
						message: '请填写身份证号',
						trigger: ['blur', 'change']
					},

				},
				rules2: {
					'card.cardNumber': {
						type: 'number',
						required: true,
						message: '请填写卡号',
						trigger: ['blur', 'change']
					},

					'card.phone': [{
						required: false,
					}, {
						validator: (rule, value, callback) => {
							if (value == undefined) {
								return true
							} else {
								return uni.$u.test.mobile(value);
							}

						},
						message: '手机号码不正确',
						trigger: ['change', 'blur'],
					}]
				},
				cardType: ''
			};
		},
		onReady() {
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			this.$refs.form1.setRules(this.rules1)
			this.$refs.form2.setRules(this.rules2)
		},
		methods: {
			//倒计时定时器
			countDown() {
				uni.$u.toast('验证码已发送，请查收短信')
				this.countDownNum = 60
				this.timer = setInterval(() => {
					this.countDownNum--
					if (this.countDownNum <= 0) {
						clearInterval(this.timer);
					}
				}, 1000)

			},
			getType(info) {
				console.log(info);
				this.model2.card.type = info.bankName + '  ' + info.cardTypeName
			},
			next() {

				this.num == 0 && this.$refs.form1.validate().then(res => {
					this.num = 1
					this.model2.card.name = this.model1.info.name

				}).catch(errors => {
					uni.$u.toast('校验失败')
					console.log('1111');
				})
				this.num == 1 && this.$refs.form2.validate().then(res => {
					this.num = 2
					this.getCodeHandle()

				}).catch(errors => {
					console.log('2222');
					uni.$u.toast('校验失败')
				})
				this.num == 2 && validateSmsCode({
					phonenumber: this.model2.card.phone,
					smsCode: this.code
				}).then(res => {
					if (res.code == 200) {
						addBankCard(this.model2.card).then(res => {
							uni.showToast({
									title: '添加成功',
									duration: 2000
								});
							setTimeout(() => {
								uni.reLaunch({
									url: '../myCard/myCard'
								})
							}, 800)
						})
					}

				})
				console.log(this.num);
			},
			getCodeHandle() {
				

				getCode({
					phonenumber: this.model2.card.phone
				}).then(res => {
					console.log(res);
				})
				this.countDown()
			},
			goTypes() {
				uni.navigateTo({
					url: '../cardTypes/cardTypes'
				})
			},
			getBankInfo() {
				if (!bank.verifyBankCardNumber(this.model2.card.cardNumber)) {
					uni.$u.toast('请填写正确的银行卡号')
					return
				}
				let info = bank.bankCardAttribution(this.model2.card.cardNumber)
				this.cardType = info.bankName==undefined&&info.cardTypeName==undefined?'':info.bankName + ' ' +info.cardTypeName
				this.model2.card.bankCode = info.bankCode
				this.model2.card.bankName = info.bankName
				this.model2.card.cardType = info.cardType
				this.model2.card.cardTypeName = info.cardTypeName
				this.model2.card.userId = storage.get('ClientId')
				this.model2.card.userType = 'c'
				console.log(this.model2.card);
			}
		}
	}
</script>

<style>
	page {
		background: #fff;
	}
</style>

<style lang="scss" scoped>
	.myCard {
		position: relative;
		//	padding: 30rpx 0;
		height: 100vh;

		.btn-white,
		.btn-green {
			height: 85rpx;
			border-radius: 45rpx;
			text-align: center;
			line-height: 85rpx;
			font-size: 36rpx;
		}

		.btn-white {
			background: #FFFFFF;
			border: 4rpx solid #A4D091;
			color: #A4D091;
		}

		.btn-green {
			background: #A4D091;
			color: #fff;
			height: 90rpx;
		}

		.box {
			display: flex;
			height: 100rpx;
			line-height: 100rpx;
			border-bottom: 2rpx solid #F8F8F8;
			align-items: center;

			.label {
				font-weight: bold;
				font-size: 31rpx;
				margin-right: 32rpx;
			}
		}

		.btns {
			position: absolute;
			bottom: 300rpx;
			display: flex;
			justify-content: space-evenly;
			margin-bottom: 40rpx;
			width: 100%;
			background: #fff;
		}


	}
</style>
