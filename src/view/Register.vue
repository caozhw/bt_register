<template>
    <div class="wrapper">
      <div class="bg_bot">
      <div class="title"></div>
      <div class="new" :style="{display:inviterTel!=''?'none':'block'}"></div>
      <div class="ask font12" :style="{display:inviterTel!=''?'block':'none'}">您的好友 <span>{{inviterTel}}</span> 邀您注册</div>
        <div class="tab font14">
          <span :class="reg_type==1?'line':''" data-type="mobile" @click="handleTabClick(1)">手机注册</span>
          <span :class="reg_type==2?'line':''" data-type="email" @click="handleTabClick(2)">邮箱注册</span>
        </div>
        <div class="height20"></div>
        <div class="input_box font14">
          <label class="select_country left">国籍</label>
          <input class="font_color_light left" type='text' v-model="en_name" />
        </div>
        
        <div :class="reg_type==1?'show':'hide'">
          <div class="input_box font14">
            <label class="font_color_light left">{{en_number}}</label>
            <input class="left" type='text' placeholder="手机号"  @keyup="handleTelKeyup($event)" v-model="username_tel" />
          </div>
          <div class="input_box font14"> 
            <input type='text' class='yzm left' placeholder="短信验证码"  @keyup="handleTelCodeKeyup($event)" v-model="check_code_mipt" />
            <input type="button"  class="yzm_btn font_color_light left"  @click="hadleCodeClick" v-model="mobile_checkCode" >
          </div>
        </div>

        <div :class="reg_type==2?'show':'hide'" >
          <div class="input_box font14">
            <input class="left email_ipt" type='text' placeholder="邮箱地址"  @keyup="handleEmailKeyup($event)" v-model="username_email" />
          </div>
          <div class="input_box font14">
            <input type='text' class='yzm left' placeholder="邮箱验证码"  @keyup="handleEmailCodeKeyup($event)" v-model="check_code_eipt" />
            <input type="button" class="yzm_btn font_color_light left" @click="hadleCodeClick" v-model="email_checkCode" >
          </div>
        </div>


        <div class="input_box font14">
          <input :type="showPwd?'text':'password'" class="pwd left" placeholder="登录密码" v-model="password"   @focus="handlePwdFocus" @blur="handlePwdBlur" @keyup="handlePwdKeyup($event)" />
          <div :class="showPwd?'eye-open left':'eye-close left'" @click="handleEyeClick" ></div> 
        </div>
         <div class="height20"></div>
         <!-- <div class="strength"  > -->
       <div class="strength"  :style="{display:isPwdFocus?'block':'none'}" > 
          <label class="font12">8-20位不能为纯数字</label>
          <div class="height20"></div>
          <div class="up">
            <span :class="se1Class()"></span>
            <span :class="se2Class() "></span>
            <span :class="se3Class() "></span>
            <strong :class="pwdStrengthClass()" >{{pwdStrength}}</strong>
          </div>
          
        </div>
        <!-- 滑动验证 -->
         <div class="ln2">
          <div id="dom_id"></div>
        </div>
        <input type='hidden' id='csessionid' name='csessionid' v-model="csessionid"  />
        <input type='hidden' id='sig' name='sig' v-model="sig"/>
        <input type='hidden' id='token' name='token' v-model="nc_token"/>
        <input type='hidden' id='scene' name='scene' v-model="nc_scene"/>
        <div class="height50"></div>
        <div class="ask_code" :style="{display:inviteCode?'block':'none'}" >
          <span class="font12" >推荐人邀请码：</span>
          <em class="font14">{{inviteCode}}</em>
        </div>
        <label class='reader font12'>
          注册即代表已阅读并同意<a href="https://www.bitker.com/wap/register_contract" target="_blank" class="agree">《用户协议》</a>
        </label>
        <div class="height20"></div>
        <input class='register_btn font18' type="submit" value="注册" @click="handleRegClick" id="register">
        <div class="height50"></div>
        <label class="footer font12">币客Bitker，一站式数字货币交易平台</label>
        <div class="height50"></div>
      </div>
      <div class="alert_success_bg">
        <div class="alert_success">
          <div class="success_icon"></div>
          <p class="font16">注册完成</p>
        </div>
      </div>
      <div class="prompt">
        {{prompt}}
      </div>
    </div>
    
  
