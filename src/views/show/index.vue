<template>
  <div class="dashboard-editor-container">
    <div class="container">
      <div class="block">
        <el-date-picker
          v-model="selectYear"
          type="year"
          placeholder="选择年"
          @change="fetchData"
        />
      </div>
    </div>
    <br>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>

    <el-row :gutter="32">
      <!--      <el-col :xs="24" :sm="24" :lg="8">-->
      <!--        <div class="chart-wrapper">-->
      <!--          <raddar-chart />-->
      <!--        </div>-->
      <!--      </el-col>-->
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <cake-chart :chart-data="cakeData" />
        </div>

      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <el-col :span="18">
          <el-card class="box-card">
            <el-table
              :data="listCars"
              style="width: 100%"
              :default-sort="{prop: 'times', order: 'descending'}"
            >
              <el-table-column
                prop="carNum"
                label="车牌号码"
                width="180"
              >
                <template slot-scope="scope">
                  {{ scope.row.carNum }}
                </template>
              </el-table-column>

              <el-table-column
                prop="memberType"
                label="会员种类"
                width="180"
              >
                <template slot-scope="scope">
                  {{ scope.row.memberType }}
                </template>
              </el-table-column>

              <el-table-column
                prop="times"
                label="进入次数"
                width="180"
                sortable
              >
                <template slot-scope="scope">
                  {{ scope.row.carTimes }}
                </template>
              </el-table-column>

              <el-table-column
                prop="moneys"
                label="总金额"
                width="180"
                sortable
              >
                <template slot-scope="scope">
                  {{ scope.row.moneys }}
                </template>
              </el-table-column>

            </el-table>
          </el-card>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LineChart from '@/components/LineChart'
import CakeChart from '@/components/CakeChart'
import { cakeData } from '@/api/chart'
import { lineData } from '@/api/chart'
import { listSortCar } from '@/api/car'
import moment from 'moment'

export default {
  name: 'Show',
  components: {
    LineChart,
    CakeChart
  },
  data() {
    return {
      selectYear: new Date(),
      lineChartData: 'lineChartData.income',
      cakeData: null,
      listCars: null
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const start = new Date()
      start.setDate(1)
      console.log(this.DateForm(start))
      const end = new Date()
      end.setMonth(end.getMonth() + 1)
      end.setDate(1)
      console.log(this.DateForm(end))
      cakeData(this.DateForm(start), this.DateForm(end)).then(response => {
        this.cakeData = response.data
      })
      lineData(this.selectYear.getFullYear()).then(response => {
        this.lineChartData = response.data
      })
      listSortCar(0, 6, 'carTimes').then(response => {
        this.listCars = response.data.content
        console.log(response)
      })
    },
    DateForm(date) {
      return moment(date).format('YYYY-MM-DD')
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 800px;
  height: 365px;
}
</style>
