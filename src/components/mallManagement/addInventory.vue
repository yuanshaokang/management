<template>
  <div>
    <!-- 查看详情弹框 -->
    <el-dialog
      title="新增产品"
      :visible.sync="addInventoryShow"
      width="80%"
      :before-close="handleCloses"
      :close-on-click-modal="false"
    >
      <div class="contbox6_10">
        <!-- <p class="titlelist6_10">
        商城管理
        <span style="color: #999;">&nbsp;&nbsp;/&nbsp;&nbsp;</span>库存列表
        </p>-->
        <div class="sousuojg6_10">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="品牌名称" label-width="100px">
              <el-select
                v-model="formInline.channelName"
                @change="queryChannelTypeList(formInline.channelName)"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="(item,i) in NameList"
                  :key="'a'+i"
                  :label="item.channelName"
                  :value="item.uid"
                ></el-option>
              </el-select>
            </el-form-item>
            <br />
            <el-form-item label="品牌类型" label-width="100px">
              <el-select
                v-model="formInline.BrandType"
                @change="productList"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="(item,i) in BrandTypeList"
                  :key="'b'+i"
                  :label="item.typeName"
                  :value="item.productType"
                ></el-option>
              </el-select>
            </el-form-item>
            <br />
            <el-form-item label="产品型号" label-width="100px">
              <el-select v-model="formInline.productUid" clearable placeholder="请选择">
                <el-option
                  v-for="(item,i) in productListData"
                  :key="'c'+i"
                  :label="item.productNo"
                  :value="item.uid"
                ></el-option>
              </el-select>
            </el-form-item>
            <br />
            <el-form-item label="最少购买数量" label-width="100px">
              <el-input v-model="formInline.saleMinCnt" type="number" placeholder="请输入最少购买数量"></el-input>
            </el-form-item>
            <br />
            <el-form-item label="最多购买数量" label-width="100px">
              <el-input v-model="formInline.saleMaxCnt" type="number" placeholder="请输入最少购买数量"></el-input>
            </el-form-item>

            <p class="shopList"></p>
            <p class="addP">产品SN录入</p>
            <el-form-item label="起始号段" label-width="100px">
              <el-input v-model="formInline.startSn" placeholder="请输入产品起始号段"></el-input>
            </el-form-item>
            <br />
            <el-form-item label="新增数量" label-width="100px">
              <el-input v-model="formInline.snNum" type="number" placeholder="请输入本次录入数量"></el-input>
              <span class="elSp">
                <el-button type="primary" @click="preview">预览</el-button>
              </span>
            </el-form-item>
          </el-form>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCloses">取 消</el-button>
        <el-button type="primary" @click="fromData">确 定</el-button>
      </span>
      <el-dialog
        title="SN序列号详情"
        :visible.sync="dialogVisible"
        width="40%"
        append-to-body
        :before-close="handleClose"
      >
        <el-table
          :data="formInline.sns"
          border
          height="320"
          :header-cell-style="{background:'#DCDCDC',color:'#222'}"
        >
          <el-table-column prop="sn" align="center" label="SN"></el-table-column>
        </el-table>
      </el-dialog>
    </el-dialog>
  </div>
