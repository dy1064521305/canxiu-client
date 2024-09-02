<template>
	<view class="page" :style="{height: clientHeight+'px'}">
		<view class="content">
			<div class="title">账户信息</div>
			<view class="cell">
				<view class="item">
					<view class="label">头像</view>
					<view class="value acea-row row-middle" @click="uploadAvatar">
						<image v-if="avatar&&avatar!= 'null'" class="avatar" :src="avatar" mode="aspectFill"></image>
						<image v-else
							src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/08/09/6a266da84dbb4e9f8a4148ded10e2c3a.png"
							mode="aspectFill">
						</image>

						<text class="iconfont icon" style="margin:0 -14rpx -4rpx -12rpx;">&#xe604;</text>
						<!-- #ifdef MP-WEIXIN -->
						<button class="mask" open-type="chooseAvatar" @chooseavatar="onChooseAvatar"
							@click.stop="onChooseAvatar()"></button>
						<!-- #endif -->
					</view>
				</view>
				<view class="item">
					<view class="label">账号呢称</view>
					<view class="value">
						<form @submit="submit" class="form">
							<view class="acea-row">
								<input class="text-c" style="text-align: right;" type="nickname" name="nickname"
									placeholder="请输入昵称" placeholder-class="font-normal " v-model="nickname">
								<text class="iconfont icon" style="margin:0 -14rpx 0 -12rpx;">&#xe604;</text>
							</view>
							<!-- #ifdef MP-WEIXIN -->
							<view class=" btns">
								<button class="view" type="primary" form-type="submit">保存编辑</button>
							</view>
							<!-- #endif -->

						</form>
					</view>
				</view>
				<!-- <view class="item">
					<view class="label">绑定手机号</view>
					<view class="value">
						<text class="text">名字</text><text class="iconfont icon"
							style="margin:0 -14rpx 0 -12rpx;">&#xe604;</text>
					</view>
				</view> -->
			</view>
		</view>
		<!-- #ifndef MP-WEIXIN -->
		<view class="btn">
			<button class="view" @click="sureSet" type="primary" form-type="submit"> 保存编辑</button>
		</view>
		<!-- #endif -->

		<!-- <div class="title">合作签约信息</div>
		<view class="cell">
			<view class="item" v-for="item in messList" :key="item.id">
				<view class="label">
					{{item.label}}
				</view>
				<view class="value">
					<text class="text"> {{item.value}}</text>
					<text class="iconfont icon" style="margin:0 -14rpx 0 -12rpx;"
						@click="$jump('/subpkg/users/setting/region')" v-if="item.id==7">&#xe604;</text>
				</view>
			</view>

		</view> -->
	</view>
</template>

