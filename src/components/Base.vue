<template>
  <div class="m-layout">
    <Layout>
      <Header class="header-bar">
        <Menu mode="horizontal" theme="dark" class="menu-warp" :active-name="activeName" :open-names="openName">
          <h2 class="system-name" @click="toHome">业务系统</h2>
          <div v-for="(v, index) in navList" :key="index">
            <Submenu :name="v.name" v-if="v.isShow">
              <template #title>{{ v.title }} </template>
              <div v-for="(cur, k) in v.subNav" :key="k">
                <template v-if="cur.isShow">
                  <MenuGroup :title="cur.title" v-if="cur.subNav && cur.subNav.length">
                    <div v-for="(curNav, cInd) in cur.subNav" :key="cInd">
                      <MenuItem v-if="curNav.isShow" @click="handleSkip(curNav.name)" :name="curNav.name">
                        {{ curNav.title }}
                      </MenuItem>
                    </div>
                  </MenuGroup>
                  <MenuItem v-else @click="handleSkip(cur.name)" :name="cur.name">
                    {{ cur.title }}
                  </MenuItem>
                </template>
              </div>
            </Submenu>
          </div>
          <ul class="login-info">
            <li class="item">
              <Poptip>
                <div class="user-info">
                  <Icon type="ios-contact" class="user-icon power" size="18"></Icon>
                  {{ userInfo.user_name }}
                  <Icon type="md-arrow-dropdown" class="user-icon" size="18"></Icon>
                </div>
                <template #content>
                  <ul class="poptip-list" @click="navClick($event)">
                    <!-- <li data-name="downLoad">
                      <Icon type="ios-cloud-download"></Icon>
                      下载中心
                    </li> -->
                    <li data-name="logOut">
                      <Icon type="md-log-out"></Icon>
                      退出
                    </li>
                  </ul>
                </template>
              </Poptip>
            </li>
          </ul>
        </Menu>
      </Header>
      <Layout>
        <Layout class="main">
          <Breadcrumb>
            <BreadcrumbItem :key="index" :to="bread.to" v-for="(bread, index) in breadcrumbInfo">{{ bread.title }}</BreadcrumbItem>
          </Breadcrumb>
          <Content class="main-info">
            <router-view></router-view>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Getter, Action } from 'vuex-class'
import { loginOut } from '@/api/index'
import { MenuList, MenuItem, PureObject } from '@/constants/variableType'
import { menuList } from '@/constants/menu'

@Options({
  components: {}
})
export default class BaseComponent extends Vue {
  @Getter('userInfo') userInfo!: PureObject
  @Getter('selectItems') selectItems!: PureObject
  @Action('getSelectList') getSelectList!: () => Record<string, never>

  activeName = ''
  openName: string[] = []
  roleIds: number[] = []
  navList: Array<MenuList> = []

  get breadcrumbInfo() {
    return this._creatBreadcrumb()
  }

  created() {
    if (!Object.keys(this.selectItems).length) {
      this.getSelectList()
    }
    this.navList = menuList
    this._handleMenuAuto()
  }

  handleSkip(name: string) {
    this.activeName = name
    this.$router
      .push({
        name: name
      })
      .catch((err) => {
        console.log(err)
      })
  }

  userLoginOut(): void {
    loginOut((res: any) => {
      if (+res.code === 200) {
        this.$Message.success({
          content: '退出登录',
          onClose: (): void => {
            window.location.href = '/login'
          }
        })
      }
    })
  }

  navClick(e: any) {
    const name = e.target.dataset.name
    switch (name) {
      case 'logOut':
        this.userLoginOut()
        break
    }
  }

  toHome() {
    this.$router.push({
      name: 'home'
    })
  }

  _creatBreadcrumb() {
    const breadInfo: any = []
    const curName = this.$route.name
    this.navList.forEach((root: MenuList) => {
      if (root.subNav && root.subNav.length) {
        root.subNav.forEach((child: MenuItem) => {
          if (child.subNav && child.subNav.length) {
            child.subNav.forEach((sub: any) => {
              if (sub.name === curName) {
                breadInfo.push({
                  title: root.title
                })
                breadInfo.push({
                  title: child.title,
                  to: { name: child.name }
                })
                breadInfo.push({
                  title: sub.title,
                  to: { name: sub.name }
                })
              }
            })
          } else {
            if (child.name === curName) {
              breadInfo.push({
                title: root.title
              })
              breadInfo.push({
                title: child.title,
                to: { name: child.name }
              })
            }
          }
        })
      }
    })
    return breadInfo
  }

  _handleMenuAuto() {
    this.activeName = this.$route.name as string
    this.openName = this.$route.matched.map((match) => match.name as string)
  }
}
</script>

<style lang="scss" scoped>
.m-layout {
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  height: 100%;
  text-align: left;
  overflow: auto;
  .ivu-layout {
    height: 100%;
  }
  .header-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
    padding: 0 10px;
    .menu-warp {
      height: 64px;
      line-height: 64px;
      background: none;
      .system-name {
        float: left;
        font-size: 20px;
        color: #fff;
        margin-right: 20px;
        cursor: pointer;
      }
    }
  }
  .ivu-layout-header {
    padding: 0 26px;
    background: #2173dc;
    background: -webkit-gradient(linear, left top, right top, from(#1d42ab), color-stop(#2173dc), to(#1e93ff));
    background: linear-gradient(90deg, #1d42ab, #2173dc, #1e93ff);
    background-color: rgb(43, 49, 55);
  }
  .login-info {
    float: right;
    color: #fff;
    li {
      display: inline;
      list-style: none;
      padding-right: 10px;
    }
    .login-out {
      cursor: pointer;
    }
  }
  .layout-logo {
    width: 198px;
    height: 30px;
    float: left;
    position: relative;
    top: 10px;
    left: 0;
    .logo {
      width: 82px;
      height: 37px;
      float: left;
      margin: 4px 4px 0 0;
    }
  }
  .user-info {
    cursor: pointer;
    font-size: 12px;
    .user-icon {
      vertical-align: text-bottom;
      line-height: 0.85;
      &.power {
        margin-right: 2px;
      }
    }
  }
  .poptip-list {
    li {
      display: block;
      line-height: 2;
      cursor: pointer;
      color: #666;
      &:hover {
        color: #57a3f3;
      }
    }
  }
  .main {
    padding: 64px 20px 20px 20px;
    .ivu-breadcrumb {
      margin: 16px 0px;
    }
    .main-info {
      padding: 24px;
      background: #fff;
    }
  }
}
</style>
<style lang="scss">
.ivu-menu-submenu-title {
  font-size: 14px;
}
.ivu-menu-submenu {
  padding: 0 10px !important;
  .ivu-select-dropdown {
    overflow-y: scroll !important;
    max-height: 500px !important;
    &::-webkit-scrollbar {
      /* 隐藏默认的滚动条 */
      -webkit-appearance: none;
    }
    &::-webkit-scrollbar:vertical {
      /* 设置垂直滚动条宽度 */
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 8px;
      border: 2px solid #797979;
      background-color: #797979;
    }
  }
}
.ivu-menu-horizontal .ivu-menu-submenu .ivu-select-dropdown .ivu-menu-item {
  font-size: 13px !important;
}

.ivu-menu-item-group-title {
  font-weight: bold;
  color: #333;
}
</style>
