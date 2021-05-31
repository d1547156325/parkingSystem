
<template>

  <el-row>
    <!--    <el-col :span="24"><div class="grid-content bg-purple-dark">-->
    <!--      <el-card shadow="never" body-style="padding=1px">-->
    <!--        <div class="dashboard-text">停车场管理系统</div>-->
    <!--      </el-card>-->
    <!--    </div>-->
    <!--    </el-col>-->
    <panel-group />
    <el-col :span="18">
      <div class="grid-content bg-purple">
        <el-card class="box-card" shadow="never" body-style="padding=2px">
          <video id="videoCamera" :width="videoWidth" :height="videoHeight" autoplay />
          <canvas id="canvasCamera" style="display:none;" :width="videoWidth" :height="videoHeight" />
        </el-card>
      </div>
    </el-col>
    <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
      <!--      <box-card />-->
      <el-card class="box-card-component" style="margin-left:8px;">
        <div slot="header" class="box-card-header">
          <img src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png">
        </div>
        <div style="position:relative;">
          <pan-thumb :image="avatar" class="panThumb" />
          <mallki class-name="mallki-text" :text="name" />
          <div style="padding-top:35px;" class="progress-item">
            <span class="span_text">车牌号码:</span>
            <span class="span_text" v-text="number_in" />
          </div>
          <el-divider></el-divider>
          <div class="progress-item">
            <span class="span_text">车辆类别:</span>
            <span class="span_text" v-text="memberType" />
          </div>
          <el-divider></el-divider>
          <div class="progress-item">
            <span class="span_text">进入次数:</span>
            <span class="span_text" v-text="times_in" />
          </div>
          <el-divider></el-divider>
          <div class="progress-item">
            <span class="span_text">车位位置:</span>
            <span class="span_text" v-text="space_in" />
          </div>
        </div>
      </el-card>
    </el-col>
<!--    <el-button @click="enterOrLeave()">拍照</el-button>-->
  </el-row>

</template>

<script>
import { mapGetters } from 'vuex'
import PanelGroup from '@/components/PanelGroup'
import { carLicense } from '@/api/car'
import PanThumb from '@/components/PanThumb'
import Mallki from '@/components/TextHoverEffect/Mallki'

const synth = window.speechSynthesis
const msg = new SpeechSynthesisUtterance()

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  components: {
    PanelGroup,
    PanThumb, Mallki
  },

  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      isCameraFlag: false,
      videoWidth: 1200,
      videoHeight: 550,
      imgSrc: '',
      thisCancas: null,
      thisContext: null,
      thisVideo: null,
      imgFile: '',
      statisticsData: {
        article_count: 1024,
        pageviews_count: 1024
      },
      number_in: '',
      memberType: '',
      times_in: '',
      space_in: ''
    }
  },
  created() {
  },
  mounted() {
    // setTimeout(() => {
    //   this.getCompetence()
    // }, 20)
    // this.timer = setInterval(this.enterOrLeave, 5000)
  },
  beforeDestroy() {
    // clearInterval(this.timer)
  },
  methods: {
    playVoice(text) {
      this.handleSpeak(text) // 传入需要播放的文字
    },
    handleSpeak(text) {
      msg.text = text // 文字内容: 小朋友，你是否有很多问号
      msg.lang = 'zh-CN' // 使用的语言:中文
      msg.volume = 10 // 声音音量：1
      msg.rate = 1 // 语速：1
      msg.pitch = 2 // 音高：1
      synth.speak(msg) // 播放
    },
    // 语音停止
    handleStop(e) {
      msg.text = e
      msg.lang = 'zh-CN'
      synth.cancel(msg)
    },
    // 调用权限（打开摄像头功能）
    getCompetence() {
      var _this = this
      this.thisCancas = document.getElementById('canvasCamera')
      this.thisContext = this.thisCancas.getContext('2d')
      this.thisVideo = document.getElementById('videoCamera')
      this.isCameraFlag = true
      // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {}
      }
      // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
      // 使用getUserMedia，因为它会覆盖现有的属性。
      // 这里，如果缺少getUserMedia属性，就添加它。
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function(constraints) {
          // 首先获取现存的getUserMedia(如果存在)
          var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia
          // 有些浏览器不支持，会返回错误信息
          // 保持接口一致
          if (!getUserMedia) {
            return Promise.reject(new Error('getUserMedia is not implemented in this browser'))
          }
          // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
          return new Promise(function(resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject)
          })
        }
      }
      var constraints = { audio: false, video: { width: this.videoWidth, height: this.videoHeight, transform: 'scaleX(-1)' }}
      navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
        // 旧的浏览器可能没有srcObject
        if ('srcObject' in _this.thisVideo) {
          _this.thisVideo.srcObject = stream
        } else {
          // 避免在新的浏览器中使用它，因为它正在被弃用。
          _this.thisVideo.src = window.URL.createObjectURL(stream)
        }
        _this.thisVideo.onloadedmetadata = function(e) {
          _this.thisVideo.play()
        }
      }).catch(err => {
        console.log(err)
      })
    },

    enterOrLeave() {
      this.setImage()
      const param = new FormData()
      param.append('file', this.imgFile)
      carLicense(param).then(response => {
        if (response.code === 408) {
          this.playVoice('车位已满，请返回')
        } else {
          this.number_in = response.data.car.carNum
          this.times_in = response.data.car.carTimes
          // console.log(response.data.space.spaceArea.area + response.data.span.spaceNum + '号')
          this.space_in = `${response.data.space.spaceArea.area}` + `${response.data.space.spaceNum}号`
          if (response.data.payment === 0) {
            this.playVoice('临时车, 位置' + this.space_in)
            this.memberType = '临时车'
          } else if (response.data.payment === 1) {
            this.playVoice('月租车')
            this.memberType = '月租车'
          } else {
            this.playVoice('年租车')
            this.memberType = '年租车'
          }
          console.log(response.data)
        }
      }).catch(() => {
        // this.playVoice('请稍等')
      })
    },
    //  绘制图片（拍照功能）
    setImage() {
      var _this = this
      // 点击，canvas画图
      _this.thisContext.drawImage(_this.thisVideo, 0, 0, _this.videoWidth, _this.videoHeight)
      // 获取图片base64链接
      var image = this.thisCancas.toDataURL('image/png')
      _this.imgSrc = image
      this.$emit('refreshDataList', this.imgSrc)
      this.imgFile = this.dataURLtoFile(image, 'test.jpg')
      // console.log(this.imgFile)
    },
    // base64转文件
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(',')
      var mime = arr[0].match(/:(.*?);/)[1]
      var bstr = atob(arr[1])
      var n = bstr.length
      var u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      // this.imgFile = new File([u8arr], 'filename', { type: mime })
      return new File([u8arr], filename, { type: mime })
    },

    // 关闭摄像头
    stopNavigator() {
      this.thisVideo.srcObject.getTracks()[0].stop()
      this.isCameraFlag = false
    }
  }
}