</template>

<script>
import $ from "jquery";
import { requestApi } from "../api/axios.js";
export default {
  data() {
    return {
      reg_type: 1, //1手机 2 邮箱
      country_id: 1,
      from_type: 4, //1 PC /2 iOS/ 3 Android /4 H5
      username: "",

      password: "",
      check_code: "",
      source: "",
      sales:"",

      check_code_mipt:"",
      check_code_eipt:"",

      username_tel:"",
      username_email:"",

      en_name: "China",
      en_number: "0086",

      pwdStrength:"",
      showPwd: false,
      checkCode: "",
      mobile_checkCode: "获取验证码",
      email_checkCode: "获取验证码",

      isPwdFocus: false,
      prompt: "",

      isRed: false,
      isGreen: false,
      isYellow: false,

      isTel:false,
      isEmail:false,

      isSendCode:false,

      /*滑动验证*/
      nc_appkey: "FFFF00000000017ABCF9",
      modelName: "no-captcha",
      nc_token: null,
      nc_scene: "register_h5",
      lang: "cn",
      nc_option: null,
      csessionid: null,
      sig: null,
      countryList: [],

      inviteCode:"",
      inviterTel:""
    };
  },
  mounted: function() {
    this.judgeDevice(); 
    //this.init(); 
    this.getMobileDeviceWh();
    this.getCountry();

    this.source = this.getQueryString("source");
    this.sales = this.getQueryString("sales");  

    this.inviteCode = this.getQueryString("invite_code"); 
    //this.getInviterInfo();
  },
  methods: {
    //阿里滑块验证引入 ---start
    init() {
      var self = this;
      this.nc_token = [
        this.nc_appkey,
        new Date().getTime(),
        Math.random()
      ].join(":");
      this.nc_option = {
        renderTo: "#dom_id",
        appkey: this.nc_appkey,
        scene: this.nc_scene,
        token: this.nc_token,
       
        //trans: '{"name1":"code100"}',
        
        callback: function(data) {
          
          self.csessionid = data.csessionid;
          self.sig = data.sig;
          console.log("self.csessionid", self.csessionid);
          console.log("self.sig", self.sig);

          //发送验证码
          //this.isSendCode = true;  
         /* if(self.sig !=null && self.csessionid !=null && !this.isSendCode){
            self.askCode();  
          } */ 

          //将这三个参数在这里回调服务器的接口，进行服务器的验证
        },
        error: function (s) {
        },
        verifycallback: function (data) {
          if (data.code == "200") {
             console.log(data)
          }
        }
      };
      ////g.alicdn.com/sd/nch5/index.js?t=1529400685813
      this.$api.loadJs(
        `//g.alicdn.com/sd/nch5/index.js?t=${this.setRequestTime()}`,
        {
          success(data) {
            self.generarte();
          }
        }
      );
    },
    generarte() {
      let nc =  NoCaptcha.init(this.nc_option);
      NoCaptcha.setEnabled(true);
      nc.reset();//请务必确保这里调用一次reset()方法
      NoCaptcha.upLang('cn', {
        'LOADING':"加载中...",//加载
        'SLIDER_LABEL': "请按住滑块，拖动到最右边完成验证",//等待滑动
        'CHECK_Y':"验证通过",//通过
        'ERROR_TITLE':"非常抱歉，这出错了...",//拦截
        'CHECK_N':"验证未通过", //准备唤醒二次验证
        'OVERLAY_INFORM':"经检测你当前操作环境存在风险，请输入验证码",//二次验证
        'TIPS_TITLE':"验证码错误，请重新输入"//验证码输错时的提示
    });
    },
    //阿里滑块验证引入 ---end
    //获取url参数
    getQueryString(name) { 
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
        let r = window.location.search.substr(1).match(reg); 
        if (r != null) return unescape(r[2]); 
        return null; 
    },
    //判断设备
    judgeDevice() {
      let ua = window.navigator.userAgent;
      let isMobile = ua.match(/(iPhone|iPod|Android|ios)/i);
      let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      let isAndroid = ua.indexOf("Android") > -1 || ua.indexOf("Adr") > -1; //android终端
      let isWeixin = false;
      if (ua.toLowerCase().match(/MicroMessenger/i) == "micromessenger") {
        isWeixin = true;
      } else {
        isWeixin = false;
      }
      if (isiOS) {
        this.from_type = 2;
      } else if (isAndroid) {
        this.from_type = 3;
      } else if (isMobile) {
        this.from_type = 4;
      } else {
        this.from_type = 1;
      }
    },
    //获取移动设备宽高
    getMobileDeviceWh() {
      let seewid = document.documentElement.clientWidth;
      let seehei = document.documentElement.clientHeight;
      $(".alert_success_bg").css({
        width: seewid + "px",
        height: seehei + "px"
      });
      //console.log('可视区高'+seehei+'可视区宽'+seewid);
    },
    //时间戳
    setRequestTime() {
      let newTimestamp = new Date().getTime();
      let requestTime = parseInt(newTimestamp);
      return requestTime;
    },
    //tab切换
    handleTabClick(reg_type) {
      this.reg_type = reg_type;
      this.username = "";
    },
    //显示隐藏密码
    handleEyeClick() {
      this.showPwd = !this.showPwd;
    },
    //密码获取焦点
    handlePwdFocus() {
      this.isPwdFocus = true;
    },
    //密码失去焦点
    handlePwdBlur() {
      this.isPwdFocus = false;
    },
    //密码输入
    handlePwdKeyup(ev) {
      //console.log(ev.key);
      this.passwordTest(this.password);
    },

    handleTelKeyup(ev){
     /* let isPass = this.check_code_mipt != "" && this.password !="";
      if(isPass){
        this.init();
      }*/
    },
    handleTelCodeKeyup(ev){
     /* let isPass = this.username_tel != "" && this.password !="";
      if(isPass){
        this.init();
      }*/
    },
    handleEmailKeyup(ev){
      /*let isPass = this.username_code_eipt != "" && this.password !="";
      if(isPass){
        this.init();
      }*/
    },
    handleEmailCodeKeyup(ev){
      /*let isPass = this.username_email != "" && this.password !="";
      if(isPass){
        this.init();
      }*/
    },
    //密码测试
    passwordTest(pwd) {
      let china = new RegExp("[\\u4E00-\\u9FFF]+", "g");
      let d1_reg = /^((?=.*?\d)(?=.*?[A-Za-z])|(?=.*?\d)(?=.*?[\W])|(?=.*?[A-Za-z])(?=.*?[\W]))[\dA-Za-z\W].{7,11}$/;
      let d2_reg = /^((?=.*?\d)(?=.*?[A-Za-z])|(?=.*?\d)(?=.*?[\W])|(?=.*?[A-Za-z])(?=.*?[\W]))[\dA-Za-z\W].{10,}$/;
      let d2_reg_2 = /^(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,}).{8,}$/;
      let d3_reg = /^(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,}).{10,20}$/;

      let isChina = china.test(pwd);
      let isRed = d1_reg.test(pwd);
      let isGreen = d2_reg.test(pwd) || d2_reg_2.test(pwd);
      let isYellow = d3_reg.test(pwd);

      this.isRed = isRed;
      this.isGreen = isGreen;
      this.isYellow = isYellow;

      if(this.isYellow){
        this.pwdStrength = "强";
      }
      else if(this.isGreen){
        this.pwdStrength = "中";
      }
      else if(this.isRed){
        this.pwdStrength = "弱";
      }
      //显示滑动
      /*var isPass = (this.isRed||this.isGreen||this.isYellow) && 
      if(this.isRed||this.isGreen||this.isYellow){
        this.init();  
      }else{
        $('stage').hide();
      }*/
    },
    se1Class() {
      if (this.isYellow) {
        return "se1 yellow";
      } else if (this.isGreen) {
        return "se1 green";
      } else if (this.isRed) {
        return "se1 red";
      } else {
        return "se1";
      }
    },
    se2Class() {
      if (this.isYellow) {
        return "se2 yellow";
      } else if (this.isGreen) {
        return "se2 green";
      } else {
        return "se2";
      }
    },
    se3Class() {
      if (this.isYellow) {
        return "se3 yellow";
      } else {
        return "se3";
      }
    },
    pwdStrengthClass(){
      if (this.isYellow) {
        return "yellow";
      } else if (this.isGreen) {
        return "green";
      } else if (this.isRed) {
        return "red"; 
      } else {
        return "";
      }
    },
    //判断纯数字最低8位
    pureDigit(pwd) {
     /* let number = /^\d{0,}$/;
      let isNumber = number.test(pwd);

      if (isNumber) {
      } else {
      }*/
    },
    // 手机验证
    mobile_test(tel){
      if(!/^\d{11}$/.test(tel))
      //if(!/^\d{6,11}$/.test(tel))
      {
        this.prompt = "请输入正确的手机号码";
        this.promptShow();
        this.isTel = false;
      }else{
          this.isTel = true; 
      }
    },
    // 邮箱验证
    email_test(email){
      if(!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(email))
      {
        this.prompt = "请输入正确的邮箱地址";
        this.promptShow();
        this.isEmail = false;
        
      }
      else{
       this.isEmail = true;
      }
    },
    //获取验证码
    hadleCodeClick(ev) {
      if(this.reg_type == 1){
        this.username = this.username_tel;
        this.mobile_test(this.username);
        
      }else if(this.reg_type == 2){
        this.username = this.username_email;
        this.email_test(this.username);
      }
      if(this.reg_type == 1&&this.isTel || this.reg_type == 2&&this.isEmail){
        this.askCode(); 
        /*this.init();
        this.prompt = "请滑动滑块发送验证码";
        this.promptShow();*/
      }
    },
    askCode(){
      $('.yzm_btn').attr('disabled',true);
      let _this = this;
      let url = "send_code";
      let getCheckCodeParams = {
        reg_type: this.reg_type,
        username: this.username,
        country_id: this.country_id,
        from_type: this.from_type
      };
      //if(this.reg_type == 1&&this.isTel || this.reg_type == 1&&this.isEmail){
        requestApi(url, getCheckCodeParams).then(response => {
          let { msg, status, data } = response;
          if (status != 200) {
            this.prompt = msg;
            this.promptShow();
          } else {
            this.isSendCode = true;
            let mobile_second = 59,
              email_second = 59;
            //修改发送验证码按钮
            if (this.reg_type == 1) {
              let mTime = window.setInterval(() => {
                if (mobile_second > 0) {
                 
                  _this.mobile_checkCode = `${mobile_second}s`;
                  mobile_second--;
                } else {
                   $('.yzm_btn').removeAttr('disabled');
                  _this.mobile_checkCode = "获取短信验证码";
                  window.clearInterval(mTime);
                }
              }, 1000);
            } else if (this.reg_type == 2) {
              let eTime = window.setInterval(() => {
                if (email_second > 0) {
                  $('.yzm_btn').attr('disabled',true);
                  _this.email_checkCode = `${email_second}s`;
                  email_second--;
                } else {
                  $('.yzm_btn').removeAttr('disabled');
                  _this.email_checkCode = "获取邮箱验证码";
                  window.clearInterval(eTime);
                }
              }, 1000);
            }
          }
        }); 

      //}
    },
    //注册
    handleRegClick() {
      let _this = this;
      let url = "reg";
      // http://ln.beker.com/?act=register&source=1&sales=2
      let sales = this.$route.query.sales || "";
      let source = this.$route.query.source||this.source;

      if(this.reg_type == 1){
        this.username = this.username_tel;
        this.check_code = this.check_code_mipt;
       /* if(!this.check_code){
            this.prompt = "请输入手机验证码";
            this.promptShow();
        } */
      }else{
        this.username = this.username_email;
        this.check_code = this.check_code_eipt;
        /*if(!this.check_code){
            this.prompt = "请输入邮箱验证码"; 
            this.promptShow();
        } */
      }
      let regParams = {
        reg_type:this.reg_type,
        from_type: this.from_type,
        username: this.username,
        country_id: this.country_id,
        password: this.password,
        check_code: this.check_code,
        csessionid: this.csessionid,
        sig: this.sig,
        token: this.nc_token,
        source:this.source, 
        sales:this.sales
      };
      let isPass = this.isRed||this.isYellow||this.isGreen ;
      if(isPass) { 
        requestApi(url, regParams).then(response => {
          let { msg, status, data } = response;
          //console.log(response);
          if (status != 200) {
            this.init();  
            this.prompt = msg;
            this.promptShow();
          } else {
            $(".alert_success_bg").fadeIn();
            let asTime = window.setTimeout(function() {
              $(".alert_success_bg").fadeOut();
              window.clearInterval(asTime);
              _this.$router.push({name:'download'});
            }, 2000);
          }
        });
      }else{
        this.prompt = "密码8-20位不能为纯数字";
        this.promptShow();
      } 
    },
    //弹出提示
    promptShow(){
      $(".prompt").fadeIn();
        let pmtTime = window.setTimeout(function() {
          $(".prompt").fadeOut();
          window.clearInterval(pmtTime);
        }, 2000);
    },
    getCountry() {
      let _this = this;
      let url = "country";
      let getCountryParams = {
        from_type: this.from_type
      };
      requestApi(url, getCountryParams).then(response => {
        let { msg, status, data } = response;
        //console.log(response);
        if (status != 200) {
        } else {
          this.countryList = data;
        }
      });
    },
    getInviterInfo(){
      let url = "inviter_info";
      if(this.inviteCode != ""){
        let params = {
          invite_code:this.inviteCode,
          username:this.username
        }
        requestApi(url, params).then(response => {
        let { msg, status, data } = response;
        //console.log(response);
        if (status != 200) {
        } else {
          this.inviterTel = data.username;
        }
      });
      }

    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  max-width: 10rem;
  margin: 0 auto;
  position: relative;
}
.wrapper .show {
  display: block;
}
.wrapper .hide {
  display: none;
}
.wrapper .bg_bot {
  text-align: center;
  background-image: url("../assets/bg@2x.png");
  background-size: 10rem auto;
  background-repeat: no-repeat;
  padding-top: 1.64rem;
}


