<template>
	<view class="address">

		<u--form labelPosition="left" :labelStyle='labelStyle' :model="model1" :rules="rules" ref="form1"
			labelWidth='180rpx'>

			<view class="box">
				<u-form-item label="所在城市" borderBottom label-align="center">
					<!-- 	<pickers v-if="!isSubmit||id==''" @address="addressHandle">
						<view v-if="model1.address.addressRegion!=''">{{model1.address.addressRegion}}</view>
						<view v-else style="color: rgb(192, 196, 204);">请选择地区</view>
					</pickers> -->
					<view style="display: flex;align-items: center;">
						<view style="width:360rpx;">
							<u--input placeholder="请选择所在城市" disabled v-model="model1.address.addressRegion"
								border="none">
							</u--input>
						</view>
						<view v-if="!isSubmit||id==''" @click="getAddress">
							<image style="width: 28rpx;height: 32rpx;margin-right:10rpx;"
								src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/06/25/90ecfbde05f64a089bf4a946f8c0f554.png"
								mode=""></image>定位
						</view>
					</view>

				</u-form-item>
				<u-form-item label="详细地址" borderBottom ref="item1">

					<u--textarea :disabled='isSubmit&&id!=""' v-model="model1.address.addressDetailed" border='none'
						placeholder="请输入详细地址"></u--textarea>
				</u-form-item>
				<u-form-item label="门牌号" prop="address.houseNum" ref="item1">
					<u--input v-model="model1.address.houseNum" border="none" placeholder="例：4号楼2603">
					</u--input>

				</u-form-item>
			</view>



			<view class="box">
				<u-form-item label="联系人" prop="address.contact" borderBottom ref="item1">
					<u--input v-model="model1.address.contact" border="none" placeholder="请输入联系人"></u--input>
				</u-form-item>
				<u-form-item label="联系电话" prop="address.phone" ref="item1">
					<u--input v-model="model1.address.phone" border="none" placeholder="请输入联系电话"></u--input>
				</u-form-item>
			</view>

			<view class="box" style="padding:20rpx;">
				<view style="display: flex;align-items: center;">

					<view v-if="model1.address.isDefault=='0'" class="moren" @click.stop="morenHandle('1')">
						<image style="width: 32rpx;margin-right: 11rpx;height: 32rpx;"
							src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/08/18/87c7f99dab0b4efcb0ff259ecc86c7fd.png">
						</image>
					</view>
					<view v-else class="un" @click.stop="morenHandle('0')">
						<view class="circle"></view>
					</view>
					设为默认地址
				</view>
				<view style="font-size: 25rpx;color: #A5A7A7;padding: 10rpx 0 0 39rpx;">
					每次下单时会默认推荐使用该地址
				</view>
			</view>
		</u--form>



		<view class="button" @click="addAndEditAddress">
			保存编辑
		</view>
	</view>
</template>

