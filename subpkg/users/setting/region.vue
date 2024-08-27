<template>
	<view class="page">
		<Table :tableData='tableData' :option="option"></Table>
	</view>
</template>

<script>
	import
	Table
	from '@/components/table.vue'
	import {
		getPartnerRegion
	} from "@/api/appUpdate.js"
	import storage from '@/utils/storage'
	import formatter from '@/utils/formatter.js'
	export default {
		components: {
			Table
		},
		data() {
			return {
				tableData: [],
				//th
				option: {
					column: [{
							label: '运营区域',
							prop: 'region',
							width: "40%"
						},
						{
							label: '补贴比例',
							prop: 'bonusRatio',
							width: "30%"
						},
						{
							label: '添加时间',
							prop: 'createTime',
							width: "30%"
						}

					]
				},

			}
		},
		onLoad() {
			this.getTable()
		},
		methods: {
			getTable() {
				getPartnerRegion(storage.get('ClientId')).then(res => {
					this.tableData = res.rows
					this.tableData.forEach((item) => {
						item.bonusRatio = item.bonusRatio + '%'
						item.createTime = formatter.formatDate(item.createTime, 'yyyy-MM-dd') || '-'
					})
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.page {
		min-height: 100vh;
		// background-color: #fff;
		padding: 20rpx 20rpx 40rpx;
	}
</style>