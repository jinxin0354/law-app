<template>
	<uni-popup ref="lawyerApply" type="center">
		<order-popup-common title="律师退款" @closePop="closePop('lawyerApply')">
			<view slot="popup-con" >
				<view class="flex flex-vertical" style="font-size: 15px;">
					<view class="flex flex-horizontal flex-center-v item">
						<text class="flex flex-1">退款金额</text>
						<text class="money-text">¥{{item.price}}</text>
					</view>
					<view class="flex flex-horizontal flex-center-v" style="padding: 10px 15px;">
						<text class="flex flex-1" style="min-width: 80px;">退回理由</text>
						<text >{{item.origin}}</text>
					</view>
					<view class="flex flex-horizontal flex-center-v item">
						<text class="flex flex-1">退款方式</text>
						<text>{{item.pay_type}}</text>
					</view>
				</view>
			</view>
			<view slot="popup-btn" class="flex flex-center" style="padding: 10px 0;" @click="closePop('lawyerApply')">
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
