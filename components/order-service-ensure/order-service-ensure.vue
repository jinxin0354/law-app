<template>
	<uni-popup ref="popupEnsure" type="center">
		<order-popup-common title="服务保障" @closePop="closePop('popupEnsure')">
			<scroll-view class="popup-con" scroll-y="true" slot="popup-con">
				<view class="con-item" v-for="(item, index) in info.product.pro_tags_item">
					<view class="item-title">{{ item.tag_name }}</view>
					<view class="item-detail" v-html="item.tag_desc"></view>
				</view>
			</scroll-view>
			<view class="ok-box" slot="popup-btn"><button type="default" class="ok-btn" @click="closePop('popupEnsure')">朕知道了</button></view>
		</order-popup-common>
	</uni-popup>
</template>

<script>
export default {
	props: ['info'],
	data() {
		return {};
	},
	created() {},
	methods: {}
};
</script>

<style lang="scss">
</style>
