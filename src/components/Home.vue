<template>
  <el-container>
    <el-header>
      <div>
        <router-link to="/welcome">
          <span>Header</span>
        </router-link>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click='toggleCollapse'>|||</div>
        <!-- 侧边栏菜单区 -->
        <el-menu
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :collapse="isCollapse"
          :collapse-transition="false"
          :default-active="activePath"
          unique-opened
          router>
          <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
            <!-- 一级菜单 -->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/'+subitem.path" v-for="subitem in item.children" 
            :key="subitem.id" @click="saveNavState('/'+subitem.path)">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subitem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menuelist: [],
      isCollapse: false,
      activePath: ''
    }
  },
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
    async getMenuList() {
      // const {data: res} = await this.$http.get('menus')
      // console.log(res)
      // if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
      // this.menuelist = res.data
      this.menulist = [
        {id: 1, authName: '用户管理', path: 'users', order: 1, 
          children: [{
            id: 11, authName: '用户列表', order: 1, path: 'users'
          }]
        },
        {id: 2, authName: '权限管理', path: 'users', order: 2,
          children: [{
            id: 21, authName: '权限列表', order: 1, path: 'roles'
          }, {
            id: 22, authName: '权限声明', order: 2, path: 'roles'
          }]
        },
        {id: 3, authName: '商品管理', path: 'users', order: 3
        },
        {id: 4, authName: '订单管理', path: 'users', order: 4
        },
        {id: 5, authName: '数据统计', path: 'users', order: 5
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 0;
    background-color: #373d41;
    color: #fff;
    font-size: 20px;
    > div {
      display: flex;
      align-items: center;
      span {
        margin-left: 20px;
        color: #fff;
      }
    }
  }
  .el-aside {
    background-color: #333744;
    .toggle-button {
      background-color: #4A5064;
      font-size: 10px;
      line-height: 24px;
      color: #fff;
      text-align: center;
      letter-spacing: .2;
      cursor: pointer;
    }
    .el-menu {
      border-right: 0;
    }
  }
  .el-main {
    background-color: #EAEDF1;
  }
</style>