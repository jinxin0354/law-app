<template>
	<uni-popup ref="investShou" type="center">
		<order-popup-common title="结算投资收益" @closePop="closePop('investShou')">
			<view slot="popup-con" >
				<view class="flex flex-vertical" style="font-size: 15px;">
					<view class="flex flex-horizontal flex-center-v item">
						<text class="flex flex-1">您的案子以什么方式处理</text>
						<text>{{item.chuli_type}}</text>
					</view>
					<view class="flex flex-horizontal flex-center-v item">
						<text class="flex flex-1">你主张的欠款本金有多少获得支持</text>
						<text class="money-text">¥{{item.chuli_money}}</text>
					</view>
					<view class="flex flex-horizontal flex-center-v item">
						<text class="flex flex-1">您这次收回了多少钱</text>
						<text class="money-text">¥{{item.yuan_money}}</text>
					</view>
					<view class="flex flex-horizontal flex-center-v" style="padding: 10px 15px;">
						<text class="flex flex-1" style="min-width: 80px;">请款事由333</text>
						<text style="margin-left: 5px;color: #999;">{{item.reason}}</text>
					</view>
				</view>
			</view>
			<view slot="popup-btn" class="flex flex-center" style="padding: 10px 0;" @click="closePop('investShou')">
				<view class="comfir-btn flex flex-center" style="width: 180px;height: 38px;border-radius: 38px;">我知道了</view>
			</view>
		</order-popup-common>
	</uni-popup>
</template>

<script>
	export default {
		props: ['item']
	}
</script>

<style>
	.image-icon {
		width: 37rpx;
		height: 34rpx;
	}
	.item {
		height: 40px;
		padding: 0 15px;
	}
	.image-r {
		width: 9px;
		height: 14px;
		margin-left: 7.5px;
	}
</style>
