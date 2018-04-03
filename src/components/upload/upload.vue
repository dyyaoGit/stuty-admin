<template>
  <div>
    <el-progress :percentage="percent" v-if="percent>0" :status="status"></el-progress>
    <label id="container" :class="bindClass">
      <i class="el-icon-plus add" v-if="!isButton"></i>
      <span v-if="isButton">上传视频</span>
      <input type="file" id="btn" class="button">
    </label>
  </div>
</template>

<script>
  import qiniu from '@/utils/qiniu'

  export default {
    name: "upload",
    props: {
      isButton: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        token: "",
        qiniuInit: false,
        percent: 0
      }
    },
    methods: {
      getToken() {
        this.$axios.qiniuGet().then(res => {
          this.qiniuInit = true;
          qiniu({
            token: res.data
          }, data => {
            this.$axios.get("getDown", {key: data.key}).then(bkData => {
              this.$emit("uploadSuccess", bkData)
            })
          }, percent => {
            this.percent = percent
            this.$emit("getPercent", percent)
          })

        })
      }

    },
    created() {
      this.getToken();
    },
    computed: {
      status() {
        return this.percent == 100 ? "success": ""
      },
      bindClass() {
        if (this.isButton) {
          return 'el-button el-button--primary'
        }
        else {
          return 'container'
        }
      }
    }
  }
</script>

<style scoped>
  .container {
    display: block;
    width: 150px;
    text-align: center;
    border: 1px solid #e6e6e6;
    border-radius: 8px;
    cursor: pointer;
  }

  .button {
    display: none;
  }

  .add {
    height: 150px;
    line-height: 150px;
    font-size: 50px;
    color: #ccc;
  }


</style>
