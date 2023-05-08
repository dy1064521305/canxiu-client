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


			<u-form-item label="门店名称" prop="clientName" borderBottom ref="item1">
				<u--input v-model="userInfo.clientName" border="none" placeholder="请输入门店名称"></u--input>
			</u-form-item>
			<u-form-item label="门店地址" borderBottom ref="item1">
				<pickers @address="address">
					<view v-if="userInfo.region!=undefined">{{userInfo.region}}</view>
					<view v-else style="color: rgb(192, 196, 204);">请选择门店地址</view>
				</pickers>
			</u-form-item>
			<u-form-item label="详细地址" prop="detailAddress" borderBottom ref="item1">
				<u--input v-model="userInfo.detailAddress" border="none" placeholder="请输入详细地址"></u--input>
			</u-form-item>
			<u-form-item label="邀请码" prop="beInvitedCode" borderBottom ref="item1">
				<u--input v-model="userInfo.beInvitedCode" border="none" placeholder="请输入邀请码"></u--input>
			</u-form-item>
			<u-form-item label="门头图" ref="item1">

				<uploadFile :fileListt="fileList" @getUrl='getUrl' :limit='1' types='image'/>
			</u-form-item>

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
		getStoreType
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
				rules: {},
				storeTypeList: [], //店铺类型
				fileList: [],
			};
		},
		onLoad(option) {
			this.getList()
			console.log(option.id);
			getInfoById(option.id).then(res => {
				console.log(res);
				this.userInfo = res.data
				if(this.userInfo.storeTypeId!=null){
					console.log(this.storeTypeList);
					this.storeTypeList.forEach((item,index1)=>{
						if(item.typeId==this.userInfo.storeTypeId){
							this.index=index1
							console.log(this.index);
						}
					})
				}
				
				let arr = res.data.avatarUrl!=null?res.data.avatarUrl.split(','):[]
				this.fileList=arr
				console.log(this.fileList);
			})
			
		},
		watch: {

		},
		methods: {

			getList() {
				getStoreType().then(res => {
					this.storeTypeList = res.data
					console.log(this.storeTypeList ,'11111111');
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
				this.userInfo.avatarUrl = url.urls[0]
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

				refine(this.userInfo).then(res => {
					console.log(res);
					this.reset()
					uni.switchTab({
						url: '/pages/home/index'
					})

				})

			},
			address(e) {
				console.log(e) //携带的参数
				this.userInfo.region = e.value.toString().replace(/,/g, "/")
				console.log(this.userInfo.region);
			},
		}
	}
</script>

<style>
	page{
			background: #fff;
	}
</style>
<style lang="scss" scoped>
	.info {
		::v-deep.u-form-item__body {
			height: 70rpx;
		}
	
		.button {
			width: 663rpx;
			height: 91rpx;
			background: #9FD6BA;
			border-radius: 45rpx;
			font-size: 36rpx;
			color: #FFFFFF;
			line-height: 91rpx;
			text-align: center;
			margin: 200rpx auto;
			// position: absolute;
			// bottom: 300rpx;
			// left: 43rpx;
		}
	}
</style>
