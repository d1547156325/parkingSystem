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
            <el-input v-model="input" placeholder="请输入关键词查询" size="small" style="width: 140px" />
          </el-form-item>
          <el-form-item label="车位状态:">
            <el-select v-model="statusValue" placeholder="选择车位状态" size="small" style="width: 140px" @change="fetchData">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <!--          <el-form-item label="车位备注:">-->
          <!--            <el-select v-model="remarkValue" placeholder="选择" size="small" style="width: 120px">-->
          <!--              <el-option-->
          <!--                v-for="item in remarkOptions"-->
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
              @click="fetchData"
            >查询
            </el-button>
            <el-button
              v-if="token === 'systemadmin'"
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
      <!--      <el-table-column-->
      <!--        prop="spaceId"-->
      <!--        label="车位ID"-->
      <!--        align="center"-->
      <!--        width="180"-->
      <!--      >-->
      <!--        <template slot-scope="scope">-->
      <!--          {{ scope.row.spaceId }}-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column
        prop="spaceAddress"
        label="所属区域"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.spaceArea.area }}
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
        prop="spaceStatus"
        label="车位状态"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.spaceStatus == 1? 'success':'info' ">{{ judgeStatus(scope.row.spaceStatus) }}</el-tag>
        </template>
      </el-table-column>
      <!--      <el-table-column-->
      <!--        prop="spaceRemark"-->
      <!--        label="车位备注"-->
      <!--        align="center"-->
      <!--      >-->
      <!--        <template slot-scope="scope">-->
      <!--          <el-tag :type="scope.row.spaceRemark == 1? 'success':'info'">{{ judgeRemark(scope.row.spaceRemark) }}</el-tag>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column
        prop="spaceRemark"
        label="停车号码"
        align="center"
      >
        <template slot-scope="scope">
          {{ judgeCarNum( scope.row.car ) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="operate"
        label="操作"
        align="center"
        width="210"
      >
        <template slot-scope="scope">
          <!--          <el-button size="small" type="primary" icon="el-icon-edit">编辑</el-button>-->
          <el-button v-if="scope.row.spaceStatus !== 2" size="small" type="danger" icon="el-icon-warning" @click="editIsOnline(scope.row)">下线</el-button>
          <el-button v-if="scope.row.spaceStatus === 2" size="small" type="success" icon="el-icon-info" @click="editIsOnline(scope.row)">上线</el-button>
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
import { listSpace, editIsOnline } from '@/api/space'
import Collapse from '@/components/Collapse'
import Pagination from '@/components/Pagination'
import { Message } from 'element-ui'
import {getToken} from "@/utils/auth";
export default {
  name: 'Space',
  components: { Collapse, Pagination },

  data() {
    return {
      addVisible: false,
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
      statusOptions: [{
        value: '0',
        label: '未占用'
      }, {
        value: '1',
        label: '已占用'
      }, {
        value: '2',
        label: '已下线'
      }],
      statusValue: '',
      remarkValue: '',
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
      // eslint-disable-next-line no-undef
      if (this.statusValue === '') { this.statusValue = -1 }
      listSpace(this.input, this.statusValue, (this.listQuery.current - 1), this.listQuery.size).then(response => {
        this.list = response.data.content
        this.total = response.data.totalElements
        // console.log(JSON.stringify(response.data))
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
      if (this.statusValue === -1) { this.statusValue = '' }
      if (this.remarkValue === -1) { this.remarkValue = '' }
    },
    // 判断状态
    judgeStatus(spaceStatus) {
      if (spaceStatus === 1) { return '已占用' } else if (spaceStatus === 0) { return '未占用' } else { return '已下线' }
    },
    // 判断备注
    judgeRemark(spaceRemark) {
      if (spaceRemark === 1) { return '固定车位' } else { return '自由车位' }
    },
    judgeCarNum(car) {
      if (car == null) { return '暂无' } else {
        return car.carNum
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    gotoAdd() {
      this.$router.push({ path: '/space/spaceAdd' })
    },
    editIsOnline(row) {
      // console.log(JSON.stringify(row))
      editIsOnline(JSON.stringify(row)).then(response => {
        Message({
          message: response.msg,
          type: 'success',
          duration: 5 * 1000
        })
        this.fetchData()
      })
    }
  }
}
</script>

<style scoped>

</style>
