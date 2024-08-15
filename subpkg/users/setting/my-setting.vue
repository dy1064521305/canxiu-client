<template>
	<view class="page">
		<div class="title">账户信息</div>
		<view class="cell">
			<view class="item" v-for="(item) in accountList" :key="item.id">
				<view class="label">
					{{item.label}}
				</view>
				<view class="value acea-row row-middle" v-if="item.id==1"
					@click="$jump('/subpkg/users/setting/avatar')">
					<image
						src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/08/09/6a266da84dbb4e9f8a4148ded10e2c3a.png">
					</image>
					<text class="iconfont icon" style="margin:0 -14rpx -4rpx -12rpx;">&#xe604;</text>
					<!-- <image v-else :src="userInfo.avatar" mode=""></image> -->
				</view>
				<view class="value" v-else>
					<text class="text"> {{item.value}}</text>
					<text class="iconfont icon" v-if="item.id==2" style="margin:0 -14rpx 0 -12rpx;">&#xe604;</text>
				</view>
			</view>
		</view>
		<div class="title">合作签约信息</div>
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

		</view>
	</view>
</template>

<script>
	// import {
	// 	mapState,
	// 	mapGetters
	// } from "vuex";
	// import {
	// 	uploadImageHandler,
	// 	toPhoneVerify,
	// 	checkAuth
	// } from '@/utils/index.js'
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
						label: "登录账号",
						value: "俞军",
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
				]

			}
		},
		computed: {},
		onLoad() {},
		methods: {
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
		min-height: 100vh;
		position: relative;
		padding: 0rpx 30rpx 20rpx;
		box-sizing: border-box;

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
					color: #C0C4CC;

					.text {
						font-size: 28rpx;
					}

					.null {
						color: #C0C4CC;
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
</style>