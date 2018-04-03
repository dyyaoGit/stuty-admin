<template>
  <div class="videoUp">
    <el-form :model="formData" label-width="80px">
      <el-form-item label="视频标题">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="视频头图">
        <el-input v-model="formData.img"></el-input>
      </el-form-item>
      <el-form-item label="视频作者">
        <el-input v-model="formData.author"></el-input>
      </el-form-item>
      <el-form-item label="视频上传">
        <upload @uploadSuccess="upSuccess" @getPercent="getPercent" :isButton="true"></upload>
        <videoPlayer :options="playerOptions" class="video" v-if="formData.video"></videoPlayer>
      </el-form-item>
      <el-form-item label="是否付费">
        <el-switch v-model="formData.free"></el-switch>
      </el-form-item>
      <el-form-item label="价格" v-if="formData.free">
        <el-input-number v-model="formData.price" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" size="small">
          保存
        </el-button>
        <el-button @click="getErr">
          取得错误
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import upload from '../../components/upload/upload'
  import 'video.js/dist/video-js.css'
  import { videoPlayer } from 'vue-video-player'
  export default {
    name: "index",
    components: {
      upload,
      videoPlayer
    },
    data() {
      return {
        formData: {
          title: '',
          video: '',
          img: '',
          free: false,
          price: 0,
          author: '',
          key: ''
        },
        playerOptions: {
          language: 'zh',
          sources: [{
            type: "video/mp4",
            src: ""
          }],
          muted: true,
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          // poster: "/static/images/author.jpg"  //视频地址
        }
      }
    },
    methods: {
      upSuccess(res) {
        this.formData.video = res.data;
        this.playerOptions.sources[0].src = res.data;
        this.formData.key = res.key;
      },
      getPercent(percent) {
        this.percent = percent
      },
      getErr() {
        this.$axios.get("getErr").then().catch(err => {
          console.log(err.response.status)
        })
      }
    }
  }
</script>


<!--overwrite style-->
<style>
  .video-js .vjs-big-play-button {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .video-js {
    width: 640px;
    height: 360px;
  }
</style>
<style scoped>
  .videoUp {
    padding-top: 20px;
    padding-right: 20px;
  }
  .video {
    margin-top: 20px;
  }

</style>
