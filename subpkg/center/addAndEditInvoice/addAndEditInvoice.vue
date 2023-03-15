<template>
	<view class="invoice">
		<u--form labelPosition="left" :labelStyle='labelStyle' :model="model1" :rules="rules" ref="form1"
			labelWidth='200rpx'>
			<u-form-item :required="true" :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label="发票抬头"
				prop="invoice.headerName" borderBottom ref="item1">
				<u--input v-model="model1.invoice.headerName" border="none" placeholder="请输入发票抬头"></u--input>
			</u-form-item>
			<u-form-item :required="true" :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label="纳税人识别号"
				prop="invoice.taxNumber" borderBottom ref="item1">
				<u--input v-model="model1.invoice.taxNumber" border="none" placeholder="请输入纳税人识别号"></u--input>
			</u-form-item>
			<u-form-item label="单位地址" prop="invoice.companyAddress" borderBottom ref="item1">
				<u--input v-model="model1.invoice.companyAddress" border="none" placeholder="请输入单位地址"></u--input>
			</u-form-item>
			<u-form-item label="联系电话" prop="invoice.companyPhone" borderBottom ref="item1">
				<u--input v-model="model1.invoice.companyPhone" border="none" placeholder="请输入联系电话"></u--input>
			</u-form-item>
			<u-form-item label="开户银行" prop="invoice.bank" borderBottom ref="item1">
				<u--input v-model="model1.invoice.bank" border="none" placeholder="请输入开户银行"></u--input>
			</u-form-item>
			<u-form-item label="银行账户" prop="invoice.bankAccount" borderBottom ref="item1">
				<u--input v-model="model1.invoice.bankAccount" border="none" placeholder="请输入银行账户"></u--input>
			</u-form-item>
		</u--form>



		<view class="button" @click="addAndEditInvoice">
			保存
		</view>
	</view>
</template>

<script>
	import storage from '@/utils/storage'
	import {
		getInvoiceHeaderInfo,
		addInvoiceHeader,
		editInvoiceHeader
	} from "@/api/invoice.js"
	export default {
		components: {},
		data() {
			return {
				labelStyle: {
					'font-size': '30rpx'
				},
				model1: {
					invoice: {
							clientId: storage.get('ClientId'),
					}
				},

				rules: {
					'invoice.headerName': {
						type: 'string',
						required: true,
						message: '请填写发票抬头',
						trigger: ['blur', 'change']
					},
					'invoice.taxNumber': {
						type: 'string',
						required: true,
						message: '请填写纳税人识别号',
						trigger: ['blur', 'change']
					},
					'invoice.companyPhone': [{
						required: false,
					}, {
						validator: (rule, value, callback) => {
							if(value==undefined){
								return true
							}else{
								return uni.$u.test.mobile(value);
							}
						
						},
						message: '手机号码不正确',
						trigger: ['change', 'blur'],
					}]
				},
				showinvoice: false,
				id:''
			}
		},
		onLoad(option) {
			console.log(option);
			uni.setNavigationBarTitle({
				title: option.id != '' ? '修改抬头' : '添加抬头'
			})
			if(option.id != ''){
				this.id=option.id
				getInvoiceHeaderInfo(this.id).then(res=>{
					console.log(res);
					this.model1.invoice=res.data
				})
			}
		},
		onReady() {
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			this.$refs.form1.setRules(this.rules)
		},
		methods: {
			addAndEditInvoice() {
				this.$refs.form1.validate().then(res => {
					console.log(this.model1.invoice);
					if (this.id != '') {
						editInvoiceHeader(this.model1.invoice).then(res => {
							console.log(res);
							if (res.code === 200) {
								uni.showToast({
									title: '编辑成功',
									duration: 2000
								});
							setTimeout(function() {
								uni.navigateBack()
							}, 1000)
							}
						})
					} else {
						addInvoiceHeader(this.model1.invoice).then(res => {
							console.log(res);
							if (res.code === 200) {
								uni.showToast({
									title: '添加成功',
									duration: 2000
								});
							setTimeout(function() {
								uni.navigateBack()
							}, 1000)
							}
						})
					}

				}).catch(errors => {
					uni.$u.toast('校验失败')
				})

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
	.invoice {
		position: relative;
		padding: 30rpx 20rpx;
		height: 100vh;

		.button {
			width: 663rpx;
			height: 91rpx;
			background: #9FD6BA;
			border-radius: 45rpx;
			font-size: 36rpx;
			color: #FFFFFF;
			line-height: 91rpx;
			text-align: center;
			position: absolute;
			bottom: 300rpx;
			left: 43rpx;
		}
	}
</style>
