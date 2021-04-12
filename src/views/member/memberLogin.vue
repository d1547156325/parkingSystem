<template>
  <div class="app-container">
    <van-nav-bar
      title="会员登录"
    />
    <van-form validate-first @submit="onSubmit">
      <van-field
        v-model="phone"
        required
        label="手机号"
        type="tel"
        clearable
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请填写您的手机号码！' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式错误！'}
        ]"
      />
      <van-field
        v-model="smsg"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
        :rules="[{ required: true, message: '请填写短信验证码' }]"
      >
        <template #button>
          <van-button size="small" type="primary" native-type="button" @click="getSmsg()">发送验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">登陆</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>

export default {
  name: 'MemberLogin',
  data() {
    return {
      phone: '',
      smsg: '',
      phonePattern: /^1[3456789]d{9}$/
    }
  },
  methods: {
    onSubmit() {
      // console.log('submit', values)
      // memberLogin(this.phone).then(response => {
      //   console.log(response.data)
      this.$router.push({ path: '/memberAdd', query: { phone: this.phone }})
      // })
    },
    getSmsg() {
      console.log('getSmsg')
    }
  }
}
</script>

<style scoped>

</style>
