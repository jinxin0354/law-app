<template>
	<uni-popup ref="returnCost" type="center">
		<order-popup-common title="退回投资费用" @closePop="closePop('returnCost')">
			<view slot="popup-con" >
				<view class="flex flex-vertical" style="font-size: 15px;">
					<view class="flex flex-horizontal flex-center-v item">
						<text class="flex flex-1">收款人</text>
						<text>投资人</text>
					</view>
					<view class="flex flex-horizontal flex-center-v item">
						<text class="flex flex-1">案件受理费</text>
						<text class="money-text">¥{{item.case_money}}</text>
					</view>
					<view class="flex flex-horizontal flex-center-v item">
						<text class="flex flex-1">公告费</text>
						<text class="money-text">¥{{item.announce_money}}</text>
					</view>
					<view class="flex flex-horizontal flex-center-v item">
						<text class="flex flex-1">异地被告身份查询费</text>
						<text class="money-text">¥{{item.enquire}}</text>
					</view>
					<view class="flex flex-horizontal flex-center-v item">
						<text class="flex flex-1">律师费</text>
						<text class="money-text">¥{{item.lawyer}}</text>
					</view>
				</view>
			</view>
			<view slot="popup-btn" class="flex flex-center" style="padding: 10px 0;" @click="closePop('returnCost')">
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
	.item {
		height: 50px;
		padding: 0 15px;
	}
</style>
