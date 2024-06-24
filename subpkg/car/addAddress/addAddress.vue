<template>
	<view class="address">
		<map style="width: 100%; height: 50vh;"  :latitude="latitude" :longitude="longitude"
			show-location>
		</map>

		<cover-view class="dingwei">
			<cover-image @click="backDingwei"
				src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/04/28/754f65a63aa649f6827158c8b345a241.png"
				style="width: 44rpx;height: 44rpx;"></cover-image>
		</cover-view>
		<!-- 	<u--form labelPosition="left" :labelStyle='labelStyle' :model="model1" :rules="rules" ref="form1"
			labelWidth='180rpx'>
			<u-form-item label="联系人" prop="address.contact" borderBottom ref="item1">
				<u--input v-model="model1.address.contact" border="none" placeholder="请输入联系人"></u--input>
			</u-form-item>
			<u-form-item label="手机号" prop="address.phone" borderBottom ref="item1">
				<u--input v-model="model1.address.phone" border="none" placeholder="请输入手机号"></u--input>
			</u-form-item>
			<u-form-item label="地区" borderBottom label-align="center">
				<pickers v-if="!isSubmit||id==''" @address="addressHandle">
					<view v-if="model1.address.addressRegion!=''">{{model1.address.addressRegion}}</view>
					<view v-else style="color: rgb(192, 196, 204);">请选择地区</view>
				</pickers>
				<u--input v-if="isSubmit&&id!=''" disabled v-model="model1.address.addressRegion" border="none">
				</u--input>
			</u-form-item>
			<u-form-item label="详细地址" prop="address.addressDetailed" borderBottom ref="item1">
				<u--input :disabled='isSubmit&&id!=""' v-model="model1.address.addressDetailed" border="none"
					placeholder="请输入详细地址"></u--input>
			</u-form-item>
		</u--form> -->



		<view class="button" @click="addAndEditAddress">
			保存
		</view>
	</view>
</template>

<script>
	import storage from '@/utils/storage'
	var QQMapWX = require('@/utils/qqmap-wx-jssdk.js')
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
				// covers: [{
				// 	id: Math.round(Math.random() * (999999999 - 99999999) + 99999999),
				// 	latitude: '',
				// 	longitude: '',
				// 	iconPath: '../../../static/img/home/dingwei.png',

				// }],
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
						longitude: '',
						latitude: ''
					}
				},

				rules: {
					'address.contact': {
						type: 'string',
						required: true,
						message: '请填写联系人',
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
				id: '',
				isSubmit: false
			}
		},
		onLoad(option) {
			console.log(option);

			const pages = uni.$u.pages();
			this.isSubmit = pages.some(p => {
				return p.route.includes('submitOrder') || p.route.includes('goosDetails')
			})
			console.log(pages);
			uni.setNavigationBarTitle({
				title: option.id ? '修改地址' : '添加地址'
			})
			if (option.id) {
				this.id = option.id
				console.log('2222222222');
				getAddressInfo(this.id).then(res => {
					console.log(res);
					this.model1.address = res.data
				})
			}
			console.log(this.id);
			this.getLocation()
		},
		onReady() {
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			this.$refs.form1.setRules(this.rules)
		},
		methods: {
			getLocation() {
				uni.getLocation({
					// isHighAccuracy: true,
					// highAccuracyExpireTime: 1234,
					// type: 'gcj02',
					success: (suc) => {
						console.log(suc);
						//	uni.hideLoading()
						that.latitude = that.covers[0].latitude = suc.latitude
						that.longitude = that.covers[0].longitude = suc.longitude
						//获取门店所在位置
						uni.request({
							url: 'https://apis.map.qq.com/ws/geocoder/v1/?address=' + address +
								'&key=X6YBZ-S42K2-OULU2-C5VJG-ZSRG6-7KFOO',
							success: (res) => {
								console.log(res);
								let data = res.data.result.location
								that.covers[1].longitude = data.lng
								that.covers[1].latitude = data.lat
								var demo = new QQMapWX({
									key: 'X6YBZ-S42K2-OULU2-C5VJG-ZSRG6-7KFOO'
								})

							}
						})
					},
					fail: (res) => {
						console.log(res);
					}
				})

			},
			addressHandle(e) {
				console.log(e) //携带的参数
				this.model1.address.addressRegion = e.value1.toString().replace(/,/g, "/")
				this.model1.address.regionCode = e.value[2]
				console.log(this.model1.address.regionCode);
			},
			//回到当前位置
			backDingwei() {
				uni.createMapContext("map", this).moveToLocation({ //moveToLocation将地图中心移动到当前定位点，需要配合map组件的show-location使用
					latitude: this.latitude,
					longitude: this.longitude
				});
			},
			addAndEditAddress() {
				let that = this
				that.$refs.form1.validate().then(res => {
					var demo = new QQMapWX({
						key: 'X6YBZ-S42K2-OULU2-C5VJG-ZSRG6-7KFOO'
					})
					let address = that.model1.address.addressRegion.replace(/\//g, "") + that.model1.address
						.addressDetailed;
					console.log(address);
					demo.geocoder({
						address: address,
						success: function(res) { //成功后的回调
							console.log(res);
							that.model1.address.longitude = res.result.location.lng
							that.model1.address.latitude = res.result.location.lat
							if (that.id != '') {
								editAddress(that.model1.address).then(res => {
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
								console.log(that.model1.address);
								addAddress(that.model1.address).then(res => {
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

						}
					})


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
			background: #A4D091;
			border-radius: 45rpx;
			font-size: 36rpx;
			color: #FFFFFF;
			line-height: 91rpx;
			text-align: center;
			margin: 500rpx 30rpx 0 30rpx;
			// position: absolute;
			// bottom: 300rpx;
			// left: 43rpx;

		}

		.dingwei {
			position: absolute;
			right: 10%;
			top: 43%;
			width: 80rpx;
			height: 80rpx;
			background: #FFFFFF;
			box-shadow: 0px 0px 4px 0px rgba(42, 64, 55, 0.1);
			border-radius: 8rpx;
		}

		/deep/.u-input__content__field-wrapper__field {
			background-color: #fff;
		}
	}
</style>