<script>
	import storage from '@/utils/storage'
	import {
		getAddressList,
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
						houseNum: '',
						clientId: storage.get('ClientId'),
						longitude: '',
						latitude: '',
						name: '',
						isDefault: "1"
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
				isSubmit: false,
				addressData: [],
				addressList: []
			}
		},
		onLoad(option) {
			this.getAddressCode()
			const pages = uni.$u.pages();
			this.isSubmit = pages.some(p => {
				return p.route.includes('submitOrder') || p.route.includes('goosDetails')
			})
			uni.setNavigationBarTitle({
				title: option.id ? '修改地址' : '添加地址'
			})
			if (option.id) {
				this.id = option.id
				getAddressInfo(this.id).then(res => {
					this.model1.address = res.data
					this.model1.address.addressRegion = this.model1.address.addressRegion.replace(/\//g, '-')
				})
			}
		},
		onReady() {
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			this.$refs.form1.setRules(this.rules)
		},
		methods: {
			getAddressCode() {
				// uni.request({
				// 		url: 'https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/12/30/78ed8008c9ef4aa6a6c29f101bb0c9ec.json',
				// 		method: 'GET',
				// 		complete: (res) => {
				// 			this.addressData = res.data
				// 		}
				// 	}),
				getAddressList({
					clientId: storage.get('ClientId'),
				}).then(res => {
					this.addressList = res.rows

				})
			},
			commitCheck(e) {
				let location = e.location.split(',')
				this.model1.address.latitude = location[1]
				this.model1.address.longitude = location[0]
				this.model1.address.addressRegion = e.province + '-' + e.city + (e.district ? '-' + e.district : '')
				this.model1.address.regionCode = e.adcode
				this.model1.address.addressDetailed = e.name
			},
			/**
			   * 格式化位置
			   * @param {*} res chooseLocation成功后返回参数
			   * 格式: {
			  	 address: "山东省济南市槐荫区经十西路29851号"
			     errMsg: "chooseLocation:ok"
			     latitude: 36.65142
			     longitude: 116.90084
			     name: "济南市槐荫区人民政府"
			     }
			   */
			captureLocation(res) {
				var regex = /^(北京市|天津市|重庆市|上海市|香港特别行政区|澳门特别行政区)/;
				var province = [];
				var addressBean = {
					province: null,
					country: null,
					city: null,
					address: null,
				};

				function regexAddressBean(address, addressBean) {
					regex = /^(.*?[市]|.*?[州]|.*?地区|.*?特别行政区)(.*?[区]|.*?[市]|.*?[县])(.*?)$/g;
					var addxress = regex.exec(address);
					console.log(addxress);
					addressBean.city = addxress[1];
					addressBean.country = addxress[2];
					addressBean.address = addxress[3] + '(' + res.name + ')';
					// console.log(addxress);
				}
				if (!(province = regex.exec(res.address))) {
					regex = /^(.*?(省|自治区))(.*?)$/;
					let letregion_province = regex.exec(res.address);
					addressBean.province = letregion_province[1];
					regexAddressBean(letregion_province[3], addressBean);
				} else {
					addressBean.province = province[1];
					regexAddressBean(res.address, addressBean);
				}
				return addressBean;
			},

			getAddress() {
				let info = {
					longitude: this.model1.address.longitude,
					latitude: this.model1.address.latitude
				}
				uni.navigateTo({
					url: './map/map?info=' + JSON.stringify(info)
				})
				return
				let params = {}
				if (this.model1.address.latitude) params = {
					latitude: this.model1.address.latitude,
					longitude: this.model1.address.longitude,
				}
				uni.chooseLocation({
					...params,
					success: (res) => {
						let locationObj = this.captureLocation(res);
						this.model1.address.latitude = res.latitude
						this.model1.address.longitude = res.longitude
						this.model1.address.addressRegion = locationObj.province + '-' + locationObj.city +
							'-' + locationObj.country
						this.model1.address.addressDetailed = locationObj.address
						this.addressData.forEach(yi => {
							if (yi.name == locationObj.province) {
								yi.children.forEach(er => {
									if (er.name == locationObj.city) {
										er.children.forEach(san => {
											if (san.name == locationObj.country) {
												this.model1.address.regionCode = san
													.code

											}
										})
									}
								})
							}
						})

					}
				});
			},
			//设为默认
			morenHandle(type) {
				this.model1.address.isDefault = type
			},
			setMoren() {
				this.addressList.forEach(address => {
					if (address.isDefault == "0") {
						address.isDefault = "1"
					}

				})
			},

			addAndEditAddress() {
				this.$refs.form1.validate().then(res => {
					this.model1.address.addressRegion = this.model1.address.addressRegion.replace(/-/g, '/')
					if (this.model1.address.isDefault == "0") {
						this.setMoren()
					}
					if (this.id != '') {
						editAddress(this.model1.address).then(res => {
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


<style lang="scss" scoped>
	.address {
		position: relative;
		padding: 30rpx 20rpx;
		// height: 100vh;

		.box {
			background: #fff;
			margin: 0 20rpx 20rpx 0;
			border-radius: 11rpx;
			padding: 10rpx 20rpx;

			.moren {
				color: #A4D091;
			}

			.un {

				color: #A5A7A7;

				.circle {
					width: 29rpx;
					height: 29rpx;
					border: 1px solid #D8DCDB;
					border-radius: 50%;
					margin-right: 11rpx;
				}
			}

			.un,
			.moren {
				display: flex;
				font-size: 25rpx;
			}

		}

		.button {
			//width: 663rpx;
			height: 91rpx;
			background: #A4D091;
			border-radius: 45rpx;
			font-size: 36rpx;
			color: #FFFFFF;
			line-height: 91rpx;
			text-align: center;
			margin: 400rpx 30rpx 0 30rpx;
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

		/deep/.u-textarea {
			background-color: #fff;
			padding: 0;
		}
	}
</style>