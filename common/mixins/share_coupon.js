export const share_coupon = {
	data() {
		return {
		}
	},
	created() {
		// 安卓
		window.shareOk = this.shareOk;
	},
	methods: {
		shareOk() {
			this.$refs.orderAllDetail.shareOk();
		}
	}
}
