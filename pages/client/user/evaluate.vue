<template>
	<view class="content">
		<view class="evaluate-top">
			评价完后您可得
			<text class="red">￥200</text>
			指路劵
		</view>
		<view class="evaluate-box">
			<view class="evaluate-title">
				<view style="width: 100%;">为您服务的律师有哪些长处和需要改进的啊？</view>
				<view style="width: 100%;">请点选以下标签，帮助后来人</view>
			</view>
			<view class="evaluate-item" v-for="(item, index) in info">
				<view class="service-list" :class="{ isTxtOne: item.isTxtOne == true }">
					<button class="service-item" :class="{ active: item_child.active == true }" v-for="(item_child, index_child) in item" @click="item_child.active = !item_child.active">
						{{ item_child.evaluate }}
					</button>
				</view>
				<view class="item-nav-down" @click="item.isTxtOne = !item.isTxtOne" :class="{ rotate: item.isTxtOne == false }">
					<image src="@/static/img/order-arrow-down.png" mode="aspectFit"></image>
				</view>
			</view>
			<view class="evaluate-title">
				<view style="margin-right: 20rpx;">总评</view>
				<law-rate @change="onChange" size="40" value="1" margin="10"></law-rate>
			</view>
		</view>
		<view class="ok-box fixed"><button type="default" class="ok-btn" @click="confirm">我要提交</button></view>
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
	</view>
</template>

<script>
export default {
	data() {
		return {
			info: {},
			order_id: '',
			star: 1,
			my_evaluate: []
		};
	},
	onLoad(params) {
		if (params.order_id) {
			this.order_id = params.order_id;
			this.lawyer_id = params.lawyer_id;
			this.init();
		}
	},
	methods: {
		async init() {
			let formData = {
				id: this.order_id,
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.evaluate', formData);
			this.info = res.data;
			this.info.forEach((item, index) => {
				this.$set(item, 'isTxtOne', true);
				item.forEach((item_child, index_child) => {
					this.$set(item_child, 'active', false);
				});
			});
		},
		onChange(d) {
			console.log(d);
			this.star = d.value;
		},
		async confirm() {
			this.my_evaluate.length = 0;
			this.info.forEach((item, index) => {
				item.forEach((item_child, index_child) => {
					if (item_child.active == true) {
						this.my_evaluate.push(item_child.id);
					}
				});
			});

			let formData = {
				order_id: this.order_id,
				id: this.lawyer_id,
				token: uni.getStorageSync('token'),
				star: this.star,
				evaluate_ids: this.my_evaluate.toString()
			};
			let res = await this.$api('index.order_evaluate', formData);
			if (res.code == 1) {
				uni.showToast({
					title: res.msg,
					icon: 'none'
				});
				setTimeout(()=>{
					this.$Router.back(1)
				},2000);
			}
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #ffffff;
}
.content {
	padding-bottom: 200rpx;
}
.evaluate-top {
	text-align: center;
	padding: 20rpx;
}
.evaluate-box {
	padding: 0 30rpx;
	.evaluate-title {
		font-size: 28rpx;
		font-weight: bold;
		position: relative;
		padding-left: 24rpx;
		line-height: 46rpx;
		margin-bottom: 20rpx;
		flex-wrap: wrap;
		display: flex;
		&::before {
			content: '';
			position: absolute;
			width: 10rpx;
			height: 26rpx;
			border-radius: 20rpx;
			left: 0;
			top: 8rpx;
			background-color: $uni-color-primary;
		}
	}
	.evaluate-item {
		margin-bottom: 40rpx;
		display: flex;
	}
}
.service-list {
	padding-left: 20rpx;
}
.isTxtOne {
	height: 62rpx;
	overflow: hidden;
}
</style>
