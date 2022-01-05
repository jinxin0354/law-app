<template>
	<view class="content">
		<view class="od-box">
			<!-- 服务领域组件 -->
			<order-item-service ref="orderItemService" :info="info" v-if="Object.keys(info.product).length > 0"></order-item-service>
			<view class="od-item">
				<view class="item-tip require">费用承担</view>
				<view class="item-right">
					<view class="service-list inline-list">
						<view class="service-item" @click="bearFees = '投资人支付(不用还)'" :class="bearFees == '投资人支付(不用还)' ? 'active' : ''">
							投资人支付
							<image class="noback2" src="@/static/img/order-noback.png"></image>
						</view>
						<view class="service-item" @click="bearFees = '自费'" :class="bearFees == '自费' ? 'active' : ''">自费</view>
					</view>
					<view class="item-nav"></view>
				</view>
			</view>
			<view class="od-item">
				<view class="item-tip">涉案金额</view>
				<view class="item-right">
					<view class="item-txt">{{ qiankuan }}</view>
				</view>
			</view>
			<template v-if="bearFees == '自费'">
				<view class="od-item marginbottom20">
					<view class="item-tip">案件进度</view>
					<view class="item-right">
						<view class="service-list inline-list">
							<view class="service-item" :class="{ active: jindu == item.value_name }" v-for="(item, index) in info.list.jindu" @click="jindu = item.value_name">
								{{ item.value_name }}
							</view>
						</view>
						<view class="item-nav"></view>
					</view>
				</view>
				<view class="od-item marginbottom20">
					<view class="item-tip">我的角色</view>
					<view class="item-right">
						<view class="service-list inline-list">
							<view class="service-item" :class="{ active: self_ident == item.value_name }" v-for="(item, index) in info.list.self_ident" @click="self_ident = item.value_name">
								{{ item.value_name }}
							</view>
						</view>
						<view class="item-nav"></view>
					</view>
				</view>
				<view class="od-item marginbottom20">
					<view class="item-tip">对方类型</view>
					<view class="item-right">
						<view class="service-list inline-list">
							<view class="service-item" :class="{ active: dui_ident == item.value_name }" v-for="(item, index) in info.list.dui_ident" @click="dui_ident = item.value_name">
								{{ item.value_name }}
							</view>
						</view>
						<view class="item-nav"></view>
					</view>
				</view>
				<view class="od-item marginbottom20">
					<view class="item-tip">对方失信</view>
					<view class="item-right">
						<view class="service-list inline-list">
							<view class="service-item" :class="{ active: is_believe == 1 }" @click="is_believe = 1">否</view>
							<view class="service-item" :class="{ active: is_believe == 0 }" @click="is_believe = 0">是</view>
						</view>
						<view class="whyIcon" @click="jump('/pages/client/order/web-view', { url: 'http://zxgk.court.gov.cn/zhixing' })">
							<image src="@/static/img/why.png" mode="aspectFit"></image>
						</view>
					</view>
				</view>
				<view class="od-item marginbottom20">
					<view class="item-tip">审理机构</view>
					<view class="item-right">
						<view class="service-list inline-list">
							<view
								class="service-item"
								:class="{ active: organization == item.value_name }"
								v-for="(item, index) in info.list.organization"
								@click="organization = item.value_name"
							>
								{{ item.value_name }}
							</view>
						</view>
						<view class="item-nav"></view>
					</view>
				</view>
				<view class="od-item marginbottom20">
					<view class="item-tip require">审理地点</view>
					<view class="item-right" @click="$refs.popupTake.open()">
						<view class="service-list inline-list">
							<view class="service-item active">{{ hear_addr }}</view>
						</view>
						<view class="item-txt gray" v-if="!hear_addr">您的案件在哪里审理？</view>
						<view class="item-nav" @click="$refs.popupTake.open()" v-else><image src="@/static/img/right.png" mode="aspectFit"></image></view>
					</view>
				</view>
				<view class="od-item marginbottom20">
					<view class="item-tip require">服务人员</view>
					<view class="item-right" @click="$refs.popupService.open()">
						<view class="service-list inline-list">
							<view class="service-item active">智能匹配</view>
							<view class="service-item active">{{ practiceYear.replace('以上', '起') }}</view>
							<view class="service-item active" v-if="practiceArea.split(',').length > 1">
								<text class="text-ellipsis">{{ practiceArea.split(',')[1] }}</text>
							</view>
							<view class="service-item active" v-else>{{ practiceArea }}</view>
						</view>
						<view class="item-nav"><image src="@/static/img/right.png" mode="aspectFit"></image></view>
					</view>
				</view>
				<view class="od-item marginbottom20">
					<view class="item-tip">服务阶段</view>
					<view class="item-right" @click="$refs.popupServiceStage.open()">
						<view class="service-list inline-list">
							<view class="service-item active" style="width: 100%; margin-right: 0;">{{ stage }}</view>
						</view>
						<view class="item-nav"><image src="@/static/img/right.png" mode="aspectFit"></image></view>
					</view>
				</view>
				<view class="od-item marginbottom20">
					<view class="item-tip">服务报价</view>
					<view class="item-right">
						<view class="service-list service-list-bottom inline-list">
							<view class="service-item marginbottom20" :class="{ active: offer == item.value_name }" @click="offer = item.value_name" v-for="(item, index) in offerList">
								{{ item.value_name }}
							</view>
							<view class="service-tip-box" v-html="tipGrade"></view>
						</view>
						<view class="item-nav"></view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip">律师费用</view>
					<view class="item-right">
						<view class="fee-item flex">
							<view class="fee-tip">前期费用：</view>
							<view class="service-list service-two" style="flex: 1;">
								<view class="fee-right" v-if="offer == '还魂马'">无</view>
								<view
									v-else
									class="service-item"
									style="width: 250rpx;"
									:class="price_type_text == item.price_type_text ? 'active' : ''"
									@click="
									product_price_id = item.id;
										price_type_text = item.price_type_text;
										money = item.price;
									"
									v-for="(item, index) in moneyList"
								>
									<text class="two-money">¥{{ item.total }}</text>
									<text class="two-tip">{{ item.price_type_text }}</text>
									<image v-if="item.price_type_text == '先用后付 无忧付'" class="noback" src="@/static/img/order-noback2.png" mode="aspectFit"></image>
									<image v-if="item.price_type_text == '边用边付 轻松付'" class="noback" src="@/static/img/order-noback3.png" mode="aspectFit"></image>
								</view>
							</view>
						</view>
						<view class="fee-item flex">
							<view class="fee-tip">后期费用：</view>
							<!-- 千里马，无后期费用。活马和还魂马有后期费用 -->
							<view class="fee-right" v-if="offer == '千里马'">无</view>
							<view class="fee-right" v-else>{{ moneyList.length > 0 ? moneyList[0].later_money : '' }}</view>
						</view>
					</view>
				</view>
				<view class="od-item marginbottom20" v-if="bearFees == '投资人支付(不用还)'">
					<view class="item-tip">投资人收益</view>
					<view class="item-right">
						<view class="item-txt">
							<text class="red">您回收款物后5日内，按回收款物金额的30％支付投资收益给投资人，不回款不用付。</text>
							<br />
						</view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip">项目资料</view>
					<view class="item-right" @click="jump('/pages/client/order/upload', { source: JSON.stringify(source) })">
						<view class="item-txt gray">您手上有的资料，都可上传</view>
						<view class="item-file" v-if="source && source.length > 0"><image src="@/static/img/order-file.png"></image></view>
						<view class="item-nav"><image src="@/static/img/right.png" mode="aspectFit"></image></view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip">我的要求</view>
					<view class="item-right">
						<order-right-textarea ref="myrequire"></order-right-textarea>
						<view class="item-nav"></view>
					</view>
				</view>
				<!-- 优惠券组件 -->
				<order-user-coupon :info="info" v-if="Object.keys(info.product).length > 0" @getCoupon="getCoupon"></order-user-coupon>
				<!-- 付款方式组件 -->
				<!-- 选千里马-先用后付或还魂马时，付费方式字段隐藏 -->
				<template v-if="price_type_text != '先用后付 无忧付' && offer != '还魂马'">
					<order-item-pay-method ref="orderItemPayMethod" :info="info" v-if="Object.keys(info.product).length > 0"></order-item-pay-method>
				</template>
				
				<view class="od-item">
					<view class="item-tip">服务保障</view>
					<view class="item-right" @click="$refs.orderServiceEnsure.$refs.popupEnsure.open()">
						<view class="item-txt green">
							<view class="text-ellipsis" style="width: 400rpx;">{{ info.product.tags }}</view>
						</view>
						<view class="item-nav"><image src="@/static/img/right.png" mode="aspectFit"></image></view>
					</view>
				</view>
				
				
				<view class="od-item">
					<view class="item-tip require">服务方式</view>
					<view class="item-right">
						<view class="item-txt">{{ serviceType }}</view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip">其他费用</view>
					<view class="item-right">
						<view class="item-txt"><text class="blue">国家费用</text></view>
					</view>
					<view class="whyIcon" @click="$refs.orderCommonTip.$refs.popupTip.open()"><image src="@/static/img/why.png" mode="aspectFit"></image></view>
				</view>
			</template>
			<template v-if="bearFees == '投资人支付(不用还)'">
				<view class="od-item marginbottom20">
					<view class="item-tip">案件进度</view>
					<view class="item-right">
						<view class="service-list inline-list">
							<view class="service-item active">{{ jindu }}</view>
						</view>
						<view class="item-nav"></view>
					</view>
				</view>
				<view class="od-item marginbottom20">
					<view class="item-tip">我的角色</view>
					<view class="item-right">
						<view class="service-list inline-list">
							<view class="service-item active">{{ self_ident }}</view>
						</view>
						<view class="item-nav"></view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip">对方类型</view>
					<view class="item-right">
						<view class="service-list service-two">
							<view class="service-item active">{{ dui_ident }}</view>
						</view>
						<view class="item-nav"></view>
					</view>
				</view>
				<view class="od-item marginbottom20">
					<view class="item-tip">对方失信</view>
					<view class="item-right">
						<view class="service-list inline-list"><view class="service-item active">否</view></view>
						<view class="whyIcon" @click="jump('/pages/client/order/web-view', { url: 'http://zxgk.court.gov.cn/zhixing ' })">
							<image src="@/static/img/why.png" mode="aspectFit"></image>
						</view>
					</view>
				</view>
				<view class="od-item marginbottom20">
					<view class="item-tip">审理机构</view>
					<view class="item-right">
						<view class="service-list inline-list">
							<view class="service-item active">{{ organization }}</view>
						</view>
						<view class="item-nav"></view>
					</view>
				</view>
				<view class="od-item marginbottom20">
					<view class="item-tip require">审理地点</view>
					<view class="item-right" @click="$refs.popupTake.open()">
						<view class="item-txt gray" v-if="!hear_addr">您的案件在哪里审理？</view>
						<view class="service-list inline-list" v-else>
							<view class="service-item active">{{ hear_addr }}</view>
						</view>
						<view class="item-nav" @click="$refs.popupTake.open()"><image src="@/static/img/right.png" mode="aspectFit"></image></view>
					</view>
				</view>
				<view class="od-item marginbottom20">
					<view class="item-tip require">服务人员</view>
					<view class="item-right" @click="$refs.popupService.open()">
						<view class="service-list inline-list">
							<view class="service-item active">智能匹配</view>
							<view class="service-item active">{{ practiceYear.replace('以上', '起') }}</view>
							<view class="service-item active" v-if="practiceArea.split(',').length > 1">
								<text class="text-ellipsis">{{ practiceArea.split(',')[1] }}</text>
							</view>
							<view class="service-item active" v-else>{{ practiceArea }}</view>
						</view>
						<view class="item-nav"><image src="@/static/img/right.png" mode="aspectFit"></image></view>
					</view>
				</view>
				<view class="od-item ">
					<view class="item-tip">服务阶段</view>
					<view class="item-right" @click="$refs.popupServiceStage.open()">
						<view class="service-list inline-list">
							<view class="service-item active" style="width: 100%; margin-right: 0;">{{ stage }}</view>
						</view>
						<view class="item-nav" @click="$refs.popupServiceStage.open()"><image src="@/static/img/right.png" mode="aspectFit"></image></view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip">服务报价</view>
					<view class="item-right"><view class="item-txt">投资人确定</view></view>
				</view>
				<view class="od-item">
					<view class="item-tip">投资人承担</view>
					<view class="item-right"  @click="downloadFile(info.product.doc[2].url)">
						<view class="item-txt">律师费+立案受理费+公告费+异地被告身份查询费</view>
						<view class="whyIcon"><image src="@/static/img/why.png" mode="aspectFit"></image></view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip">投资人收益</view>
					<view class="item-right">
						<view class="item-txt">
							<text class="red">您案件债权总额的30%，回款后5日内支付给投资人，不回款不用。</text>
							<br />
						</view>
					</view>
				</view>
				<view class="od-item ">
					<view class="item-tip">项目资料</view>
					<view class="item-right" @click="jump('/pages/client/order/upload2', { source: JSON.stringify(source) })">
						<view class="item-txt gray">您手上有的资料，都可上传</view>
						<view class="item-file" v-if="source && source.length > 0"><image src="@/static/img/order-file.png"></image></view>
						<view class="item-nav"><image src="@/static/img/right.png" mode="aspectFit"></image></view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip">我的要求</view>
					<view class="item-right">
						<order-right-textarea ref="myrequire"></order-right-textarea>
						<view class="item-nav"></view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip">服务保障</view>
					<view class="item-right" @click="$refs.orderServiceEnsure.$refs.popupEnsure.open()">
						<view class="item-txt green">
							<view class="text-ellipsis" style="width: 400rpx;">{{ info.product.tags }}</view>
						</view>
						<view class="item-nav"><image src="@/static/img/right.png" mode="aspectFit"></image></view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip require">服务方式</view>
					<view class="item-right">
						<view class="item-txt">{{ serviceType }}</view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip">其他费用</view>
					<view class="item-right">
						<view class="item-txt"><text class="blue">国家费用（或有）</text></view>
					</view>
					<view class="whyIcon" @click="$refs.orderCommonTipMaybe.$refs.popupTip.open()"><image src="@/static/img/why.png" mode="aspectFit"></image></view>
				</view>
			</template>
			<!-- 服务范围组件 -->
			<order-item-service-desc :info="info" v-if="Object.keys(info.product).length > 0"></order-item-service-desc>
		</view>
		<!-- 服务内容组件 -->
		<order-unfold title="服务内容">
			<view slot="unfold-con"><view class="" v-html="info.product.serve_content"></view></view>
		</order-unfold>
		<!-- 产品说明组件 -->
		<order-unfold-product title="产品说明" :img_src="info.product.desc_content"></order-unfold-product>

		<view class="od-box">
			<view class="od-item" @click="jump('/pages/client/order/ask', { id: info.product.id, product_name: info.product.product })">
				<view class="item-tip">问大家</view>
				<view class="item-right">
					<view class="item-txt">产品有疑问，进去问问用过的人吧</view>
					<view class="gray" style="line-height: 60rpx;" v-if="info.ques_count">{{ info.ques_count }}</view>
					<view class="item-nav"><image src="@/static/img/right.png" mode="aspectFit"></image></view>
				</view>
			</view>
		</view>
		<view class="go-box">
			<view class="go-left">
				<view class="left-prize" v-if="bearFees == '投资人支付(不用还)'">
					<text style="font-size: 34rpx;">￥投资人支付</text>
					(不用还)
				</view>
				<template v-else>
					<view class="left-prize">
						￥{{ money }}
						<text class="coupon-prize" v-if="sell">已优惠￥{{ sell }}</text>
					</view>
					<view class="left-tip">{{ price_type_text }}</view>
				</template>
			</view>
			<view class="go-right" v-if="!edit_order_id"><button type="default" class="go-btn" @click="confirm">一键无忧下单</button></view>
			<view class="go-right" v-else><button type="default" class="go-btn" @click="addOrder">我要下单</button></view>
		</view>

		<!-- 服务人员弹出层 -->
		<uni-popup ref="popupService" type="bottom">
			<order-popup-service
				@closePop="closePop('popupService')"
				@chooseService="chooseService"
				:practiceChoose="practiceChoose"
				:practiceYear="practiceYear"
				:practiceArea="practiceArea"
				:key="new Date().getTime()"
				:info="info"
			></order-popup-service>
		</uni-popup>
		<!-- 服务保障组件 -->
		<order-service-ensure ref="orderServiceEnsure" v-if="Object.keys(info.product).length > 0" :info="info"></order-service-ensure>
		<!-- 债券投资合同组件-->
		<order-invest-contact ref="investContact">
			<view class="agree-box" slot="agree-box">
				<checkbox-group @change="checkChange">
					<label>
						<checkbox style="transform:scale(0.8);" color="#FFC801" value="1" />
						我已阅读并同意按上述条款履行
					</label>
				</checkbox-group>
			</view>
			<view class="ok-box" slot="agree-box"><button type="default" class="ok-btn" @click="bondConfirm">继续下单</button></view>
		</order-invest-contact>
		<!-- 审理地点弹出层 -->
		<uni-popup ref="popupTake">
			<order-popup-common title="审理地点" @closePop="closePop('popupTake')">
				<scroll-view class="popup-con" slot="popup-con" scroll-y="true">
					<view class="take-box">
						<view class="take-title">
							<text class="gray relative require">审理机关确定依据</text>
							<text class="blue">暂住证明范例</text>
							<text class="blue">法院管辖规定</text>
						</view>
						<view class="service-list">
							<view class="service-item" style="width: 100%;" :class="{ active: hear_basis == item }" v-for="(item, index) in info.list.hear_basis" @click="hear_basis = item">
								{{ item }}
							</view>
						</view>
						<view class="take-title">
							<text class="gray relative require">审理机关所在区域</text>
							<text class="red">(其他城市将逐步开放业务)</text>
						</view>
						<view class="service-list" style="justify-content: space-around;">
							<view
								class="service-item"
								style="width: calc((100% - 40rpx)/2);"
								:class="{ active: hear_addr == item }"
								v-for="(item, index) in info.list.hear_addr"
								@click="hear_addr = item"
							>
								{{ item }}
							</view>
						</view>
					</view>
				</scroll-view>
				<view class="ok-box" slot="popup-btn" style="margin-top: -50rpx; position: absolute; bottom: 0; width: 100%; border-radius: 46rpx">
					<button type="default" class="ok-btn" @click="closePop('popupTake')">确定</button>
				</view>
			</order-popup-common>
		</uni-popup>
		<!-- 服务阶段弹出层 -->
		<uni-popup ref="popupServiceStage">
			<order-popup-common title="服务阶段" @closePop="closePop('popupServiceStage')">
				<scroll-view class="popup-con" slot="popup-con" scroll-y="true">
					<view class="take-box">
						<view class="take-title"><text class="gray require relative">您想让律师帮您代理哪几个办案阶段</text></view>
						<view class="service-list">
							<view class="service-item" style="width: 100%;" :class="{ active: stage == item }" v-for="(item, index) in stage_list" @click="stage = item">{{ item }}</view>
						</view>
					</view>
				</scroll-view>
				<view class="ok-box" slot="popup-btn" style="margin-top: -50rpx; position: absolute; bottom: 0; width: 100%; border-radius: 46rpx;">
					<button type="default" class="ok-btn" @click="closePop('popupServiceStage')">确定</button>
				</view>
			</order-popup-common>
		</uni-popup>
		<!-- 其他费用或有温馨提示 -->
		<order-common-tip ref="orderCommonTipMaybe">
			<view class="warm-tip-box" style="padding: 0 30rpx;">
				<view class="warm-tip-item">
					<view class="item-left">1、</view>
					<view class="item-right">
						国家费用（或有）：指财产保全费、财产保全担保费、勘验费、鉴定费、翻译费、工商/房产/汽车查档费、证人/鉴定人/翻译人员出庭的交通费、住宿费、生活费和误工补贴费等。详情请查看下面附件文档。
					</view>
				</view>
				<view class="warm-tip-item">
					<view class="item-left">2、</view>
					<view class="item-right">国家费用（或有）并非一定会发生，也并非每个案件都会发生。只有在您向相关国家部门提出书面申请，且经国家部门审查同意后，才有可能产生上述费用。</view>
				</view>
				<view class="warm-tip-item">
					<view class="item-left">3、</view>
					<view class="item-right">案件办理过程中，如发生上述费用，您可到时与投资人协商是否额外承担支付这些费用。投资人如不同意支付该等费用的，请您自行支付。</view>
				</view>
				<view class="warm-tip-item">
					<view class="item-left">4、</view>
					<view class="item-right">律师在其执业区域以内为您办案，由第三方收取的快递、交通、复印、打印、通讯等费用，概由律师承担，您不需支付。</view>
				</view>
			</view>
		</order-common-tip>
		<!-- 其他费用温馨提示 -->
		<order-common-tip ref="orderCommonTip">
			<view class="warm-tip-box" style="padding: 0 30rpx;">
				<view class="warm-tip-item">
					<view class="item-left">1、</view>
					<view class="item-right">其他费用是指国家费用或差旅费用。</view>
				</view>
				<view class="warm-tip-item">
					<view class="item-left">2、</view>
					<view class="item-right">
						国家费用：指政府机关、公检法或相关国家部门依法依规收取的法定费用，具体金额根据国家发票确定，分为必有费用和或有费用:
						<view class="warm-tip-item">
							<view class="item-left">a</view>
							<view class="item-right">
								必有费用：指立案受理费，收款单位对应法院或商事仲裁委。
								<view class="warm-tip-item">
									<view class="item-left">·</view>
									<view class="item-right">
										法院:您到法院告人家，法院审查后，同意受理您案件时，会根据国家规定标准，向您收取该费用。如果法院不同意受理，不收取该费用。您可点击“国家费用”，评估您案件需要的受理费。
									</view>
								</view>
								<view class="warm-tip-item">
									<view class="item-left">·</view>
									<view class="item-right">
										商事仲裁委:您到商事仲裁委告人家，商事仲裁委审查后，同意受理您案件时，会根据其制定的标准，向您收取该费用。如果商事仲裁委不同意受理，不收取该费用。具体收费标准，请上网搜索各个商事仲裁委电话，拨打咨询。
									</view>
								</view>
							</view>
						</view>
						<view class="warm-tip-item">
							<view class="item-left">b</view>
							<view class="item-right">
								或有费用：指财产保全费、财产保全担保费、异地被告身份证明查询费、法院公告费、勘验费、鉴定费、翻译费、工商/房产/汽车查档费、证人/鉴定人/翻译人员出庭的交通费、住宿费、生活费和误工补贴费等。详情请查看下面附件文档。
							</view>
						</view>
						<view class="warm-tip-item">
							<view class="item-left">c</view>
							<view class="item-right">或有费用并非一定会发生，也并非每个案件都会发生。只有在您向相关国家部门提出书面申请，且经国家部门审查同意后，才有可能会产生或有费用。</view>
						</view>
					</view>
				</view>
				<view class="warm-tip-item">
					<view class="item-left">3、</view>
					<view class="item-right">
						差旅费用：指经您同意，律师在其执业区域以外为您办案，由第三方收取的住宿费、交通费、复印/打印费等异地费用，具体金额根据发票/票据确定。如不用律师出差，不产生该费用。
					</view>
				</view>
				<view class="warm-tip-item">
					<view class="item-left">4、</view>
					<view class="item-right">律师在其执业区域以内为您办案，由第三方收取的快递、交通、复印、打印、通讯等费用，概由律师承担，您不需支付。</view>
				</view>
			</view>
		</order-common-tip>
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
	</view>
