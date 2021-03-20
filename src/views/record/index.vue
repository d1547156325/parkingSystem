<template>
  <div class="app-container operator-segment">
    <Collapse>
      <div slot="controls" class="btn-item" style="display: inline-block">
        <el-form
          slot="content"
          :inline="true"
          class="search-form"
        >
          <el-form-item label="记录:">
            <el-input v-model="input" placeholder="请输入记录编号，车主名字，车牌号码" size="small" style="width: 260px" />
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
            <!--           TODO 添加车位功能？ -->
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
        label="记录编号"
        align="center"
        width="120"
      >
        <template slot-scope="scope">
          {{ scope.row.recordId }}
        </template>
      </el-table-column>
      <el-table-column
        prop="spaceNum"
        label="车主名称"
        align="center"
        width="120"
      >
        <template slot-scope="scope">
          {{ scope.row.ownerName }}
        </template>
      </el-table-column>
      <el-table-column
        prop="spaceAddress"
        label="车牌号码"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.carNum }}
        </template>
      </el-table-column>
      <el-table-column
        prop="spaceStatus"
        label="支付方式"
        align="center"
      >

        <template slot-scope="scope">
          <el-tag>{{ judgePay(scope.row.payment) }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        prop="spaceStatus"
        label="停车位置"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.carPos }}
        </template>
      </el-table-column>
      <el-table-column
        prop="spaceAddress"
        label="入场日期"
        align="center"
        width="120px"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          {{ scope.row.inDate }}
        </template>
      </el-table-column>
      <el-table-column
        prop="spaceAddress"
        label="出场日期"
        align="center"
        width="120px"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          {{ scope.row.outDate }}
        </template>
      </el-table-column>
      <el-table-column
        prop="spaceAddress"
        label="停车时间"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.times }}
        </template>
      </el-table-column>
      <el-table-column
        prop="spaceAddress"
        label="支付费用"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.payNum }}
        </template>
      </el-table-column>
      <el-table-column
        prop="operate"
        label="操作"
        align="center"
        width="210"
      >
        <template slot-scope="scope">
          <el-button size="small" type="primary" icon="el-icon-edit">图表查看</el-button>
          <!--          <el-button v-if="scope.row.spaceStatus !== 2" size="small" type="danger" icon="el-icon-warning">下线</el-button>-->
          <!--          <el-button v-if="scope.row.spaceStatus === 2" size="small" type="info" icon="el-icon-info">上线</el-button>-->
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
  name: 'Record',
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
        recordId: 201316131,
        ownerName: '张三',
        carNum: '湘A72610',
        payment: 0,
        inDate: '2021-3-1',
        outDate: '2021-12-10',
        payNum: 500,
        carPos: 'A50',
        times: '520小时'
      },
      {
        recordId: 201316131,
        ownerName: '张三',
        carNum: '湘A72610',
        payment: 2,
        inDate: '2021-3-1',
        outDate: '2021-3-10',
        payNum: 500,
        carPos: 'A50',
        times: '520小时'
      },
      {
        recordId: 201316131,
        ownerName: '张三',
        carNum: '湘A72610',
        payment: 3,
        inDate: '2021-3-1',
        outDate: '2021-3-10',
        payNum: 0,
        carPos: 'A50',
        times: '520小时'
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
    judgePay(payment) {
      if (payment === 0) { return '临时车' } else if (payment === 1) { return '月租卡' } else if (payment === 2) { return '年租卡' } else return '固定车'
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
