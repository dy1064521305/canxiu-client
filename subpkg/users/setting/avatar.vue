<template>
	<common-page>
		<view class="page">
			<view class="avatar-box" @click="uploadAvatar">
				<image v-if="avatar" class="avatar" :src="avatar" mode="aspectFill"></image>
				<image v-else class="avatar"
					src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/08/09/6a266da84dbb4e9f8a4148ded10e2c3a.png"
					mode="aspectFill"></image>
				<text class="iconfont icon-xiangji"></text>
				<image class="xiangji" src="https://img.reduxingke.com/2022/12/09/c82c3202212091544534968.png">
				</image>
				<!-- #ifdef MP-WEIXIN -->
				<button class="mask" open-type="chooseAvatar" @chooseavatar="onChooseAvatar"
					@click.stop="onChooseAvatar()"></button>
				<!-- #endif -->
			</view>
			<!-- <view class="text-c color-gray font-small">点击修改头像</view> -->
			<form @submit="submit" class="form">
				<view class="row">
					<input class="text-c font-x-large" type="nickname" name="nickname" placeholder="请输入昵称"
						placeholder-class="placeholder-cls" v-model="nickname">
				</view>
				<view class="btns">
					<button class="form-btn" type="primary" form-type="submit">保存</button>
					<!-- <view class="tip">
					<text @click="toIndex">暂不操作，跳过</text>
				</view> -->
				</view>
			</form>
		</view>
	</common-page>
</template>

<script>
	import $cache from '@/utils/cache.js';
	// import {
	// 	mapState
	// } from 'vuex';
	// import {
	// 	uploadImageHandler,
	// 	checkPrivacy
	// } from '@/utils/index.js'
	// import {
	// 	userEdit
	// } from '@/api/user.js'
	// // #ifdef APP-PLUS
	// import {
	// 	requestPermissions
	// } from "@/libs/permission.js"
	// #endif
	export default {
		data() {
			return {
				avatar: '',
				nickname: '',
				toedit: "",
			}
		},
		// computed: mapState(['userInfo']),
		onReady() {
			// this.avatar = this.userInfo.avatar;
			// this.nickname = this.userInfo.nickname;
		},
		onLoad(options) {
			if (options && options.avatar) {
				this.toedit = options.avatar
			}
		},
		methods: {
			async uploadAvatar() {
				// #ifdef APP-PLUS
				let has = await requestPermissions('chooseImage');
				if (has != 1) return;
				// #endif
				uni.chooseImage({
					success: (res) => {
						const img = res.tempFilePaths[0];
						uploadImageHandler(img, (res) => {
							this.avatar = res.data.url;
						})
					}
				});
			},
			async onChooseAvatar(e) {
				if (!await checkPrivacy(1)) return;
				if (!e) return;
				const img = e.detail.avatarUrl;
				uploadImageHandler(img, (res) => {
					this.avatar = res.data.url;
				})
			},
			submit(e) {
				if (!this.avatar) {
					return this.$toast('请先设置头像');
				}
				let {
					nickname
				} = e.detail.value;
				if (!nickname) {
					uni.hideLoading();
					return this.$toast('请先输入昵称');
				}
				uni.showLoading({
					title: '加载中...'
				})
				// userEdit({
				// 	avatar: this.avatar,
				// 	nickname: nickname
				// }).then(res => {
				// 	uni.hideLoading();
				// 	console.log(this.toedit, "back_url11111");
				// 	if (this.toedit == 1) {
				// 		this.$toast('保存成功！', 'success').then(() => {
				// 			this.$jump(-1);
				// 		});
				// 	} else {
				// 		let back_url = $cache.get('authBackUrl') || '/pages/user/index';
				// 		console.log(back_url, "back_url");
				// 		this.$toast('保存成功！', 'success').then(() => {
				// 			$cache.clear('authBackUrl');
				// 			this.$jump('redirectTo:/' + back_url);
				// 		});
				// 	}

				// }).catch(err => {
				// 	uni.hideLoading();
				// 	this.$alert(err);
				// })
			}
		}

	}
</script>

<style lang="scss" scoped>
	.page {
		min-height: 100vh;
		padding-top: 150rpx;
		background: url('https://static1.reduxingxuan.com/2022/06/18/b6dca202206181421082657.png') no-repeat #fff;
		background-size: 100% auto;
		box-sizing: border-box;
	}

	.avatar-box {
		display: block;
		width: 180rpx;
		height: 180rpx;
		margin: 0 auto 12rpx;
		position: relative;

		.avatar {
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}

		.xiangji {
			width: 66rpx;
			height: 66rpx;
			position: absolute;
			right: -4rpx;
			bottom: -4rpx;
		}

		.mask {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			opacity: 0;
		}
	}

	.row {
		margin: 80rpx 40rpx;
		padding: 20rpx;
		border-bottom: 2rpx solid #E8E8E8;
	}

	.info {
		padding: 0 40rpx;
		text-align: center;

		.name {
			font-size: 40rpx;
		}

		.phone {
			margin-top: 12rpx;
		}
	}

	.btns {
		margin-top: 120rpx;
	}

	.form-btn {
		font-size: 36rpx;
		margin: 30rpx 120rpx 0;
		border-radius: 44rpx;
		background-color: #FF7700;

		.icon {
			width: 60rpx;
			height: 60rpx;
			margin-right: 12rpx;
		}

	}

	.tip {
		font-size: 28rpx;
		text-align: center;
		color: $uni-text-color-grey;
		margin-top: 160rpx;
	}

	.popTop {
		position: fixed;
		top: 0rpx;
		left: 0;
	}

	.permissions_box {
		padding: 20rpx 40rpx 30rpx;
		background: #fff;
		border-radius: 0 0 20rpx 20rpx;
	}
</style>