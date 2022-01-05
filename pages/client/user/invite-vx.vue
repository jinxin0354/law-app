<template>
	<view class="content">
		<image class="ewm-image" :src="info.qrcode1" mode="widthFix"></image>

		<view class="save-box" @click="goShare()">
			<view class="image-wrapper"><image src="@/static/img/invite-vx-icon2.png" mode="widthFix"></image></view>
		</view>
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
	</view>
</template>

<script>
export default {
	data() {
		return {
			info: {}
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
				this.info = res.data;
			});
		},
		goShare() {
			const nav = navigator.userAgent;
			if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
				phone.saveImage(`{url:"${this.info.qrcode1}"}`);
			} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
				this.$bridge.callhandler('saveImage', this.info.qrcode1, data => {
					// 处理返回数据
					console.log(data, '我走了这里');
				});
			}
		}
	}
};
</script>

<style lang="scss">
.ewm-image {
	width: 100%;
	display: block;
}
.save-box {
	padding: 50rpx 0;
	background-color: #F73D06;
	.image-wrapper {
		margin: auto;
		width: 500rpx;
		image {
			width: 100%;
		}
	}
}
</style>
