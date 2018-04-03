<template>
  <div class="table-container">
    <div class="top-box">
      <el-button type="danger" size="mini"
                 @click="$router.push({name: '添加轮播图'})"
                 icon="el-icon-circle-plus-outline">
        添加轮播图
      </el-button>
    </div>
    <el-table :data="tableData" border :loading="loading">
      <el-table-column prop="title" label="标题">
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.url" v-if="scope.row.url" class="table-img">
        </template>
      </el-table-column>
      <el-table-column label="排序" prop="sort">
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="jumpUpdate(scope.row._id)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="remove(scope.row._id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        tableData: [],
        loading: false
      }
    },
    methods: {
      getData() {
        this.$axios.get("getSlider").then(res => {
          this.tableData = res.data;
        })
      },
      jumpUpdate(id) {
        this.$router.push({name: '编辑轮播图',query: {id}})
      },
      remove(id) {
        console.log(id)
        this.$axios.post("delSlider",{id}).then(res => {
          this.$confirm('此操作将永久删除该轮播图, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.loading = true;
            this.$axios.post("delSlider",{id}).then(res => {
              if(res.code == 200){
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }
              this.getData();
              this.loading = false;
            })
          }).catch(() => {
            this.loading = false;
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        })
      }
    },
    created() {
      this.getData();
    }
  }
</script>


<style scoped>


</style>
