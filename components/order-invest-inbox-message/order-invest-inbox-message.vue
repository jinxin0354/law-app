<template>
	<uni-popup ref="popupInbo" type="center">
		<order-popup-common title="投资人收件信息" @closePop="closePop('popupInbo')">
			<view slot="popup-con" v-if="Object.keys(infoInbo).length > 0">
				<view class="od-box">
					<view class="od-item">
						<view class="item-tip">名称</view>
						<view class="item-right">
							<view class="item-txt">{{ infoInbo.name }}</view>
						</view>
					</view>
					<view class="od-item">
						<view class="item-tip">邮寄地址</view>
						<view class="item-right">
							<view class="item-txt">{{ infoInbo.province + infoInbo.city + infoInbo.country }}</view>
						</view>
					</view>
					<view class="od-item">
						<view class="item-tip">详细地址</view>
						<view class="item-right">
							<view class="item-txt">{{ infoInbo.address }}</view>
						</view>
					</view>
					<view class="od-item">
						<view class="item-tip">联系电话</view>
						<view class="item-right">
							<view class="item-txt">{{ infoInbo.tel }}</view>
						</view>
					</view>
				</view>
			</view>
			<view style="padding: 30rpx;" slot="popup-con" v-else>暂无投资人收件信息</view>
		</order-popup-common>
	</uni-popup>
</template>

<script>
export default {
	props: ['infoInbo'],
	data() {
		return {};
	},
	created() {},
	methods: {}
};
</script>

<style lang="scss">
	.item-tip{
		margin-top: 10rpx;
	}
</style>
