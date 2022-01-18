<template>
	<uni-popup ref="settlement" type="center">
		<order-popup-common :title="type == 1 ? '结算投资人奖励' : '结算投资收益'" @closePop="closePop('settlement')">
			<view slot="popup-con" >
				<view class="flex flex-vertical" style="font-size: 15px;" v-if="type == 1">
					<view class="flex flex-horizontal flex-center-v item">
						<text class="flex flex-1">收款人</text>
						<text>投资人</text>
					</view>
					<view class="flex flex-horizontal flex-center-v item">
						<text class="flex flex-1">投资人收益金额</text>
						<text class="money-text">¥{{item.money}}</text>
					</view>
					<view class="flex flex-horizontal flex-center-v item">
						<text class="flex flex-1">您的奖励余额</text>
						<text class="money-text">¥{{item.price}}</text>
					</view>
				</view>
				<view class="flex flex-vertical" style="font-size: 15px;" v-else>
					<view class="flex flex-horizontal flex-center-v item">
						<text class="flex flex-1">付款人</text>
						<text>委托人</text>
					</view>
					<view class="flex flex-horizontal flex-center-v item">
						<text class="flex flex-1">委托人回款金额</text>
						<text class="money-text">¥{{item.money}}</text>
					</view>
					<view class="flex flex-horizontal flex-center-v item">
						<text class="flex flex-1">投资人投资收益</text>
						<text class="money-text">¥{{item.price}}</text>
					</view>
					<view class="flex flex-horizontal flex-center-v" style="padding:  10px 15px;">
						<text class="flex flex-1">请款事由</text>
						<text class="">{{item.origin}}</text>
					</view>
				</view>
			</view>
			<view slot="popup-btn" class="flex flex-center" style="padding: 10px 0;" @click="closePop('settlement')">
				<view class="comfir-btn flex flex-center" style="width: 180px;height: 38px;border-radius: 38px;">我知道了</view>
			</view>
		</order-popup-common>
	</uni-popup>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: {}
			},
			type:{
				type: Number,
				default:1
			}
		}
	}
</script>

<style>
	.image-icon {
		width: 37rpx;
		height: 34rpx;
	}
	.item {
		height: 50px;
		padding: 0 15px;
	}
	.image-r {
		width: 9px;
		height: 14px;
		margin-left: 7.5px;
	}
</style>
