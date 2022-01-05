<template>
	<div class="content">
		<!--#ifdef H5-->
		<web-view src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=	DH4BZ-EDEWR-RULWZ-WNUWB-HNAKQ-KJB7Q&referer=myapp" @message="onMessage"></web-view>
		<!--#endif-->

		<!--#ifdef APP-PLUS-->
		<web-view src="/static/html/map.html" @message="onMessage"></web-view>
		<!--#endif-->
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
	</div>
</template>

<script>
export default {
	data() {
		return {
			height: uni.getSystemInfoSync().screenHeight
		};
	},
	onReady() {
		const self = this;
		//#ifdef H5
		if (window.isListen) {
			// 防止多次注册addEventListener事件
			return;
		}
		window.addEventListener(
			'message',
			function(event) {
				var loc = event.data;
				if (loc && loc.module == 'locationPicker') {
					self.getPositon(loc, self);
				}
				window.isListen = true;
				window.removeEventListener('message', function() {}, true);
			},
			false
		);
		//#endif
	},
	methods: {
		onMessage(res) {
			console.log('app接收网页消息:', res.detail.data[0]);
			this.getPositon(res.detail.data[0], this);
		},
		getPositon(res, self) {
			let pages = getCurrentPages();
			let prePage = pages[pages.length - 2];
			prePage.$vm.onAddressChange(res);
			uni.navigateBack({
				delta:1
			})
		}
	}
};
</script>

<style scoped lang="scss"></style>
