<template>
  <div class="wrap">
    <div class="bg_bot"> 
      <div class="title font18">{{title}}</div>
      <div class="height50"></div>
      <div class="height50"></div>
      <div class="height50"></div>
      <div class="login">登录 www.bitker.com </div>
      <div class="konw_more font18">查看到账金额</div>
      <div class="height50"></div>
      <img class="scan" :src="ratio>=3?scan[3]:scan[2]"/>
      <div class="height20"></div>
     <!--  <div class="btn_group">
         <div class="btn_yellow" @click="handleIosClick"><a class="download_android" :download="ios_download" :href="ios_download">IOS下载</a>></div> 
         <div class="btn_yellow"><a class="download_android" :href="android_download">安卓下载</a></div>
     </div>  -->
     <div class="tip">加群了解更多</div>
     <div class="dec_footer">币客 Bitker,一站式数字货币交易平台</div>
     <div class="height20"></div>
      <!-- <div class="weixin font15"  :style="{display:isWeixin?'block':'none'}">
        <div  class='f1'>
          请点击右上角“ 
          <i class='spot ml2'></i>
          <i class='spot'></i>
          <i class='spot mr2'></i>
           ”
        </div>
        <div class="height20"></div>
        <div class='f2'>
          选择在<span class='f_color'>浏览器</span>中打开 ~
        </div>
        <div class="arrow"></div>
      </div>    -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title:null,
      inviteCode:'',
      scan: {
        2: './static/img/pic_ewm@2x.png', 
        3: './static/img/pic_ewm@3x.png'
      },
      ratio: 2,
      isiOS:false,
      isWeixin:false,
      ios_download:'itms-services://?action=download-manifest&url=https://download.bitker.com/ios/mianfest.plist',
      android_download:'https://download.bitker.com/android/app-Bitker-release.apk'
    };
  },
  created() {
    this.ratio = window.devicePixelRatio;
    
  },
  mounted() {
    this.download();
    this.is_weixin();
    this.inviteCode = this.getQueryString("invite_code");
    console.log('1',this.inviteCode )
    this.showTitle(); 
  },
  methods:{
    handleIosClick(){
      if(this.isiOS){
        this.ios_download = "itms-services://?action=download-manifest&url=https://download.bitker.com/ios/mianfest.plist";
      } 

       /*let aLink = document.createElement('a');
       aLink.href = this.ios_download;
       aLink.download = this.ios_download; 
       console.log(aLink) 
       aLink.click(); */
       //console.log(aLink.click())   
    },
    download(){
      let ua = window.navigator.userAgent;
      this.isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      
  /*    $('.download_ios').click(function () {
          if(isiOS){
            // ios下载链接
            $('.download_ios').attr('href',"itms-services://?action=download-manifest&url=https://download.bitker.com/ios/mianfest.plist");   
          }else{
            if(this.is_weixin()){
              //$('.weixin').show();
              // 安卓微信浏览器下载地址
              $('.download').attr('href','#');
            }
            //else{
              // 安卓浏览器下载apk文件
              $('.download').attr('href','https://download.bitker.com/android/app-Bitker-release.apk');
            //}
          }
      });*/
      
    },
    is_weixin(){ 
      let ua = window.navigator.userAgent;
      if(ua.toLowerCase().match(/MicroMessenger/i)=="micromessenger") {
          this.isWeixin = true;
          
      } else {
          this.isWeixin = false;
      }
    },
    //获取url参数
    getQueryString(name) { 
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
        let r = window.location.search.substr(1).match(reg); 
        if (r != null) return unescape(r[2]); 
        return null; 
    },
    showTitle(){
      console.log(this.inviteCode)
      if(this.inviteCode==null){
        this.title = '立即领取BKB';
      }else{
        this.title = '我的BKB礼包：已到账';
      }
    }
  }
};
</script>
<style scoped>

.wrapper {
  max-width: 10rem;
  margin: 0 auto;
  position: relative;
}

.bg_bot {
  text-align: center;
  background-image: url("../assets/xz@2x.png");
  background-size: 10rem auto;
  background-repeat: no-repeat;
  padding-top: 3.72rem;
}

.title{
  color: #f7ca81;
}

.login{
  text-align: center;
  line-height: 0.6rem;
  color: #fff;
  font-size: 0.4rem;
  padding: 0.2rem 0;
}

.konw_more{
  color: #f5bb41;
}

.tip {
  text-align: center;
  line-height: 0.6rem;
  color: #fff;
  font-size: 0.4rem;

  
}
.scan {
  display: block;
  margin: auto;
  width: 6rem;
  padding: 0.47rem;
  border-radius: 0.2rem;
  background: #23252c;
  position: relative;


}
.btn_group {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  
}

/* .btn_group  .btn_yellow {
    text-align: center;
    width: 3.73rem;
    height: 1.2rem;
    line-height: 1.2rem;
    background: linear-gradient(top, #fdcf84, #e79c24);
    background: -webkit-linear-gradient(top, #fdcf84, #e79c24); 
    border-radius: 0.07rem;
    font-size: 0.45rem;
    color: #03061d;
   

  }

.btn_group .btn_yellow  a{
  color: inherit;
  color: currentColor;
  display: inline-block;
  width: 100%;
  height: 100%;
  z-index:999;
} */

.dec_footer {
  font-size: 0.29rem;
  color: #5c5d60;
  text-align: center;
  padding: 0.72rem 0 0.39rem;

}

@media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
  .bg_bot {
    background-image: url("../assets/xz@3x.png");
    background-repeat: no-repeat;
  }

}

</style>
