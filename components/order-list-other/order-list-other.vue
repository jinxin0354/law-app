<template>
	<view class="product-intro">
		<!-- 贵宾 -->
		<view class="item-tip text-ellipsis">
			<text class="tip-item" v-if="item.client_name == item.client_tel">
				<image src="@/static/img/order-tip-person.png" class="order-tip-img" mode="widthFix"></image>
				贵宾
			</text>
			<text class="tip-item" v-else>
				<image src="@/static/img/order-tip-person.png" class="order-tip-img" mode="widthFix"></image>
				{{ item.client_name }}
			</text>
			<text class="tip-item" v-if="item.client_tel">{{ item.client_tel.replace(/(\d{3})\d*(\d{4})/, '$1****$2') }}</text>
		</view>
		<!-- 我的要求 -->
		<view class="item-tip" v-if="item.requirement">
			<text class="tip-item">
				<image src="@/static/img/order-tip-order.png" class="order-tip-img" mode="widthFix"></image>
				要求：{{ item.requirement }}
			</text>
		</view>
		<!-- 服务保障 -->
		<view class="item-tip text-ellipsis" v-if="isProtect">
			<text
				class="tip-item green"
				@click.stop="
					pro_tags_item = item.pro_tags_item;
					$refs.popupRule.open();
				"
			>
				{{ item.pro_tags }}
			</text>
			<view class="tip-green-arrow"><image src="@/static/img/green-arrow.png" mode="aspectFit"></image></view>
		</view>
		<!-- 价格 -->
		<view class="item-prize">
			<text class="prize-num" v-if="item.price_type == '投资人支付(不用还)'">￥投资人支付</text>
			<text class="prize-num" v-else>￥{{ item.money }}</text>
		</view>
		<!-- 服务规则弹出层 -->
		<uni-popup ref="popupRule" type="center">
			<order-popup-common title="服务规则" @closePop="closePop('popupRule')">
				<scroll-view class="popup-con" scroll-y="true" slot="popup-con">
					<view style="padding:0 30rpx;"><image :src="pro_tags_item" mode="widthFix" style="width: 100%"></image></view>
				</scroll-view>
				<view class="ok-box" slot="popup-btn"><button type="default" class="ok-btn" @click="closePop('popupRule')">朕知道了</button></view>
			</order-popup-common>
		</uni-popup>
	</view>
</template>

<script>
export default {
	props: ['item', 'isProtect'],
	data() {
		return {
			pro_tags_item: '' //服务规则
		};
	},
	created() {},
	methods: {}
};
</script>

<style lang="scss"></style>
