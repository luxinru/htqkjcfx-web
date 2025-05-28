/* ===================== 浏览器版本控制 ===================== */

// 获取浏览器版本信息
function getBrowserInfo () {
  const ua = window.navigator.userAgent.toLowerCase()
  const ie = /msie [\d.]+;/gi
  const ie11 = /rv:(\d+\.\d+)/
  const ff = /firefox\/[\d.]+/gi
  const chrome = /chrome\/[\d.]+/gi
  const saf = /safari\/[\d.]+/gi
  const opr = /opr\/[\d.]+/gi
  // IE11以下
  if (ua.indexOf('msie') > 0) {
    return ua.match(ie)
  }
  // IE11
  if (ua.indexOf('trident') > 0 && ua.indexOf('rv') > 0) {
    return 'IE' + ua.match(ie11)[1]
  }
  // firefox
  if (ua.indexOf('firefox') > 0) {
    return ua.match(ff)
  }
  // opera
  if (ua.indexOf('opr') > 0) {
    return ua.match(opr)
  }
  // chrome
  if (ua.indexOf('chrome') > 0) {
    return ua.match(chrome)
  }
  // safari
  if (ua.indexOf('safari') > 0 && !ua.includes('chrome')) {
    return ua.match(saf)
  }
}
// 版本控制
function versionControl (browserInfo) {
  const val = browserInfo.split('/')
  const browser = val[0]
  const version = parseFloat(val[1])
  switch (browser) {
    case 'chrome':
      return version >= 49
    case 'msie':
      return false
    case 'safari':
      return false
    case 'firefox':
      return version >= 52
    case 'opr':
      return version >= 82
    case 'IE':
      return true
    default:
      return true
  }
}
// 创建遮罩层
function createMask () {
  const div = document.createElement('div')
  div.style.width = '100%'
  div.style.height = '100%'
  div.style.backgroundColor = '#fff'
  div.style.position = 'fixed'
  div.style.top = '0'
  div.style.left = '0'
  div.style.zIndex = '100000'
  const img = document.createElement('img')
  img.src = require('@/assets/images/plugins/error.png')
  img.style.position = 'fixed'
  img.style.top = 'calc(50% - 20px)'
  img.style.left = '50%'
  img.style.transform = 'translate(-50%, -50%)'
  div.appendChild(img)
  const span = document.createElement('span')
  span.style.fontSize = '24px'
  span.style.color = '#879bba'
  span.style.position = 'absolute'
  span.style.left = '50%'
  span.style.top = 'calc(50% + 100px)'
  span.style.transform = 'translate(-50%, -50%)'
  span.style.letterSpacing = '5px'
  span.innerHTML = '不支持的浏览器版本'
  div.appendChild(span)
  document.body.appendChild(div)
}

// 获取浏览器版本信息
const browserInfo = getBrowserInfo()
// 版本控制
const flag = versionControl(browserInfo[0])
if (!flag) {
  // 创建遮罩层
  createMask()
}
