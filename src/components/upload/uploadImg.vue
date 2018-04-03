<template>
  <el-upload
    class="avatar-uploader"
    action="https://upload-z1.qiniup.com"
    :show-file-list="false"
    :on-success="handleSuccess"
    :before-upload="beforeUpload"
    :data="upData"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
  import md5 from 'md5'
  export default {
    name: "upload-img",
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        upData: {
          token: '',
          // key: ''
        },
        imageUrl: ''
      }
    },
    methods: {
      beforeUpload(file) {
        let filename = file.name;
        let ext = filename.split('.');
        let extrname = ext[ext.length-1];
        let fullname = md5(Math.round(new Date().getTime()/1000))+'.'+extrname;
        this.upData.key = fullname;
      },
      handleSuccess(res) {
        this.imageUrl = res.url;
        this.$emit("getUrl",this.imageUrl);
        this.$emit("input",res.url);
      },
      getToken() {
        this.$axios.qiniuGet(true).then(res => {
          this.upData.token = res.data;
        })
      }
    },
    created() {
      this.getToken();
    },
    watch: {
      value(val) {
        this.imageUrl = val;
      },
      imageUrl(val) {
        this.$emit("input",val);
      }
    }
  }

</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
