<template>
	<view class="content">
		<view class="why-box">
			<view class="why-title">诉讼结果</view>
			<radio-group @change="resultChange">
				<label class="" v-for="(item, index) in resultLIst" :key="item.value">
					<view class="why-radio">
						<radio :value="item.name" style="transform: scale(0.7);" color="#FFC801" :checked="result == item.name ? true : false" />
						<view class="why-txt">{{ item.name }}</view>
						<view class="why-ipt-box" v-if="item.name == '其他结果:'"><input class="why-ipt" type="text" v-model="otherReason" placeholder="请输入" /></view>
					</view>
				</label>
			</radio-group>
		</view>
		<view class="why-box">
			<view class="why-title">回款结果</view>
			<radio-group @change="resultChange2" class="flex">
				<label class="flex1" v-for="(item, index) in resultLIst2" :key="item.value">
					<view class="why-radio">
						<radio :value="item.name" style="transform: scale(0.7);" color="#FFC801" :checked="result2 == item.name ? true : false" />
						<view class="why-txt">{{ item.name }}</view>
					</view>
				</label>
			</radio-group>
			<view class="why-radio padding0" v-if="result2 == '全额回款'">
				<view class="why-txt">回款总金额：</view>
				<view class="why-ipt-box"><input class="why-ipt" type="text" v-model="return_money" placeholder="请输入" /></view>
			</view>
			<view v-else-if="result2 == '部分回款'">
				<view class="why-radio">
					<view class="why-txt">回款总金额：</view>
					<view class="why-ipt-box"><input class="why-ipt" type="text" v-model="return_money" placeholder="请输入" /></view>
				</view>
				<view class="why-radio">
					<view class="why-txt">冲销本金：</view>
					<view class="why-ipt-box"><input class="why-ipt" type="text" v-model="against_ben" placeholder="请输入" /></view>
				</view>
				<view class="why-radio padding0">
					<view class="why-txt">冲销其他款项：</view>
					<view class="why-ipt-box"><input class="why-ipt" type="text" v-model="against_else" placeholder="请输入" /></view>
				</view>
			</view>
			<view class="why-radio" v-else-if="result2 == '无回款'"></view>
		</view>
		<view class="why-box">
			<view class="why-title">我已快递如下文件给投资人</view>
			<radio-group @change="resultChange3">
				<label class="" v-for="(item, index) in resultLIst3" :key="item.value">
					<view class="why-radio">
						<radio :value="item.name" style="transform: scale(0.7);" color="#FFC801" :checked="result3 == item.name ? true : false" />
						<view class="why-txt">{{ item.name }}</view>
					</view>
				</label>
			</radio-group>
		</view>
		<view class="why-box">
			<view class="why-title">我确认如下事项</view>
			<checkbox-group @change="resultChange4">
				<label class="" v-for="(item, index) in resultLIst4" :key="item.value">
					<view class="why-radio">
						<checkbox :value="item.name" style="transform: scale(0.7);" color="#FFC801" />
						<view class="why-txt">{{ item.name }}</view>
					</view>
				</label>
			</checkbox-group>
		</view>
		<view class="ok-box fixed"><button type="default" class="ok-btn" @click="confirmServiceOk">我要申请</button></view>
	<!-- 全局通用组件 -->
	<law-common ref="lawCommon"></law-common>
	</view>
</template>

