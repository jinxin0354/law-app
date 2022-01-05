<template>
	<view class="ad">
		{{ad}}
	</view>
</template>

<script>
export default {
	data() {
		return {
			ad:uni.getStorageSync('ad')
		};
	},
	created() {
		
	},
	methods: {}
};
</script>

<style lang="scss">
.ad {
	text-align: center;
	color: #AAA;
	height: 80rpx;
	line-height: 80rpx;
}
</style>
