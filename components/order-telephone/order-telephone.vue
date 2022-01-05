<template>
	<uni-popup ref="popupTel" type="dialog">
		<uni-popup-dialog type="info" okTxt="打电话" cancleTxt="取消" content="" :before-close="true" @confirm="confirmTel" @close="closePop('popupTel')">
			<view class="tel-box">
				<view class="tel-tip">{{ name }}电话</view>
				<view class="tel-text">
					<view class="image-wrapper"><image src="@/static/img/tel.png" mode="aspectFit"></image></view>
					<view class="text-right">{{ phoneNumber }}</view>
				</view>
			</view>
		</uni-popup-dialog>
	</uni-popup>
</template>

<script>
export default {
	props: ['name', 'phoneNumber'],
	data() {
		return {};
	},
	created() {},
	methods: {
		confirmTel() {
			const nav = navigator.userAgent;
			if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
				phone.call(this.phoneNumber);
			} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
				this.$bridge.callhandler('call',this.phoneNumber,data => {
					// 处理返回数据
					console.log(data, '我走了这里');
				});
			}
		}
	}
};
</script>

<style lang="scss"></style>
