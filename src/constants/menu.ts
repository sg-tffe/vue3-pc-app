import { MenuList } from '@/constants/variableType'

export const menuList: Array<MenuList> = [
  {
    title: '列表管理',
    name: 'main',
    icon: 'md-list',
    isShow: true,
    subNav: [
      {
        isShow: true,
        title: '列表页',
        name: 'list'
      }
    ]
  }
]