.wrapper .bg_bot .title{
  height: 0.75rem;
  text-align: center;
  background-image: url("../assets/wz@2x.png");
  background-size: 4rem 0.75rem;
  background-repeat: no-repeat;
  background-position: center;
}

.wrapper .bg_bot .new{
  height: 0.47rem;
  text-align: center;
  background-image: url("../assets/zs@2x.png");
  background-size: 5rem 0.47rem;
  background-repeat: no-repeat;
  background-position: center;
  padding-top: 0.22rem;
}
.wrapper .bg_bot .ask{
  color:#b4b7bd;
  padding-top: 0.22rem;
}

.wrapper .bg_bot  .ask_code{
  padding: 0.2rem 0;
}
.wrapper .bg_bot  .ask_code span{
  color:#74777c;
}
.wrapper .bg_bot  .ask_code em{
  color:#b4b7bd;
}
.wrapper .bg_bot .tab {
  color: #b4b7bd;
  margin: 0 auto;
  height: 0.8rem;
  padding-top: 1.5rem;
}
.wrapper .bg_bot .tab span {
  margin: 0 0.73rem;
  padding-bottom: 0.26rem;
}
.wrapper .bg_bot .tab span.line {
  border-bottom: 0.08rem solid #f2ad3e;
}

.wrapper .bg_bot .input_box {
  margin: 0 auto;
  width: 8.54rem;
  height: 0.72rem;
  padding-top: 0.48rem;
  padding-bottom: 0.2rem;
  border-bottom: 0.028rem solid #383a41;
}

