<template>
	<view class="content">
		<!-- <web-view src="https://cloud.baidu.com/campaign/bccdiscount/index.html?track=cp:nsem|pf:PC|pp:H-fengchao124-21bccsanqi|pu:cdn-jingpinci|ci:21bcc|kw:10370686#cdn&bd_vid=7704063842295622060"></web-view> -->
		<!-- <web-view src="http://www.danikor.com/proinfo/3.html?bd_vid=11564306597090676142"></web-view> -->
		<web-view src="http://zxgk.court.gov.cn/zhixing"></web-view>
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
	</view>
</template>
<script>
export default {
	data() {
		return {
			url: ''
		};
	},
	created() {},
	onLoad(params) {
		if (params.url) {
			this.url = params.url;
			console.log(this.url);
		}
	},
	methods: {}
};
</script>

<style lang="scss"></style>
