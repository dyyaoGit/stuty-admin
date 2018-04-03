<template>
  <div class="table-container">
    <div style="display: flex;justify-content: flex-end;margin-bottom: 20px ;" >
      <el-button type="danger" size="small" icon="el-icon-circle-plus-outline"
                 @click="$router.push({name: '添加视频'})">添加视频</el-button>
    </div>
    <el-table :data="tableData" border>
      <el-table-column prop="title" label="标题">
      </el-table-column>
      <el-table-column prop="author" label="作者">
      </el-table-column>
      <el-table-column label="视频头图">
        <template slot-scope="scope">
          <img :src="scope.row.img" class="table-img">
        </template>
      </el-table-column>
      <el-table-column label="所属分类" prop="category">

      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="update(scope.row._id)">
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
        tableData: []
      }
    },
    methods: {
      getData() {
        this.$axios.get("getVideo").then(res => {
          this.tableData = res.data;
        })
      },
      del(id) {
        this.$axios.post("delVideo").then(res => {
          this.$confirm('此操作将永久删除该视频, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.loading = true;
            this.$axios.post("delVideo",{id}).then(res => {
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
      },
      update(id) {
        this.$router.push({name:'编辑视频',query: {id}})
      }
    },
    created() {
      this.getData();
    }
  }
</script>


<style scoped>


</style>
