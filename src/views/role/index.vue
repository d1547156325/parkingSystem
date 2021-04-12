<template>
  <div class="app-container operator-segment">
    <Collapse>
      <div slot="controls" class="btn-item" style="display: inline-block">
        <el-form
          slot="content"
          :inline="true"
          class="search-form"
        >
          <el-form-item label="关键字:">
            <el-input v-model="input" placeholder="请输入关键字" size="small" style="width: 120px" />
          </el-form-item>
<!--          <el-form-item label="车位状态:">-->
<!--            <el-select placeholder="请选择车位状态或备注" size="small">-->
<!--              <el-option-->
<!--                v-for="item in options"-->
<!--                :key="item.value"-->
<!--                :label="item.label"-->
<!--                :value="item.value"-->
<!--              />-->
<!--            </el-select>-->
<!--          </el-form-item>-->
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
        label="管理编号"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.userId }}
        </template>
      </el-table-column>
      <el-table-column
        prop="spaceNum"
        label="用户名"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column
        prop="spaceAddress"
        label="姓名"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>

      <el-table-column
        prop="spaceAddress"
        label="角色"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.name }}
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

  </div>
</template>

<script>
import Collapse from '@/components/Collapse'
import Pagination from '@/components/Pagination'
export default {
  name: 'User',
  components: { Collapse, Pagination },

  data() {
    return {
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
      listLoading: false,
      list: [{
        userId: 0,
        username: 'huhu',
        name: '张三'
      }]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 获取数据
    fetchData() {
      // this.listLoading = true
      // eslint-disable-next-line no-undef
      // getList(this.listQuery.current, this.listQuery.size, this.listQuery.experimentId, this.listQuery.experimentStatus).then(response => {
      //   // this.list = response.data
      //   this.total = 1000
      //   this.listLoading = false
      // }).catch(() => {
      //   this.listLoading = false
      // })
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
    }
  }
}
</script>

<style scoped>

</style>
