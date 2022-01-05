<template>
	<uni-popup ref="popupTel" type="dialog">
		<uni-popup-dialog type="info" okTxt="打电话" cancleTxt="取消" content="" :before-close="true" @confirm="callVirtualTel" @close="closePop('popupTel')">
			<view class="tel-change-box">
				<view class="tel-change-txt">
					您将用
					<text class="blue">{{ vPhone }}</text>
					这个号码呼叫，若非本机号请
					<text class="blue" @click="isChangeVphone = !isChangeVphone">点击修改</text>
				</view>
				<view class="gray">您的号码将会被保护，对方看到的是虚拟号</view>
				<view class="topView" v-if="isChangeVphone">
					<input class="ipt-border" type="number" placeholder="请输入" v-model="newVphone" />
					<view class="topViewBtn" @click="confirmChange()">确定</view>
				</view>
			</view>
		</uni-popup-dialog>
	</uni-popup>
</template>

<script>
export default {
	props: ['info'],
	data() {
		return {
			vPhone: '',
			isChangeVphone: false,
			newVphone: ''
		};
	},
	created() {
		this.init();
	},
	methods: {
		async init() {
			let formData = {
				id: this.info.order.id,
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.get_mobile', formData);
			if (res.code == 1) {
				this.vPhone = res.data.mobile;
			}
		},
		async callVirtualTel(newMobile) {
			this.$refs.popupTel.close();
			// 拨打虚拟电话
			let formData = {
				id: this.info.order.id,
				token: uni.getStorageSync('token'),
				newMobile
			};
			let res = await this.$api('index.virtual_tel', formData);
			if (res.code == 1) {
				let phoneNumber = res.data.middleNumber;
				const nav = navigator.userAgent;
				if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
					phone.call(phoneNumber);
				} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
					this.$bridge.callhandler('call', phoneNumber, data => {});
				}
			}
		},
		async confirmChange() {
			if (!this.newVphone || !/^1[34578]\d{9}$/.test(this.newVphone)) {
				uni.showToast({
					title: '请输入正确的号码',
					icon: 'none'
				});
				return;
			}
			this.callVirtualTel(this.newVphone);
		}
	}
};
</script>

<style lang="scss">
.tel-change-box {
	line-height: 50rpx;
}
.topView {
	display: flex;
	margin-top: 10rpx;
	.ipt-border {
		height: 50rpx;
	}
	.topViewBtn {
		width: 120rpx;
		text-align: center;
		height: 70rpx;
		background-color: #ffc801;
		color: #ffffff;
		border-color: #ffc801;
		border-radius: 5px;
		padding: 5px 0;
		margin-left: 20rpx;
	}
}
</style>