<script>
export default {
	data() {
		return {
			order_id: '',
			resultLIst: [
				{
					name: '判决支持起诉的全部本金'
				},
				{
					name: '判决支持起诉的部分本金'
				},
				{
					name: '民事调解'
				},
				{
					name: '和解撤诉'
				},
				{
					name: '驳回诉请/不予受理'
				},
				{
					name: '其他结果:'
				}
			],
			resultLIst2: [
				{
					name: '全额回款'
				},
				{
					name: '部分回款'
				},
				{
					name: '无回款'
				}
			],
			resultLIst3: [
				{
					name: '原件一份【确认债权的裁判文书/和解协议】'
				}
			],
			resultLIst4: [
				{
					name: '我已与委托人、投资人确认服务完成。'
				},
				{
					name: '我已让委托人向投资人支付完投资收益。'
				},
				{
					name: '我已与投资人结算完投资人奖励。'
				}
			],
			otherReason: '',
			return_money: '',
			against_ben: '',
			against_else: '',
			result: '',
			result2: '',
			result3: '',
			result4: []
		};
	},
	onLoad(params) {
		if (params.order_id) {
			this.order_id = params.order_id;
		}
		// 表单初始化
		this.result = this.resultLIst[0].name;
		this.result2 = this.resultLIst2[0].name;
		this.result3 = this.resultLIst3[0].name;
	},
	methods: {
		resultChange(e) {
			this.result = e.detail.value;
		},
		resultChange2(e) {
			this.result2 = e.detail.value;
			if (this.result2 == '全额回款') {
				this.resultLIst3 = [
					{
						name: '原件一份【确认债权的裁判文书/和解协议】'
					}
				];
				this.result3 = this.resultLIst3[0].name;
			} else if (this.result2 == '部分回款') {
				this.resultLIst3 = [
					{
						name: '原件各一份【确认债权的裁判文书、民事裁定书（追加投资人为申请执行人）、民事裁定书（终结本次执行）】复印件各一份【执行申请书、执行立案通知书】'
					}
				];
				this.result3 = this.resultLIst3[0].name;
			} else if (this.result2 == '无回款') {
				this.resultLIst3 = [
					{
						name: '原件各一份【确认债权的裁判文书、民事裁定书（追加投资人为申请执行人）、民事裁定书（终结本次执行）】复印件各一份【执行申请书、执行立案通知书】'
					}
				];
				this.result3 = this.resultLIst3[0].name;
			}
		},
		resultChange3(e) {
			this.result3 = e.detail.value;
		},
		resultChange4(e) {
			this.result4 = e.detail.value;
		},
		async confirmServiceOk() {
			if(this.result4.length < 3){
				uni.showToast({
					title:'我确认如下事项,需全选',
					icon:'none'
				})
				return
			}
			let formData = {
				id: this.order_id,
				token: uni.getStorageSync('token'),
				is_send: this.result3,
				sure: JSON.stringify(this.result4) 
			};
			if (this.result == '其他结果:') {
				formData = { ...formData, result: this.result + this.otherReason };
			} else {
				formData = { ...formData, result: this.result };
			}

			if (this.result2 == '全额回款') {
				formData = { ...formData, return_type: this.result2, return_money: this.return_money };
			} else if (this.result2 == '部分回款') {
				formData = { ...formData, return_type: this.result2, return_money: this.return_money, against_ben: this.against_ben, against_else: this.against_else };
			} else if (this.result2 == '无回款') {
				formData = { ...formData, return_type: this.result2 };
			}

			let res = await this.$api('index.lawyer_sure', formData);
			if (res.code == 1) {
				let pages = getCurrentPages();
				let prevPage = pages[pages.length - 2];
				prevPage.$vm.isLawyerServiceOk = true;
				prevPage.$vm.disableRemoveEntrust = true;
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
};
</script>

<style lang="scss">
.content {
	padding-bottom: 150rpx;
}
.result-ipt {
	padding-left: 10rpx;
	padding-right: 10rpx;
}
.why-box {
	background-color: #ffffff;
	border-radius: 26rpx;
	padding: 30rpx;
	margin-bottom: 20rpx;
	.why-title {
		font-weight: bold;
		margin-bottom: 20rpx;
	}
	.why-radio {
		padding-bottom: 20rpx;
		display: flex;
		flex-wrap: wrap;
		.why-txt {
		}
		.why-ipt-box {
			flex: 1;
			border-bottom: 1rpx solid #eee;
			vertical-align: bottom;
			margin-left: 20rpx;
			padding-bottom: 4rpx;
		}
	}
}
</style>