.wrapper .bg_bot .input_box .font_color_light {
  color: #cad2e9;
}

.wrapper .bg_bot .input_box .select_country {
  background-image: url("../assets/icon_sj_wzk@2x.png");
  background-size: 0.3rem 0.15rem;
  background-repeat: no-repeat;
  background-position: 1.12rem center;
}

.wrapper .bg_bot .input_box label {
  display: inline-block;
  width: 1.72rem;
  height: 0.4rem;
  line-height: 0.4rem;
  text-align: left;
  color: #74777c;
  border-right: 0.028rem solid #383a41;
}
.wrapper .bg_bot .input_box input {
  width: 6.28rem;
  padding-left: 0.4rem;
  color: #74777c;
  background-color: initial;
}

.wrapper .bg_bot .input_box .yzm {
  padding-left: 0rem;
  width: 5.92rem;
}
.wrapper .bg_bot .input_box .yzm_btn {
  padding-left: 0rem;
  width: 2.6rem;
  text-align: right;
}

.wrapper .bg_bot .input_box .pwd {
  padding-left: 0rem;
  width: 7.64rem;
}
.wrapper .bg_bot .input_box .email_ipt {
  padding-left: 0rem;
}

.wrapper .bg_bot .input_box .eye-close {
  width: 0.8rem;
  height: 0.4rem;
  background-image: url("../assets/icon_eye_close@2x.png");
  background-size: 0.8rem 0.8rem;
  background-repeat: no-repeat;
  background-position: center center;
}

