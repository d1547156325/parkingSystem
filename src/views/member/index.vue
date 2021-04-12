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
            <el-input v-model="input" placeholder="请输入关键字查询" size="small" style="width: 190px" />
          </el-form-item>
          <el-form-item label="会员类别:">
            <el-select v-model="value" placeholder="请输入会员类别" size="small" @change="fetchData">
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
              @click="fetchData"
            >查询
            </el-button>
            <!--            <el-button-->
            <!--              type="primary"-->
            <!--              icon="el-icon-plus"-->
            <!--              size="small"-->
            <!--              @click="gotoAdd"-->
            <!--            >添加-->
            <!--            </el-button>-->
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
    >
<!--      <el-table-column-->
<!--        type="selection"-->
<!--        width="55"-->
<!--      />-->
      <el-table-column
        prop="spaceId"
        label="会员ID"
        align="center"
        width="120"
      >
        <template slot-scope="scope">
          {{ scope.row.memberId }}
        </template>
      </el-table-column>
      <el-table-column
        prop="carOwner"
        label="车主名称"
        align="center"
        width="120"
      >
        <template slot-scope="scope">
          {{ scope.row.car.carOwner }}
<!--          {{ judgeCarOwner(scope.row.car) }}-->
        </template>
      </el-table-column>

      <el-table-column
        prop="phone"
        label="电话号码"
        align="center"
        width="120"
      >
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column
        prop="carNum"
        label="车牌号码"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.car.carNum }}
        </template>
      </el-table-column>
      <el-table-column
        prop="spaceStatus"
        label="会员类别"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag>{{ judgeSort(scope.row.memberType) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="spaceRemark"
        label="开始日期"
        align="center"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          {{ scope.row.openDate }}
        </template>
      </el-table-column>
      <el-table-column
        prop="spaceRemark"
        label="截止日期"
        align="center"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          {{ scope.row.endDate }}
        </template>
      </el-table-column>
      <!--      <el-table-column-->
      <!--        prop="operate"-->
      <!--        label="操作"-->
      <!--        align="center"-->
      <!--        width="210"-->
      <!--      >-->
      <!--        <template slot-scope="scope">-->
      <!--&lt;!&ndash;          <el-button size="small" type="primary" icon="el-icon-edit">充值</el-button>&ndash;&gt;-->
      <!--&lt;!&ndash;          <el-button size="small" type="primary" icon="el-icon-edit">编辑</el-button>&ndash;&gt;-->
      <!--          &lt;!&ndash;          <el-button v-if="scope.row.spaceStatus !== 2" size="small" type="danger" icon="el-icon-warning">下线</el-button>&ndash;&gt;-->
      <!--          &lt;!&ndash;          <el-button v-if="scope.row.spaceStatus === 2" size="small" type="info" icon="el-icon-info">上线</el-button>&ndash;&gt;-->
      <!--        </template>-->
      <!--      </el-table-column>-->
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
import { listMember } from '@/api/member'
import Collapse from '@/components/Collapse'
import Pagination from '@/components/Pagination'
export default {
  name: 'Member',
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
      options: [{
        value: '1',
        label: '月租卡'
      }, {
        value: '2',
        label: '年租卡'
      }],
      value: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 获取数据
    fetchData() {
      this.listLoading = true
      listMember(this.input, this.value, (this.listQuery.current - 1), this.listQuery.size).then(response => {
        this.list = response.data.content
        this.total = response.data.totalElements
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    // 判断会员类别
    judgeSort(memSort) {
      if (memSort === 1) { return '月租卡' } else if (memSort === 2) { return '年租卡' }
    },
    gotoAdd() {
      this.$router.push({ path: '/member/memberAdd' })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style scoped>

</style>
