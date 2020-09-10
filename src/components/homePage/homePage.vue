<template>
  <el-container ref="homePage">
    <!-- 头部 -->

    <el-header class="header">
      <header-box></header-box>
    </el-header>
    <el-container>
      <el-aside id="leftMenu">
        <el-menu
          default-active="$route.path"
          @select="handleOpen"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#a7b1c2"
          active-text-color="#fff"
        >
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>品牌管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">品牌管理</el-menu-item>
              <el-menu-item index="2-2">商品管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商城管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">库存列表</el-menu-item>
              <el-menu-item index="3-2">商城订单列表</el-menu-item>
              <el-menu-item index="3-3">订单派发</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import headerBox from "../header.vue";
export default {
  name: "homePage",
  components: {
    headerBox,
  },
  data() {
    return {
      phone: "",
      levelList: [],
      msgFormSon: "this is msg",
      clientHeight: "",
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
    // 如果 `clientHeight` 发生改变，这个函数就会运行
    clientHeight: function () {
      this.changeFixed(this.clientHeight);
    },
  },
  mounted() {
    this.btitle = this.$route.params.title;
    this.phone = localStorage.getItem("phone");
    this.tian = localStorage.getItem("tian");
    this.getBreadcrumb();

    // 获取浏览器可视区域高度
    this.clientHeight = `${document.documentElement.clientHeight}`;
    //document.body.clientWidth;
    //console.log(self.clientHeight);
    window.onresize = function temp() {
      this.clientHeight = `${document.documentElement.clientHeight}`;
    };
  },
  methods: {
    handleOpen(key, title) {
      switch (key) {
        //     case "1-1":
        //       this.$router.push({
        //         path: "/",
        //         redirect: { name: "login" },
        //       });
        //       break;
        case "2-1":
          this.$router.push({
            name: "brandManage",
            params: { title: "品牌管理" },
          });

          break;

        case "2-2":
          this.$router.push({
            name: "commodityManage",
            params: { title: "商品管理" },
          });
          break;

        case "3-1":
          this.$router.push({
            name: "InventoryList",
            params: { title: "库存列表" },
          });
          break;

        case "3-2":
          this.$router.push({
            name: "mallOrderDelivery",
            params: { title: "商城订单列表" },
          });
          break;

        case "3-3":
          this.$router.push({
            name: "orderSent",
            params: { title: "订单派发" },
          });
          break;

        //     // case '9':
        //     //     this.$router.push({name: 'orderManagement',params:{title:'订单管理'}})
        //     //     break;
        //     // case '10':
        //     //     this.$router.push({name: 'complaintManagement',params:{title:'投诉管理'}});
        //     //     // this.show = true;
        //     //     break;
        //     // case '11':
        //     //     this.$router.push({name: 'networkManagement',params:{title:'关系网管理'}});
        //     //     break;
        //     // case '12':
        //     //     this.$router.push({name: 'bankManagement',params:{title:'银行管理'}});
        //     //     break;
        //     // case '13':
        //     //     this.$router.push({name: 'messagePush',params:{title:'消息推送'}});
        //     //     break;
        //     // case '14':
        //     //     this.$router.push({name: 'actionLog',params:{title:'操作日志'}});
        //     //     break;
        //     // case '15':
        //     //     this.$router.push({name: 'changePassword',params:{title:'修改密码'}});
        //     //     break;
      }
    },
    // 面包屑+动态路由
    getBreadcrumb() {
      let matched = this.$route.matched.filter((item) => item.name);
      const first = matched[0];
      if (
        first &&
        first.name.trim().toLocaleLowerCase() !== "homePage".toLocaleLowerCase()
      ) {
        matched = [
          { path: "/campaignManagement", meta: { title: "活动管理" } },
        ].concat(matched);
      }
      this.levelList = matched;
    },
    getMsgFormSon(data) {
      this.msgFormSon = data;
    },
    changeFixed(clientHeight) {
      //动态修改样式
      // console.log(clientHeight);
      // console.log(this.$refs.homePage.$el.style.height);
      this.$refs.homePage.$el.style.height = clientHeight - 20 + "px";
    },
  },
  computed: {
    defaultActive() {
      return "/" + this.$route.path.split("/").reverse()[0];
    },
  },
};
</script>
<style scoped>
.el-main {
  display: block;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  -ms-flex-preferred-size: auto;
  flex-basis: auto;
  box-sizing: border-box;
  padding: 0 !important;
}

.el-menu {
  height: 100vh;
}

.el-container >>> #leftMenu {
  background-color: rgb(84, 92, 100);
  width: 200px !important;
}
.el-container.is-vertical >>> .el-header {
  padding: 0;
}
.el-submenu >>> .el-submenu__title * {
  color: #fff;
  font-size: 15px !important;
}
li >>> .el-menu-item {
  color: #fff !important;
}
</style>