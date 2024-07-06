<template>
	<view class="addStore">
		<u--form :labelStyle='labelStyle' labelPosition="left" :model="userInfo" ref="uForm" labelWidth='200rpx'>
			<div class="box">
				<u-form-item label="门店类型" prop="userInfo.storeTypeId" borderBottom ref="item1">

					<u--input v-if="type=='edit'" v-model="storeTypeList[index].typeName" border="none"
						disabled></u--input>
					<picker v-else @change="bindPickerChange" range-key='typeName' :value="index"
						:range="storeTypeList">
						<view style="display: flex;justify-content: space-between;align-items: center;height: 70rpx;">
							<view class="">
								<view v-if='index!=undefined'>{{storeTypeList[index].typeName}}</view>
								<view v-else style="color: rgb(192, 196, 204);">请选择门店类型</view>
							</view>
							<u-icon slot="right" name="arrow-right" style="margin-right: 20rpx;"></u-icon>
						</view>
					</picker>



				</u-form-item>
				<u-form-item label="门店名称" prop="userInfo.storeName" borderBottom ref="item1">
					<u--input  :disabled="disabled" v-model="userInfo.storeName" border="none" :placeholder="!disabled?'请输入门店名称':''"></u--input>
				</u-form-item>
			</div>

			<div class="box" style="padding: 29rpx;">
				<view style="margin-bottom:28rpx ;">
					门头图
				</view>
				<view style="display: flex;">
					<uploadFile :isInfo="disabled" :isDel="!disabled" width="147rpx" height="147rpx" :fileListt='fileListt'
						@getUrl='getUrl' :limit='1' types='image' />
					<image v-if="fileListt.length==0"
						src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/06/b53d7b90ea1841afa78c9a959791766a.png"
						style="width: 147rpx;height: 147rpx;margin-left:17rpx;"></image>
				</view>
			</div>

			<view style="color: #A5A7A7;margin-left:50rpx;">
				联系信息
			</view>
			<view class="box">
				<u-form-item label="店长姓名" prop="userInfo.contacts" borderBottom ref="item1">
					<u--input :disabled="disabled" v-model="userInfo.contacts" border="none" :placeholder="!disabled?'请输入门店负责人姓名':''" ></u--input>
				</u-form-item>
				<u-form-item label="联系电话" prop="userInfo.contactPhone" borderBottom ref="item1">
					<u--input :disabled="disabled" v-model="userInfo.contactPhone" border="none" :placeholder="!disabled?'请输入负责人联系电话':''" ></u--input>
				</u-form-item>
			</view>

			<view class="box">
				<u-form-item @click='goChoseAddress' label="门店地址" prop="contacts" borderBottom ref="item1">
					<view style="color: rgb(192, 196, 204);">设置门店服务地址</view>
					<u-icon slot="right" name="arrow-right" style="margin-right: 20rpx;"></u-icon>
				</u-form-item>
				<view v-if="JSON.stringify(addressInfo)!='{}'" class="box">
					<view style="padding: 20rpx">
						<view class="top">
							<view class="">
								<text class="font" style="font-weight: bold;">{{addressInfo.contact}}</text>
								<text class="font" style="margin:0 14rpx;">{{addressInfo.phone}}</text>
								<text v-if="addressInfo.isDefault&&addressInfo.isDefault==0"
									class="moren_sign">默认</text>
							</view>
							<view class="circle"></view>
						</view>
						<view style="font-size: 25rpx;color: #A5A7A7;margin: 22rpx 0;">
							{{addressInfo.addressRegion.replace(/\//g, '')}}
						</view>
						<view style="font-size: 25rpx;color: #A5A7A7;display: flex;justify-content: space-between;">
							<view style="width: 88%;">
								{{addressInfo.addressDetailed}}
							</view>

						</view>
					</view>
				</view>
			</view>

		</u--form>


		<view class="button" @click="addHandle">
			保存编辑
		</view>
	</view>
</template>

<script>
	import storage from '@/utils/storage'
	import uploadFile from '@/components/uploadFile/uploadFile.vue'
	import {
		getStoreType,
	} from '@/api/login.js'
	import {
		addCustomer,
		editServiceAddress
	} from '@/api/store.js'
	export default {
		components: {
			uploadFile
		},
		data() {
			return {
				index: undefined,
				labelStyle: {
					'font-size': '31rpx',
					'color': '#000000',
					'margin-left': '30rpx'
				},
				// model1: {

				// },
				userInfo: {
					clientId: storage.get('ClientId'),
					region: undefined,
					contacts: '',

				},
				rules: {
					'userInfo.storeName': {
						type: 'string',
						required: true,
						message: '请填写门店名称',
						trigger: ['blur', 'change']
					},
					'userInfo.contacts': {
						type: 'string',
						required: true,
						message: '请填写店长姓名',
						trigger: ['blur', 'change']
					},
					'userInfo.contactPhone': {
						type: 'string',
						required: true,
						message: '请填写联系电话',
						trigger: ['blur', 'change']
					},
				},
				storeTypeList: [], //店铺类型
				fileListt: [],
				isSingle: undefined, //是否是单门店
				addressInfo: {},
				type: '',
				disabled:false
			};
		},
		onLoad(option) {

			let info = JSON.parse(decodeURIComponent(option.info))
			this.type = info.type
			uni.setNavigationBarTitle({
				title: this.type!= 'edit'?'创建门店':'修改门店地址'
			})
			console.log(this.type);
			if (this.type == 'edit') {
				this.disabled=true
				this.userInfo = info.storeInfo
				this.addressInfo = info.storeInfo.serviceAddress
				this.fileListt = this.userInfo.storeImg ? this.userInfo.storeImg.split(',') : []


			}

			this.getList()
		},
		onReady() {
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			// this.$refs.uForm.setRules(this.rules)
		},
		methods: {
			//获取选择的地址
			getInfo(info) {
				this.addressInfo = info
			},
			getList() {
				getStoreType().then(res => {
					this.storeTypeList = res.data
					if (this.type == 'edit' && this.userInfo.storeTypeId) {
						this.storeTypeList.forEach((item, index1) => {
							console.log(item.typeId, '16222222', this.userInfo.storeTypeId);
							if (item.typeId == this.userInfo.storeTypeId) {
								this.index = index1
								console.log(this.index, '16444444');
							}
						})
					}
					console.log(this.storeTypeList, '11111111');
				})
			},
			bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.index = e.detail.value
				this.userInfo.storeType = this.storeTypeList[this.index].typeName
				this.userInfo.storeTypeId = this.storeTypeList[this.index].typeId
			},
			getUrl(url) {
				console.log(url);
				this.fileListt = url.urls
				this.userInfo.storeImg = url.urls[0]
			},
			reset() {
				this.index = undefined
				this.userInfo = {
					region: undefined
				}
				this.fileList = []
			},
			addHandle() {

				if (this.type == 'edit') {
					editServiceAddress({
						serviceAddressId: this.addressInfo.id,
						customerStoreId: this.userInfo.customerId
					}).then(res => {
						console.log(res);
						this.reset()
						if (res.code === 200) {
							uni.showToast({
								title: '添加成功',
								duration: 800
							});
							setTimeout(function() {
								uni.navigateBack()
							}, 800)
						}

					})
				} else {
					console.log(this.userInfo);
					// this.$refs.uForm.validate().then(res => {

					// }).catch(errors => {
					// 	uni.$u.toast('校验失败')
					// })
					this.userInfo.serviceAddressId = this.addressInfo.id
					addCustomer(this.userInfo).then(res => {
						console.log(res);
						this.reset()
						if (res.code === 200) {
							uni.showToast({
								title: '添加成功',
								duration: 800
							});
							setTimeout(function() {
								uni.navigateBack()
							}, 800)
						}

					})

				}

			},
			goChoseAddress() {
				let info = {
					addressInfo: this.addressInfo,
					type: 'store'
				}
				uni.navigateTo({
					url: "/subpkg/car/myAddress/myAddress?params=" + encodeURIComponent(JSON.stringify(info))
				})
			}
		}
	}
</script>


<style>
	page {
		background: #F5F9FA;
	}
</style>
<style lang="scss" scoped>
	.addStore {


		::v-deep.u-form-item__body {
			height: 70rpx;
		}

		::v-deep.u-input {
			background-color: #fff !important;
		}

		.box {
			margin: 20rpx;
			background: #FFFFFF;
			border-radius: 14rpx;


			/deep/.u-form-item__body__right__content {
				width: 94%;
			}
		}

		.button {
			width: 663rpx;
			height: 91rpx;
			background: #A4D091;
			border-radius: 45rpx;
			font-size: 36rpx;
			color: #FFFFFF;
			line-height: 91rpx;
			text-align: center;
			margin: 0 auto;
			position: fixed;
			left: 6%;
			bottom: 100rpx;
		}
	}
</style>