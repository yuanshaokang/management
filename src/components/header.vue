<template>
  <div class="headbox6_10">
    <!-- <img src="../assets/images/logo.png" alt class="headboximg6_10" /> -->
    <span class="headbox6_10_span">管理系统</span>
    <div class="headboxcont6_10">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{title}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="1">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

 <script>
export default {
  data() {
    return {
      title: localStorage.getItem("name"),
    };
  },
  methods: {
    handleCommand(command) {
      if (command == 1) {
        const h = this.$createElement;
        this.$msgbox({
          title: "提示",
          message: h("p", null, [h("span", null, "是否继续退出? ")]),
          showCancelButton: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          beforeClose: (action, instance, done) => {
            if (action === "confirm") {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = "执行中...";
              setTimeout(() => {
                done();
                this.$router.push({
                  path: "/",
                  redirect: { name: "login" },
                });
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              }, 300);
            } else {
              done();
            }
          },
        }).then((action) => {
          this.$message({
            type: "info",
            message: "您已退出登录",
          });
        });

        localStorage.clear();
      }
    },
    
  },
};
</script>

<style scoped>
.headbox6_10_span {
  display: inline-block;
  font-size: 25px;
  color: white;
  float: left;
  margin-top: 20px;
  margin-left: 40px;
}
.headbox6_10 {
  width: 100%;
  height: 60px;
  background-color: rgb(84, 92, 100);
  float: left;
  position: fixed;
  top: 0;
  z-index: 99;
}
.headboximg6_10 {
  width: 96px;
  height: 48px;
  float: left;
  margin-top: 4px;
  margin-left: 30px;
}
.headboxcont6_10 {
  width: 100px;
  height: 56px;
  line-height: 56px;
  float: right;
}
.el-container.is-vertical >>> .el-header {
  padding: 0;
}
.headbox6_10 .el-dropdown {
  display: block;
}
.headbox6_10 .el-dropdown-link {
  cursor: pointer;
  color: #fff;
  font-size: 15px;
}
.el-container.is-vertical >>> .el-header {
  padding: 0;
}
</style>
