<template>
	<view class="invoicingDetails">
		<u--form labelPosition="left" :labelStyle='labelStyle' :model="invoice" ref="form1" labelWidth='180rpx'>
			<view class="bg">

				<u-form-item label="公司名称" borderBottom ref="item1">
					<u--input disabled disabledColor='#fff' v-model="invoice.companyName" border="none"
						placeholder="自动读取"></u--input>

				</u-form-item>
				<u-form-item label="公司税号" borderBottom ref="item1">
					<u--input disabled disabledColor='#fff' v-model="invoice.taxNumber" border="none"
						placeholder="自动读取"></u--input>
				</u-form-item>
				<u-form-item label="发票金额" borderBottom ref="item1">
					<u--input disabled disabledColor='#fff' v-model="invoice.invoiceAmount" border="none"
						placeholder="自动读取"></u--input>
				</u-form-item>
				<u-form-item label="申请时间" borderBottom ref="item1">
					<u--input disabled disabledColor='#fff' v-model="invoice.requestTime" border="none"
						placeholder="自动读取"></u--input>
				</u-form-item>
			</view>

			<view class="bg" style="display: flex;align-items: center;">
				<text style="font-size: 33rpx;font-weight: bold;width: 25%;">1张发票</text>
				<text style="font-size: 29rpx;color: #3D3F3E;width: 70%;">含{{orderList.length}}个订单</text>
				<image @click='goOrder()' style="width:14rpx;height: 25rpx;margin-left: 10rpx;"
					src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/0e15ed9e53ec47569b535aaffb6b0d7b.png">
				</image>
			</view>

			<view class="bg">
				<view style="font-size: 33rpx;font-weight: bold;">
					接受方式
				</view>
				<u-form-item label="电子邮箱" prop="invoice.acceptMessage" borderBottom ref="item1">
					<u--input disabled disabledColor='#fff' v-model="invoice.acceptMessage" border="none"
						placeholder="自动读取"></u--input>
				</u-form-item>
			</view>

		</u--form>

		<view class="btns">
			<view>
				重发发票
			</view>
			<view>
				申请重开
			</view>
		</view>


	</view>

</template>

<script>
	import {
		getInvoiceDetailed,
		getInvoiceDetailedOrder
	} from '@/api/invoice.js'
	import storage from '@/utils/storage'
	import formatter from '@/utils/formatter.js'
	export default {
		components: {},
		data() {
			return {

				labelStyle: {
					'font-size': '30rpx',
					'font-weight': 'bold'
				},

				invoice: {},
				orderList: []
			}
		},
		onLoad(option) {
			getInvoiceDetailed(option.id).then(res => {
				this.invoice = res.data
				this.invoice.invoiceAmount="¥"+this.invoice.invoiceAmount
				getInvoiceDetailedOrder(res.data.orderId).then(order => {
					console.log(res);
					this.orderList = order.data
				})
			})
		},

		methods: {

		goOrder(){
			console.log(11111111);
			uni.navigateTo({
				url:'../invoiceDetailedOrder/invoiceDetailedOrder?list='+JSON.stringify(this.orderList)
			})
		}

		

		}
	}
</script>


<style>
	page {
		background: #F5F9FA;
	}
</style>
<style lang="scss" scoped>
	.invoicingDetails {
		position: relative;
		height: 100vh;

		.bg {
			background: #fff;
			padding: 20rpx 20rpx;
			margin-top: 22rpx;
		}



		.btns {
			display: flex;
			justify-content: space-evenly;
			margin: 0 auto;
			width: 100%;
			position: absolute;
			bottom: 200rpx;

			view {
				width: 330rpx;
				height: 80rpx;
				border-radius: 45rpx;
				text-align: center;
				line-height: 80rpx;
				font-size: 36rpx;
			}

			view:first-child {
				background: #A4D091;
				color: #fff;
			}

			view:nth-child(2) {
				background: #FFFFFF;
				border: 4rpx solid #A4D091;
				color: #A4D091;
			}
		}

	}
</style>
