<template>
  <div>
    <el-container>
      <el-main>
        <!-- 充值提现 -->
        <div class="contbox6_10">
          <p class="titlelist6_10">
            商城管理
            <span class="text">&nbsp;&nbsp;/&nbsp;&nbsp;</span>库存列表
          </p>
          <div class="sousuojg6_10">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="品牌名称">
                <el-input v-model="formInline.channelName" placeholder="请输入品牌名称"></el-input>
                <!-- <el-select v-model="formInline.channelName" @change="queryChannelTypeList(formInline.channelName)" clearable placeholder="请选择">
              <el-option v-for="(item,i) in NameList" :key="'a'+i" :label="item.channelName" :value="item.uid"></el-option>
                </el-select>-->
              </el-form-item>
              <!-- <el-form-item label="品牌类型" class="status"> -->
              <!-- <el-input v-model="formInline.BrandType" placeholder="请输入品牌类型"></el-input> -->
              <!-- <el-select v-model="formInline.BrandType" @change="productList" clearable placeholder="请选择">
              <el-option v-for="(item,i) in BrandTypeList" :key="'b'+i" :label="item.typeName" :value="item.productType"></el-option>
              </el-select>-->
              <!-- </el-form-item> -->
              <el-form-item label="产品型号" class="status">
                <el-input v-model="formInline.productCode" placeholder="请输入产品型号"></el-input>
              </el-form-item>
              <el-form-item label="归属机构" class="status">
                <el-input v-model="formInline.officeName" placeholder="请输入归属机构"></el-input>
              </el-form-item>

              <el-form-item label="库存状态" class="status">
                <el-select v-model="formInline.status" clearable placeholder="请选择">
                  <el-option label="启用" value="0"></el-option>
                  <el-option label="停用" value="1"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="机构编号" class="status" v-if="jurisdiction==2">
                <el-input v-model="formInline.officeUid" placeholder="请输入机构编号"></el-input>
              </el-form-item>

              <el-form-item label="机构名称" class="status" v-if="jurisdiction==2">
                <el-input v-model="formInline.organizationName" placeholder="请输入机构名称"></el-input>
              </el-form-item>

              <el-form-item label="入库时间">
                <el-date-picker
                  v-model="dataTime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
              <el-form-item class="search">
                <el-button
                  type="primary"
                  @click="queryPayActiveList"
                  icon="el-icon-search"
                  class="btn"
                >搜索</el-button>
              </el-form-item>
            </el-form>
          </div>

          <p class="shopList">
            库存列表
            <span>
              <el-button type="primary" @click="recordsShow = true" class="elbtn">出入库记录</el-button>
              <el-button
                type="primary"
                @click="addInventoryShow = true"
                class="elbtn"
                v-if="jurisdiction==0"
              >新增产品</el-button>
            </span>
          </p>

          <div class="mt20"></div>
          <el-table
            :data="tableData"
            border
            height="480"
            :header-cell-style="{background:'#DCDCDC',color:'#222'}"
            v-loading="listLoading"
          >
            <el-table-column fixed="left" type="selection" align="center" min-width="40"></el-table-column>
            <el-table-column prop="officeUid" align="center" min-width="250" label="机构编号"></el-table-column>
            <el-table-column prop="officeName" align="center" min-width="200" label="机构名称"></el-table-column>
            <el-table-column prop="channelName" align="center" min-width="200" label="品牌"></el-table-column>
            <el-table-column prop="productNo" align="center" min-width="200" label="型号"></el-table-column>
            <el-table-column prop="allCnt" align="center" min-width="100" label="总库存"></el-table-column>
            <el-table-column prop="saledCnt" align="center" min-width="100" label="卖出/转让"></el-table-column>
            <el-table-column prop="leftCnt" align="center" min-width="100" label="库存数量"></el-table-column>
            <el-table-column prop="shopUpCnt" align="center" min-width="100" label="上架数量"></el-table-column>
            <el-table-column align="center" fixed="right" min-width="100" label="状态">
              <template slot-scope="scope">
                <span v-if="scope.row.status == 0">启用</span>
                <span v-if="scope.row.status == 1">停用</span>
              </template>
            </el-table-column>
            <el-table-column align="center" fixed="right" min-width="350" label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  @click="Details(scope.row.productUid,scope.row.channelUid)"
                  size="mini"
                >查看详情</el-button>
                <el-button
                  type="primary"
                  @click="mallShopUpdate(scope.row,0)"
                  size="mini"
                  v-if="jurisdiction==0"
                >上架</el-button>
                <el-button
                  type="danger"
                  @click="mallShopUpdate(scope.row,1)"
                  size="mini"
                  v-if="jurisdiction==0"
                >下架</el-button>
                <el-button
                  type="primary"
                  v-if="scope.row.status == '1'"
                  @click="updateStatus(scope.row.id,0)"
                  size="mini"
                >启用</el-button>
                <el-button
                  type="danger"
                  v-if="scope.row.status == '0'"
                  @click="updateStatus(scope.row.id,1)"
                  size="mini"
                >停用</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button type="primary" @click="payActiveListExport" class="btnExport">批量导出</el-button>
          <el-pagination
            background
            style="text-align: right;"
            class="pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="formInline.page"
            :page-size="formInline.number"
            layout="total, sizes, prev, pager, next, jumper"
            :page-sizes="[10,20,30,40, 50]"
            :total="totalNum"
          ></el-pagination>
        </div>
      </el-main>

      <!-- 查看活动详情 -->
      <listDetails
        :listDetailsShow="listDetailsShow"
        :Sid="Sid"
        :channelUid="channelUid"
        v-on="listDetailsSuccess()"
      ></listDetails>

      <!-- 新增 -->
      <addInventory :addInventoryShow="addInventoryShow" v-on="addInventorySuccess()"></addInventory>

      <!-- 出入库记录 -->
      <InventoryRecords :recordsShow="recordsShow" v-on="recordsSuccess()"></InventoryRecords>

      <!-- 上/下架 -->
      <el-dialog
        :title="titles + '操作'"
        :visible.sync="dialogVisible"
        width="70%"
        append-to-body
        :before-close="dialogVisibleShow"
      >
        <el-form :inline="true" :model="shelves" class="demo-form-inline">
          <el-form-item label="库存总数：">{{shelves.allCnt}}</el-form-item>
          <br />
          <el-form-item label="在架数量：">{{shelves.shopUpCnt}}</el-form-item>
          <br />
          <el-form-item v-if="titles=='下架'" :label="'可'+titles+'数量：'">{{shelves.shopUpCnt}}</el-form-item>
          <el-form-item
            v-if="titles=='上架'"
            :label="'可'+titles+'数量：'"
          >{{shelves.allCnt - shelves.shopUpCnt}}</el-form-item>
          <br />
          <el-form-item :label="'本次'+titles+ '：'">
            <el-input v-model="shelves.num" type="number" :placeholder="'请输入本次'+titles+'数量'"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" :disabled="+shelves.leftCnt < 1" @click="shelvesData">确 定</el-button>
        </span>
      </el-dialog>
    </el-container>
  </div>