</script>

<style lang="scss" >
.box-card-component{
  .el-card__header {
    padding: 0px!important;
  }
}
</style>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 40px;
    line-height: 46px;
    text-align: center;
    font-family: "微软雅黑";
    /*background-image: url(2.jpg);*/
  }
}
</style>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>

<style lang="scss" scoped>
  .camera_outer{
    position: relative;
    overflow: hidden;
    /*background: url("../../assets/img/user_0608_04.png") no-repeat center;*/
    background-size: 100%;
    video,canvas,.tx_img{
      -moz-transform:scaleX(-1);
      -webkit-transform:scaleX(-1);
      -o-transform:scaleX(-1);
      transform:scaleX(-1);
    }
    .btn_camera{
      position: absolute;
      bottom: 4px;
      left: 0;
      right: 0;
      height: 50px;
      background-color: rgba(0,0,0,0.3);
      line-height: 50px;
      text-align: center;
      color: #ffffff;
    }
    .bg_r_img{
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
    }
    .img_bg_camera{
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
      img{
        width: 100%;
        height: 100%;
      }
      .img_btn_camera{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 50px;
        line-height: 50px;
        text-align: center;
        background-color: rgba(0,0,0,0.3);
        color: #ffffff;
        .loding_img{
          width: 50px;
          height: 50px;
        }
      }
    }
  }

  .box-card-component {
    .box-card-header {
      position: relative;
      height: 220px;
      img {
        width: 100%;
        height: 100%;
        transition: all 0.2s linear;
        &:hover {
          transform: scale(1.1, 1.1);
          filter: contrast(130%);
        }
      }
    }
    .mallki-text {
      position: absolute;
      top: 0px;
      left: 80px;
      font-size: 20px;
      font-weight: bold;
    }
    .span_text {
      //position: absolute;
      //top: 0px;
      //right: 0px;
      font-size: 20px;
      font-weight: bold;
    }
    .panThumb {
      z-index: 100;
      height: 70px!important;
      width: 70px!important;
      position: absolute!important;
      top: -45px;
      left: 0px;
      border: 5px solid #ffffff;
      background-color: #fff;
      margin: auto;
      box-shadow: none!important;
      ::v-deep .pan-info {
        box-shadow: none!important;
      }
    }
    .progress-item {
      margin-bottom: 10px;
      font-size: 14px;
    }
    @media only screen and (max-width: 1510px){
      .mallki-text{
        display: none;
      }
    }
  }
</style>
