<template>
	<view class="card">
		<view class="">
			<view :style="{'display':'flex','height':height+'rpx'}">
				<view v-if="info.img.length==0||info.img[0]==''" :style="{'width':height+'rpx'}" class="no-img">
					<img crossorigin="anonymous" style="width:110rpx ;height: 77rpx;"
						src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/12/11/0cee8335a9f94b82aab54ebab36f524b.png"
						mode=""></img>
					<text>暂无图片</text>
				</view>
				<view v-else style="position: relative;">
					<view v-if="type=='myOrder'"
						:class="!info.projectType||info.projectType==0?'weixiu':info.projectType==1?'baoyang':''">
						{{!info.projectType||info.projectType==0?'维修':info.projectType==1?'维保':''}}
					</view>
					<img crossorigin="anonymous" :style="{'width':height+'rpx','height':'100%','border-radius':'11rpx'}" :src="info.img[0]">
					</img>
					<!-- 	<view class="weixiu" >
					维修
				</view> -->
				</view>

				<view
					style="flex: 1;display: flex;flex-direction: column; padding-left:20rpx;justify-content: space-between;height: 100%;font-size: 25rpx;">
					<view style="display: flex;">
						<view style="width: 80%;color: #3D3F3E;font-weight: bold;font-size: 35rpx;">
							{{info.productName}}
						</view>
						<view style="width: 20%;color: #A5A7A7;text-align: end;">
							x{{info.projectNumber}}
						</view>
					</view>
					<view style="display: flex;">
						<view style="width: 80%;color: #A5A7A7;">
							{{info.typeName}}
						</view>
						<view  style="width: 20%;text-align: end;color: #EC5722;">
							¥{{type!='myOrder'?info.price:info.discountPrice}}
						</view>
							
					</view>
					<view style="display: flex;justify-content: space-between;">
							<text style="color: #A5A7A7;">工时：{{info.projectHours}}小时</text>
							<text v-if="type=='repair'"
								style="font-size: 30rpx;color: #EC5722;">服务费：¥{{Number(info.price)*Number(info.projectNumber)}}</text>
					</view>
				
				</view>
			</view>
		</view>
		<view v-if="illustrate!=null&&type!='repair'" style="margin-left:149rpx;font-size: 25rpx;color:#A5A7A7;">
			{{illustrate}}
		</view>
		<view v-if="type!='myOrder'&&type!='repair'" style="text-align: end;margin-top: 7rpx;">
			<text 
				style="font-size: 30rpx;color: #EC5722;">服务费：¥{{Number(info.price)*Number(info.projectNumber)}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			pro: {
				type: Object
			},
			type: {
				type: String,
				default: ''
			},
			height:{
				type: Number,
				default: 130
			}
		},

		data() {
			return {
				info: {},
				illustrate: undefined
			};
		},
		created() {
		 console.log(this.pro);
			this.info = this.pro
			this.info.productName = this.pro.productName ? this.pro.productName : this.pro.serviceProductName
			this.info.projectHours = this.pro.projectHours ? this.pro.projectHours : this.pro.serviceTime
			this.info.typeName = this.pro.typeName ? this.pro.typeName : this.pro.serviceTypeName
			this.info.price = this.info.discountPrice ? this.info.discountPrice : this.info.projectPrice
			this.illustrate = this.info.illustrate ? this.info.illustrate : this.info.remark
			//console.log(this.pro);
		}

	}
</script>

<style lang="scss" scoped>
	.card {
		// .weixiu {
		// 	color: #fff;
		// 	position: absolute;
		// 	top: 0;
		// 	font-size: 26rpx;
		// 	background: #1890ff;
		// 	padding: 0rpx 8rpx;
		// }

		.weixiu,
		.baoyang {
			width: 65rpx;
			height: 36rpx;
			background: #E1E9FC;
			border-radius: 0rpx 7rpx 7rpx 0rpx;
			font-size: 22rpx;
			color: #383C45;
			line-height: 36rpx;
			text-align: center;
			position: absolute;
			top: 13rpx;
			z-index: 100;
		}

		.weixiu {
			background: #E1E9FC;
		}

		.baoyang {
			background: #E6F1EB;
		}

		.no-img {
			// width: 170rpx;
			height: 100%;
			background: #F4F4F4;
			border-radius: 11rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			// margin: 18rpx;

			text {
				font-size: 22rpx;
				color: #A4D091;
			}
		}
	}
</style>