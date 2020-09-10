<template>
  <div>
    <el-container>
      <!--<el-header style="padding:0;height: 56px;">-->
        <!--<headbox ref="mychild"></headbox>-->
      <!--</el-header>-->
      <!--<el-container>-->
        <!--<el-aside style="width:200px;background-color:#393D49;">-->
          <!--<left></left>-->
        <!--</el-aside>-->
        <el-container>
          <el-main style="padding:0;">  <!-- 放置内容区 -->
            <div class="contbox6_10" v-if="true">
              <p class="titlelist6_10">品牌管理<span style="color: #999;">&nbsp;&nbsp;/&nbsp;&nbsp;</span>商品管理</p>

              <div class="sousuojg6_10">
                <el-form ref="listQuery" :model="listQuery" label-width="100px">
                  <el-row style="float: left">
                    <el-col class="line" :span="6">
                      <el-form-item label="机构编号">
                        <el-input placeholder="请输入机构编号" v-model="listQuery.officeUid"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="机构类型">
                        <el-select style="width: 100%;" v-model="listQuery.officeType" placeholder="请选择"
                                   class="filter-item">
                          <el-option
                            v-for="item in organizationLsit"
                            :key="item.id"
                            :label="item.label"
                            :value="item.id"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="sign">
                      <el-form-item label="产品名称">
                        <el-input placeholder="请输入产品名称" v-model="listQuery.productName"></el-input>
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
                    <el-col class="line" :span="6">
                      <el-form-item label="品牌">
                        <el-input placeholder="请输入品牌名称" v-model="listQuery.channelName"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col class="line" :span="6" v-if="sign">
                      <el-form-item label="类型">
                        <el-input placeholder="请输入品牌类型名称" v-model="listQuery.channelType"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="创建时间">
                        <el-col :span="11">
                          <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择开始日期"
                                          v-model="listQuery.startDate" style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2" style="text-align: center;">-</el-col>
                        <el-col :span="11">
                          <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择结束日期"
                                          v-model="listQuery.endDate" style="width: 100%;"></el-date-picker>
                        </el-col>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="状态">
                        <el-select style="width: 100%;" v-model="listQuery.status" placeholder="请选择"
                                   class="filter-item">
                          <el-option
                            v-for="item in orgType"
                            :key="item.id"
                            :label="item.label"
                            :value="item.id"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <div style="float: right;height: 0px;margin-top: 0px">
                      <el-button type="primary" icon="search" @click="handleSelectList">搜索
                      </el-button>
                      <el-button @click="resetTheSearch" type="primary" icon="edit">重置</el-button>
                    </div>
                  </el-row>
                </el-form>
              </div>

              <p class="titlelist6_10" style="margin-bottom: 10px; line-height: 45px;">商品列表
                <el-button type="button" class="el-button el-button--primary" style="float: right; margin-right: 30px;"
                           v-if="!sign" @click="createWindow(0,1)"
                           icon="plus">添加产品
                </el-button>
              </p>
              <div
                style="width: 100%; float: left; border-bottom: 1px solid rgb(238, 238, 238); margin-bottom: 30px;"></div>
              <el-table :data="list" border ref="multipleTable"
                        :header-cell-style="{background: 'rgb(220, 220, 220)',color:'rgb(34, 34, 34)'}"
                        style="margin-top: 24px !important;">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column :span="8" align="center" label="机构编号">
                  <template slot-scope="scope">
                    <span>{{scope.row.oemUid}}</span>
                  </template>
                </el-table-column>
                <el-table-column :span="8" align="center" label="机构类型">
                  <template slot-scope="scope">
                    <span>{{scope.row.officeType==0?'OEM':'机构'}}</span>
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
                <el-table-column :span="8" align="center" label="机具型号">
                  <template slot-scope="scope">
                    <span>{{scope.row.productNo}}</span>
                  </template>
                </el-table-column>
                <el-table-column :span="8" align="center" label="产品名称" v-if="sign">
                  <template slot-scope="scope">
                    <span>{{scope.row.productName}}</span>
                  </template>
                </el-table-column>
                <el-table-column :span="8" align="center" label="商品名称">
                  <template slot-scope="scope">
                    <span>{{scope.row.productName}}</span>
                  </template>
                </el-table-column>
                <el-table-column :span="8" align="center" label="产品单价（元）">
                  <template slot-scope="scope">
                    <span>{{scope.row.unitAmt}}</span>
                  </template>
                </el-table-column>
                <el-table-column :span="8" align="center" label="创建时间">
                  <template slot-scope="scope">
                    <span>{{scope.row.createDate}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="200">
                  <template slot-scope="scope">
                    <el-button size="small" type="warning" v-if="sign" @click="createWindow(scope.row,2)">查看</el-button>
                    <el-button size="small" type="warning" v-if="!sign" @click="createWindow(scope.row,3)">编辑
                    </el-button>
                    <el-button size="small" type="danger" v-if="scope.row.status == 0"
                               @click="handleQuery(scope.row,1)">
                      停用
                    </el-button>
                    <el-button size="small" type="primary" v-if="scope.row.status == 1"
                               @click="handleQuery(scope.row,0)">
                      启用
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div style="font-size: 16px;margin-top: 30px">
                <div class="filter-container"
                     style="float: left; text-align: left; font-size: 16px; color: rgb(31, 165, 243); cursor: pointer; width: auto">
                  <el-checkbox v-model="checkedAll" @change="selAll">全选</el-checkbox>
                </div>
                <div @click="exportFile" class="filter-container"
                     style="margin-left:20px;float: left; text-align: left; font-size: 16px; color: rgb(31, 165, 243); cursor: pointer; width: auto">
                  批量导出
                </div>
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
            <el-dialog :close-on-click-modal="false" :title="brandListTitle"
                       :visible.sync="dialogFormBrandList">
              <el-form :model="form" :rules="rules" ref="form" label-width="150px">
                <div v-show="numeration =='1'">
                  <el-row>
                    <el-Col :span="12">
                      <el-form-item label="商品品牌" prop="channelUid">
                        <el-select style="width: 100%;" :disabled="sign" v-model="form.channelUid"
                                   @change="channelNameValue"
                                   placeholder="请选择商品品牌"
                                   class="filter-item">
                          <el-option
                            v-for="item in channelNameList"
                            :key="item.uid"
                            :label="item.channelName"
                            :value="item.uid"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-Col>
                    <el-Col :span="12" v-show="form.channelUid">
                      <el-form-item label="品牌类型" prop="channelType">
                        <el-select style="width: 100%;" :disabled="sign" v-model="form.channelType"
                                   placeholder="请选择品牌类型"
                                   class="filter-item">
                          <el-option
                            v-for="item in channelTypeList"
                            :key="item.productType"
                            :label="item.typeName"
                            :value="item.productType"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-Col>
                  </el-row>
                  <el-row>
                    <el-Col :span="12">
                      <el-form-item label="机具型号" prop="productNo">
                        <el-input v-model="form.productNo" :disabled="sign" placeholder="请输入机具型号"></el-input>
                      </el-form-item>
                    </el-Col>
                    <el-Col :span="12">
                      <el-form-item label="产品名称" prop="productName">
                        <el-input v-model="form.productName" :disabled="sign" placeholder="请输入产品名称"></el-input>
                      </el-form-item>
                    </el-Col>
                  </el-row>
                  <el-row>
                    <el-Col :span="12">
                      <el-form-item label="产品单价" prop="unitAmt">
                        <el-input v-model="form.unitAmt" :disabled="sign" placeholder="请输入产品单价">
                          <template slot="append">元</template>
                        </el-input>
                      </el-form-item>
                    </el-Col>
                    <el-Col :span="24">
                      <el-form-item label="产品描述" prop="productDesc">
                        <el-input type="textarea" :disabled="sign" v-model="form.productDesc" placeholder="请输入产品描述">
                        </el-input>
                      </el-form-item>
                    </el-Col>
                  </el-row>
                </div>
                <div v-show="numeration == '2'">
                  <p style="margin-bottom: 10px; line-height: 15px;">配置商品预览图</p>
                  <!--<el-form-item prop="previewPhotos" style="margin-left: 0px !important;">-->
                  <div style="display: flex !important;flex-wrap: wrap;">
                    <div class="imageInfo" v-for="(itms,i) in form.previewPhotos" :key="i">
                      <el-image
                        :src="form.previewPhotos[i].photoPath"
                        style="width: 270px;height: 150px"/>
                      <div class="buttonText" v-if="!sign">
                        <div class="iconText" @click="previewPhotosSlice(i)">X</div>
                        <div class="btn">
                          <el-button :type="form.previewPhotos[i].status == 1?'primary':'danger'" @click="imageOperType(i)">
                            {{form.previewPhotos[i].status == 1?'设置封面':'取消封面'}}
                          </el-button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--</el-form-item>-->
                  <div style="display: flex;text-align: center;line-height: 36px" v-if="!sign">
                    <el-upload
                      class="upload-demo"
                      action
                      ref="upload"
                      :http-request="submitFileSave"
                      :before-upload="beforeAvatarUpload"
                      :show-file-list="false"
                    >
                      <el-button v-if="!sign" size="small" type="primary">上传商品预览图</el-button>
                    </el-upload>
                    <p style="margin-left: 10px">尺寸要求:345：140，请最少上传1张图片,最多可配置3张标题预览图</p>
                  </div>
                  <div
                    style="width: 100%; float: left; border-bottom: 1px solid rgb(238, 238, 238); margin-top: 15px;margin-bottom: 30px;"></div>
                  <p style="margin-bottom: 10px; line-height: 15px;">配置商品详情图</p>
                  <!--<el-form-item prop="detailPhoto" >-->
                  <div style="display: flex !important;flex-wrap: wrap;">
                    <div class="imageInfo" v-for="(itms,i) in  form.detailPhoto" :key="i">
                      <el-image
                        :src="form.detailPhoto[i].photoPath"
                        style="width: 270px;height: 150px"/>
                      <div class="buttonText" style="height:50px !important;" v-if="!sign">
                        <div class="iconText" @click="detailPhotoSlice(i)">X</div>
                      </div>
                    </div>
                  </div>
                  <!--</el-form-item>-->
                  <div style="display: flex;text-align: center;line-height: 36px" v-if="!sign">
                    <el-upload
                      action
                      ref="upload2"
                      :http-request="submitFileSave2"
                      :before-upload="beforeAvatarUpload2"
                      :show-file-list="false">
                      <el-button size="small" type="primary">上传商品配图</el-button>
                    </el-upload>
                    <p style="margin-left: 10px">请最少上传1张图片,最多可配置10张标题商品详情图</p>
                  </div>
                  <div
                    style="width: 100%; float: left; border-bottom: 1px solid rgb(238, 238, 238); margin-top: 15px;"></div>
                </div>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormBrandList = false">取 消</el-button>
                <el-button type="primary" v-if="!sign"
                           @click="numerationStatus(numeration == '1' ?'2':'1')">{{numeration == '1'?'下一页':'上一页'}}
                </el-button>
                <el-button type="primary" v-if="!sign && numeration=='2'" @click="create('form')">确 定</el-button>
              </div>
            </el-dialog>
          </el-main>
          <!--<el-footer style="padding:0;">-->
            <!--<footerbox></footerbox>-->
          <!--</el-footer>-->
        <!--</el-container>-->
      </el-container>
    </el-container>
  </div>

</template>

<script>
  // import left from './left.vue'
  // import footerbox from './footer.vue'
  // import headbox from './head.vue'
  // import ElRow from "element-ui/packages/row/src/row";

  var unitAmts = (rule, value, callback) => {
    var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
    if (value) {
      if (reg.test(value)) {
        return callback();
      } else {
        return callback(new Error('请输入正确的金额'));
      }
    } else {
      return callback(new Error('请输入金额'));
    }
  };
  export default {
    name: 'commodityManage',
    data() {
      return {
        list: null,
        total: null,
        listLoading: true,
        checkedAll: false,
        listQuery: {
          page: 1,
          number: 10,
          oemUid: localStorage.getItem("jurisdiction") != 2 ? localStorage.getItem("uid") : undefined,//OEMid
          channelName: undefined,//	品牌名称
          officeType: undefined,//	机构类型
          officeName: undefined,//	机构名称
          phone: undefined,//	手机号
          channelUid: undefined,//	品牌Uid
          productName: undefined,//	产品名称
          productType: undefined,//	产品类型
          productNo: undefined,//	产品型号
          status: undefined,//	状态
          startDate: undefined,//开始时间
          endDate: undefined,//	结束时间
          channelType: undefined,
        },
        numeration: '1',
        // urltype: this.GLOBAL.httpurl,//请求地址
        selectTime: [],
        sign: localStorage.getItem("jurisdiction") == 2, //最高权限看到的true
        dialogFormBrandList: false,//创建品牌页面
        brandListTitle: '',
        multipleSelection: [],//选中的数组
        channelNameList: [],
        channelTypeList: [],
        form: {
          oemUid: localStorage.getItem("uid"),//OEMid
          uid: undefined,//产品id
          channelName: undefined,
          channelUid: undefined,//	品牌Uid
          productName: undefined,//	产品名称
          channelType: undefined,//	品牌类型
          productNo: undefined,//	产品型号
          productDesc: undefined,//	产品描述
          unitAmt: undefined,//	设备单价
          previewPhotos: [],//	预览图片集合
          status: undefined,//	图片状态
          detailPhoto: [],//	详情图片集合
          photoId: undefined,//	图片id
          photoPath: undefined,//	图片路径
          operaType: undefined,//	操作类型
        },
        fileData: new FormData(),//文件上传对象
        organizationLsit: [{id: '0', label: 'OEM代理'},
          {id: '1', label: '普通代理'}],
        orgType: [{id: '0', label: '开通'},
          {id: '1', label: '停用'}],
        rules: {
          channelUid: [{required: true, message: '请选择品牌名称'}],
          unitAmt: [{required: true, validator: unitAmts, trigger: ''}]
        },
        operaTypeStatus: false,
      }
    },
    components: {
      // ElRow,
      // headbox,
      // footerbox,
      // left
    },
    created() {
      var that = this;
      that.handleSelectList();
    },

    methods: {
      /**
       * @Author： Zhu Liang Fu
       * @Date：2020/7/15
       * @annotation: 全选
       **/
      selAll() {
        if (this.checkedAll) {
          this.list.forEach(row => {
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
        that.list = [];
        that.axios({                             //axios请求
          method: 'POST',
          url: 'api/product/list',
          headers: {'Content-Type': 'application/json;charset=utf-8'},
          data: that.listQuery
        }).then(res => {
          if (res.data.code == '0000') {
            that.list = res.data.data;
            that.total = res.data.total;
            that.listLoading = false;
          } else {
            that.listLoading = false;
            that.$notify({
              title: "错误",
              message: res.msg,
              type: "error"
            });
          }
        })

      },
      /**
       * @author: Zhu Liangfu
       * @Description:查询品牌名称
       * @date:2020/7/13   21:56
       */
      channelNameLists() {
        let that = this;
        //1.1.1.4.1查询品牌名列表
        that.channelNameList = [];
        that.axios({                             //axios请求
          method: 'POST',
          url: 'api/brand/queryChannelNameList',
          headers: {'Content-Type': 'application/json;charset=utf-8'},
          data: {oemUid: that.form.oemUid}
        }).then(res => {
          if (res.data.code == '0000') {
            that.channelNameList = res.data.data;
          } else {
            that.$notify({
              title: "错误",
              message: res.msg,
              type: "error"
            });
          }
        })
      },

      /**
       * @Author： Zhu Liang Fu
       * @Date：2020/7/8
       * @annotation: 查询品牌类型
       **/
      channelNameValue(e) {
        let that = this;
        if (that.form.channelUid) {
          that.channelTypeList = [];
          if (that.brandListTitle != "修改商品信息") {
            that.form.channelType = '';
          }
          that.axios({
            method: 'POST',
            url: 'api/brand/queryChannelTypeList',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            data: {'channelUid': that.form.channelUid}
          }).then(res => {
            if (res.data.code == '0000') {
              that.channelTypeList = res.data.data;
            } else {
              that.$notify({
                title: "错误",
                message: res.msg,
                type: "error"
              });
            }
          })
        }
      },

      /**
       * @Author： Zhu Liang Fu
       * @Date： 2020/6/10 17:57
       * @annotation： 分页
       **/
      handleSizeChange(val) {
        this.listQuery.number = val;
        this.handleSelectList();
      },

      /**
       * @Author： Zhu Liang Fu
       * @Date： 2020/6/10 17:57
       * @annotation： 分页
       **/
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.handleSelectList();
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
       * @Description: 类型运算
       * @date:2020/7/23   19:06
       */
      imageOperType(row){
        let that = this;
        if(that.form.previewPhotos[row].status == 1 ){
          that.form.previewPhotos[row].status = '0';
          that.form.previewPhotos[row].operaType = '2';
        }else {
          that.form.previewPhotos[row].status = '1';
          that.form.previewPhotos[row].operaType = '2';
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
        that.resetForm();
        if (status == 1) {
          that.brandListTitle = "新建商品信息";
        } else if (status == 2 || status == 3) {
          that.axios({
            method: 'POST',
            url: 'api/product/getUpdateProduct',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            data: {productUid: val.uid}
          }).then(res => {
            if (res.data.code == '0000') {
              that.form = Object.assign(that.form, res.data.data);
              that.channelNameValue();
            } else {
              that.$notify({
                title: "错误",
                message: res.data.msg,
                type: "error"
              });
            }
          });
          if (status == 2) {
            that.brandListTitle = "查看商品信息";
          } else {
            that.brandListTitle = "修改商品信息";
          }
          that.form = Object.assign(that.form, val);
        }
        that.channelNameLists();
        that.dialogFormBrandList = true;
      },
      /**
       * @Author： Zhu Liang Fu
       * @Date：2020/7/15
       * @annotation: 下一页
       **/
      numerationStatus(status) {
        let that = this;
        this.$refs['form'].validate(valid => {
          console.log(valid)
          if (valid) {
            that.numeration = status;
          } else {
            that.$notify({
              title: "提示",
              message: "请检查表单完整性",
              type: "error"
            });
          }
        })
      },

      /**
       * @author: Zhu Liangfu
       * @Description: 创建品牌或修改
       * @date:2020/6/10   20:10
       */
      create() {
        let that = this;
        if (that.form.detailPhoto.length < 1) {
          that.$notify({
            title: "提示",
            message: "至少上传一张预览图片",
            type: "error"
          });
          return false;
        }
        if (that.form.previewPhotos.length < 1) {
          that.$notify({
            title: "提示",
            message: "至少上传一张详情图片",
            type: "error"
          });
          return false;
        }
        setTimeout(() => {
          that.axios({
            method: 'POST',
            url: 'api/product/save',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            data: that.form
          }).then(res => {
            if (res.data.code == '0000') {
              if (that.operaTypeStatus) {
                that.operaTypeStatus = false;
                return true;
              } else {
                that.$notify({
                  title: "成功",
                  message: "保存成功",
                  type: "success"
                });
                that.dialogFormBrandList = false;
              }
              that.handleSelectList();
            } else {
              that.$notify({
                title: "错误",
                message: "保存失败:" + res.data.msg,
                type: "error"
              });
            }
          });
        }, 300)
      },
      /**
       * @author: Zhu Liangfu
       * @Description: 删除预览图
       * @date:2020/7/13   18:05
       */
      previewPhotosSlice(row) {
        let that = this;
        that.$confirm('是否删除当前预览图', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (that.brandListTitle == "修改商品信息" && that.form.previewPhotos.length > 1) {
            that.operaTypeStatus = true;
            that.form.previewPhotos[row].operaType = 3;
            that.create();
            if (that.form.previewPhotos[row].photoId) {
              that.fileDelete(that.form.previewPhotos[row].photoId);
            }
            that.form.previewPhotos.splice(row, 1);
          } else if (that.brandListTitle == "新建商品信息" && that.form.previewPhotos.length > 1) {
            that.form.previewPhotos.splice(row, 1);
          } else {
            that.$notify({
              title: "失败",
              message: '至少保留一张预览图',
              type: "error"
            });
          }
        }).catch(e => {
          console.log(e)
          that.$message({
            type: 'info',
            message: '已取消停用'
          });
        });
      }
      ,
      /**
       * @author: Zhu Liangfu
       * @Description: 删除详情图
       * @date:2020/7/13   18:05
       */
      detailPhotoSlice(row) {
        let that = this;
        that.$confirm('是否删除当前预览图', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (that.brandListTitle == "修改商品信息" && that.form.detailPhoto.length > 1) {
            that.operaTypeStatus = true;
            that.form.detailPhoto[row].operaType = 3;
            that.create();
            if (that.form.detailPhoto[row].photoId) {
              that.fileDelete(that.form.detailPhoto[row].photoId);
            }
            that.form.detailPhoto.splice(row, 1);
          } else if (that.brandListTitle == "新建商品信息" && that.form.detailPhoto.length > 1) {
            that.form.detailPhoto.splice(row, 1);
          } else {
            that.$notify({
              title: "失败",
              message: '至少保留一张预览图',
              type: "error"
            });
          }
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消停用'
          });
        });
      }
      ,

      /**
       * @author: Zhu Liangfu
       * @Description:删除图片操作
       * @date:2020/7/14   12:42
       */
      fileDelete(row) {
        var that = this;
        that.axios({
          method: 'POST',
          url: 'api/deletePhoto',
          headers: {'Content-Type': 'application/json;charset=utf-8'},
          data: {'photoId': row}
        }).then(res => {
          if (res.data.code == '0000') {
            return true;
          } else {
            that.$notify({
              title: "错误",
              message: res.data.msg,
              type: "error"
            });
          }
        });
      },
      /**
       * @author: Zhu Liangfu
       * @Description: 状态修改
       * @date:2020/6/14   15:29
       */
      handleQuery(row, status) {
        let that = this;
        if (status == 1) {
          that.$confirm('停用后，当前商品将不做展示，是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            that.axios({
              method: 'POST',
              url:'api/product/changeStatus',
              headers: {'Content-Type': 'application/json;charset=utf-8'},
              data: {'uid': row.uid, 'status': status}
            }).then(res => {
              if (res.data.code == '0000') {
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
                  type: "error"
                });
              }
            });
          }).catch(() => {
            that.$message({
              type: 'info',
              message: '已取消停用'
            });
          });
        } else {
          // that.$confirm('启用后，当前品牌下会员、商品将会展示页面，是否继续?', '提示', {
          //   confirmButtonText: '确定',
          //   cancelButtonText: '取消',
          //   type: 'warning'
          // }).then(() => {
          that.axios({
            url: 'api/product/changeStatus',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            method: 'POST',
            data: {'uid': row.uid, 'status': status}
          }).then(res => {
            if (res.data.code == '0000') {
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
                type: "error"
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
      }
      ,

      /**
       * @author: Zhu Liangfu
       * @Description:导出
       * @date:2020/6/11   19:20
       */
      exportFile() {
        let that = this;
        that.axios({
          method: 'POST',
          url: 'api/product/excel/export',
          headers: {'Content-Type': 'application/json;charset=utf-8'},
          data: that.listQuery,
          responseType: 'arraybuffer'
        }).then(res => {
          let blob = new Blob([res.data], {type: "application/vnd.ms-excel;charset=utf-8"});
          var link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          let date = new Date();
          link.download = "商品管理列表" + date.getFullYear() + (date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()) + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
          link.click();
        }).catch((e) => {
          that.$notify({
            title: "错误",
            message: "导出失败",
            type: "error"
          });
        })
      }
      ,

      /**
       * @author: Zhu Liangfu
       * @Description: 上传预览图
       * @date:2020/7/13   15:00
       */
      submitFileSave() {
        let that = this;
        if (that.form.previewPhotos.length < 3) {
          that.fileData.append("file", this.$refs.upload.uploadFiles[0].raw);
          that.axios({
            method: 'POST',
            url: 'api/fileUpload',
            headers: {'Content-Type': 'multipart/form-data'},
            data: that.fileData,
          }).then(res => {
            console.log(res.data);
            if (res.data.code == '0000') {
              that.form.previewPhotos.push({'photoPath': res.data.data.filePath, 'status': '1', 'operaType': '1'});
              // that.$notify({
              //   title: '成功',
              //   message: '上传成功',
              //   type: 'success'
              // });
            } else {
              that.$notify({
                title: "错误",
                message: res.data.msg,
                type: "error"
              });
            }
            this.fileData.delete("file");
            this.$refs.upload.uploadFiles = [];
          }).catch((e) => {
            this.fileData.delete("file");
            this.$refs.upload.uploadFiles = [];
            that.$notify({
              title: "错误",
              message: "请求出错",
              type: "error"
            });
          })
        } else {
          this.$refs.upload.uploadFiles = [];
          that.$notify({
            title: "警告",
            message: "预览图最大可上传3张，您已上传三张",
            type: "error"
          });
        }
      }
      ,

      /**
       * @author: Zhu Liangfu
       * @Description:上传详情图
       * @date:2020/7/13   15:00
       */
      submitFileSave2() {
        let that = this;
        if (that.form.detailPhoto.length < 7) {
          console.log(this.$refs.upload2.uploadFiles[0].raw)
          that.fileData.append("file", this.$refs.upload2.uploadFiles[0].raw);
          that.axios({
            method: 'POST',
            url: 'api/fileUpload',
            headers: {'Content-Type': 'multipart/form-data'},
            data: that.fileData,
          }).then(res => {
            if (res.data.code == '0000') {
              that.form.detailPhoto.push({'photoPath': res.data.data.filePath, 'status': '1', 'operaType': '1'});
              // that.$notify({
              //   title: '成功',
              //   message: '上传成功',
              //   type: 'success'
              // });
            } else {
              that.$notify({
                title: "错误",
                message: res.data.msg,
                type: "error"
              });
            }
            this.fileData.delete("file");
            this.$refs.upload2.uploadFiles = [];
          }).catch((e) => {
            this.fileData.delete("file");
            this.$refs.upload.uploadFiles = [];
            that.$notify({
              title: "错误",
              message: "请求出错",
              type: "error"
            });
          })
        } else {
          this.$refs.upload2.uploadFiles = [];
          that.$notify({
            title: "警告",
            message: "详情图最大可上传7张，您已上传三张",
            type: "error"
          });
        }
      }
      ,

      /**
       * @author: Zhu Liangfu
       * @Description: 图片校验
       * @date:2020/7/13   15:08
       */
      beforeAvatarUpload(file) {
        const isJPG =
          file.type === "image/jpeg" ||
          file.type === "image/png" ||
          file.type === "image/jpg";
        const isLt2M = file.size / 1024/ 1024 < 1;
        if (!isJPG) {
          this.$message.error(
            "上传预览图片只能是 jpg、jpeg、png 格式!"
          );
          return false;
        }
        if (!isLt2M) {
          this.$message.error("上传图片大小不能超过 1Mb!");
          return false;
        }
        let that = this
        const isSize = new Promise(function (resolve, reject) {
          // let width = 345;
          // let height = 140;
          let _URL = window.URL || window.webkitURL;
          let image = new Image();
          image.onload = function () {
            let valid = that.$commit.ImageRestrictions(image.width,image.height,1)
            valid ? resolve() : reject();
          };
          image.src = _URL.createObjectURL(file);
        }).then(
          () => {
            return file;
          },
          () => {
            this.$message.error("banner图片尺寸不符合,只能是 345：140!");
            return Promise.reject();
          }
        );
        return isJPG && isLt2M && isSize;
      }
      ,

      /**
       * @author: Zhu Liangfu
       * @Description: 图片校验
       * @date:2020/7/13   15:08
       */
      beforeAvatarUpload2(file) {
        let newName = file.name.substring(file.name.lastIndexOf("."));
        const isJPG =
          file.type === "image/jpeg" ||
          file.type === "image/png" ||
          file.type === "image/jpg";
        const isLt2M = file.size / 1024 / 1024 < 1;
        if (!isJPG) {
          this.$message.error(
            "上传预览图片只能是 jpg、jpeg、png 格式!"
          );
          return false;
        }
        if (!isLt2M) {
          this.$message.error("上传图片大小不能超过 1Mb!");
          return false;
        }
        const isSize = new Promise(function (resolve, reject) {
          let _URL = window.URL || window.webkitURL;
          let img = new Image();
          img.onload = function () {
            let name = file.name.substring(0, file.name.lastIndexOf('.')) + '_' + img.width + '_' + img.height + newName
            file = new File([file], name);
            let valid = true;
            valid ? resolve() : reject();
          };
          img.src = _URL.createObjectURL(file);
        }).then(
          () => {
            return file;
          },
          () => {
            this.$message.error("banner图片尺寸不符合,只能是 345：140!");
            return Promise.reject();
          }
        );
        return isJPG && isLt2M && isSize;
      },

      /**
       * @Author： Zhu Liang Fu
       * @Date： 2020/6/10 17:50
       * @annotation： 重置查询条件
       **/
      resetTheSearch() {
        let that = this;
        that.listQuery = {
          page: 1,
          number: 10,
          oemUid: localStorage.getItem("jurisdiction") != 2 ? localStorage.getItem("uid") : undefined,//OEMid
          channelName: undefined,//	品牌名称
          officeType: undefined,//	机构类型
          officeName: undefined,//	机构名称
          phone: undefined,//	手机号
          channelUid: undefined,//	品牌Uid
          productName: undefined,//	产品名称
          productType: undefined,//	产品类型
          productNo: undefined,//	产品型号
          status: undefined,//	状态
          startDate: undefined,//开始时间
          endDate: undefined,//	结束时间
          channelType: undefined,
        };
        that.selectTime = [];
        that.list = null;
        that.handleSelectList();
      }
      ,

      /**
       * @author: Zhu Liangfu
       * @Description: 初始化数据
       * @date:2020/6/10   21:34
       */
      resetForm() {
        let that = this;
        that.form = {
          oemUid: localStorage.getItem("uid"),//OEMid
          uid: undefined,//产品id
          channelUid: undefined,//	品牌Uid
          channelName: undefined,
          productName: undefined,//	产品名称
          channelType: undefined,//	品牌类型
          productNo: undefined,//	产品型号
          productDesc: undefined,//	产品描述
          unitAmt: undefined,//	设备单价
          previewPhotos: [],//	预览图片集合
          status: undefined,//	图片状态
          detailPhoto: [],//	详情图片集合
          photoId: undefined,//	图片id
          photoPath: undefined,//	图片路径
          operaType: undefined,//	操作类型
        };
        that.numeration = '1';
      }
      ,

    },
  }
</script>

<style scoped>       /* 单独样式 */
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

.imageInfo {
  width: 270px;
  height: 150px;
  display: flex;
  flex-wrap: wrap;
  margin: 10px 10px 10px 10px;
}

.buttonText {
  height: 270px;
  width: 150px;
  display: none;
  text-decoration: none;
  font-size: 25px;
}

.iconText {
  position: absolute;
  top: -55px;
  right: 10px;
}

.btn {
  position: absolute;
  bottom: -30px;
  left: 35%;
  right: 50%;
}

.imageInfo:hover .buttonText {
  display: block;
  position: absolute;
  color: #ff3428;
  width: 270px;
  z-index: 2;
  height: 150px;
  line-height: 150px;
  background: #ffffff;
  filter: alpha(opacity=60);
  -moz-opacity: 0.9;
  opacity: 0.9;
}


</style>