</template>
<script type="text/ecmascript-6">
import listDetails from "./ListDetails";
import addInventory from "./addInventory";
import InventoryRecords from "./InventoryRecords";
import bus from "../../assets/js/bus";
import https from "../../plugins/https.js";
import qs from "qs";
export default {
  data() {
    return {
      shelvesId: "",
      titles: "",
      shelves: {},
      dialogVisible: false,
      NameList: [],
      BrandTypeList: [],
      productListData: [],
      listDetailsShow: false,
      addInventoryShow: false,
      recordsShow: false,
      channelUid: "",
      listLoading: false,
      Sid: "",
      jurisdiction: "",
      formInline: {
        status: "",
        startDate: "",
        endDate: "",
        page: 1,
        number: 10,
        BrandType: "",
        channelUid: "",
        productUid: "",
        productCode: "",
        // oemUid: localStorage.getItem('uid'),
        officeUid: "", //机构编号
        organizationName: "", //机构名
      },
      dataTime: [],
      eventShow: false,
      machinesShow: false,
      dialogVisible: false,
      totalNum: 0, //总页数
      form: {},
      tableData: [],
      activityType: 1,
      activeUid: "",
      from: false,
    };
  },
  components: {
    listDetails,  //查看详情
    addInventory,   //新增产品
    InventoryRecords,   //出入库记录
  },
  mounted() {
    // this.queryChannelNameList();
    this.queryPayActiveList();  //展示列表
    this.jurisdiction = localStorage.getItem("jurisdiction");   //权限字段获取
  },
  methods: {
    // 查看详情
    Details(id, channelUid) {
      this.Sid = id;
      this.channelUid = channelUid;
      this.listDetailsShow = true;
    },
    // 上下架关闭对话框 
    dialogVisibleShow() {
      this.dialogVisible = false;
      this.shelves = {};
    },

    // 操作上架 下架切换
    mallShopUpdate(row, type) {
      this.shelvesId = row.id;
      this.dialogVisible = true;
      this.shelves = JSON.parse(JSON.stringify(row));
      // this.shelves.num = ''
      this.titles = type === 0 ? "上架" : "下架";
    },

    // 上架 输入框
    shelvesData() {
      if (+this.shelves.num < 1) {
        this.$notify({
          title: "错误",
          message: "请重新输入本次上架数量",
          type: "error",
        });
        return;
      }
      let pl = {
        id: this.shelvesId,
        shopUpCnt: +this.shelves.num,
        shopUpStatus: this.titles === "上架" ? 0 : 1,
      };
      if (
        this.titles == "上架" &&
        +this.shelves.num > this.shelves.allCnt - this.shelves.shopUpCnt
      ) {
        this.$notify({
          title: "错误",
          message: "本次" + this.titles + "，不可超过" + this.titles + "数量",
          type: "error",
        });
        return;
      }
      if (this.titles == "下架" && +this.shelves.num > this.shelves.shopUpCnt) {
        this.$notify({
          title: "错误",
          message: "本次" + this.titles + "，不可超过" + this.titles + "数量",
          type: "error",
        });
        return;
      }
      if (this.shelves.num == "" || this.shelves.num == undefined)
        return this.$notify({
          title: "错误",
          message: this.titles + "数量不能为空",
          type: "error",
        });
      https.mallShopUpdate(pl).then((res) => {
        if (res.data.code !== "0000") {
          this.$notify({ title: "错误", message: res.data.msg, type: "error" });
          this.dialogVisible = false;
          return;
        }
        this.dialogVisible = false;
        this.shelves = {};
        this.$notify({ title: "成功", message: res.data.msg, type: "success" });
        this.queryPayActiveList();
      });
    },
    // queryChannelTypeList(n) {
    //   this.formInline.BrandType = "";
    //   this.formInline.productUid = "";
    //   this.BrandTypeList = [];
    //   this.productListData = [];
    //   if (n === "") return;
    //   https.queryChannelTypeList({ channelUid: n }).then((res) => {
    //     if (res.data.code !== "0000") {
    //       this.$notify({ title: "错误", message: res.data.msg, type: "error" });
    //       return;
    //     }
    //     this.BrandTypeList = res.data.data;
    //   });
    // },
    // productList() {
    //   console.log(222);
    //   this.formInline.productUid = "";
    //   this.productListData = [];
    //   if (this.formInline.BrandType == "") return;
    //   https
    //     .toChannelTypequeryProductList({
    //       channelType: this.formInline.BrandType,
    //     })
    //     .then((res) => {
    //       if (res.data.code !== "0000") {
    //         this.$notify({
    //           title: "错误",
    //           message: res.data.msg,
    //           type: "error",
    //         });
    //         return;
    //       }
    //       this.productListData = res.data.data;
    //     });
    // },

    // 启用停用按钮切换
    updateStatus(uid, status) {
      let title;
      if (status == "1") {
        title = "停用后,此商品不在APP展示，用户无法购买";
      } else {
        title = "启用后,此商品将重新展示在APP中，用户可见可购买";
      }
      this.$confirm(title, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.changeStatusInterface(uid, status);
      });
    },

    //启用停用操作调用接口
    changeStatusInterface(uid, status) {
      let pl = {
        uid: uid,
        status: status,
      };
      https.updateStatus(pl).then((res) => {
        if (res.data.code !== "0000") {
          this.$notify({ title: "错误", message: res.data.msg, type: "error" });
          return;
        }
        this.queryPayActiveList();
        this.$notify({ title: "成功", message: res.data.msg, type: "success" });
      });
    },
    // queryChannelNameList() {
    //   let data = {
    //     oemUid: localStorage.getItem("uid"),
    //   };
    //   https.queryChannelNameList(data).then((res) => {
    //     if (res.data.code !== "0000") {
    //       this.$notify({ title: "错误", message: res.data.msg, type: "error" });
    //       return;
    //     }
    //     this.NameList = res.data.data;
    //   });
    // },

    // 显示列表
    queryPayActiveList() {
      if (this.from == true) return;
      this.from = true;
      this.listLoading = true;
      if (this.dataTime === null) this.dataTime = [];
      this.formInline.startDate = this.dataTime[0];
      this.formInline.endDate = this.dataTime[1];
      this.formInline.channelUid = this.formInline.BrandType;

      if (localStorage.getItem("jurisdiction") == 0) {
        this.formInline.oemUid = localStorage.getItem("uid");
      }

      https.mallList(this.formInline).then((res) => {
        if (res.data.code !== "0000") {
          this.$notify({ title: "错误", message: res.data.msg, type: "error" });
          this.listLoading = false;
          this.from = false;
          return;
        }
        this.tableData = res.data.data;
        this.totalNum = res.data.total;
        this.from = false;
        this.listLoading = false;
      });
    },

    //批量导出
    payActiveListExport() {
      window.location.href = `api/mall/excel/export?${qs.stringify(
        this.formInline
      )}`;
    },

    //分页 每页多少条数据
    handleSizeChange(val) {
      this.formInline.number = val; //动态改变
      this.queryPayActiveList();
    },

    //分页 当前页
    handleCurrentChange(val) {
      this.formInline.page = val; //动态改变
      this.queryPayActiveList();
    },

    //查看活动详情
    listDetailsSuccess() {
      bus.$on("listDetailsSuccess", (res) => {
        this.listDetailsShow = res;
      });
    },

    // 新增产品
    addInventorySuccess() {
      bus.$on("addInventorySuccess", (res) => {
        this.addInventoryShow = res.show;
        if (res.type == 1) {
          this.queryPayActiveList();
        }
      });
    },

    //出入库记录
    recordsSuccess() {
      bus.$on("recordsSuccess", (res) => {
        this.recordsShow = res;
      });
    },
  },
};
</script>