</template>
<script>
import bus from "../../assets/js/bus";
import https from "../../plugins/https.js";
import qs from "qs";
export default {
  props: {
    addInventoryShow: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      NameList: [],
      BrandTypeList: [],
      productListData: [],
      dialogVisible: false,
      previewType: true,
      formInline: {
        channelUid: "",
        BrandType: "",
        productUid: "",
        saleMaxCnt: "",
        saleMinCnt: "",
        startSn: "",
        snNum: "",
        sns: [],
      },
    };
  },
  watch: {
    addInventoryShow(n) {
      if (n === true) {
        // this.queryAgentInfo();
        this.queryChannelNameList(); //品牌名称下拉框
      }
    },
  },
  mounted() {},
  methods: {
    //新增产品校验 提交
    fromData() {
      if (this.formInline.channelName == "")
        return this.$notify({
          title: "错误",
          message: "品牌名称不能未空",
          type: "error",
        });
      if (this.formInline.BrandType == "")
        return this.$notify({
          title: "错误",
          message: "品牌类型不能未空",
          type: "error",
        });
      if (this.formInline.productUid == "")
        return this.$notify({
          title: "错误",
          message: "产品型号不能未空",
          type: "error",
        });
      if (this.formInline.saleMinCnt == "")
        return this.$notify({
          title: "错误",
          message: "最少购买数量不能未空",
          type: "error",
        });
      if (this.formInline.saleMaxCnt == "")
        return this.$notify({
          title: "错误",
          message: "最多购买数量不能未空",
          type: "error",
        });
      if (this.formInline.startSn == "")
        return this.$notify({
          title: "错误",
          message: "起始号段不能未空",
          type: "error",
        });
      if (this.formInline.snNum == "")
        return this.$notify({
          title: "错误",
          message: "新增数量不能未空",
          type: "error",
        });

      if (+this.formInline.saleMinCnt < 1)
        return this.$notify({
          title: "错误",
          message: "重新输入最少购买数量",
          type: "error",
        });
      if (+this.formInline.saleMaxCnt < 1)
        return this.$notify({
          title: "错误",
          message: "重新输入最多购买数量",
          type: "error",
        });

      this.preview(1);
      // setTimeout (() => {
      if (this.previewType === false) return;
      this.formInline.channelUid = this.formInline.BrandType;
      this.formInline.oemUid = localStorage.getItem("uid");
      https.mallSave(this.formInline).then((res) => {
        if (res.data.code !== "0000") {
          this.$notify({ title: "错误", message: res.data.msg, type: "error" });
          return;
        }
        this.$notify({ title: "成功", message: res.data.msg, type: "success" });
        bus.$emit("addInventorySuccess", { type: 1, show: false });
        this.formInline = {
          channelUid: "",
          BrandType: "",
          productUid: "",
          saleMaxCnt: "",
          saleMinCnt: "",
          startSn: "",
          snNum: "",
          sns: [],
        };
      });
      // }, 500)
    },

    // 关闭对话框
    handleClose(n) {
      this.dialogVisible = false;
    },

    // 预览
    preview(n) {
      let regs = new RegExp("[\\u4E00-\\u9FFF]+", "g");
      if (regs.test(this.formInline.startSn)) {
        this.$notify({
          title: "错误",
          message: "起始号段请输入字母开头加数字,或者纯数字",
          type: "error",
        });
        return;
      }
      let reg = /^[a-z](?=\d)[a-z\w]|[0-9]$/;
      if (reg.test(this.formInline.startSn) === false) {
        this.$notify({
          title: "错误",
          message: "起始号段请输入字母开头加数字,或者纯数字",
          type: "error",
        });
        this.previewType = false;
        return;
      }
      if (+this.formInline.snNum === 0) {
        this.$notify({
          title: "错误",
          message: "新增数量请输入纯数字",
          type: "error",
        });
        this.previewType = false;
        return;
      }
      this.formInline.sns = [];
      let newstartSn = this.formInline.startSn.replace(/[^0-9]/gi, "");

      let nums = +newstartSn + "";
      let pl;

      for (let i = 0; i < +this.formInline.snNum; i++) {
        if (+newstartSn.length - nums.length != 0) {
          pl = {
            sn:
              this.formInline.startSn.substring(
                0,
                this.formInline.startSn.length - newstartSn.length
              ) +
              (+newstartSn + i),
          };
          let g = "";
          for (let j = 0; j < +newstartSn.length - nums.length; j++) {
            g = g + "0";
          }
          let newdata = +newstartSn + i + "";

          if (
            newstartSn.length - newdata.length > 0 &&
            newstartSn.length - newdata.length != g.length
          ) {
            g = g.substring(0, g.length - 1);
          }
          if (
            newstartSn.length - newdata.length > 0 &&
            newstartSn.length - newdata.length != g.length
          ) {
            g = g.substring(0, g.length - 1);
          }
          if (
            newstartSn.length - newdata.length > 0 &&
            newstartSn.length - newdata.length != g.length
          ) {
            g = g.substring(0, g.length - 1);
          }
          if (
            newstartSn.length - newdata.length > 0 &&
            newstartSn.length - newdata.length != g.length
          ) {
            g = g.substring(0, g.length - 1);
          }
          if (
            newstartSn.length - newdata.length > 0 &&
            newstartSn.length - newdata.length != g.length
          ) {
            g = g.substring(0, g.length - 1);
          }
          if (newstartSn.length - newdata.length <= 0) {
            g = "";
          }

          pl = {
            sn:
              this.formInline.startSn.substring(
                0,
                this.formInline.startSn.length - newstartSn.length
              ) +
              g +
              (+newstartSn + i),
          };
        } else {
          pl = {
            sn:
              this.formInline.startSn.substring(
                0,
                this.formInline.startSn.length - newstartSn.length
              ) +
              (+newstartSn + i),
          };
        }
        this.formInline.sns.push(pl);
      }
      this.previewType = true;
      n !== 1 && (this.dialogVisible = true);
    },

    // 品牌名称下拉框
    queryChannelNameList() {
      let data = {
        oemUid: localStorage.getItem("uid"),
      };
      https.queryChannelNameList(data).then((res) => {
        if (res.data.code !== "0000") {
          this.$notify({ title: "错误", message: res.data.msg, type: "error" });
          return;
        }
        this.NameList = res.data.data;
      });
    },

    //品牌类型下拉框
    queryChannelTypeList(n) {
      this.formInline.BrandType = "";
      this.formInline.productUid = "";
      this.BrandTypeList = [];
      this.productListData = [];
      if (n === "") return;
      https.queryChannelTypeList({ channelUid: n }).then((res) => {
        if (res.data.code !== "0000") {
          this.$notify({ title: "错误", message: res.data.msg, type: "error" });
          return;
        }
        this.BrandTypeList = res.data.data;
      });
    },

    // 产品型号下拉框
    productList() {
      this.formInline.productUid = "";
      this.productListData = [];
      if (this.formInline.BrandType == "") return;
      https
        .toChannelTypequeryProductList({
          channelType: this.formInline.BrandType,
        })
        .then((res) => {
          if (res.data.code !== "0000") {
            this.$notify({
              title: "错误",
              message: res.data.msg,
              type: "error",
            });
            return;
          }
          this.productListData = res.data.data;
        });
    },
    queryAgentInfo() {
      // https.queryAgentInfo(this.formInline).then(res => {
      //   if (res.data.code !== '0000') {
      //     this.$notify({title: "错误",message: res.data.msg,type: "error"});
      //     return
      //   }
      //   console.log(666, res)
      //   this.tableData = res.data.data
      //   this.totalNum = res.data.total
      // })
    },

    //新增产品关闭对话框
    handleCloses(done) {
      this.formInline = {
        channelUid: "",
        BrandType: "",
        productUid: "",
        saleMaxCnt: "",
        saleMinCnt: "",
        startSn: "",
        snNum: "",
        sns: [],
      };
      bus.$emit("addInventorySuccess", { type: 2, show: false });
    },
  },
};
</script>
<style scoped>
.elSp {
  position: absolute;
  right: -100px;
  top: 0;
}
.addP {
  font-weight: bold;
  margin: 20px 0;
}
.btnExport {
  float: left;
  margin-top: 10px;
  margin-bottom: 10px;
}
.pagination {
  margin-top: 10px;
}
.shopList {
  width: 100%;
  border-bottom: 1px solid #ccc;
  line-height: 50px;
  font-size: 16px;
  height: 30px;
  margin-bottom: 30px;
}
.elbtn {
  float: right;
  margin: 20px;
}
</style>
