<template>
  <div>
    <!-- 查看详情弹框 -->
    <el-dialog
      title="查看详情"
      :visible.sync="listDetailsShow"
      width="80%"
      :before-close="handleCloses"
      :close-on-click-modal="false"
    >
      <div class="sousuojg6_10">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="产品SN">
            <el-input v-model="formInline.productCode" placeholder="请输入产品SN"></el-input>
          </el-form-item>
          <el-form-item label="批次号">
            <el-input v-model="formInline.batchNo" placeholder="请输入批次号"></el-input>
          </el-form-item>
          <el-form-item label="激活状态" class="status">
            <el-select v-model="formInline.merOpenStatus" clearable placeholder="请选择">
              <el-option label="激活" value="0"></el-option>
              <el-option label="未激活" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="来源机构">
            <el-input v-model="formInline.frOfficeName" placeholder="请输入来源机构"></el-input>
          </el-form-item>
          <el-form-item label="归属机构">
            <el-input v-model="formInline.toOfficeName" placeholder="请输入归属机构"></el-input>
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
            <el-button type="primary" @click="queryAgentInfo" icon="el-icon-search" class="btn">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>

      <p class="shopList"></p>

      <el-table
        v-loading="listLoading"
        :data="tableData"
        border
        height="480"
        @selection-change="handleSelectionChange"
        :header-cell-style="{background:'#DCDCDC',color:'#222'}"
      >
        <el-table-column fixed="left" type="selection" align="center" min-width="40"></el-table-column>
        <el-table-column prop="productCode" align="center" min-width="80" label="SN号码" width="180"></el-table-column>
        <el-table-column prop="batchNo" align="center" min-width="200" label="批次号"></el-table-column>
        <el-table-column prop="createDate" align="center" min-width="200" label="入库时间"></el-table-column>
        <el-table-column align="center" min-width="200" label="激活状态">
          <template slot-scope="scope">
            <span v-if="scope.row.merOpenStatus == 0">激活</span>
            <span v-if="scope.row.merOpenStatus == 1">未激活</span>
          </template>
        </el-table-column>
        <el-table-column prop="frOfficeName" align="center" min-width="200" label="来源机构"></el-table-column>
        <el-table-column prop="toOfficeName" align="center" min-width="200" label="归属机构"></el-table-column>
        <el-table-column prop="merName" align="center" min-width="200" label="归属商户"></el-table-column>
        <el-table-column
          prop="address"
          align="center"
          fixed="right"
          min-width="250"
          label="操作"
          v-if="jurisdiction==0"
        >
          <template slot-scope="scope">
            <el-button type="primary" @click="attribution(1,scope.row)" size="mini">修改机具归属</el-button>
            <el-button type="danger" @click="del(1,scope.row.id)" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button
        type="primary"
        @click="officeList()"
        class="btnExport"
        size="mini"
        v-if="jurisdiction==0"
      >批量转让</el-button>
      <el-button type="primary" @click="agentInfoExport" class="btnExport" size="mini">批量导出</el-button>
      <el-button
        type="primary"
        @click="attribution(2)"
        class="btnExport"
        size="mini"
        v-if="jurisdiction==0"
      >批量修改归属</el-button>
      <el-button
        type="danger"
        @click="del(2)"
        class="btnExport"
        size="mini"
        v-if="jurisdiction==0"
      >批量删除</el-button>
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
    </el-dialog>

    <!-- 批量转让 -->
    <el-dialog
      title="批量转让"
      :visible.sync="dialogVisible"
      width="70%"
      append-to-body
      :before-close="dialogVisibleShow"
    >
      <el-form :inline="true" :model="shelves" class="demo-form-inline">
        <el-form-item label="转让对象：" label-width="110px" class="status">
          <el-select v-model="shelves.officeUid" clearable placeholder="请选择">
            <el-option
              v-for="(item,i) in officeListData"
              :label="item.name"
              :value="item.uid"
              :key="'a'+i"
            ></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="转让起始SN：" label-width="110px">
          <el-input v-model="shelves.startSn" placeholder="请输入本次转让起始SN"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="转让数量：" label-width="110px">
          <el-input v-model="shelves.snNum" placeholder="请输入本次转让数量"></el-input>
        </el-form-item>
        <p class="elp">说吗：转让分发的数量按照起始号段开始计算，以此类推</p>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="shelvesData">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改/批量修改机具归属 -->
    <el-dialog
      :title="Ptitle+'机具归属'"
      :visible.sync="dialogVisible1"
      width="60%"
      append-to-body
      :before-close="dialogVisibleShow1"
    >
      <el-form :inline="true" :model="attriData" class="demo-form-inline">
        <el-form-item
          label="选中数量："
          v-if="Ptitle == '批量修改'"
          label-width="100px"
        >{{SelectData.length}}条</el-form-item>
        <br />
        <el-form-item label="来源机构：" label-width="100px">{{attriData.frOfficeName}}</el-form-item>
        <br />
        <el-form-item label="归属机构：" label-width="100px">
          <el-select v-model="attriData.officeUid" clearable placeholder="请选择">
            <el-option
              v-for="(item,i) in officeListData"
              :label="item.name"
              :value="item.uid"
              :key="'a'+i"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleShow1">取 消</el-button>
        <el-button type="primary" @click="updateDeviceAffiliation()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import bus from "../../assets/js/bus";
