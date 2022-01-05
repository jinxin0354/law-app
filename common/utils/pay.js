// 调用支付 参数：订单id，支付方式，分期
export default function pay({
	order_id,
	payMethod,
	fen,
	pay_type
}) {
	let type = 0
	if (payMethod == '微信') {
		type = 51;
	} else if (payMethod == '支付宝') {
		type = 52;
	} else if (payMethod == '余额') {
		type = 53;
	} else if (payMethod == '朋友代付') {
		type = 54;
		this.replace('/pages/client/user/to-friend', {
			order_id: order_id,
			pay_type:pay_type
		});
		return;
	}

	uni.showLoading({
		title: '支付中...',
		mask: true
	});
	return new Promise(async (resolve, reject) => {
		let formData = {
			id: order_id,
			type: type,
			token: uni.getStorageSync('token'),
			fen: fen,
			pay_type: pay_type
		};
		let res = await this.$api('index.wx_ali', formData);
		let params = res.data.response;
		uni.hideLoading();
		if (res.code == 1) {
			if (type == 51) {
				const nav = navigator.userAgent;
				if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
					phone.pay('wechatpay', JSON.stringify(params));
				} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
					this.$bridge.callhandler('wechatpay', params, data => {
						if (data == true) {
							resolve(1);
						}
					});
				}
			} else if (type == 52) {
				const nav = navigator.userAgent;
				if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
					phone.pay('alipay', params);
				} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
					this.$bridge.callhandler('alipay', params, data => {
						if (data == true) {
							resolve(1);
						}
					});
				}
			} else if (type == 53) {
				if (params == 1) {
					uni.showToast({
						title: '支付成功',
						icon: 'none'
					})
					setTimeout(() => {
						resolve(1);
					}, 2000);
				}
			}
		} else {
			uni.showToast({
				title: '获取参数失败',
				icon: 'none'
			})
			reject(res);
		}
	})
}
