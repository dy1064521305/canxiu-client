<template>
	<view>
		<u-navbar placeholder :leftText="type=='edit'?'确定':''" @leftClick='leftClick' title="门店头像"
			:titleStyle="{'color':'#fff'}" bgColor="#333" leftIconColor='#fff'>
			<view class="u-nav-slot" slot="right" @click="editLogo">
				<yk-authpup ref="authpupStorage" type="top" @changeAuth="changeAuthStorage"
					permissionID="WRITE_EXTERNAL_STORAGE"> </yk-authpup>
				<yk-authpup ref="authpupCamera" type="top" @changeAuth="changeAuthCamera" permissionID="CAMERA">
				</yk-authpup>
				<view v-if="type=='edit'"
					:style="{'width': '29rpx','margin-right':menuButtonInfoWidth+'rpx','padding-top':'5rpx'}">
					<u-icon name="more-dot-fill" color="#fff"></u-icon>
				</view>

			</view>
		</u-navbar>
		<view style="height: 86vh;display: flex;align-items: center;">
			<image v-if="userInfo.storeImg!=null&&userInfo.storeImg!=''" style="width: 100%;" :src="userInfo.storeImg"
				mode="widthFix"></image>
			<image v-else style="width: 100%;height: 700rpx;"
				src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/23/5595ab7226854043abab1449a9067a94.png">
			</image>
		</view>

	</view>
</template>

<script>
	import ykAuthpup from "@/components/yk-authpup/yk-authpup";
	import storage from '@/utils/storage'
	const {
		environment
	} = require('../../../config/environment')
	export default {
		components: {
			ykAuthpup
		},
		data() {
			return {
				urls: '',
				menuButtonInfoWidth: 30,
				userInfo: {},
				type: '',
				camera: false,
				storagee: false,
			};
		},
		onReady() {
			//获取小程序胶囊位置
			// #ifdef MP-WEIXIN
			this.menuButtonInfoWidth = uni.getMenuButtonBoundingClientRect().width + 80
			// #endif

		},
		onShow() {},
		onLoad(option) {
			this.userInfo = JSON.parse(option.item).userInfo
			this.type = JSON.parse(option.item).type
			console.log(this.type);
		},
		methods: {
			changeAuthCamera() {
				this.camera = true
				if (this.camera && this.storagee) {
					this.billChooseImage()
				}
			},

			changeAuthStorage() {
				this.storagee = true
				if (this.camera && this.storagee) {
					this.billChooseImage()
				}
			},
			editLogo() {
				this.$refs['authpupCamera'].open()
				this.$refs['authpupStorage'].open()
			},
			billChooseImage() {
				let that = this
				uni.chooseImage({
					// sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
					// sourceType: ['album'], //从相册选择
					success: res => {
						console.log(res);
						uni.showLoading({
							title: '上传中'
						});
						const path = res.tempFiles[0].path;
						uni.uploadFile({
							url: environment.baseURL + '/system/oss/upload',
							filePath: path,
							name: 'file',
							header: {
								Authorization: "Bearer " + storage.get('AccessToken')
							},
							success: res => {
								let data = JSON.parse(res.data);
								if (data.code == 200) {
									console.log(data);
									this.userInfo.storeImg = data.data.url
									uni.hideLoading();
								}
							}
						});
					}

				});
			},
			leftClick() {
				const pages = uni.$u.pages();
				const len = pages.length
				let prevPage = pages[len - 2]; //上一个页面
				console.log(pages, 'pages.........');
				//重点$vm
				uni.navigateBack({
					success: () => {
						console.log(prevPage, './..........', this.userInfo);
						prevPage.$vm.otherFun(this.userInfo);
					}
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #333;
	}
</style>
<style lang="scss">

</style>