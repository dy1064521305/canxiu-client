<template>
	<view class="invoice">
		<u--form labelPosition="left" :labelStyle='labelStyle' :rules="rules" :model="model1" ref="form1"
			labelWidth='180rpx'>
			<view class="bg">
				<view style="font-size: 33rpx;font-weight: bold;">
					发票详情
				</view>
				<u-form-item label="抬头类型" borderBottom ref="item1">
					<u-radio-group v-model="model1.invoice.headerType" placement="row">
						<u-radio activeColor="#73d9a3" :customStyle="{marginRight: '22rpx'}"
							v-for="(item, index) in radiolist1" :key="index" :label="item.name" :name="index">
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item label="公司名称" borderBottom ref="item1">
					<u--input disabled disabledColor='#fff' v-model="company" border="none" placeholder="自动读取"></u--input>
					<text v-if="columnss.length!=0" slot="right"  style="color: #3398F3;;">
						<picker @change="bindPickerChange" range-key='headerName' :value="index" :range="columnss">
							选择
						</picker>
					</text>
					<text v-else slot="right" @click.stop="showPop=true" style="color: #3398F3;;">
						选择
					</text>
				</u-form-item>
				<u-form-item label="公司税号" borderBottom ref="item1">
					<u--input disabled disabledColor='#fff' v-model="taxNumber" border="none" placeholder="自动读取"></u--input>
				</u-form-item>
			</view>

			<view class="bg" style="display: flex;align-items: center;">
				<text style="font-size: 33rpx;font-weight: bold;width: 25%;">总金额</text>
				<text style="font-size: 29rpx;color: #3D3F3E;width: 45%;">¥{{info.money}}</text>
				<text style="font-size: 29rpx;color: #A5A7A7;width: 25%;text-align: end;">共{{info.list.length}}张</text>
				<image @click='goDetailed' style="width:14rpx;height: 25rpx;margin-left: 10rpx;"
					src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/0e15ed9e53ec47569b535aaffb6b0d7b.png">
				</image>
			</view>

			<view class="bg">
				<view style="font-size: 33rpx;font-weight: bold;">
					接受方式
				</view>
				<u-form-item label="电子邮箱" prop="invoice.acceptMessage" borderBottom ref="item1">
					<u--input v-model="model1.invoice.acceptMessage" border="none" placeholder="用于向您发送电子发票"></u--input>
				</u-form-item>
			</view>

		</u--form>

		<view class="button" @click="post">
			提交
		</view>


		<!-- 发票抬头为空 -->
		<u-popup mode="bottom" :show="showPop" @close="showPop=false" @open="showPop=true">
			<view class="noInvoice">
				<image style="width: 210rpx;height: 182rpx;"
					src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/04/cb8a19a85cd14c86ad85b72b97ea2d1e.png">
				</image>
				<view style="font-size: 25rpx;color: #A5A7A7;">
					未添加发票抬头
				</view>
				<view class="btn">
					添加常用抬头
				</view>
			</view>
		</u-popup>
	</view>

</template>

<script>
	import {
		getInvoiceHeaderList,
		postInvoice
	} from '@/api/invoice.js'
	import storage from '@/utils/storage'
	import formatter from '@/utils/formatter.js'
	export default {
		components: {},
		data() {
			return {
				showPop: false, //没有发票抬头
				columnss: [], //抬头名称
				radiolist1: [{
						name: '企业单位',
					},
					{
						name: '个人/非企业单位',
					}

				],
				labelStyle: {
					'font-size': '30rpx',
					'font-weight': 'bold'
				},
				model1: {
					invoice: {
						clientId: storage.get('ClientId'),
					}
				},
				showAddress: false,
				orderList: [],
				index: 0,
				info: {},
				rules: {
					'invoice.acceptMessage': [{
						required: false,
					}, {
						validator: (rule, value, callback) => {
							if (value == '' || value == undefined) {
								return true
							} else {
								return uni.$u.test.email(value);
							}

						},
						message: '邮箱格式不正确',
						trigger: ['change', 'blur'],
					}]
				},
				company:'',//公司名称
				taxNumber:'',//税号
			}
		},
		onLoad(option) {
			console.log(option);
			this.info = JSON.parse(option.query)
			this.orderList = this.info.list
			this.model1.invoice.invoiceAmount = this.info.money
			this.model1.invoice.clientId = storage.get('ClientId')
			console.log(JSON.parse(option.query));
			this.getHeader()
		},
		onReady() {
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			this.$refs.form1.setRules(this.rules)
		},
		methods: {
			//选择发票抬头
			bindPickerChange: function(e) {
				console.log(this.columnss[e.detail.value]);
				this.model1.invoice.headerId = this.columnss[e.detail.value].headerId
				this.company=this.columnss[e.detail.value].headerName
				this.taxNumber=this.columnss[e.detail.value].taxNumber
			},
			getHeader() {
				getInvoiceHeaderList({
					clientId: storage.get('ClientId'),
				}).then(res => {
					console.log(res);

					this.columnss = res.rows
					console.log(this.columnss);
					//this.columnss = []
				})
			},
			//查看发票详情
			goDetailed() {
				uni.navigateTo({
					url: '../invoiceInfo/invoiceInfo?info=' + JSON.stringify(this.info)
				})
			},
			post() {
				this.model1.invoice.orderId = this.getId('id')
				this.model1.invoice.orderNumber = this.getId('num')
				this.model1.invoice.requestTime =formatter.formatDateTime(new Date().toLocaleString())	
				console.log(this.model1.invoice.requestTime);
				postInvoice(this.model1.invoice).then(res=>{
					console.log(res);
					if (res.code === 200) {
						uni.showToast({
							title: '添加成功',
							duration: 2000
						});
					setTimeout(function() {
						uni.navigateBack()
					}, 1000)
					}
				})
				
			},
			getId(type) {
				let arr = []
				this.info.list.forEach(item => {
					type == 'id' ? arr.push(item.orderId) : arr.push(item.orderNumber)
				})
				return arr.toString()
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
	.invoice {
		position: relative;
		height: 100vh;

		.bg {
			background: #fff;
			padding: 30rpx 20rpx;
			margin-top: 22rpx;
		}

		.button {
			width: 663rpx;
			height: 91rpx;
			background: #9FD6BA;
			border-radius: 45rpx;
			font-size: 36rpx;
			color: #FFFFFF;
			line-height: 91rpx;
			text-align: center;
			position: absolute;
			bottom: 300rpx;
			left: 43rpx;
		}

		.noInvoice {
			text-align: center;
			padding: 100rpx 30rpx;

			.btn {
				margin: 80rpx 30rpx 0 30rpx;
				height: 91rpx;
				background: #9FD6BA;
				border-radius: 45rpx;
				color: #fff;
				font-size: 36rpx;
				line-height: 91rpx;

			}
		}
	}
</style>
