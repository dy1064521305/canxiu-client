<template>
	<view class="pages">
		<view class="banner">
			<image src="" mode=""></image>
		</view>
		<view class="content">
			<view class="content-mess">
				<view class="form-row acea-row row-middle">
					<text class="form-key">您的姓名</text>
					<input class="acea-con" style="text-align: right;margin-right: 10rpx;"
						placeholder="请输入您的真实姓名"></input>
				</view>
				<view class="form-row acea-row row-middle">
					<text class="form-key">联系电话</text>
					<input class="acea-con" style="text-align: right;margin-right: 10rpx;"
						placeholder="请输入您的手机号"></input>
				</view>
				<view class="form-row acea-row row-middle">
					<text class="form-key">所在城市</text>
					<pickers v-if="!isSubmit" @address="addressHandle" style="flex: 1;text-align: right">
						<view v-if="city!=''">{{city}}</view>
						<view v-else class="acea-row row-middle"
							style="color: rgb(192, 196, 204); justify-content: flex-end;">
							请选择您当前的城市 <u-icon color=" rgb(192, 196, 204)" name="arrow-right" style="margin-left: 4rpx;"
								:size="14"></u-icon></view>
					</pickers>
				</view>
			</view>
		</view>
		<view class="content-btn acea-row row-center row-middle">
			确认提交
		</view>
	</view>
</template>

<script>
	import pickers from "@/components/ming-picker/ming-picker.vue"
	export default {
		components: {
			pickers
		},
		data() {
			return {
				city: "",
				isSubmit: false
			}
		},
		onLoad() {
			const pages = uni.$u.pages();
			this.isSubmit = pages.some(p => {
				return p.route.includes('submitOrder') || p.route.includes('goosDetails')
			})
		},
		methods: {
			addressHandle(e) {
				this.city = e.value1.toString().replace(/,/g, "/")
			},
		}
	}
</script>

<style lang="scss" scoped>
	.pages {
		min-height: 100vh;
		background-color: #fff;

		.banner {
			height: 390rpx;
			background-color: #Ccc;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.content {
			height: 300rpx;
			margin: 66rpx 0 0 0;

			&-mess {
				padding: 0 30rpx;

				.form-row:nth-last-child(1) {
					border-bottom: none;
				}
			}
		}

		.content-btn {
			position: fixed;
			left: 64rpx;
			bottom: 30rpx;
			width: 622rpx;
			height: 88rpx;
			background: #A4D091;
			border-radius: 8rpx;
			font-family: PingFangSC, PingFang SC;
			font-weight: 500;
			font-size: 32rpx;
			color: #FFFFFF;

		}
	}

	/deep/ .uni-input-placeholder {
		color: rgb(192, 196, 204);
	}
</style>