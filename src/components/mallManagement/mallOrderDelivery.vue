<template>
  <div>
    <el-container>
      <el-main>
        <!-- 充值提现 -->
        <div class="contbox6_10">
          <p class="titlelist6_10">
            商城管理
            <span class="text">&nbsp;&nbsp;/&nbsp;&nbsp;</span>商城订单列表
          </p>
          <div class="sousuojg6_10">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="订单号">
                <el-input v-model="formInline.orderCode" placeholder="请输入订单号"></el-input>
              </el-form-item>
              <el-form-item label="买家手机号">
                <el-input v-model="formInline.phone" placeholder="请输入买家手机号"></el-input>
              </el-form-item>
              <el-form-item label="支付状态">
                <el-select v-model="formInline.payStatus" clearable placeholder="请选择">
                  <el-option label="未支付" value="0"></el-option>
                  <el-option label="已付款" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="归属机构" v-if="jurisdiction==2">
                <el-input v-model="formInline.oemName" placeholder="请输入归属机构"></el-input>
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
              <el-form-item label="归属OEM">
                <el-input v-model="formInline.oEMName" placeholder="请输入归属OEM"></el-input>
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
          <p class="shopList">商城订单列表</p>
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
            <el-table-column prop="payTime" align="center" min-width="200" label="支付时间"></el-table-column>
            <el-table-column prop="officeUid" align="center" min-width="250" label="机构编号"></el-table-column>
            <el-table-column prop="officeName" align="center" min-width="100" label="机构名称"></el-table-column>
            <el-table-column prop="oemName" align="center" min-width="250" label="归属机构"></el-table-column>
            <el-table-column prop="phone" align="center" min-width="120" label="联系电话"></el-table-column>
            <el-table-column prop="amount" align="center" min-width="100" label="订单金额"></el-table-column>
            <el-table-column align="center" min-width="100" label="订单状态">
              <template slot-scope="scope">
                <span v-if="scope.row.orderStatus == 0">已下单</span>
                <span v-if="scope.row.orderStatus == 1">取消订单</span>
              </template>
            </el-table-column>
            <el-table-column align="center" min-width="100" label="支付状态">
              <template slot-scope="scope">
                <span v-if="scope.row.payStatus == 0">未支付</span>
                <span v-if="scope.row.payStatus == 1">已付款</span>
              </template>
            </el-table-column>
            <el-table-column align="center" fixed="right" min-width="110" label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  @click="queryOrderDetail(scope.row.orderCode)"
                  size="mini"
                >查看详情</el-button>
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

      <!-- 详情弹框 -->
      <el-dialog title="订单详情" :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
        <el-table
          :data="dialogTableData"
          border
          height="320"
          :header-cell-style="{background:'#DCDCDC',color:'#222'}"
          v-loading="listLoading1"
        >
          <el-table-column prop="channelName" align="center" min-width="250" label="品牌"></el-table-column>
          <el-table-column prop="productNo" align="center" min-width="200" label="型号"></el-table-column>
          <el-table-column prop="channelType" align="center" min-width="100" label="类型"></el-table-column>
          <el-table-column prop="productName" align="center" min-width="250" label="产品"></el-table-column>
          <el-table-column prop="buyNumber" align="center" min-width="100" label="购买数量"></el-table-column>
          <el-table-column prop="sendCnt" align="center" min-width="100" label="发货数量"></el-table-column>
        </el-table>
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
      jurisdiction: "",
      oemUid: "",
      formInline: {
        orderCode: "",
        payStatus: "",
        phone: "",
        startDate: "",
        endDate: "",
        oemName: "",
        page: 1,
        number: 10,
      },
      dialogTableData: [],
      dataTime: [],
      listLoading: false,
      listLoading1: false,
      eventShow: false,
      machinesShow: false,
      dialogVisible: false,
      totalNum: 0, //总页数
      form: {},
      tableData: [],
      activityType: 1,
      activeUid: "",
    };
  },
  components: {},
  mounted() {
    this.queryPayActiveList(); //搜索  展示详情对话框数据
    this.jurisdiction = localStorage.getItem("jurisdiction"); //获取权限字段
    this.oemUid = localStorage.getItem("uid"); //获取uid字段
  },
  methods: {
    //查看详情按钮
    queryOrderDetail(orderCode) {
      this.listLoading1 = true;
      this.dialogVisible = true;
      https.queryOrderDetail({ orderCode: orderCode }).then((res) => {
        if (res.data.code !== "0000") {
          this.$notify({ title: "错误", message: res.data.msg, type: "error" });
          this.listLoading1 = false;
          return;
        }
        this.listLoading1 = false;
        this.dialogTableData = res.data.data;
      });
    },

    //关闭详情对话框
    handleClose(done) {
      this.dialogVisible = false;
    },
    //展示详情对话框数据
    queryPayActiveList() {
      this.listLoading = true;
      if (this.dataTime === null) this.dataTime = [];
      this.formInline.startDate = this.dataTime[0];
      this.formInline.endDate = this.dataTime[1];
      if (localStorage.getItem("jurisdiction") == 0) {
        this.formInline.oemUid = localStorage.getItem("uid");
      }
      https.orderList(this.formInline).then((res) => {
        if (res.data.code !== "0000") {
          this.$notify({ title: "错误", message: res.data.msg, type: "error" });
          this.listLoading = false;
          return;
        }
        this.tableData = res.data.data;
        this.totalNum = res.data.total;
        this.listLoading = false;
      });
    },

    //批量导出
    payActiveListExport() {
      window.location.href = `api/mall/orderList/excel/export?${qs.stringify(
        this.formInline
      )}`;
    },

    //每页多少条
    handleSizeChange(val) {
      this.formInline.number = val; //动态改变
      this.queryPayActiveList();
    },
    // 显示当前页
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
.search {
  float: right !important;
  height: 0px !important;
  margin-top: 0px !important;
}
</style>
