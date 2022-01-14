<template>
	<view class="content">
		<view class="why-box">
			<view class="why-title">委托人主张的欠款本金<span style="color: #FF0000;">*</span></view>
			<view class="tab">
				<view class="tab-item" :class="tabIndex=='全部支持'?'tab-itemed':''" @click="checktab('全部支持')">全部支持</view>
				<view class="tab-item" :class="tabIndex=='部分支持'?'tab-itemed':''" @click="checktab('部分支持')">部分支持</view>
				<view class="tab-item" :class="tabIndex=='全部不支持'?'tab-itemed':''" @click="checktab('全部不支持')">全部不支持</view>
			</view>
		</view>
		<view class="why-box" v-if="tabIndex!='全部不支持'">
			<view class="why-title">回款结果<span style="color: #FF0000;">*</span></view>
			<view class="tab">
				<view class="tab-item" :class="tabIndexs=='全额回款'?'tab-itemed':''" @click="checktabs('全额回款')">全额回款</view>
				<view class="tab-item" :class="tabIndexs=='部分回款'?'tab-itemed':''" @click="checktabs('部分回款')">部分回款</view>
				<view class="tab-item" :class="tabIndexs=='无回款'?'tab-itemed':''" @click="checktabs('无回款')">无回款</view>
			</view>
			<block v-if="tabIndexs=='全额回款'||tabIndexs=='部分回款'">
				<view class="why-title" style="margin-top: 30rpx;">回款总金额<span style="color: #FF0000;">*</span></view>
				<view class="input">
					<view class="">￥</view>
					<input type="text" @input="inputChange($event,'return_money')" pattern="[0-9]*"  placeholder="输入金额" v-model="return_money" />
					<image src="../../../static/img/icon/write.png" style="width: 19rpx;height: 20rpx;"></image>
				</view>
			</block>
			<block v-if="tabIndexs=='部分回款'">
				<view class="why-title" style="margin-top: 30rpx;">冲销本金<span style="color: #FF0000;">*</span></view>
				<view class="input">
					<view class="">￥</view>
					<input type="text" @input="inputChange($event,'against_ben')" pattern="[0-9]*"  placeholder="输入金额" v-model="against_ben" />
					<image src="../../../static/img/icon/write.png" style="width: 19rpx;height: 20rpx;"></image>
				</view>
			</block>
			<block v-if="tabIndexs=='部分回款'">
				<view class="why-title" style="margin-top: 30rpx;">冲销其他款项<span style="color: #FF0000;">*</span></view>
				<view class="input">
					<view class="">￥</view>
					<input type="text" @input="inputChange($event,'against_else')" pattern="[0-9]*"  placeholder="输入金额" v-model="against_else" />
					<image src="../../../static/img/icon/write.png" style="width: 19rpx;height: 20rpx;"></image>
				</view>
			</block>
		</view>
		<view class="why-box">
			<view class="why-title">我已快递如下文件给投资人<span style="color: #FF0000;">*</span></view>
			<view class="xieyi" @click="is_kuaidi=!is_kuaidi">
				<image src="../../../static/img/icon/radio.png" v-if="is_kuaidi==false" style="width: 34rpx;height: 34rpx;"></image>
				<image src="../../../static/img/icon/radioed.png" v-if="is_kuaidi==true" style="width: 34rpx;height: 34rpx;"></image>
				<view class="" style="margin-left: 5rpx;font-weight: 400;">
					<view>原件一份</view>
					<text style="line-height: 55rpx;"  v-if="(tabIndex=='全部支持'&& tabIndexs=='全额回款')|| tabIndex=='全部不支持'">
						{{kuaidi[0]}}
					</text>
					<text style="line-height: 55rpx;" v-else>
						<view v-for="i in kuaidi">{{i}}</view>
					</text>
				</view>
			</view>
		</view>
		<view class="why-box">
			<view class="why-title">我确认如下事项<span style="color: #FF0000;">*</span></view>
			<view class="xieyi" style="height: 80rpx;" @click="is_service=!is_service">
				<image src="../../../static/img/icon/radio.png" v-if="is_service==false" style="width: 34rpx;height: 34rpx;"></image>
				<image src="../../../static/img/icon/radioed.png" v-if="is_service==true" style="width: 34rpx;height: 34rpx;"></image>
				<view style="margin-left: 10rpx;font-weight: 300;">我已与委托人、投资人确认服务完成。</view>
			</view>
			<view class="xieyi" style="height: 80rpx;" @click="is_shouyi=!is_shouyi">
				<image src="../../../static/img/icon/radio.png" v-if="is_shouyi==false" style="width: 34rpx;height: 34rpx;"></image>
				<image src="../../../static/img/icon/radioed.png" v-if="is_shouyi==true" style="width: 34rpx;height: 34rpx;"></image>
				<view style="margin-left: 10rpx;font-weight: 300;">我已让委托人向投资人支付完投资收益。</view>
			</view>
			<view class="xieyi" @click="is_jiangli=!is_jiangli">
				<image src="../../../static/img/icon/radio.png" v-if="is_jiangli==false" style="width: 34rpx;height: 34rpx;"></image>
				<image src="../../../static/img/icon/radioed.png" v-if="is_jiangli==true" style="width: 34rpx;height: 34rpx;"></image>
				<view style="margin-left: 10rpx;font-weight: 300;">我已与投资人结算完投资人奖励。</view>
			</view>
		</view>
		<view class="fixed sumit" @click="confirmServiceOk">我要申请</view>
	<!-- 全局通用组件 -->
	<law-common ref="lawCommon"></law-common>
	</view>
