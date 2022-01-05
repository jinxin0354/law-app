<template>
	<view class="product-intro">
		<!-- 律师匹配中 -->
		<view
			class="item-tip text-ellipsis gray"
			v-if="item.status == 0 || item.status == 1 || item.status == 2 || item.status == 13 || item.status == 15 || item.status == -1 || item.status == 18"
		>
			<text class="tip-item">
				{{ item.choose }}
				<template v-if="item.profession && item.profession.split(',').length > 1">
					{{ item.profession.split(',')[1] }}
				</template>
				<template v-else>
					{{ item.profession }}
				</template>
				<template v-if="item.serve_name == '全部'">
					全部执业年限专业律师
				</template>
				<template v-else>
					{{ item.serve_name }}的专业律师
				</template>
			</text>
		</view>
		<!-- 匹配成功后 -->
		<view class="item-tip gray" v-else>
			<text class="tip-item" v-if="item.lawyer">{{ item.lawyer.replace(/(\d{3})\d*(\d{4})/,'$1****$2') }}</text>
			<text class="tip-item">执业{{ item.lawyer_year }}年</text>
			<text class="tip-item flex1 text-ellipsis">
			{{ item.lawyer_addr }}</text>
		</view>
		<!-- 我的要求 -->
		<view class="item-tip" v-if="item.requirement">
			<text class="tip-item">
				<image src="@/static/img/order-tip-order.png" class="order-tip-img" mode="widthFix"></image>
				{{ item.requirement }}</text>
		</view>
		<view class="item-prize">
			<text class="prize-num" v-if="item.price_type == '投资人支付(不用还)'">￥投资人支付</text>
			<text class="prize-num" v-else>￥{{ item.money }}</text>
		</view>
	</view>
</template>

<script>
export default {
	props:['item','isProtect'],
	data() {
		return {
		};
	},
	created() {
		
	},
	methods: {}
};
</script>

<style lang="scss">
</style>
