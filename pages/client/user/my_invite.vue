<template>
	<view class="content">
		<view class="search-invite-box">
			<view class="item-top">
				<view class="item-input"><input type="text" v-model="keyword" maxlength="11" @blur="search()" value="" placeholder="请输入姓名或手机号搜索" /></view>
				<view class="item-btn"><view class="btn-txt" @click="search()">搜索</view></view>
			</view>
			<view class="item-main">
				<view class="main-box" v-for="(item, index) in data" :key="index">
					<view class="box-name">{{ item.username }}</view>
					<view class="box-num">{{ item.mobile.replace(/(\d{3})\d*(\d{4})/, '$1****$2') }}</view>
				</view>
			</view>
		</view>

		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
	</view>
</template>

<script>
export default {
	data() {
		return {
			data: [],
			keyword: '',
			cc:1111
		};
	},
	onLoad() {
		this.init();
	},
	methods: {
		init() {
			let that = this;
			let formData = {
				token: uni.getStorageSync('token')
			};
			that.$api('index.my_invite', formData).then(res => {
				this.data = res.data.invite;
			});
		},
		search() {
			let formData = {
				token: uni.getStorageSync('token'),
				keyword: this.keyword
			};
			this.$api('index.my_invite', formData).then(res => {
				this.data = res.data.invite;
			});
		}
	}
};
</script>

<style lang="scss">
.search-invite-box {
	padding: 30rpx;
}
.item-top {
	width: 100%;
	height: 66rpx;
	border-radius: 32rpx;
	border: 2rpx #eeeeee solid;
	margin: 0 auto 0;
	display: flex;
	align-items: center;
	.item-input {
		flex: 1;
		margin-left: 30rpx;
	}
	.item-btn {
		display: flex;
		flex-direction: row-reverse;
		.btn-txt {
			width: 140rpx;
			height: 66rpx;
			background-color: #ffca00;
			border-radius: 32rpx;
			color: #fffdef;
			text-align: center;
			line-height: 66rpx;
		}
	}
}
.item-main {
	margin-top: 20rpx;
	.main-box {
		margin: 0 auto;
		display: flex;
		align-items: center;
		width: 650rpx;
		height: 89rpx;
		border-bottom: 2rpx #eeeeee solid;
		.box-name {
			font-size: 32rpx;
			color: #333333;
			flex: 1;
		}
		.box-num {
			width: 180rpx;
			text-align: justify;
		}
	}
}
</style>
