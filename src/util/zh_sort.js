export const zhSort = (arr) => {
    return arr.sort((a, b) => {
        return a.localeCompare(b, 'zh-Hans-CN', {sensitivity: 'accent'})
    })
}