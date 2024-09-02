<template>
	<view class="pages">
		<view class="card">
			<view class="card-people acea-row">
				<text>签约人：</text>
				<view class="acea-row row-middle">{{userForm.name||'-'}} ( ID：{{userForm.id||'-'}} )</view>
			</view>
			<view class="card-money ">
				<view class="card-money-top acea-row row-between-wrapper"> <text>佣金结算方式</text>
					<view>*提交后，不可修改</view>
				</view>
				<view class="card-money-top acea-row">
					<view class="acea-row ">
						<radio-group @change="radioChange" class="acea-row">
							<label style="width: 280rpx;" class="acea-row row-middle" v-for="(item, index) in radio"
								:key="item.value">
								<view style="position: relative; top:4rpx;">
									<radio :value="item.value" style="transform:scale(0.7)"
										:disabled="userForm.customerId=='null'?false:true" color="#A4D091"
										:checked="item.value == where.settlementMethod"
										@click="chageType(item,userForm.customerId)" />
								</view>
								<view>{{item.label}}</view>
							</label>
						</radio-group>
					</view>
				</view>
			</view>
			<view class="card-jie">
				<text v-if="where.settlementMethod==1">平台一次性发放推广奖励（奖励金额需与平台进行洽谈），品牌方后续下单所产生的利润你不再享受；</text>
				<text v-else>该品牌后续下单所产生的利润，您都可获得一定比例的分成奖励（当前比例：${订单分成奖励百分比}）</text>

			</view>
		</view>

		<view class="card cardPadding">

			<view class="form-row acea-row row-middle">
				<view class="form-key acea-row row-middle">业务经理 </view>
				<view class="acea-row"
					style="flex: 1; align-items: center; justify-content: flex-end;align-items: center; font-size: 28rpx;"
					@tap="handleMultiple(where.saleIds,1)">
					{{saleNames|| ''}}<text style="color: #C8C9CC;" v-if='!saleNames'>请设置平台业务经理</text>
				</view>
				<u-icon name="arrow-right" size="14" :color="saleNames?'#333':'#C8C9CC'"
					style="margin-top: 4rpx;"></u-icon>
			</view>
		</view>
		<view class="card cardPadding">
			<view class="form-row acea-row row-middle">
				<view class="form-key acea-row row-middle">*维保优惠比例 <view style="position: relative;"
						@click.stop="showBubble3 = !showBubble3">
						<u-icon name="question-circle" style="margin-left: 6rpx;"></u-icon>
						<view v-show="showBubble3" class="bubble">设置该品牌方“维保”服务类型的折扣价<br />
							品牌维保服务折扣价=订单报价金额*折扣比例</view>
					</view>
				</view>
				<!-- <u--input class="acea-con" placeholder="请输入内容" border="surround" @input="bulr"
					:value="where.maintenanceRatio"></u--input> -->
				<input class="acea-con" :value="maintenanceRatio" @input="bulr" type="digit"
					style="text-align: right;margin-right: 10rpx;" placeholder="请输入折扣百分比">%</input>
			</view>
			<view class="form-row acea-row row-middle">
				<view class="form-key acea-row row-middle">*维修优惠比例 <view style="position: relative;"
						@click.stop="showBubble2 = !showBubble2">
						<u-icon name="question-circle" style="margin-left: 6rpx;"></u-icon>
						<view v-show="showBubble2" class="bubble">设置该品牌方“维修”服务类型的折扣价 <br />
							品牌维保服务折扣价=订单报价金额*折扣比例</view>
					</view>
				</view>
				<input class="acea-con" :value="repairRatio" @input="repairRatioBulr" type="digit"
					style="text-align: right;margin-right: 10rpx;" placeholder="请输入折扣百分比">%</input>
			</view>
			<view class="form-row acea-row row-middle" style="border-bottom: none;">
				<view class="form-key acea-row row-middle">集团支付
					<view style="position: relative;" @click.stop="showBubble1 = !showBubble1">
						<u-icon name="question-circle" style="margin-left: 6rpx;"></u-icon>
						<view v-show="showBubble1" class="bubble">开启后，品牌门店报修单可让集团进行代付。反之门店报修只能有报修人员支付</view>
					</view>
				</view>
				<view class="acea-row" style=" flex: 1; justify-content: flex-end;">
					<u-switch v-model="where.groupPay" activeColor="#A4D091"></u-switch>
				</view>
			</view>
		</view>

		<view class="card cardPadding">
			<!-- // saleNames saleIds业务经理名称集合
			// serviceNames serviceIds客服人员名称集合
			// maintenanceNames maintenanceIds

			// exclusiveSale exclusiveSaleId
			// customerService customerServiceId
			// maintenanceSupervisor maintenanceSupervisorId -->
			<view class="form-row acea-row row-middle">
				<view class="form-key acea-row row-middle">业务经理 </view>
				<view class="acea-row"
					style="flex: 1; align-items: center; justify-content: flex-end;align-items: center; font-size: 28rpx;"
					@tap="handleMultiple(where.saleIds,1)">
					{{saleNames|| ''}}<text style="color: #C8C9CC;" v-if='!saleNames'>请设置平台业务经理</text>
				</view>
				<u-icon name="arrow-right" size="14" :color="saleNames?'#333':'#C8C9CC'"
					style="margin-top: 4rpx;"></u-icon>
			</view>
			<view class="form-row acea-row row-middle">
				<view class="form-key acea-row row-middle">客服人员 </view>
				<view class="acea-row"
					style="flex: 1;  justify-content: flex-end; align-items: center; font-size: 28rpx;"
					@tap="handleMultiple(where.serviceIds,2)">
					{{serviceNames|| ''}}<text style="color: #C8C9CC;" v-if='!serviceNames'>请设置平台客服专员</text>
				</view>
				<u-icon name="arrow-right" size="14" :color="serviceNames?'#333':'#C8C9CC'"
					style="margin-top: 4rpx;"></u-icon>
			</view>
			<view class="form-row acea-row row-middle" style="border-bottom: none;">
				<view class="form-key acea-row row-middle">维修班长 </view>
				<view class="acea-row"
					style="flex: 1;  justify-content: flex-end; align-items: center; font-size: 28rpx;"
					@tap="handleMultiple(where.maintenanceIds,3)">
					{{maintenanceNames}} <text style="color: #C8C9CC;" v-if='!maintenanceNames'>请设置平台维修班长</text>
				</view>
				<u-icon name="arrow-right" size="14" :color="maintenanceNames?'#333':'#C8C9CC'"
					style="margin-top: 4rpx;"></u-icon>
			</view>
		</view>
		<view class="card">

			<view class="form-row acea-row row-middle" style="border-bottom: none">
				<view class="form-key acea-row row-middle">合同编号</view>
				<input class="acea-con" v-model="where.contractNo" style="text-align: right;margin-right: 10rpx;"
					placeholder="请输入合同编号"></input>
			</view>
			<view class="card-img ">
				<text>合同内容</text>
				<view class=" acea-con upImg " style="justify-content: flex-end;margin-top: 30rpx;">
					<upLoadFile :isSignIn='true' :limit='1' :fileListt="fileListt" types='image' @getUrl='getUrl' />
				</view>
			</view>

		</view>
		<view class="content-btn  acea-row row-center row-middle" @click="saveEdit">
			<view>
				保存编辑
			</view>
		</view>
		<multiplePicker title="请选择" :show="show_1" :columns="userList" :defaultIndex="index_1"
			@confirm="confirmMultiple" @cancel="show_1 = false" @change="changeMultiple"></multiplePicker>
		<multiplePicker title="请选择" :show="show_2" :columns="userList" :defaultIndex="index_2"
			@confirm="confirmMultiple" @cancel="show_2 = false" @change="changeMultiple"></multiplePicker>
		<multiplePicker title="请选择" :show="show_3" :columns="userList" :defaultIndex="index_3"
			@confirm="confirmMultiple" @cancel="show_3 = false" @change="changeMultiple"></multiplePicker>
	</view>
