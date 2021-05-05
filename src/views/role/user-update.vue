<template>
  <div class="app-container">
    <!-- experimentId  plantName   experimentPurpose  experimentDescription  experimentAddress  startTime  endTime-->
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item
        label="用户名"
        :rules="{ required: true, message: '用户名不能为空',trigger: 'blur'} "
        prop="username"
      >
        <el-input v-model.number="form.username" placeholder="请输入用户名" style="width: 200px" disabled/>
      </el-form-item>
      <el-form-item
        label="姓名"
        :rules="{ required: true, message: '姓名不能为空',trigger: 'blur'} "
        prop="trueName"
      >
        <el-input v-model.number="form.trueName" placeholder="请输入姓名" style="width: 200px" disabled/>
      </el-form-item>
<!--      <el-form-item-->
<!--        label="密码"-->
<!--        :rules="{ required: true, message: '密码不能为空',trigger: 'blur' } "-->
<!--        prop="password"-->
<!--      >-->
<!--        <el-input v-model.number="form.password" placeholder="请输入密码" style="width: 200px" show-password/>-->
<!--      </el-form-item>-->
      <el-form-item label="管理员等级" :rules="[{ required: true, message: '请选择管理员等级！',trigger: 'blur'}]" prop="role">
        <el-select v-model="form.role" placeholder="请选择管理员等级" style="width: 200px">
          <el-option
            v-for="item in roleOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">创建</el-button>
        <el-button @click="goToIndex()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { updateUser } from '@/api/user'
import { Message } from 'element-ui'

export default {
  name: 'UserUpdate',
  data() {
    return {
      form: {
        username: null,
        trueName: null,
        password: null
      },
      roleOptions: [
        {
          label: '管理员',
          value: 'ROLE_ADMIN'
        },
        {
          label: '超级管理员',
          value: 'ROLE_SYSADMIN'
        }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      // console.log(this.$route.query.user)
      this.form = this.$route.query.user
    },
    goToIndex() {
      this.$router.push({ path: '/role/role' })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(JSON.stringify(this.form))
          updateUser(JSON.stringify(this.form)).then(response => {
            console.log(response.data)
            this.$router.push({ path: '/role/role' })
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
