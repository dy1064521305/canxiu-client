<template>
	<view class="address">
		<u--form labelPosition="left" :labelStyle='labelStyle' :model="model1" :rules="rules" ref="form1"
			labelWidth='180rpx'>
			<u-form-item label="联系人姓名" prop="address.contact" borderBottom ref="item1">
				<u--input v-model="model1.address.contact" border="none" placeholder="请输入联系人姓名"></u--input>
			</u-form-item>
			<u-form-item label="手机号" prop="address.phone" borderBottom ref="item1">
				<u--input v-model="model1.address.phone" border="none" placeholder="请输入手机号"></u--input>
			</u-form-item>
			<u-form-item label="地区" borderBottom label-align="center">
				<pickers @address="addressHandle">
					<view v-if="model1.address.addressRegion!=''">{{model1.address.addressRegion}}</view>
					<view v-else style="color: rgb(192, 196, 204);">请选择地区</view>
				</pickers>
			</u-form-item>
			<u-form-item label="详细地址" prop="address.addressDetailed" borderBottom ref="item1">
				<u--input v-model="model1.address.addressDetailed" border="none" placeholder="请输入详细地址"></u--input>
			</u-form-item>
		</u--form>



		<view class="button" @click="addAndEditAddress">
			保存
		</view>
	</view>
</template>

<script>
	import storage from '@/utils/storage'
	import {
		getAddressInfo,
		editAddress,
		addAddress
	} from "@/api/address.js"
	import pickers from "@/components/ming-picker/ming-picker.vue"
	export default {
		components: {
			pickers
		},
		data() {
			return {
				labelStyle: {
					'font-size': '30rpx'
				},
				model1: {
					address: {
						contact: '',
						phone: '',
						addressDetailed: '',
						addressRegion: '',
						clientId: storage.get('ClientId'),
					}
				},

				rules: {
					'address.contact': {
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					},
					'address.addressDetailed': {
						type: 'string',
						required: true,
						message: '请填写详细地址',
						trigger: ['blur', 'change']
					},
					'address.phone': [{
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
				showAddress: false,
				id: ''
			}
		},
		onLoad(option) {
			console.log(option);
			uni.setNavigationBarTitle({
				title: option.id ? '修改地址' : '添加地址'
			})
			if (option.id ) {
				this.id = option.id
				console.log('2222222222');
				getAddressInfo(this.id).then(res => {
					console.log(res);
					this.model1.address = res.data
				})
			}
		},
		onReady() {
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			this.$refs.form1.setRules(this.rules)
		},
		methods: {
			addressHandle(e) {
				console.log(e) //携带的参数
				this.model1.address.addressRegion = e.value.toString().replace(/,/g, "/")
				console.log(this.model1.address.addressRegion);
			},
			addAndEditAddress() {
				this.$refs.form1.validate().then(res => {
					console.log(this.model1.address);
					if (this.id != '') {
						editAddress(this.model1.address).then(res => {
							console.log(res);
							if (res.code === 200) {
								uni.showToast({
									title: '编辑成功',
									duration: 2000,
								});
								setTimeout(function() {
									uni.navigateBack()
								}, 1000)
							}
						})
					} else {
						addAddress(this.model1.address).then(res => {
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
	.address {
		position: relative;
		padding: 30rpx 20rpx;
		height: 100vh;

	.button {
		//width: 663rpx;
		height: 91rpx;
		background: #9FD6BA;
		border-radius: 45rpx;
		font-size: 36rpx;
		color: #FFFFFF;
		line-height: 91rpx;
		text-align: center;
		margin: 500rpx  30rpx 0 30rpx;
		// position: absolute;
		// bottom: 300rpx;
		// left: 43rpx;
		
	}
	}
</style>
