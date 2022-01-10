<template>
	<uni-popup ref="popupCoupons" type="bottom">
		<order-popup-common-bottom title="选择优惠券" @closePop="closePop('popupCoupons')">
			<scroll-view class="popup-con" scroll-y="true" slot="popup-con">
				<view class="my-coupon-box">
					<radio-group>
						<label v-for="(item, index) in couponsInfo" :key="item.value" @click="radioChange(index)">
							<view class="my-item">
								<view class="my-item-left">
									￥
									<text style="font-size: 40rpx;">{{ item.money }}</text>
								</view>
								<view class="my-item-right">
									<view class="my-item-title">{{ item.coupon }}</view>
									<view class="my-item-txt">{{ item.product }}</view>
									<view class="my-item-txt">{{ item.expire }}</view>
								</view>
								<view class="my-item-btn"><radio v-if="item.id" :value="index.toString()" style="transform: scale(0.8);" color="#FFC801" :checked="active == index" /></view>
							</view>
						</label>
					</radio-group>
				</view>
			</scroll-view>
			<view class="ok-box" slot="popup-btn"><button type="default" class="ok-btn" @click="confirmCoupon">确定</button></view>
		</order-popup-common-bottom>
	</uni-popup>
</template>

<script>
export default {
	props: ['couponsInfo', 'current_coupon'],
	data() {
		return {
			active: 0
		};
	},
	created() {},
	methods: {
		confirmCoupon() {
			this.$refs.popupCoupons.close();
			// if (this.active > -1) {
				this.$emit('confirmCoupon', this.couponsInfo[this.active]);
			// }
		},
		radioChange(index) {
			if (this.active == index) {
				// 如果已经选中，则取消选中
				this.active = null;
			} else {
				// 否则进行选中赋值
				this.active = index;
			}
		}
	}
};
</script>

<style lang="scss">
.my-coupon-box {
	padding-top: 0;
	padding-bottom: 0;
}
</style>