.wrapper .bg_bot .input_box .eye-open {
  width: 0.8rem;
  height: 0.6rem;
  background-image: url("../assets/icon_eye_open@2x.png");
  background-size: 0.8rem 0.8rem;
  background-repeat: no-repeat;
  background-position: center center;
}

.wrapper .bg_bot .ln2 {
  margin: 0 auto;
  margin-top: 0.46rem;
  width: 8.54rem;
  height: 1.22rem;
}
.wrapper .bg_bot .agree {
  color: #f5bb41;
}
.wrapper .bg_bot .reader {
  color: #b4b7bd;
}

.wrapper .bg_bot .register_btn {
  margin: 0 auto;
  width: 8.54rem;
  height: 1.16rem;
  color: #f5bb41;
  background-color: initial;
  border: 0.028rem solid #f5bb41;
  border-radius: 0.12rem;
  letter-spacing: 0.12rem;
}

.wrapper .bg_bot .footer {
  color: #5c5d60;
}

.wrapper .alert_success_bg {
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  text-align: center;
  display: none;
}
.wrapper .alert_success_bg .alert_success {
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 0.2rem;
  background-color: #2a2b2e;
  margin: 0 auto;
  vertical-align: middle;
  position: relative;
  top: 40%;
  padding: 0.4rem;
}
.wrapper .alert_success_bg p {
  color: #e1e3e9;
}

