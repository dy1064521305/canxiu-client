<template>
	<common-page :inviteType="1">
		<view class="pages" :style="{height:clientHeight+'px'}">
			<view>
				<view class="banner">
					<!-- <image src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/09/63428c7066d641feba3d0d36e1069896.jpg"
					mode=""></image> -->
				</view>
				<view class="content">
					<view class="content-mess">
						<view class="content-mess-title">
							填写申请信息
						</view>
						<view class="form-row acea-row row-middle row-between-wrapper"
							v-if="userInfo&&userInfo.partnerId">
							<text class="form-key">邀请人</text>
							<view class="people acea-row row-middle">
								<image v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" mode=""></image>
								<image v-else
									src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/23/5595ab7226854043abab1449a9067a94.png">
								</image>
								{{userInfo.clientName}}
							</view>
						</view>
						<view class="form-row acea-row row-middle">
							<text class="form-key">您的姓名</text>
							<input class="acea-con" v-model="where.realName"
								style="text-align: right;margin-right: 10rpx;" placeholder="请输入您的真实姓名"></input>
						</view>
						<view class="form-row acea-row row-middle">
							<text class="form-key">联系电话</text>
							<input class="acea-con" v-model="where.cellPhone"
								style="text-align: right;margin-right: 10rpx;" placeholder="请输入您的手机号"></input>
						</view>
						<view class="form-row acea-row row-middle" v-if="isLogin">
							<text class="form-key">所在城市</text>
							<pickers v-if="!isSubmit" :type="1" @address="addressHandle"
								style="flex: 1;text-align: right">
								<view v-if="where.region!=''">{{where.region}}</view>
								<view v-else class="acea-row row-middle"
									style="color: rgb(192, 196, 204); justify-content: flex-end;">
									请选择您当前的城市 <u-icon color=" rgb(192, 196, 204)" name="arrow-right"
										style="margin-left: 4rpx;" :size="14"></u-icon></view>
							</pickers>
						</view>
						<view class="content-btn acea-row row-middle row-center" @click.stop="submit">
							申请成为合伙人
						</view>
					</view>
				</view>
				<view class="content" style="margin-top: 20rpx;">
					<view class="content-mess">
						<view class="content-mess-title" style="border-bottom: none;">
							合伙人特权
						</view>
						<view class="content-mess-card" v-for="(item ) in mess">
							<view class="">{{item.title}}</view>
							<text>{{item.tit}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</common-page>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import pickers from "@/components/ming-picker/ming-picker.vue"
	import {
		postPartnerApply
	} from "@/api/appUpdate.js"
	import {
		putImmediate
	} from "@/api/brand.js"
	import {
		isEmpty,
		isPhone
	} from '@/utils/verify.js'
	import storage from '@/utils/storage'

	import {
		parseQuery
	} from '@/utils/index.js'
	export default {
		components: {
			pickers
		},
		data() {
			return {
				city: "",
				isSubmit: false,
				where: {
					realName: "",
					cellPhone: "",
					region: "",
					clientId: "",
					superiorId: ''
				},
				clientHeight: "",
				mess: [{
						title: "品牌业务推广奖励",
						tit: "自行推广或协作其他合伙人维护品牌门店业务，你得业务推广奖励！"
					},
					{
						title: "订单消化奖励",
						tit: "组建师傅团队，团队师傅接单且完成服务后，你得分成奖励！"
					},
					{
						title: "邀请品牌",
						tit: "邀请品牌/门店/师傅入驻系统，将根据活动规则奖励你相应的奖励金额！"
					},
				],
				clientId: "",
				userInfo: {},
			}
		},
		onLoad(options) {

			if (options) {
				if (options.userId) {
					this.getInfo(options.userId)
				}
				let scene = parseQuery(decodeURIComponent(options.scene)) || null
				if (options.scene) {
					this.clientId = scene.userId || ''
					this.getInfo(this.clientId)
				}
			}

			const pages = uni.$u.pages();
			this.isSubmit = pages.some(p => {
				return p.route.includes('submitOrder') || p.route.includes('goosDetails')
			})

			this.getClineHeight()

		},
		computed: {
			...mapGetters(['isLogin'])
		},
		onShow() {
			if (this.isLogin) {
				setTimeout(() => {
					let id = storage.get('ClientId')
					putImmediate(id).then(res => {
						if (res.data) {
							this.$toast('您已是合伙人!', 'success').then(() => {
								uni.redirectTo({
									url: '../../staging/team/index',
								})
							});
						} else {}
					})
				}, 500)

			} else {
				this.$store.commit('OPEN_LOGIN_POP')
			}
		},
		methods: {
			getInfo(id) {
				putImmediate(id).then(res => {
					if (res.data) {
						this.userInfo = res.data || {}
						this.where.superiorId = res.data.partnerId
					} else {
						console.log(11, "不存在");
					}
					console.log(res.data, "res.data");
					// if(!res.data)
				})
			},
			addressHandle(e) {
				let value = e.value1
				let region = e.value
				this.where.province = value[0] || '';
				this.where.provinceCode = region[0] || '';
				this.where.city = value[1] || '';
				this.where.cityCode = region[1] || '';
				this.where.county = value[2] || '';
				this.where.countyCode = region[2] || '';
				this.where.region = e.value1.toString().replace(/,/g, "/")
			},
			submit() {
				if (!this.isLogin) return this.$store.commit('OPEN_LOGIN_POP')
				if (!this.where.realName) return this.$toast('您的姓名不能为空')
				if (isEmpty(this.where.cellPhone)) {
					uni.$u.toast('请输入手机号')
					return false
				}
				if (!isPhone(this.where.cellPhone)) {
					uni.$u.toast('请输入正确的手机号')
					return false
				}
				if (!this.where.region) return this.$toast('所在城市不能为空')
				this.where.clientId = storage.get('ClientId') || ''
				console.log(this.where, "where");
				postPartnerApply(this.where).then(res => {
					this.$toast('操作成功')
					setTimeout(() => {
						this.$jump(-1)
					}, 2000)
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
			// getBarHeight() {
			// 	const res = uni.getSystemInfoSync()
			// 	if (res.platform === 'ios') {
			// 		return 44 + res.statusBarHeight
			// 	} else if (res.platform === 'android') {
			// 		return 48 + res.statusBarHeight
			// 	} else {
			// 		return 0;
			// 	}
			// },
		}

	}
</script>

<style lang="scss" scoped>
	.pages {
		// min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.banner {
			height: 376rpx;
			background-color: bisque;
			background: url('https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/09/06/edbf78c856e0421b8c4444dc632d7b60.jpg') no-repeat;
			background-size: 100% 100%;
		}

		.content {
			padding-bottom: 32rpx;
			margin: -30rpx 32rpx 0;
			background-color: #fff;

			border-radius: 16rpx;

			&-mess {
				padding: 0 30rpx;

				&-title {
					height: 100rpx;
					line-height: 100rpx;
					text-align: center;
					font-size: 32rpx;
					color: #323233;
					border-bottom: 1rpx solid #ebebeb;

				}

				.form-row:nth-last-child(1) {
					border-bottom: none;
				}

				.people {
					text-align: right;

					image {
						width: 60rpx;
						height: 60rpx;
						border-radius: 50%;
						margin-right: 20rpx;
					}
				}

				&-card {
					background: linear-gradient(270deg, #EEDBB0 0%, #fdf4dd 100%);
					border-radius: 8rpx;
					margin-bottom: 20rpx;

					padding: 20rpx 36rpx;

					view {
						color: #212121;
						font-size: 32rpx;
					}

					text {
						color: #98713A;
						font-size: 28rpx;
						margin-top: 8rpx;
					}
				}
			}


		}

		.content-btn {
			width: 622rpx;
			height: 88rpx;
			background: linear-gradient(90deg, #EEDBB0 0%, #E4CB96 100%);
			border-radius: 8rpx;
			font-family: PingFangSC, PingFang SC;
			font-weight: 500;
			font-size: 32rpx;
			color: #FFFFFF;
			margin-top: 46rpx;

		}
	}

	/deep/ .uni-input-placeholder {
		color: rgb(192, 196, 204);
	}
</style>