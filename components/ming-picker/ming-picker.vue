<template>
	<view>
		<picker class="address-picker" mode="multiSelector" :range="[province, city, area]" :value="value"
			@change="changeHandler" @cancel="close" @columnchange="columnchange">
			<slot></slot>
		</picker>
	</view>
</template>

<script>
	import addressData from '@/utils/areaa.js';
	export default {
		props: {
			defaultAddress: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				province: addressData.map(it => it.name),
				city: addressData[0].children.map(it => it.name),
				area: addressData[0].children[0].children.map(it => it.name),
				value: [0, 0, 0]
			};
		},
		created() {
			this.onAttached();
		},
		methods: {
			onAttached() {
				const address = this.defaultAddress;
				if (address[0]) {
					// 如果有初始值，则需要初始地址
					const filter = (index) => (index > -1 ? index : 0);
					const currentProvince = filter(addressData.findIndex(it => it.name === address[0]));
					const currentCity = filter(addressData[currentProvince].children.findIndex(it => it.name === address[
						1]));
					const currentArea = filter(addressData[currentProvince].children[currentCity].children.findIndex(it =>
						it.name === address[2]));
					const city = addressData[currentProvince].children;
					const area = addressData[currentProvince].children[currentCity].children;
					this.value = [currentProvince, currentCity, currentArea];
					this.city = city.map(it => it.name);
					this.area = area.map(it => it.name);
					this.address = [addressData[currentProvince].name, city[currentCity].name, area[currentArea].name];
				}
			},
			changeHandler() {
				let value1=this.getAddress(...this.value),
				value=this.getCode(...this.value)
				this.$emit("address", {
					value1,
					value,
					data:{
						[value[0]]:value[0],
						[value[1]]:value[1],
						[value[2]]:value[2],
					}
				})
			},
			close() {
				this.$emit("close", {})
			},
			getAddress(p, c, a) {
				const {
					province,
					city = [],
					area = []
				} = this;
				return [province[p], city[c] || '', area[a] || ''];
			},
			getCode(p, c, a) {
				let province=addressData.map(it => it.name),city=addressData[p].children.map(it => it.name),area=addressData[p].children[c].children.map(it => it.name)
				return [province[p], city[c] || 0, area[a] || 0];
			},
			columnchange(e) {
				// wx.showLoading({ mask: true });
				const {
					column,
					value: index
				} = e.detail;
				if (column === 0) {
					// 省份变了
					this.city = addressData[index].children.map(it => it.name);
					this.area = addressData[index].children[0].children.map(it => it.name);
					this.value = [index, 0, 0];
				} else if (column === 1) {
					// 城市变了
					const currentProvince = this.value[0];
					this.area = addressData[currentProvince].children[index].children.map(it => it.name);
					this.value = [currentProvince, index, 0];
				} else {
					const value = this.value;
					value[2] = index;
					this.value = value;
				}
			}
		}
	}
</script>

<style scoped>

</style>