</template>
<script>
import bus from '@/common/utils/bus.js';
export default {
	data() {
		return {
			info: {
				list: {},
				product: {}
			},
			serviceType: '', //服务方式
			practiceChoose: '智能匹配', //挑选方式
			practiceYear: '全部', //执业年限
			practiceArea: '全国', //执业区域
			product_id: '', //七个产品id
			product_name: '', //七个产品名称
			area_id: '', //服务领域id
			requirement: '', //我的要求
			tags: '', //服务保障
			serve_content: '', //服务内容
			desc_content: '', //产品说明
			money: '', //律师费
			moneyList: [], //律师费列表
			source: [], //项目资料
			price_type_text: '', //律师费 付款方式
			agree: '', //同意
			bearFees: '', //费用承担
			jindu: '', //目前进度
			self_ident: '', //我的身份
			dui_ident: '', //对方类型
			is_believe: 1, //对方未失信
			organization: '', //审理机构
			hear_basis: '', //审理依据
			hear_addr: '', //审理机关所在区域
			offer: '', //千里马
			stage: '', //服务阶段
			stage_list: [], //服务阶段列表
			qiankuan: '', //涉案金额
			order_id: '', //法务编辑订单id
			current_coupon: {}, //选中的优惠券
			offerList: [],
			tipGrade: '', //服务报价提示
			sell: '', //优惠价格
			edit_order_id: '' ,//编辑是的传过来的订单id
			product_price_id: '' //律师费用方式
		};
	},
	created() {
		// 安卓
		window.payOk = this.payOk;
	},
	onLoad(params) {
		// 编辑
		if (params.order_id) {
			this.edit_order_id = params.order_id;
		}
		// 我要下单
		if (params.product_id && params.area_id && params.product_name && params.bearFees) {
			this.bearFees = params.bearFees;
			this.product_id = params.product_id;
			this.area_id = params.area_id;
			this.product_name = params.product_name;
			this.init();
		}
	},
	watch: {
		// 切换审理机构获取服务阶段
		organization(val, oldVal) {
			if (oldVal) {
				this.getStage();
			}
		},
		//切换费用承担
		bearFees(val, oldVal) {
			if (this.bearFees == '投资人支付(不用还)') {
				this.jindu = '待起诉';
				this.self_ident = '起诉方';
				this.dui_ident = '个人/个体户';
				this.organization = '人民法院';
				this.stage = '本诉 (套餐)一审+二审+执行';
				this.hear_basis = '合同约定的管辖地点';
				this.hear_addr = '广东广州';
				this.qiankuan = '人民币1万元以上—5万元以下(含)';
				this.money = '投资人支付(不用还)';
			} else if (this.bearFees == '自费') {
				this.qiankuan = '都可以';
				if (oldVal) {
					this.getMoney();
				}
			}
		},
		// 服务阶段
		stage(val, oldVal) {
			this.getOffer();
			if (oldVal) {
				this.getMoney();
			}
		},
		// 服务报价
		offer(val, oldVal) {
			this.getStage();
			this.getTip();
			if (oldVal) {
				this.getMoney();
			}
		},
		// 我的角色
		self_ident(val, oldVal) {
			this.getStage();
			this.getTip();
			this.getOffer();
			if (oldVal) {
				this.getMoney();
			}
		}
	},
	methods: {
		async init() {
			let formData;
			// 编辑
			if (this.edit_order_id) {
				formData = { id: this.product_id, area_id: this.area_id, type: 2 };
			}
			// 新下单
			else{
				formData = { id: this.product_id, area_id: this.area_id };
			}
			if (uni.getStorageSync('token')) {
				formData = { ...formData, token: uni.getStorageSync('token') };
			}

			let res = await this.$api('index.new_order', formData);

			this.info = res.data;
			this.money = res.data.product.price;
			this.serviceType = res.data.product.product_type;
			this.practiceChoose = res.data.product.choose;
			this.practiceYear = res.data.product.product_name;
			this.practiceArea = res.data.product.profession_name;
			//this.practiceArea = res.data.product.profession_name;
			this.bearFees = res.data.product.money_type;
			this.jindu = res.data.list.jindu[0].value_name;
			this.self_ident = res.data.list.self_ident[0].value_name;
			this.dui_ident = res.data.list.dui_ident[0].value_name;
			this.organization = res.data.product.organization;
			this.stage = res.data.list.stage[0];
			this.hear_basis = res.data.list.hear_basis[0];
			this.hear_addr = res.data.list.hear_addr[0];
			this.requirement = res.data.product.requirement || '';
			this.source = res.data.product.source || [];
			this.offer = res.data.product.offer;
			this.offerList = res.data.list.offer;
			this.moneyList = res.data.list.price_type;
			this.price_type_text = res.data.product.price_type_text;
			this.product_price_id = res.data.product.id;
		},
		async getMoney() {
			let formData = {
				token: uni.getStorageSync('token'),
				product_type_id: this.serviceType,
				product_id: this.product_name,
				product_name_id: this.practiceYear,
				coupon_id: this.current_coupon ? this.current_coupon.id : '',
				self_ident: this.self_ident, //我的角色
				stage: this.stage, //服务阶段
				offer: this.offer //服务报价
			};
			let res = await this.$api('index.product_price_name', formData);
			this.moneyList = res.data;
			this.money = res.data.length > 0 ? res.data[0].price : '';
			this.price_type_text = res.data.length > 0 ? res.data[0].price_type_text : '';
			this.sell = res.data.length > 0 ? res.data[0].sell : '';
		},
		// 优惠券
		getCoupon(current_coupon) {
			this.current_coupon = current_coupon;
			this.getMoney();
		},
		chooseService(obj) {
			this.practiceChoose = obj.choose;
			this.practiceYear = obj.year;
			this.practiceArea = obj.area;
		},
		bondConfirm() {
			if (this.agree == '1') {
				this.addOrder(this.price_type_text);
			} else {
				uni.showToast({
					title: '请勾选我已阅读并同意按上述条款履行',
					icon: 'none'
				});
			}
		},
		confirm() {
			if (this.bearFees == '投资人支付(不用还)') {
				this.$refs.investContact.$refs.popupBond.open();
			} else {
				this.addOrder(this.price_type_text);
			}
		},
		async addOrder(money_type) {
			let formData = {
				token: uni.getStorageSync('token'),
				product_id: this.product_name,
				fali_serve_area_id: this.info.product.area.area_name,
				server_type_id: this.serviceType,
				server_name_id: this.practiceYear,
				offer_type: this.offer_type,
				money_type: money_type ? money_type : '',
				money: this.money,
				pay_type: this.$refs.orderItemPayMethod ? this.$refs.orderItemPayMethod.payMethod : '', //无
				source: this.source,
				requirement: this.$refs.myrequire.requirement_copy,
				price_type: this.bearFees, // 费用承担
				price_detail: '', //费用明细
				qiankuan: this.qiankuan, //欠款金额
				jindu: this.jindu, //目前进度
				self_ident: this.self_ident, //我的身份
				dui_ident: this.dui_ident, //对方类型
				is_believe: this.is_believe, //对方是否失信 0是 1否
				organization: this.organization, //审理机构
				stage: this.stage, //服务阶段
				offer: this.offer, //服务报价
				server_address: this.hear_basis + this.hear_addr, //审理地点,
				product_price_id: this.product_price_id
			};

			if (this.edit_order_id) {
				formData = { ...formData, id: this.edit_order_id };
			}
			let res = await this.$api('index.addOrder_name', formData);
			if (res.code == 1) {
				// 从编辑进来
				if (this.edit_order_id) {
					this.order_id = this.edit_order_id;
					if (money_type == '先用后付 无忧付') {
						this.replace('/pages/client/user/match', {
							order_id: this.order_id
						});
					} else {
						let formDataPay = {
							order_id: this.order_id,
							payMethod: this.$refs.orderItemPayMethod ? this.$refs.orderItemPayMethod.payMethod : '',
							fen: '',
							pay_type: 1
						};
						let resPay = await this.$pay(formDataPay);
						if (resPay == 1) {
							let pages = getCurrentPages();
							let prevPage = pages[pages.length - 2];
							prevPage.$vm.init();
							uni.navigateBack({
								delta: 1
							});
						}
					}
				}
				// 新下单
				else {
					this.order_id = res.data.order_id;
					if (money_type == '先用后付 无忧付' || this.bearFees == '投资人支付(不用还)' || this.offer == '还魂马') {
						this.replace('/pages/client/user/match-specialist', {
							order_id: this.order_id
						});
					} else {
						let formDataPay = {
							order_id: this.order_id,
							payMethod: this.$refs.orderItemPayMethod ? this.$refs.orderItemPayMethod.payMethod : '',
							fen: '',
							pay_type: 1
						};
						let resPay = await this.$pay(formDataPay);
						if (resPay == 1) {
							this.replace('/pages/client/user/match-specialist', {
								order_id: this.order_id
							});
						}
					}
				}
			}
		},
		payOk(res) {
			// 安卓0 支付成功，-1 支付失败， -2取消支付
			if (res == '0') {
				this.replace('/pages/client/user/match', {
					order_id: this.order_id
				});
			}
		},
		// 勾选同意债券投资合同
		checkChange(e) {
			this.agree = e.detail.value[0];
		},
		// 获取服务阶段
		async getStage() {
			let formData = {
				organization: this.organization,
				self_ident: this.self_ident,
				token: uni.getStorageSync('token')
			};

			let res = await this.$api('index.change_stage', formData);
			if (res.code == 1) {
				this.stage_list = res.data.stage;
				this.stage = res.data.stage[0];
			}
		},
		// 获取服务报价
		async getOffer() {
			let formData = {
				stage: this.stage,
				self_ident: this.self_ident,
				token: uni.getStorageSync('token')
			};

			let res = await this.$api('index.change_offer', formData);
			if (res.code == 1) {
				this.offerList = res.data;
			}
		},
		//获取服务报价提示
		async getTip() {
			let formData = {
				offer: this.offer,
				stage: this.stage,
				self_ident: this.self_ident,
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.get_offer', formData);
			this.tipGrade = res.data;
		}
	}
};
</script>

<style lang="scss">
.content {
	padding-bottom: 122rpx;
}
.pay-list {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	box-sizing: border-box;
	.pay-item {
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		border: 1rpx solid #eee;
		border-radius: 10rpx;
		padding: 10rpx;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
		text-align: center;
		width: calc((100% - 20rpx) / 2);
		margin-bottom: 20rpx;
		&:nth-of-type(2n) {
			margin-right: 0;
		}
		&.active {
			background-color: rgba(255, 200, 1, 0.2);
			border-color: $uni-color-primary;
		}
		.image-wrapper {
			width: 40rpx;
			height: 40rpx;
			display: inline-block;
			margin-right: 10rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
	}
}

.space {
	display: inline-block;
	width: 30rpx;
}
.item-text {
	line-height: 60rpx;
	display: flow-root;
	flex: 1;
	text {
		margin-right: 10rpx;
	}
}
.take-box {
	width: 100%;
	padding: 30rpx;
	box-sizing: border-box;
	padding-bottom: 120rpx;
	.take-title {
		margin-bottom: 20rpx;
		.gray {
			margin-right: 30rpx;
		}
		text {
			margin-right: 10rpx;
		}
		.red {
			font-size: 24rpx;
		}
		.blue {
			font-size: 24rpx;
		}
	}
	.service-list {
		.service-item {
			margin-right: 0;
		}
	}
}
.agree-box {
	margin-top: 10rpx;
	text-align: center;
}
.service-item {
	position: relative;
	.price-tip {
		border-radius: 20rpx;
		padding: 20rpx;
		position: absolute;
		top: 100rpx;
		left: 0;
		width: 350rpx;
		height: 200rpx;
		background-color: #ffffff;
		z-index: 9;
		color: #333333;
		box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.15);
		&::before {
			content: '';
			position: absolute;
			left: 25%;
			top: -20rpx;
			width: 0;
			height: 0;
			transform: translateX(-50%);
			-webkit-transform: translateX(-50%);
			-moz-transform: translateX(-50%);
			border-left: 20rpx solid transparent; // 根据三角形方向选择对应的boder-direction
			border-right: 20rpx solid transparent; // 根据三角形方向选择对应的boder-direction
			border-bottom: 20rpx solid white; // 根据三角形方向选择对应的boder-direction
		}

		.price-tip-txt {
			margin-bottom: 10rpx;
			font-size: 24rpx;
		}
	}
}

.service-item {
	&:nth-last-of-type(1) {
		.price-tip {
			left: -200rpx;
			&::before {
				content: '';
				left: 80%;
			}
		}
	}
}
.fee-item {
	width: 100%;
	.fee-tip {
		width: 150rpx;
		line-height: 60rpx;
		padding: 0;
	}
	.fee-right {
		line-height: 60rpx;
	}
}
</style>
