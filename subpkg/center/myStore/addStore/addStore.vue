<template>
	<view class="addStore">
		<u--form :labelStyle='labelStyle' labelPosition="left" :model="userInfo" ref="form1" labelWidth='200rpx'>
			<div class="box">
				<u-form-item label="门店类型" prop="storeType" borderBottom ref="item1">

					<picker @change="bindPickerChange" range-key='typeName' :value="index" :range="storeTypeList">
						<view style="display: flex;justify-content: space-between;align-items: center;height: 70rpx;">
							<view class="">
								<view v-if='index!=undefined'>{{storeTypeList[index].typeName}}</view>
								<view v-else style="color: rgb(192, 196, 204);">请选择门店类型</view>
							</view>
							<u-icon slot="right" name="arrow-right" style="margin-right: 20rpx;"></u-icon>
						</view>
					</picker>



				</u-form-item>
				<u-form-item label="门店名称" prop="storeName" borderBottom ref="item1">
					<u--input v-model="userInfo.storeName" border="none" placeholder="请输入门店名称"></u--input>
				</u-form-item>
			</div>

			<div class="box" style="padding: 29rpx;">
				<view style="margin-bottom:28rpx ;">
					门头图
				</view>
				<view style="display: flex;">
					<uploadFile width="147rpx" height="147rpx" :fileListt='fileListt' @getUrl='getUrl' :limit='1'
						types='image' />
					<image v-if="fileListt.length==0" src="../../../../static/logo.png"
						style="width: 137rpx;height: 137rpx;margin-left:17rpx;"></image>
				</view>
			</div>

			<view style="color: #A5A7A7;margin-left:50rpx;">
				联系信息
			</view>
			<view class="box">
				<u-form-item label="店长姓名" prop="contacts" borderBottom ref="item1">
					<u--input v-model="userInfo.contacts" border="none" placeholder="请输入门店负责人姓名"></u--input>
				</u-form-item>
				<u-form-item label="联系电话" prop="contactPhone" borderBottom ref="item1">
					<u--input v-model="userInfo.contactPhone" border="none" placeholder="请输入负责人联系电话"></u--input>
				</u-form-item>
			</view>

			<view class="box">
				<u-form-item @click='$jump("/subpkg/car/myAddress/myAddress?params="+encodeURIComponent(JSON.stringify(info)))' label="门店地址" prop="contacts" borderBottom ref="item1">
					<view style="color: rgb(192, 196, 204);">设置门店服务地址</view>
					<u-icon slot="right" name="arrow-right" style="margin-right: 20rpx;"></u-icon>
				</u-form-item>
				<view class="">
					
				</view>
			</view>

		</u--form>


		<view class="button" @click="goHome">
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
	export default {
		components: {
			uploadFile
		},
		data() {
			return {
				info:{
					type:'address'
				},
				index: undefined,
				labelStyle: {
					'font-size': '31rpx',
					'color': '#000000',
					'margin-left': '30rpx'
				},
				userInfo: {
					clientId: storage.get('ClientId'),
					region: undefined,
				},
				storeTypeList: [], //店铺类型
				fileListt: [],
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