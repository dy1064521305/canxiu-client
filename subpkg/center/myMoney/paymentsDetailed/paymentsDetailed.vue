<template>
	<view class="paymentsDetailed">
		<view class="data-box">
			<picker  mode="date" :value="date" fields="month" :start="startDate" :end="endDate" @change="bindDateChange">
				<view style="display: flex;">
					<view style="margin-right: 10rpx;">{{date}}</view>
					<u-icon name="arrow-down-fill" size="10"></u-icon>
				</view>
			</picker>
		</view>
		<view class="content">
		<!-- 	<view style="display: flex;font-size: 31prx;justify-content: space-between;font-weight: bold;">
				<text >师傅拉新收入</text>
				<text>88.00</text>
			</view>
			<view style="align-items: center;margin-top: 20rpx;display: flex;justify-content: space-between;">
				<text style="font-size: 25rpx;color: #A5A7A7;">2022-11-15    22:25:12</text>
				<text style="font-size: 31rpx;">已结算</text>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				date: currentDate,
			};
		},

		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			},
		},
		methods: {
			bindDateChange: function(e) {
				this.date = e.detail.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				return `${year}-${month}`;
			}
		}

	}
</script>

<style lang="scss" scoped>
	.paymentsDetailed {
		.data-box{
			background: #fff;
			padding: 30rpx;
		}
		.content{
			background: #fff;
			padding: 30rpx;
		}
	}
</style>
