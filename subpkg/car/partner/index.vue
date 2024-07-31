<template>
	<view class="pages">
		<view class="banner">
			<image src="https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2024/07/09/63428c7066d641feba3d0d36e1069896.jpg"
				mode=""></image>
		</view>
		<view class="content">
			<view class="content-mess">
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
							请选择您当前的城市 <u-icon color=" rgb(192, 196, 204)" name="arrow-right" style="margin-left: 4rpx;"
								:size="14"></u-icon></view>
					</pickers>
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
				}
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pages {
		min-height: 100vh;
		background-color: #fff;

		.banner {
			height: 390rpx;
			background-color: bisque;

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
			margin: 500rpx auto 0;
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