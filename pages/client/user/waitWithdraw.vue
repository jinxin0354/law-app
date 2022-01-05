<template>
	<view class="content">
		<view class="drawBox">
			<view class="drawItem" v-for="(item, index) in dataList">
				<view class="it-item">
					<view class="red">￥{{item.money}}</view>
					<view class="gray">{{item.character}}</view>
				</view>
				<view class="it-item">
					<view class="gray">待收益</view>
					<view class="gray">订单号：{{item.ordersn}}</view>
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
		};
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
					pageSize:20,
					token: uni.getStorageSync('token')
				};
				let res = await this.$api('index.money_Log', formData);
				let dataList = res.data.money_log;
				this.page++;
				this.dataList = this.dataList.concat(dataList);
		
				this.loadingType = res.data.current_page >= res.data.total_page ? 'nomore' : 'more';
		
			},
			timeup() {
				this.init();
			}
		},
		//加载更多
		onReachBottom() {
			this.loadData();
		}
};
</script>

<style lang="scss">
page{
	background-color: #FFFFFF;
}
.drawBox{
	padding: 0 30rpx 30rpx;
	.drawItem{
		padding-top: 20rpx;
		border-bottom: 1rpx solid #EEEEEE;
		.it-item{
			display: flex;
			justify-content: space-between;
			margin-bottom: 14rpx;
		}
	}
	
}
</style>