<script>
	// import {
	// 	mapState,
	// 	mapGetters
	// } from "vuex";
	import {
		uploadImageHandler,
	} from '@/utils/index.js'
	import {
		putEditInfo
	} from '@/api/user.js'
	// import {
	// 	HTTP_REQUEST_URL,
	// 	TOKENNAME
	// } from '@/config/app'
	// import {
	// 	updatePhone,
	// 	userEdit,
	// 	userUnsubscribe
	// } from '@/api/user.js'
	// // #ifdef APP-PLUS
	// import {
	// 	checkVersionUpdate
	// } from '@/libs/app.js'
	// // #endif
	// import $cache from '@/utils/cache.js'
	// import {
	// 	appBindWechat
	// } from '@/api/api.js'

	export default {
		data() {
			return {
				accountList: [{
						id: 1,
						label: "头像",
						value: "俞军",
					},
					{
						id: 2,
						label: "账号昵称",
						value: "俞军",
					},
					{
						id: 3,
						label: "绑定手机号",
						value: "",
					},
				],
				messList: [{
						id: 1,
						label: "真实姓名",
						value: "俞军",
					},
					{
						id: 2,
						label: "联系电话",
						value: "俞军",
					}, {
						id: 3,
						label: "类型",
						value: "俞军",
					}, {
						id: 4,
						label: "所在城市",
						value: "俞军",
					}, {
						id: 5,
						label: "上级邀请人",
						value: "俞军",
					}, {
						id: 6,
						label: "品牌销售业绩分红",
						value: "俞军",
					}, {
						id: 7,
						label: "关联区域",
						value: "俞军",
					}, {
						id: 8,
						label: "区域内订单分红",
						value: "俞军",
					},
				],
				clientHeight: "",
				avatar: "",
				nickname: '',

			}
		},
		computed: {},
		onLoad(options) {
			if (options && options.avatarUrl) {
				this.avatar = options.avatarUrl || ''
			}
			if (options && options.clientName) {
				this.nickname = (options.clientName && options.clientName != 'null') ? options.clientName : ''
			}
			this.getClineHeight()
		},
		methods: {
			//获取可视区域高度
			getClineHeight() {
				const res = uni.getSystemInfo({
					success: (res => {
						this.clientHeight = res.windowHeight;
						// this.clientHeight = res.windowHeight - uni.upx2px(80) - this.getBarHeight();
					})
				});
			},
			uploadAvatar() {
				uni.chooseImage({
					success: (res) => {
						console.log(res, "res");
						const img = res.tempFilePaths[0];
						uploadImageHandler(img, (res) => {
							console.log(res.data.url, "88");
							this.avatarEdit(res.data.url)
						})
					}
				});
			},
			onChooseAvatar(e) {
				if (!e) return;
				const img = e.detail.avatarUrl;
				uploadImageHandler(img, (res) => {
					this.avatar = res.data.url;
				})
			},
			sureSet() {
				if (!this.nickname) {
					return this.$toast('请先输入昵称');
				}
				putEditInfo({
					avatarUrl: this.avatar,
					clientName: this.nickname
				}).then(res => {
					this.$toast('保存成功！', 'success').then(() => {
						this.$jump(-1);
					});
				})
			},
			submit(e) {
				let {
					nickname
				} = e.detail.value;
				if (!nickname) {
					uni.hideLoading();
					return this.$toast('请先输入昵称');
				}
				this.nickname = nickname
				this.sureSet()
			},
			avatarEdit(url) {
				console.log('修改头像成功');
				this.avatar = url
				// this.$toast('修改头像成功!', 'success')
				// userEdit({
				// 	avatar: url
				// }).then(res => {
				// 	this.$toast('修改头像成功!', 'success')
				// 	this.$store.dispatch('USERINFO', 1);
				// }).catch(() => {
				// 	this.$alert(msg);
				// })
			},
			// 	goPwd() {
			// 		if (!this.userInfo.phone) {
			// 			this.$alert('未验证手机号', 1, {
			// 				content: '是否去验证手机号？',
			// 				cancelText: '否',
			// 				confirmText: '是',
			// 			}).then((res) => {
			// 				if (res.confirm) {
			// 					return this.$jump('/pages/auth/phone')
			// 				}
			// 			})
			// 		}
			// 		if (this.userInfo.id_status != 2) {
			// 			this.$alert('未实名认证', 1, {
			// 				content: '是否去实名认证？',
			// 				cancelText: '否',
			// 				confirmText: '是',
			// 			}).then((res) => {
			// 				if (res.confirm) {
			// 					return this.$jump('/pages/users/setting/realname')
			// 				}
			// 			})
			// 		} else {
			// 			return toPhoneVerify('pwd')
			// 		}
			// 	},
			// 	toWechatId() {
			// 		if (checkAuth(1, 4) != 200) return;
			// 		this.$jump('/pages/users/setting/update-weixinid')
			// 	},
			// 	toUpdatePhone() {
			// 		if (!this.userInfo.phone) {
			// 			return this.$jump('/pages/auth/phone')
			// 		}
			// 		return toPhoneVerify('update_phone')
			// 	},
			// 	logout() {
			// 		this.$alert("确认退出登录？", 1).then((res) => {
			// 			if (res.confirm) {
			// 				this.$store.commit("LOGOUT");
			// 				this.$jump(-1);
			// 			}
			// 		});
			// 	},
			// 	goAuth() {
			// 		if (!this.userInfo.phone) {
			// 			return this.$jump('/pages/auth/phone')
			// 		}
			// 		this.$jump('/pages/users/setting/realname')
			// 	},
			// 	goAlipay() {
			// 		this.$jump('/pages/users/setting/alipay')
			// 	},
			// 	formatPhone(phone) {
			// 		if (!phone || isNaN(phone)) {
			// 			return ''
			// 		}
			// 		const pre = phone.substr(0, 3);
			// 		const next = phone.substr(7, 4);
			// 		const result = pre + '****' + next;
			// 		return result
			// 	},
			// 	formatAlipay(text) {
			// 		if (text.indexOf('@') > -1) {
			// 			let arr = text.split('@');
			// 			let pre = arr[0].substr(0, 1);
			// 			if (arr[0].length > 3) {
			// 				pre = arr[0].substr(0, 3);
			// 			}
			// 			return pre + '****@' + arr[1];
			// 		} else {
			// 			return this.formatPhone(text)
			// 		}
			// 	},
			// 	uploadAvatar() {
			// 		uni.chooseImage({
			// 			success: (res) => {
			// 				const img = res.tempFilePaths[0];
			// 				uploadImageHandler(img, (res) => {
			// 					this.avatarEdit(res.data.url)
			// 				})
			// 			}
			// 		});
			// 	},
			// 	onChooseAvatar(e) {
			// 		if (!e) return;
			// 		const img = e.detail.avatarUrl;
			// 		uploadImageHandler(img, (res) => {
			// 			this.avatarEdit(res.data.url)
			// 		})
			// 	},
			// 	async avatarEdit(url) {
			// 		userEdit({
			// 			avatar: url
			// 		}).then(res => {
			// 			this.$toast('修改头像成功!', 'success')
			// 			this.$store.dispatch('USERINFO', 1);
			// 		}).catch(() => {
			// 			this.$alert(msg);
			// 		})
			// 	},
			// 	tapSpread() {
			// 		let {
			// 			spread_uid
			// 		} = this.userInfo;
			// 		if (!spread_uid) {
			// 			return this.$jump('/pages/auth/spread');
			// 		}
			// 		this.$jump('/pages/users/spread/index');
			// 	},
			// 	handlerVersion() {
			// 		// #ifdef APP-PLUS
			// 		checkVersionUpdate(1);
			// 		// #endif
			// 	},
			// 	zhuxiao() {
			// 		this.$alert("确认注销账号吗？", 1).then((res) => {
			// 			if (res.confirm) {
			// 				userUnsubscribe().then(res => {
			// 					this.$store.commit("LOGOUT");
			// 					this.$toast(res.msg).then(() => {
			// 						uni.navigateBack({
			// 							delta: 1
			// 						});
			// 					});
			// 				}).catch(err => {
			// 					this.$alert(err)
			// 				})
			// 			}
			// 		});
			// 	},
			// 	switchPush() {
			// 		uni.showActionSheet({
			// 			title: '推送和广告营销',
			// 			itemList: ['开启', '关闭'],
			// 			success: (res) => {
			// 				this.closepush = res.tapIndex;
			// 				$cache.set('closepush', res.tapIndex);
			// 			}
			// 		})
			// 	},
			// 	weixinBindHandler() {
			// 		if (this.isBindWeixin) {
			// 			if (!this.userInfo.phone) {
			// 				this.$alert('未绑定手机号', 1, {
			// 					content: '是否去绑定手机号？',
			// 					cancelText: '否',
			// 					confirmText: '是',
			// 				}).then((res) => {
			// 					if (res.confirm) {
			// 						return this.$jump('/pages/auth/phone')
			// 					}
			// 				})
			// 			} else {
			// 				toPhoneVerify('wx_del')
			// 			}
			// 		} else {
			// 			uni.login({
			// 				provider: "weixin",
			// 				onlyAuthorize: true, // 微信登录仅请求授权认证
			// 				success: (res) => {
			// 					appBindWechat({
			// 						code: res.code
			// 					}).then(res => {
			// 						this.$store.dispatch('USERINFO', 1);
			// 						setTimeout(() => {
			// 							this.$toast(res.msg);
			// 						}, 300)
			// 					}).catch(err => {
			// 						this.$alert(err);
			// 					})
			// 				},
			// 				fail: function(err) {
			// 					console.log(err);
			// 					this.$alert(err);
			// 				}
			// 			})
			// 		}
			// 	}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		height: 100%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.content {
			padding: 0 30rpx;
		}

		.title {
			height: 78rpx;
			font-size: 28rpx;
			color: #646566;
			line-height: 78rpx;
		}

		.cell {
			background-color: #fff;
			padding: 0 30rpx 0 30rpx;
			border-radius: 16rpx;

			.item {
				position: relative;
				height: 96rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.mask {
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					left: 0;
					opacity: 0;
				}

				&:first-of-type {
					border-top: 0;
				}

				.label {
					font-size: 28rpx;
					color: #666666;
				}

				.value {
					display: flex;
					align-items: center;
					color: #212121;
					position: relative;

					.text {
						font-size: 28rpx;
					}
				}

				.btns {
					position: fixed;
					bottom: 0;
					left: 0;
					width: 100%;
					background: #fff;
					border-radius: 8rpx 8rpx 0 0;
					font-size: 32rpx;
					padding: 26rpx 0 40rpx;

					.view {
						width: 686rpx;
						height: 88rpx;
						background: #F3B23E;
						line-height: 88rpx;
						border-radius: 8rpx;
						color: #FFFFFF;
						text-align: center;
						font-size: 28rpx;
						margin: 0 auto;
					}
				}

				image {
					width: 64rpx;
					height: 64rpx;
					border-radius: 50%;
				}

				.icon {
					text-align: right;
					color: rgba(192, 196, 204, 1);
					font-size: 40rpx;
					width: 50rpx;
				}
			}
		}
	}

	.btn {
		width: 100%;
		background: #fff;
		border-radius: 8rpx;
		font-size: 32rpx;
		color: #FFFFFF;
		padding: 30rpx 0 50rpx;
		position: relative;

		.view {
			width: 686rpx;
			height: 88rpx;
			background: #F3B23E;
			line-height: 88rpx;
			border-radius: 8rpx;
			color: #FFFFFF;
			text-align: center;
			font-size: 28rpx;
			margin: 0 auto;
		}
	}
</style>