<template>
	<view class="content">
        <law-order-nav style="z-index: 999;" :productTitleName='productTitleName'></law-order-nav>
        <view class="tabs-box" :style="'top:'+windowTop+'px'" v-if="showTab">
            <view class="tab-item-box" v-for="(item,index) in tabList" :key='index'>
                <view v-if="bearFees != '自费'" :class="item.id == tabItemValue ? 'name-box-one' : 'name-box-two'" @click="scrollToOne(item.id)">
                    {{item.name}}
                </view>
                <view v-else :class="item.id == tabItemValue ? 'name-box-one' : 'name-box-two'" @click="scrollToTwo(item.id)">
                    {{item.name}}
                </view>
                <view :class="item.id == tabItemValue ? 'icon-box-one' : 'icon-box-two'" >
                </view>
            </view>
        </view>
		<view class="item-top" id='itemTop' :style="{ 'background-image': 'url(' + product_image + ')' }">
			<view class="item-admin" v-if="buyTipData.length > 0">
				<!-- 用户133****2345下单了这个产品 3分钟前 -->
				<swiper class="swiper" :autoplay="true" :interval="3000" circular :vertical='true' style="height:60rpx;width: 750rpx;">
                    <swiper-item v-for="(item,index) in buyTipData" :key='index' style="display: flex;
            justify-content: center;">
                        {{item}}
                    </swiper-item>
                </swiper>
			</view>
			<!-- <view class="item-img">
				<view class="item-left">
					<image src="@/static/img/order-back.png" mode=""></image>
				</view>
				<view class="item-right">
					<image src="@/static/img/order-search.png" mode=""></image>
					<image src="@/static/img/order-collect.png" mode=""></image>
					<image src="@/static/img/order-vx.png" mode=""></image>
				</view> 
			</view> -->
		</view>
		<view class="item-main" id='itemMain'>
			<view class="main-top">
				<view class="top-left">
					<text style="font-size: 26rpx;">￥</text>{{price}}
				</view>
				<view class="top-right">
					已售{{sale}}
				</view>
			</view>
			<view class="item-title">
				{{productTitleName}}
			</view>
			<view class="item-way">
				<text class="item-txt" v-for="(item,index) in labelData">{{item}}</text>
			</view>
			<view class="item-bottom" @click="$refs.orderService.$refs.popupEnsure.open()">
                <view class="bottom-info">
                    
				<image class="bottom-sure" src="@/static/img/order-sure.png" mode=""></image>
				<text class="bottom-left">服务保障 </text>
				<text class="bottom-order"></text>
				<text class="bottom-txt">{{tags.join(',')}}</text>
                </view>
				<image class="bottom-img" src="@/static/img/right.png" mode="aspectFit"></image>
			</view>


		</view>
		<!-- <view class="item-offset" >
			<u-sticky offset-top="0">
				<view>
					塞下秋来风景异，衡阳雁去无留意
				</view>
			</u-sticky>
		</view> -->

		<view class="od-box  od-boxs" ref='selectListRef' id='odBoxId'>
			<!-- 服务领域新组件 -->
			<order-items-service ref="orderItem" :info="info" v-if="Object.keys(info.product).length > 0">
			</order-items-service>
			<!-- 服务领域组件 -->
			<!-- 	<order-item-service ref="orderItemService" :info="info" v-if="Object.keys(info.product).length > 0">
			</order-item-service> -->
			<view class="od-item marginbottom20">
				<view class="item-tip">
                    <view class="center-box">
                        费用承担<view class="required-box">
                        *
                        </view>
                    </view>
                </view>
                <view class="item-right" @click="$refs.priceTypeSelectPopop.open()">
                	<view class="service-list inline-list">
                		<view class="service-item active" style="position: relative;">{{bearFees}}
                            <image v-if="bearFees == '投资人支付'" style="right:-52rpx;top:-16rpx" class="noback" src="@/static/img/order-noback.png" mode="aspectFit"></image>
                        </view>
                	</view>
                    <view class="item-nav">
                    	<image src="@/static/img/right.png" mode="aspectFit"></image>
                    </view>
                </view>
			</view>
			<view class="od-item marginbottom20">
				<view class="item-tip">涉案金额</view>
                <view class="item-right">
                	<!-- <view class="service-list inline-list"> -->
                        <!-- style="width: 100%; margin-right: 0;" -->
                		<!-- <view class="service-item active" >{{ qiankuan }}</view>
                	</view> -->
                    <view class="service-list inline-list">
                    	<view class="service-item active" :style="bearFees == '自费' ? 'width:calc((100% - 36px) / 3);' : 'width: 100%; margin-right: 0;'">{{qiankuan}}</view>
                    </view>
                </view>
			</view>
			<template v-if="bearFees == '自费'">
				<!-- <view class="od-item marginbottom20">
					<view class="item-tip">案件进度</view>
					<view class="item-right" @click="$refs.jinduPopop.open()">
						<view class="service-list inline-list">
							<view class="service-item active">{{ jindu }}</view>
						</view>
				        <view class="item-nav">
							<image src="@/static/img/right.png" mode="aspectFit"></image>
						</view>
					</view>
				</view>
				<view class="od-item marginbottom20">
					<view class="item-tip">您的角色</view>
					<view class="item-right" @click="$refs.selfIdentPopop.open()">
						<view class="service-list inline-list">
							<view class="service-item active">{{ self_ident }}</view>
						</view>
				        <view class="item-nav">
							<image src="@/static/img/right.png" mode="aspectFit"></image>
						</view>
					</view>
				</view>
				<view class="od-item marginbottom20">
					<view class="item-tip" style="padding-right: 20rpx;" @click="$refs.identPopop.open()">对方类型<image  src="@/static/img/order-ques.png" mode=""
				style="width: 30rpx;height: 30rpx"></image></view>
					<view class="item-right" @click="$refs.duiIdentPopop.open()">
						<view class="service-list inline-list">
							<view class="service-item active" style="width: calc((100% - 50rpx) / 2);">{{ dui_ident }}</view>
						</view>
						<view class="item-nav">
							<image src="@/static/img/right.png" mode="aspectFit"></image>
						</view>
					</view>
				</view>
				<view class="od-item marginbottom20">
					<view class="item-tip" style="padding-right: 20rpx;" @click="jump('/pages/client/order/web-view', { url: 'http://zxgk.court.gov.cn/shixin/' })">对方失信<image  src="@/static/img/order-ques.png" mode=""
				style="width: 30rpx;height: 30rpx"></image></view>
					<view class="item-right" @click="$refs.believePopop.open()">
						<view class="service-list inline-list">
							<view class="service-item active">{{isBelieveSelectData[is_believe].value_name}}</view>
						</view>
				        <view class="item-nav">
							<image src="@/static/img/right.png" mode="aspectFit"></image>
						</view>
					</view>
				</view>
				<view class="od-item marginbottom20">
					<view class="item-tip" style="padding-right: 20rpx;" @click="jump('/pages/client/order/web-view', { url: 'http://zxgk.court.gov.cn/zhixing/' })">对方正在被</br>法院执行中<image  src="@/static/img/order-ques.png" mode=""
				style="width: 30rpx;height: 30rpx"></image></view>
					<view class="item-right" @click="$refs.isZhiXingPopop.open()">
						<view class="service-list inline-list">
							<view class="service-item active">{{isBelieveSelectData[is_fayuan_zhixing].value_name}}</view>
						</view>
				        <view class="item-nav">
							<image src="@/static/img/right.png" mode="aspectFit"></image>
						</view>
					</view>
				</view>
				<view class="od-item marginbottom20">
					<view class="item-tip" style="padding-right: 20rpx;" @click="$refs.organizationPopop.open()">审理机构<image  src="@/static/img/order-ques.png" mode=""
				style="width: 30rpx;height: 30rpx"></image></view>
					<view class="item-right" @click="$refs.organizationSelectPopop.open()">
						<view class="service-list inline-list">
							<view class="service-item active">{{ organization }}</view>
						</view>
						<view class="item-nav">
							<image src="@/static/img/right.png" mode="aspectFit"></image>
						</view>
					</view>
				</view>
				<view class="od-item marginbottom20">
					<view class="item-tip" style="padding-right: 20rpx;" @click="download(hearAddrUrl)"><view class="center-box">
				        审理地点<view class="required-box">
				        *
				        </view>
				    </view><image  src="@/static/img/order-ques.png" mode=""
				style="width: 30rpx;height: 30rpx"></image></view>
					<view class="item-right" @click="$refs.popupTake.open()">
						<view class="item-txt gray" v-if="!hear_addr">您的案件在哪里审理？</view>
						<view class="service-list inline-list" v-else>
							<view class="service-item active">{{ hear_addr }}</view>
						</view>
						<view class="item-nav" @click="$refs.popupTake.open()">
							<image src="@/static/img/right.png" mode="aspectFit"></image>
						</view>
					</view>
				</view>
				<view class="od-item marginbottom20">
					<view class="item-tip">律师挑选方式</view>
				    <view class="item-right">
				    	<view class="service-list inline-list">
				    		<view class="service-item active">智能匹配</view>
				    	</view>
				    	<view class="item-nav"></view>
				    </view>
				</view>
				<view class="od-item marginbottom20">
					<view class="item-tip">
				        <view class="center-box">
				            律师执业年限
				            <view class="required-box">
				            *
				            </view>
				        </view>
					</view>
				    <view class="item-right" @click="$refs.productNameSelectPopop.open()">
				    	<view class="service-list inline-list">
				    		<view class="service-item active" style="width: calc((100% - 50rpx) / 2);">{{ practiceYear }}</view>
				    	</view>
				    	<view class="item-nav">
				    		<image src="@/static/img/right.png" mode="aspectFit"></image>
				    	</view>
				    </view>
				</view>
				<view class="od-item marginbottom20">
				    <view class="item-tip">
				        <view class="center-box">
				            律师执业区域
				            <view class="required-box">
				                *   
				            </view>
				        </view>
				    </view>
				    <view class="item-right" @click="practiceAreaClick">
				    	<view class="item-txt gray" v-if="!practiceArea">请选择审理地点的律师,效率高,成本低</view>
				    	<view class="service-list inline-list" v-else>
				    		<view class="service-item active" style="width: calc((100% - 50rpx) / 2)">{{ practiceArea }}</view>
				    	</view>
				    	<view class="item-nav">
				    		<image src="@/static/img/right.png" mode="aspectFit"></image>
				    	</view>
				    </view>
				</view>
				<view class="od-item marginbottom20">
				    <view class="item-tip">
				        <view class="center-box">
				            律师服务语言
				            <view class="required-box">
				                *   
				            </view>
				        </view>
				    </view>
				    <view class="item-right" @click="langClick">
				    	<view class="item-txt gray" v-if="lang_ids.length == 0">您希望律师用什么语言与您交流</view>
				    	<view class="service-list inline-list" v-else>
				    		<view class="service-item active" v-for="(item,index) in lang_ids" :key='index' style="width: calc((100% - 100rpx) / 2);margin-top: 10rpx;margin-right: 20rpx;">{{getDataName(langIdData,item)}}</view>
				    	</view>
				    	<view class="item-nav">
				    		<image src="@/static/img/right.png" mode="aspectFit"></image>
				    	</view>
				    </view>
				</view>
				<view class="od-item marginbottom20">
					<view class="item-tip" style="padding-right: 20rpx;" @click="$refs.stagePopup.open()">服务阶段<image  src="@/static/img/order-ques.png" mode=""
				style="width: 30rpx;height: 30rpx"></image></view>
					<view class="item-right" @click="$refs.popupServiceStage.open()">
						<view class="service-list inline-list">
							<view class="service-item active" style="width: 100%; margin-right: 0;">{{ stage }}</view>
						</view>
						<view class="item-nav" @click="$refs.popupServiceStage.open()">
							<image src="@/static/img/right.png" mode="aspectFit"></image>
						</view>
					</view>
				</view>
				<view class="od-item marginbottom20">
					<view class="item-tip">
                        <view class="center-box">
                            服务报价
                            <view class="required-box">
                                *   
                            </view>
                        </view>
                    </view>
					<view class="item-right">
				    <view class="service-list inline-list">
				    	<view class="service-item active" style="width: calc((100% - 50rpx) / 2)">{{serve_offer}}</view>
				    </view>
					</view>
				</view>
                <view class="od-item marginbottom20">
                	<view class="item-tip" @click="$refs.offerPopop.open()"><view class="center-box">
                            报价方式
                            <view class="required-box">
                                *   
                            </view></view>
                            <image  src="@/static/img/order-ques.png" mode=""
				style="width: 30rpx;height: 30rpx;padding-right: 20rpx;"></image>
                        </view>
                	<view class="item-right" @click="$refs.offerSelectPopop.open()">
                    <view class="service-list inline-list">
                    	<view class="service-item active" style="width: calc((100% - 50rpx) / 2)">{{getDataName(offerData,offer)}}</view>
                    </view>
                	</view>
                </view>
                <view class="od-item marginbottom20">
                	<view class="item-tip"><view class="center-box">
                            付款类型
                            <view class="required-box">
                                *   
                            </view>
                        </view>
                    </view>
                	<view class="item-right" @click="$refs.moneyTypeSelectPopop.open()">
                    <view class="service-list inline-list">
                    	<view class="service-item active" style="width: calc((100% - 50rpx) / 2)"></view>
                    </view>
                	</view>
                </view>
				<view class="od-item marginbottom20">
					<view class="item-tip">投资人承担<image src="@/static/img/order-ques.png" mode=""
				style="width: 30rpx;height: 30rpx;padding-right: 20rpx;"></image></view>
					<view class="item-right">
						<view class="item-txt" style="border: 1rpx solid red;line-height:50rpx;color:red;padding: 6rpx;">律师费+立案受理费+公告费+异地被告身份查询费</view>
						<view class="whyIcon" @click="downloadFile(info.product.doc[2].url)">
							<image src="@/static/img/why.png" mode="aspectFit"></image>
						</view>
					</view>
				</view>
				<view class="od-item marginbottom20">
					<view class="item-tip" @click="$refs.earningsPopup.open()">投资人收益<image src="@/static/img/order-ques.png" mode=""
				style="width: 30rpx;height: 30rpx;padding-right: 20rpx;"></image></view>
					<view class="item-right">
						<view class="item-txt" style="border: 1rpx solid red;line-height:50rpx;padding: 6rpx;">
							<text class="red">您回收款物后5日内，按回收款物金额的30％支付投资收益给投资人，不回款不用付。</text>
						</view>
				        <view class="whyIcon">
				        	<image ></image>
				        </view>
					</view>
				</view>
				<view class="od-item marginbottom20">
					<view class="item-tip">项目资料</view>
					<view class="item-right"
						@click="jump('/pages/client/order/upload', { source: JSON.stringify(source) })">
						<view class="item-txt gray">您手上有的资料都可上传</view>
						<view class="item-file" v-if="source && source.length > 0">
							<image src="@/static/img/order-file.png"></image>
						</view>
						<view class="item-nav">
							<image src="@/static/img/right.png" mode="aspectFit"></image>
						</view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip" @click="$refs.myrequirePopup.open()">我的要求<image src="@/static/img/order-ques.png" mode=""
				style="width: 30rpx;height: 30rpx;padding-right: 20rpx;"></image></view>
					<view class="item-right">
						<order-right-textarea ref="myrequire"></order-right-textarea>
						<view class="item-nav"></view>
					</view>
				</view> -->
                <view class="od-item marginbottom20">
                	<view class="item-tip">
                    <view class="center-box">
                        案件进度<view class="required-box">
                        *
                        </view>
                    </view></view>
                	<view class="item-right" @click="$refs.jinduPopop.open()">
                		<view class="service-list inline-list">
                			<view class="service-item active">{{ jindu }}</view>
                		</view>
                        <view class="item-nav">
                			<image src="@/static/img/right.png" mode="aspectFit"></image>
                		</view>
                	</view>
                </view>
                <view class="od-item marginbottom20">
                	<view class="item-tip">
                    <view class="center-box">
                        您的角色<view class="required-box">
                        *
                        </view>
                    </view></view>
                	<view class="item-right" @click="$refs.selfIdentPopop.open()">
                		<view class="service-list inline-list">
                			<view class="service-item active">{{ self_ident }}</view>
                		</view>
                        <view class="item-nav">
                			<image src="@/static/img/right.png" mode="aspectFit"></image>
                		</view>
                	</view>
                </view>
                <view class="od-item marginbottom20">
                	<view class="item-tip" style="padding-right: 20rpx;" @click="$refs.identPopop.open()">
                    <view class="center-box">
                        对方类型<view class="required-box">
                        *
                        </view>
                    </view>
                    <image  src="@/static/img/order-ques.png" mode=""
                style="width: 30rpx;height: 30rpx"></image></view>
                	<view class="item-right" @click="$refs.duiIdentPopop.open()">
                		<view class="service-list inline-list">
                			<view class="service-item active" style="width: calc((100% - 50rpx) / 2);">{{ dui_ident }}</view>
                		</view>
                		<view class="item-nav">
                			<image src="@/static/img/right.png" mode="aspectFit"></image>
                		</view>
                	</view>
                </view>
                <view class="od-item marginbottom20">
                	<view class="item-tip" style="padding-right: 20rpx;" @click="jump('/pages/client/order/web-view', { url: 'http://zxgk.court.gov.cn/shixin/' })">
                    <view class="center-box">
                        对方失信<view class="required-box">
                        *
                        </view>
                    </view><image  src="@/static/img/order-ques.png" mode=""
                style="width: 30rpx;height: 30rpx"></image></view>
                	<view class="item-right" @click="$refs.believePopop.open()">
                		<view class="service-list inline-list">
                			<view class="service-item active">{{isBelieveSelectData[is_believe].value_name}}</view>
                		</view>
                        <view class="item-nav">
                			<image src="@/static/img/right.png" mode="aspectFit"></image>
                		</view>
                	</view>
                </view>
                <view class="od-item marginbottom20">
                	<view class="item-tip" style="padding-right: 20rpx;" @click="jump('/pages/client/order/web-view', { url: 'http://zxgk.court.gov.cn/zhixing/' })">
                    <view class="center-box">
                        对方正在</br>被法院执</br>行中<view class="required-box">
                        *
                        </view>
                    </view><image  src="@/static/img/order-ques.png" mode=""
                style="width: 30rpx;height: 30rpx"></image></view>
                	<view class="item-right" @click="$refs.isZhiXingPopop.open()">
                		<view class="service-list inline-list">
                			<view class="service-item active">{{isBelieveSelectData[is_fayuan_zhixing].value_name}}</view>
                		</view>
                        <view class="item-nav">
                			<image src="@/static/img/right.png" mode="aspectFit"></image>
                		</view>
                	</view>
                </view>
                <view class="od-item marginbottom20">
                	<view class="item-tip" style="padding-right: 20rpx;" @click="$refs.organizationPopop.open()">
                    <view class="center-box">
                        审理机构<view class="required-box">
                        *
                        </view>
                    </view><image  src="@/static/img/order-ques.png" mode=""
                style="width: 30rpx;height: 30rpx"></image></view>
                	<view class="item-right" @click="$refs.organizationSelectPopop.open()">
                		<view class="service-list inline-list">
                			<view class="service-item active">{{ organization }}</view>
                		</view>
                		<view class="item-nav">
                			<image src="@/static/img/right.png" mode="aspectFit"></image>
                		</view>
                	</view>
                </view>
                <view class="od-item marginbottom20">
                	<view class="item-tip" style="padding-right: 20rpx;" @click="$refs.stagePopup.open()">服务阶段<image  src="@/static/img/order-ques.png" mode=""
                style="width: 30rpx;height: 30rpx"></image></view>
                	<view class="item-right" @click="$refs.popupServiceStage.open()">
                        <view class="item-txt gray" v-if="!stage">您想让律师帮您代理哪几个办案阶段</view>
                		<view class="service-list inline-list" v-else>
                			<view class="service-item active" style="width: 100%; margin-right: 0;">{{ stage }}</view>
                		</view>
                		<view class="item-nav">
                			<image src="@/static/img/right.png" mode="aspectFit"></image>
                		</view>
                	</view>
                </view>
                <view class="od-item marginbottom20">
                	<view class="item-tip" style="padding-right: 20rpx;" @click="download({image:hearAddrUrl})"><view class="center-box">
                        审理地点<view class="required-box">
                        *
                        </view>
                    </view><image  src="@/static/img/order-ques.png" mode=""
                style="width: 30rpx;height: 30rpx"></image></view>
                	<view class="item-right" @click="popupTakeTwoClick">
                		<view class="item-txt gray" v-if="!hear_addr">您的案件在哪里审理？</view>
                		<view class="service-list inline-list" v-else>
                			<view class="service-item active" style="width: calc((100% - 50rpx) / 2)">{{ hear_addr.replace(/,/g, "") }}</view>
                		</view>
                		<view class="item-nav">
                			<image src="@/static/img/right.png" mode="aspectFit"></image>
                		</view>
                	</view>
                </view>
                <!-- <view class="od-item marginbottom20">
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
                </view> -->
                <view class="od-item marginbottom20">
                	<view class="item-tip">律师挑选方式</view>
                    <view class="item-right">
                    	<view class="service-list inline-list">
                    		<view class="service-item active">智能匹配</view>
                    	</view>
                    	<view class="item-nav"></view>
                    </view>
                </view>
                <view class="od-item marginbottom20">
                	<view class="item-tip">
                        <view class="center-box">
                            律师执业年限
                            <view class="required-box">
                            *
                            </view>
                        </view>
                	</view>
                    <view class="item-right" @click="$refs.productNameSelectPopop.open()">
                    	<view class="service-list inline-list">
                    		<view class="service-item active" style="width: calc((100% - 50rpx) / 2);">{{ practiceYear }}</view>
                    	</view>
                    	<view class="item-nav">
                    		<image src="@/static/img/right.png" mode="aspectFit"></image>
                    	</view>
                    </view>
                </view>
                <view class="od-item marginbottom20">
                    <view class="item-tip">
                        <view class="center-box">
                            律师执业区域
                            <view class="required-box">
                                *   
                            </view>
                        </view>
                    </view>
                    <view class="item-right" @click="practiceAreaClick">
                    	<view class="item-txt gray" v-if="!practiceArea">请选择审理地点的律师，效率高，成本低</view>
                    	<view class="service-list inline-list" v-else>
                    		<view class="service-item active" style="width: calc((100% - 50rpx) / 2)">{{ practiceArea.replace(/,/g, "") }}</view>
                    	</view>
                    	<view class="item-nav">
                    		<image src="@/static/img/right.png" mode="aspectFit"></image>
                    	</view>
                    </view>
                </view>
                <view class="od-item marginbottom20">
                    <view class="item-tip">
                        <view class="center-box">
                            律师服务语言
                            <view class="required-box">
                                *   
                            </view>
                        </view>
                    </view>
                    <view class="item-right" @click="langClick">
                    	<view class="item-txt gray" v-if="lang_ids.length == 0">您希望律师用什么语言与您交流</view>
                    	<view class="service-list inline-list" v-else>
                    		<view class="service-item active"  :style="lang_ids.length == 1 ? 'width: calc((100% - 50rpx) / 2);margin-top: 10rpx' : 'width: 100%;margin-top: 10rpx'">{{langStr}}</view>
                    	</view>
                        <!-- <view class="service-list inline-list" v-else>
                        	<view class="service-item active" style="width: calc((100% - 50rpx) / 2);margin-top: 10rpx;margin-right: 20rpx;">{{getDataName(langIdData,lang_ids[0])}}</view>
                        	<view class="service-item active" style="width: calc((100% - 50rpx) / 2);margin-top: 10rpx;margin-right: 20rpx;">{{getDataName(langIdData,lang_ids[1])}}</view>
                        </view> -->
                    	<view class="item-nav">
                    		<image src="@/static/img/right.png" mode="aspectFit"></image>
                    	</view>
                    </view>
                </view>
                <view class="od-item marginbottom20">
                    <view class="item-tip">
                            排除律师
                    </view>
                    <view class="item-right" @click="lawyerSelectClick()">
                    	<view class="item-txt gray" v-if="remove_userids.length == 0">您不想让哪些律师/哪个律所看到您的订单</view>
                    	<view class="service-list inline-list" v-else>
                    		<view class="service-item active">{{ remove_userids.length }}个</view>
                    	</view>
                    	<view class="item-nav" @click="$refs.popupServiceStage.open()">
                    		<image src="@/static/img/right.png" mode="aspectFit"></image>
                    	</view>
                    </view>
                </view>
                
                
                <view class="od-item marginbottom20">
                	<view class="item-tip">
                        <view class="center-box">
                            服务报价
                            <view class="required-box">
                                *   
                            </view>
                        </view>
                    </view>
                	<view class="item-right">
                    <view class="service-list inline-list">
                    	<view class="service-item active" style="width: calc((100% - 50rpx) / 2)">{{serve_offer}}</view>
                    </view>
                    
                    <view class="whyIcon" @click="gotoJiSuanQi(info.product.product_id)">
                    	<image src="@/static/img/jisuanqi-icon.png" mode="aspectFit"></image>
                    </view>
                	</view>
                </view>
                <view class="od-item marginbottom20">
                	<view class="item-tip" @click="$refs.offerPopop.open()"><view class="center-box">
                            报价方式
                            <view class="required-box">
                                *   
                            </view></view>
                            <image  src="@/static/img/order-ques.png" mode=""
                style="width: 30rpx;height: 30rpx;padding-right: 20rpx;"></image>
                        </view>
                	<view class="item-right" @click="$refs.offerSelectPopop.open()">
                    <view class="service-list inline-list">
                    	<view class="service-item active" style="width: calc((100% - 50rpx) / 2)">{{offer}}</view>
                    </view>
                    <view class="item-nav">
                    	<image src="@/static/img/right.png" mode="aspectFit"></image>
                    </view>
                	</view>
                </view>
                <!-- <view class="od-item marginbottom20">
                	<view class="item-tip">报价方式</view>
                	<view class="item-right">
                		<view class="service-list service-list-bottom inline-list">
                			<view class="service-item marginbottom20" :class="{ active: offer == item.value_name }" @click="offer = item.value_name" v-for="(item, index) in offerList">
                				{{ item.value_name }}
                			</view>
                			<view class="service-tip-box" v-html="tipGrade"></view>
                		</view>
                		<view class="item-nav"></view>
                	</view>
                </view> -->
                <!-- <view class="od-item">
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
                			<view class="fee-right" v-if="offer == '千里马'">无</view>
                			<view class="fee-right" v-else>{{ moneyList.length > 0 ? moneyList[0].later_money : '' }}</view>
                		</view>
                	</view>
                </view> -->
                <view class="od-item marginbottom20">
                	<view class="item-tip">
                        <view class="center-box">
                            付款时间
                            <view class="required-box" v-if="offer == '千里马'">
                                *   
                            </view>
                        </view>
                    </view>
                	<view class="item-right" @click="offer == '千里马' ? $refs.priceTypePopup.open() : ''">
                    <view class="service-list inline-list">
                    	<view class="service-item active" style="width: 60%;position: relative;">{{price_type_text}}
                        <image v-if="price_type_text == '先付后用 任性付'" class="noback" src="@/static/img/order-noback4.png" mode="aspectFit"></image>
                        <image v-if="price_type_text == '先用后付 无忧付'" class="noback" src="@/static/img/order-noback2.png" mode="aspectFit"></image>
                        <image v-if="price_type_text == '边用边付 轻松付'" class="noback" src="@/static/img/order-noback3.png" mode="aspectFit"></image>
                        </view>
                    </view>
                    <view class="item-nav" v-if="offer == '千里马'">
                    	<image src="@/static/img/right.png" mode="aspectFit"></image>
                    </view>
                	</view>
                </view>
                <view class="od-item marginbottom20">
                	<view class="item-tip">
                        <view class="center-box">
                            付款金额
                        </view>
                    </view>
                	<view class="item-right" style="min-height:60rpx;padding-right: 20rpx;">
                        <view class="service-list inline-list" v-if="offer == '千里马'" style="color:red;font-weight: 700;margin-left: 10rpx;">
                            ￥{{ total }}
                        </view>
                        <view class="service-list inline-list" v-if="offer == '活马'" style="color:red;font-weight: 700;;margin-left: 10rpx;">
                            前期费用：{{total}}(下单时付)
                            <view v-if="self_ident == '起诉方'">
                                后期费用：按律师帮您回收款物金额的{{ later_money }}计算
                            </view>
                            <view v-else>
                                后期费用：按律师帮您减少支出金额的{{ later_money }}计算
                            </view>
                        </view>
                        <view class="service-list inline-list" v-if="offer == '还魂马'" style="color:red;font-weight: 700;;margin-left: 10rpx;">
                            <view v-if="self_ident == '起诉方'">
                                按律师帮您回收款物金额的{{ later_money }}计算
                            </view>
                            <view v-else>
                                按律师帮您减少支出金额的{{ later_money }}计算
                            </view>
                        </view>
                	</view>
                </view>
                <view class="od-item marginbottom20" v-if="bearFees == '投资人支付'">
                	<view class="item-tip">投资人收益</view>
                	<view class="item-right">
                		<view class="item-txt">
                			<text class="red">您回收款物后5日内，按回收款物金额的30％支付投资收益给投资人，不回款不用付。</text>
                			<br />
                		</view>
                	</view>
                </view>
                
                <!-- 优惠券组件 -->
                <order-user-coupon :info="info" v-if="Object.keys(info.product).length > 0" @getCoupon="getCoupon"></order-user-coupon>
                <!-- 付款方式组件 -->
                <!-- 选千里马-先用后付或还魂马时，付费方式字段隐藏 -->
                <!-- <template v-if="price_type_text != '先用后付 无忧付' && offer != '还魂马'">
                	<order-item-pay-method ref="orderItemPayMethod" :info="info" v-if="Object.keys(info.product).length > 0"></order-item-pay-method>
                </template> -->
                <template v-if="price_type_text != '先用后付 无忧付' && offer != '还魂马'">
                    <view class="od-item marginbottom20">
                    	<view class="item-tip"><view class="center-box">
                                付款方式
                                <view class="required-box">
                                    *   
                                </view></view>
                            </view>
                    	<view class="item-right" @click="$refs.playTypePopop.open()">
                        <view class="service-list inline-list">
                            <view v-if="pay_type == '微信'" class="service-item active" style="width: calc((100% - 50rpx) / 2)"><image style="width: 40rpx;height: 40rpx;margin-right: 10rpx;" src="@/static/img/pay-icon1.png" mode="aspectFit"></image>{{pay_type}}</view>
                            <view v-if="pay_type == '支付宝'" class="service-item active" style="width: calc((100% - 50rpx) / 2)"><image style="width: 40rpx;height: 40rpx;margin-right: 10rpx;" src="@/static/img/pay-icon2.png" mode="aspectFit"></image>{{pay_type}}</view>
                            <view v-if="pay_type == '余额'" class="service-item active" style="width: calc((100% - 50rpx) / 2)"><image style="width: 40rpx;height: 40rpx;margin-right: 10rpx;" src="@/static/img/pay-icon3.png" mode="aspectFit"></image>{{pay_type}}
                            </view>
                            <view v-if="pay_type == '朋友代付'" class="service-item active" style="width: calc((100% - 50rpx) / 2)"><image style="width: 40rpx;height: 40rpx;margin-right: 10rpx;" src="@/static/img/pay-icon4.png" mode="aspectFit"></image>{{pay_type}}</view>
                        </view>
                        <view class="item-nav">
                        	<image src="@/static/img/right.png" mode="aspectFit"></image>
                        </view>
                    	</view>
                    </view>
                </template>
                <view class="od-item marginbottom20">
                	<view class="item-tip">项目资料</view>
                	<view class="item-right" @click="jump('/pages/client/order/project-data', { card_images: card_images,liaotian_images:liaotian_images,jietiao_images: jietiao_images,cuishou_images:cuishou_images,other_images:other_images,type:2 })">
                		<view class="item-txt gray">您手上有的资料都可上传</view>
                		<view class="item-file" v-if="card_images!='' || liaotian_images!='' || jietiao_images!='' || cuishou_images!='' || other_images!=''"><image src="@/static/img/order-file.png"></image></view>
                		<view class="item-nav"><image src="@/static/img/right.png" mode="aspectFit"></image></view>
                	</view>
                </view>
                <view class="od-item marginbottom20">
                	<view class="item-tip">我的要求</view>
                	<view class="item-right">
                		<order-right-textarea ref="myrequire"></order-right-textarea>
                		<view class="item-nav"></view>
                	</view>
                </view>
                <!-- <view class="od-item">
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
                </view> -->
			</template>
			<template v-else>
				<view class="od-item marginbottom20">
					<view class="item-tip">案件进度</view>
					<view class="item-right">
						<view class="service-list inline-list">
							<view class="service-item active">{{ jindu }}</view>
						</view>
					</view>
				</view>
				<view class="od-item marginbottom20">
					<view class="item-tip">您的角色</view>
					<view class="item-right">
						<view class="service-list inline-list">
							<view class="service-item active">{{ self_ident }}</view>
						</view>
					</view>
				</view>
				<view class="od-item marginbottom20">
					<view class="item-tip" style="padding-right: 20rpx;" @click="$refs.identPopop.open()">对方类型<image  src="@/static/img/order-ques.png" mode=""
				style="width: 30rpx;height: 30rpx"></image></view>
					<view class="item-right">
						<view class="service-list inline-list">
							<view class="service-item active" style="width: calc((100% - 50rpx) / 2);">{{ dui_ident }}</view>
						</view>
					</view>
				</view>
				<view class="od-item marginbottom20">
					<view class="item-tip" style="padding-right: 20rpx;" @click="jump('/pages/client/order/web-view', { url: 'http://zxgk.court.gov.cn/shixin/' })">对方失信<image  src="@/static/img/order-ques.png" mode=""
				style="width: 30rpx;height: 30rpx"></image></view>
					<view class="item-right">
						<view class="service-list inline-list">
							<view class="service-item active">{{isBelieveSelectData[is_believe].value_name}}</view>
						</view>
					</view>
				</view>
				<view class="od-item marginbottom20">
					<view class="item-tip" style="padding-right: 20rpx;" @click="jump('/pages/client/order/web-view', { url: 'http://zxgk.court.gov.cn/zhixing/' })">对方正在被</br>法院执行中<image  src="@/static/img/order-ques.png" mode=""
				style="width: 30rpx;height: 30rpx"></image></view>
					<view class="item-right">
						<view class="service-list inline-list">
							<view class="service-item active">{{isBelieveSelectData[is_fayuan_zhixing].value_name}}</view>
						</view>
					</view>
				</view>
				<view class="od-item marginbottom20">
					<view class="item-tip" style="padding-right: 20rpx;" @click="$refs.organizationPopop.open()">审理机构<image  src="@/static/img/order-ques.png" mode=""
				style="width: 30rpx;height: 30rpx"></image></view>
					<view class="item-right">
						<view class="service-list inline-list">
							<view class="service-item active">{{ organization }}</view>
						</view>
					</view>
				</view>
                <view class="od-item marginbottom20">
                	<view class="item-tip" style="padding-right: 20rpx;" @click="$refs.stagePopup.open()">服务阶段<image  src="@/static/img/order-ques.png" mode=""
                style="width: 30rpx;height: 30rpx"></image></view>
                	<view class="item-right">
                		<view class="service-list inline-list">
                			<view class="service-item active" style="width: 100%; margin-right: 0;">{{ stage }}</view>
                		</view>
                	</view>
                </view>
				<view class="od-item marginbottom20">
					<view class="item-tip" style="padding-right: 20rpx;" @click="download({image:hearAddrUrl})"><view class="center-box">
                        审理地点<view class="required-box">
                        *
                        </view>
                    </view><image  src="@/static/img/order-ques.png" mode=""
				style="width: 30rpx;height: 30rpx"></image></view>
					<view class="item-right" @click="$refs.popupTake.open()">
						<view class="item-txt gray" v-if="!hear_addr">您的案件在哪里审理？</view>
						<view class="service-list inline-list" v-else>
							<view class="service-item active" style="width: calc((100% - 20rpx) / 2);">{{ hear_addr }}</view>
						</view>
						<view class="item-nav">
							<image src="@/static/img/right.png" mode="aspectFit"></image>
						</view>
					</view>
				</view>
                
                <view class="od-item marginbottom20">
                	<view class="item-tip">律师挑选方式</view>
                    <view class="item-right">
                    	<view class="service-list inline-list">
                    		<view class="service-item active">智能匹配</view>
                    	</view>
                    </view>
                </view>
                <view class="od-item marginbottom20">
                	<view class="item-tip">
                            律师执业年限
                	</view>
                    <view class="item-right">
                    	<view class="service-list inline-list">
                    		<view class="service-item active">{{ practiceYear }}</view>
                    	</view>
                    </view>
                </view>
                <view class="od-item marginbottom20">
                    <view class="item-tip">
                            律师执业区域
                    </view>
                    <view class="item-right">
                    	<view class="service-list inline-list">
                    		<view class="service-item active" style="width: calc((100% - 50rpx) / 2)">{{ practiceArea.replace(/,/g, "") }}</view>
                    	</view>
                    </view>
                </view>
                <view class="od-item marginbottom20">
                    <view class="item-tip">
                        <view class="center-box">
                            律师服务语言
                            <view class="required-box">
                                *   
                            </view>
                        </view>
                    </view>
                    <view class="item-right" @click="langClick">
                    	<view class="item-txt gray" v-if="lang_ids.length == 0">您希望律师用什么语言与您交流</view>
                    	<view class="service-list inline-list" v-else>
                    		<view class="service-item active"  :style="lang_ids.length == 1 ? 'width: calc((100% - 50rpx) / 2);margin-top: 10rpx' : 'width: 100%;margin-top: 10rpx'">{{langStr}}</view>
                    	</view>
                    	<!-- <view class="service-list inline-list" v-else>
                    		<view class="service-item active" style="width: calc((100% - 20rpx) / 2);margin:10rpx 10rpx 0rpx 10rpx">{{getDataName(langIdData,lang_ids[0])}}</view>
                    		<view class="service-item active" style="width: calc((100% - 20rpx) / 2);margin:10rpx 0rpx 0rpx 0rpx">{{getDataName(langIdData,lang_ids[1])}}</view>
                    	    ...
                    	</view> -->
                    	<view class="item-nav">
                    		<image src="@/static/img/right.png" mode="aspectFit"></image>
                    	</view>
                    </view>
                </view>
				
				<view class="od-item marginbottom20">
					<view class="item-tip">服务报价</view>
					<view class="item-right">
                    <view class="service-list inline-list">
                    	<view class="service-item active" style="width: calc((100% - 50rpx) / 2)">{{serve_offer}}</view>
                    </view>
					</view>
				</view>
                <view class="od-item marginbottom20">
                	<view class="item-tip">律师费用</view>
                	<view class="item-right">
                    <view class="service-list inline-list">
                    	<view class="service-item active" style="width: calc((100% - 50rpx) / 2)">投资人支付</view>
                    </view>
                	</view>
                </view>
				<view class="od-item marginbottom20">
					<view class="item-tip" style="align-items: flex-start;margin-top: 10rpx;" @click="download({image:doc_touziren})">投资人承担<image src="@/static/img/order-ques.png" mode=""
				style="width: 30rpx;height: 30rpx;padding-right: 20rpx;"></image></view>
					<view class="item-right">
						<view class="item-txt" style="border: 1rpx solid red;line-height:50rpx;color:red;padding: 6rpx 10rpx;margin-right: 6rpx;">律师费+立案受理费+公告费+异地被告身份查询费</view>
						<view class="whyIcon" style="align-items:center" @click="gotoJiSuanQi(info.product.product_id)">
							<image src="@/static/img/jisuanqi-icon.png" mode="aspectFit"></image>
						</view>
					</view>
				</view>
				<view class="od-item marginbottom20">
					<view class="item-tip" style="align-items: flex-start" @click="$refs.earningsPopup.open()">投资人收益<image src="@/static/img/order-ques.png" mode=""
				style="width: 30rpx;height: 30rpx;padding-right: 20rpx;"></image></view>
					<view class="item-right">
						<view class="item-txt" style="border: 1rpx solid red;line-height:50rpx;padding: 6rpx 10rpx;flex:1">
							<text class="red">您案件债权总额的30%，回款后7日内支付给投资人，不回款不用付。</text>
						</view>
                        <view class="whyIcon">
                        	<image ></image>
                        </view>
					</view>
				</view>
				<view class="od-item marginbottom20">
					<view class="item-tip">项目资料</view>
					<view class="item-right"
						@click="jump('/pages/client/order/project-data', { card_images: card_images,liaotian_images: liaotian_images,jietiao_images: jietiao_images,cuishou_images: cuishou_images,other_images: other_images,huan_images:huan_images,type:1 })">
						<view class="item-txt gray">您手上有的资料都可上传</view>
						<view class="item-file" v-if="card_images!='' || liaotian_images!='' || jietiao_images!='' || cuishou_images!='' || other_images!='' || huan_images!=''">
							<image src="@/static/img/order-file.png"></image>
						</view>
						<view class="item-nav">
							<image src="@/static/img/right.png" mode="aspectFit"></image>
						</view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip" @click="$refs.myrequirePopup.open()">我的要求<image src="@/static/img/order-ques.png" mode=""
				style="width: 30rpx;height: 30rpx;padding-right: 20rpx;"></image></view>
					<view class="item-right">
						<order-right-textarea ref="myrequire"></order-right-textarea>
						<view class="item-nav"></view>
					</view>
				</view>
				<!-- <view class="od-item">
					<view class="item-tip">服务保障</view>
					<view class="item-right" @click="$refs.orderService.$refs.popupEnsure.open()">
						<view class="item-txt green">
							<view class="text-ellipsis" style="width: 400rpx;">{{ info.product.tags }}</view>
						</view>
						<view class="item-nav">
							<image src="@/static/img/right.png" mode="aspectFit"></image>
						</view>
					</view>
				</view> -->
				<!-- <view class="od-item">
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
					<view class="whyIcon" @click="$refs.orderCommonTipMaybe.$refs.popupTip.open()">
						<image src="@/static/img/why.png" mode="aspectFit"></image>
					</view>
				</view> -->
			</template>
			<!-- 服务范围组件 -->
			<!-- <order-item-service-desc :info="info" v-if="Object.keys(info.product).length > 0"></order-item-service-desc> -->
		</view>
		<order-feiyong-info id='feiYong' v-show="bearFees == '自费'" :id='info.product.product_id' :docZifei='doc_zifei'></order-feiyong-info>
		<!-- 服务内容组件 -->
		<order-unfold-new title="服务内容" id='fuWu'>
			<view slot="unfold-con">
				<view class="" v-html="info.product.serve_content"></view>
			</view>
		</order-unfold-new>
		<!-- 产品说明组件 -->
		<order-unfold-product-new id='chanPin' title="产品说明" :isSpread='true' :img_src="info.product.desc_content"></order-unfold-product-new>

		<view class="od-box" :style="bearFees == '自费' ? 'margin-bottom:22rpx' : 'margin-bottom:88rpx'" id='wendajia'>
			<view class="od-item"
				@click="jump('/pages/client/order/ask', { id: info.product.id, product_name: info.product.product })">
				<view class="item-tip">问大家</view>
				<view class="item-right">
					<view class="item-txt">产品有疑问，进去问问用过的人吧</view>
					<view class="gray" style="line-height: 60rpx;" v-if="info.ques_count">{{ info.ques_count }}</view>
					<view class="item-nav">
						<image src="@/static/img/right.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="save-box-two">
			<checkbox-group @change="checkChange" v-if="bearFees == '投资人支付'">
				<label class="chekc-group-box" >
					<checkbox style="transform:scale(0.8);" color="#FFC801" value="1" />
					我已阅读
					<view class="check-info" @click="download({image:hetong_doc})">
						《债券投资合同》
					</view>,并同意按上述条款履行
				</label>
			</checkbox-group>
			<view class="save-go-box">
				<view class="go-left">
					<view class="left-prize" v-if="bearFees == '投资人支付'">
						<text style="font-size: 34rpx;">￥0元下单</text>
					</view>
					<template v-else>
						<view class="left-prize" style="font-weight: 600;">
							￥{{ money }}
							<text class="coupon-prize" v-if="sell && offer!='还魂马'" style="text-decoration:line-through;color:#aaaaaa">￥{{ sell }}</text>
						</view>
						<view class="left-tip">{{ price_type_text }}</view>
					</template>
				</view>
				<view class="go-right" v-if="!edit_order_id">
                    <button v-if="isShare" type="default" class="go-btn" @click="confirm">一键无忧下单</button>
                    <button v-else type="default" class="go-btn" @click="downloadApp">一键无忧下单</button>
                    </view>
				<view class="go-right" v-else><button type="default" class="go-btn" @click="addOrder">我要下单</button></view>
			</view>
		</view>
		

		<!-- 服务人员弹出层 -->
		<uni-popup ref="popupService" type="bottom">
			<order-popup-service @closePop="closePop('popupService')" @chooseService="chooseService"
				:practiceChoose="practiceChoose" :practiceYear="practiceYear" :practiceArea="practiceArea"
				:key="new Date().getTime()" :info="info"></order-popup-service>
		</uni-popup>
		<!-- 服务保障新组件 -->
		<order-service ref="orderService" v-if="Object.keys(info.product).length > 0" :info="info"></order-service>
		<!-- 服务保障组件 -->
		<order-service-ensure ref="orderServiceEnsure" v-if="Object.keys(info.product).length > 0" :info="info">
		</order-service-ensure>
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
			<view class="ok-box" slot="agree-box"><button type="default" class="ok-btn"
					@click="bondConfirm">确定并继续下单</button></view>
		</order-invest-contact>
		<!-- 审理地点弹出层 -->
		<!-- <uni-popup ref="popupTake">
			<order-popup-common title="审理地点" @closePop="closePop('popupTake')">
				<scroll-view class="popup-con" slot="popup-con" scroll-y="true">
					<view class="take-box">
						<view class="take-title">
							<text class="gray relative require">审理机关确定依据</text>
							<text class="blue">暂住证明</text>
							<text class="blue">法院管辖规定</text>
						</view>
						<view class="service-list">
							<view class="service-item" style="width: 100%;" :class="{ active: hear_basis == item }"
								v-for="(item, index) in info.list.hear_basis" @click="hear_basis = item">
								{{ item }}
							</view>
						</view>
						<view class="take-title">
							<text class="gray relative require">审理机关所在区域</text>
							<text class="red">(其他城市将逐步开放业务)</text>
						</view>
						<view class="service-list" style="justify-content: space-around;">
							<view class="service-item" style="width: calc((100% - 40rpx)/2);"
								:class="{ active: hear_addr == item }" v-for="(item, index) in info.list.hear_addr"
								@click="hear_addr = item">
								{{ item }}
							</view>
						</view>
					</view>
				</scroll-view>
				<view class="ok-box" slot="popup-btn"
					style="margin-top: -50rpx; position: absolute; bottom: 0; width: 100%; border-radius: 46rpx">
					<button type="default" class="ok-btn" @click="closePop('popupTake')">确定</button>
				</view>
			</order-popup-common>
		</uni-popup> -->
        <uni-popup ref="popupTake" type="bottom">
            <view class="popup-bottom-box">
            	<view class="bot-title">
            		<view class="title-txt">审理地点</view>
            		<view class="title-close" @click="closePop('popupTake')">
            			<view class="image-wrapper">
            				<image src="@/static/img/close.png" mode="aspectFit"></image>
            			</view>
            		</view>
            	</view>
                <scroll-view scroll-y="true" class="stage-scroll-box">
                    <view v-for="(item,index) in info.list.hear_addr" :key='index' :class="hear_addr == item ? 'select-item-box pitch-on': 'select-item-box un-pitch'"  @click="hearAddrSelectClick(item)">{{ item }}</view>
                </scroll-view>
            </view>
        </uni-popup>
        <uni-popup ref="popupTakeTwo" type="bottom">
            <view class="popup-bottom-box">
            	<view class="bot-title">
            		<view class="title-txt">审理地点(自费)</view>
            		<view class="title-close" @click="closePop('popupTakeTwo')">
            			<view class="image-wrapper">
            				<image src="@/static/img/close.png" mode="aspectFit"></image>
            			</view>
            		</view>
            	</view>
                <!-- <scroll-view scroll-y="true" class="stage-scroll-box">
                    <view v-for="(item,index) in info.list.hear_addr" :key='index' :class="hear_addr == item ? 'select-item-box pitch-on': 'select-item-box un-pitch'"  @click="hearAddrSelectClick(item)">{{ item }}</view>
                </scroll-view> -->
            </view>
        </uni-popup>
        <u-picker mode="region" v-model="popupTakeTwo" :params="params" :default-region="defaultTake"
        	confirm-color="#FFC801" @confirm="TakeConfirm" title='审理地点'>
            </u-picker>
        
		<!-- 服务阶段弹出层 -->
		<uni-popup ref="popupServiceStage" type="bottom">
            <view class="popup-bottom-box">
            	<view class="bot-title">
            		<view class="title-txt">选择服务阶段</view>
            		<view class="title-close" @click="closePop('popupServiceStage')">
            			<view class="image-wrapper">
            				<image src="@/static/img/close.png" mode="aspectFit"></image>
            			</view>
            		</view>
            	</view>
                <scroll-view scroll-y="true" class="stage-scroll-box">
                    <view v-for="(item,index) in stage_list" :key='index' :class="stage == item ? 'select-item-box pitch-on': 'select-item-box un-pitch'"  @click="stageSelectClick(item)">{{ item }}</view>
                </scroll-view>
            </view>
		</uni-popup>
        <uni-popup ref="identPopop" type="bottom">
            <view class="popup-bottom-box">
            	<view class="bot-title">
            		<view class="title-txt">对方类型选择说明</view>
            		<view class="title-close" @click="closePop('identPopop')">
            			<view class="image-wrapper">
            				<image src="@/static/img/close.png" mode="aspectFit"></image>
            			</view>
            		</view>
            	</view>
                <scroll-view scroll-y="true" class="bot-con"> 
                    <view class="bot-title-box">
                        <view class="icon-box"></view>
                        <view class="title-text-box">快速指引</view>
                    </view>
                    <view class="bot-content-box">
                        可在企查查、启信宝、爱企查、国家企业信用信息公示系统上查询确认对方的类型
                    </view>
                    <view class="bot-title-box">
                        <view class="icon-box"></view>
                        <view class="title-text-box">个人/个体户</view>
                    </view>
                    <view class="bot-content-img-box">
                        <image src="@/static/img/ident-popup1.jpeg"></image>
                        <image src="@/static/img/ident-popup2.jpg" style="margin-left:20rpx"></image>
                    </view>
                    <view class="bot-title-box">
                        <view class="icon-box"></view>
                        <view class="title-text-box">私企/公司</view>
                    </view>
                    <view class="bot-content-img-box">
                        <image src="@/static/img/ident-popup3.jpg"></image>
                        <image src="@/static/img/ident-popup4.jpg" style="margin-left:20rpx"></image>
                    </view>
                    <view class="bot-title-box">
                        <view class="icon-box"></view>
                        <view class="title-text-box">国企/单位</view>
                    </view>
                    <view class="bot-content-img-box">
                        <image src="@/static/img/ident-popup5.jpg"></image>
                        <image src="@/static/img/ident-popup6.jpg" style="margin-left:20rpx"></image>
                    </view>
                    <view class="bot-content-img-box">
                        <image src="@/static/img/ident-popup7.jpg"></image>
                        <image src="@/static/img/ident-popup8.jpg" style="margin-left:20rpx"></image>
                    </view>
                    <view class="bot-content-img-box">
                        <image src="@/static/img/ident-popup9.jpg"></image>
                    </view>
                </scroll-view>
                <view class="bot-save">
                    <view class="save-box" @click="closePop('identPopop')">朕知道了</view>
                </view>
                </view>
        </uni-popup>
        <uni-popup ref="organizationPopop" type="bottom">
            <view class="popup-bottom-box">
            	<view class="bot-title">
            		<view class="title-txt">审理机构选择说明</view>
            		<view class="title-close" @click="closePop('organizationPopop')">
            			<view class="image-wrapper">
            				<image src="@/static/img/close.png" mode="aspectFit"></image>
            			</view>
            		</view>
            	</view>
                <scroll-view scroll-y="true" class="bot-con">
                    <view class="bot-title-two-box">
                        <view class="icon-box"></view>
                        <view class="bot-content-box">您和对方没有书面文件约定由哪个机构审理的，</br>选<span>人民法院</span>。
                        </view>
                    </view>
                    <view class="bot-title-two-box">
                        <view class="icon-box"></view>
                        <view class="bot-content-box">您和对方有书面文件约定由人民法院审理的，</br>选<span>人民法院</span>。
                        </view>
                    </view>
                    <view class="bot-title-two-box">
                        <view style="margin-left:29rpx" class="bot-content-box">约定由XXX仲裁委员会审理的，</br>选<span>商事仲裁委</span>。
                        </view>
                    </view>
                    <view class="bot-title-two-box">
                        <view style="margin-left:29rpx" class="bot-content-box">书面文件约定范例
                        </view>
                    </view>
                    <view class="bot-title-two-box">
                        <view style="margin-left:29rpx" class="bot-content-box">·因本协议引起的或与本协议有关的任何争议，由双方友好协商解决。协商不成时，双方均有权向原告住所地的人民法院提起诉讼。
                        </view>
                    </view>
                    <view class="bot-title-two-box">
                        <view style="margin-left:29rpx" class="bot-content-box">·因本协议引起的或与本协议有关的任何争议，由双方友好协商解决，协商不成的，双方均同意提交广州仲裁委员会仲裁，并同意按照该会届时有效的仲裁规则仲裁。仲裁裁决是终局的，对各方均有约束力
                        </view>
                    </view>
                </scroll-view>
                <view class="bot-save">
                    <view class="save-box" @click="closePop('organizationPopop')">朕知道了</view>
                </view>
            </view>
        </uni-popup>
        <uni-popup ref="jinduPopop" type="bottom">
            <view class="popup-bottom-box">
            	<view class="bot-title">
            		<view class="title-txt">选择案件进度</view>
            		<view class="title-close" @click="closePop('jinduPopop')">
            			<view class="image-wrapper">
            				<image src="@/static/img/close.png" mode="aspectFit"></image>
            			</view>
            		</view>
            	</view>
            <view class="bot-select-con">
                <view v-for="(item,index) in jinduSelectData" :key='index' :class="jindu == item.value_name ? 'select-item-box pitch-on': 'select-item-box un-pitch'" @click="jinduSelectClick(item.value_name )">{{item.value_name }}</view>
            </view>
            </view>
        </uni-popup>
        <uni-popup ref="selfIdentPopop" type="bottom">
            <view class="popup-bottom-box">
            	<view class="bot-title">
            		<view class="title-txt">选择您的角色</view>
            		<view class="title-close" @click="closePop('selfIdentPopop')">
            			<view class="image-wrapper">
            				<image src="@/static/img/close.png" mode="aspectFit"></image>
            			</view>
            		</view>
            	</view>
            <view class="bot-select-con">
                <view v-for="(item,index) in selfIdentSelectData" :key='index' :class="self_ident == item.value_name ? 'select-item-box pitch-on': 'select-item-box un-pitch'" @click="selfIdentSelectClick(item.value_name )">{{item.value_name }}</view>
            </view>
            </view>
        </uni-popup>
        <uni-popup ref="duiIdentPopop" type="bottom">
            <view class="popup-bottom-box">
            	<view class="bot-title">
            		<view class="title-txt">选择对方类型</view>
            		<view class="title-close" @click="closePop('duiIdentPopop')">
            			<view class="image-wrapper">
            				<image src="@/static/img/close.png" mode="aspectFit"></image>
            			</view>
            		</view>
            	</view>
            <view class="bot-select-con">
                <view v-for="(item,index) in duiIdentSelectData" :key='index' :class="dui_ident == item.value_name ? 'select-item-box pitch-on': 'select-item-box un-pitch'" @click="duiIdentSelectClick(item.value_name )">{{item.value_name }}</view>
            </view>
            </view>
        </uni-popup>
        <uni-popup ref="believePopop" type="bottom">
            <view class="popup-bottom-box">
            	<view class="bot-title">
            		<view class="title-txt">选择对方失信</view>
            		<view class="title-close" @click="closePop('believePopop')">
            			<view class="image-wrapper">
            				<image src="@/static/img/close.png" mode="aspectFit"></image>
            			</view>
            		</view>
            	</view>
            <view class="bot-select-con">
                <view v-for="(item,index) in isBelieveSelectData" :key='index' :class="is_believe == item.id ? 'select-item-box pitch-on': 'select-item-box un-pitch'" @click="isBelieveSelectClick(item.id )">{{item.value_name }}</view>
            </view>
            </view>
        </uni-popup>
        <uni-popup ref="isZhiXingPopop" type="bottom">
            <view class="popup-bottom-box">
            	<view class="bot-title">
            		<view class="title-txt">选择对方正在被法院执行中</view>
            		<view class="title-close" @click="closePop('isZhiXingPopop')">
            			<view class="image-wrapper">
            				<image src="@/static/img/close.png" mode="aspectFit"></image>
            			</view>
            		</view>
            	</view>
            <view class="bot-select-con">
                <view v-for="(item,index) in isBelieveSelectData" :key='index' :class="is_fayuan_zhixing == item.id ? 'select-item-box pitch-on': 'select-item-box un-pitch'" @click="isZhiXingSelectClick(item.id )">{{item.value_name }}</view>
            </view>
            </view>
        </uni-popup>
        
        <uni-popup ref="organizationSelectPopop" type="bottom">
            <view class="popup-bottom-box">
            	<view class="bot-title">
            		<view class="title-txt">选择审理机构</view>
            		<view class="title-close" @click="closePop('organizationSelectPopop')">
            			<view class="image-wrapper">
            				<image src="@/static/img/close.png" mode="aspectFit"></image>
            			</view>
            		</view>
            	</view>
            <view class="bot-select-con">
                <view v-for="(item,index) in organizationSelectData" :key='index' :class="organization == item.value_name ? 'select-item-box pitch-on': 'select-item-box un-pitch'" @click="organizationSelectClick(item.value_name )">{{item.value_name }}</view>
            </view>
            </view>
        </uni-popup>
        <uni-popup ref="stagePopup" type="bottom">
            <view class="popup-bottom-box">
            	<view class="bot-title">
            		<view class="title-txt">服务阶段选择说明</view>
            		<view class="title-close" @click="closePop('stagePopup')">
            			<view class="image-wrapper">
            				<image src="@/static/img/close.png" mode="aspectFit"></image>
            			</view>
            		</view>
            	</view>
                <scroll-view scroll-y="true" class="bot-con" style="height:500rpx">
                    <view class="stage-item-box" v-for="(item,index) in stageSelectData" :key='index' @click="stageItemClick(item)">
                        <view class="left-box">
                            <view class="icon-box"></view>
                            <view class="title-box">
                                {{item.title}}
                            </view>
                        </view>
                        <view class="right-box">
                            <image src="@/static/img/right.png" mode="aspectFit"></image>
                        </view>
                    </view>
                </scroll-view>
                <view class="bot-save">
                    <view class="save-box" @click="closePop('stagePopup')">朕知道了</view>
                </view>
                </view>
        </uni-popup>
        <uni-popup ref="productNameSelectPopop" type="bottom">
            <view class="popup-bottom-box">
            	<view class="bot-title">
            		<view class="title-txt">选择律师执业年限</view>
            		<view class="title-close" @click="closePop('productNameSelectPopop')">
            			<view class="image-wrapper">
            				<image src="@/static/img/close.png" mode="aspectFit"></image>
            			</view>
            		</view>
            	</view>
            <view class="bot-select-con">
                <view v-for="(item,index) in productNameData" :key='index' :class="practiceYear == item.value_name ? 'select-item-box pitch-on': 'select-item-box un-pitch'" @click="productNameSelectClick(item.value_name )">{{item.value_name }}</view>
            </view>
            </view>
        </uni-popup>
        <uni-popup ref="langPopup" type="bottom">
            <view class="popup-bottom-box">
            	<view class="bot-title">
            		<view class="title-txt">选择律师服务语言</view>
            		<view class="title-close" @click="closePop('langPopup')">
            			<view class="image-wrapper">
            				<image src="@/static/img/close.png" mode="aspectFit"></image>
            			</view>
            		</view>
            	</view>
                <view class="assistant-title-box">您希望律师用什么语言与您交流？</view>
            <scroll-view scroll-y="true" class="bot-con" style="padding: 0rpx;">
                <view class="lang-item-box" v-for="(item,index) in langIdData" :key='index' @click="langSelectClick(item)">
                    <view class="icon-box" v-if="popupSelectList.includes(item.id)">
                        <image src="@/static/img/pitch-on-icon.png" mode="aspectFit"></image>
                    </view>
                    <view class="icon-box" v-else>
                    <image src="@/static/img/un-pitch-on-icon.png" mode="aspectFit"></image>
                    </view>
                    <view class="content-box">{{ item.recname }}</view>
                </view>
            </scroll-view>
            <view class="bot-save">
                <view class="save-box" @click="langSaveClick">确定</view>
            </view>
            </view>
        </uni-popup>
        <uni-popup ref="priceTypeSelectPopop" type="bottom">
            <view class="popup-bottom-box">
            	<view class="bot-title">
            		<view class="title-txt">选择费用承担</view>
            		<view class="title-close" @click="closePop('priceTypeSelectPopop')">
            			<view class="image-wrapper">
            				<image src="@/static/img/close.png" mode="aspectFit"></image>
            			</view>
            		</view>
            	</view>
            <view class="bot-select-con">
                <view v-for="(item,index) in moneyTypeData" :key='index' :class="bearFees == item.new_value_name ? 'select-item-box pitch-on': 'select-item-box un-pitch'" @click="priceTypeSelectClick(item.new_value_name )" style="position: relative;">{{item.new_value_name }}
								<image v-if="item.new_value_name == '投资人支付'" class="noback" src="@/static/img/order-noback.png" mode="aspectFit"></image>
								</view>
								
            </view>
            </view>
        </uni-popup>
        <uni-popup ref="myrequirePopup" type="bottom">
            <view class="popup-bottom-box">
            	<view class="bot-title">
            		<view class="title-txt">我的要求填写规范</view>
            		<view class="title-close" @click="closePop('myrequirePopup')">
            			<view class="image-wrapper">
            				<image src="@/static/img/close.png" mode="aspectFit"></image>
            			</view>
            		</view>
            	</view>
            <scroll-view scroll-y="true" class="bot-con" style="height:300rpx">
                <view class="bot-title-box">
                    <view class="icon-box"></view>
                    <view class="title-text-box">范例</view>
                </view>
                <view class="bot-content-box">
                    我要陈冠希还我借款200元</br>
                    我要彭于晏赔偿我人身损害费300元</br>
                    我要阿里巴巴给我货款30万元</br>
                    我要与林志玲离婚，要抚养权，分财产</br>
                    柳岩告我，要我赔偿精神损失费，没有道理，要求打赢</br>
                </view>
            </scroll-view>
            <view class="bot-save">
                <view class="save-box" @click="closePop('myrequirePopup')">朕知道了</view>
            </view>
            </view>
        </uni-popup>
        <uni-popup ref="earningsPopup" type="bottom">
            <view class="popup-bottom-box">
            	<view class="bot-title">
            		<view class="title-txt">投资人收益选择说明</view>
            		<view class="title-close" @click="closePop('earningsPopup')">
            			<view class="image-wrapper">
            				<image src="@/static/img/close.png" mode="aspectFit"></image>
            			</view>
            		</view>
            	</view>
            <scroll-view scroll-y="true" class="bot-con" style="height: 500rpx;">
                <view class="bot-title-box">
                    <view class="icon-box"></view>
                    <view class="title-text-box">债权总额</view>
                </view>
                <view class="bot-content-box">
                    ·指您请求的欠款本金、利息、违约金、立案受理费、公告费、律师费等全部费用总和，《债权投资合同》另有约定的除外。
                </view>
                <view class="bot-title-box">
                    <view class="icon-box"></view>
                    <view class="title-text-box">不同情形下，投资人投资收益计算公式如下</view>
                </view>
                <view class="bot-content-box">
                    ·法院判决时，您主张的欠款本金全部获得支持或部分获得支持，计算公式为：生效裁判文书上确定您可以收取的全部金额×30%；
                </view>
                <view class="bot-content-box">
                    ·与欠款方和解/调解时，您给欠款方减免了部分欠款本金或没有减免欠款本金，计算公式为：您与欠款方的和解/调解金额×30%。 
                </view>
            </scroll-view>
            <view class="bot-save">
                <view class="save-box" @click="closePop('earningsPopup')">朕知道了</view>
            </view>
            </view>
        </uni-popup>
        <uni-popup ref="offerSelectPopop" type="bottom">
            <view class="popup-bottom-box">
            	<view class="bot-title">
            		<view class="title-txt">报价方式</view>
            		<view class="title-close" @click="closePop('offerSelectPopop')">
            			<view class="image-wrapper">
            				<image src="@/static/img/close.png" mode="aspectFit"></image>
            			</view>
            		</view>
            	</view>
            <view class="bot-select-con">
                <view v-for="(item,index) in offerData" :key='index' :class="offer == item.value_name ? 'select-item-box pitch-on': 'select-item-box un-pitch'" @click="offerSelectClick(item.value_name )">{{item.value_name }}</view>
            </view>
            </view>
        </uni-popup>
        <uni-popup ref="offerPopop" type="bottom">
            <view class="popup-bottom-box">
            	<view class="bot-title">
            		<view class="title-txt">报价方式选择说明</view>
            		<view class="title-close" @click="closePop('offerPopop')">
            			<view class="image-wrapper">
            				<image src="@/static/img/close.png" mode="aspectFit"></image>
            			</view>
            		</view>
            	</view>
            <scroll-view scroll-y="true" class="bot-con" v-if="self_ident == '起诉方'">
                <view class="bot-title-box">
                    <view class="icon-box"></view>
                    <view class="title-text-box">千里马</view>
                </view>
                <view class="bot-content-box">
                    您认为很好收的债，请律师只是走个程序，省心省事</br>·先付费 后办事</br>·花小钱 办大事</br>·回款 全归您
                </view>
                <view class="bot-title-box">
                    <view class="icon-box"></view>
                    <view class="title-text-box">活马</view>
                </view>
                <view class="bot-content-box">
                    您认为可以收回的债，但要花点心思</br>·前期跑腿费+回款后提成</br>·风险共担 长效激励</br>·利益均衡 效益可期
                </view>
                <view class="bot-title-box">
                    <view class="icon-box"></view>
                    <view class="title-text-box">还魂马</view>
                </view>
                <view class="bot-content-box">
                    您认为不抱希望的烂债，反正搏一把</br>·先用后付 大力出奇迹</br>·风险律师担 不回款不收钱</br>·重赏之下 必有勇士
                </view>
                
            </scroll-view>
            <scroll-view scroll-y="true" class="bot-con" v-else>
                <view class="bot-title-box">
                    <view class="icon-box"></view>
                    <view class="title-text-box">千里马</view>
                </view>
                <view class="bot-content-box">
                    您认为要偿还的债，请律师走个程序，争取还款计划和时间</br>·先付费 后办事</br>·花小钱 办大事</br>·少烦恼，不慌乱
                </view>
                <view class="bot-title-box">
                    <view class="icon-box"></view>
                    <view class="title-text-box">活马</view>
                </view>
                <view class="bot-content-box">
                    您认为账不对，要花点心思理清</br>·前期跑腿费+见面部分提成</br>·风险共担 长效激励</br>·利益均衡 效益可期
                </view>
                <view class="bot-title-box">
                    <view class="icon-box"></view>
                    <view class="title-text-box">还魂马</view>
                </view>
                <view class="bot-content-box">
                    您认为不抱希望了，全力争取减免，少亏就是赚</br>·先用后付 不减免不收费</br>·风险律师担 大力出奇迹</br>·重赏之下 必有勇士
                </view>
                
            </scroll-view>
            <view class="bot-save">
                <view class="save-box" @click="closePop('offerPopop')">朕知道了</view>
            </view>
            </view>
        </uni-popup>
        <uni-popup ref="moneyTypeSelectPopop" type="bottom">
            <view class="popup-bottom-box">
            	<view class="bot-title">
            		<view class="title-txt">选择付款时间</view>
            		<view class="title-close" @click="closePop('moneyTypeSelectPopop')">
            			<view class="image-wrapper">
            				<image src="@/static/img/close.png" mode="aspectFit"></image>
            			</view>
            		</view>
            	</view>
            <view class="bot-select-con">
                <view v-for="(item,index) in moneyTypeData" :key='index' :class="money_type == item.id ? 'select-item-box pitch-on': 'select-item-box un-pitch'" @click="moneyTypeSelectClick(item.id )">{{item.value_name }}</view>
            </view>
            </view>
        </uni-popup>
        <uni-popup ref="removeUseridsSelectpopup" type="bottom">
            <view class="popup-bottom-box">
            	<view class="bot-title">
            		<view class="title-txt">选择排除律师</view>
            		<view class="title-close" @click="closePop('removeUseridsSelectpopup')">
            			<view class="image-wrapper">
            				<image src="@/static/img/close.png" mode="aspectFit"></image>
            			</view>
            		</view>
            	</view>
                <view class="remark-box">
                    您不想让哪些律师/哪个律所看到您的订单
                </view>
                <view class="select-box">
                       <input class="input-box" placeholder-class="input-placeholder-box" v-model="keyword" confirm-type='search' @confirm='keywordConfirm' type="text" placeholder="请输入律师或律所名称" />
                       <view class="select-all-box" @click="selectAll">
                           全选
                       </view>
                </view>
                <scroll-view scroll-y="true" class="bot-con">
                    <view class="lawyer-con" v-for="(item,index) in removeUserData" :key='index' @click="lawyerItemClick(item)">
                        <view class="lawyer-left">
                            <view class="image-wrapper"><image :src="item.lawyer_avatar" mode="widthFix"></image></view>
                        </view>
                        <view class="lawyer-right">
                            <view class="lawyer-name">
                                <view class="name-left">{{ item.realname}}</view>
                                <view class="title-year">
                                    <view class="year-img"><image src="@/static/img/lawyer-list-icon5.png" mode="aspectFit"></image></view>
                                    <view class="year-num">执业{{ item.years }}年</view>
                                </view>
                                <view class="name-right">
                                    <view class="image-wrapper" v-if="userSelectData.includes(item.id)"><image src="@/static/img/pitch-on-icon.png" mode="aspectFit"></image></view>
                                    <view class="image-wrapper" v-else><image src="@/static/img/un-pitch-on-icon.png" mode="aspectFit"></image></view>
                                </view>
                            </view>
                            <view class="lawyer-item">
                                <view class="item-left">
                                    <view class="image-wrapper"><image src="@/static/img/person.png" mode="aspectFit"></image></view>
                                </view>
                                <view class="item-txt">
                                    <text class="item-txt">{{ item.area_text }}</text>
                                </view>
                            </view>
                            <view class="lawyer-item" style="align-items: center;">
                                <view class="item-left">
                                    <view class="image-wrapper"><image src="@/static/img/locat.png" mode="aspectFit"></image></view>
                                </view>
                                <view class="item-txt">{{ item.address_text }}</view>
                            </view>
                            <view class="lawyer-item" style="align-items: center;">
                                <view class="item-left">
                                    <view class="image-wrapper"><image src="@/static/img/address.png" mode="aspectFit"></image></view>
                                </view>
                                <view class="item-txt">{{ item.lawyer }}</view>
                            </view>
                            <view class="lawyer-item" style="align-items: center;">
                                <view class="item-left">
                                    <view class="image-wrapper"><image src="@/static/img/code.png" mode="aspectFit"></image></view>
                                </view>
                                <view class="item-txt">执业证号:{{ item.code }}</view>
                            </view>
                        </view>
                    </view>
                </scroll-view>
                <view class="bot-save">
                    <view class="save-box" @click="lawyerSaveClick">确定</view>
                </view>
            </view>
        </uni-popup>
        <uni-popup ref="priceTypePopup" type="bottom">
            <view class="popup-bottom-box">
            	<view class="bot-title">
            		<view class="title-txt">选择付款时间</view>
            		<view class="title-close" @click="closePop('priceTypePopup')">
            			<view class="image-wrapper">
            				<image src="@/static/img/close.png" mode="aspectFit"></image>
            			</view>
            		</view>
            	</view>
            <view class="bot-select-con">
                <view v-for="(item,index) in moneyList" :key='index' :class="price_type_text == item.price_type_text ? 'select-item-box pitch-on': 'select-item-box un-pitch'" @click="priceSelectClick(item)" style="position: relative;">{{item.price_type_text }}
                    <image v-if="item.price_type_text == '先付后用 任性付'" class="noback" src="@/static/img/order-noback4.png" mode="aspectFit"></image>
                    <image v-if="item.price_type_text == '先用后付 无忧付'" class="noback" src="@/static/img/order-noback2.png" mode="aspectFit"></image>
                    <image v-if="item.price_type_text == '边用边付 轻松付'" class="noback" src="@/static/img/order-noback3.png" mode="aspectFit"></image>
                </view>
            </view>
            </view>
        </uni-popup>
        <uni-popup ref="playTypePopop" type="bottom">
            <view class="popup-bottom-box">
            	<view class="bot-title">
            		<view class="title-txt">选择付款方式</view>
            		<view class="title-close" @click="closePop('playTypePopop')">
            			<view class="image-wrapper">
            				<image src="@/static/img/close.png" mode="aspectFit"></image>
            			</view>
            		</view>
            	</view>
            <view class="bot-select-con">
                <view :class="pay_type == '微信' ? 'select-item-box pitch-on': 'select-item-box un-pitch'" style="justify-content:flex-start;padding-left:110rpx" @click="playTypeSelectClick('微信')"><image style="width: 40rpx;height: 40rpx;margin-right: 10rpx;" src="@/static/img/pay-icon1.png" mode="aspectFit"></image>微信</view>
                <view :class="pay_type == '支付宝' ? 'select-item-box pitch-on': 'select-item-box un-pitch'" style="justify-content:flex-start;padding-left:110rpx" @click="playTypeSelectClick('支付宝')"><image style="width: 40rpx;height: 40rpx;margin-right: 10rpx;" src="@/static/img/pay-icon2.png" mode="aspectFit"></image>支付宝</view>
                <view :class="pay_type == '余额' ? 'select-item-box pitch-on': 'select-item-box un-pitch'" style="justify-content:flex-start;padding-left:110rpx" @click="playTypeSelectClick('余额')"><image style="width: 40rpx;height: 40rpx;margin-right: 10rpx;" src="@/static/img/pay-icon3.png" mode="aspectFit"></image>余额
                    <view style="font-size: 20rpx;color:#C0C0C0;margin-left: 10rpx;">
                        {{ info.money }}
                    </view>
                </view>
                <view :class="pay_type == '朋友代付' ? 'select-item-box pitch-on': 'select-item-box un-pitch'" style="justify-content:flex-start;padding-left:110rpx" @click="playTypeSelectClick('朋友代付')"><image style="width: 40rpx;height: 40rpx;margin-right: 10rpx;" src="@/static/img/pay-icon4.png" mode="aspectFit"></image>朋友代付</view>
            </view>
            </view>
        </uni-popup>
        
        <!-- 选择地区组件 -->
        
        <u-picker mode="region" v-model="showArea" :params="params" :default-region="defaultRegion"
        	confirm-color="#FFC801" @confirm="regionConfirm" title='选择律师执业区域'>
            </u-picker>
		<!-- 其他费用或有温馨提示 -->
		<order-common-tip ref="orderCommonTipMaybe">
			<view class="warm-tip-box" style="padding: 0 30rpx;">
				<view class="warm-tip-item">
					<view class="item-left">1</view>
					<view class="item-right">
						国家费用（或有）：指财产保全费、财产保全担保费、勘验费、鉴定费、翻译费、工商/房产/汽车查档费、证人/鉴定人/翻译人员出庭的交通费、住宿费、生活费和误工补贴费等。详情请查看下面附件文档。
					</view>
				</view>
				<view class="warm-tip-item">
					<view class="item-left">2</view>
					<view class="item-right">国家费用（或有）并非一定会发生，也并非每个案件都会发生。只有在您向相关国家部门提出书面申请，且经国家部门审查同意后，才有可能产生上述费用。
					</view>
				</view>
				<view class="warm-tip-item">
					<view class="item-left">3</view>
					<view class="item-right">案件办理过程中，如发生上述费用，您可到时与投资人协商是否额外承担支付这些费用。投资人如不同意支付该等费用的，请您自行支付。</view>
				</view>
				<view class="warm-tip-item">
					<view class="item-left">4</view>
					<view class="item-right">律师在其执业区域以内为您办案，由第三方收取的快递、交通、复印、打印、通讯等费用，概由律师承担，您不需支付。</view>
				</view>
			</view>
		</order-common-tip>
		<!-- 其他费用温馨提示 -->
		<order-common-tip ref="orderCommonTip">
			<view class="warm-tip-box" style="padding: 0 30rpx;">
				<view class="warm-tip-item">
					<view class="item-left">1</view>
					<view class="item-right">其他费用是指国家费用或差旅费用。</view>
				</view>
				<view class="warm-tip-item">
					<view class="item-left">2</view>
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
							<view class="item-right">或有费用并非一定会发生，也并非每个案件都会发生。只有在您向相关国家部门提出书面申请，且经国家部门审查同意后，才有可能会产生或有费用。
							</view>
						</view>
					</view>
				</view>
				<view class="warm-tip-item">
					<view class="item-left">3</view>
					<view class="item-right">
						差旅费用：指经您同意，律师在其执业区域以外为您办案，由第三方收取的住宿费、交通费、复印/打印费等异地费用，具体金额根据发票/票据确定。如不用律师出差，不产生该费用。
					</view>
				</view>
				<view class="warm-tip-item">
					<view class="item-left">4</view>
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
				practiceYear: '', //执业年限
				practiceArea: '全国', //执业区域
				product_id: '', //七个产品id
				product_name: '', //七个产品名称
				area_id: '', //服务领域id
				requirement: '', //我的要求
				tags: [], //服务保障
				serve_content: '', //服务内容
				desc_content: '', //产品说明
				money: '', //律师费
				moneyList: [], //律师费列表
				price_type_text: '', //律师费 付款方式
				agree: '', //同意
				bearFees: '', //费用承担
				jindu: '', //目前进度
				self_ident: '', //我的身份
				dui_ident: '', //对方类型
				is_believe: 1, //对方未失信
                is_fayuan_zhixing:0,//对方正在被法院执行中
				organization: '', //审理机构
				hear_basis: '', //审理依据
				hear_addr: '', //审理机关所在区域
				offer: '千里马', //千里马
				stage: '', //服务阶段
				stage_list: [], //服务阶段列表
				qiankuan: '', //涉案金额
				order_id: '', //法务编辑订单id
				current_coupon: {}, //选中的优惠券
				offerList: [],
				tipGrade: '', //服务报价提示
				sell: '', //优惠价格
				edit_order_id: '', //编辑是的传过来的订单id
				product_price_id: '', //律师费用方式
				fali_source: '',
				topImg: 'https://d-fali.bigchun.com/assets/product/84.png', //顶部图片
                jinduSelectData:[],//进度选择项
                selfIdentSelectData:[],//我的身份选择项
                duiIdentSelectData:[],//对方类型选择项
                isBelieveSelectData:[{id:0,value_name:'是'},{id:1,value_name:'否'}],//对方失信选择项
                organizationSelectData:[],//审理机构选择项
                stageSelectData:[{title:'民事诉讼流程图',image:'',type:'img'},{title:'民事审限表',image:'',type:'doc'},{title:'商事仲裁流程图',image:'',type:'img'},{title:'劳动仲裁流程图',image:'',type:'img'}],
                hearAddrUrl:'',//审理地点
                productNameData:[],//执业年限
                selectArea: '', //已选择区域
                defaultRegion: [],
                showArea: false,
                params: {
                	province: true,
                	city: true,
                	area: false
                },
                lang_ids:[],//律师语言，多选
                langIdData:[],//律师语言数据
                popupSelectList:[],//弹窗中选中的语言
                moneyTypeData:[],//付款时间
                serve_offer:'投资人确定',//服务报价
                offerData:[],//报价方式数据
                priceTypeData:[],//费用承担
                money_type:'',
                removeUserData:[],//排除律师数据
                remove_userids:[],//排除律师
                userSelectData:[],//选中的律师
                keyword:'',
                later_money:'',
                pay_type:'微信',
                product_image:'',
                buyTipData:'',
                hetong_doc:'',
                doc_touziren:'',
                doc_zifei:'',
                card_images:'',//欠款方身份证正反面/姓名 身份证号
                liaotian_images:'',//确认欠款金额的聊天截图内容
                jietiao_images:'',//借条/欠条/还款承诺书/对账单等文书
                cuishou_images:'',//催收的聊天内容(微信/支付宝/录音/录像)
                huan_images:'',//还款记录(包括每次还款金额和还款时间) 
                other_images:'',//您认为有用的其他有用材料
                price:'0',//价格
                sale:'0',//销量
                labelData:[],
                productTitleName:'',
                total:0,
                popupTakeTwo:false,
                defaultTake:[],
                windowTop:44,
                tabList:[{name:'服务选项',id:1},{name:'服务内容',id:2},{name:'产品说明',id:3},{name:'问大家',id:4}],
                tabItemValue:1,
                showTab:false,
                isShare:this.$route.query.type ? false : true,//是否是分享页面
                itemTopHeight:0,//上方图片高度
                itemMainHeight:0,//基本信息模块高度
                odBoxHeight:0,//服务选项模块高度
                feiYongHeight:576,//律师费用模块高度
                fuWuHeight:792,//服务内容模块高度
                chanPinHeight:1983,//产品说明模块高度
                wendajiaHeight:0,//问大家模块高度
                windowHeight:0,
                langStr:''
            };
		},
		created() {
			// 安卓
			window.payOk = this.payOk;
            uni.getSystemInfo({
                success: function (res) {
                    this.windowTop = res.windowTop || 44
                }
            });
            
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
				this.product_image = params.product_image;
				this.init();
			}
            
		},
        onReady(){
            let self = this
            uni.createSelectorQuery().select("#itemTop").boundingClientRect(function(data) { //data - 各种参数
            console.log(data)
    　　　  　self.itemTopHeight = data.height
    　　    }).exec()
            uni.createSelectorQuery().select("#itemMain").boundingClientRect(function(data) { //data - 各种参数
    　　　  　self.itemMainHeight = data.height
    　　    }).exec()
            uni.createSelectorQuery().select("#odBoxId").boundingClientRect(function(data) { //data - 各种参数
    　　　  　self.odBoxHeight = data.height
    　　    }).exec()
            uni.createSelectorQuery().select("#wendajia").boundingClientRect(function(data) { //data - 各种参数
    　　　  　self.wendajiaHeight = data.height
    　　    }).exec()
    uni.getSystemInfo({
        success: function (res) {
            self.windowHeight = res.windowHeight
        }
    });
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
				if (this.bearFees == '投资人支付') {
					this.jindu = '未起诉';
					this.self_ident = '起诉方';
					this.dui_ident = '个人/个体户';
					this.organization = '人民法院';
					this.stage = '本诉 (套餐)一审+二审+执行';
					this.hear_basis = '合同约定的管辖地点';
					this.hear_addr = this.info.list.hear_addr[0];
					this.qiankuan = '本金1万元以上—5万元以下(含)(人民币)';
					this.money = '投资人支付';
                    this.is_believe = 1;
                    this.is_fayuan_zhixing = 1
                    this.practiceYear = this.productNameData[0].value_name
                    this.practiceArea = '广东省,广州市'
                    this.serve_offer = '投资人确定'
                    this.tabList = [{name:'服务选项',id:1},{name:'服务内容',id:2},{name:'产品说明',id:3},{name:'问大家',id:4}],
                    this.langStr = ''
				} else if (this.bearFees == '自费') {
					this.qiankuan = '都可以'
                    this.serve_offer = '平台统一价'
                    this.practiceYear = this.productNameData[0].value_name
                    this.defaultTake = ['广东省','广州市']
					this.hear_addr = '广东省,广州市';
                    this.tabList = [{name:'服务选项',id:1},{name:'打官司费用',id:2},{name:'服务内容',id:3},{name:'产品说明',id:4},{name:'问大家',id:5}],
                    this.langStr = ''
                    if (oldVal) {
						this.getMoney();
					}
				}
                this.tabItemValue = 1
                
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
			// 您的角色
			self_ident(val, oldVal) {
				this.getStage();
				this.getTip();
				this.getOffer();
				if (oldVal) {
					this.getMoney();
				}
			}
		},
		onPageScroll() {
			var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            let height = this.itemTopHeight + this.itemMainHeight - 44
            if(scrollTop < height){
                this.showTab = false
            }else{
                // chanPinHeight  wendajiaHeight
                this.showTab = true
                if (this.bearFees == '投资人支付'){
                    let height1 = this.itemTopHeight + this.itemMainHeight - 44
                    let height2 = this.itemTopHeight + this.itemMainHeight + this.odBoxHeight + 88
                    let height3 = this.itemTopHeight + this.itemMainHeight + this.odBoxHeight + this.fuWuHeight + 88
                    let height4 = this.itemTopHeight + this.itemMainHeight + this.odBoxHeight + this.fuWuHeight + this.chanPinHeight  - this.windowHeight + 260
                   if(scrollTop >= height1 && scrollTop < height2){
                       this.tabItemValue = 1
                   } else if(scrollTop >= height2 && scrollTop < height3){
                       this.tabItemValue = 2
                   } else if(scrollTop >= height3 && scrollTop < height4){
                       this.tabItemValue = 3
                   } else{
                       this.tabItemValue = 4
                   }
                }else{
                    let height1 = this.itemTopHeight + this.itemMainHeight - 44
                    let height2 = this.itemTopHeight + this.itemMainHeight + this.odBoxHeight + 220
                    let height3 = this.itemTopHeight + this.itemMainHeight + this.odBoxHeight + this.feiYongHeight + 230
                    let height4 = this.itemTopHeight + this.itemMainHeight + this.odBoxHeight + this.feiYongHeight + this.fuWuHeight + 240
                    let height5 = this.itemTopHeight + this.itemMainHeight + this.odBoxHeight + this.feiYongHeight + this.fuWuHeight + this.chanPinHeight  - this.windowHeight + 250
                    if(scrollTop >= height1 && scrollTop < height2){
                        this.tabItemValue = 1
                    }else if(scrollTop >= height2 && scrollTop < height3){
                        this.tabItemValue = 2
                    }else if(scrollTop >= height3 && scrollTop < height4){
                        this.tabItemValue = 3
                    }else if(scrollTop >= height4 && scrollTop < height5){
                        this.tabItemValue = 4
                    }else {
                        this.tabItemValue = 5
                    }
                }
            }
		},
		methods: {
            scrollToOne(id){　　  　
                    let height1 = this.itemTopHeight + this.itemMainHeight - 44
                    let height2 = this.itemTopHeight + this.itemMainHeight + this.odBoxHeight + 89
                    let height3 = this.itemTopHeight + this.itemMainHeight + this.odBoxHeight + this.fuWuHeight + 89
                    let height4 = this.itemTopHeight + this.itemMainHeight + this.odBoxHeight + this.fuWuHeight + this.chanPinHeight  - this.windowHeight + 301
                this.tabItemValue = id
                if(id == 1){
                    uni.pageScrollTo({
                        scrollTop: height1
                    })
                }else if(id == 2){
                    uni.pageScrollTo({
                        scrollTop: height2
                    })
                }else if(id == 3){
                    uni.pageScrollTo({
                        scrollTop: height3
                    })
                }else{
                    uni.pageScrollTo({
                        scrollTop: height4
                    })
                }
            },
            scrollToTwo(id){
                let height1 = this.itemTopHeight + this.itemMainHeight - 44
                let height2 = this.itemTopHeight + this.itemMainHeight + this.odBoxHeight + 221
                let height3 = this.itemTopHeight + this.itemMainHeight + this.odBoxHeight + this.feiYongHeight + 231
                let height4 = this.itemTopHeight + this.itemMainHeight + this.odBoxHeight + this.feiYongHeight + this.fuWuHeight + 241
                let height5 = this.itemTopHeight + this.itemMainHeight + this.odBoxHeight + this.feiYongHeight + this.fuWuHeight + this.chanPinHeight + this.wendajiaHeight + this.wendajiaHeight - this.windowHeight + 301
                this.tabItemValue = id
                if(id == 1){
                    uni.pageScrollTo({
                        scrollTop: height1
                    })
                }else if(id == 2){
                    uni.pageScrollTo({
                        scrollTop: height2
                    })
                }else if(id == 3){
                    uni.pageScrollTo({
                        scrollTop: height3
                    })
                }else if(id == 4){
                    uni.pageScrollTo({
                        scrollTop: height4
                    })
                }else{
                    uni.pageScrollTo({
                        scrollTop: height5
                    })
                }
            },
			async init() {
				let formData;
				// 编辑
				if (this.edit_order_id) {
					formData = {
						id: this.product_id,
						area_id: this.area_id,
						type: 2
					};
				}
				// 新下单
				else {
					formData = {
						id: this.product_id,
						area_id: this.area_id
					};
				}
				if (uni.getStorageSync('token')) {
					formData = {
						...formData,
						token: uni.getStorageSync('token')
					};
				}

				let res = await this.$api('index.new_order', formData);

				this.info = res.data;
				this.money = res.data.product.price;
				this.serviceType = res.data.product.product_type;
				this.practiceChoose = res.data.product.choose;
				// this.practiceArea = res.data.product.profession_name;
                this.practiceArea = '广东省,深圳市'
                this.defaultRegion = ['广东省', '深圳市']
				this.bearFees = res.data.product.money_type;
                this.jinduSelectData = res.data.list.jindu || []
				this.jindu = res.data.list.jindu[0].value_name;
                this.selfIdentSelectData = res.data.list.self_ident || []
				this.self_ident = res.data.list.self_ident[0].value_name;
                this.duiIdentSelectData = res.data.list.dui_ident || []
				this.dui_ident = res.data.list.dui_ident[0].value_name;
                this.organizationSelectData = res.data.list.organization || []
				this.organization = res.data.product.organization;
				this.stage = res.data.list.stage[0];
				this.hear_basis = res.data.list.hear_basis[0];
				this.hear_addr = res.data.list.hear_addr[0];
				this.requirement = res.data.product.requirement || '';
				this.offer = res.data.product.offer;
				this.offerList = res.data.list.offer;
				this.moneyList = res.data.list.price_type;
				this.price_type_text = res.data.product.price_type_text;
				this.product_price_id = res.data.product.id;
                this.stageSelectData[0].image = res.data.product.doc_jieduan1
                this.stageSelectData[1].image = res.data.product.doc_jieduan2
                this.stageSelectData[2].image = res.data.product.doc_jieduan4
                this.stageSelectData[3].image = res.data.product.doc_jieduan5
                this.hearAddrUrl = res.data.product.doc_shenli
                this.productNameData = res.data.list.product_name
                this.practiceYear = this.productNameData[0].value_name
                this.moneyTypeData = res.data.list.money_type || []
                this.offerData = res.data.list.offer || []
								this.buyTipData = res.data.buy_tips || []
								this.hetong_doc = res.data.product.hetong_doc
								this.doc_touziren = res.data.product.doc_touziren
								this.doc_zifei = res.data.product.doc_zifei
								this.card_images = res.data.product.card_images || ''//欠款方身份证正反面/姓名 身份证号
								this.liaotian_images = res.data.product.liaotian_images || ''//确认欠款金额的聊天截图内容
								this.jietiao_images = res.data.product.jietiao_images || ''//借条/欠条/还款承诺书/对账单等文书
								this.cuishou_images = res.data.product.cuishou_images || ''//催收的聊天内容(微信/支付宝/录音/录像)
								this.huan_images = res.data.product.huan_images || ''//还款记录(包括每次还款金额和还款时间) 
								this.other_images = res.data.product.other_images || ''//您认为有用的其他有用材料
								this.price = res.data.product.price || '0' //价格
								this.sale = res.data.product.sale || '0' //销量
								this.labelData = res.data.product.label
								this.productTitleName = res.data.product.product_name
								this.tags = res.data.product.tags || []
			},
			async getMoney() {
				let formData = {
					token: uni.getStorageSync('token'),
					product_type_id: this.serviceType,
					product_id: this.product_name,
					product_name_id: this.practiceYear,
					coupon_id: this.current_coupon ? this.current_coupon.id : '',
					self_ident: this.self_ident, //您的角色
					stage: this.stage, //服务阶段
					offer: this.offer //服务报价
				};
				let res = await this.$api('index.product_price_name', formData);
				this.moneyList = res.data;
                this.later_money = res.data.length > 0 ? res.data[0].later_money : '';
				this.money = res.data.length > 0 ? res.data[0].price : '';
				this.price_type_text = res.data.length > 0 ? res.data[0].price_type_text : '';
				this.sell = res.data.length > 0 ? res.data[0].sell : '';
                this.total = res.data.length > 0 ? res.data[0].total : 0;
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
				if (this.bearFees == '投资人支付') {
					// this.$refs.investContact.$refs.popupBond.open();
					if (this.agree == '1') {
						this.addOrder(this.price_type_text);
					} else {
						uni.showToast({
							title: '请勾选我已阅读并同意按上述条款履行',
							icon: 'none'
						});
					}
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
					pay_type: this.pay_type, //无
					requirement: this.$refs.myrequire.requirement_copy,
					price_type: this.bearFees, // 费用承担
					price_detail: '', //费用明细
					qiankuan: this.qiankuan, //欠款金额
					jindu: this.jindu, //目前进度
					self_ident: this.self_ident, //我的身份
					dui_ident: this.dui_ident, //对方类型
					is_believe: this.is_believe, //对方是否失信 0是 1否
					is_fayuan_zhixing: this.is_fayuan_zhixing, //对方正在被法院执行中 0是 1否
					organization: this.organization, //审理机构
					stage: this.stage, //服务阶段
					offer: this.offer, //服务报价
					server_address:this.hear_addr, //审理地点,
					profession:this.practiceArea,
					product_price_id: this.product_price_id,
					fali_source: this.fali_source,
					lang_ids:this.lang_ids,
					card_images : this.card_images,//欠款方身份证正反面/姓名 身份证号
					liaotian_images : this.liaotian_images,//确认欠款金额的聊天截图内容
					jietiao_images : this.jietiao_images,//借条/欠条/还款承诺书/对账单等文书
					cuishou_images : this.cuishou_images,//催收的聊天内容(微信/支付宝/录音/录像)
					huan_images : this.huan_images,//还款记录(包括每次还款金额和还款时间) 
					other_images : this.other_images,//您认为有用的其他有用材料
				};

				if (this.edit_order_id) {
					formData = {
						...formData,
						id: this.edit_order_id
					};
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
								payMethod: this.pay_type,
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
						if (money_type == '先用后付 无忧付' || this.bearFees == '投资人支付' || this.offer == '还魂马') {
							this.replace('/pages/client/user/match-specialist', {
								order_id: this.order_id
							});
						} else {
							let formDataPay = {
								order_id: this.order_id,
								payMethod: this.pay_type,
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
			},
            // 进度选择
            jinduSelectClick(item){
                this.jindu = item
                this.closePop('jinduPopop')
            },
            // 我的身份选择
            selfIdentSelectClick(item){
                this.self_ident = item
                this.closePop('selfIdentPopop')
            },
            // 对方类型选择
            duiIdentSelectClick(item){
                this.dui_ident = item
                this.closePop('duiIdentPopop')
            },
            // 对方失信选择
            isBelieveSelectClick(id){
                this.is_believe = id
                this.closePop('believePopop')
            },
            // 对方正在被法院执行中
            isZhiXingSelectClick(id){
                this.is_fayuan_zhixing = id
                this.closePop('isZhiXingPopop')
            },
            organizationSelectClick(item){
                this.organization = item
                this.closePop('organizationSelectPopop')
            },
            async download(item) {
            	const nav = navigator.userAgent;
            	if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
            		phone.loadOffice(item.image);
            	} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            		this.$bridge.callhandler('loadOffice', item.image, data => {});
            	}
            },
            // 服务阶段选择
            stageItemClick(item){
                if(item.type == 'img'){
                    this.imageClick(item)
                }else{
                   this.download(item) 
                }
            },
            imageClick(item){
                let previewImages = [];
                previewImages.push(item.image);
                // this.previewImages(previewImages);
                // 预览图片
                const nav = navigator.userAgent;
                if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
                	phone.previewPicture(JSON.stringify(previewImages));
                } else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
                	this.$bridge.callhandler('previewPicture', previewImages, data => {});
                }
                //  uni.previewImage({
                //     urls: item.image,
                //     longPressActions: {
                //         itemList: ['发送给朋友', '保存图片', '收藏'],
                //         success: function(data) {
                //             console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
                //         },
                //         fail: function(err) {
                //             console.log(err.errMsg);
                //         }
                //     }
                // });
            },
            // 执业年限选择
            productNameSelectClick(item){
                this.practiceYear = item
                this.closePop('productNameSelectPopop')
            },
            practiceAreaClick(){
                this.defaultRegion = this.practiceArea.split(',')
                this.showArea = true
            },
            regionConfirm(res){
                console.log(res,'-----------')
                // if (res.city.label == '市辖区') {
                // 	this.practiceArea = res.province.label;
                // } else {
                // 	this.practiceArea = res.province.label + ',' + res.city.label || '';
                // } 
                this.practiceArea = res.province.label + ',' + res.city.label;
                this.showArea = false
            },
            // 律师语言选择
            langClick(){
                this.$refs.langPopup.open()
                this.getLawyerLang()
                this.popupSelectList = this.lang_ids.concat()
            },
            // 获取律师语言列表
            async getLawyerLang() {
            	let formData = {
            		page: 1,
            		limit: 9999,
            		token: uni.getStorageSync('token')
            	};
            	let res = await this.$api('index.lawyerLang', formData);
            	if (res.code == 1) {
            		this.langIdData = res.data.data || []
            	}else{
                    this.langIdData = []
                }
            },
            // 选择语言
            langSelectClick(info){
                if(this.popupSelectList.includes(info.id)){
                    console.log('取消选择')
                     this.popupSelectList.splice(this.popupSelectList.findIndex(item => item === info.id), 1)
                }else{
                    console.log('选择')
                    this.popupSelectList.push(info.id)   
                }
            },
            // 语言选中按钮
            langSaveClick(){
                this.lang_ids = this.popupSelectList || []
                if(this.lang_ids.length > 0){
                    let self = this
                    let list = this.lang_ids.map((item,index)=>{
                        return self.getDataName(self.langIdData,item)
                    })
                    this.langStr = list.join(" ")
                    if(this.langStr.length > 18){
                        this.langStr = this.langStr.slice(0,18) + '...'
                    }
                }else{
                    this.langStr = ''
                }
                this.closePop('langPopup')
            },
            // 数据匹配（获取名称）
            getDataName(data,id){
                let value = data.find((item,index)=>{
                    return item.id == id
                })
                if(!value){
                    return ''
                }else{
                    return value.recname || value.value_name || ''
                }
            },
            priceTypeSelectClick(item){
                this.bearFees = item
                this.closePop('priceTypeSelectPopop')
            },
            offerSelectClick(item){
                this.offer = item
                this.closePop('offerSelectPopop')
            },
            // 点击选择排除律师按钮
            lawyerSelectClick(){
                this.$refs.removeUseridsSelectpopup.open()
                this.userSelectData = this.remove_userids.concat()
                this.getlawyerPage()
            },
            // 获取排除律师数组
            async getlawyerPage(keyword) {
            	let formData = {
            		page: 1,
            		limit: 9999,
                    keyword:keyword,
            		token: uni.getStorageSync('token')
            	};
            	let res = await this.$api('index.lawyerPage', formData);
            	if (res.code == 1) {
            		this.removeUserData = res.data.data || []
            	}else{
                    this.removeUserData = []
                }
            },
            // 选择排除律师
            lawyerItemClick(info){
                if(this.userSelectData.includes(info.id)){
                    console.log('取消选择')
                     this.userSelectData.splice(this.userSelectData.findIndex(item => item === info.id), 1)
                }else{
                    console.log('选择')
                    this.userSelectData.push(info.id)   
                }
            },
            // 排除律师选中按钮
            lawyerSaveClick(){
                this.remove_userids = this.userSelectData || []
                this.closePop('removeUseridsSelectpopup')
            },
            keywordConfirm(val){
                this.getlawyerPage(val.detail.value || '')
            },
            // 全选
            selectAll(){
                if(this.userSelectData.length == this.removeUserData.length){
                    this.userSelectData = []
                }else{
                    this.userSelectData = this.removeUserData.map((item,index)=>{
                        return item.id
                    })                    
                }
            },
            // 付款时间点击选项
            priceSelectClick(info){
                this.product_price_id = info.id;
                this.price_type_text = info.price_type_text;
                this.money = info.price;//前期费用
                this.later_money = info.later_money || ''//后期费用
                this.total = info.total || 0//后期费用
                this.closePop('priceTypePopup')
            },
            playTypeSelectClick(info){
                this.pay_type = info
                this.closePop('playTypePopop')
            },
            stageSelectClick(item){
                this.stage = item
                this.closePop('popupServiceStage')
            },
            hearAddrSelectClick(item){
                this.hear_addr = item
                this.closePop('popupTake')
            },
            gotoJiSuanQi(id){
                const nav = navigator.userAgent;
                if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
                	let res = phone.gotoJiSuanQi(0);
                } else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
                	this.$bridge.callhandler('gotoJiSuanQi', 0, res => {});
                }
            },
            popupTakeTwoClick(){
                this.defaultTak = this.hear_addr.split(',')
                this.popupTakeTwo = true
            },
            TakeConfirm(res){
                // if (res.city.label == '市辖区') {
                // 	this.hear_addr = res.province.label;
                // } else {
                // 	this.hear_addr = res.province.label + ',' + res.city.label;
                // }
                this.hear_addr = res.province.label + ',' + res.city.label;
                this.popupTakeTwo = false
            },
            downloadApp(){
                let ua = window.navigator.userAgent.toLowerCase()
                if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                    alert('请点击右上角按钮在其他浏览器打开')
                }else{
                    window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.lifakeji.lark.business.law'
                }
            }
            
		}
	};
