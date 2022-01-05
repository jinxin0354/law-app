<template>
	<view>
		<u-cell-item icon="setting-fill" title="律师" value="前往认证" @click="aa"></u-cell-item>
		<u-cell-item icon="setting-fill" title="投资人" value="前往认证" @click="bb"></u-cell-item>
		<u-cell-item icon="setting-fill" title="法务专员" value="前往认证" @click="cc"></u-cell-item>
		<u-cell-item icon="setting-fill" title="诉讼案例文件"  @click="dd"></u-cell-item>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			aa(){
				uni.navigateTo({
					url:'/pages/service/lawyerAuth/lawyerAuth'
				})
			},
			bb(){
				uni.navigateTo({
					url:'/pages/service/investors/investors'
				})
			},
			cc(){
				uni.navigateTo({
					url:'/pages/service/legalAffairs/legalAffairs'
				})
			},
			dd(){
				uni.navigateTo({
					url:'/pages/service/suit/suit'
				})
			}
		}
	}
</script>

<style>

</style>
