<template>
  <div class="videoUp">
    <el-form :model="formData" label-width="80px">
      <el-form-item label="视频标题">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="视频头图">
        <uploadImg v-model="formData.img" @getUrl="getImgUrl"></uploadImg>
      </el-form-item>
      <el-form-item label="视频分类">
        <el-select v-model="formData.type" placeholder="请选择" @change="selCate">
          <el-option v-for="(item, index) in category" :key="index" :value="item._id" :label="item.title"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="视频作者">
        <el-input v-model="formData.author"></el-input>
      </el-form-item>
      <el-form-item label="视频上传">
        <upload @uploadSuccess="upSuccess" @getPercent="getPercent" :isButton="true"></upload>
        <videoPlayer :options="playerOptions" class="video" v-if="playerOptions.sources[0].src"></videoPlayer>
      </el-form-item>
      <el-form-item label="是否付费">
        <el-switch v-model="formData.free"></el-switch>
      </el-form-item>
      <el-form-item label="价格" v-if="formData.free">
        <el-input-number v-model="formData.price" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" size="small" @click="update" :loading="sending" v-if="$route.name == '编辑视频'">
          保存更改
        </el-button>
        <el-button type="danger" size="small" @click="save" :loading="sending" v-else>
          保存
        </el-button>

      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import upload from '../../components/upload/upload'
  import uploadImg from '../../components/upload/uploadImg'
  import 'video.js/dist/video-js.css'
  import { videoPlayer } from 'vue-video-player'
  export default {
    name: "index",
    components: {
      upload,
      videoPlayer,
      uploadImg
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
          key: '',
          type: '',
          sort: ''
        },
        playerOptions: {
          language: 'zh',
          sources: [{
            type: "video/mp4",
            src: ""
          }],
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          poster: ""  //视频头图地址
        },
        sending: false,
        category: []
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
      },
      save() {
        this.sending = true;
        this.$axios.post("addVideo", this.formData).then(res => {
          if(res.code == 200){
            this.$Msg('success',{name: '视频管理'})
          }
          else {
            this.$Msg('error','/',res.data)
          }
          this.sending = false;
        })

      },
      getImgUrl(val) {
        this.playerOptions.poster = val;
      },
      getSelect() {
        this.$axios.get('getCategory').then(res => {
          this.category = res.data;
        })
      },
      selCate(val) {
        let selected = this.category.find(item => {
          return item._id == val;
        })
        this.formData.sort = selected.sort;
      },
      getData() {
        this.$axios.get("getVideo",{id: this.$route.query.id}).then(res => {
          this.formData = res.data;
          this.playerOptions.poster = res.data.img;
          this.$axios.get("getDown",{key: res.data.key}).then(backData => {
            this.playerOptions.sources[0].src = backData.data;
            this.formData.video = backData.data;
          })
        })
      },
      update() {
        let params = {
          id: this.$route.query.id,
          ...this.formData
        }
        this.$axios.post("updateVideo", params).then(res => {
          if(res.code == 200){
            this.$Msg("success", {name: "视频管理"})
          }
        })
      }
    },
    mounted() {
      this.getSelect();
      if(this.$route.name == "编辑视频"){
        this.getData();
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
