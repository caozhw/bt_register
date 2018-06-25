<template>
    <div class="wrap download-wrap">
        <div class="tip">扫码加入币客官方微信群</div>
        <img class="scan" :src="ratio>=3?scan[3]:scan[2]"/>
        <div class="btn_group">
            <div class="btn_yellow"><a href="itms-services://?action=download-mianfest&url=https://img.bitker.com/download/ios/mianfest.plist">IOS下载</a></div>
            <div class="btn_yellow"><a href='#'>安卓下载</a></div>
        </div>
        <div class="dec_footer">币客 Bitker,一站式数字货币交易平台</div>  
    </div>
</template>
<script>
export default {
  data() {
    return {
      scan: {
        2: './static/img/pic_ewm@2x.png',
        3: './static/img/pic_ewm@3x.png'
      },
      ratio: 2
    };
  },
  created() {
    this.ratio = window.devicePixelRatio;
  }
};
</script>
<style lang="less" scoped>
@import "~@/styles/public.less";
.download-wrap {
  .ratio-bg-img("~@/assets/pic_bg_xz");
  max-width: 10rem;
  background-position: 0 0;
  background-size: contain;
  background-color: #0a0c14;
  background-repeat: no-repeat;
  min-height: 100vh;
}
.tip {
  text-align: center;
  padding-top: 4.97rem;
  line-height: 100%;
  color: #fff;
  font-size: 0.4rem;
}
.scan {
  display: block;
  margin: 0.57rem auto 1rem;
  width: 6rem;
  padding: 0.47rem;
  border-radius: 0.2rem;
  background: #23252c;
}
.btn_group {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  .btn_yellow {
    text-align: center;
    width: 3.73rem;
    height: 1.2rem;
    line-height: 1.2rem;
    background: linear-gradient(top, #fdcf84, #e79c24);
    background: -webkit-linear-gradient(top, #fdcf84, #e79c24); 
    border-radius: 0.07rem;
    font-size: 0.45rem;
    color: #03061d;
    a {
      color: inherit;
      color: currentColor;
      display: inline-block;
      width: 100%;
      height: 100%;
    }
    &:not(:first-child) {
      margin-left: 0.83rem;
    }
  }
}

.dec_footer {
  font-size: 0.29rem;
  color: #5c5d60;
  text-align: center;
  padding: 1.72rem 0 0.39rem;
}
</style>
