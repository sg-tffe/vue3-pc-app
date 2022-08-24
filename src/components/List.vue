<template>
  <div id="list" class="m-list">
    <Form class="form" ref="searchForm" :model="searchInfo" :label-width="80" inline @keyup.enter="search()">
      <div class="m-form-group">
        <FormItem label="姓名：">
          <Input v-model="searchInfo.name" placeholder="请输入姓名" clearable class="ivu-input-detail"></Input>
        </FormItem>
        <FormItem label="年级：">
          <Select v-if="selectItems.channel" clearable v-model="searchInfo.class" placeholder="请选择年级" class="ivu-select-detail">
            <Option :key="key" :value="key" v-for="(item, key) in selectItems.channel">{{ item }}</Option>
          </Select>
        </FormItem>
        <FormItem class="fix-form-btn">
          <Button type="primary" :loading="loading" @click="search()">查询</Button>
        </FormItem>
      </div>
    </Form>
    <p class="right-btns">
      <Button type="success" icon="md-add" @click="handleCreate()">新增</Button>
    </p>
    <Table border ref="table" :data="list" v-if="list.length" :loading="loading" :columns="listTableHead">
      <template #loading>
        <Spin fix class="m-loading">
          <Icon type="ios-loading" size="18" class="spin-icon"></Icon>
          <div>Loading</div>
        </Spin>
      </template>
      <template #action="{ row }">
        <Button type="text" class="fix-table-btn" @click="viewDetail(row)" icon="ios-eye" size="small">查看</Button>
      </template>
    </Table>
    <Alert v-else>暂无数据</Alert>

    <Page
      show-total
      show-elevator
      :page-size="pageInfo.pageSize"
      :total="pageInfo.pageCount"
      v-if="pageInfo.pageCount > 0"
      class-name="m-pagination"
      @on-change="handleUpdatePage"
      :current="searchInfo.page"
    />
    <!-- 分页 -->
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Getter } from 'vuex-class'
import { getList } from '@/api/index'
import { PureObject } from '@/constants/variableType'

@Options({})
export default class List extends Vue {
  @Getter('selectItems') selectItems!: PureObject

  searchInfo: any = {
    name: '',
    class: '',
    page: 1
  }

  list = []
  loading = false

  pageInfo = {
    pageSize: 0,
    pageCount: 0
  }

  listTableHead = [
    { title: '姓名', align: 'center', key: 'name', minWidth: 40 },
    { title: '年龄', align: 'center', key: 'age', minWidth: 40 },
    { title: '年级', align: 'center', key: 'class' },
    { title: '操作', align: 'center', key: 'action', minWidth: 150, slot: 'action' }
  ]

  created() {
    this._getList()
  }

  handleUpdatePage(page = 1) {
    this.searchInfo.page = page
    this._getList()
  }

  handleCreate() {
    this.$Message.info('更多功能，自己开发哦～')
  }

  viewDetail() {
    this.$Message.info('更多功能，自己开发哦～')
  }

  search() {
    this.searchInfo.page = 1
    this._getList()
  }

  _getList() {
    this.loading = true
    getList(this.searchInfo, (res: any) => {
      this.loading = false
      if (+res.code === 200) {
        const data = res.data || {}
        this.list = data.list || []
        this.pageInfo.pageSize = +data.arrPager.pageSize
        this.pageInfo.pageCount = +data.arrPager.count || 0
      }
    })
  }
}
</script>

<style scoped lang="scss">
.m-list {
  background-color: #fff;
  .right-btns {
    margin-bottom: 10px;
    margin-top: -10px;
    text-align: right;
    button {
      margin-right: 15px;
    }
  }
}
</style>
