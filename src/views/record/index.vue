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
            <el-input v-model="input" placeholder="请输入关键字" size="small" style="width: 140px" />
          </el-form-item>
          <el-form-item label="车辆类别:">
            <el-select v-model="value" placeholder="请选择车辆类别" size="small" style="width: 140px" @change="fetchData">
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
          {{ scope.row.car.carOwner }}
        </template>
      </el-table-column>
      <el-table-column
        prop="spaceAddress"
        label="车牌号码"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.car.carNum }}
        </template>
      </el-table-column>
      <el-table-column
        prop="spaceStatus"
        label="类别"
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
          {{ judgeSpace(scope.row.space) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="spaceAddress"
        label="入场日期"
        align="center"
        width="160px"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          {{ scope.row.enterDate }}
        </template>
      </el-table-column>
      <el-table-column
        prop="spaceAddress"
        label="出场日期"
        align="center"
        width="160px"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          {{ scope.row.leaveDate }}
        </template>
      </el-table-column>
      <el-table-column
        prop="spaceAddress"
        label="支付费用"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.money }}
        </template>
      </el-table-column>
<!--      <el-table-column-->
<!--        prop="operate"-->
<!--        label="操作"-->
<!--        align="center"-->
<!--        width="210"-->
<!--      >-->
<!--        <template slot-scope="scope">-->
<!--          <el-button size="small" type="primary" icon="el-icon-edit">图表查看</el-button>-->
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
import { listRecord } from '@/api/record'
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
      list: null,
      options: [{
        value: '0',
        label: '临时车'
      }, {
        value: '1',
        label: '月租车'
      }, {
        value: '2',
        label: '年租车'
      }],
      value: ''
    }
  },
  created() {
    this.fetchData()
    console.log(this.$myStore.visible)
  },
  methods: {
    // 获取数据
    fetchData() {
      this.listLoading = true
      listRecord(this.input, this.value, (this.listQuery.current - 1), this.listQuery.size).then(response => {
        this.list = response.data.content
        this.total = response.data.totalElements
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    // 判断状态
    judgePay(payment) {
      if (payment === 0) { return '临时车' } else if (payment === 1) { return '月租卡' } else if (payment === 2) { return '年租卡' } else return '车位中'
    },
    judgeCarOwner(car) {
      if (car != null) { return car.carOwner }
    },
    judgeCarNum(car) {
      if (car != null) { return car.carNum }
    },
    judgeSpace(space) {
      return space.spaceArea.area + space.spaceNum + '号'
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style scoped>

</style>
