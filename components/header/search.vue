<template>
	<view>
		<view class="header" :style="{zIndex, background: bg, backgroundImage: bgImg}">
			<status-bar></status-bar>
			<view class="search acea-row row-middle">
				<view class="acea-con acea-row row-middle" :style="{paddingTop: mtop, width: '100%'}">
					<text v-if="!noBack" class="iconfont icon-zuo" @click="customBack"></text>
					<view v-if="readOnly" class="search-bar flex-con acea-row row-middle"
						:style="{height: mheight,background:seachBg}" @click="$emit('tap-input')">
						<text class="iconfont icon-search"></text>
						<text class="placeholder-cls flex-con">{{placeholder}}</text>
					</view>
					<view v-else class="search-bar flex-con acea-row row-middle"
						:style="{height: mheight,background:seachBg}">
						<text class="iconfont icon-search"></text>
						<input class="flex-con" type="text" :focus="focus" v-model="keyword" :placeholder="placeholder"
							@confirm="confirm"></input>
						<text v-show="keyword" class="iconfont icon-qingchu" @click="clear"></text>
						<text class="search_click" v-if="btnShow" @click="confirm">搜索</text>
					</view>
					<view :style="{width: mwith, textAlign: 'right'}">
						<!-- #ifndef MP -->
						<slot name="right"></slot>
						<!-- #endif -->
					</view>
				</view>
			</view>
		</view>
		<status-bar v-if="!noBlank"></status-bar>
		<view v-if="!noBlank" class="header-blank"></view>
	</view>
</template>

<script>
	export default {
		name: 'HeaderSearch',
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
			btnShow: {
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
			seachBg: {
				type: String,
				default: '',
			},
			bgImg: {
				type: String,
				default: '',
			},
			isBack: {
				type: Boolean,
				default: true,
			}
		},
		data() {
			return {
				keyword: '',
				mwith: '',
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
			// $jump(-1)
			customBack() {
				if (this.isBack) {
					this.$jump(-1)
				} else {
					this.$emit('toBack')
				}
			},
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
				background: #F5F5F5;
				border-radius: 32rpx;
				padding: 0 20rpx;

				input {
					margin: 0 20rpx;
					font-size: 1em;
				}

				.iconfont {
					font-size: 32rpx;
					color: #C0C4CC;
				}

				.icon-search {
					margin-right: 12rpx;
					color: #666666;
				}

				.search_click {
					display: inline-block;
					width: 120rpx;
					height: 56rpx;
					background: linear-gradient(116deg, #FF7700 0%, #FF2A00 100%);
					text-align: center;
					color: #fff;
					margin-right: -16rpx;
					margin-left: 16rpx;
					border-radius: 28rpx;
					font-size: 28rpx;
					line-height: 56rpx;
				}
			}

			.placeholder-cls {
				color: #C0C4CC;
			}
		}
	}

	.header-blank {
		height: 88rpx;
	}
</style>