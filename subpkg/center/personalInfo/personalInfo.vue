<template>
	<view class="info">
		<u--form :labelStyle='labelStyle' labelPosition="left" :model="userInfo" :rules="rules" ref="form1"
			labelWidth='200rpx'>


			<u-form-item label="门店头像" ref="item1" style='height: 120rpx;'>
				<view style="display: flex;align-items: center;width: 100%;" @click="goLogoInfo">
					<view style="width: 89%;">
						<u-avatar :src="userInfo.avatarUrl" size="50"></u-avatar>

					</view>
					<view class="">
						<image style="width:14rpx;height: 25rpx;"
							src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/0e15ed9e53ec47569b535aaffb6b0d7b.png">
						</image>
					</view>
				</view>
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

		</u--form>


		<view class="button" @click="edit">
			确认修改
		</view>
	</view>
</template>

<script>
	import storage from '@/utils/storage'
	import uploadFile from '@/components/uploadFile/uploadFile.vue'
	import pickers from "@/components/ming-picker/ming-picker.vue"
	import {
		editUser
	} from '@/api/user.js'
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
				userInfo: {},
				rules: {},
				fileList: []
			};
		},
		onLoad(option) {
			console.log(JSON.parse(option.item));
			this.userInfo = JSON.parse(option.item)
			console.log(this.userInfo);
			this.$set(this.userInfo, 'avatarUrl', this.userInfo.avatarUrl)
		},
		
		methods: {
		   otherFun(object){
			   console.log(object,'!!!!!!!!!!!!');
		                if(!!object){
		                    console.log('object=========',object)
							this.userInfo=object
		                }
		            },
			reset() {
				this.index = undefined
				this.userInfo = {
					region: undefined
				}
				this.fileList = []
			},
			edit() {
				console.log(this.userInfo);
				editUser(this.userInfo).then(res => {
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
			},
			address(e) {
				console.log(e) //携带的参数
				this.userInfo.region = e.value.toString().replace(/,/g, "/")
				console.log(this.userInfo.region);
			},
			//查看头像信息
			goLogoInfo() {
				console.log(this.userInfo);
				uni.navigateTo({
					url: '../../../subpkg/center/logoInfo/logoInfo?item=' + JSON.stringify(this.userInfo)
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
			position: absolute;
			bottom: 200rpx;
			left: 43rpx;
		}



	}
</style>