</template>

<script>
	import multiplePicker from "@/components/multiple-picker/multiple-picker"
	import upLoadFile from '../../../components/uploadFile/uploadFile.vue'
	import {
		postAddContractInfoOf,
		getContractDetails,
		getUserList
	} from "@/api/brand.js"
	import storage from '@/utils/storage'

	const {
		environment
	} = require('@/config/environment')
	export default {
		components: {
			multiplePicker,
			upLoadFile,
		},
		data() {
			return {
				value1: [],
				select2: [],
				list4: [],
				showBubble1: false,
				showBubble2: false,
				showBubble3: false,
				where: {
					id: "",
					settlementMethod: 0,
					contractNo: "",
					maintenanceRatio: "",
					repairRatio: "",
					groupPay: false,
					contractImg: "",
					serviceIds: [],
					serviceNames: [],
					saleNames: [],
					serviceIds: [],
					maintenanceNames: []

				},
				maintenanceRatio: "",
				repairRatio: "",
				serviceNames: "",
				saleNames: "",
				maintenanceNames: "",
				city: "",
				isSubmit: false,
				switchValue: true,
				radio: [{
						value: '0',
						label: "按订单分成结算"
					},
					{
						value: '1',
						label: "一次性结算"
					}
				],
				fileListt: [],
				userForm: {},
				size: 10,
				instantly: false,
				count: 1,
				files: new Map(),
				option: {
					url: environment.baseURL + '/system/oss/upload',
					name: "file",
					header: {
						Authorization: "Bearer " + storage.get('AccessToken')
					}
				},
				debug: true,
				userList: [],
				data: [],
				show_1: false,
				show_2: false,
				show_3: false,
				index_1: [],
				index_2: [],
				index_3: [],
				openType: ""
			}
		},
		watch: {
			maintenanceRatio(val, oldval) {
				val = val.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
				val = val.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
				val = val.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
				val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
				if (this.maintenanceRatio < 0.01 || this.maintenanceRatio > 100) return this.$toast('比例区间0.1~100之间')
				this.$nextTick(() => {
					this.maintenanceRatio = val
				})
			},
			repairRatio(val, oldval) {
				val = val.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
				val = val.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
				val = val.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
				val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
				if (this.repairRatio < 0.01 || this.repairRatio > 100) return this.$toast('比例区间0.1~100之间')
				this.$nextTick(() => {
					this.repairRatio = val
				})
			}

		},
		created() {

		},
		onLoad(options) {
			if (options && options.id) {
				this.where.id = options.id
				this.userForm.name = options.partner
				this.userForm.id = options.partnerId
				this.userForm.customerId = options.customerId
				if (options.customerId != 'null') {
					this.getInfo()
				}
			}
			const pages = uni.$u.pages()
			this.isSubmit = pages.some(p => {
				return p.route.includes('submitOrder') || p.route.includes('goosDetails')
			})
			this.getList()
		},
		methods: {
			bulr(e) {
				this.maintenanceRatio = e.target.value;
			},
			repairRatioBulr(e) {
				this.repairRatio = e.target.value;
			},
			handleInput(e) {
				this.$refs.selectRef4.open()
				//这里模拟接口访问获取数据
				setTimeout(() => {
					this.list4 = [{
						name: '选项一'
					}, {
						name: '选项二'
					}]
				}, 2000)
			},
			//获取工作人员
			handleMultiple(val, type) {
				this.openType = type
				console.log(type, "type");
				switch (type) {
					case 1: {
						this.index_1 = val || [];
						this.show_1 = true
						break;
					}
					case 2: {
						this.index_2 = val || [];
						this.show_2 = true
						break;
					}
					case 3: {
						this.index_3 = val || [];
						this.show_3 = true
						break;
					}
				}
			},
			confirmMultiple(e) {
				console.log(this.openType, "100");
				console.log(e, "200");
				switch (this.openType) {
					case 1: {
						let temp = [];
						e.selected.forEach(item => {
							temp.push(item.label);
						})
						this.saleNames = temp.toString()
						this.where.saleNames = temp;
						this.where.saleIds = e.value;
						this.show_1 = false
						break;
					}
					case 2: {
						let temp = [];
						e.selected.forEach(item => {
							temp.push(item.label);
						})
						this.serviceNames = temp.toString()
						this.where.serviceNames = temp;
						this.where.serviceIds = e.value;
						this.show_2 = false
						break;
					}
					case 3: {
						let temp = [];
						e.selected.forEach(item => {
							temp.push(item.label);
						})
						this.maintenanceNames = temp.toString()
						this.where.maintenanceNames = temp;
						this.where.maintenanceIds = e.value || [];
						this.show_3 = false
						break;
					}
				}
			},
			changeMultiple(e) {
				console.log(e, "3");
			},
			getList() {
				getUserList().then((res) => {
					this.userList = res.data;
					let newArr = []
					this.userList.map(item => {
						let _item = JSON.parse(JSON.stringify(item).replace('userName', 'label').replace(
							'userId', 'value'))
						newArr.push(_item)
					})
					this.userList = newArr
					// this.userSelectMultiple = true
				})

			},

			getInfo() {
				getContractDetails(this.where.id).then(res => {
					this.info = res.data
					let data = res.data
					// saleNames saleIds业务经理名称集合
					// serviceNames serviceIds客服人员名称集合
					// maintenanceNames maintenanceIds

					// exclusiveSale exclusiveSaleId
					// customerService customerServiceId
					// maintenanceSupervisor maintenanceSupervisorId

					this.where = {
						id: this.where.id,
						settlementMethod: data.settlementMethod,
						contractNo: data.contractNo,
						maintenanceRatio: data.maintenanceRatio,
						repairRatio: data.repairRatio,
						groupPay: data.groupPay,
						contractImg: data.contractImg,
						serviceNames: data.customerService ? [...data.customerService.split(',')] : [],
						serviceIds: data.customerServiceId ? [...data.customerServiceId.split(',')] : [],
						saleNames: data.exclusiveSale ? [...data.exclusiveSale.split(',')] : [],
						saleIds: data.exclusiveSaleId ? [...data.exclusiveSaleId.split(',')] : [],
						maintenanceIds: data.maintenanceSupervisorId ? [...data.maintenanceSupervisorId.split(
							',')] : [],
						maintenanceNames: data.maintenanceSupervisor ? [...data.maintenanceSupervisor.split(
							',')] : [],
					}
					this.maintenanceRatio = data.maintenanceRatio || ''
					this.repairRatio = data.repairRatio || ''
					this.serviceNames = data.customerService
					this.saleNames = data.exclusiveSale
					this.maintenanceNames = data.maintenanceSupervisor
					if (data.contractImg) {
						this.fileListt = data.contractImg.split(',')
					}
				})
			},

			addressHandle(e) {
				this.city = e.value1.toString().replace(/,/g, "/")
			},
			radioChange(e) {
				this.where.settlementMethod = e.detail.value
				console.log(e.detail.value, "额");
			},
			getUrl(url) {
				console.log(url.urls.toString(), "url.urls");
				this.where.contractImg = url.urls.toString()
				console.log(this.where.contractImg, "url.	this.where.contractImg");
				this.fileListt = url.urls
			},
			chageType(item, no) {
				if (no) return
				this.where.settlementMethod = item.value
			},
			saveEdit() {
				this.where.maintenanceRatio = this.maintenanceRatio
				this.where.repairRatio = this.repairRatio
				if (!this.where.maintenanceRatio || !this.where.repairRatio) return this.$toast('请填写优惠比例')
				if (this.where.maintenanceRatio < 0.01 || this.where.maintenanceRatio > 100) return this.$toast(
					'比例区间填0.1~100之间')
				if (this.where.repairRatio < 0.01 || this.where.repairRatio > 100) return this.$toast(
					'比例区间填0.1~100之间')
				console.log(this.where, "this.where");
				postAddContractInfoOf(this.where).then(res => {
					this.$toast('设置成功')
					// uni.$emit("listOnshow", true)
					setTimeout(() => {
						this.$jump(-1)
					}, 1000)
				})
			},
			handleClick2() {
				this.$refs.selectRef2.open()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pages {
		height: 100%;
		padding: 16rpx 32rpx 50rpx 32rpx;
		position: relative;

		.card {
			background-color: #fff;
			border-radius: 16rpx;
			font-size: 28rpx;
			color: #323233;
			margin-bottom: 20rpx;

			&-img {
				padding: 30rpx 24rpx;
			}

			&-people {
				height: 128rpx;
				line-height: 128rpx;
				padding: 0 24rpx;

				text {
					color: #646566;
				}

				view {
					margin-left: 22rpx;
				}
			}

			&-money {
				height: 166rpx;
				border-top: 1rpx solid #EBEDF0;
				border-bottom: 1rpx solid #EBEDF0;
				padding: 24rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				box-sizing: border-box;

				&-top {
					text {
						color: #646566;
					}

					view {
						font-size: 24rpx;
					}
				}
			}

			&-jie {
				font-size: 24rpx;
				color: #999999;
				padding: 22rpx 22rpx 30rpx;
			}
		}

		.cardPadding {
			padding: 0 24rpx;

			.form-row {
				padding: 26rpx 0;

				.form-key {
					width: 260rpx;
				}
			}
		}
	}

	/deep/ .uni-input-placeholder {
		color: #C8C9CC;
		font-size: 28rpx;
	}

	.upImg {
		height: 160rpx;
		margin-top: 40rpx;
		margin-left: 10rpx;
	}

	.content-btn {

		width: 100%;
		height: 158rpx;
		margin-top: 30rpx;

		view {
			width: 100%;
			height: 88rpx;
			background: #A4D091;
			border-radius: 8rpx;
			font-family: PingFangSC, PingFang SC;
			font-weight: 500;
			font-size: 32rpx;
			color: #FFFFFF;
			text-align: center;
			line-height: 88rpx;
		}



	}

	.bubble {
		width: 360rpx;
		position: absolute;
		bottom: 50rpx;
		left: -146rpx;
		background-color: rgba(0, 0, 0, 0.8);
		padding: 10rpx 20rpx;
		border-radius: 20rpx;
		color: #fff;

		&::after {
			content: '';
			display: block;
			width: 0;
			height: 0;
			border: 10rpx solid transparent;
			border-top-color: #000;
			position: absolute;
			bottom: -18rpx;
			right: 230rpx;
		}
	}
</style>