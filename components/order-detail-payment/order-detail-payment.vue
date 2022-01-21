<template>
	<view class="flex flex-vertical wait-box" v-if="list.pend_text.length > 0 ">
		<view class="wait-item flex flex-vertical" >
			<view class="wait-title">待收信息</view>
			<!-- 
			现在问题
				1.律师请款
					律师请款弹窗字段说明
					付款人，委托人，固定写死
					请款金额 money
					请款事由 reason
				
				2.申请投资费用弹窗内效果
			 -->
			<!-- <view class="flex flex-vertical item " v-for="item in list.pend_text" >
				<view class="flex flex-horizontal" @click="itemClick(item)">
					<view class="item-money">¥{{item.money}}</view>
					<view class="flex flex-horizontal flex-1">
						<view class="flex flex-vertical" style="width: 180px;">
							<text>{{item.name}}</text>
							<text>{{item.time}}</text>
						</view>
						<image v-if="item.shou_type == 2" class="image-r" src="@/static/img/right.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="flex flex-horizontal flex-center btn-back">
					<template v-if="!item.isapplay">
						<template v-if="item.is_shou == 0">
							<view
								class="comfir-btn flex flex-center"
								style="width: 50%;"
								@click="
									current_item = item;
									$refs.popupReceiveMoney.open();
								"
							>
								我要收款
							</view>
						</template>
						<template v-else>
							<view class="comfir-btn flex flex-center flex-1" 
								@click="
									current_item = item;
									$refs.popupCancelReceive.open();
								"
							>
								取消收款
							</view>
							<view class="comfir-btn flex flex-center flex-1" @click="$refs.telephoneClient.$refs.popupTel.open()">催促委托人付款</view>
						</template>
					</template>
					<template v-else>
						<view class="comfir-btn flex flex-center flex-1"
						@click="
							current_item = item;
							cancelReceiveMoney();
						"
						>取消收款</view>
						<view class="comfir-btn flex flex-center flex-1"
						 @click="$refs.telephoneInvestor.$refs.popupTel.open()"
						>催促委托人付款</view>
					</template>
				</view>
			</view> -->
			<!-- 
			律师申请投资费用 
			pend_apply 这个数组里存放的只有 律师申请费用的数据
			shou_type = 3 也可以作为 申请投资费用 标识
			字段 popup 封装了弹窗需要的数据
			announce: "https://oss.bigchun.com/fali/uploads/20220115/51c0ec6e22ba420d3381389239d5c9e2.jpg,https://oss.bigchun.com/fali/uploads/20220115/da6a13a62387f37e6ffe75d4cd0e5653.jpg"
			announce_money: "2.00"
			case: "https://oss.bigchun.com/fali/uploads/20220115/9f236bf8512988b8b95376da2577974d.jpg"
			case_money: "5000.00"
			case_time: "2022-01-16 周日"
			contract: ""
			enquire: "0.00"
			indictment: ""
			lawyer: "0.00"
			main: ""
			note: ""
			案件受理费 case_money
			缴纳截止日 case_time
			案件受理费缴纳通知书 case
			公告费 announce_money
			公告缴费通知书 announce
			异地被告身份查询费 enquire
			律师费 lawyer
			委托人代理合同 contract
			委托人主体资料 main
			起诉状(委托人已签章) indictment
			立案受理通知书 note
			-->
			<view class="flex flex-vertical item " v-for="item in list.pend_apply" >
				<view class="flex flex-horizontal" @click="itemClick(item)">
					<view class="item-money">¥{{item.money}}</view>
					<view class="flex flex-horizontal flex-1">
						<view class="flex flex-vertical" style="width: 180px;">
							<text>{{item.name}}</text>
							<text>{{item.time}}</text>
						</view>
						<image v-if="item.type == 8 || item.type == 3 || item.type == 7" class="image-r" src="@/static/img/right.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="flex flex-horizontal flex-center-v btn-back">
					<view class="comfir-btn flex flex-center flex-1" 
					@click="
						current_item = item;
						cancelReceiveMoney();
					"
					>取消收款</view>
					<view class="comfir-btn flex flex-center flex-1"
					 @click="$refs.telephoneInvestor.$refs.popupTel.open()"
					>催促委托人付款</view>
				</view>
			</view>
		</view>
		<!-- 打电话组件 -->
		 <order-telephone name="委托人" :phoneNumber="list.user_mobile" ref="telephoneClient" v-if="list.user_mobile"></order-telephone>
		<order-telephone name="律师" :phoneNumber="list.lawyer_mobile" ref="telephoneLawyer" v-if="list.lawyer_mobile"></order-telephone>
		<order-telephone name="投资人" :phoneNumber="list.investor_mobile" ref="telephoneInvestor" v-if="list.investor_mobile"></order-telephone>
		
		 <!-- 我要收款弹出层 -->
		 <uni-popup ref="popupReceiveMoney" type="dialog">
		 	<uni-popup-dialog
		 		type="info"
		 		okTxt="是"
		 		cancleTxt="否"
		 		content="我已与委托人确认付款事宜"
		 		:before-close="true"
		 		@confirm="
		 			closePop('popupReceiveMoney');
		 			confirmReceiveMoney();
		 		"
		 		@close="closePop('popupReceiveMoney')"
		 	></uni-popup-dialog>
		 </uni-popup>
		 <!-- 取消收款弹出层 -->
		 <uni-popup ref="popupCancelReceive" type="dialog">
		 	<uni-popup-dialog
		 		type="info"
		 		okTxt="是"
		 		cancleTxt="否"
		 		content="取消收款"
		 		:before-close="true"
		 		@confirm="
		 			closePop('popupCancelReceive');
		 			cancelReceiveMoney1();
		 		"
		 		@close="closePop('popupCancelReceive')"
		 	></uni-popup-dialog>
		 </uni-popup>
		
	</view>
