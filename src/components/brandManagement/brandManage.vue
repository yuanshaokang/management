<template>
  <div>
    <el-container>
      <el-container>
        <el-main>
          <!-- 放置内容区 -->
          <div class="contbox6_10" v-if="true">
            <p class="titlelist6_10">
              品牌管理
              <span style="color: #999;">&nbsp;&nbsp;/&nbsp;&nbsp;</span>品牌列表
            </p>

            <div class="sousuojg6_10">
              <el-form ref="listQuery" :model="listQuery" label-width="100px">
                <el-row>
                  <el-col class="line" :span="6">
                    <el-form-item label="机构编号">
                      <el-input placeholder="请输入机构编号" v-model="listQuery.officeUid"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="机构类型">
                      <el-select
                        style="width: 100%;"
                        v-model="listQuery.officeType"
                        placeholder="请选择"
                        class="filter-item"
                      >
                        <el-option
                          v-for="item in organizationLsit"
                          :key="item.id"
                          :label="item.label"
                          :value="item.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col class="line" :span="6">
                    <el-form-item label="机构名称">
                      <el-input placeholder="机构名称" v-model="listQuery.officeName"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col class="line" :span="6">
                    <el-form-item label="手机号">
                      <el-input placeholder="手机号" v-model="listQuery.phone"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col class="line" :span="6">
                    <el-form-item label="品牌">
                      <el-input placeholder="品牌" v-model="listQuery.channelName"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="状态">
                      <el-select
                        style="width: 100%;"
                        v-model="listQuery.status"
                        placeholder="请选择"
                        class="filter-item"
                      >
                        <el-option
                          v-for="item in orgType"
                          :key="item.id"
                          :label="item.label"
                          :value="item.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9
                    ">
                    <el-form-item label="创建时间">
                      <el-col :span="10">
                        <el-date-picker
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择开始日期"
                          v-model="listQuery.startDate"
                          style="width: 100%;"
                        ></el-date-picker>
                      </el-col>
                      <el-col class="line" :span="2" style="text-align: center;">-</el-col>
                      <el-col :span="11">
                        <el-date-picker
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择结束日期"
                          v-model="listQuery.endDate"
                          style="width: 100%;"
                        ></el-date-picker>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <div style="float: right;height: 0px;margin-top: 0px">
                    <el-button type="primary" icon="search" @click="handleSelectList">搜索</el-button>
                    <el-button @click="resetTheSearch" type="primary" icon="edit">重置</el-button>
                  </div>
                </el-row>
              </el-form>
            </div>

            <p class="titlelist6_10" style="margin-bottom: 10px; line-height: 45px;">
              品牌列表
              <el-button
                type="button"
                class="el-button el-button--primary"
                style="float: right; margin-right: 30px;"
                v-if="!sign"
                @click="createWindow()"
                icon="plus"
              >创建品牌</el-button>
            </p>
            <div
              style="width: 100%; float: left; border-bottom: 1px solid rgb(238, 238, 238); margin-bottom: 30px;"
            ></div>

            <el-table
              :data="list"
              border
              ref="multipleTable"
              :header-cell-style="{background: 'rgb(220, 220, 220)',color: 'rgb(34, 34, 34)'}"
              style="margin-top: 24px !important;"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column :span="8" align="center" label="机构编号">
                <template slot-scope="scope">
                  <span>{{scope.row.oemUid}}</span>
                </template>
              </el-table-column>
              <el-table-column :span="8" align="center" label="机构类型">
                <template slot-scope="scope">
                  <span>{{scope.row.officeType=="1"?'机构':'OEM'}}</span>
                </template>
              </el-table-column>
              <el-table-column :span="8" align="center" label="机构名称">
                <template slot-scope="scope">
                  <span>{{scope.row.officeName}}</span>
                </template>
              </el-table-column>
              <el-table-column :span="8" align="center" label="手机号">
                <template slot-scope="scope">
                  <span>{{scope.row.phone}}</span>
                </template>
              </el-table-column>
              <el-table-column :span="8" align="center" label="品牌名称">
                <template slot-scope="scope">
                  <span>{{scope.row.channelName}}</span>
                </template>
              </el-table-column>
              <el-table-column :span="8" align="center" label="品牌类型">
                <template slot-scope="scope">
                  <span>{{scope.row.channelType}}</span>
                </template>
              </el-table-column>
              <el-table-column :span="8" align="center" label="通道编号" v-if="sign">
                <template slot-scope="scope">
                  <span>{{scope.row.channelCode}}</span>
                </template>
              </el-table-column>
              <el-table-column :span="8" align="center" label="通道编号" v-if="!sign">
                <template slot-scope="scope">
                  <span>{{scope.row.channelCode}}</span>
                </template>
              </el-table-column>
              <el-table-column :span="8" align="center" label="创建时间">
                <template slot-scope="scope">
                  <span>{{scope.row.createDate}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" width="200">
                <template slot-scope="scope">
                  <el-button
                    size="small"
                    v-if="!sign"
                    type="warning"
                    @click="createWindow(scope.row,2)"
                  >编辑</el-button>
                  <el-button
                    size="small"
                    type="danger"
                    v-if="scope.row.status == 0"
                    @click="handleQuery(scope.row,1)"
                  >停用</el-button>
                  <el-button
                    size="small"
                    type="primary"
                    v-if="scope.row.status == 1"
                    @click="handleQuery(scope.row,0)"
                  >启用</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div style="font-size: 16px;margin-top: 30px">
              <div
                class="filter-container"
                style="float: left; text-align: left; font-size: 16px; color: rgb(31, 165, 243); cursor: pointer; width: auto"
              >
                <el-checkbox v-model="checkedAll" @change="selAll">全选</el-checkbox>
              </div>
              <div
                @click="exportFile"
                class="filter-container"
                style="margin-left:20px;float: left; text-align: left; font-size: 16px; color: rgb(31, 165, 243); cursor: pointer; width: auto"
              >批量导出</div>
              <div style="float: right" v-show="!listLoading" class="pagination-container">
                <el-pagination
                  background
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page.sync="listQuery.page"
                  :page-sizes="[10,20,30,40,50]"
                  :page-size="listQuery.number"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total"
                ></el-pagination>
              </div>
            </div>
          </div>
          <el-dialog
            :close-on-click-modal="false"
            :title="templateTilete"
            :visible.sync="dialogFormBrandList"
          >
            <el-form :model="form" ref="form" label-width="150px">
              <el-row>
                <el-Col :span="12">
                  <el-form-item label="通道编号" prop="channelCode">
                    <el-input v-model="form.channelCode" placeholder="请输入通道编号(选/支付行业必填)"></el-input>
                  </el-form-item>
                </el-Col>
                <el-Col :span="12">
                  <el-form-item label="品牌名称" prop="channelName">
                    <el-input v-model="form.channelName" placeholder="请输入品牌名称"></el-input>
                  </el-form-item>
                </el-Col>
              </el-row>
              <el-row>
                <el-Col
                  :span="12"
                  v-for=" (itms,i) in form.channelTypes"
                  :key="i"
                  v-if="form.channelTypes[i].operaType !== 3"
                >
                  <el-form-item
                    label="品牌类型"
                    :prop="'channelTypes.' + i + '.channelTypeName'"
                    :rules="{ required: true, message: '品牌类型不能为空', trigger: 'blur'}"
                  >
                    <div style="display: flex">
                      <el-input
                        v-model="form.channelTypes[i].channelTypeName"
                        placeholder="请输入品牌类型"
                      ></el-input>
                      <div v-if="!sign" style="display: flex">
                        <el-button
                          style="margin-left: 10px"
                          type="primary"
                          @click="form.channelTypes.push({channelTypeName:'',operaType:'1'})"
                        >增加类型</el-button>
                        <el-button v-if="i != 0" @click="channelTypeStatus(i)">X</el-button>
                      </div>
                    </div>
                  </el-form-item>
                </el-Col>
              </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormBrandList = false">取 消</el-button>
              <el-button type="primary" if="!sign" @click="create('form')">确 定</el-button>
            </div>
          </el-dialog>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import left from './left.vue'
// import footerbox from './footer.vue'
// import headbox from './head.vue'
import ElRow from "element-ui/packages/row/src/row";

export default {
  name: "brandManage",
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      checkedAll: false,
      listQuery: {
        oemUid:
          localStorage.getItem("jurisdiction") != 2
            ? localStorage.getItem("uid")
            : undefined, //OEMid
        channelName: "", //	品牌名称
        channelCode: "", //	品牌编号
        officeType: "", //	机构类型
        officeName: "", //	机构名称
        phone: "", //	手机号
        status: "", //	状态
        startDate: "", //	开始时间
        endDate: "", //	结束时间
        page: 1, //第几页
        number: 10, //每页几条
        officeUid: "",
      },
      // urltype: this.GLOBAL.httpurl,//请求地址
      selectTime: [],
      sign: localStorage.getItem("jurisdiction") == 2, //最高权限看到的true
      templateTilete: "创建品牌信息",
      dialogFormBrandList: false, //创建品牌页面
      multipleSelection: [], //选中的数组
      form: {
        oemUid:
          localStorage.getItem("jurisdiction") != 2
            ? localStorage.getItem("uid")
            : undefined, //OEMid
        uid: undefined, //	品牌id	String	N	修改必传
        channelName: undefined, //	品牌名称	String	Y
        channelCode: undefined, //品牌编号	String	Y	唯一值
        channelTypes: [{ channelTypeName: "" }], //	品牌类型列表	List	Y
        channelTypeName: undefined, //	品牌名称	String	Y
        operaType: undefined, //	操作类型	String	Y	1.新增、2修改、3删除
      },
      organizationLsit: [
        { id: "0", label: "OEM代理" },
        { id: "1", label: "普通代理" },
      ],
      orgType: [
        { id: "0", label: "开通" },
        { id: "1", label: "停用" },
      ],
      rules: {},
    };
  },
  mounted: function () {
    window.scrollTo(0, 0);
    let _this = this;
  },
  components: {
    ElRow,
    // headbox,
    // footerbox,
    // left
  },
  created() {
    let that = this;
    that.handleSelectList();
  },

  methods: {
    /**
     * @author: Zhu Liangfu
     * @Description:刪除类型
     * @date:2020/7/18   22:23
     */
    channelTypeStatus(val) {
      this.$set(this.form.channelTypes[val], "operaType", 3);
    },
    /**
     * @Author： Zhu Liang Fu
     * @Date：2020/7/15
     * @annotation: 全选
     **/
    selAll() {
      if (this.checkedAll) {
        this.list.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    /**
     * @Author： Zhu Liang Fu
     * @Date： 2020/6/10 16:41
     * @annotation： 界面集合获取数据
     **/
    handleSelectList() {
      let that = this;
      that.listLoading = true;
      that
        .axios({
          //axios请求
          method: "POST",
          url: "api/brand/list",
          // headers: {'Content-Type': 'application/json;charset=utf-8'},
          data: that.listQuery,
        })
        .then((res) => {
          if (res.data.code == "0000") {
            that.list = res.data.data;
            that.total = res.data.total;
            that.listLoading = false;
          } else {
            that.listLoading = false;
            that.$notify({
              title: "错误",
              message: res.data.msg,
              type: "error",
            });
          }
        });
    },
    /**
     * @Author： Zhu Liang Fu
     * @Date： 2020/6/10 17:57
     * @annotation： 分页
     **/
    handleSizeChange(val) {
      let that = this;
      that.listQuery.number = val;
      that.handleSelectList();
    },

    /**
     * @Author： Zhu Liang Fu
     * @Date： 2020/6/10 17:57
     * @annotation： 分页
     **/
    handleCurrentChange(val) {
      let that = this;
      that.listQuery.page = val;
      that.handleSelectList();
    },

    /**
     * @Author： Zhu Liang Fu
     * @Date： 2020/6/10 16:41
     * @annotation：  时间格式化
     **/
    timeData(e) {
      let that = this;
      if (e) {
        that.listQuery.startDate = e[0];
        that.listQuery.endDate = e[1];
      } else {
        that.listQuery.startDate = undefined;
        that.listQuery.endDate = undefined;
      }
    },
    /**
     * @author: Zhu Liangfu
     * @Description:新建修改弹框
     * @date:2020/6/10   20:50
     */
    createWindow(val, status) {
      let that = this;
      if (that.$refs["form"] !== undefined) {
        that.$refs["form"].resetFields();
      }
      that.resetTheData();
      if (status == 2) {
        that.templateTilete = "修改品牌信息";
        that
          .axios({
            //axios请求
            method: "POST",
            url: "api/brand/getUpdateBrand",
            // headers: {'Content-Type': 'application/json;charset=utf-8'},
            data: { channelUid: val.uid },
          })
          .then((res) => {
            if (res.data.code == "0000") {
              that.form.uid = val.uid;
              that.form = Object.assign(that.form, res.data.data);
              for (let i = 0; i > this.form.channelTypes.length; i++) {
                this.form.channelTypes[i].operaType = 2;
              }
              that.form.operaType = 2;
              that.dialogFormBrandList = true;
            } else {
              that.listLoading = false;
              that.$notify({
                title: "错误",
                message: res.data.msg,
                type: "error",
              });
            }
          });
      } else {
        that.templateTilete = "创建品牌信息";
        that.form.operaType = 1;
        that.dialogFormBrandList = true;
      }
    },

    /**
     * @author: Zhu Liangfu
     * @Description: 创建品牌或修改
     * @date:2020/6/10   20:10
     */
    create() {
      let that = this;
      that.$refs["form"].validate((valid) => {
        if (valid) {
          that
            .axios({
              method: "POST",
              url: "api/brand/save",
              data: that.form,
            })
            .then((res) => {
              if (res.data.code == "0000") {
                that.$notify({
                  title: "成功",
                  message: "保存成功",
                  type: "success",
                });
                that.handleSelectList();
                that.dialogFormBrandList = false;
              } else {
                that.$notify({
                  title: "错误",
                  message: res.data.msg,
                  type: "error",
                });
                this.dialogFormBrandList = false;
                this.handleSelectList();
              }
            });
        }
      });
    },

    /**
     * @author: Zhu Liangfu
     * @Description: 停用启用状态修改
     * @date:2020/6/14   15:29
     */

    handleQuery(row, status) {
      let that = this;
      if (status == 1) {
        that
          .$confirm(
            "停用后，当前品牌下会员、商品将不做展示，是否继续?",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }
          )
          .then(() => {
            that
              .axios({
                method: "POST",
                url: "api/brand/changeStatus",
                data: { uid: row.uid, status: status },
              })
              .then((res) => {
                if (res.data.code == "0000") {
                  // that.$notify({
                  //   title: "成功",
                  //   message: "停用成功",
                  //   type: "success"
                  // });
                  that.handleSelectList();
                } else {
                  that.$notify({
                    title: "错误",
                    message: "停用失败:" + res.data.msg,
                    type: "error",
                  });
                }
              });
          })
          .catch(() => {
            that.$message({
              type: "info",
              message: "已取消停用",
            });
          });
      } else {
        // that.$confirm('启用后，当前品牌下会员、商品将做展示，是否继续?', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        that
          .axios({
            method: "POST",
            url: "api/brand/changeStatus",
            data: { uid: row.uid, status: status },
          })
          .then((res) => {
            if (res.data.code == "0000") {
              // that.$notify({
              //   title: "成功",
              //   message: "启用成功",
              //   type: "success"
              // });
              that.handleSelectList();
            } else {
              that.$notify({
                title: "错误",
                message: "启用失败:" + res.data.msg,
                type: "error",
              });
            }
          });
        // }).catch(() => {
        //   that.$message({
        //     type: 'info',
        //     message: '已取消启用'
        //   });
        // });
      }
    },

    /**
     * @author: Zhu Liangfu
     * @Description:导出
     * @date:2020/6/11   19:20
     */
    exportFile() {
      let that = this;
      that
        .axios({
          method: "POST",
          url: "api/brand/excel/export",
          data: that.listQuery,
          // responseType: 'arraybuffer'
        })
        .then((res) => {
          let blob = new Blob([res.data], {
            type: "application/vnd.ms-excel;charset=utf-8",
          });
          var link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          let date = new Date();
          link.download =
            "品牌列表" +
            date.getFullYear() +
            (date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()) +
            (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) +
            (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
            (date.getMinutes() < 10
              ? "0" + date.getMinutes()
              : date.getMinutes()) +
            (date.getSeconds() < 10
              ? "0" + date.getSeconds()
              : date.getSeconds());
          link.click();
        })
        .catch((e) => {
          that.$notify({
            title: "错误",
            message: "导出失败",
            type: "error",
          });
        });
    },
    /**
     * @Author： Zhu Liang Fu
     * @Date： 2020/6/10 17:50
     * @annotation： 重置查询条件
     **/
    resetTheData() {
      let that = this;
      that.form = {
        oemUid:
          localStorage.getItem("jurisdiction") != 2
            ? localStorage.getItem("uid")
            : undefined, //OEMid
        uid: undefined, //	品牌id	String	N	修改必传
        channelName: undefined, //	品牌名称	String	Y
        channelCode: undefined, //品牌编号	String	Y	唯一值
        channelTypes: [{ channelTypeName: "" }], //	品牌类型列表	List	Y
        channelTypeName: undefined, //	品牌名称	String	Y
        operaType: undefined, //	操作类型	String	Y	1.新增、2修改、3删除
      };
    },
    /**
     * @Author： Zhu Liang Fu
     * @Date： 2020/6/10 17:50
     * @annotation： 重置查询条件
     **/
    resetTheSearch() {
      let that = this;
      that.listQuery = {
        oemUid:
          localStorage.getItem("jurisdiction") != 2
            ? localStorage.getItem("uid")
            : undefined, //OEMid
        channelName: "", //	品牌名称
        channelCode: "", //	品牌编号
        officeType: "", //	机构类型
        officeName: "", //	机构名称
        phone: "", //	手机号
        status: "", //	状态
        startDate: "", //	开始时间
        endDate: "", //	结束时间
        page: 1, //第几页
        number: 20, //每页几条
      };
      that.selectTime = [];
      that.handleSelectList();
    },
  },
};
</script>

<style>
/* 单独样式 */

.contbox6_10 {
  width: 96%;
  margin-left: 2%;
  height: 87.5vh;
  overflow-x: auto;
  box-sizing: border-box;
  float: left;
}

.titlelist6_10 {
  width: 100%;
  float: left;
  font-size: 16px;
  color: #222;
  margin-top: 40px;
}

.sousuojg6_10 {
  width: 100%;
  float: left;
  font-size: 16px;
  color: #222;
  padding: 30px 10px;
  padding-bottom: 0;
  box-sizing: border-box;
  background-color: #f6f6f6;
  margin-top: 20px;
  border-radius: 5px;
}
</style>
