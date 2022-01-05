<template>
	<view class="product-intro">
		<!-- 七个产品 下单之前产品简介-->
		<template v-if="item.product_name == '问一下'">
			<view class="item-black">
				<text class="tip-item">{{ item.area_name }}</text>
				<text class="tip-item">{{ item.serve_type }}</text>
				<text class="tip-item">{{ item.serve_time }}</text>
			</view>
		</template>
		<template v-else-if="item.product_name == '陪聊'">
			<view class="item-black">
				<text class="tip-item">{{ item.area_name }}</text>
				<text class="tip-item">{{ item.content }}</text>
				<text class="tip-item">{{ item.serve_time }}</text>
			</view>
		</template>
		<template v-if="item.product_name == '管家'">
			<view class="item-black">
				<text class="tip-item">{{ item.area_name }}</text>
				<text class="tip-item">{{ item.grade }}管家</text>
				<text class="tip-item">{{ item.dead }}</text>
			</view>
		</template>
		<template v-if="item.product_name == '代写文书'">
			<view class="item-black">
				<text class="tip-item">{{ item.area_name }}</text>
				<text class="tip-item" v-if="item.documemt">{{ item.documemt.toString() }}</text>
				<!-- <text class="tip-item">{{ item.docu_time }}</text> -->
				<text class="tip-item">1份</text>
			</view>
		</template>
		<template v-if="item.product_name == '判案'">
			<view class="item-black">
				<text class="tip-item">{{ item.area_name }}</text>
				<!-- <text class="tip-item">{{ item.serve_type }}</text> -->
				<!-- <text class="tip-item">{{ item.docu_time }}</text> -->
				<text class="tip-item">评估案件胜诉率/回款率</text>
			</view>
		</template>
		<template v-if="item.product_name == '打官司' && item.money_type == 26">
			<view class="item-black">
				<text class="tip-item">{{ item.area_name }}</text>
				<text class="tip-item">垫资追款包执行</text>
			</view>
		</template>
		<template v-if="item.product_name == '打官司' && item.money_type == 27">
			<view class="item-black">
				<text class="tip-item">{{ item.area_name }}代理</text>
				<text class="tip-item">{{ item.self_ident }}</text>
				<text class="tip-item">{{ item.stage }}</text>
			</view>
		</template>
		<template v-if="item.product_name == '刑事会见'">
			<view class="item-black">
				<text class="tip-item">{{ item.accusation }}</text>
				<text class="tip-item">会见1次</text>
			</view>
		</template>
		<!-- <view class="item-black">
			<text class="tip-item">
				(
				<template v-if="item.product_name == '打官司' && item.money_type == 26">
					广东广州
				</template>
				{{ item.serve_name }})
			</text>
		</view> -->
		<view class="item-label">
			<view class="label-txt" v-for="(item_child, index_child) in item.label">{{ item_child }}</view>
		</view>
	</view>
</template>

<script>
export default {
	props: ['item'],
	data() {
		return {};
	},
	created() {},
	methods: {}
};
</script>

<style lang="scss">
.item-black {
	margin-left: 16rpx;
	margin-bottom: 4rpx;
	.tip-item {
		font-size: 28rpx;
		font-weight: bold;
	}
}
.item-tip {
	font-size: 24rpx;
	margin-bottom: 4rpx;
	.tip-item {
		color: #aaaaaa;
		font-size: 24rgpx;
		margin-right: 10rpx;
	}
}
.item-tip.text-ellipsis {
	color: #aaaaaa;
}
.item-label {
	display: flex;
	flex-wrap: wrap;
	color: #19C151;
	margin-left: 16rpx;
	.label-txt {
		border: 1rpx solid #C6F2D4;
		border-radius: 6rpx;
		margin-bottom: 10rpx;
		padding: 4rpx;
		font-size: 20rpx;
		margin-right: 10rpx;
		
	}
}
.product-intro {
	padding-top: 14rpx;
}
</style>