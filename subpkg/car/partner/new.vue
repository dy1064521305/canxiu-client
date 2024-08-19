<template>
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
					<view class="form-row acea-row row-middle">
						<text class="form-key">您的姓名</text>
						<input class="acea-con" v-model="where.realName" style="text-align: right;margin-right: 10rpx;"
							placeholder="请输入您的真实姓名"></input>
					</view>
					<view class="form-row acea-row row-middle">
						<text class="form-key">联系电话</text>
						<input class="acea-con" v-model="where.cellPhone" style="text-align: right;margin-right: 10rpx;"
							placeholder="请输入您的手机号"></input>
					</view>
					<view class="form-row acea-row row-middle">
						<text class="form-key">所在城市</text>
						<pickers v-if="!isSubmit" @address="addressHandle" style="flex: 1;text-align: right">
							<view v-if="where.region!=''">{{where.region}}</view>
							<view v-else class="acea-row row-middle"
								style="color: rgb(192, 196, 204); justify-content: flex-end;">
								请选择您当前的城市 <u-icon color=" rgb(192, 196, 204)" name="arrow-right"
									style="margin-left: 4rpx;" :size="14"></u-icon></view>
						</pickers>
					</view>
					<view class="content-btn acea-row row-middle row-center" @click="submit">
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
</template>

<script>
	import pickers from "@/components/ming-picker/ming-picker.vue"
	import {
		postPartnerApply
	} from "@/api/appUpdate.js"
	import {
		isEmpty,
		isPhone
	} from '@/utils/verify.js'
	import storage from '@/utils/storage'
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
					clientId: storage.get('ClientId'),
				},
				clientHeight: "",
				mess: [{
						title: "品牌销售利润分红",
						tit: "合伙人特权"
					},
					{
						title: "团队育成奖励",
						tit: "特权文案描述"
					},
					{
						title: "邀请品牌/师傅入驻奖励",
						tit: "合伙人特权"
					},
				]
			}
		},
		onLoad() {
			const pages = uni.$u.pages();
			this.isSubmit = pages.some(p => {
				return p.route.includes('submitOrder') || p.route.includes('goosDetails')
			})
			this.getClineHeight()
		},
		computed: {

		},
		methods: {
			addressHandle(e) {
				this.where.region = e.value1.toString().replace(/,/g, "/")
				console.log(e, "eee");
			},
			submit() {
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
			background: url('https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/09/63428c7066d641feba3d0d36e1069896.jpg') no-repeat;
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