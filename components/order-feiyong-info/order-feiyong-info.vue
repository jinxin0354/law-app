<template>
	<view class="detail-item">
		<view class="item-title">
			<view style="display: flex;align-items: center;" @click="download(docZifei)">
				打官司费用
				<image  src="@/static/img/order-ques.png" mode=""
				style="width: 30rpx;height: 30rpx;margin-left: 10rpx;"></image>
			</view>
			<image style="width: 30rpx;height: 30rpx;" src="@/static/img/jisuanqi-icon.png" mode="aspectFit"></image>
		</view>
		<view class="item-intro intro_txt" :class="isDown ? 'heightMy' : ''">
			<view class="dian-box">
			  <view class="dian-icon">·</view>
				必有费用：
			</view>
			<view class="marginLeft10">
				立案受理费
			</view>
			<view class="dian-box">
			  <view class="dian-icon">·</view>
				或有费用：
			</view>
			<view class="marginLeft10">
			  财产保全费<br/>
				财产保全担保费<br/>
				异地被告身份证明查询费<br/>
				法院公告费<br/>
				勘验费<br/>
				鉴定费<br/>
				翻译费<br/>
				工商/房产/汽车查档费<br/>
				证人/鉴定人/翻译人员出庭的交通费、住宿费、生活费和误工补贴费<br/>
				政府机关收取的各种税费、材料复印费、查档费、调查手续费等<br/>
				律师差旅费用<br/>
			</view>
			<view class="dian-box">
			  <view class="dian-icon">·</view>
				或有费用只在您向相关国家部门申请时才会发生，您不申请就不发生。
			</view>
			<view class="dian-box">
			  <view class="dian-icon">·</view>
				如产生上述费用，由您按照相关发票支付给相关部门。
			</view>
    </view>
		<view class="item-down" @click="down">
			<text class="down-txt" v-if="isDown">展开</text>
			<text class="down-txt" v-if="!isDown">收起</text>
		</view>
		<!-- </template> -->
	</view>
</template>

<script>
export default {
	props: {
		docZifei: '',
	},
	data() {
		return {
			isDown: true,
			isCollect: false
		};
	},
	methods: {
		down() {
			this.isDown = !this.isDown;
		},
		collect() {
			this.isCollect = !this.isCollect;
		},
		async download(item) {
			const nav = navigator.userAgent;
			if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
				phone.loadOffice(item.image);
			} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
				this.$bridge.callhandler('loadOffice', item.image, data => {});
			}
		},
	}
};
</script>

<style lang="scss">
.heightMy {
	height: 160rpx;
	overflow: hidden;
}
.bold {
	font-weight: bold;
	color: #000 !important;
}
.detail-item {
	background-color: #ffffff;
	border-radius: 26rpx;
	margin-bottom: 20rpx;
	padding: 30rpx;
	display: flex;
	flex-wrap: wrap;
	position: relative;
	.item-title {
		width: 100%;
		color: #aaa;
		margin-bottom: 20rpx;
		display: flex;
		justify-content: space-between;
	}
	.item-intro {
		width: 100%;
		line-height: 50rpx;
		.dian-box{
			display: flex;
			.dian-icon{
				width: 10rpx;
			}
		}
		.marginLeft10{
			margin-left: 10rpx;
		}
		.marginLeft20{
			margin-left: 20rpx;
		}
	}
	.item-down {
		width: 100%;
		text-align: right;
		.down-txt {
			color: #06b4fd;
			text-align: right;
		}
	}
}
</style>
