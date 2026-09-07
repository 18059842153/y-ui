export interface YUILocale {
  loading: string
  noData: string
  close: string
  confirm: string
  cancel: string
  search: string
  clear: string
  reset: string
  select: {
    placeholder: string
    noMatch: string
    noData: string
  }
  input: {
    placeholder: string
  }
  dialog: {
    close: string
    confirm: string
    cancel: string
  }
  tabs: {
    closeTab: string
  }
  card: {
    loading: string
  }
  pagination: {
    total: (count: number) => string
    goto: string
    page: (page: number) => string
  }
}

export const defaultLocale: YUILocale = {
  loading: 'Loading',
  noData: 'No data',
  close: 'Close',
  confirm: 'Confirm',
  cancel: 'Cancel',
  search: 'Search',
  clear: 'Clear',
  reset: 'Reset',
  select: {
    placeholder: 'Select...',
    noMatch: 'No matching data',
    noData: 'No data',
  },
  input: {
    placeholder: 'Enter...',
  },
  dialog: {
    close: 'Close dialog',
    confirm: 'OK',
    cancel: 'Cancel',
  },
  tabs: {
    closeTab: 'Close tab',
  },
  card: {
    loading: 'Loading...',
  },
  pagination: {
    total: (count: number) => `Total ${count} items`,
    goto: 'Go to',
    page: (page: number) => `Page ${page}`,
  },
}

export const zhCN: YUILocale = {
  loading: '加载中',
  noData: '暂无数据',
  close: '关闭',
  confirm: '确认',
  cancel: '取消',
  search: '搜索',
  clear: '清除',
  reset: '重置',
  select: {
    placeholder: '请选择',
    noMatch: '无匹配数据',
    noData: '暂无数据',
  },
  input: {
    placeholder: '请输入',
  },
  dialog: {
    close: '关闭对话框',
    confirm: '确定',
    cancel: '取消',
  },
  tabs: {
    closeTab: '关闭标签页',
  },
  card: {
    loading: '加载中...',
  },
  pagination: {
    total: (count: number) => `共 ${count} 条`,
    goto: '前往',
    page: (page: number) => `第 ${page} 页`,
  },
}

export const jaJP: YUILocale = {
  loading: '読み込み中',
  noData: 'データなし',
  close: '閉じる',
  confirm: '確認',
  cancel: 'キャンセル',
  search: '検索',
  clear: 'クリア',
  reset: 'リセット',
  select: {
    placeholder: '選択してください',
    noMatch: '一致するデータがありません',
    noData: 'データなし',
  },
  input: {
    placeholder: '入力してください',
  },
  dialog: {
    close: 'ダイアログを閉じる',
    confirm: 'OK',
    cancel: 'キャンセル',
  },
  tabs: {
    closeTab: 'タブを閉じる',
  },
  card: {
    loading: '読み込み中...',
  },
  pagination: {
    total: (count: number) => `合計 ${count} 件`,
    goto: '移動',
    page: (page: number) => `${page} ページ`,
  },
}
