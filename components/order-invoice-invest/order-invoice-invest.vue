<template>
	<view>
		<view class="wait-box" v-if="info.order.receipt && info.order.receipt.length > 0">
			<view class="wait-title">开发票</view>
			<view class="wait-item flex flex-vertical" v-for="(item, index) in info.order.receipt">
				<view class="flex flex-horizontal">
					<view class="item-money">￥{{ item.money }}</view>
					<view
						class="item-txt"
						@click="
							current_item = item;
							$refs.popupInvoiceDetail.open();
						"
					>
						<view class="txt-name">
							<view class=" text-ellipsis" style="width: 180px;">{{ item.name }}</view>
							<view class="txt-nav"><image src="@/static/img/right.png" mode="widthFix"></image></view>
						</view>
						<view class="txt-tip">{{ item.new_create }}</view>
						
					</view>
					<template v-if="item.is_receipt == 2">
						已开具
					</template>
					<template v-if="item.is_receipt == 0">
						取消开票
					</template>
				</view>
				<template v-if="userInfo.id == info.order.user_id">
					<view v-if="item.is_receipt == 1" class="item-btn flex flex-horizontal flex-center" style="margin-top: 10px;">
						<view  
							class="comfir-btn flex flex-center flex-1"
							type="default"
							@click="
								current_item = item;
								$refs.popupCancelInvoice.open();
							"
						>
							取消开票
						</view>
						<view class="comfir-btn flex flex-center flex-1" type="default" @click="$refs.telephoneLawyer.$refs.popupTel.open()">催促开票</view>
					</view>
				</template>
				<template v-else>
					<view class="item-btn flex flex-horizontal flex-center" style="margin-top: 10px;">
						<!-- <template v-if="item.is_receipt == 0">
							取消开票
						</template> -->
						<template v-if="item.is_receipt == 1">
							<view
								class="comfir-btn flex flex-center flex-1"
								type="default"
								@click="
									current_item = item;
									$refs.popupOkSend.open();
								"
							>
								已开具并邮寄
							</view>
						</template>
						<!-- <template v-else-if="item.is_receipt == 2">
							已开具
						</template> -->
					</view>
				</template>
			</view>
		</view>
		<!-- 取消开票弹出层 -->
		<uni-popup ref="popupCancelInvoice" type="dialog">
			<uni-popup-dialog
				type="info"
				okTxt="是"
				cancleTxt="否"
				content="取消开票"
				:before-close="true"
				@confirm="
					closePop('popupCancelInvoice');
					confirmCancelInvoice();
				"
				@close="closePop('popupCancelInvoice')"
			></uni-popup-dialog>
		</uni-popup>

		<!-- 打电话组件 -->
		<order-telephone name="委托人" :phoneNumber="info.order.user_mobile" ref="telephoneClient" v-if="info.order.user_mobile"></order-telephone>
		<order-telephone name="律师" :phoneNumber="info.order.lawyer_mobile" ref="telephoneLawyer" v-if="info.order.lawyer_mobile"></order-telephone>
		<order-telephone name="投资人" :phoneNumber="info.order.investor_mobile" ref="telephoneInvestor" v-if="info.order.investor_mobile"></order-telephone>
		<!-- 开票详情弹窗 -->
		<uni-popup ref="popupInvoiceDetail" type="center">
			<order-popup-common title="开票信息" @closePop="closePop('popupInvoiceDetail')">
				<template slot="popup-con">
					<view class="od-box">
						<view class="od-item">
							<view class="item-tip">开票金额</view>
							<view class="item-right">
								<view class="item-txt red">￥{{ current_item.money }}</view>
							</view>
						</view>
						<view class="od-item">
							<view class="item-tip">抬头类型</view>
							<view class="item-right">
								<view class="item-txt" v-if="current_item.type == 1">企业</view>
								<view class="item-txt" v-else>个人及政府单位</view>
							</view>
						</view>
						<view class="od-item">
							<view class="item-tip">名称</view>
							<view class="item-right">
								<view class="item-txt">{{ current_item.name }}</view>
							</view>
						</view>
						<template v-if="current_item.type == 1">
							<view class="od-item">
								<view class="item-tip">税号</view>
								<view class="item-right">
									<view class="item-txt">{{ current_item.tax }}</view>
								</view>
							</view>
							<view class="od-item" v-if="current_item.address != null">
								<view class="item-tip">公司地址</view>
								<view class="item-right">
									<view class="item-txt">{{ current_item.address }}</view>
								</view>
							</view>
							<view class="od-item" v-if="current_item.tel != null">
								<view class="item-tip">电话号码</view>
								<view class="item-right">
									<view class="item-txt">{{ current_item.tel }}</view>
								</view>
							</view>
							<view class="od-item" v-if="current_item.bank != null">
								<view class="item-tip">开户银行</view>
								<view class="item-right">
									<view class="item-txt">{{ current_item.bank }}</view>
								</view>
							</view>
							<view class="od-item" v-if="current_item.bank_account != null">
								<view class="item-tip">银行账户</view>
								<view class="item-right">
									<view class="item-txt">{{ current_item.bank_account }}</view>
								</view>
							</view>
						</template>
						<view class="od-item">
							<view class="item-tip">邮寄地址</view>
							<view class="item-right">
								<view class="item-txt">{{ current_item.province + current_item.city + current_item.country }}</view>
							</view>
						</view>
						<view class="od-item">
							<view class="item-tip">详细地址</view>
							<view class="item-right">
								<view class="item-txt">{{ current_item.send_address }}</view>
							</view>
						</view>
						<template v-if="current_item.type == 1">
							<view class="od-item">
								<view class="item-tip">收件人</view>
								<view class="item-right">
									<view class="item-txt">{{ current_item.consignee }}</view>
								</view>
							</view>
							<view class="od-item">
								<view class="item-tip">联系电话</view>
								<view class="item-right">
									<view class="item-txt">{{ current_item.phone }}</view>
								</view>
							</view>
						</template>
					</view>
					<template v-if="userInfo.id == info.order.user_id">
						<view class="ok-box flex flex-center"><button type="default" class="ok-btn" style="width: 50%;border-radius: 20px;" @click="$refs.popupInvoiceDetail.close">朕知道了</button></view>
					</template>
					<template v-else>
						<view class="ok-box"> 
							<button type="default" class="ok-btn" style="border-radius: 20px;" @click="copy">一键复制信息</button>
							<button
								type="default"
								style="border-radius: 20px;"
								class="ok-btn"
								@click="
									$refs.popupInvoiceDetail.close();
									$refs.telephoneClient.$refs.popupTel.open();
								"
							>
								电话核对信息
							</button>
						</view>
					</template>
				</template>
			</order-popup-common>
		</uni-popup>

		<!-- 已开具并邮寄弹出层 -->
		<uni-popup ref="popupOkSend" type="dialog">
			<uni-popup-dialog
				type="info"
				okTxt="是"
				cancleTxt="否"
				content="我确认已开具并邮寄发票给委托人"
				:before-close="true"
				@confirm="
					$refs.popupOkSend.close();
					confirmOkSend();
				"
				@close="closePop('popupOkSend')"
			></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import uniCopy from '@/common/utils/js_sdk/xb-copy/uni-copy.js';
