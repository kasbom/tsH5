<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide v-for="slide in swiperSlides" :key="slide">
        <img class="img-size" :src="slide" alt />
        <!-- <div  class="slide-img">{{:style="{background:'url('+(slide)+')' no-repeat cover;}"}}</div> -->
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="box">
      <div class="logo">
        <img src="../assets/img/into-tou.png" alt />
      </div>
      <div class="yonghu">
        <input type="text" placeholder="用户名" v-model="formData.username" name="username" />
      </div>
      <div class="yonghu mima">
        <input type="password" placeholder="密码" v-model="formData.password" name="password" />
      </div>
      <div class="delu">
        <button class="delu-btn" v-on:click="deng">
          <p>登录</p>
        </button>
      </div>
      <div class="zhuce">
        <a href="zhuce.html">
          <p>注册</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        },
        autoplay: true,
        speed: 3000,
        autoplay: {
          delay: 3000
        },
        effect: "fade",
        fadeEffect: {
          crossFade: true
        }
      },
      swiperSlides: [
        require("@/assets/img/into.jpg"),
        require("@/assets/img/into1.jpg"),
        require("@/assets/img/into2.jpg"),
        require("@/assets/img/into3.jpg")
      ],
      formData: {
        username: "",
        password: "",
        token: ""
      }
    };
  },
  methods: {
    deng: function(refresh_token) {
      axios
        .post(urlAdress + "/api-auth/oauth/user/weAppToken", {
          username: this.formData.username,
          password: this.formData.password,
          client_id: "HApp",
          client_secret: "HApp"
        })
        .then(function(res) {
          // console.log(res.data);
          this.token = res.data.access_token;
          localStorage.setItem("to", this.token);
          window.location.href = "souye.html";
          //console.log(this.token)
        })
        .catch(function(error) {
          // 请求失败处理
          console.log(error);
          alert("用户不存在或账户密码错误");
        });
    },
    // 强制关注公众号，获取openid
    getCode: function() {
      if (
        sessionStorage.getItem("openid") &&
        sessionStorage.getItem("openid") != "undefined"
      ) {
        return false;
      }
      var code = this.getUrlParam("code"); // 截取路径中的code，如果没有就去微信授权，如果已经获取到了就直接传code给后台获取openId
      var local = window.location.href;
      console.log(111);
      var APPID = "wx519e38f6d0bac4b8";
      if (code === null || code === "") {
        window.location.href =
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
          APPID +
          "&redirect_uri=" +
          encodeURIComponent(local) +
          "&response_type=code&scope=snsapi_base&state=#wechat_redirect";
      } else {
        this.getOpenId(code); //把code传给后台获取用户信息
      }
    },
    //把code传给后台,得到openid
    getOpenId: function(code) {
      alert(code);
      $.ajax({
        type: "POST",
        dataType: "json",
        url: "xxx",
        data: { code: code },
        success: function(res) {
          if (res.status == -1) {
            // 提示没有关注公众号 没有关注公众号跳转到关注公众号页面
            console.log("您还未关注公众号喔");
            //二维码弹窗
            $(".openPopup").click();
            return;
          } else {
            // 本地存储这个openid，并刷新页面
            sessionStorage.setItem("openid", res.data.openid);
            location.reload();
          }
        }
      });
    },
    //获取地址栏的参数
    getUrlParam: function(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    }
  },
  mounted: function() {
    // this.getCode()
  }
};
</script>

<style>
.box{
    height: 100%;
    width: 100%; 
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
}
.box2{
    background-position: 0px;
    background-image: url(../assets/img/into2.jpg);
	background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    background-size: cover;
}
.box3{
    background-position: 0px;
    background-image: url(../assets/img/into3.jpg);
	background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    background-size: cover;
}
.logo{
   text-align: center;
   padding-top: 1.82rem;
   margin-bottom: 0.66rem;
   box-sizing: border-box;
}
.logo img{
    width: 100%;
    height: 100%;
}
.yonghu{
   text-align: center;
}
.yonghu input{
    width: 5.08rem;
    height: 0.82rem;
    background-image: url(../assets/img/into-peo.png);
    background-repeat: no-repeat;
    background-color: rgb(201,205,206);
    opacity:0.6;
    background-size: 0.41rem;
    background-position: 0.2rem center;
    border-radius: 0.1rem;
    border: none;
    padding: 0 0 0 0.88rem;
    box-sizing: border-box;
}
.mima input{
    background-image: url(../assets/img/into-bao.png);
}
.mima{
    margin-top: 0.32rem;
}
.delu,.zhuce{
    margin: auto;
    width: 5.08rem;
}
.delu-btn{
    width: 5.08rem;
    height: 0.86rem;
    text-align: center;
    font-size: 0.32rem;
    border-radius: 3.3rem;
    border: none;
    margin-top: 1.28rem;
    background-image: linear-gradient(to right, #ffb43f , #ed5e34);  
}
.zhuce a{
    display: block;
    width: 5.08rem;
    height: 0.86rem;
    text-align: center;
    font-size: 0.32rem;
    color: white;
    border-radius: 3.3rem;
    border: 0.06rem solid white;
    margin-top: 0.2rem;
    opacity: 0.7;
}
.delu p,.zhuce p{
    line-height: 0.86rem;
    color: #ffffff;
}

.swiper-container{
  width: 100%;
    /* height: 100%; */
}
.swiper-slide {
  height: 667px;
}
.swiper-slide .img-size{
    width: 100%;
    /* height: 100%; */
}
.swiper-pagination {
    z-index: 10;
}
.swiper-pagination-bullet {
    width: 10px!important;
    height: 4px!important;
    border-radius: 2px!important;
}

.swiper-pagination-bullet {
    background-color: #ed5e34!important;
}
</style>