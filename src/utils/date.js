/**
 * 日期处理工具类
 */
export default {
  /**
   * 日期格式化
   * @param date 日期
   * @param type 格式（1.YYYY-MM-DD 2.YYYY-MM-DD hh:mm:ss 3.YYYY年MM月DD日 2.YYYY年MM月DD日 hh时mm分ss秒）
   * @returns 日期字符串
   */
  formatDate (date, type) {
    const year = date.getFullYear()
    const monthTemp = date.getMonth() + 1
    let month = `${monthTemp}`
    if (monthTemp < 10) {
      month = `0${monthTemp}`
    }
    const dayTemp = date.getDate()
    let day = `${dayTemp}`
    if (dayTemp < 10) {
      day = `0${dayTemp}`
    }
    const hourTemp = date.getHours()
    let hour = `${hourTemp}`
    if (hourTemp < 10) {
      hour = `0${hourTemp}`
    }
    const minuteTemp = date.getMinutes()
    let minute = `${minuteTemp}`
    if (minuteTemp < 10) {
      minute = `0${minuteTemp}`
    }
    const sencondTemp = date.getSeconds()
    let sencond = `${sencondTemp}`
    if (sencondTemp < 10) {
      sencond = `0${sencondTemp}`
    }
    let str = ''
    switch (type) {
      case '1':
        str = `${year}-${month}-${day}`
        break
      case '2':
        str = `${year}-${month}-${day} ${hour}:${minute}:${sencond}`
        break
      case '3':
        str = `${year}年${month}月${day}日`
        break
      case '4':
        str = `${year}年${month}月${day}日 ${hour}时${minute}分${sencond}秒`
        break
    }
    return str
  }
}
