<template>
	<view>
		<template v-if="title == '续费详情'">
			<view class="od-box" v-if="detailLIst && detailLIst.length > 0">
				<view class="wait-title">续费详情</view>
				<view class="add-service-item" v-for="(item, index) in detailLIst">
					<view class="od-item" v-for="(item_c, index_c) in item.origin.split(',')">
						<template v-if="item_c.split(':')[0] == '服务级别'">
							<view class="item-tip">{{ item_c.split(':')[0] }}</view>
							<view class="item-right" @click="getGradeTip(index)">
								<view class="item-txt">{{ item_c.split(':')[1] }}</view>
								<view class="item-nav"><image src="@/static/img/right.png" mode="aspectFit" style="width: 16rpx;height: 28rpx;margin-top: 6rpx;"></image></view>
							</view>
						</template>
						<template v-else>
							<view class="item-tip">{{ item_c.split(':')[0] }}</view>
							<view class="item-right">
								<view class="item-txt">{{ item_c.split(':')[1] }}</view>
							</view>
						</template>
					</view>
					<view class="od-item">
						<view class="item-tip">律师费用</view>
						<view class="item-right">
							<view class="item-txt red">￥{{ item.money }}(8折)</view>
						</view>
					</view>
				</view>
			</view>
		</template>
		<template v-else-if="title == '增加服务'">
			<view class="od-box" v-if="detailLIst && detailLIst.length > 0">
				<view class="wait-title">增加服务</view>
				<view class="add-service-item" v-for="(item, index) in detailLIst">
					<view class="od-item" v-for="(item_c, index_c) in item.origin.split(',')">
						<view class="item-tip">{{ item_c.split(':')[0] }}</view>
						<view class="item-right">
							<view class="item-txt">{{ item_c.split(':')[1] }}</view>
						</view>
					</view>
					<view class="od-item">
						<view class="item-tip">律师费用</view>
						<view class="item-right">
							<view class="item-txt red">￥{{ item.money }}(8折)</view>
						</view>
					</view>
				</view>
			</view>
		</template>
		<template v-else>
			<view class="wait-box" v-if="(detailLIst && detailLIst.length > 0) || (info.order.jie_pay || info.order.jie_pay.length > 0)">
				<view class="wait-title">{{ title }}</view>
				<view class="wait-item" v-for="(item, index) in detailLIst">
					<view class="item-item" @click="itemClick(item)">
						<view class="item-money">￥{{ item.money }}</view>
						<view class="item-txt" @click="itemClick(item)">
							<view class="txt-name">{{ item.name }}</view>
							<view class="txt-tip">{{ item.time }}</view>
						</view>
						<image class="image-r" v-if="item.shou_type == 2 || item.type == 1" style="width:16rpx;height: 28rpx;margin-top: 6rpx;" src="@/static/img/right.png" mode="widthFix"></image>
						<view class="item-btn">{{ item.status }}</view>
					</view>

					<view class="item-item" v-if="item.late_fee && Number(item.late_fee)" @click="lateFeeDetail(item)">
						<view class="item-money">
							<view>￥{{ item.late_fee }}</view>
						</view>
						<view class="item-txt">
							<view class="txt-name">
								<view class="name-tip text-ellipsis">滞纳金</view>
								<view class="txt-nav"><image src="@/static/img/right.png" mode="widthFix" style="width: 16rpx;height: 28rpx;margin-top: 6rpx;"></image></view>
							</view>
						</view>
						<view class="item-btn"></view>
					</view>
				</view>
				
				<view class="wait-item" v-for="(item, index) in info.order.jie_pay">
					<view class="item-item" @click="itemClick(item)">
						<view class="item-money">￥{{ item.money }}</view>
						<view class="item-txt" @click="itemClick(item)">
							<view class="txt-name">{{ item.name }}</view>
							<view class="txt-tip">{{ item.new_time }}</view>
						</view>
						<image  class="image-r" src="@/static/img/right.png" style="width: 16rpx;height: 28rpx;margin-top: 6rpx;" mode="widthFix"></image>
						<view class="item-btn">{{ item.status }}</view>
					</view>
				
					<view class="item-item" v-if="item.late_fee && Number(item.late_fee)" @click="lateFeeDetail(item)">
						<view class="item-money">
							<view>￥{{ item.late_fee }}</view>
						</view>
						<view class="item-txt">
							<view class="txt-name">
								<view class="name-tip text-ellipsis">滞纳金</view>
								<view class="txt-nav"><image src="@/static/img/right.png" mode="widthFix" style="width: 16rpx;height: 28rpx;margin-top: 6rpx;"></image></view>
							</view>
						</view>
						<view class="item-btn"></view>
					</view>
				</view>
			</view>
		</template>
		<!-- 级别提示 -->
		<uni-popup ref="popupGrade" type="bottom">
			<order-popup-common-bottom title="" @closePop="closePop('popupGrade')">
				<view class="popup-con" slot="popup-con"><view class="grade-box" v-html="tipGrade"></view></view>
			</order-popup-common-bottom>
		</uni-popup>
		<!-- 滞纳金详情弹出层 -->
		<uni-popup ref="popupFeeDetail" type="center">
			<order-popup-common title="滞纳金明细" @closePop="closePop('popupFeeDetail')">
				<template slot="popup-con">
					<scroll-view class="popup-con" scroll-y="true">
						<view class="wait-box margin0">
							<view class="wait-item" v-for="(item, index) in latefeeInfo" style="border:none" :class="{ textOver: item.isreduction == 1 }">
								<view class="item-item">
									<view class="item-money">
										<view>￥{{ item.fee }}</view>
									</view>
									<view class="item-txt">
										<view class="txt-name">
											<view class="name-tip text-ellipsis">{{ item.feestr }}</view>
										</view>
									</view>
									<view class="item-btn">
										<view class="item-btn-txt">{{ item.steptime }}</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
					<view class="fee-tip">亲爱的, 尽快付款哦, 不要让律师躺赚滞纳金~</view>
					<view class="ok-box"><button type="default" class="ok-btn" @click="closePop('popupFeeDetail')">朕知道了</button></view>
				</template>
			</order-popup-common>
		</uni-popup>
	</view>
</template>
<script>
export default {
	props: ['detailLIst', 'title', 'info'],
	data() {
		return { 
			tipGrade: '', 
			current_item: {},
			latefeeInfo: [] ,
			};
	},
	created() {},
	methods: {
		itemClick(item) {
			this.$emit('popupShow',item)
		},
		// 获取服务级别
		async getGradeTip(index) {
			this.$refs.popupGrade.open();
			let formData = {
				serve_grade: this.detailLIst[index].origin.split(',')[1].split(':')[1],
				serve_dead: this.detailLIst[index].origin.split(',')[0].split(':')[1],
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.change_dead', formData);
			this.tipGrade = res.data.value_text;
		},
		// 滞纳金详情
		async lateFeeDetail(item) {
			let formData = {
				id: this.info.order.id,
				step: item.fen,
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('latefee.detail', formData);
			this.latefeeInfo = res.data;
			this.$refs.popupFeeDetail.open();
		}
	}
};
</script>
<style>
	.image-r {
		width: 9px;
		height: 14px;
	}
</style>
<style lang="scss">
.add-service-item {
	border-bottom: 1rpx solid #eeeeee;
	&:nth-last-of-type(1) {
		border-bottom: none;
	}
}
.image-r {
		width: 9px;
		height: 14px;
		margin-left: 5px;
	}
</style>
