<template>
	<view class="worker">
		<image style="height:543rpx ;width: 100%;"
			src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/11/22/9afcbb340d984a55950ec7e1cbdebe36.png"></image>

		<view class="main">

			<view class="info">
				<view>
					<image v-if="workerInfo.avatarUrl==null" style="width:136rpx;height: 136rpx;"
						src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/11/22/ff24d5bb631f4c7ea2882f2d0ab668c1.png">
					</image>
					<image v-else style="width:136rpx;height:136rpx;border-radius: 50%;" :src="workerInfo.avatarUrl"></image>
				</view>
				<view class="name" style="width: 62%;">
					<view style="font-size: 36rpx;font-weight: bold;">
						{{workerInfo.workerName}}
					</view>
					<u-rate count="5" v-model="workerInfo.levelNum" inactiveColor='#fff' activeColor='#ec9322' size='35rpx'
						readonly> </u-rate>
				</view>
				<view style="display: flex;align-items: center;">
					<image
						src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/11/22/4309051174bb434fa2ad988a6153170b.png"
						style="width:100rpx;height: 100rpx;" @click.stop="showPhoneHandle()">
					</image>
				</view>
			</view>

			<!-- 专业技能 technical-->
			<view class="skill box-bg">
				<view class="title">
					工种
				</view>
				<view style="display: flex;        padding-left: 10rpx;flex-wrap: wrap;">
					<view v-for="(item,index) in workerInfo.type" :key="index" class="box">
						{{item}}
					</view>
				</view>
			</view>
		</view>
		
		
		
		<!-- 拨打电话 -->
		<u-action-sheet round='20' :closeOnClickAction='false' @select='actionSelect' :closeOnClickOverlay='false'
			:actions="actionList" :show="showPhone"></u-action-sheet>
	</view>
</template>

<script>
	import {
		callPhone
	} from '@/utils/phone.js'
	export default {
		data() {
			return {
				isshow: true,
				count: 5,
				value: 2,
				showPhone: false,
				workerInfo: {},
				actionList: [{
						name: ''
					},
					{
						name: '呼叫'
					},
					{
						name: '取消'
					},
				], //拨打电话
			};
		},
		onLoad(option) {
			console.log(JSON.parse(option.info));
			this.workerInfo = JSON.parse(option.info)
			this.workerInfo.type=this.workerInfo.workerType.split(',')
		},
		methods: {
			showPhoneHandle() {
				this.showPhone = true
				this.actionList[0].name = this.workerInfo.workerPhone
			},
			actionSelect(e) {
				console.log(e);
				if (e.name == '取消') {
					this.showPhone = false
				} else {
					// #ifdef APP-PLUS
					callPhone(this.actionList[0].name, 'app')
					// #endif
					// #ifdef MP-WEIXIN
					callPhone(this.actionList[0].name, 'wx')
					// #endif
					this.showPhone = false
				}
			},
		}
	}
</script>



<style lang="scss">
	.worker {
		position: relative;

		.main {
			position: absolute;
			top: 0;
			left: 0;
			width:100%;
			.info {
				margin: 40rpx;
				display: flex;

				.name {
					margin-left: 29rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-evenly;
					color: #3D3F3E;
				}
			}

			.title {
				font-weight: bold;
				font-size: 33rpx;
				color: #3D3F3E;
				padding: 22rpx;
			}

			.box-bg {
				background: #FFFFFF;
				box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(42, 64, 55, 0.05);
				border-radius: 14rpx;

			}

			.skill {
				margin: 40rpx;

				.box {
					padding: 5rpx 30rpx;
					height: 42rpx;
					border-radius: 7rpx;
					font-size: 25rpx;
					color: #A4D091;
					line-height: 42rpx;
					text-align: center;
					margin: 0 10rpx 20rpx 10rpx;
					background: rgba(164, 208, 145, 0.2);
					box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(42, 64, 55, 0.05);
					font-weight: bold;
				}
			}


		}
	}
</style>