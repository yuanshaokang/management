<template>
  <div class="view">
    <div class="view-box">
      <div class="box-all">
        <p class="view-title">后台管理系统</p>
        <!-- <div  class="all-int" style="margin-top:10%;">
					<el-input type="text" v-model.trim="phone" placeholder="请输入手机号" maxlength="11" id="int"></el-input>
				</div>
			    <div class="all-int">
			    	<el-input type="password" v-model.trim="pass" placeholder="请输入密码" maxlength="16" show-password></el-input>
        </div >-->
        <!--  <div class="all-int" >
			    	<el-input v-model.number="code" placeholder="请输入验证码" style="width: 155px;"></el-input>
			    	<el-button type="primary" @click="submitForm()" style="width: 100px;margin:0;padding: 12px;font-size:14px">验证码</el-button>
        </div >-->
        <div style="margin-top:10%;margin-left: 27px;">
          <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
            <el-form-item label="登录账号">
              <el-input
                v-model.trim="formLabelAlign.username"
                placeholder="请输入登录账号"
                maxlength="20"
                @keyup.enter.native="login"
              ></el-input>
            </el-form-item>
            <el-form-item label="登录密码">
              <el-input
                type="password"
                v-model.trim="formLabelAlign.pass"
                placeholder="请输入登录密码"
                maxlength="16"
                auto-complete="off"
                @keyup.enter.native="login"
              ></el-input>
            </el-form-item>
            <div class="email-code">
              <el-input
                type="text"
                v-model.trim="formLabelAlign.code"
                placeholder="请输入验证码"
                maxlength="5"
                auto-complete="off"
                @keyup.enter.native="login"
                id="email"
              ></el-input>
              <img :src="vsCode" alt class="imgFl" @click="changeCodeImg()" />
            </div>
          </el-form>
        </div>
        <div class="foot-btn" @click="login" @keyup.enter.native="login">
          <el-button type="button">登录</el-button>
        </div>
        <div class="clear"></div>
        <div class="foot-text">服务电话：13188942111</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      labelPosition: "right",
      num: "",
      vsCode: "",
      formLabelAlign: {
        pass: "",
        username: "",
        code: "",
      },
    };
  },
  mounted: function () {
    window.scrollTo(0, 0);
    const _this = this;
    _this.changeCodeImg();
  },
  methods: {
    /**** 获取验证码  ***/

    changeCodeImg() {
      var _this = this;
      _this.num = Math.ceil(Math.random() * 1000000);
      //_this.vsCode = _this.urltype + '/api/vsCode.jpg',
      _this.vsCode =
        "http://10.12.204.208:10688/api/captcha.jpg?uuid=" + _this.num;
    },

    /**** 登录账号  密码   验证码 ****/

    login() {
      // var myreg=/^1[34578]\d{9}$/;
      if (this.formLabelAlign.username == "") {
        this.openPhone();
        return false;
      }

      if (this.formLabelAlign.pass == "") {
        this.openPass();
        return false;
      }

      if (this.formLabelAlign.code == "") {
        this.openCode();
        return false;
      }

      this.$axios({
        method: "post",
        url: "api/login",
        data: {
          username: this.formLabelAlign.username,
          password: this.formLabelAlign.pass,
          captcha: this.formLabelAlign.code,
          uuid: this.num,
        },
      }).then((res) => {
        if (res.data.code == "0000") {
          
          this.$message(res.data.msg);
          this.$router.push({
            path: "/homePage",
          });
          localStorage.setItem("uid", res.data.data.uid); //uid
          localStorage.setItem("token", res.data.token); //token
          this.$store.state.token = res.data.token
          localStorage.setItem("jurisdiction", res.data.data.agtType); //权限字段
          localStorage.setItem("name",res.data.data.name); 

        } else {
          this.$message(res.data.msg);
        }
      });
    },
    
    openPhone() {
      this.$message("登录账号不能为空！");
    },

    openPass() {
      this.$message("登录密码不能为空！");
    },
    openCode() {
      this.$message("验证码不能为空！");
    },
  },
};
</script>
<style scoped>
.view {
  background: url("../../assets/images/bg3.jpg") no-repeat;
  width: 100%;
  height: 100vh;
  background-size: 100% 100%;
}
.view-box {
  padding-top: 12%;
}
.view-title {
  font-size: 16px;
  color: #dcdfe6;
  text-align: center;
  padding-top: 10px;
}
.box-all {
  padding-top: 10px;
  opacity: 1;
  border-radius: 3px;
  border: 1px solid #e7f8ee;
  width: 380px;
  height: 360px;
  margin: 0 auto;
  border: 1px solid #e7eaec;
}
.all-int {
  width: 260px;
  margin: 0 auto;
  margin-top: 8%;
}
.foot-btn {
  width: 92%;
  margin: 0 auto;
  margin-top: 20px;
}
.el-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  /* background: #409EFF;*/
  border: 1px solid #e7eaec;
  color: #fff;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  font-size: 15px;
  border-radius: 4px;
  width: 100%;
  margin-top: 10px;
  background: transparent;
}
.el-input >>> .el-input__inner {
  background-color: transparent;
  color: #dcdfe6;
  width: 92%;
}
.el-form >>> .el-form-item {
  margin-bottom: 22px;
  width: 95%;
}
.el-form-item >>> .el-form-item__label {
  font-size: 15px;
  color: #dcdfe6;
}
.foot-text {
  text-align: center;
  margin-top: 20px;
  color: #fff;
  font-size: 14px;
}
.el-input >>> #email {
  width: 100%;
  float: left;
}
.imgFl {
  width: 50%;
  height: 40px;
  float: right;
  display: inline-block;
  margin-right: 34px;
}
.email-code >>> .el-input {
  width: 35%;
}
.clear {
  clear: both;
}
</style>







