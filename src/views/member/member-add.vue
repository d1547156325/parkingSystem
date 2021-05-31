<template>
  <div class="app-container">
    <van-nav-bar
      title="会员信息"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-form @submit="onSubmit">
      <van-field
        v-if="flag === false"
        v-model="memberInfo.car.carOwner"
        name="名字"
        label="名字"
        placeholder="请填写名字"
        :rules="[{ required: true, message: '请填写名字' }]"
      />
      <van-field
        v-else
        v-model="memberInfo.car.carOwner"
        name="名字"
        label="名字"
        placeholder="请填写名字"
        readonly
      />
      <van-field
        v-if="flag === false"
        v-model="memberInfo.car.carNum"
        name="车牌号"
        label="车牌号"
        placeholder="请填写车牌号码"
        :rules="[{
          pattern:/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
          , message: '请填写正确车牌号码' }]"
      />
      <van-field
        v-else
        v-model="memberInfo.car.carNum"
        name="车牌号"
        label="车牌号"
        placeholder="请填写车牌号码"
        :rules="[{ required: true, message: '请填写车牌号码' }]"
        readonly
      />
      <van-field
        readonly
        clickable
        label="会员类别"
        :value="typeValue"
        placeholder="选择会员类别"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" round position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @cancel="showPicker = false"
          @confirm="onConfirm"
        />
      </van-popup>
      <van-cell-group>
        <van-field label="购买日期" :value="DateForm(memberInfo.openDate)" readonly />
        <van-field label="到期日期" :value="DateForm(memberInfo.endDate)" readonly />
        <van-field label="本次充值" :value="thisMoney" readonly />
        <van-field label="总充值金额" :value="memberInfo.money" readonly />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">充值</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { updateMember } from '@/api/member'
import { memberLogin } from '@/api/member'
import { listSpaceArea } from '@/api/spaceArea'
// eslint-disable-next-line no-unused-vars
import { listSpace } from '@/api/space'
import moment from 'moment'
import { Message } from 'element-ui'
export default {
  name: 'MemberAdd',
  data() {
    return {
      flag: false,
      memberInfo: {
        phone: '',
        car: {
          carOwner: '',
          carNum: '',
          carTimes: 0
        },
        openDate: new Date(),
        endDate: '',
        money: 0,
        memberType: null
      },
      thisMoney: 0,
      typeValue: '',
      showPicker: false,
      showPicker1: false,
      columns: ['月租卡', '年租卡'],
      spaceValue: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      console.log(this.$route.query.phone)
      this.memberInfo.phone = this.$route.query.phone
      this.thisMoney = 1000
      memberLogin(this.memberInfo.phone).then(response => {
        if (response.data !== null) {
          this.memberInfo = response.data
          this.flag = true
          this.judgeMemberType(response.data.memberType)
        }
        console.log(this.memberInfo)
      })
      listSpaceArea().then(response => {
        this.spaces[0].values = []
        response.data.forEach((item) => {
          this.spaces[0].values.push(item.area)
        })
        console.log(this.spaces[0].values)
      })
    },
    judgeMemberType(type) {
      if (type === 1) this.typeValue = '月租卡'
      else if (type === 2) this.typeValue = '年租卡'
    },
    // 充值
    onSubmit() {
      this.memberInfo.money = this.thisMoney + this.memberInfo.money
      console.log(JSON.stringify(this.memberInfo))
      updateMember(JSON.stringify(this.memberInfo)).then(response => {
        console.log(response)
        Message({
          message: response.msg,
          type: 'success',
          duration: 2 * 1000
        })
      })
    },
    DateForm(date) {
      return moment(date).format('YYYY-MM-DD HH:mm')
    },
    onConfirm(value) {
      console.log(value)
      this.typeValue = value
      if (this.flag === false) {
        this.memberInfo.openDate = this.DateForm(new Date())
        if (value === '月租卡') {
          this.memberInfo.memberType = 1
          this.memberInfo.endDate = this.DateForm(new Date().setMonth(new Date().getMonth() + 1))
          this.thisMoney = 1000
        } else if (value === '年租卡') {
          this.memberInfo.memberType = 2
          this.memberInfo.endDate = this.DateForm(new Date().setFullYear(new Date().getFullYear() + 1))
          this.thisMoney = 15000
        }
      } else {
        if (value === '月租卡') {
          this.memberInfo.memberType = 1
          this.memberInfo.endDate = this.DateForm(new Date(this.memberInfo.endDate).setMonth(new Date().getMonth() + 1))
          this.thisMoney = 1000
        } else if (value === '年租卡') {
          this.memberInfo.memberType = 2
          this.memberInfo.endDate = this.DateForm(new Date(this.memberInfo.endDate).setFullYear(new Date().getFullYear() + 1))
          this.thisMoney = 15000
        }
      }
      this.showPicker = false
    },
    onClickLeft() {
      // Toast('返回')
      this.$router.push({ path: '/memberLogin' })
    }
  }
}
</script>

<style scoped>

</style>
