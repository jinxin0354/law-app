<template>
	<uni-popup ref="popupTip" type="center">
		<order-popup-common title="温馨提示" @closePop="closePop('popupTip')">
			<scroll-view class="popup-con" scroll-y="true" slot="popup-con">
				<slot></slot>
			</scroll-view>
			<view class="ok-box" slot="popup-btn"><button type="default" class="ok-btn" @click="closePop('popupTip')">朕知道了</button></view>
		</order-popup-common>
	</uni-popup>
</template>

<script>
export default {
	data() {
		return {};
	},
	created() {},
	methods: {}
};
</script>

<style lang="scss">
</style>
