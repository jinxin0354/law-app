<template>
	<view class="nav-list" style="background-color: ;">
		<view class="nav-item" @click="jump('/pages/client/index/list', { id: item.id })" v-for="(item, index) in navProduct">
			<image :src="item.dou_image" :class="item.img_format=='gif'?'anglemark':'anglemarks'" mode="" v-if="item.dou_image!=''"></image>
			<view class="image-wrapper"><image :src="item.image" mode="aspectFit"></image></view>
			<view class="nav-tip">{{ item.name }}</view>
		</view>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
export default {
	data() {
		return {
			info:{}
		};
	},
	computed:{
		...mapGetters(['navProduct'])
	},
	created() {
	},
	methods:{
	}
};
</script>

<style lang="scss">
	// 七个产品导航
	.nav-list {
		display: flex;
		flex-wrap: wrap;
		padding-top: 20rpx;
		.nav-item {
			width: 24%;
			margin-bottom: 10rpx;
			.image-wrapper {
				width: 80rpx;
				height: 80rpx;
				margin: 0 auto 10rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.nav-tip {
				text-align: center;
				font-size: 28rpx;
				font-weight: bold;
			}
		}
	}
	.nav-list {
		padding-top: 40rpx;
		.nav-item {
			position: relative;
			margin-bottom: 50rpx;
		}
	}
	.anglemark{
		width: 99rpx;
		height: 50rpx;

		position: absolute;
		right: -10rpx;
		z-index: 1;
		top: -25rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.anglemarks{
		width: 105rpx;
		height: 43rpx;
		position: absolute;
		right: -10rpx;
		z-index: 1;
		top: -20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
