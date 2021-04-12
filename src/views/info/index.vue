<template>
  <div class="app-container operator-segment">
    <el-row :gutter="100">
      <el-col :span="10">
        <el-card class="box-card" shadow="always">
          <div class="text item">名称:停车场收费系统</div>
<!--          <el-divider></el-divider>-->
          <div class="text item">收费标准:</div>
          <div class="text item">临时车5元一小时</div>
          <div class="text item">月租卡800元一月, 月租车3元一小时</div>
          <div class="text item">年租卡18000一年, 年租车2元一小时</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card" shadow="always">
          <div class="text item">服务器环境: linux</div>
          <div class="text item">服务器域名: 暂无</div>
          <div class="text item">服务器IP地址: localhost</div>
          <div class="text item">运行时间: {{new Date().getFullYear()}}</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Info'
}
</script>

<style scoped>
.text {
  font-size: 20px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}
</style>
