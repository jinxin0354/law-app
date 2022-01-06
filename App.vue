<script>
export default {
	onLaunch: function() {
		const nav = navigator.userAgent;
		if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
			getApp().globalData.system = 'android'
		} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
			getApp().globalData.system = 'ios'
		}
	},
	onShow: function() {},
	onHide: function() {}
};
</script>

<style lang="scss">
@import 'uview-ui/index.scss';
@import '@/common/style/common.scss';
@import '@/static/font/iconfont.css';
@import '@/common/style/layout.css';

// 设置scroolview滚动条
::-webkit-scrollbar {
	width: 10upx !important;
	height: 10upx !important;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
	border-radius: 10px;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
// 设置导航栏文字大小
uni-page-head .uni-page-head__title {
	font-size: 32rpx !important;
	font-weight: normal;
}
uni-page-head .uni-page-head-ft .uni-btn-icon {
	font-size: 32rpx;
	font-weight: normal !important;
	padding-top: 3rpx;
	padding-right: 6rpx;
}
.top-nav-box .nav-left {
	font-size: 34rpx !important;
}
.top-nav-box {
	font-size: 32rpx !important;
}

.legalAffairs,
.lawyerAuth,
.investors {
	.u-form-item--left__content--required {
		right: 0 !important ;
		left: auto !important;
	}

}
.u-checkbox__icon-wrap--disabled{
	background-color: #278A00  !important;
	border-color: #278A00 !important;
}
</style>
