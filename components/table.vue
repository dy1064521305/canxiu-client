<template>
	<view class="vant-table">
		<table cellspacing="0" style="width:100%" class="table">
			<tr>
				<th class="th"
					:style="{backgroundColor: thBg,color:thColor,height: thHeight,fontSize:thSize,width:item.width}"
					v-for="(item, index) in option.column" :key="index">
					{{ item.label }}
				</th>
			</tr>
			<tr v-for="(item, index) in tableData" :key="index" class="list-tr">
				<td class="td"
					:style="{backgroundColor: tdBg,color:tdColor,height: tdHeight,textAlign: align,fontSize:tdSize}"
					v-for="(context, i) in option.column" :key="i">{{ item[context.prop] }}</td>
			</tr>
		</table>
	</view>
</template>
<script>
	export default {
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
				default: 64 + 'rpx',
			},
			thSize: {
				type: Number,
				default: 28 + 'rpx',
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
				default: 64 + 'rpx',
			},
			tdSize: {
				type: Number,
				default: 24 + 'rpx',
			},
			align: {
				type: String,
				default: 'center',
			}

		},
		created() {
			console.log(this.tableData, "tableData");
		}
	};
</script>

<style lang="scss" scoped>
	.vant-table {
		.table {
			border-radius: 10rpx;
			font-family: PingFangSC, PingFang SC;

			.th {
				height: 1.074074rem;
				line-height: 1.074074rem;
				background-color: #ccc;
				text-align: center;
				border-top-left-radius: 10rpx;
				border-top-right-radius: 10rpx;
				border-right: 1rpx solid #f1f1f1;
				border-bottom: 1rpx solid #f1f1f1;
			}

			.th:nth-last-child(1) {
				border-right: none;
			}

			.list-tr {
				height: 1.074074rem;
				line-height: 1.074074rem;


			}

			.td {
				border-right: 1rpx solid #f1f1f1;
				border-bottom: 1rpx solid #f1f1f1;
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