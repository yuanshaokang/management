<template>
  <div>
    <el-container>
      <el-main>
        <!-- 充值提现 -->
        <div class="contbox6_10">
          <p class="titlelist6_10">
            商城管理
            <span class="text">&nbsp;&nbsp;/&nbsp;&nbsp;</span>订单派发
          </p>
          <div class="sousuojg6_10">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="订单号">
                <el-input v-model="formInline.orderCode" placeholder="请输入订单号"></el-input>
              </el-form-item>
              <el-form-item label="买家手机号">
                <el-input v-model="formInline.phone" placeholder="请输入买家手机号"></el-input>
              </el-form-item>
              <el-form-item label="分配状态">
                <el-select v-model="formInline.distributeStatus" clearable placeholder="请选择">
                  <el-option label="部分分配" value="0"></el-option>
                  <el-option label="未分配" value="1"></el-option>
                  <el-option label="已分配" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="归属OEM">
                <el-input v-model="formInline.oemName" placeholder="请输入归属OEM"></el-input>
              </el-form-item>
              <el-form-item label="下单时间">
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
          <p class="shopList">订单派发列表</p>
          <div class="mt20"></div>
          <el-table
            :data="tableData"
            border
            height="480"
            :header-cell-style="{background:'#DCDCDC',color:'#222'}"
            v-loading="listLoading"
          >
            <el-table-column fixed="left" type="selection" align="center" min-width="40"></el-table-column>
            <el-table-column prop="orderCode" align="center" min-width="250" label="订单号"></el-table-column>
            <el-table-column prop="orderTime" align="center" min-width="200" label="下单时间"></el-table-column>
            <el-table-column prop="officeUid" align="center" min-width="250" label="机构编号"></el-table-column>
            <el-table-column prop="officeName" align="center" min-width="100" label="机构名称"></el-table-column>
            <el-table-column prop="oemName" align="center" min-width="100" label="归属OEM"></el-table-column>
            <el-table-column prop="phone" align="center" min-width="120" label="联系电话"></el-table-column>
            <el-table-column prop="addr" align="center" min-width="300" label="买家地址"></el-table-column>
            <el-table-column prop="productName" align="center" min-width="300" label="产品名称"></el-table-column>
            <el-table-column prop="outOrderCode" align="center" min-width="250" label="出库订单号"></el-table-column>
            <el-table-column align="center" min-width="100" label="分配状态">
              <template slot-scope="scope">
                <span v-if="scope.row.distributeStatus == 0">部分分配</span>
                <span v-if="scope.row.distributeStatus == 1">未分配</span>
                <span v-if="scope.row.distributeStatus == 2">已分配</span>
              </template>
            </el-table-column>
            <el-table-column align="center" fixed="right" min-width="100" label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  @click="queryProductSN(scope.row.orderCode,scope.row.distributeStatus,scope.row.officeUid,scope.row.productUid,scope.row.outOrderCode,scope.row.id)"
                  size="mini"
                >查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button type="primary" @click="payActiveListExport" class="btnExport">批量导出</el-button>
          <el-pagination
            background
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

      <el-dialog
        :title="distributeStatus == 0 || distributeStatus == 1 ? '选择可分配的SN' : '已分配序列号详情'"
        :visible.sync="dialogVisible"
        width="40%"
        append-to-body
        :before-close="handleClose"
      >
        <p
          class="el_pl"
          v-if="distributeStatus == 0 || distributeStatus == 1"
        >代发货数量：{{Distribution}}</p>
        <el-table
          :data="queryProductData"
          border
          height="320"
          :header-cell-style="{background:'#DCDCDC',color:'#222'}"
          v-loading="listLoading1"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            v-if="distributeStatus == 0 || distributeStatus == 1"
            align="center"
            min-width="40"
          ></el-table-column>
          <el-table-column prop="productCode" align="center" label="SN"></el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            v-if="distributeStatus == 0 || distributeStatus == 1"
            @click="distributeSn"
          >分 配</el-button>
        </span>
      </el-dialog>
    </el-container>
  </div>
