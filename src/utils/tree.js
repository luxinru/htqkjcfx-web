/* eslint-disable @typescript-eslint/no-explicit-any */

export default class TreeUtil {
  /**
   * 数组转树形列表
   * @param arr 数组
   * @param bm 父编码值
   * @param pid 父编码列
   * @param id 编码列
   * @returns 树形列表
   */
  static listToTree(arr, bm, pid, id) {
    const newArr = []
    for (const item of arr) {
      if (item[pid] === bm) {
        item.children = TreeUtil.listToTree(arr, item[id], pid, id)
        newArr.push(item)
      }
    }
    return newArr
  }

  // 组装树
  static getTreeData(arr, id, pid) {
    const newArr = []
    const obj = {}
    for (const item of arr) {
      obj[item[id]] = item
    }
    for (const item of arr) {
      const pItem = obj[item[pid]]
      if (pItem) {
        if (!pItem.children) {
          pItem.children = []
        }
        pItem.children.push(item)
      } else {
        newArr.push(item)
      }
    }

    return newArr
  }

  /**
   * 解析树接口节点
   * @param arr 传入数据源
   * @param backType 返回类型：值包括'array' / 'object'，默认：'array'
   * @param keyName 返回对象key对应值绑定的属性名
   * @returns
   */
  static findAllNode(
    arr,
    backType = 'array',
    keyName
  ) {
    if (!Array.isArray(arr)) {
      console.info('传入数据源非数组')
      return []
    }
    const stack = arr.map((node) => node)
    const arrRes = []
    const objRes = {}
    while (stack.length) {
      // 栈顶结点出栈
      const node = stack.pop()
      // 根据类型存储到对应内容中
      backType === 'array' ? arrRes.push(node) : (objRes[node[keyName]] = node)
      if (node.children?.length) {
        stack.push(...node.children.reverse())
      }
    }
    return backType === 'array' ? arrRes : objRes
  }

  /**
   * 树形列表转数组
   * @param 树形列表
   * @returns 数组
   */
  static treeToList(arr) {
    let newArr = []
    for (const item of arr) {
      newArr.push(item)
      if (item.children && item.children.length > 0) {
        newArr = [...TreeUtil.treeToList(item.children), newArr]
      }
    }
    return newArr
  }
}