.wrapper .alert_success_bg .success_icon {
  width: 3.6rem;
  height: 2.6rem;
  background-image: url("../assets/icon_chenggong@2x.png");
  background-size: 2rem 2rem;
  background-repeat: no-repeat;
  background-position: center center;
}
.wrapper .prompt {
  width: 4rem;
  height: 0.6rem;
  line-height: 0.6rem;
  margin: 0 auto;
  text-align: center;
  background-color: #000;
  color: #fff;
  border-radius: 0.2rem;
  padding: 0.2rem;
  position: absolute;
  bottom: 0.8rem;
  left: 0;
  right: 0;
  z-index: 999;
  display: none;
}

.wrapper .fadeIn {
  display: block;
  opacity: 1;
}
.wrapper .fadeOut {
  display: none;
  opacity: 0;
}

.wrapper .bg_bot .strength {
  width: 8.54rem;
  margin: 0 auto;
  text-align: left;
  color: #b4b7bd;
}

.wrapper .bg_bot .strength .up span {
  display: inline-block;
  width: 1rem;
  height: 0.2rem;
  background-color: #37393c;
}
.wrapper .bg_bot .strength .up span.red {
  background-color: #cc4e45;
}
.wrapper .bg_bot .strength .up span.green {
  background-color: #66be91;
}
.wrapper .bg_bot .strength .up span.yellow {
  background-color: #f2ad3e;
}

.wrapper .bg_bot .strength .up strong.red {
  color: #cc4e45;
}
.wrapper .bg_bot .strength .up strong.green {
  color: #66be91;
}
.wrapper .bg_bot .strength .up strong.yellow {
  color: #f2ad3e;
}

@media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
  .wrapper .bg_bot {
    background-image: url("../assets/bg@3x.png");
    background-repeat: no-repeat;
  }
  .wrapper .bg_bot .input_box .select_country {
    background-image: url("../assets/icon_sj_wzk@3x.png");
    background-repeat: no-repeat;
  }
  .wrapper .bg_bot .input_box .eye-close {
    background-image: url("../assets/icon_eye_close@3x.png");
    background-repeat: no-repeat;
  }
  .wrapper .bg_bot .input_box .eye-open {
    background-image: url("../assets/icon_eye_open@3x.png");
    background-repeat: no-repeat;
  }
  .wrapper .alert_success_bg .success_icon {
    background-image: url("../assets/icon_chenggong@3x.png");
    background-repeat: no-repeat;
  }
  .wrapper .bg_bot .title{
    background-image: url("../assets/wz@3x.png");
    background-repeat: no-repeat;
  }
}
</style>
