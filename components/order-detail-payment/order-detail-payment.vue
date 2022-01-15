<template>
	<view class="flex flex-vertical wait-box" v-if="list.length > 0 ">
		<view class="wait-item flex flex-vertical" >
			<view class="wait-title">待收信息</view>
			<view class="flex flex-vertical item " v-for="item in list" >
				<view class="flex flex-horizontal" @click="itemClick(item)">
					<view class="item-money">¥{{item.money}}</view>
					<view class="flex flex-horizontal flex-1">
						<view class="flex flex-vertical" style="width: 160px;">
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
		<order-telephone name="委托人" :phoneNumber="info.order.user_mobile" ref="telephoneClient" v-if="info.order.user_mobile"></order-telephone>
		<order-telephone name="律师" :phoneNumber="info.order.lawyer_mobile" ref="telephoneLawyer" v-if="info.order.lawyer_mobile"></order-telephone>
		<order-telephone name="投资人" :phoneNumber="info.order.investor_mobile" ref="telephoneInvestor" v-if="info.order.investor_mobile"></order-telephone>
		
		
	</view>
</template>

<script>
export default {
	props: ['info','list'],
	data() {
		return {
			current_item:{}
		};
	},
	created() {},
	methods: {
		itemClick(item) {
			this.$emit('popupShow',item)
		},
		async cancelReceiveMoney() {
			let formData = {
				id: this.current_item.id,
				token: uni.getStorageSync('token')
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
			let formData = {
				id: this.current_item.id,
				token: uni.getStorageSync('token'),
				isreduction: isreduction
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
