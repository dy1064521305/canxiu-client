<template>
	<view class="inviteRewards">
		<z-paging ref="paging" v-model="dataList" @query="getList" @onRefresh='refresh'>
			<view slot='top'>
				<u-navbar placeholder>
					<view class="u-nav-slot" slot="left">
						<u-icon name="arrow-left" size="19" @click="back"></u-icon>
					</view>
					<!-- 	<view style="display: flex; align-items: center;" slot="center" @click="showAction=true">
						{{type}}<u-icon style="margin-left: 10rpx;" name="arrow-down-fill" size="10"></u-icon>
					</view> -->
					<view class="two_change" style="display: flex; align-items: center;" slot="center">
						<text v-for="(item) in typeTab" :key="item.id" :class="{on:type==item.label}"
							@click="typeClick(item)">{{item.label}}</text>
					</view>
				</u-navbar>
			</view>
		</z-paging>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: '推广奖励',
				typeTab: [{
						id: 0,
						label: "推广奖励"
					},
					{
						id: 1,
						label: "活动奖励"
					},
				],
			}
		}
	}
</script>

<style lang="scss" scoped>
	.inviteRewards {
		.two_change {
			font-family: PingFangSC, PingFang SC;
			font-weight: bold;
			font-size: 32rpx;
			color: #212121;

			text {
				position: relative;
				margin-right: 15rpx;

				&.on {
					position: relative;
				}

				&.on::after {
					content: "";
					position: absolute;
					height: 6rpx;
					background: #A4D091;
					border-radius: 3rpx;
					width: 100%;
					bottom: -14rpx;
					left: 0;

				}
			}

			text:nth-last-child(1) {
				margin-right: 0rpx;
				margin-left: 15rpx;
			}
		}
	}
</style>