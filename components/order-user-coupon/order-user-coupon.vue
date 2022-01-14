<template>
	<view class="od-item marginbottom20">
		<view class="item-tip title-box" style="width: 200rpx;">优惠券</view>
		<view class="item-right" @click="openCoupons()">
			<view class="item-txt gray" v-if="info.coupon && info.coupon.coupon && info.coupon.coupon.length == 0">暂无可用优惠券</view>
			<template v-else>
				<view class="item-txt red" v-if="current_coupon">
                    <view class="coupon-box">
                        -{{ current_coupon.money }}
                    </view></view>
				<view class="item-txt gray" v-else>选择优惠券</view>
				<view class="item-coupon" v-if="info.coupon && info.coupon.coupon && !current_coupon">
					<text>{{ info.coupon.coupon.length }}张可用</text>
				</view>
				<view class="item-nav"><image src="@/static/img/right.png" mode="aspectFit"></image></view>
			</template>
		</view>
		<!-- 优惠券组件-->
		<order-coupons ref="mycoupons" v-if="info.coupon" :couponsInfo="info.coupon.coupon" :current_coupon="current_coupon" @confirmCoupon="confirmCoupon"></order-coupons>
	</view>
</template>

<script>
export default {
	props: ['info'],
	watch: {
		// 优惠券
		current_coupon: {
			handler(val, olVal) {
				this.$emit('getCoupon', this.current_coupon);
			},
			deep: true
		}
	},
	data() {
		return {
			current_coupon: '' //选择的优惠券
		};
	},
	created() {},
    mounted(){
        this.current_coupon = this.info.coupon.coupon[0] || ''
    },
	methods: {
		openCoupons() {
			if (this.info.coupon && this.info.coupon.coupon.length > 0) {
				this.$refs.mycoupons.$refs.popupCoupons.open();
			}
		},
		// 优惠券
		confirmCoupon(current_coupon) {
			this.current_coupon = current_coupon;
		}
	}
};
</script>

<style lang="scss">
.item-coupon {
	display: flex;
	align-items: center;
	text {
		height: 40rpx;
		line-height: 40rpx;
		background-color: #fa1d1e;
		color: #ffffff;
		border-radius: 20rpx;
		padding: 0 6rpx;
		font-size: 24rpx;
	}
}
.title-box{
    display: flex;
    align-items: center;
}
.coupon-box{
    width:calc((100% - 44rpx) / 2);
    border: 1rpx solid #EE1414;
    text-align: center;
}
</style>
