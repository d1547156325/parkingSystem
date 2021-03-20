<template>
  <div class="app-container operator-segment">
    <Collapse>
      <div slot="controls" class="btn-item" style="display: inline-block">
        <el-form
          slot="content"
          :inline="true"
          class="search-form"
        >
          <el-form-item label="车位:">
            <el-input v-model="input" placeholder="请输入关键词查询" size="small" style="width: 170px" />
          </el-form-item>
          <el-form-item label="车位状态:">
            <el-select placeholder="请选择车位状态或备注" size="small">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              size="small"
            >查询
            </el-button>
            <el-button
              type="primary"
              icon="el-icon-plus"
              size="small"
              @click="addVisible = true"
            >添加
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </Collapse>

    <el-table
      v-loading="listLoading"
      element-loading-text="正在加载"
      tooltip-effect="dark"
      :data="list"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        prop="spaceId"
        label="车位ID"
        align="center"
        width="180"
      >
        <template slot-scope="scope">
          {{ scope.row.spaceId }}
        </template>
      </el-table-column>
      <el-table-column
        prop="spaceNum"
        label="车位编号"
        align="center"
        width="180"
      >
        <template slot-scope="scope">
          {{ scope.row.spaceNum }}
        </template>
      </el-table-column>
      <el-table-column
        prop="spaceAddress"
        label="所需区域"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.spaceAddress }}
        </template>
      </el-table-column>
      <el-table-column
        prop="spaceStatus"
        label="车位状态"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.spaceStatus == 1? 'success':'info' ">{{ judgeStatus(scope.row.spaceStatus) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="spaceRemark"
        label="车位备注"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.spaceRemark == 1? 'success':'info'">{{ judgeRemark(scope.row.spaceRemark) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="spaceRemark"
        label="停车号码"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.spaceLin }}
        </template>
      </el-table-column>
      <el-table-column
        prop="operate"
        label="操作"
        align="center"
        width="210"
      >
        <template slot-scope="scope">
          <el-button size="small" type="primary" icon="el-icon-edit">编辑</el-button>
          <el-button v-if="scope.row.spaceStatus !== 2" size="small" type="danger" icon="el-icon-warning">下线</el-button>
          <el-button v-if="scope.row.spaceStatus === 2" size="small" type="info" icon="el-icon-info">上线</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.current"
      :limit.sync="listQuery.size"
      @pagination="fetchData"
    />

    <!--    添加弹出框-->
    <el-dialog
      title="添加车位"
      :visible.sync="addVisible"
      width="30%"
      center
    >
      <el-form ref="noticeBox" :model="form" label-width="100px">
        <el-form-item label="区域编号">
          <el-select v-model="form.spaceAddress" placeholder="请选择区域编号" style="width: 250px">
            <el-option label="A" value="A" />
            <el-option label="B" value="B" />
          </el-select>
        </el-form-item>
        <el-form-item label="车位编号">
          <el-input v-model="form.spaceNum" placeholder="请输入车位编号" style="width: 250px" />
        </el-form-item>
        <el-form-item label="车位备注">
          <el-select v-model="form.spaceRemark" placeholder="请选择车位备注" style="width: 250px">
            <el-option label="自由车位" value="0" />
            <el-option label="固定车位" value="1" />
          </el-select>
        </el-form-item>
        <label v-if="form.spaceRemark === '1'">
          <el-form-item label="固定车">
            <el-input v-model="form.spaceLin" placeholder="固定车车牌号(可暂为空)" style="width: 250px" />
          </el-form-item>
        </label>
        <el-form-item>
          <!--          <el-button type="primary" @click="onSubmit">创建</el-button>-->
          <!--          <el-button @click="goToIndex()">返回</el-button>-->
        </el-form-item>
      </el-form>
      <!--      <span>需要注意的是内容是默认不居中的</span>-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('noticeBox')">清空</el-button>
        <el-button type="primary" @click="addVisible = false">添加</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import { listSpace } from '@/api/space'
import Collapse from '@/components/Collapse'
import Pagination from '@/components/Pagination'
export default {
  name: 'Space',
  components: { Collapse, Pagination },

  data() {
    return {
      addVisible: false,
      currentPage1: 1,
      radio: -1,
      multipleSelection: [],
      input: '',
      total: 1,
      listQuery: {
        current: 1,
        size: 10,
        spaceId: null,
        spaceNum: null
      },
      form: {
        spaceId: '',
        spaceNum: '',
        spaceAddress: '',
        spaceStatus: '',
        spaceRemark: '',
        spaceLin: ''
      },
      listLoading: false,
      list: [{
        spaceId: 201316131,
        spaceNum: 'A005',
        spaceAddress: 'A区',
        spaceStatus: 1,
        spaceRemark: '固定车主车位',
        spaceLin: '浙A156326'
      },
      {
        spaceId: 201316131,
        spaceNum: 'A005',
        spaceAddress: 'A区',
        spaceStatus: 1,
        spaceRemark: '固定车主车位',
        spaceLin: '浙A156326'
      },
      {
        spaceId: 201316131,
        spaceNum: 'A005',
        spaceAddress: 'A区',
        spaceStatus: 1,
        spaceRemark: '固定车主车位',
        spaceLin: '浙A156326'
      },
      {
        spaceId: 201316131,
        spaceNum: 'A005',
        spaceAddress: 'A区',
        spaceStatus: 2,
        spaceRemark: '固定车主车位',
        spaceLin: '暂无'
      }]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 获取数据
    fetchData() {
      this.listLoading = true
      // eslint-disable-next-line no-undef
      listSpace(this.input, -1, -1, this.listQuery.current, this.listQuery.size).then(response => {
        this.list = response.data
        this.total = 1000
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    // 判断状态
    judgeStatus(spaceStatus) {
      if (spaceStatus === 1) { return '已占用' } else if (spaceStatus === 0) { return '未占用' } else { return '已下线' }
    },
    // 判断备注
    judgeRemark(spaceRemark) {
      if (spaceRemark === 1) { return '固定车主车位' } else { return '自由车位' }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    gotoAdd() {
      this.$router.push({ path: '/space/add' })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>

</style>
