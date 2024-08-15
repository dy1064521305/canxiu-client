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
	export default {
		components: {
			Table
		},
		data() {
			return {
				tableData: [{
					closedAccount: 0,
					givePrice: 0,
					noAccount: 0,
					region: "浙江省-杭州市-拱墅区",
					totalPrice: 0,
				}],
				//th
				option: {
					column: [{
							label: '运营区域',
							prop: 'region',
							width: "40%"
						},
						{
							label: '补贴比例',
							prop: 'closedAccount',
							width: "30%"
						},
						{
							label: '添加时间',
							prop: 'noAccount',
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
					this.list = res.data
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