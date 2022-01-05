<template>
	<view class="content">
		<view class="my-coupon-box">
			<view class="my-item" v-for="(item, index) in dataList" :key="index" @click="navTo">
				<view class="my-item-left">
					￥
					<text style="font-size: 40rpx;">{{ item.money }}</text>
				</view>
				<view class="my-item-right">
					<view class="my-item-title">{{ item.coupon }}</view>
					<view class="my-item-txt">{{ item.product }}</view>
					<view class="my-item-txt">{{ item.expire }}</view>
				</view>
				<view class="my-item-btn"><view class="item-txt">我要使用</view></view>
			</view>
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
	</view>
</template>

<script>
export default {
	data() {
		return {
			page: 1, //分页加载
			loadingType: 'more', //加载更多状态
			dataList: []
		};
	},
	onLoad() {
		this.init();
	},
	methods: {
		init() {
			this.loadData('refresh');
		},
		//带下拉刷新和上滑加载
		async loadData(type = 'add', loading) {
			if (type === 'add') {
				if (this.loadingType === 'nomore') {
					return;
				}
				this.loadingType = 'loading';
			} else if (type === 'refresh') {
				this.loadingType = 'loading';
				this.page = 1;
				this.dataList = [];
			} else {
				this.loadingType = 'more';
			}

			let formData = {
				page: this.page,
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.my_coupon', formData);
			if (res.code == 1) {
				let dataList = res.data.coupon;

				this.page++;
				this.dataList = this.dataList.concat(dataList);
				this.loadingType = res.data.current_page >= res.data.total_page ? 'nomore' : 'more';
			}
		},
		navTo() {
			const nav = navigator.userAgent;
			if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
				phone.goMain();
			} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
				this.$bridge.callhandler('goMain', {}, data => {});
			}
		}
	},
	//加载更多
	onReachBottom() {
		this.loadData();
	}
};
</script>

<style lang="scss">
.my-coupon-box {
	.my-item {
		display: flex;
		background-color: #ffdbdc;
		align-items: center;
		padding: 20rpx 20rpx 20rpx 0;
		border-radius: 20rpx;
		margin-bottom: 20rpx;
		.item-left {
			color: #fa1d1e;
			font-size: 34rpx;
			font-weight: bold;
			padding: 0 30rpx;
		}
		.item-right {
			border-left: 2rpx dashed #ffffff;
			padding-left: 40rpx;
			.item-title {
				color: #fa1d1e;
				font-size: 34rpx;
				font-weight: bold;
			}
			.item-txt {
				color: #fa1d1e;
				font-size: 24rpx;
				font-weight: bold;
			}
		}
		.item-btn {
			display: flex;
			flex: 1;
			flex-direction: row-reverse;
			.item-txt {
				border-radius: 26rpx;
				border: 2rpx #fa1d1e solid;
				color: #fa1d1e;
				text-align: center;
				line-height: 52rpx;
				padding: 0 10rpx;
			}
		}
	}
	padding: 30rpx;
}
</style>
