<template>
	<view class="content">
		<view class="service-list">
			<view class="service-item active" @click="replace('/pages/client/user/order')" v-if="userInfo.is_weituo == 1">
				<view class="item-txt">我的订单({{ info.user_order }})</view>
				<image src="@/static/img/white-right-arrow.png" mode="widthFix"></image>
			</view>
			<view class="service-item active" @click="replace('/pages/lawyer/user/receive-order')" v-if="userInfo.is_lawyer == 1 || userInfo.is_fawu == 1 || userInfo.is_touziren == 1">
				<view class="item-txt">我的接单({{ info.lawyer_order }})</view>
				<image src="@/static/img/white-right-arrow.png" mode="widthFix"></image>
			</view>
			<view class="service-item active" @click="replace('/pages/specialist/user/receive-order')" v-else-if="userInfo.user_type == 2">
				<view class="item-txt">我的接单({{ info.lawyer_order }})</view>
				<image src="@/static/img/white-right-arrow.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="order-list-box">
			<view class="order-item" @click="navTo(item)" v-for="(item, index) in dataList">
				<view class="item-top">
					<view class="top-left" @click.stop="jump('/pages/client/index/list', { id: item.product_id })">
						<view class="image-wrapper"><image :src="item.product_image" mode="aspectFit"></image></view>
						<view class="left-txt">{{ item.product_name }}</view>
						<view class="image-wrapper image-wrapper2"><image src="@/static/img/right.png" mode="aspectFit"></image></view>
					</view>
					<view class="top-right gray">{{ item.createtime }}</view>
				</view>
				<view class="notice-title">{{ item.title }}</view>
				<view class="item-img">
					<view class="image-wrapper"><image :src="item.arera_image" mode="aspectFit"></image></view>
				</view>
				<view class="item-txt">
					<view class="item-order">
						<text class="order-txt">{{ item.content }}</text>
					</view>
				</view>
				<view class="notice-bottom">
					<view class="bottom-left">订单号：{{ item.order_sn }}</view>
					<view class="bottom-right">
						<view class="bottom-tip">点击查看</view>
						<view class="bottom-raidus" v-if="item.n_status == 0"></view>
						<view class="bottom-arrow"><image src="@/static/img/gray-right-arrow.png" mode="widthFix"></image></view>
					</view>
				</view>
			</view>
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
	</view>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
	data() {
		return {
			dataList: [],
			page: 1, //分页加载
			loadingType: 'more', //加载更多状态
			ifOnShow: false, //返回时刷新
			info: {}
		};
	},
	onHide() {
		this.ifOnShow = true;
	},
	onShow() {
		if (this.ifOnShow) {
			this.init();
		}
	},
	computed: {
		...mapGetters(['userInfo'])
	},
	onLoad() {
		this.init();
	},
	methods: {
		init() {
			this.loadData('refresh');
		},
		async navTo(item) {
			let formData = {
				type: 1,
				id: item.id,
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.read_notice', formData);
			
			if (this.userInfo.id == item.user_id) {// 委托人
				console.log('notice');
				console.log(item.status);
				console.log(item);
				console.log('notice_end');
				
				if (item.status == -1) {
					if (item.cancel_type == 1) {
						this.jump('/pages/client/user/order-cancel', { order_id: item.order_id });
					} else if (item.cancel_type == 2) {
						this.jump('/pages/client/user/auto-cancel', { order_id: item.order_id });
					}
				} else if (item.product_id == '6' && item.status == 6) {
					if(this.userInfo.is_weituo == '1'){
							this.jump('/pages/client/user/service-end', { order_id: item.id });
					}
					if(this.userInfo.is_lawyer == '1'){
							this.jump('/pages/lawyer/user/service-end', { order_id: item.id });
					}
					if( this.userInfo.is_fawu == '1'){
							this.jump('/pages/specialist/user/service-ok', { order_id: item.id });
					}
					if(this.userInfo.is_touziren == '1'){
							this.jump('/pages/investor/user/service-ok', { order_id: item.id });
					}
				} else if (item.product_id == '6' && item.status == 12) { //解除委托
					if(this.userInfo.is_weituo == '1'){
							this.jump('/pages/client/user/service-jiechu', { order_id: item.id });
					}
					if( this.userInfo.is_lawyer == '1'){
						this.jump('/pages/lawyer/user/service-jiechu', { order_id: item.id });
					}
					if( this.userInfo.is_fawu == '1'){
							this.jump('/pages/specialist/user/service-ok', { order_id: item.id });
					}
					if (this.userInfo.is_touziren == '1') {
						this.jump('/pages/investor/user/service-remove', { order_id: item.id, status: item.status });
					}
				} else if ((item.product_id != '6' && item.status == 0) || item.status == 15) {
					this.jump('/pages/client/user/match', { order_id: item.order_id });
				} else if (item.product_id == '6' && item.status == 0) {
					this.jump('/pages/client/user/match-specialist', { order_id: item.order_id });
				} else if (
					item.status == 3 ||
					item.status == 14 ||
					item.status == 4 ||
					item.status == 10 ||
					item.status == 11 ||
					(item.product_id == '6' && item.status == 16) ||
					(item.product_id == '6' && item.status == 17)
				) {
					if (item.serve_time == '15分钟') {
						this.jump('/pages/client/user/service-minute', { order_id: item.order_id });
					} else if (item.serve_time == '连续包月') {
						this.jump('/pages/client/user/service-month', { order_id: item.order_id });
					} else if (item.serve_time == '包年') {
						this.jump('/pages/client/user/service-year', { order_id: item.order_id });
					} else if (item.price_type == '投资人支付(不用还)') {
						this.jump('/pages/client/user/service-investor', { order_id: item.order_id });
					} else {
						this.jump('/pages/client/user/service-face', { order_id: item.order_id });
					}
				} else if ((item.product_id != '6' && item.status == 16) || item.status == 6) {
					this.jump('/pages/client/user/service-ok', { order_id: item.order_id });
				} else if (item.product_id != '6' && item.status == 17) {
					this.jump('/pages/client/user/service-remove', { order_id: item.order_id });
				} else if (item.status == 1 || item.status == 2 || item.status == 13 || item.status == 18) {
					this.jump('/pages/client/user/service-specialist', { order_id: item.order_id });
				}
			} 
			else if (this.userInfo.is_lawyer == 1 || this.userInfo.is_touziren == 1) {// 律师和投资人
				if (item.status == -1 || item.status == 99) {
					this.jump('/pages/lawyer/user/order-cancel', { order_id: item.order_id });
				}
				else if (
					item.status == 3 ||
					item.status == 14 ||
					item.status == 4 ||
					item.status == 10 ||
					item.status == 11 ||
					(item.product_id == '6' && item.status == 16) ||
					(item.product_id == '6' && item.status == 17)
				) {
					if (item.serve_time == '15分钟') {
						this.jump('/pages/lawyer/user/service-minute', { order_id: item.order_id });
					} else if (item.serve_time == '连续包月') {
						this.jump('/pages/lawyer/user/service-month', { order_id: item.order_id });
					} else if (item.serve_time == '包年') {
						this.jump('/pages/lawyer/user/service-year', { order_id: item.order_id });
					} else if (item.price_type == '投资人支付(不用还)') {
						if (this.userInfo.is_lawyer == '1') {
							this.jump('/pages/lawyer/user/service-investor', { order_id: item.order_id });
						} else if (this.userInfo.is_touziren == '1') {
							this.jump('/pages/investor/user/service-investor', { order_id: item.order_id });
						}
					} else {
						if(item.product_id == '6'){
							if (this.userInfo.is_lawyer == '1') {
								if(item.price_type == '投资人支付(不用还)' || item.price_type == '投资人支付'){
									this.jump('/pages/lawyer/user/service-investor', { order_id: item.id, status: item.status });
								}else if(item.price_type == '自费'){
									this.jump('/pages/lawyer/user/service-zifei', { order_id: item.id, status: item.status });
								} else {
									this.jump('/pages/lawyer/user/service-face', { order_id: item.id });
								}
							} else if (this.userInfo.is_touziren == '1') {
								this.jump('/pages/investor/user/service-investor', { order_id: item.id, status: item.status });
							}else if(this.userInfo.is_fawu == '1'){
								this.jump('/pages/specialist/user/service-specialist', { order_id: item.id, status: item.status });
							} else{
								this.jump('/pages/lawyer/user/service-investor', { order_id: item.id, status: item.status });
							}
						} else {
							this.jump('/pages/lawyer/user/service-face', { order_id: item.id });
						}
					}
				} else if (item.product != '打官司' && item.status == 16) {
					this.jump('/pages/lawyer/user/service-ok', { order_id: item.order_id });
				} else if (item.status == 6) {
					this.jump('/pages/investor/user/service-ok', { order_id: item.order_id });
				} else if (item.product != '打官司' && item.status == 17) {
					this.jump('/pages/lawyer/user/service-remove', { order_id: item.order_id });
				}
			} 
			
			else if (this.userInfo.is_fawu == 1) {// 法务_
			console.log('法务服务完成        -----'+this.userInfo.user_type)
				if (item.status == -1) {
					this.jump('/pages/lawyer/user/order-cancel', { order_id: item.order_id });
				} else if (item.status == 12) {
					this.jump('/pages/lawyer/user/service-remove', { order_id: item.order_id });
				} else if (item.status == 1 || item.status == 2 || item.status == 13 || item.status == 18) {
					this.jump('/pages/specialist/user/service-specialist', { order_id: item.order_id });
				} else {
					this.jump('/pages/specialist/user/service-ok', { order_id: item.order_id });
				}
			}
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
			let res = await this.$api('index.notice', formData);
			if (this.page == 1) {
				this.info = res.data;
			}
			let dataList = res.data.notice;
			this.page++;
			this.dataList = this.dataList.concat(dataList);

			this.loadingType = res.data.current_page >= res.data.total_page ? 'nomore' : 'more';
		}
	},
	//加载更多
	onReachBottom() {
		this.loadData();
	}
};
</script>

<style lang="scss">
.service-list {
	padding-top: 20rpx;
	justify-content: center;
	.service-item {
		.item-txt{
			margin-right: 10rpx;
		}
		image {
			width: 16rpx;
		}
		&:nth-of-type(1) {
			margin-right: 80rpx;
		}
		&:nth-of-type(2) {
			margin-right: 0;
		}
	}
}
.notice-title {
	width: 100%;
	font-size: 32rpx;
	font-weight: bold;
	margin-bottom: 20rpx;
}
.notice-bottom {
	width: 100%;
	display: flex;
	border-top: 1rpx solid #eeeeee;
	margin-top: 20rpx;
	padding-top: 20rpx;
	.bottom-left {
		flex: 1;
	}
	.bottom-right {
		display: flex;
		align-items: center;
		.bottom-tip {
			color: #777;
			margin-right: 10rpx;
		}
		.bottom-raidus {
			border-radius: 50%;
			width: 16rpx;
			height: 16rpx;
			background-color: #f00;
			margin-right: 10rpx;
		}
		.bottom-arrow {
			width: 16rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
	}
}
.order-txt {
	line-height: 40rpx;
}
.top-left{
	font-weight: normal !important;
}
</style>
