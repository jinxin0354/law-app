<template>
	<!-- 无理由更换律师弹出层 -->
	<uni-popup ref="popupChangeLawyer" type="dialog">
		<uni-popup-dialog
			type="info"
			okTxt="确定"
			cancleTxt="取消"
			content="我要换个律师"
			:before-close="true"
			@confirm="changeLawyer"
			@close="closePop('popupChangeLawyer')"
		></uni-popup-dialog>
	</uni-popup>
</template>

<script>
export default {
	props:['info'],
	data() {
		return {
		};
	},
	created() {
		
	},
	methods: {
		async changeLawyer() {
			let formData = {
				id: this.info.order.id,
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.change_lawyer', formData);
			if (res.code == 1) {
				this.replace('/pages/client/user/match', {
					order_id: this.info.order.id
				});
			}
		},
	}
};
</script>

<style lang="scss">
</style>
