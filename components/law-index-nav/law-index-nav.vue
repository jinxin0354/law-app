<template>
	<view class="fixedTop">
		<view class="top-nav-box">
			<view class="nav-left">法力</view>
			<view class="nav-right">
				<view class="image-wrapper" @click="$refs.popupReceiveCoupon.open()"><image src="@/static/img/gifs.gif" mode="aspectFit"></image></view>
				<view class="image-wrapper2" @click="$refs.telephoneServiceTel.$refs.popupTel.open()"><image src="@/static/img/index-kf.png" mode="aspectFit"></image></view>
			</view>
		</view>
		<!-- 客服组件 -->
		<order-telephone name="如有技术问题请联系" phoneNumber="18820268653" ref="telephoneServiceTel"></order-telephone>
		<!-- 领取优惠券 -->
		<uni-popup ref="popupReceiveCoupon" type="center">
			<order-popup-common title="" @closePop="closePop('popupReceiveCoupon')">
				<view class="receiveCouponBox" slot="popup-con">
					<input class="ipt-border" type="text" placeholder="请输入朋友的邀请码" v-model="coupon_id" />
					<view class="ok-box padding0"><button type="default" class="ok-btn"  :disabled="!coupon_id ? true : false" @click="receiveCoupons">我要领券</button></view>
				</view>
			</order-popup-common>
		</uni-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {
			coupon_id: ''
		};
	},
	created() {},
	methods: {
		async receiveCoupons() {
			let formData = {
				invite: this.coupon_id,
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.add_reg', formData);
			if (res.code == 1) {
				this.$refs.popupReceiveCoupon.close();
				this.$emit('openCoupons');
			} else {
				uni.showToast({
					title: res.msg,
					icon: 'none'
				});
			}
		}
	}
};
</script>

<style lang="scss">
.receiveCouponBox {
	padding: 30rpx;
	.ipt-border {
		margin-bottom: 20rpx;
		padding: 18rpx;
	}
}
.top-nav-box {
	background: $uni-color-primary;
	color: #ffffff;
	text-align: center;
	position: relative;
	height: 88rpx;
	line-height: 88rpx;
	font-size: 30rpx;
	display: flex;
	.nav-left {
		flex: 1;
		text-align: left;
		padding-left: 30rpx;
	}
	.nav-right {
		display: flex;
		padding-right: 20rpx;
		.image-wrapper {
			margin-top: 10rpx;
			margin-right: 20rpx;
			width: 50rpx;
			height: 60rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.image-wrapper2 {
			margin-top: 15rpx;
			width: 50rpx;
			height: 50rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
	}
}
.item-popup {
	margin: 0 auto;
	.item-txt {
		height: 28rpx;
		font-size: 20rpx;
		margin: 0 auto;
		color: #ffffff;
	}
	.img1 {
		width: 330rpx;
		height: 86rpx;
		margin: 0 auto;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.img2 {
		width: 376rpx;
		height: 260rpx;
		margin: 20rpx auto 0;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.img3 {
		width: 200rpx;
		height: 60rpx;
		margin: 15rpx auto;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.img4 {
		width: 40rpx;
		height: 40rpx;
		margin: 20rpx auto;
		image {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