</script>

<style lang="scss">
	.content {
		padding-bottom: 122rpx;
	}

	.item-top {
		width: 100%;
		height: 600rpx;
		background-size: 100% 100%;
		background-repeat: no-repeat;

		.item-admin {
			position: absolute;
			height: 20rpx;
			top: 0;
			left: 0rpx;
			height: 60rpx;
			color: #FFFFFF;
			line-height: 60rpx;
			// padding: 0 10rpx;
			font-size: 22rpx;
			font-weight: bold;
			border-radius: 10rpx;
			background-color: rgba(0, 0, 0, 0.3);
            
		}

		.item-img {
			display: flex;

			.item-left {
				flex: 1;

				image {
					margin: 42rpx 0 0 20rpx;
					width: 50rpx;
					height: 50rpx;
				}
			}

			.item-right {
				image {
					margin: 42rpx 20rpx 0 0;
					width: 50rpx;
					height: 50rpx;
				}
			}
		}

	}

	.item-main {
		width: 100%;
		height: 312rpx;
		background-color: #FFFFFF;
		padding: 20rpx;
		margin-bottom: 20rpx;

		.main-top {
			display: flex;
			align-items: center;

			.top-left {
				flex: 1;
				font-size: 48rpx;
				color: #DC3220;
			}

			.top-right {
				font-size: 26rpx;
				color: #666666;
			}
		}

		.item-title {
			font-size: 32rpx;
			line-height: 45rpx;
			margin: 20rpx 0 16rpx 0;
			font-weight: bold;
		}

		.item-way {
			.item-txt {
				width: 100rpx;
				height: 34rpx;
				line-height: 34rpx;
				margin-right: 5rpx;
				padding: 4rpx 10rpx;
				font-size: 20rpx;
				color: #0DAB37;
				border-radius: 6rpx;
				border: 1rpx rgba(13, 171, 55, 0.2) solid;
			}
		}

		.item-bottom {
			background-color: #EEF2F3;
			width: 100%;
			height: 66rpx;
			line-height: 66rpx;
			display: flex;
            justify-content: space-between;
			margin-top: 16rpx;
			align-items: center;
			padding: 0rpx 20rpx;
			border-radius: 10rpx;
            .bottom-info{
                display: flex;
                height: 100%;
                align-items: center;
                .bottom-sure {
                	width: 30rpx;
                	height: 30rpx;
                }
                
                .bottom-left {
                	font-size: 28rpx;
                	font-weight: bold;
                	margin-left: 10rpx;
                	color: #0DAB37;
                }
                
                .bottom-order {
                	width: 2rpx;
                	height: 30rpx;
                	margin: 0 10rpx;
                	background-color: #D2D2D2;
                }
                
                .bottom-txt {
                	font-size: 24rpx;
                	overflow: hidden;
                	text-overflow: ellipsis;
                	white-space: nowrap;
                }
            }
			

			.bottom-img {
				width: 14rpx;
				height: 24rpx;
			}
		}
	}

	.od-boxs {
		border-radius: 0 !important;
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

	.service-list .service-item {
		font-size: 26rpx;
		border-radius: 0;
	}

	.service-list .service-item.active {
		color: #F9B804;
		font-size: 26rpx;
		background-color: #FFFFFF;
		border-radius: 0;
		margin-left: 10rpx;
	}
    .center-box{
        display: flex;
        align-items: center;
        .required-box{
            display: flex;
            align-items: center;
            color: red;
        }
    }
    .cjg {
    	padding: 0 40rpx;
    	position: absolute;
    	right: 0rpx;
    	height: 62rpx;
    	line-height: 62rpx;
    }
    
    .od-box .od-item .item-tip {
    	font-size: 26rpx;
    	width: 200rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .service-list {
    	display: flex;
    	align-items: center;
    }
    .service-list .service-item.active {
    	color: #F9B804;
    	font-size: 26rpx;
    	background-color: #FFFFFF;
    	border-radius: 0;
    	margin-left: 10rpx;
    }
    .popup-bottom-box {
    	background-color: #ffffff;
    	overflow: auto;
    	// border-top-left-radius: 26rpx;
    	// border-top-right-radius: 26rpx;
    
    	.bot-title {
    		display: flex;
    		align-items: center;
    
    		.title-txt {
    			flex: 1;
    			text-align: center;
    			padding: 20rpx;
    			font-weight: bold;
    		}
    
    		.title-close {
    			width: 80rpx;
    			height: 80rpx;
    			text-align: center;
    			position: absolute;
    			top: 0;
    			right: 0;
    			display: flex;
    			align-items: center;
    			justify-content: center;
    
    			.image-wrapper {
    				width: 26rpx;
    				height: 26rpx;
    				vertical-align: middle;
    
    				image {
    					width: 100%;
    					height: 100%;
    				}
    			}
    		}
    	}
        .remark-box{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 60rpx;
            color: #777777;
            font-size: 24rpx;
        }
        .select-box{
            padding: 0rpx 40rpx;
            height: 100rpx;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .input-box{
                width: 530rpx;
                height: 60rpx;
                border: 1rpx solid #DCDCDC;
                border-radius: 6rpx;
                background: rgba(245, 245, 245, 0.59);
            }
            .input-placeholder-box{
                margin-left: 40rpx;
            }
            .select-all-box{
                width: 120rpx;
                height: 50rpx;
                border: 1rpx solid #F9B804;
                color: #F9B804;
                display: flex;
                justify-content: center;
                align-items: center;
                
            }
        }
    .assistant-title-box{
        margin-left: 140rpx;
        height: 30rpx;
        color: #777777;
        font-size: 24rpx;
    }
    	.bot-con {
    		padding: 0 30rpx;
            height: 800rpx;
            // overflow-y: scroll;
            width: calc(100% - 60rpx);
    		.service-list {
    			margin-bottom: 20rpx;
    		}
            .bot-title-box{
                display: flex;
                align-items: center;
                .icon-box{
                    width: 12rpx;
                    height: 30rpx;
                    background: #FFC900;
                    opacity: 1;
                    border-radius: 6rpx;
                }
                .title-text-box{
                    margin-left: 5rpx;
                    height: 45rpx;
                    font-size: 32rpx;
                    font-family: PingFang SC;
                    font-weight: bold;
                    color: #000000;
                    opacity: 1;
                }
                .bot-content-box{
                    margin: 10rpx 0rpx 10rpx 17rpx;
                    font-size: 26rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: rgba(0,0,0,0.6);
                    opacity: 1;
                    span{
                        color: #000;
                        font-weight: 600;
                    }
                }
            }
            .bot-title-two-box{
                display: flex;
                .icon-box{
                    margin-top: 5rpx;
                    width: 12rpx;
                    height: 30rpx;
                    background: #FFC900;
                    opacity: 1;
                    border-radius: 6rpx;
                }
                .bot-content-box{
                    margin: 0rpx 0rpx 0rpx 17rpx;
                    font-size: 26rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    line-height: 40rpx;
                    color: rgba(0,0,0,0.6);
                    opacity: 1;
                    span{
                        color: #000;
                        font-weight: 600;
                    }
                }
            }
            .bot-content-box{
                margin: 10rpx 0rpx 10rpx 17rpx;
                font-size: 26rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: rgba(0,0,0,0.6);
                opacity: 1;
                span{
                    color: #000;
                    font-weight: 600;
                }
            }
            .bot-content-img-box{
                 margin: 10rpx 0rpx 10rpx 17rpx;
                 display: flex;
                 image{
                     width: 300rpx;
                     height: 420rpx;
                 }
            }
            .line-box{
                width: 100%;
                height: 1rpx;
                border: 1px solid #D5D5D5;
                background-color: #D5D5D5;
                margin: 15rpx 0rpx;
            }
            .stage-item-box{
                width: 100%;
                height: 60rpx;
                margin: 20rpx 0rpx;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .left-box{
                    display: flex;
                    align-items: center;
                    .icon-box{
                        width: 12rpx;
                        height: 30rpx;
                        background: #FFC900;
                        opacity: 1;
                        border-radius: 6rpx;
                    }
                    .title-box{
                        margin-left: 5rpx;
                        font-size: 32rpx;
                        font-family: PingFang SC;
                        font-weight: bold;
                        color: #000000;
                    }
                }
                .right-box{
                    width: 16rpx;
                    height: 40rpx;
                    margin-left: 20rpx;
                    image {
                    	width: 100%;
                    	height: 100%;
                    	vertical-align: middle;
                    }
                }
            }
            .lang-item-box{
                margin: 10rpx 0rpx 10rpx 40rpx;
                width: calc(100% - 20rpx);
                height: 80rpx;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .icon-box{
                    width: 40rpx;
                    height: 40rpx;
                    image {
                    	width: 100%;
                    	height: 100%;
                    }
                }
                .content-box{
                    width: calc(100% - 100rpx);
                    height: 80rpx;
                    line-height: 80rpx;
                    border-bottom: 2rpx solid rgba(136,136,136,0.6);
                }
            }
            .lawyer-con {
                margin-bottom: 20rpx;
            	display: flex;
                border-radius: 30rpx;
                border: 1rpx solid #DCDCDC;
                padding: 10rpx 20rpx;
                box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.16);
            }
            .lawyer-left {
            	font-weight: bold;
            	width: 100rpx;
            	margin-right: 30rpx;
            	.image-wrapper {
            		width: 100rpx;
            		height: 100rpx;
            		border-radius: 20rpx;
            		overflow: hidden;
            		image {
            			width: 100%;
            			height: 100%;
            		}
            	}
            }
            .lawyer-right {
            	flex: 1;
            	.lawyer-name {
            		display: flex;
            		margin-bottom: 20rpx;
            		justify-content: space-between;
            		.name-left {
            			font-size: 16px;
            			font-weight: bold;
            			margin-right: 10px;
            		}
            		.name-right {
            			padding-left: 10rpx;
            			.image-wrapper {
            				width: 30rpx;
            				height: 30rpx;
            				image {
            					vertical-align: middle;
            					width: 100%;
            					height: 100%;
            				}
            			}
            		}
            		.name-center {
            			flex: 1;
            		}
            	}
            	.lawyer-tip {
            		margin-bottom: 20rpx;
            		color: #666666;
            		font-size: 26rpx;
            	}
            	.lawyer-item {
            		margin-bottom: 10rpx;
            		display: flex;
                    
            		.item-left {
            			margin-right: 10rpx;
            			.image-wrapper {
            				width: 30rpx;
            				height: 30rpx;
            				image {
            					width: 100%;
            					height: 100%;
            				}
            			}
            		}
            		.item-txt {
            			color: #aaa;
            			font-size: 26rpx;
            			flex: 1;
            		}
            	}
            }
    	}
        .bot-save{
            width: 100%;
            height: 102rpx;
            background: rgba(255, 255, 255, 0.39);
            box-shadow: 0px -3px 6px rgba(0, 0, 0, 0.16);
            opacity: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            .save-box{
               width: 60%;
                height: 60rpx;
                // border-radius: 30rpx;
                background-color: #F9B804;
                color: #fff;
                font-size: 26rpx;
                font-family: PingFang SC;
                font-weight: bold;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
        .bot-select-con{
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 20rpx 0rpx;
            .select-item-box{
                width: 50%;
                height: 60rpx;
                margin: 10rpx 0rpx;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            // 选中
            .pitch-on{
               border:1px solid #F9B804;
               color: #F9B804;
            }
            // 未选中
            .un-pitch{
               border:1px solid #DDDDDD;
               color: #222222;
            }
        }
        .stage-scroll-box{
            max-height: 600rpx;
            padding-left: 25%;
            margin: 20rpx 0rpx;
            .select-item-box{
                width: 50%;
                height: 60rpx;
                margin: 10rpx 0rpx;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            // 选中
            .pitch-on{
               border:1px solid #F9B804;
               color: #F9B804;
            }
            // 未选中
            .un-pitch{
               border:1px solid #DDDDDD;
               color: #222222;
            }
        }
    }
		.save-box-two{
			background-color: #ffffff;
			padding: 20rpx 30rpx;
			position: fixed;
			bottom: 0;
			width: 100%;
			box-sizing: border-box;
			border-top: 1rpx solid #f6f6f6;
			z-index: 10;
			.chekc-group-box{
				display: flex;
				height: 60rpx;
				align-items: center;
                color: #AAAAAA;
				.check-info{
					color: rgba(6,180,253,0.6);
				}
			}
            .chekc-group-box /deep/ .uni-checkbox-input{
                border-radius: 22rpx;
            }
			
			.save-go-box {
				display: flex;
	justify-content: space-between;
				width: 100%;
				z-index: 10;
			
				.go-left {
					display: flex;
					align-items: center;
					color: #f00;
					flex-wrap: wrap;
					.left-prize {
						width: 100%;
					}
					.left-tip {
						font-size: 24rpx;
						color: #aaaaaa;
					}
				}
			
				.go-right {
					.go-btn {
						width: 300rpx;
						background-color: $uni-color-primary;
						border-radius: 20rpx;
						color: #ffffff;
						font-size: 36rpx;
						height: 80rpx;
						line-height: 80rpx;
						box-sizing: border-box;
			
						&::after {
							border: none;
						}
					}
				}
			}
		}
        .tabs-box{
            position: fixed;
            left: 0px;
            width: 100%;
            height: 80rpx;
            background-color: rgba(255,255,255,1);
            display: flex;
            justify-content: space-around;
            align-items: center;
            z-index: 10;
            box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
            .tab-item-box{
                width: 20%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                .name-box-one{
                    // 选中
                    margin-top: 16rpx;
                    height: 44rpx;
                    line-height: 44rpx;
                    color: #222222;
                    font-size: 30rpx;
                    font-family: PingFang SC;
                    font-weight: bold;
                }
                .name-box-two{
                    // 选中
                    margin-top: 16rpx;
                    height: 44rpx;
                    line-height: 44rpx;
                    color: #aaa;
                    font-size: 30rpx;
                    font-family: PingFang SC;
                    font-weight: bold;
                }
                .icon-box-one{
                    margin-top: 6rpx;
                    width: 50rpx;
                    height: 8rpx;
                    border-radius: 8rpx;
                    background-color: rgb(253,200,6);
                }
                .icon-box-two{
                    margin-top: 6rpx;
                    width: 50px;
                    height: 8rpx;
                    border-radius: 8rpx;
                    background-color: rgb(255,255,255);
                }
            }
        }
        
</style>
