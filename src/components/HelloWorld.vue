<template>
  <!-- <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a id='abc'
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul> 
    </div>-->
    <div class="wrapper">
      <div class="bg_bot">
        <div class="ln2">
          <div id="dom_id"></div>
        </div>
        <input type='hidden' id='csessionid' name='csessionid'/>
        <input type='hidden' id='sig' name='sig'/>
        <input type='hidden' id='token' name='token'/>
        <input type='hidden' id='scene' name='scene'/>
      </div>
    </div>
  
</template>

<script>
import loadJs from '../assets/js/common.js'
export default {
  name: 'HelloWorld',
  data () {
    return {
     
      appKey:'<你的appkey>',
      modelName:'no-captcha',
      nc_token:null,
      lang:'cn',
      NC_Opt:null,

    }
  },
  mounted:function(){
   let test = $('#abc').html();
   console.log(test);

   this.init();
   /* //阿里滑块验证引入 ---start
    var nc = new noCaptcha();
    var nc_appkey = 'FFFF00000000017ABCF9';  // 应用标识,不可更改
    var nc_scene = 'register';  //场景,不可更改
    var nc_token = [nc_appkey, (new Date()).getTime(), Math.random()].join(':');
    var nc_option = {
        renderTo: '#dom_id',//渲染到该DOM ID指定的Div位置
        appkey: nc_appkey,
        scene: nc_scene,
        token: nc_token,
        // trans: '{"name1":"code100"}',//todo 测试用，特殊nc_appkey时才生效，正式上线时请务必要删除；code0:通过;code100:点击验证码;code200:图形验证码;code300:恶意请求拦截处理
        callback: function (data) {// 校验成功回调
            document.getElementById('csessionid').value = data.csessionid;
            document.getElementById('sig').value = data.sig;
            document.getElementById('token').value = nc_token;
            document.getElementById('scene').value = nc_scene;
            slider_result = 1;
            //发送验证码
            // sendCode();
        }
    };
    nc.init(nc_option);
    //阿里滑块验证引入 ---end*/

 },

 methods: {

        init(){

          //let api = new API.default();
          //window.$api = api;
            var self = this;
            this.nc_token = [this.appKey, (new Date()).getTime(), Math.random()].join(':');
            this.NC_Opt = {
                renderTo: "#dom_id",
                appkey: "<你的appkey>",
                scene: "nc_login",
                token: this.nc_token,
                customWidth: 300,
                trans:{"key1":"code0"},
                // elementID: ["usernameID"],
                is_Opt: 0,
                language: this.lang,
                isEnabled: true,
                timeout: 3000,
                times:5,
                apimap: {},   
                callback: function (data) { 
                    window.console && console.log(self.nc_token)
                    window.console && console.log(data.csessionid)
                    window.console && console.log(data.sig)
                    //将这三个参数在这里回调服务器的接口，进行服务器的验证
                }
            }
            this.$api.loadJs("http://g.alicdn.com/sd/ncpc/nc.js?t=2015052012",{
                    success(data){
                        self.generarte();
                    }
              });
                    
        },

        generarte(){
            var nc = new noCaptcha(this.NC_Opt)
            nc.upLang('cn', {
                _startTEXT: "请按住滑块，拖动到最右边",
                _yesTEXT: "验证通过",
                _error300: "哎呀，出错了，点击<a href=\"javascript:__nc.reset()\">刷新</a>再来一次",
                _errorNetwork: "网络不给力，请<a href=\"javascript:__nc.reset()\">点击刷新</a>",
            });
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.wrapper {
  max-width: 10rem;
  margin: 0 auto;
  position: relative;
}
.wrapper .bg_bot {
  text-align: center;
  background-image: url('../assets/pic_bg@2x.png');
  background-size: 10rem auto;
  padding-top: 1.62rem;
}
</style>
