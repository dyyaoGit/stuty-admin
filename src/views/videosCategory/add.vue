<template>
  <div class="form-container">
      <el-form :model="formData" label-width="80px">
        <el-form-item label="分类标题">
          <el-input v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="分类头图">
          <uploadImg v-model="formData.icon"></uploadImg>
        </el-form-item>
        <el-form-item label="分类排序">
          <el-input-number v-model="formData.sort" :min="1" :max="99999" ></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" size="mini" @click="add" v-if="$route.name!= '编辑分类'">
            保存
          </el-button>
          <el-button type="danger" size="mini" @click="update" v-else>
            保存更改
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
          title: '',
          icon: '',
          sort: ''
        }
      }
    },
    methods: {
      add() {
        this.$axios.post("addCategory", this.formData).then(res => {
          this.$Msg("success",{name: '视频分类管理'},"")
        })
      },
      getData() {
        this.$axios.get("getCategory", {id: this.$route.query.id}).then(res => {
          this.formData = res.data[0];
        })
      },
      update() {
        let params = {
          id: this.$route.query.id,
          ...this.formData
        }
        this.$axios.post("updateCategory",params).then(res => {
          if(res.code == 200){
            this.$Msg("success",{name: '视频分类管理'})
          }
        })
      }
    },
    created() {
      if(this.$route.name == "编辑分类"){
        this.getData();
      }
    }
  }
</script>


<style scoped>


</style>
