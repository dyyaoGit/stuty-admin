<template>
  <div class="form-container">
    <el-form :model="formData" label-width="120px">
      <el-form-item label="轮播图描述">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="上传轮播图">
        <uploadImg v-model="formData.url"></uploadImg>
      </el-form-item>
      <el-form-item label="排序">
        <el-input-number v-model="formData.sort" :min="1" :max="99999"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="danger" @click="update" v-if="$route.name == '编辑轮播图'">
          保存更改
        </el-button>
        <el-button size="mini" type="danger" @click="save" v-else>
          保存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import uploadImg from '@/components/upload/uploadImg'

  export default {
    name: '',
    components: {
      uploadImg
    },
    data() {
      return {
        formData: {
          title: "",
          url: '',
          sort: 1
        }
      }
    },
    methods: {
      save() {
        this.$axios.post("addSlider",this.formData).then(res => {
          if(res.code == 200){
            this.$Msg("success", {name: "轮播图管理"})
          }
        })
      },
      update() {
        this.$axios.post("updateSlider",this.formData).then(res => {
          if(res.code == 200){
            this.$Msg("", {name: "轮播图管理"})
          }
        })
      },
      getData() {
        this.$axis.get("getSlider",{id: this.$route.query.id}).then(res => {
          if(res.code == 200){
            this.formData = res.data;
          }
        })
      }
    },
    created() {
      if(this.$route.name == "编辑轮播图"){
        this.getData();
      }
    }
  }
</script>


<style scoped>


</style>
