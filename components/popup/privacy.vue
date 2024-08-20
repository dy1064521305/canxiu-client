<template>
	<view v-show="privacyPopShow">
		<view class="pop acea-row row-center-wrapper">
			<view class="mask"></view>
			<view class="wrapper">
				<image src="https://img.reduxingke.com/2023/09/14/851fb20230914145331268.png" mode="" class="img">
				</image>
				<view class="title">
					<text>热度星客小程序</text>
					<text class="iconfont icon-x" @click="close"></text>
				</view>
				<view class="content">
					感谢您使用热度星客小程序，您使用本小程序应当阅读并同意
					<text @click="openAgree">《用户隐私保护指引》</text>
				</view>
				<view class="tips">
					当你点击同意并开始使用本产品服务时，即表示你已理解并同意该条款，该条款将对您产生法律约束。如您拒绝，部分功能将不可使用。
				</view>
				<!-- <view class="content">
					在你使用【热度星客小程序】服务之前，
					请仔细阅读<span class="color-theme" @click="openAgree">《热度星客小程序隐私保护指引》</span>。
					如你同意《热度星客小程序隐私保护指引》，请点击“同意”开始使用【热度星客小程序】
				</view> -->
				<view class="btns">
					<view class="btn" @click="close">不同意</view>
					<button class="btn confirm " open-type="agreePrivacyAuthorization"
						@agreeprivacyauthorization="confirm">同意并继续</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'

	export default {
		name: 'PopupPrivacy',
		computed: {
			...mapState(['privacyPopShow'])
		},
		methods: {
			close() {
				this.$store.commit('CLOSE_PRIVACY_POP')
				this.$emit('close')
			},
			confirm() {
				this.$store.commit('CLOSE_PRIVACY_POP')
				this.$emit('confirm')
			},
			openAgree() {
				uni.openPrivacyContract()
			}
		}
	}
</script>

<style scoped lang="scss">
	.pop {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;

		.mask {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			background-color: $uni-bg-color-mask;
		}

		.wrapper {
			width: 640rpx;
			height: 548rpx;
			background: url(https://img.reduxingke.com/2023/09/14/c5c7f202309141452489586.png);
			background-size: cover;
			position: relative;
			border-radius: 24rpx;
			padding: 0 30rpx;
			box-sizing: border-box;

			.img {
				width: 124rpx;
				height: 124rpx;
				position: absolute;
				top: -62rpx;
				left: 50%;
				transform: translateX(-50%);
			}

			.title {
				font-size: 36rpx;
				text-align: center;
				font-weight: 500;
				color: #333333;
				// padding: 36rpx;
				margin-top: 90rpx;
				position: relative;

				.icon-x {
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					right: 36rpx;
					color: #C0C4CC;
				}
			}

			.content {
				margin-top: 36rpx;
				font-size: 28rpx;
				font-weight: 400;
				color: #333333;

				text {
					color: rgba(250, 123, 12, 1);
				}
			}

			.tips {
				margin-top: 24rpx;
				font-size: 24rpx;
				font-weight: 400;
				color: #999999;
			}

			// .content {
			// 	padding: 30rpx;
			// }

			.btns {
				margin-top: 48rpx;
				// border-top: 2rpx solid #e8e8e8;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}


			.btn {
				width: 276rpx;
				height: 72rpx;
				text-align: center;
				line-height: 72rpx;
				border: 1rpx solid #FF7700;
				background: #FFFFFF;
				border-radius: 36rpx;
				font-size: 28rpx;
				font-weight: 400;
				color: #FF7700;
				box-sizing: border-box;

				&.confirm {
					background: $color-theme;
					color: #fff;
				}
			}
		}
	}
</style>