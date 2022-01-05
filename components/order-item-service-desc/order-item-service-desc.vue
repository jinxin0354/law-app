<template>
	<view class="od-item">
		<view class="item-tip">服务范围</view>
		<view class="item-right" @click="isTxtOne = !isTxtOne">
			<view class="item-txt" :class="{ 'txt-one': isTxtOne }">{{ area_desc}}</view>
			<view class="item-nav-down" :class="{ rotate: isTxtOne == false }">
				<image src="@/static/img/order-arrow-down.png" mode="aspectFit"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['info'],
		data() {
			return {
				isTxtOne: true, //显示一行
				area_desc: ''
			};
		},
		created() {
			this.area_desc = this.info.product.area.area_desc;
			this.$bus.$on('changeDesc', res => {
				this.area_desc = res.area_desc;
			})
		},
		methods: {}
	};
</script>

<style lang="scss">
</style>
