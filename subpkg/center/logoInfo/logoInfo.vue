<template>
	<view>
		<u-navbar @leftClick='leftClick' title="门店头像" :titleStyle="{'color':'#fff'}" bgColor="#333"
			leftIconColor='#fff'>
			<view class="u-nav-slot" slot="right" @click="billChooseImage">
				<view :style="{'width': '29rpx','margin-right':menuButtonInfoWidth+'rpx','padding-top':'5rpx'}">
					<u-icon name="more-dot-fill" color="#fff"></u-icon>
				</view>

			</view>
		</u-navbar>
		<image style="width: 100%;padding-top: 400rpx;" :src="userInfo.avatarUrl" mode="widthFix"></image>
	</view>
</template>

<script>
	import storage from '@/utils/storage'
	const {
		environment
	} = require('../../../config/environment')
	export default {
		data() {
			return {
				urls: '',
				menuButtonInfoWidth: 0,
				userInfo: {}
			};
		},
		onReady() {
			//获取小程序胶囊位置
			// #ifdef MP-WEIXIN
			this.menuButtonInfoWidth = uni.getMenuButtonBoundingClientRect().width + 80
			// #endif

		},
		onLoad(option) {
			this.userInfo = JSON.parse(option.item)
			console.log(JSON.parse(option.item));
		},
		methods: {
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
									this.userInfo.avatarUrl = data.data.url
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
				let prevPage = pages[len-2]; //上一个页面
				console.log(pages,'pages.........');
				//重点$vm
				uni.navigateBack({
					success:()=>{
						console.log(prevPage,'./..........',this.userInfo);
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
