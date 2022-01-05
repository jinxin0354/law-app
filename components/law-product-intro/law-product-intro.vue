<template>
	<view class="product-intro">
		<!-- 七个产品 下单之后 产品简介-->
		<template v-if="item.product == '问一下'">
			<view class="item-tip text-ellipsis">
				<text class="tip-item">{{ item.area_name }}</text>
				<text class="tip-item">{{ item.serve_type }}</text>
				<text class="tip-item">{{ item.serve_time }}</text>
			</view>
			<view class="item-tip text-ellipsis" v-if="item.serve_type == '线下面谈'">
				<text class="tip-item"><image src="@/static/img/order-tip-time.png" class="order-tip-img" mode="widthFix"></image>{{ item.server_time_text }}</text>
			</view>
			<view class="item-tip text-ellipsis" v-if="item.serve_type == '线下面谈'">
				<text class="tip-item"><image src="@/static/img/order-tip-loc.png" class="order-tip-img" mode="widthFix"></image>{{ item.server_address }}</text>
			</view>
			
		</template>
		<template v-if="item.product == '陪聊'">
			<view class="item-tip text-ellipsis">
				<text class="tip-item">{{ item.server_content }}</text>
				<text class="tip-item">{{ item.serve_time }}</text>
			</view>
			<view class="item-tip text-ellipsis" v-if="item.server_content != '代打电话'">
				<text class="tip-item"><image src="@/static/img/order-tip-time.png" class="order-tip-img" mode="widthFix"></image>{{ item.server_time_text }}</text>
			</view>
			<view class="item-tip text-ellipsis" v-if="item.server_content != '代打电话'">
				<text class="tip-item"><image src="@/static/img/order-tip-loc.png" class="order-tip-img" mode="widthFix"></image>{{ item.server_address }}</text>
			</view>
			<view class="item-tip text-ellipsis">
				<text class="tip-item">{{ item.area_name }}</text>
				<text class="tip-item">{{ item.serve_type }}</text>
			</view>
		</template>
		<template v-if="item.product == '管家'">
			<view class="item-tip text-ellipsis">
				<text class="tip-item">{{ item.server_dead }}</text>
				<text class="tip-item">{{ item.server_grade }}服务</text>
				<text class="tip-item">服务时间、地点面议</text>
			</view>
			<view class="item-tip text-ellipsis">
				<text class="tip-item">{{ item.area_name }}</text>
				<text class="tip-item">{{ item.serve_type }}</text>
			</view>
		</template>
		<template v-if="item.product == '代写文书'">
			<view class="item-tip text-ellipsis">
				<text class="tip-item">{{ item.document_ids }}</text>
				<text class="tip-item">{{ item.docu_num }}份</text>
				<text class="tip-item">{{ item.docu_time_text }}</text>
			</view>
			<view class="item-tip text-ellipsis">
				<text class="tip-item">{{ item.area_name }}</text>
				<text class="tip-item">{{ item.serve_type }}</text>
			</view>
		</template>
		<template v-if="item.product == '判案'">
			<view class="item-tip text-ellipsis">
				<text class="tip-item">{{ item.area_name }}</text>
				<text class="tip-item">{{ item.serve_type }}</text>
				<text class="tip-item">{{ item.docu_time_text }}</text>
			</view>
		</template>
		<template v-if="item.product == '刑事会见'">
			<view class="item-tip text-ellipsis">
				<text class="tip-item" v-if="item.accusation">{{ item.accusation }}</text>
				<text class="tip-item" v-else>具体涉嫌罪名请询问委托人</text>
				<text class="tip-item">会见{{ item.meet_num }}次</text>
			</view>
			<view class="item-tip text-ellipsis">
				<text class="tip-item" v-if="item.server_address">{{ item.server_address }}</text>
				<text class="tip-item" v-else>具体会见地点请询问委托人</text>
				<text class="tip-item">{{ item.meet_stage }}</text>
			</view>
			<view class="item-tip text-ellipsis">
				<text class="tip-item">{{ item.area_name }}</text>
				<text class="tip-item">{{ item.serve_type }}</text>
			</view>
		</template>
		<template v-if="item.product == '打官司'">
			<view class="item-tip text-ellipsis">
				<text class="tip-item">{{ item.organization }}</text>
				<text class="tip-item">{{ item.stage }}</text>
			</view>
			<view class="item-tip text-ellipsis">
				<text class="tip-item">{{ item.server_address }}</text>
			</view>
			<view class="item-tip text-ellipsis">
				<text class="tip-item">{{ item.area_name }}</text>
				<text class="tip-item">{{ item.serve_type }}</text>
			</view>
		</template>
	</view>
</template>

<script>
export default {
	props:['item'],
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
