<template>
	<view class="vant-table">
		<table cellspacing="0" style="width:100%" class="table">
			<tr class="acea-row row-middle row-center" style="box-sizing: border-box;">
				<th class="th acea-row row-middle row-center"
					:style="{backgroundColor: thBg,color:thColor,height: thHeight+'rpx',fontSize:thSize+'rpx',width:item.width}"
					v-for="(item, index) in option.column" :key="index">
					{{ item.label }}
				</th>
			</tr>
			<tr v-for="(item, index) in tableData" :key="index" class="list-tr">
				<td class="td acea-row row-middle row-center" v-for="(context, i) in option.column" :key="i"
					:style="{backgroundColor: tdBg,color:tdColor,height: tdHeight+'rpx',textAlign: align,fontSize:tdSize+'rpx' ,width:context.width}">
					{{ item[context.prop] }}
				</td>
			</tr>
		</table>
		<!-- <view class="table_page">
			<Pagination :pageNo="where.pageNo" :pageSize="where.pageSize" :total="total" :continues="4"
				@getPageNo="getPageNo" />
		</view> -->
	</view>
</template>
<script>
	import Pagination from "@/components/pagination.vue"
	export default {
		components: {
			Pagination
		},
		naem: "Table",
		props: {
			tableData: Array,
			option: Object,
			thBg: {
				type: String,
				default: '#FFFBE8',
			},
			thColor: {
				type: String,
				default: '#F3B23E',
			},
			thHeight: {
				type: Number,
				default: 64,
			},
			thSize: {
				type: Number,
				default: 28,
			},
			tdBg: {
				type: String,
				default: '#FFF',
			},
			tdColor: {
				type: String,
				default: '',
			},
			tdHeight: {
				type: Number,
				default: 64,
			},
			tdSize: {
				type: Number,
				default: 24,
			},
			align: {
				type: String,
				default: 'center',
			},
			where: Object,
			total: {
				type: Number,
				default: 0,
			},

		},
		created() {},
		getPageNo(pageNo) {
			//再次发请求
			this.$emit('changeTable', pageNo)
			// this.getData();
		},
	};
</script>

<style lang="scss" scoped>
	.vant-table {
		.table {
			border-radius: 10rpx;
			font-family: PingFangSC, PingFang SC;
			box-sizing: border-box;

			.th {
				// height: 1.074074rem;
				// line-height: 1.074074rem;
				background-color: #ccc;
				text-align: center;
				border-top-left-radius: 10rpx;
				border-top-right-radius: 10rpx;
				border-right: 1rpx solid #f1f1f1;
				border-bottom: 1rpx solid #f1f1f1;
				box-sizing: border-box;
			}

			.th:nth-last-child(1) {
				border-right: none;
			}

			.list-tr {
				// height: 1.074074rem;
				// line-height: 1.074074rem;
				display: flex;
			}

			.td {

				border-right: 1rpx solid #f1f1f1;
				border-bottom: 1rpx solid #f1f1f1;
				box-sizing: border-box;
			}

			.td:nth-last-of-type(1) {
				border-right: none;
			}

			.list-tr:nth-last-child(1) {
				.td {
					border-bottom: none;
				}
			}

			// .list-tr:nth-child(2n) {
			// 	.td {
			// 		background: #ccc;
			// 	}
			// }
		}
	}
</style>