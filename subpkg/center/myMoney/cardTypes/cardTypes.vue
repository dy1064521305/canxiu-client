<template>
	<view class="cardTypes">
		<view class="main">
			<view v-for="item in list" class="box">
				<image src="../../../../static/img/home/intoCar.png"
					style="width: 53rpx;height: 52rpx;margin-right:31rpx;"></image>
				<view style="width: 81%;">{{item}}</view>
				<view @click.stop='showMotalHandle(item)'>
					<u-icon name="arrow-right" color="#ccc" size="20"></u-icon>
				</view>
			</view>
		</view>

		<!-- 类型 -->
		<u-popup :show="showPop" @close="showPop=false" closeable>
			<view style="margin:70rpx 50rpx;">
				<view style="text-align: center;margin-bottom: 40rpx;font-weight: bold;">
					确认银行卡类型
				</view>
				<view class="pop-box">
					<view v-for='item in type' @click="typeClick(item)"
						:class="[typeName==item?'view-active':'view-unactive','box']">
						<image src="../../../../static/img/home/intoCar.png"
							style="width: 53rpx;height: 52rpx;margin-right:31rpx ;"></image>
						<view class="">
							<view style="font-size: 24rpx;margin-bottom: 20rpx;">
								{{bankName}}
							</view>
							<view style="font-weight: bold;">
								{{item}}
							</view>
						</view>

					</view>

				</view>
				<view class="btn" @click="next">
					下一步
				</view>
			</view>
		</u-popup>

		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: ['银行1', '银行2', '银行3'],
				showPop: false,
				bankName: '',
				type: ['储蓄卡', '信用卡'],
				typeName: '',
			};
		},
		methods: {
			showMotalHandle(item) {
				this.showPop = true
				this.bankName = item
			},
			typeClick(item) {
				this.typeName = item
			},
			next() {
				if (this.typeName == '') {
					this.$refs.uToast.show({
						type: 'error',
						message: '请选择卡类型'
					});
				} else {
					let pages = getCurrentPages()
					let prevPage = pages[pages.length - 2]
					let info = {
						bankName: this.bankName,
						cardTypeName: this.typeName
					}
					prevPage.$vm.getType(info)
					uni.navigateBack()
				}

			}
		}
	}
</script>

<style lang="scss" scoped>
	.cardTypes {
		.main {
			background-color: #fff;
			margin: 20rpx;
			box-shadow: 0px 0px 4px 0px rgba(42, 64, 55, 0.05);
			border-radius: 14rpx;
			padding: 20rpx;

			.box {
				height: 90rpx;
				line-height: 90rpx;
				display: flex;
				align-items: center;
				border-bottom: 2rpx solid #F8F8F8;

			}
		}

		.pop-box {


			.box {
				height: 130rpx;
				border-radius: 7px;
				margin-bottom: 20rpx;
				display: flex;
				align-items: center;
				padding: 0 30rpx;
			}

			.view-active {
				color: #fff;
				background: #9FD6BA;
			}

			.view-unactive {
				background: #F5F9FA;
			}
		}

		.btn {
			width: 663rpx;
			height: 91rpx;
			background: #9FD6BA;
			border-radius: 45rpx;
			margin: 0 auto;
			color: #fff;
			text-align: center;
			line-height: 91rpx;
		}
	}
</style>
