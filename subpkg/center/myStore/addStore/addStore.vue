<template>
	<view class="addStore">
		<u--form :labelStyle='labelStyle' labelPosition="left" :model="userInfo" ref="form1" labelWidth='200rpx'>
			<div class="box">
				<u-form-item label="门店类型" prop="storeType" borderBottom ref="item1">
					<picker @change="bindPickerChange" range-key='typeName' :value="index" :range="storeTypeList">
						<view v-if='index!=undefined'>{{storeTypeList[index].typeName}}</view>
						<view v-else style="color: rgb(192, 196, 204);">请选择门店类型</view>
					</picker>
					<u-icon slot="right" name="arrow-right" style="margin-right: 20rpx;"></u-icon>
				</u-form-item>
				<u-form-item label="门店名称" prop="storeName" borderBottom ref="item1">
					<u--input v-model="userInfo.storeName" border="none" placeholder="请输入门店名称"></u--input>
				</u-form-item>
			</div>

			<div class="box" style="padding: 29rpx;">
				<view style="margin-bottom:28rpx ;">
					门头图
				</view>
				<view class="imags">
					<uploadFile :fileListt="fileList" @getUrl='getUrl' :limit='1' types='image' />
				</view>
			</div>

			<view style="color: #A5A7A7;margin-left:50rpx;">
				联系信息
			</view>
			<view class="box">
				<u-form-item label="店长姓名" prop="contacts" borderBottom ref="item1">
					<u--input v-model="userInfo.contacts" border="none" placeholder="请输入店长姓名"></u--input>
				</u-form-item>
				<u-form-item label="联系电话" prop="contactPhone" borderBottom ref="item1">
					<u--input v-model="userInfo.contactPhone" border="none" placeholder="请输入联系电话"></u--input>
				</u-form-item>
			</view>

			<view class="box">
				<u-form-item label="门店地址" prop="contacts" borderBottom ref="item1">
					<view  style="color: rgb(192, 196, 204);">设置门店服务地址</view>
					<u-icon slot="right" name="arrow-right" style="margin-right: 20rpx;"></u-icon>
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
	import {
		getStoreType,
	} from '@/api/login.js'
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
				userInfo: {
					clientId: storage.get('ClientId'),
					region: undefined
				},
				storeTypeList: [], //店铺类型
				fileList: [],
				isSingle: undefined, //是否是单门店
			};
		},
		onLoad() {
			this.getList()

		},

		methods: {

			getList() {
				getStoreType().then(res => {
					this.storeTypeList = res.data
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
					const apps = getApp()
					apps.type = 'login'
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
		background: #F5F9FA;
	}
</style>
<style lang="scss" scoped>
	.addStore {


		::v-deep.u-form-item__body {
			height: 70rpx;
		}

		.box {
			margin: 20rpx;
			background: #FFFFFF;
			border-radius: 14rpx;

			.img_title {}
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
			margin: 19rpx auto 0 auto;
		}
	}
</style>