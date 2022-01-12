<template>
	<view>
		<view class="od-box">
			<view class="od-title">
				案件主体信息
				<slot name="case-edit" style="width: 50rpx;"></slot>
			</view>
			<view class="case-title">委托人诉求</view>
			<view class="od-item marginbottom10">
				<textarea disabled auto-height="true" class="textarea" placeholder="无" placeholder-class="placeholder"
					v-model="requirement" />
			</view>
			<view class="case-title">委托人</view>
			<view class="od-item">
				<view class="item-tip require">身份</view>
				<view class="item-right">
					<view class="service-list inline-list" v-if="my_ident.label">
						<view class="service-item active" style="width: 200rpx;">{{ my_ident.label }}</view>
					</view>
					<view class="item-txt gray" v-else>无</view>
				</view>
			</view>
			<view class="od-item marginbottom10">
				<view class="item-tip require">姓名</view>
				<view class="item-right">
					<view class="item-txt"><input disabled type="text" class="ipt" value="" placeholder="无"
							placeholder-class="placeholder" v-model="clientInfo.self_name" /></view>
				</view>
			</view>
			<view class="od-item marginbottom10">
				<view class="item-tip require">证件号码</view>
				<view class="item-right">
					<view class="item-txt"><input disabled type="text" class="ipt" value="" placeholder="无"
							placeholder-class="placeholder" v-model="clientInfo.self_code" /></view>
				</view>
			</view>
			<view class="od-item marginbottom10">
				<view class="item-tip require">联系电话</view>
				<view class="item-right">
					<view class="item-txt"><input disabled type="text" class="ipt" value="" placeholder="无"
							placeholder-class="placeholder" v-model="clientInfo.self_tel" /></view>
				</view>
			</view>
			<template v-for="(item, index) in otherInfoLIst">
				<view class="case-title">对方当事人</view>
				<view class="od-item marginbottom10">
					<view class="item-tip require">姓名</view>
					<view class="item-right">
						<view class="item-txt"><input disabled type="text" class="ipt" value="" placeholder="无"
								placeholder-class="placeholder" v-model="item.dui_name" /></view>
					</view>
				</view>
				<view class="od-item marginbottom10">
					<view class="item-tip require">证件号码</view>
					<view class="item-right">
						<view class="item-txt"><input disabled type="text" class="ipt" value="" placeholder="无"
								placeholder-class="placeholder" v-model="item.dui_code" /></view>
					</view>
				</view>
				<view class="od-item marginbottom10">
					<view class="item-tip require">联系电话</view>
					<view class="item-right">
						<view class="item-txt"><input disabled type="text" class="ipt" value="" placeholder="无"
								placeholder-class="placeholder" v-model="item.dui_tel" /></view>
					</view>
				</view>
			</template>
		</view>

	</view>
</template>

<script>
	export default {
		props: ['info'],
		data() {
			return {
				requirement: '', //委托人诉求
				showIdent: false,
				infoIdent: [], //我的身份选择
				my_ident: '', //我的身份
				clientInfo: {
					self_name: '', //姓名
					self_code: '', //证件号码
					self_tel: '' //联系电话
				},
				otherInfoLIst: [{
					dui_name: '', //姓名
					dui_code: '', //证件号码
					dui_tel: '' //联系电话
				}]
			};
		},
		created() {
			this.init();
		},
		methods: {
			async init() {
				// 案件主体初始化
				this.requirement = this.info.order.requirement;
				this.my_ident = {
					value: this.info.order.my_ident,
					label: this.info.order.my_ident_text
				};
				this.clientInfo = {
					self_code: this.info.order.self_code,
					self_name: this.info.order.self_name,
					self_tel: this.info.order.self_tel
				};
				if (this.info.order.dui) {
					this.otherInfoLIst = this.info.order.dui;
				}
			}

		}
	};
</script>

<style lang="scss">
	.od-title {
		display: flex;
	}

	.case-title {
		margin-bottom: 10rpx;
		position: relative;
		padding-left: 30rpx;

		.title-del {
			.image-wrapper {
				width: 35rpx;
				height: 35rpx;

				image {
					vertical-align: middle;
					width: 100%;
					height: 100%;
				}
			}

			float: right;
		}

		&::before {
			content: '';
			position: absolute;
			width: 10rpx;
			height: 25rpx;
			background-color: $uni-color-primary;
			border-radius: 40rpx;
			left: 0;
			top: 8rpx;
		}
	}
</style>