<style scoped>
.el-main{
  padding: 0 !important;
}
.elP {
  width: 100%;
  margin: 20px 0;
  font-size: 15px;
  font-weight: 500;
}
.elbtn {
  float: right;
  margin: 20px;
}
.img {
  display: block;
  width: 100%;
}
.money p {
  width: 100%;
  line-height: 30px;
}
.status {
  font-size: 14px;
  margin-bottom: 20px;
}
.color {
  color: #e6a23c;
}
.mt20 {
  margin-top: 20px;
}
.shopList {
  width: 100%;
  border-bottom: 1px solid #ccc;
  line-height: 80px;
  font-size: 16px;
}
.formItem {
  float: left;
}
.pagination {
  margin-top: 10px;
}
.btnExport {
  float: left;
  margin-top: 10px;
  margin-bottom: 10px;
}
.btn {
  float: right;
}
.titlelist6_10 {
  width: 100%;
  float: left;
  font-size: 16px;
  color: #222;
  margin-top: 40px;
}
.contbox6_10 {
  width: 96%;
  margin-left: 2%;
  /*  height: 87.5vh; */
  overflow-x: auto;
  box-sizing: border-box;
  float: left;
}
.sousuojg6_10 {
  width: 100%;
  float: left;
  font-size: 16px;
  color: #222;
  padding: 30px 20px;
  padding-bottom: 0;
  box-sizing: border-box;
  background-color: #f6f6f6;
  margin-top: 20px;
  border-radius: 5px;
}
.text {
  color: #999;
}
.search {
  float: right !important;
  height: 0px !important;
  margin-top: 0px !important;
}
</style>
