<template>
	<view class="pages" :style="{height:clientHeight+'px'}">
		<view class="">
			<view class="banner">
				<!-- <view class="fix acea-row row-middle" v-if="!id">
					<image src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/05/0a9054f532eb4c39a75880bece1a8555.png"
						mode=""></image>
					${合伙人真实姓名}邀请你入驻餐修平台！
				</view> -->
			</view>
			<view class="content">
				<view class="content-mess">
					<view class="form-row acea-row row-middle">
						<text class="form-key">集团公司</text>
						<view class="acea-row">
							<radio-group @change="radioChange" class="acea-row">
								<label style="width: 180rpx;" class="acea-row" v-for="(item, index) in radio"
									:key="item.value">
									<view>
										<radio :value="item.value" style="transform:scale(0.7)" color="#A4D091"
											:checked="item.value == where.isGroup" />
									</view>
									<view>{{item.label}}</view>
								</label>
							</radio-group>
							<!-- <label class="radio">
								<radio value="r1" style="transform:scale(0.7)" color="#A4D091" checked="true" />选中
							</label>
							<label class="radio">
								<radio value="r2" style="transform:scale(0.7)" color="#A4D091" />未选中
							</label> -->
						</view>
					</view>
					<view class="form-row acea-row row-middle" v-if="where.isGroup=='y'">
						<text class="form-key">集团名称</text>
						<input class="acea-con" v-model="where.groupName" style="text-align: right;margin-right: 10rpx;"
							placeholder="请输入"></input>
					</view>
					<view class="form-row acea-row row-middle">
						<text class="form-key">联系人</text>
						<input class="acea-con" v-model="where.personName"
							style="text-align: right;margin-right: 10rpx;" placeholder="请输入"></input>
					</view>
					<view class="form-row acea-row row-middle">
						<text class="form-key">联系电话</text>
						<input class="acea-con" v-model="where.personPhone"
							style="text-align: right;margin-right: 10rpx;" placeholder="请输入"></input>
					</view>
					<view class="form-row acea-row row-middle" style="border-bottom: none;">
						<text class="form-key">公司信息</text>

						<text class="acea-con" style="color: #A4D091; text-align: right;font-size: 28rpx;" @click="add"
							v-if="where.companyList.length<=0">+添加公司</text>
					</view>
					<view class="addCompany" v-for="(item,index) in where.companyList">
						<view class="form-row acea-row row-middle" style="background: rgba(164,208,145,0.08);">
							<text class="form-key">公司名称</text>
							<input class="acea-con" style="text-align: right;margin-right: 10rpx;" placeholder="请输入"
								v-model="item.companyName"></input>
						</view>
						<view class="form-row acea-row row-middle">
							<text class="form-key">品牌名称</text>
							<input class="acea-con" style="text-align: right;margin-right: 10rpx;" placeholder="请输入"
								v-model="item.brandName"></input>
						</view>
						<view class="form-row acea-row row-middle" style="height: 160rpx;">
							<text class="form-key" style="margin-bottom: 100rpx;">品牌logo</text>
							<view class=" acea-con upImg " style="justify-content: flex-end;">
								<upLoadFile :isSignIn='true' :limit='1' :fileListt="fileListt" types='image'
									@getUrl='getUrl' />
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="content-btn acea-row row-center row-middle" @click="submit">
			确认提交
		</view>
	</view>
</template>

<script>
	import pickers from "@/components/ming-picker/ming-picker.vue"
	import upLoadFile from '../../../components/uploadFile/uploadFile.vue'
	import {
		postPartnerBrand
	} from "@/api/brand.js"

	import {
		isEmpty,
		isPhone
	} from '@/utils/verify.js'
	export default {
		components: {
			pickers,
			upLoadFile
		},
		data() {
			return {
				city: "",
				isSubmit: false,
				addCompanyShow: false,
				radio: [{
						value: 'n',
						label: "否"
					},
					{
						value: 'y',
						label: "是"
					}
				],
				fileListt: [],
				imgUrl: "",

				where: {
					partnerId: "",
					isGroup: "n",
					groupName: "",
					personName: "",
					personPhone: "",
					companyList: []
				},
				clientHeight: ""
			}
		},
		onLoad(options) {
			if (options && options.id) {
				this.where.partnerId = options.id
			}
			const pages = uni.$u.pages();
			this.isSubmit = pages.some(p => {
				return p.route.includes('submitOrder') || p.route.includes('goosDetails')
			})
			this.getClineHeight()
		},
		methods: {
			addressHandle(e) {
				this.city = e.value1.toString().replace(/,/g, "/")
			},
			radioChange(e) {
				this.where.isGroup = e.detail.value
				console.log(e.detail.value, "额");
			},
			getUrl(url) {
				let urlImg = url.urls
				this.where.companyList[0].brandLog = url.urls.toString()
			},
			add() {

				this.where.companyList = [{
					companyName: "",
					brandName: "",
					brandLog: ""
				}]
			},
			submit() {
				let where = this.where
				if (!where.personName) return this.$toast('联系人不能为空')
				if (isEmpty(where.personPhone)) {
					uni.$u.toast('请输入手机号')
					return false
				}
				if (!isPhone(where.personPhone)) {
					uni.$u.toast('请输入正确的手机号')
					return false
				}
				if (!where.companyList[0] || !where.companyList[0].brandName) return this.$toast('品牌名称不能为空')
				postPartnerBrand(this.where).then(res => {
					this.$toast('操作成功')
					this.where = {
						partnerId: this.where.partnerId,
						isGroup: "n",
						groupName: "",
						personName: "",
						personPhone: "",
						companyList: [{
							companyName: "",
							brandName: "",
							brandLog: ""
						}],
					}
					this.fileListt = []
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
		}
	}
</script>

<style lang="scss" scoped>
	.pages {
		// min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background-color: #fff;
		position: relative;

		.banner {
			height: 380rpx;
			position: relative;
			background: url('https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/09/63428c7066d641feba3d0d36e1069896.jpg') no-repeat;
			background-size: 100% 100%;

			.fix {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 72rpx;
				line-height: 72rpx;
				background: rgba(255, 251, 242, 0.72);
				font-size: 28rpx;
				color: #FF991C;
				padding: 0 22rpx;
				box-sizing: border-box;

				image {
					width: 34rpx;
					height: 32rpx;
					margin-right: 8rpx;
				}
			}
		}

		.content {
			border: 16rpx 16rpx 0 0;
			margin: 26rpx 0 0rpx 0;

			&-mess {
				padding: 0 30rpx 200rpx;

				.form-row:nth-last-child(1) {
					border-bottom: none;
				}

				.form-key {
					width: 180rpx;
				}

				.addCompany {
					width: 702rpx;
					border-radius: 10rpx;
					margin-top: 10rpx;

					.form-row {
						background-color: rgba(164, 208, 145, 0.08);
						height: 86rpx;
						padding: 0 40rpx;
					}
				}
			}
		}

		.content-btn {
			margin: 0rpx auto 70rpx;
			// margin: 120rpx 0 0 64rpx;
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
		color: #C8C9CC;
		font-size: 28rpx;
	}

	.upImg {

		height: 160rpx;
		margin-top: 20rpx;
		display: flex;
		justify-content: center;

		.bg-img {
			justify-content: flex-end !important;
			margin-top: 20rpx;
			display: flex;
		}


	}
</style>