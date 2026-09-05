export interface YUILocale {
  loading: string
  noData: string
  close: string
  confirm: string
  cancel: string
  search: string
  select: {
    placeholder: string
    noMatch: string
  }
  pagination: {
    total: (count: number) => string
    goto: string
  }
}

export const defaultLocale: YUILocale = {
  loading: 'Loading',
  noData: 'No data',
  close: 'Close',
  confirm: 'Confirm',
  cancel: 'Cancel',
  search: 'Search',
  select: {
    placeholder: 'Select...',
    noMatch: 'No matching data',
  },
  pagination: {
    total: (count: number) => `Total ${count} items`,
    goto: 'Go to',
  },
}

export const zhCN: YUILocale = {
  loading: '加载中',
  noData: '暂无数据',
  close: '关闭',
  confirm: '确认',
  cancel: '取消',
  search: '搜索',
  select: {
    placeholder: '请选择',
    noMatch: '无匹配数据',
  },
  pagination: {
    total: (count: number) => `共 ${count} 条`,
    goto: '前往',
  },
}
