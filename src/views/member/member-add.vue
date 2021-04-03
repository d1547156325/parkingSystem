<template>
  <div class="app-container">
    <!-- experimentId  plantName   experimentPurpose  experimentDescription  experimentAddress  startTime  endTime-->
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="姓名:">
        <el-input v-model="form.carOwner" placeholder="请输入姓名" style="width: 200px" />
      </el-form-item>
      <el-form-item label="车牌号:">
        <el-input v-model="form.carNum" placeholder="请输入车牌号" style="width: 200px" />
      </el-form-item>
      <el-form-item label="车主名称:">
        <el-select v-model="form.spaceAddress" placeholder="请选择区域编号">
          <el-option label="A" value="A" />
          <el-option label="B" value="B" />
        </el-select>
      </el-form-item>
      <el-form-item label="车位编号">
        <el-input v-model="form.spaceNum" placeholder="请输入车位编号" style="width: 200px" />
      </el-form-item>
      <el-form-item label="车位备注">
        <el-select v-model="form.spaceRemark" placeholder="请选择车位备注">
          <el-option label="自由车位" value="0" />
          <el-option label="固定车位" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
        <el-button @click="goToIndex()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'MemberAdd',
  data() {
    return {
      form: {
        carOwner: '',
        carNum: '',
        memberType: 1
      }
    }
  }
}
</script>

<style scoped>

</style>
