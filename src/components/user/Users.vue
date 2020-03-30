<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" class="input-with-select" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible=true">添加用户</el-button>
        </el-col>
      </el-row>

      <el-table
        :data="userlist"
        style="width: 100%"
        border
        stripe
        >
        <el-table-column
          type="index"
        >
        </el-table-column>
        <el-table-column
          prop="username"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.state" @change="userStateChange(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作" width="180px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="open(scope.row.id)"></el-button>
            <el-tooltip content="分配角色" placement="top">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>

    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
      >
      <el-form :model="addForm" status-icon :rules="addFormRules" ref="addFormRef" label-width="70px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="addForm.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="修改用户"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="addDialogClosed"
      >
      <el-form :model="addForm" status-icon :rules="addFormRules" ref="addFormRef" label-width="70px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="addForm.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if(regEmail.test(value)) {
        return callback()
      }
      callback(new Error('请输入合法的邮箱用户名'))
    }
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userlist: [],
      total: 0,
      addDialogVisible: false,
      editDialogVisible: false,
      addForm: {
        username: '',
        password: ''
      },
      editForm: {},
      addFormRules: {
        username: [{
          required: true, message: '请输入用户名', trigger: 'blur'
        }, {min: 3, max: 10, message: '用户名长度在3到10之间'}, {validator: checkEmail, trigger: 'blur'}
        ],
        password: [{
          required: true, message: '请输入密码', trigger: 'blur'
        }, {min: 3, max: 10, message: '密码长度在3到10之间'}
        ]
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      // const {data: res} = await this.$http.get('users', { params: this.queryInfo })
      // console.log(res)
      // if(res.meta.status !== 200) return this.$message.error('获取用户列表失败!')
      // this.userlist = res.data.users
      // this.total = res.data.total
      this.userlist = [
        {id: 1, username: 'tony', email: '1@gmail.com', state: true},
        {id: 2, username: 'mikki', email: '2@gmail.com', state: false},
        {id: 3, username: 'elly', email: '3@gmail.com', state: false}
      ]
      this.total = this.userlist.length
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    async userStateChange(userInfo) {
      const {data: res} = await this.$http.put(`users/${userInfo.id}/state/${userInfo.state}`)
      if(res.meta.status !== 200) {
        userInfo.state = !userInfo.state
        return this.$message.error('更新用户状态失败')
      }
      this.$message.success('更新用户状态成功')
    },
    // 监听添加用户对话框关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    async addUser() {
      // this.$refs.addFormRef.validate(valid => {
      //   if (!valid) return false
      //   const {data: res} = await this.$http.post('users', this.addForm)
      //   if(res.meta.status !== 201){
      //     this.$message.error('添加用户失败')
      //   }
      //   this.$message.success('添加用户成功')
      //   this.addDialogVisible = false
      //   this.getUserList()
      // })
    },
    async showEditDialog(id) {
      // const {data: res} = await this.$http.get('users/'+id)
      // if(res.meta.status !== 200){
      //   this.$message.error('添加用户失败')
      // }
      // this.editForm = res.data
      this.editDialogVisible = true
    },
    async open(id) {
      const res = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // console.log(res)
      if (res !== 'confirm') {
        return this.$message.info('取消删除')
      }
      // const {data: res} = await this.$http.delete('users/'+id)
      // if(res.meta.status !== 200){
      //   this.$message.error('删除用户失败')
      // }
      // this.$message.success('删除用户成功')
      // this.getUserList()
    }
  }
}
</script>

<style lang="less" scoped>

</style>