<template>
	<web-view :webview-styles="webviewStyles" src="https://uniapp.dcloud.io/static/web-view.html"></web-view>
	<!-- <web-view :webview-styles="webviewStyles" src="https://www.jianshu.com/p/adc72eae0593"></web-view> -->
	<!-- <view> -->
	<!-- <web-view  :webview-styles="webviewStyles" :src="' http://view.officeapps.live.com/op/view.aspx?src='+this.link"></web-view> -->
	<!-- <web-view src="@/static/zhaiquan.doc"></web-view> -->
	<!-- <web-view :src="link"></web-view> -->
	<!-- </view> -->
</template>

<script>
	export default {
		data() {
			return {
				link: '',
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				}
			};
		},
		onLoad(options) {
			this.init();
		},
		methods: {
			async init() {
				let formDataContract = {
					token: uni.getStorageSync('token')
				};
				let resContract = await this.$api('index.contract', formDataContract);
				this.link = resContract.data;
				console.log(this.link);
			}
		}
	};
</script>

<style></style>
