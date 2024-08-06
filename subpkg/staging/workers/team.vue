<template>
	<view class="pages">
		<view class="setUp">
			<view class="setUp-list acea-row row-between-wrapper" @click="toUrl(item)" v-for="(item) in typeList"
				:key="item.id">
				<view class="setUp-list-left">
					<image :src="item.img" :class="'img-'+item.id" mode=""></image>
					<text>{{item.label}}</text>
				</view>
				<view class="setUp-list-right">
					<u-icon name="arrow-right" color="#959595" size="18"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				typeList: [{
						id: 0,
						img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/01/266f8fc9d00b4e67b40dd52f66a66ec5.png",
						label: "签约管理",
						url: "/subpkg/center/brand/Signing"
					},

					{
						id: 1,
						img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/01/cc78fbf88e5e476eafdeef2fe0c9a6d6.png",
						label: "推广收益统计",
						url: "/subpkg/center/inviteWorker/inviteRewards?type=inviter"
					},
					{
						id: 2,
						img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/01/7320eca633d8472692bceca08d92aae4.png",
						label: "师傅管理",
						url: "/subpkg/staging/workers/workers"
					},
					{
						id: 3,
						img: "https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/01/123b55e3dda2476bbad24b537a24c185.png",
						label: "师傅结算记录",
						url: "/subpkg/staging/workers/records"
					},

				],
				partnerId: ""
			}
		},
		onLoad(options) {
			if (options && options.partnerId) {
				this.partnerId = options.partnerId
			}
		},
		methods: {
			// 跳转
			toUrl(item) {
				console.log(item);
				if (item.id == 2 || item.id == 3) {
					this.$jump(item.url + '?partnerId=' + this.partnerId)
				} else {
					this.$jump(item.url)
				}
				// switch (id){
				// 	case value:
				// 		break;
				// 	default:
				// 		break;
				// }
			},
		}
	}
</script>

<style lang="scss" scoped>
	.pages {
		height: 100%;

		.setUp {
			padding: 0 20rpx;
			background-color: #fff;
			border-radius: 14rpx;
			margin-top: 22rpx;

			&-list {
				height: 100rpx;
				border-bottom: 1rpx solid #ececec;

				&-left {
					display: flex;
					align-items: center;

					image {
						width: 38rpx;
						height: 36rpx;
						margin-left: 26rpx;


						&.img-3 {
							width: 43rpx;
						}

						&.img2-5 {
							width: 39rpx;
						}

						&.img2-6 {
							width: 43rpx;
						}
					}

					text {
						font-size: 25rpx;
						color: #333333;
						margin-left: 18rpx;
					}
				}

				&-right {}
			}

			&-list:nth-last-child(1) {
				border-bottom: none;
			}
		}

	}
</style>