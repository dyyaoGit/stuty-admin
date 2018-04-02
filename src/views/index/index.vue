<template>
  <div class="videoUp">
    <el-form :model="formData" label-width="80px">
      <el-form-item label="视频标题">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="视频头图">
        <el-input v-model="formData.img"></el-input>
      </el-form-item>
      <el-form-item label="视频">
        <upload></upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import upload from '../../components/upload'
  export default {
    name: "index",
    components: {
      upload
    },
    data() {
      return {
        formData: {
          title: '',
          video: '',
          img: ''
        }
      }
    }
  }
</script>

<style scoped>
  .videoUp {
    padding-top: 20px;
    padding-right: 20px;
  }

</style>