</template>

<script>
export default {
	props: ['info','list'],
	data() {
		return {
			order:[],
			current_item:{}
		};
	},
	created() {
		/* console.log('list');
		console.log(this.list.length);
		console.log(this.list.pend_text); */
		this.order = this.list;
	},
	methods: {
		itemClick(item) {
			this.$emit('popupShow',item)
		},
		async confirmReceiveMoney() {
			let formData = {
				id: this.order.id,
				token: uni.getStorageSync('token'),
				type: 1, //类型 1分期或者先用后付 2我要额外收款
				fen: this.current_item.fen
			};
			let res = await this.$api('index.lawyer_collect', formData);
			if (res.code == 1) {
				this.$emit('init');
			}
		}, 
		async cancelReceiveMoney1() {
			let formData = {
				id: this.current_item.id,
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.lawyer_cancel_collect', formData);
			if (res.code == 1) {
				uni.showToast({
					title: res.msg,
					icon: 'none'
				});
				this.$emit('init');
			}
		},
		async cancelReceiveMoney() {
			//这里需要再帮后台传一个  shou_type 参数
			let formData = {
				id: this.current_item.id,
				token: uni.getStorageSync('token'),
				shou_type:this.current_item.shou_type
			};
			let res = await this.$api('index.cancel_apply', formData);
			if (res.code == 1) {
				uni.showToast({
					title: res.msg,
					icon: 'none'
				});
				this.$emit('init');
			}
		},
		async returnApplyFee(isreduction) {
			//这里需要再帮后台传一个  shou_type 参数
			let formData = {
				id: this.current_item.id,
				token: uni.getStorageSync('token'),
				isreduction: isreduction,
				shou_type:this.current_item.shou_type
			};
			let res = await this.$api('latefee.setreply', formData);
			if (res.code == 1) {
				this.$emit('init');
				uni.showToast({
					title: res.msg,
					icon: 'none'
				});
			}
		},
	}
};
</script>

<style>
	.btn-back {
		padding: 10px 0;
	}
	
	.image-r {
		width: 9px;
		height: 14px;
		margin-left: 35px;
	}
	.item {
		margin-top: 12px;
		margin-bottom: 12px;
	}
</style>

<style lang="scss"></style>
