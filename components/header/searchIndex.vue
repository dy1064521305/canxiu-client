<template>
	<view>
		<view class="header" :style="{zIndex, background: bg, backgroundImage: bgImg}">
			<status-bar></status-bar>
			<!-- #ifdef MP -->
			<view class="search">
				<!-- #endif -->
				<!-- #ifndef MP -->
				<view class="search acea-row row-middle">
					<!-- #endif -->
					<view class="acea-row row-middle" :style="{paddingTop: mtop, width: '100%'}">
						<text v-if="!noBack" class="iconfont icon-zuo" @click="$jump(-1)"></text>
						<view v-else style="width: 15rpx;"></view>
						<view v-if="readOnly" class="search-bar flex-con acea-row row-middle" :style="{height: mheight,border:mborder}"
							@click="$emit('tap-input')">
							<text class="iconfont icon-search"></text>
							<text class="placeholder-cls flex-con">{{placeholder}}</text>
							<text v-if="searchBtnText" class="search-btn">{{searchBtnText}}</text>
						</view>
						<view v-else class="search-bar flex-con acea-row row-middle" :style="{height: mheight}">
							<text class="iconfont icon-search"></text>
							<input class="flex-con" type="text" :focus="focus" v-model="keyword"
								:placeholder="placeholder" @confirm="confirm"></input>
							<text v-show="keyword" class="iconfont icon-qingchu" @click="clear"></text>
							<text v-if="searchBtnText" class="search-btn" @click="confirm">{{searchBtnText}}</text>
						</view>
						<view :style="{width: mwith}"></view>
					</view>
				</view>
				<slot></slot>
			</view>
			<status-bar v-if="!noBlank"></status-bar>
			<view v-if="!noBlank" class="header-blank"></view>
		</view>
</template>

<script>
	export default {
		name: 'HeaderSearchIndex',
		props: {
			focus: {
				type: Boolean,
				default: false,
			},
			placeholder: String,
			noBlank: {
				type: Boolean,
				default: false,
			},
			noBack: {
				type: Boolean,
				default: false,
			},
			readOnly: {
				type: Boolean,
				default: false,
			},
			zIndex: {
				type: Number,
				default: 99,
			},
			q: {
				type: String,
				default: '',
			},
			bg: {
				type: String,
				default: '',
			},
			bgImg: {
				type: String,
				default: '',
			},
			searchBtnText: {
				type: String,
				default: '搜索',
			},
			mborder:{
				type: String,
				default: '',
			}
		},
		data() {
			return {
				keyword: '',
				mwith: 0,
				mheight: '32px',
				mtop: 0
			}
		},
		watch: {
			q(nVal) {
				this.keyword = nVal;
			},
			keyword(nVal) {
				this.$emit('input', nVal);
			}
		},
		created() {
			// #ifdef MP
			const app = getApp();
			const m = app.globalData.menuRect;

			this.mwith = m.width + 'px';
			this.mheight = m.height + 'px';
			let top = m.top - this.$store.state.safeAreaTop;
			this.mtop = top + 'px';
			// #endif	

			if (this.q) {
				this.keyword = this.q;
			}
		},
		methods: {
			confirm() {
				this.$emit('search', this.keyword);
			},
			clear() {
				this.keyword = '';
				this.$emit('clear');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		width: 100%;
		box-sizing: border-box;
		background-color: #fff;
		background-repeat: no-repeat;
		background-size: 100% auto;
		color: #000;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;

		.search {
			height: 88rpx;
			padding: 0 20rpx 0 10rpx;

			.icon-zuo {
				display: inline-block;
				font-size: 46rpx;
				margin-right: 20rpx;
			}

			.search-bar {
				height: 64rpx;
				font-size: 28rpx;
				color: #303133;
				border: 1rpx solid $color-theme;
				border-radius: 32rpx;
				padding: 0 4rpx 1rpx 20rpx;

				input {
					margin: 0 20rpx;
					font-size: 1em;
				}

				.iconfont {
					font-size: 32rpx;
					color: #ababab;
				}

				.icon-search {
					font-size: 28rpx;
					color: #c1c5cd;
					margin-right: 12rpx;
				}

				.search-btn {
					display: inline-block;
					min-width: 80rpx;
					height: 56rpx;
					font-size: 28rpx;
					line-height: 56rpx;
					text-align: center;
					color: #fff;
					background: -webkit-linear-gradient(left, #FF7700, #FF2A00);
					margin-left: 16rpx;
					padding: 0 20rpx;
					border-radius: 28rpx;
				}
			}

			.placeholder-cls {
				color: #ababab;
				font-size: 24rpx;
			}
		}
	}

	.header-blank {
		height: 88rpx;
	}
</style>