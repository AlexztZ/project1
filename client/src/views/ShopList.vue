<template>
  <div class="shoplist">
	  <eleNav><h1>店铺列表</h1></eleNav>
      <section class="index-container"
	  v-for="item in shopList" 
	  @click="$router.push('/detail/'+item._id+'.html')" 
	  :key="item._id"
	  >
          <div class="index-shopInfo">
              <!-- 左侧图片 -->
              <div class="logo_container">
                  <img :src="'/ele/'+item.shopPic">
              </div>
              <!-- 右侧内容 -->
              <div class="index_main">
                  <!-- 第一行 品牌 -->
                  <div class="index_shopname">
                      <i>品牌</i>
                      <span>{{item.shopName}}</span>
                  </div>
  
                  <!-- 第二行 星级 -->
                  <div class="index-rateWrap">
                      <div>
                          <span>月售12单</span>
                      </div>
                      <div class="delivery">
                          <span class="icon-hollow">蜂鸟专送</span>
                      </div>
                  </div>
  
                  <!-- 第三行 配送 -->
                  <div class="index-moneylimit">
                      <div>
                          <span>¥20起送</span>
                          |
                          <span>配送费¥5</span>
                      </div>
                      <div class="index-distanceWrap">
                          <span>1.5km</span>
                          |
                          <span>10分钟</span>
                      </div>
                  </div>
              </div>
          </div>
      </section>
  </div>
</template>

<script>
export default {
  name: 'shopList',
  props:{},
  data() {
  	return {
		shopList:[]
	}
  },
  components: {},
  async mounted(){
    // console.log(this.$route.params.shopTypeId);
    const {data} = await this.$axios.get("/ele/shopList/"+this.$route.params.shopTypeId+"?t=1");
    this.shopList = data.shopList;
    // console.log(111111111111,data.shopList)
  },
  updated() {},
  methods: {}
}
</script>

<style scoped>
 /* 商家列表 */
    .index-container {
        background: #fff;
        color: #666;
        padding: 4vw 0;
        border-bottom: 0.133333vw solid #eee;
    }
    .index-shopInfo {
        display: flex;
        justify-content: flex-start;
        padding: 0 2.666667vw;
        align-items: stretch;
    }
    .logo_container {
        width: 17.333333vw;
        height: 17.333333vw;
    }
    .logo_container img {
        display: block;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border: 0.133333vw solid rgba(0, 0, 0, 0.08);
        border-radius: 0.533333vw;
    }
    .index_main {
        display: flex;
        justify-content: space-between;
        overflow: hidden;
        flex-direction: column;
        padding-left: 2.666667vw;
        font-size: 0.2rem;
        flex-grow: 1;
    }
    .index_shopname {
        align-items: center;
        color: #333;
        font-weight: 700;
        font-size: 0.9rem;
    }
    .index_shopname i {
        background: #ffe800;
        margin-right: 1.333333vw;
        padding: 0.266667vw 0.666667vw;
        text-align: center;
        white-space: nowrap;
        font-size: 0.6rem;
    }
    .index_shopname span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .index-rateWrap {
        display: flex;
        align-items: center;
        overflow: hidden;
        justify-content: space-between;
    }

    .index-rateWrap .rate {
        margin-right: 1.066667vw;
    }
    .index-moneylimit {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    .index-moneylimit .index-distanceWrap {
        color: #999;
    }
    .delivery {
        display: flex;
        align-items: center;
        font-size: 0.6rem;
        margin-left: 1.066667vw;
    }
    .delivery .icon-hollow {
        color: #fff;
        background-color: #2395ff;
        padding: 2px;
        box-sizing: border-box;
    }

    /* 推荐商家 */
    .shoplist-title {
        display: flex;
        align-items: flex;
        justify-content: center;
        height: 9.6vw;
        line-height: 9.6vw;
        font-size: 16px;
        color: #333;
        background: #fff;
    }
    .shoplist-title:after,
    .shoplist-title:before {
        display: block;
        content: "一";
        width: 5.333333vw;
        height: 0.266667vw;
        color: #999;
    }
    .shoplist-title:before {
        margin-right: 3.466667vw;
    }
    .shoplist-title:after {
        margin-left: 3.466667vw;
    }
</style>
