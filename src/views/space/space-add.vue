<template>
  <div class="app-container">
    <!-- experimentId  plantName   experimentPurpose  experimentDescription  experimentAddress  startTime  endTime-->
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="区域编号" :rules="[{ required: true, message: '请选择区域编号！',trigger: 'blur'}]" prop="spaceArea">
        <el-select v-model="form.spaceArea.spaceAreaId" placeholder="请选择区域编号" style="width: 200px">
          <el-option
            v-for="item in areaOptions"
            :key="item.spaceAreaId"
            :label="item.area"
            :value="item.spaceAreaId"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="车位编号"
        :rules="{ required: true, message: '车位编号不能为空',trigger: 'blur'} "
        prop="spaceNum"
      >
        <el-input v-model.number="form.spaceNum" placeholder="请输入车位编号" style="width: 200px" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">创建</el-button>
        <el-button @click="goToIndex()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addSpace } from '@/api/space'
import { listSpaceArea } from '@/api/spaceArea'
import { Message } from 'element-ui'

export default {
  name: 'SpaceAdd',
  data() {
    return {
      form: {
        spaceId: null,
        spaceNum: null,
        spaceArea: {
          spaceAreaId: null,
          area: null
        },
        spaceStatus: 0,
        spaceRemark: null
      },
      remarkOptions: [
        {
          label: '自由车位',
          value: 0
        },
        {
          label: '固定车位',
          value: 1
        }
      ],
      areaOptions: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      listSpaceArea().then(response => {
        this.areaOptions = response.data
      })
    },
    goToIndex() {
      this.$router.push({ path: '/space/space' })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(JSON.stringify(this.form))
          addSpace(JSON.stringify(this.form)).then(response => {
            console.log(response.data)
            this.$router.push({ path: '/space/space' })
            Message({
              message: response.msg,
              type: 'success',
              duration: 5 * 1000
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