import https from "../../plugins/https.js";
import qs from "qs";
export default {
  props: {
    listDetailsShow: {
      type: Boolean,
      default() {
        return false;
      },
    },
    Sid: {
      type: String,
    },
    channelUid: {
      type: String,
    },
  },
  data() {
    return {
      Ptitle: "",
      institutionsData: [],
      SelectData: [],
      officeListData: [],
      attriData: {},
      jurisdiction: "",
      shelves: {
        channelUid: "",
        productUid: "",
        officeUid: "",
        startSn: "",
        snNum: "",
      },
      dialogVisible: false,
      dialogVisible1: false,
      formInline: {
        oemUid: localStorage.getItem("uid"),
        productUid: "",
        productCode: "",
        batchNo: "",
        toOfficeName: "",
        frOfficeName: "",
        merOpenStatus: "",
        startDate: "",
        endDate: "",
        page: 1,
        number: 10,
      },
      totalNum: 0, //总页数
      tableData: [],
      listLoading: false,
      detailsData: {},
      dataTime: [],
      sns: [],
    };
  },
  watch: {
    listDetailsShow(n) {
      if (n === true) {
        this.queryAgentInfo();  //查看详情列表展示
        this.officeListDetails();  //转让对象下拉框
      }
    },
  },
  mounted() {
    this.jurisdiction = localStorage.getItem("jurisdiction"); //获取权限字段
  },
  methods: {
    // 修改机具
    updateDeviceAffiliation() {
      let pl = {
        channelUid: this.channelUid,
        productUid: this.Sid,
        officeUid: this.attriData.officeUid,
        sns: this.sns,
      };
      https.updateDeviceAffiliation(pl).then((res) => {
        if (res.data.code !== "0000") {
          this.$notify({ title: "错误", message: res.data.msg, type: "error" });
          return;
        }
        this.$notify({ title: "成功", message: res.data.msg, type: "success" });
        this.dialogVisible1 = false;
        this.attriData = {};
        this.queryAgentInfo();
      });
    },

    // 修改机具归属操作按钮
    attribution(type, row) {
      this.sns = [];
      if (type === 1) {
        this.Ptitle = "修改";
        this.attriData = row;
        this.sns.push({ snUid: row.id });
      } else {
        this.Ptitle = "批量修改";
        if (this.SelectData.length < 1) {
          this.$notify({ title: "错误", message: "请选择数据", type: "error" });
          return;
        }
        this.attriData.frOfficeName = this.SelectData[0].frOfficeName;
        for (let i = 0; i < this.SelectData.length; i++) {
          let pl = { snUid: this.SelectData[i].id };
          this.sns.push(pl);
          this.attriData.frOfficeName =
            this.attriData.frOfficeName +
            "、" +
            this.SelectData[i].frOfficeName;
        }
        this.attriData.frOfficeName = this.attriData.frOfficeName.split("、");
        this.attriData.frOfficeName = Array.from(
          new Set(this.attriData.frOfficeName)
        ).join("、");
      }
      this.dialogVisible1 = true;
    },
    handleSelectionChange(val) {
      this.SelectData = val;
    },

    // 删除按钮
    del(type, id) {
      let uid = [];
      if (type === 1) {
        uid.push({ snUid: +id });
      } else {
        if (this.SelectData.length < 1) {
          this.$notify({ title: "错误", message: "请选择数据", type: "error" });
          return;
        }
        for (let i = 0; i < this.SelectData.length; i++) {
          let pl = { snUid: +this.SelectData[i].id };
          uid.push(pl);
        }
      }
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        https.mallDeleteSn({ uid: uid }).then((res) => {
          if (res.data.code !== "0000") {
            this.$notify({
              title: "错误",
              message: res.data.msg,
              type: "error",
            });
            return;
          }
          this.$notify({ title: "成功", message: res.data.ms, type: "error" });
          this.queryAgentInfo();
        });
      });
    },

    //批量转让
    officeList() {
      this.dialogVisible = true;
    },

    //转让对象下拉框
    officeListDetails() {
      let pl = {
        oemUid: localStorage.getItem("uid"),
        page: 1,
        number: 1000,
      };
      https.officeList(pl).then((res) => {
        if (res.data.code !== "0000") {
          this.$notify({ title: "错误", message: res.data.msg, type: "error" });
          return;
        }
        this.officeListData = res.data.data;
      });
    },

    //批量转让确定按钮
    shelvesData() {
      this.shelves.channelUid = this.channelUid;
      this.shelves.productUid = this.Sid;
      https.deviceTransfer(this.shelves).then((res) => {
        if (res.data.code !== "0000") {
          this.$notify({ title: "错误", message: res.data.msg, type: "error" });
          return;
        }
        this.$notify({ title: "成功", message: res.data.msg, type: "success" });
        this.dialogVisible = false;
        this.queryAgentInfo();
      });
    },

    //批量转让关闭对话框
    dialogVisibleShow() {
      this.dialogVisible = false;
    },

    //修改机具关闭对话框
    dialogVisibleShow1() {
      this.attriData = {};
      this.dialogVisible1 = false;
    },

    //搜索按钮
    queryAgentInfo() {
      this.listLoading = true;
      this.formInline.productUid = this.Sid;
      if (this.dataTime === null) this.dataTime = [];
      this.formInline.startDate = this.dataTime[0];
      this.formInline.endDate = this.dataTime[1];
      https.storeDetailList(this.formInline).then((res) => {
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

    //查看详情关闭对话框
    handleCloses(done) {
      bus.$emit("listDetailsSuccess", false);
    },

    //批量导出
    agentInfoExport() {
      window.location.href =
        this.GLOBAL.httpurl +
        `/api/mall/storeDetailList/excel/export?${qs.stringify(
          this.formInline
        )}`;
    },

    //每页几条数据
    handleSizeChange(val) {
      this.formInline.number = val; //动态改变
      this.queryAgentInfo();
    },

    //当前页
    handleCurrentChange(val) {
      this.formInline.page = val; //动态改变
      this.queryAgentInfo();
    },
  },
};
</script>
<style scoped>
.elp {
  font-size: 12px;
  color: #999;
}
.btnExport {
  float: left;
  margin-top: 10px;
  margin-bottom: 10px;
}
.pagination {
  margin-top: 10px;
  text-align: right;
}
.sousuojg6_10 {
  width: 100%;
  /* float: left; */
  font-size: 16px;
  color: #222;
  padding: 20px 20px;
  padding-bottom: 0;
  box-sizing: border-box;
  background-color: #f6f6f6;
  border-radius: 5px;
}
.shopList {
  width: 100%;
  border-bottom: 1px solid #ccc;
  line-height: 50px;
  font-size: 16px;
  height: 30px;
  margin-bottom: 30px;
}
.search {
  float: right !important;
  height: 0px !important;
  margin-top: 0px !important;
}
</style>