</template>

<script>
export default {
	data() {
		return {
			order_id: '', //订单id
			return_money: '', //回款总金额
			against_ben: '', //冲销本金
			against_else: '', // 冲销其他款项
			//新修改 start
			tabIndex:'',
			tabIndexs:'',
			is_kuaidi:false,
			is_jiangli:false,
			is_service:false,
			is_shouyi:false,
			kuaidi:[
				'【追欠款的生效裁判文书/和解协议】',
				'【民事裁定书（追加投资人为申请执行人）】',
				'【民事裁定书（终结本次执行）】',
				'复印件各一份',
				'【执行申请书】',
				'【执行立案通知书】'
			]
			//新修改 end
		};
	},
	onLoad(params) {
		if (params.order_id) {
			this.order_id = params.order_id;
		}
	},
	methods: {
		async confirmServiceOk() {
			if(this.is_service==false || this.is_jiangli==false||this.is_shouyi==false){
				uni.showToast({
					title:'我确认如下事项,需全选',
					icon:'none'
				})
				return
			}
			if(this.is_kuaidi==false){
				uni.showToast({
					title:'我已快递如下文件给投资人,需选中',
					icon:'none'
				})
				return
			}
			if(this.tabIndex==''){
				uni.showToast({
					title:'委托人主张的欠款本金,需选中',
					icon:'none'
				})
				return
			}
			if(this.tabIndexs==''&&this.tabIndex!='全部不支持'){
				uni.showToast({
					title:'回款结果,需选中',
					icon:'none'
				})
				return
			}
			if(this.tabIndexs=='全额回款' && this.return_money==''){
				uni.showToast({
					title:'回款总金额必填',
					icon:'none'
				})
				return
			}
			if(this.tabIndexs=='部分回款' && (this.return_money==''||
			this.against_ben=='' || this.against_else=='')){
				uni.showToast({
					title:this.return_money==''?'回款总金额必填':this.against_ben==''?'冲销本金必填':'冲销其他款项必填',
					icon:'none'
				})
				return
			}
			let formData = {
				id: this.order_id,
				token: uni.getStorageSync('token'),
				result:this.tabIndex,
				return_money:this.return_money,
				against_ben:this.against_ben,
				against_else:this.against_else,
				is_send:'原件一份'+','+this.kuaidi.join(','),
				return_type:this.tabIndexs
			};
			
			
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
		},
		//欠款本金切换
		checktab(e){
			this.tabIndex=e
			if(e=='全部不支持') this.tabIndexs=''
		},
		//回款结果选项切换
		checktabs(e){
			this.tabIndexs=e
		},
		inputChange(e,type){
			this.$nextTick(() => {
				this[type] = e.detail.value.replace(/\D/g,'')
			})
		},
		
	}
};
</script>

<style lang="scss">
.content {
	padding-bottom: 150rpx;
	padding-left: 20rpx;
	padding-right: 20rpx;
	padding-top: 20rpx;
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
		font-size: 30rpx;
		margin-bottom: 20rpx;
	}
	.tab{
		display: flex;
		.tab-item{
			font-size: 28rpx;
			color: #000000;
			width: 180rpx;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			border-radius: 38rpx;
			border: 1rpx solid #999999;
			margin-right: 20rpx;
			font-weight: 300;
		}
		.tab-itemed{
			color: white;
			background-color: #FFC900;
			border: none;
		}
	}
	.input{
		font-size: 26rpx;
		display: flex;
		align-items: center;
		width: 585rpx;
		height: 60rpx;
		border-radius: 12rpx;
		border: 1rpx solid #E0E0E0;
		padding-left: 17rpx;
		padding-right: 17rpx;
		input{
			width: 500rpx;
			height: 60rpx;
			font-size: 26rpx;
			margin-left: 10rpx;
			margin-right: 10rpx;
			letter-spacing: 1rpx;
			
		}
	}
	.xieyi{
		display: flex;
		align-items: flex-start;
	}
}
.sumit{
	width: 710rpx;
	height: 80rpx;
	line-height: 80rpx;
	text-align: center;
	color: white;
	border-radius: 40rpx;
	background-color: #FFC900;
	font-size: 32rpx;
}
</style>
