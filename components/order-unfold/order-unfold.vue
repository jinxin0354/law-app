<template>
	<view class="detail-item">
		<view class="item-title" :class="isBold ? 'bold' : ''">{{ title }}</view>
<!-- 		<template v-if="title == '服务内容'">
			<view class="item-intro intro_txt"><slot name="unfold-con"></slot></view>
		</template>
		<template v-else> -->
		<view class="item-intro intro_txt" :class="isDown ? 'heightMy' : ''"><slot name="unfold-con"></slot></view>
		<view class="item-down" v-if="showDown" @click="down">
			<text class="down-txt" v-if="isDown">展开</text>
			<text class="down-txt" v-if="!isDown">收起</text>
		</view>
		<!-- </template> -->
	</view>
</template>

<script>
export default {
	props: {
		title: '',
		content: '',
		isBold: false
	},
	data() {
		return {
			isDown: true,
			showDown: true,
			isCollect: false
		};
	},
	methods: {
		down() {
			this.isDown = !this.isDown;
		},
		collect() {
			this.isCollect = !this.isCollect;
		}
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
	}
	.item-intro {
		width: 100%;
		line-height: 50rpx;
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
