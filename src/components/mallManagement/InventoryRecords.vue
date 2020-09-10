<template>
  <div>
    <!-- 查看详情弹框 -->
    <el-dialog
      title="出入库记录"
      :visible.sync="recordsShow"
      width="80%"
      :before-close="handleCloses"
      :close-on-click-modal="false"
    >
      <el-table
        :data="tableData"
        border
        height="480"
        :header-cell-style="{background:'#DCDCDC',color:'#222'}"
        v-loading="listLoading"
      >
        <el-table-column fixed="left" prop="batchNo" align="center" min-width="200" label="批次号"></el-table-column>
        <el-table-column prop="createDate" align="center" min-width="200" label="入库时间"></el-table-column>

        <el-table-column
          prop="officeUid"
          align="center"
          min-width="250"
          label="机构编号"
          v-if="jurisdiction==0"
        ></el-table-column>
        <el-table-column
          prop="officeName"
          align="center"
          min-width="180"
          label="机构名称"
          v-if="jurisdiction==0"
        ></el-table-column>
        <el-table-column prop="productName" align="center" min-width="180" label="产品名称"></el-table-column>

        <el-table-column prop="channelType" align="center" min-width="180" label="品牌类型"></el-table-column>
        <el-table-column prop="productNo" align="center" min-width="100" label="产品型号"></el-table-column>

        <el-table-column prop="actualCnt" align="center" min-width="100" label="发生数量"></el-table-column>
        <el-table-column align="center" min-width="100" label="类型">
          <template slot-scope="scope">
            <span v-if="scope.row.actualType == 0">入库</span>
            <span v-if="scope.row.actualType == 1">出库</span>
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="100" label="入库状态">
          <template slot-scope="scope">
            <span v-if="scope.row.inStatus == 0">完全入库</span>
            <span v-if="scope.row.inStatus == 1">部分入库</span>
            <span v-if="scope.row.inStatus == 2">完全未入库</span>
          </template>
        </el-table-column>

        <el-table-column prop="arriveCnt" align="center" min-width="100" label="已入库"></el-table-column>
        <el-table-column prop="unarriveCnt" align="center" min-width="100" label="尚未入库"></el-table-column>

        <el-table-column align="center" min-width="100" label="出库状态">
          <template slot-scope="scope">
            <span v-if="scope.row.outStatus == 0">完全入库</span>
            <span v-if="scope.row.outStatus == 1">部分入库</span>
            <span v-if="scope.row.outStatus == 2">完全未入库</span>
          </template>
        </el-table-column>
        <el-table-column prop="unarriveCnt" align="center" min-width="100" label="已出库"></el-table-column>
        <el-table-column prop="unsendCnt" align="center" min-width="100" label="未出库"></el-table-column>

        <el-table-column prop="remarks" align="center" min-width="300" label="备注"></el-table-column>
      </el-table>

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
  </div>
</template>
<script>
import bus from "../../assets/js/bus";
import https from "../../plugins/https.js";
import qs from "qs";
export default {
  props: {
    recordsShow: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      tableData: [],
      listLoading: false,
      jurisdiction: "",
      formInline: {
        page: 1,
        number: 10,
        oemUid: localStorage.getItem("uid"),
        // officeUid: localStorage.getItem('uid')
      },
      totalNum: 0,
    };
  },
  watch: {
    recordsShow(n) {
      if (n === true) {
        this.queryAgentInfo(); //展示出入库记录列表
      }
    },
  },
  mounted() {
    this.jurisdiction = localStorage.getItem("jurisdiction"); //获取权限字段
  },
  methods: {
    //展示出入库记录列表
    queryAgentInfo() {
      this.listLoading = true;
      https.storeRecordListData(this.formInline).then((res) => {
        if (res.data.code !== "0000") {
          this.$notify({ title: "错误", message: res.data.msg, type: "error" });
          this.listLoading = false;
          return;
        }
        this.listLoading = false;
        this.tableData = res.data.data;
        this.totalNum = res.data.total;
      });
    },

    //关闭对话框
    handleCloses(done) {
      bus.$emit("recordsSuccess", false);
    },

    //每页多少条数据
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
</style>
