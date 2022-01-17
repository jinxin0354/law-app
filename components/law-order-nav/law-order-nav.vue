<template>
	<view class="fixedTop">
		<view class="top-nav-box">
            <view class="back-icon-box" v-if="isShare" @click="backClick">
                <image class="back-icon" src="@/static/img/back-icon.png" mode="aspectFit"></image>
            </view>
            <view class="back-icon-box" v-else>
                <view class="back-icon"></view>
            </view>
			<view class="nav-center" style="font-size: 34rpx">提交订单</view>
			<view class="nav-right">
				<view class="image-wrapper" v-if="isShare" @click="share"><image src="@/static/img/share-wx-icon.png" mode="aspectFit"></image></view>
				<view class="image-wrapper2" @click="$refs.telephoneServiceTel.$refs.popupTel.open()"><image src="@/static/img/index-kf.png" mode="aspectFit"></image></view>
			</view>
		</view>
		<!-- 客服组件 -->
		<order-telephone name="如有技术问题请联系" phoneNumber="18820268653" ref="telephoneServiceTel"></order-telephone>
	</view>
</template>

<script>
export default {
    props:{
      shareTitle:'',
				shareContent:''
    },
	data() {
		return {
            isShare:this.$route.query.type=='share' ? false : true
		};
	},
	created() {
    },
	methods: {
        //分享
        share(){
        	let shareInfo = {
        		title: this.shareTitle,
        		content: this.shareContent,
        		imageUrl: `${this.$API_URL}/source/go.png`,
        		path: `${this.$VIEW_URL}/#/pages/client/order/order-court-own?area_id=${this.$route.query.area_id}&bearFees=${this.$route.query.bearFees}&product_id=${this.$route.query.product_id}&product_image=${this.$route.query.product_image}&product_name=${this.$route.query.product_name}&type=share`
        	};
        	const nav = navigator.userAgent;
        	if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
        		phone.share(JSON.stringify(shareInfo));
        	} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        		this.$bridge.callhandler('share', shareInfo, data => {
        			// 处理返回数据
        			console.log(data, '我走了这里');
        		});
        	}
        },
        backClick(){
            uni.navigateBack({
                delta: 2
            });
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
    padding: 0rpx 30rpx;
	.back-icon-box{
		flex: 1;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .back-icon{
            width: 50rpx;
            height: 50rpx;
        }
    }
    .nav-center {
		flex: 1;
    }
	.nav-right {
		flex: 1;
		display: flex;
        justify-content: flex-end;
		.image-wrapper {
			margin-top: 15rpx;
			margin-right: 30rpx;
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
			height: 60rpx;
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
