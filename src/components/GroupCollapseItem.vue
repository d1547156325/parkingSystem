<template>
  <el-collapse-item :name="index">
    <template slot="title">
      分组标识：{{ index }}
    </template>
    <div class="app-container">
      <el-form ref="groupForm" :model="groupObject" label-width="80px">
        <el-form-item label="分组编号" :rules="[{ required: true, message: '请输入分组编号',trigger: 'blur'}]" prop="groupId">
          <el-input v-model="groupObject.groupId" />
        </el-form-item>
        <el-form-item label="分组描述" :rules="[{ required: true, message: '请输入分组描述',trigger: 'blur'}]" prop="description">
          <el-input v-model="groupObject.description" />
        </el-form-item>
        <el-form-item label="培养箱" :rules="[{ required: true, message: '请选择培养箱',trigger: 'blur'}]" prop="boxIds">
          <el-select v-model="groupObject.boxIds" multiple :rules="[{ required: true, message: '请选择实验箱',trigger: 'blur'}]" placeholder="请选择实验箱" size="small">
            <el-option
              v-for="item in boxList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button v-if="saveflag==false" type="primary" size="medium" @click="saveGroup()">暂存该分组</el-button>
        <el-button type="info" size="medium" @click="deleteGroup(index)">删除该分组</el-button>
      </span>
    </div>
  </el-collapse-item>
</template>

<script>
export default {
  name: 'GroupCollapseItem',
  props: {
    index: {
      type: Number,
      required: true
    },
    items: {
      type: Array,
      default: Array
    },
    groupList: {
      type: Array,
      default: Array
    },
    selectBoxList: {
      type: Array,
      default: Array
    }
  },
  data() {
    return {
      groupObject: {
        groupId: undefined,
        description: '',
        boxIds: []
      },
      saveflag: false,
      boxList: []
    }
  },
  created() {
    this.boxList = this.selectBoxList
  },
  methods: {
    saveGroup() {
      this.$refs['groupForm'].validate((valid) => {
        if (valid) {
          if (this.groupList.length > 0) {
            let idFlag = true
            for (const group of this.groupList) {
              if (group.groupId === this.groupObject.groupId) {
                this.$message({
                  message: '实验编号已存在',
                  type: 'error'
                })
                idFlag = false
                break
              }
            }
            // 判断培养箱是否重复
            let flag = true
            for (const group of this.groupList) {
              for (const id of group.boxIds) {
                for (const box of this.groupObject.boxIds) {
                  if (id === box) {
                    this.$message({
                      message: '不应存在已选择的培养箱',
                      type: 'error'
                    })
                    flag = false
                    break
                  }
                }
              }
            }
            if (flag && idFlag) {
              this.groupList.push(this.groupObject)
              this.saveflag = true
            }
          } else {
            this.groupList.push(this.groupObject)
            this.saveflag = true
          }
        } else {
          return false
        }
      })
      console.log('saved:', JSON.stringify(this.groupList))
    },
    deleteGroup(index) {
      //  not allow to delete the first
      console.info(index)
      this.groupList.splice(index, 1)
      this.items.splice(index, 1)
      console.log('saved:', JSON.stringify(this.groupList))
    }
  }
}
</script>

<style scoped>

</style>
