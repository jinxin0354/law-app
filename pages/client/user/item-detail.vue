<template>
	<view class="content">
		<!-- <view class="detail-title">{{name}}</view> -->
		<view v-html="content" v-if="name != '产品说明'" style="line-height: 50rpx;"></view>
		<image :src="content"  mode="widthFix" style="width: 100%"v-else></image>
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
	</view>
</template>

<script>
export default {
	data() {
		return {
			name:'',
			content:''
		};
	},
	onLoad(params) {
		if (params.name && params.content) {
			this.name = params.name;
			this.content = params.content;
			uni.setNavigationBarTitle({
				title: this.name
			});
		}
	},
	methods: {
		
		
	}
};
</script>

<style lang="scss">
page{
	background-color: #FFFFFF;
}
.content {
	padding: 30rpx;
}
.detail-title{
	font-weight: bold;
	margin-bottom:20rpx;
}
.detail-txt{
	line-height: 60rpx;
}
</style>
