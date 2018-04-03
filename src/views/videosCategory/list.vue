<template>
  <div class="table-container">
    <el-table :data="tableData"
              border
              v-loading="loading"
              style="width: 100%">
      <el-table-column label="分类标题" prop="title">

      </el-table-column>
      <el-table-column label="分类头图">
        <template slot-scope="scope">
          <img :src="scope.row.icon" v-if="scope.row.icon" class="table-img">
        </template>
      </el-table-column>
      <el-table-column label="排序" prop="sort">

      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row._id)">
            编辑
          </el-button>
          <el-button type="danger" size="mini" @click="del(scope.row._id)">
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
        this.$axios.get("getCategory").then(res => {
          this.tableData = res.data;
        })
      },
      del(id) {
        this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true;
          this.$axios.post("delCategory",{id}).then(res => {
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
      },
      edit(id) {
        this.$router.push({name:'编辑分类',query: {id}})
      }
    },
    created() {
      this.getData();
    }
  }
</script>


<style scoped>


</style>