</template>
<script type="text/ecmascript-6">
import bus from "../../assets/js/bus";
import https from "../../plugins/https.js";
import qs from "qs";
export default {
  data() {
    return {
      ids: "",
      distributeStatus: "",
      outOrderCode: "",
      officeUid: "",
      queryProductData: [],
      dialogVisible: false,
      jurisdiction: "",
      formInline: {
        orderCode: "",
        phone: "",
        distributeStatus: "",
        startDate: "",
        endDate: "",
        page: 1,
        number: 10,
      },
      listLoading1: false,
      listLoading: false,
      dataTime: [],
      eventShow: false,
      machinesShow: false,
      dialogVisible: false,
      totalNum: 0, //总页数
      form: {},
      tableData: [],
      activityType: 1,
      activeUid: "",
      multipleSelection: [],
      Distribution: 0,
      from: false,
    };
  },
  components: {},
  mounted() {
    this.queryPayActiveList();   //搜索  展示列表
    this.jurisdiction = localStorage.getItem("jurisdiction");   //获取权限字段
  },
  methods: {

    //分配按钮
    distributeSn() {
      if (this.multipleSelection.length < 1) {
        this.$notify({
          title: "错误",
          message: "请选择要分配的数据",
          type: "error",
        });
        return;
      }
      if (this.multipleSelection.length > this.Distribution) {
        this.$notify({
          title: "错误",
          message: "超过分配数量，请重新分配",
          type: "error",
        });
        return;
      }

      let sns = [];
      for (let i = 0; i < this.multipleSelection.length; i++) {
        let pl = {
          snUid: this.multipleSelection[i].id,
          sn: this.multipleSelection[i].productCode,
        };
        sns.push(pl);
      }
      let pl = {
        officeUid: this.officeUid,
        sns: sns,
        orderDetailId: this.ids,
        outOrderCode: this.outOrderCode,
      };
      https.distributeSn(pl).then((res) => {
        if (res.data.code !== "0000") {
          this.$notify({ title: "错误", message: res.data.msg, type: "error" });
          return;
        }
        this.$notify({ title: "成功", message: res.data.msg, type: "success" });
        this.dialogVisible = false;
        this.queryPayActiveList();
      });
    },

    //查看按钮
    queryProductSN(
      code,
      distributeStatus,
      officeUid,
      productUid,
      outOrderCode,
      id
    ) {
      this.ids = id;
      this.outOrderCode = outOrderCode;
      this.distributeStatus = distributeStatus;
      this.officeUid = officeUid;
      this.dialogVisible = true;
      this.listLoading1 = true;
      let pl = {
        orderCode: code,
        oemUid: localStorage.getItem("uid"),
        distributeStatus: distributeStatus,
        productUid: productUid,
        outOrderCode: outOrderCode,
      };
      https.queryProductSN(pl).then((res) => {
        if (res.data.code !== "0000") {
          this.$notify({ title: "错误", message: res.data.msg, type: "error" });
          this.listLoading = false;
          this.listLoading1 = false;
          return;
        }
        this.listLoading1 = false;
        this.queryProductData = res.data.data;
        this.Distribution = res.data.residueCnt;
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    //关闭对话框
    handleClose() {
      this.dialogVisible = false;
    },

    // 展示列表
    queryPayActiveList() {
      if (this.from == true) return;
      this.from = true;
      this.listLoading = true;
      if (this.dataTime === null) this.dataTime = [];
      this.formInline.startDate = this.dataTime[0];
      this.formInline.endDate = this.dataTime[1];

      if (localStorage.getItem("jurisdiction") == 0) {
        this.formInline.oemUid = localStorage.getItem("uid");
      }

      https.queryOrderAllot(this.formInline).then((res) => {
        if (res.data.code !== "0000") {
          this.$notify({ title: "错误", message: res.data.msg, type: "error" });
          this.listLoading = false;
          this.from = false;
          return;
        }
        this.tableData = res.data.data;
        this.totalNum = res.data.total;
        this.listLoading = false;
        this.from = false;
      });
    },

    //批量导出
    payActiveListExport() {
      window.location.href = `api/mall/orderAllot/excel/export?${qs.stringify(
        this.formInline
      )}`;
    },

    //每页多少条数据
    handleSizeChange(val) {
      this.formInline.number = val; //动态改变
      this.queryPayActiveList();
    },

    //当前页
    handleCurrentChange(val) {
      this.formInline.page = val; //动态改变
      this.queryPayActiveList();
    },
  },
};
</script>

<style scoped>
.el-main {
  padding: 0 !important;
}
.el_pl {
  margin-bottom: 10px;
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
  text-align: right;
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
</style>
