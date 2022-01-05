<template>
	<view class="content">
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
	</view>
</template>
<script>
import wx from 'weixin-js-sdk';
export default {
	data() {
		return {
			indexInfo: {}
		};
	},
	onLoad(params) {
		if (params.lat && params.lng && params.name && params.address) {
			this.$set(this.indexInfo, 'lat', params.lat);
			this.$set(this.indexInfo, 'lng', params.lng);
			this.$set(this.indexInfo, 'name', params.name);
			this.$set(this.indexInfo, 'address', params.address);
			this.init();
		}
	},
	methods: {
		async init() {
			let res = await this.$api('index.share');
			// wx配置
			let sign = res.data;
			wx.config({
				debug: false,
				appId: sign.appId,
				timestamp: sign.timestamp,
				nonceStr: sign.nonceStr,
				signature: sign.signature,
				jsApiList: sign.jsApiList
			});
			setTimeout(() => {
				this.navToMap();
			}, 1000);
		},
		navToMap() {
			uni.showLoading({
				title: '地图加载中...'
			});
			wx.getLocation({
				type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
				success: res => {
					uni.hideLoading();
					wx.openLocation({
						latitude: Number(this.indexInfo.lat), // 纬度，范围为-90~90，负数表示南纬
						longitude: Number(this.indexInfo.lng), // 经度，范围为-180~180，负数表示西经
						scale: 16, // 缩放比例
						name: this.indexInfo.name,
						address: this.indexInfo.address
					});
				},
				fail: e => {
					uni.hideLoading();
					uni.showToast({
						title: e,
						icon: 'none'
					});
				}
			});
		}
	}
};
</script>

<style lang="scss"></style>
