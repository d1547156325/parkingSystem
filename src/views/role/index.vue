<template>
  <div v-if="token==='systemadmin'" class="app-container operator-segment">
    <Collapse>
      <div slot="controls" class="btn-item" style="display: inline-block">
        <el-form
          slot="content"
          :inline="true"
          class="search-form"
        >
          <el-form-item label="关键字:">
            <el-input v-model="input" placeholder="请输入关键字" size="small" style="width: 140px" />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              size="small"
              @click="fetchData"
            >查询
            </el-button>
            <el-button
              type="primary"
              icon="el-icon-plus"
              size="small"
              @click="gotoAdd"
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
          {{ scope.row.trueName }}
        </template>
      </el-table-column>

      <el-table-column
        prop="spaceAddress"
        label="角色"
        align="center"
      >
        <template slot-scope="scope">
          {{ judgeRole(scope.row.role) }}
        </template>
      </el-table-column>

      <el-table-column
        prop="operate"
        label="操作"
        align="center"
        width="210"
      >
        <template slot-scope="scope">
          <el-button size="small" type="primary" icon="el-icon-edit" @click="gotoUpdate(scope.row)">编辑</el-button>
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

import { listUser } from '@/api/user'
import { getToken } from '@/utils/auth'

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
        size: 10
      },
      listLoading: false,
      list: null,
      token: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 获取数据
    fetchData() {
      this.token = getToken()
      this.listLoading = true
      listUser(this.input, (this.listQuery.current - 1), this.listQuery.size).then(response => {
        this.list = response.data.content
        this.total = response.data.totalElements
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    judgeRole(role) {
      if (role === 'ROLE_SYSADMIN') return '超级管理员'
      else if (role === 'ROLE_ADMIN') return '管理员'
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    gotoAdd() {
      this.$router.push({ path: '/role/userAdd' })
    },
    gotoUpdate(val) {
      // console.log(val)
      this.$router.push({ path: '/role/userUpdate', query: { user: val }})
    }
  }
}
</script>

<style scoped>

</style>
