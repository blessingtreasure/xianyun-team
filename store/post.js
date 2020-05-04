// 存放仓库该分类（post）下的数据
export const state = () => {
  return {
    draftList: [],
    // 用于重现的草稿
    draft: ''
  }
}
export const mutations = {
  setDraft(state, draft) {
    state.draftList.unshift(draft)
    if (state.draftList.length > 5) {
      state.draftList.length = 5
    }
  },
  getDraftDetail(state, index) {
    for (var i = 0; i < state.draftList.length; i++) {
      if (index === i) {
        state.draft = state.draftList[i]
      }
    }
  },
  removeDraft(state, index) {
    for (var i = 0; i < state.draftList.length; i++) {
      if (index === i) {
        state.draftList.splice(i, 1)
      }
    }
    console.log(state.draftList)
    state.draft = ''
  }
}
export const getters = {
  draftList(state) {
    const draftArr = JSON.parse(JSON.stringify(state.post.draftList))
    if (draftArr.length === 0) return false
    const temp = draftArr.map(v => {
      v.content = v.content.replace(/<img.*>/ig, '')
      return v
    })
    return temp
  }
}
