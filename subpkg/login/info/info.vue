<template>
	<view class="info">
		<u--form :labelStyle='labelStyle' labelPosition="left" :model="userInfo" :rules="rules" ref="form1"
			labelWidth='200rpx'>
			<u-form-item label="店铺类型" prop="storeType" borderBottom ref="item1">
				<picker @change="bindPickerChange" range-key='typeName' :value="index" :range="storeTypeList">
					<view v-if='index!=undefined'>{{storeTypeList[index].typeName}}</view>
					<view v-else style="color: rgb(192, 196, 204);">请选择店铺类型</view>
				</picker>
			</u-form-item>


			<u-form-item label="门店名称" prop="storeName" borderBottom ref="item1">
				<u--input v-model="userInfo.storeName" border="none" placeholder="请输入门店名称"></u--input>
			</u-form-item>
			<view style="display: flex;">
				<text style="color: red;margin: auto 0;">*</text>
				<view style="margin-left: -16rpx;width: 100%;">
					<u-form-item  label="门店地址" borderBottom
						ref="item1" prop="region">
						<pickers @address="address">
							<view v-if="userInfo.region!=undefined">{{userInfo.region}}</view>
							<view v-else style="color: rgb(192, 196, 204);">请选择门店地址</view>
						</pickers>
					</u-form-item>
				</view>

			</view>

			<u-form-item label="详细地址" prop="detailAddress" borderBottom ref="item1">
				<u--input v-model="userInfo.detailAddress" border="none" placeholder="请输入详细地址"></u--input>
			</u-form-item>
			<u-form-item label="邀请码" prop="beInvitedCode" borderBottom ref="item1">
				<u--input v-model="userInfo.beInvitedCode" border="none" placeholder="请输入邀请码"></u--input>
			</u-form-item>
			<u-form-item label="门头图" ref="item1">
				<view class="imags">
					<uploadFile :fileListt="fileList" @getUrl='getUrl' :limit='1' types='image' />
				</view>

			</u-form-item>
			<view v-if="isSingle">
				<u-form-item label="联系人" prop="contacts" borderBottom ref="item1">
					<u--input v-model="userInfo.contacts" border="none" placeholder="请输入联系人"></u--input>
				</u-form-item>
				<u-form-item label="电话" prop="contactPhone" borderBottom ref="item1">
					<u--input v-model="userInfo.contactPhone" border="none" placeholder="请输入电话"></u--input>
				</u-form-item>
			</view>
		</u--form>


		<view class="button" @click="goHome">
			进入餐修
		</view>
	</view>
</template>

<script>
	import storage from '@/utils/storage'
	import uploadFile from '@/components/uploadFile/uploadFile.vue'
	import pickers from "@/components/ming-picker/ming-picker.vue"
	import {
		getInfoById,
	} from '@/api/user.js'
	import {
		refine,
		getStoreType,
		isSingle
	} from '@/api/login.js'
	export default {
		components: {
			pickers,
			uploadFile
		},
		data() {
			return {
				index: undefined,
				labelStyle: {
					'font-size': '31rpx',
					'color': '#3D3F3E',
					'font-weight': 'bold',
					'margin-left': '30rpx'
				},
				userInfo: {
					clientId: storage.get('ClientId'),
					region: undefined
				},
				storeTypeList: [], //店铺类型
				fileList: [],
				isSingle: undefined, //是否是单门店
			};
		},
		onLoad(option) {
			this.getList()
			console.log(option.id);

			getInfoById(option.id).then(res => {
				console.log(res);
				this.userInfo = res.data
				if (this.userInfo.storeTypeId != null) {
					console.log(this.storeTypeList);
					this.storeTypeList.forEach((item, index1) => {
						if (item.typeId == this.userInfo.storeTypeId) {
							this.index = index1
							console.log(this.index);
						}
					})
				}

				let arr = res.data.storeImg != null && res.data.storeImg != '' ? res.data.storeImg.split(',') : []
				this.fileList = arr
				console.log(this.fileList);
			})

		},
		watch: {

		},
		methods: {

			getList() {
				getStoreType().then(res => {
					this.storeTypeList = res.data
					console.log(this.storeTypeList, '11111111');
				})
				//判断是否是单门店
				isSingle(storage.get('ClientId')).then(res => {
					console.log(res);
					this.isSingle = res.data.flag == 'true'
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
				this.userInfo.storeImg = url.urls[0]
			},
			reset() {
				this.index = undefined
				this.userInfo = {
					region: undefined
				}
				this.fileList = []
			},
			goHome() {
			
				
				
				console.log(this.userInfo);
				if (!this.userInfo.region || this.userInfo.region == '') {
					uni.$u.toast('请选择门店地址')
					return
				}

				refine(this.userInfo).then(res => {
					console.log(res);

					// uni.$TUIKit.updateMyProfile({
					// 	nick: this.userInfo.clientName,
					// 	avatar: this.userInfo.avatarUrl,
					// 	selfSignature: ''
					// }).then(res => {
					// 	console.info(res);
					// 	console.info(res);
					// 	console.info(res);
					// })

					this.reset()
					// const apps = getApp()
					// apps.type = 'login'
					uni.switchTab({
						url: '/pages/home/index'
					})

				})

			},
			address(e) {
				console.log(e) //携带的参数
				this.userInfo.region = e.value1.toString().replace(/,/g, "/")
				console.log(this.userInfo.region);
			},
		}
	}
</script>

<style>
	page {
		background: #fff;
	}
</style>
<style lang="scss" scoped>
	.info {
		height: 100vh;

		::v-deep.u-form-item__body {
			height: 70rpx;
		}

		.imags {
			/* #ifdef APP-PLUS */
			// margin-top: 40rpx;
			/* #endif */

		}

		.button {
			width: 663rpx;
			height: 91rpx;
			color: #fff;
			line-height: 91rpx;
			text-align: center;
			border-radius: 70rpx;
			margin: 438rpx auto 0;
			background: #A4D091;
		}
	}
</style>