export default {
	props: ['info'],
	data() {
		return {
			current_item: {}
		};
	},
	created() {},
	computed: {
		...mapGetters(['userInfo'])
	},
	methods: {
		async confirmCancelInvoice() {
			let formData = {
				token: uni.getStorageSync('token'),
				id: this.current_item.id
			};

			let res = await this.$api('index.cancel_receipt', formData);
			if (res.code == 1) {
				this.$emit('init');
			}
		},
		async confirmOkSend() {
			let formData = {
				id: this.current_item.id,
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.receipt_over', formData);
			if (res.code == 1) {
				this.$emit('init');
			}
		},
		//复制
		copy() {
			let copyInfo = '';
			if (this.current_item.type == 1) {
				copyInfo += `开票金额:${this.current_item.money},抬头类型:企业,名称:${this.current_item.name},税号:${this.current_item.tax},`;
				if(this.current_item.address != null){
					copyInfo += `公司地址:${this.current_item.address},`
				}
				if(this.current_item.tel != null){
					copyInfo += `电话号码:${this.current_item.tel},`
				}
				if(this.current_item.bank != null){
					copyInfo += `开户银行:${this.current_item.bank},`
				}
				if(this.current_item.bank_account != null){
					copyInfo += `银行账户:${this.current_item.bank_account},`
				}
			} else {
				copyInfo = `开票金额:${this.current_item.money},抬头类型:个人及政府单位,名称:${this.current_item.name},`;
			}

			copyInfo += `邮寄地址:${this.current_item.province + this.current_item.city + this.current_item.country},详细地址:${this.current_item.send_address}`;
			if (this.current_item.type == 1) {
				copyInfo += `收件人:${this.current_item.consignee},联系电话:${this.current_item.phone}`;
			}
			uniCopy({
				content: copyInfo,
				success: res => {
					uni.showToast({
						title: res,
						icon: 'none'
					});
				},
				error: e => {
					uni.showToast({
						title: e,
						icon: 'none',
						duration: 3000
					});
				}
			});
		}
	}
};
</script>

<style lang="scss">
.od-box {
	padding-top: 0 !important;
	padding-bottom: 0 !important;
	margin-bottom: 0;
}
.ok-box {
	display: flex;

}
.item-right{}
.item-tip{margin-top: 10rpx;}
</style>
