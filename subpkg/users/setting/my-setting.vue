<template>
	<view class="page" :style="{height: clientHeight+'px'}">
		<view class="content">
			<div class="title">账户信息</div>
			<view class="cell" @click=" toEdit() ">
				<view class="item">
					<view class="label">头像</view>
					<view class="value acea-row row-middle">
						<image v-if="userInfo&&userInfo.avatarUrl!= 'null'" class="avatar" :src="userInfo.avatarUrl"
							mode="aspectFill"></image>
						<image v-else
							src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/08/09/6a266da84dbb4e9f8a4148ded10e2c3a.png"
							mode="aspectFill">
						</image>
						<text class="iconfont icon" style="margin:0 -14rpx -4rpx -12rpx;">&#xe604;</text>
						<!-- #ifdef MP-WEIXIN -->
						<!-- 	<button class="mask" open-type="chooseAvatar" @chooseavatar="onChooseAvatar"
							@click.stop="onChooseAvatar()"></button> -->
						<!-- #endif -->
					</view>
				</view>
				<view class="item">
					<view class="label">账号呢称</view>
					<view class="value acea-row row-middle">
						<view class="">{{userInfo&&userInfo.clientName?userInfo.clientName:'请输入昵称'}}</view>
						<text class="iconfont icon" style="margin:0 -14rpx 0 -12rpx;">&#xe604;</text>
						<!-- <input class="text-c" disabled style="text-align: right;" placeholder=""
							placeholder-class="font-normal " v-model=""> -->
						<!-- <form @submit="submit" class="form">
							<view class="acea-row">
								<input class="text-c" style="text-align: right;" type="nickname" name="nickname"
									placeholder="请输入昵称" placeholder-class="font-normal " v-model="nickname">
								<text class="iconfont icon" style="margin:0 -14rpx 0 -12rpx;">&#xe604;</text>
							</view>
							<view class=" btns">
								<button class="view" type="primary" form-type="submit">保存编辑</button>
							</view>
						</form> -->
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
		<view class="btn">
			<button class="view" @click="showLoginOut=true" type="primary" form-type="submit"> 退出登录</button>
		</view>


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
		<u-modal :show="showLoginOut" confirmColor='#FF7700' @cancel='cancel' @confirm="loginOut" title="提示"
			showCancelButton>
			<view class="slot-content" style="text-align: center;">
				确定退出账号？
			</view>
		</u-modal>
	</view>

</template>

<script>
	// import {
	// 	mapState,
	// 	mapGetters
	// } from "vuex";
	import $cache from '@/utils/cache.js';
	import {
		uploadImageHandler,
	} from '@/utils/index.js'
	import {
		putEditInfo,
		getInfoById
	} from '@/api/user.js'

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
				userInfo: {},
				showLoginOut: false, //是否退出提示框
			}
		},
		computed: {},
		onLoad() {
			this.getClineHeight()
		},
		onShow() {
			this.getInfo()
		},
		methods: {
			getInfo() {
				getInfoById($cache.get('ClientId')).then(res => {
					this.userInfo = res.data
				})
			},
			//获取可视区域高度
			getClineHeight() {
				const res = uni.getSystemInfo({
					success: (res => {
						this.clientHeight = res.windowHeight;
						// this.clientHeight = res.windowHeight - uni.upx2px(80) - this.getBarHeight();
					})
				});
			},
			toEdit() {
				let data = this.userInfo || {}
				uni.navigateTo({
					url: '/subpkg/users/setting/avatar?avatar=' + data.avatarUrl + '&nickname=' +
						data.clientName
				})
			},
			loginOut() {
				const app = this
				const apps = getApp()
				apps.type = 'loginOut'
				uni.switchTab({
					url: '/pages/home/index'
				})
				app.$store.dispatch('Logout').then(result => {
						console.log(1111);

						// uni.switchTab({
						// 	url: '/pages/index/index',
						// 	fail(err) {
						// 		console.log(err)
						// 	}
						// })
					})
					.catch(err => {})
				// uni.$TUIKit.logout().then(res => {
				// 	console.info(res)
				// })
			},
			cancel() {
				this.showLoginOut = false
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
					this.sureSet()
				})
			},
			sureSet(e) {
				console.log(e, "@---");
				if (i) {
					if (!this.nickname) return this.$toast('请先输入昵称');
					this.submit()
				} else {
					putEditInfo({
						avatarUrl: this.avatar,
						clientName: this.nickname
					}).then(res => {
						this.$toast('保存成功！', 'success')
					})
				}

			},
			submit(e) {
				console.log(e, "@222");
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
				this.avatar = url
				putEditInfo({
					avatarUrl: this.avatar,
					clientName: this.nickname
				}).then(res => {
					this.$toast('修改头像成功!', 'success')
				})
			}
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
		padding: 30rpx 0 60rpx;
		position: fixed;
		bottom: 0;
		left: 0;

		.view {
			width: 686rpx;
			height: 88rpx;
			background: #FF7700;
			line-height: 88rpx;
			border-radius: 50rpx;
			color: #FFFFFF;
			text-align: center;
			font-size: 30rpx;
			margin: 0 auto;
		}
	}
</style>