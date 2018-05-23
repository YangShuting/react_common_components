import {zhSort} from './zh_sort'

test('测试中文数组按拼音排序函数', () => {
    expect(zhSort(['中国', '美国', '阿尔及利亚', '巴西'])).toBe(['阿尔及利亚', '巴西', '美国' , '中国'])
})
