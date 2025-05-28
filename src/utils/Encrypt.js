/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const tyywEncrypt = {
  Encrypt (str) {
    if (str === '') return ''
    str = escape(str)
    let pwd = 'ae8b516cbffde62a74b726c82eb6748ad41d251480d84ce2e96ebf57ebaa8b22'
    pwd = escape(pwd)
    if (pwd === null || pwd.length <= 0) {
      alert('Please enter a password with which to encrypt the message.')
      return null
    }
    let prand = ''
    for (let I = 0; I < pwd.length; I++) {
      prand += pwd.charCodeAt(I).toString()
    }
    const sPos = Math.floor(prand.length / 5)
    const mult = parseInt(prand.charAt(sPos) + prand.charAt(sPos * 2) + prand.charAt(sPos * 3) + prand.charAt(sPos * 4) + prand.charAt(sPos * 5))
    const incr = Math.ceil(pwd.length / 2)
    const modu = Math.pow(2, 31) - 1
    if (mult < 2) {
      alert('Algorithm cannot find a suitable hash. Please choose a different password. /nPossible considerations are to choose a more complex or longer password.')
      return null
    }
    let salt = Math.round(Math.random() * 1000000000) % 100000000
    prand += salt
    while (prand.length > 10) {
      prand = (parseInt(prand.substring(0, 10)) + parseInt(prand.substring(10, prand.length))).toString()
    }
    prand = (mult * prand + incr) % modu
    let encChr = ''
    let encStr = ''
    for (let I = 0; I < str.length; I++) {
      encChr = parseInt(str.charCodeAt(I) ^ Math.floor((prand / modu) * 255))
      if (encChr < 16) {
        encStr += '0' + encChr.toString(16)
      } else encStr += encChr.toString(16)
      prand = (mult * prand + incr) % modu
    }
    salt = salt.toString(16)
    while (salt.length < 8) salt = '0' + salt
    encStr += salt
    return encStr
  },

  Decrypt (str) {
    if (str === '') return ''
    let pwd = 'ae8b516cbffde62a74b726c82eb6748ad41d251480d84ce2e96ebf57ebaa8b22'
    pwd = escape(pwd)
    if (str === null || str.length < 8) {
      alert("A salt value could not be extracted from the encrypted message because it's length is too short. The message cannot be decrypted.")
      return
    }
    if (pwd === null || pwd.length <= 0) {
      alert('Please enter a password with which to decrypt the message.')
      return
    }
    let prand = ''
    for (let I = 0; I < pwd.length; I++) {
      prand += pwd.charCodeAt(I).toString()
    }
    const sPos = Math.floor(prand.length / 5)
    const mult = parseInt(prand.charAt(sPos) + prand.charAt(sPos * 2) + prand.charAt(sPos * 3) + prand.charAt(sPos * 4) + prand.charAt(sPos * 5))
    const incr = Math.round(pwd.length / 2)
    const modu = Math.pow(2, 31) - 1
    const salt = parseInt(str.substring(str.length - 8, str.length), 16)
    str = str.substring(0, str.length - 8)
    prand += salt
    while (prand.length > 10) {
      prand = (parseInt(prand.substring(0, 10)) + parseInt(prand.substring(10, prand.length))).toString()
    }
    prand = (mult * prand + incr) % modu
    let encChr = ''
    let encStr = ''
    for (let I = 0; I < str.length; I += 2) {
      encChr = parseInt(parseInt(str.substring(I, I + 2), 16) ^ Math.floor((prand / modu) * 255))
      encStr += String.fromCharCode(encChr)
      prand = (mult * prand + incr) % modu
    }
    return unescape(encStr)
  }
}
// 创建 Base64 对象
const Base64 = {
  _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
  encode: function (e) {
    let t = ''
    let n, r, i, s, o, u, a
    let f = 0
    e = Base64._utf8_encode(e)
    while (f < e.length) {
      n = e.charCodeAt(f++)
      r = e.charCodeAt(f++)
      i = e.charCodeAt(f++)
      s = n >> 2
      o = ((n & 3) << 4) | (r >> 4)
      u = ((r & 15) << 2) | (i >> 6)
      a = i & 63
      if (isNaN(r)) {
        u = a = 64
      } else if (isNaN(i)) {
        a = 64
      }
      t =
        t +
        this._keyStr.charAt(s) +
        this._keyStr.charAt(o) +
        this._keyStr.charAt(u) +
        this._keyStr.charAt(a)
    }
    return t
  },
  decode: function (e) {
    let t = ''
    let n, r, i
    let s, o, u, a
    let f = 0
    e = e.replace(/[^A-Za-z0-9+/=]/g, '')
    while (f < e.length) {
      s = this._keyStr.indexOf(e.charAt(f++))
      o = this._keyStr.indexOf(e.charAt(f++))
      u = this._keyStr.indexOf(e.charAt(f++))
      a = this._keyStr.indexOf(e.charAt(f++))
      n = (s << 2) | (o >> 4)
      r = ((o & 15) << 4) | (u >> 2)
      i = ((u & 3) << 6) | a
      t = t + String.fromCharCode(n)
      if (u !== 64) {
        t = t + String.fromCharCode(r)
      }
      if (a !== 64) {
        t = t + String.fromCharCode(i)
      }
    }
    t = Base64._utf8_decode(t)
    return t
  },
  _utf8_encode: function (e) {
    e = e.replace(/rn/g, 'n')
    let t = ''
    for (let n = 0; n < e.length; n++) {
      const r = e.charCodeAt(n)
      if (r < 128) {
        t += String.fromCharCode(r)
      } else if (r > 127 && r < 2048) {
        t += String.fromCharCode((r >> 6) | 192)
        t += String.fromCharCode((r & 63) | 128)
      } else {
        t += String.fromCharCode((r >> 12) | 224)
        t += String.fromCharCode(((r >> 6) & 63) | 128)
        t += String.fromCharCode((r & 63) | 128)
      }
    }
    return t
  },
  _utf8_decode: function (e) {
    let t = ''
    let n = 0
    let c1, c2, c3
    let r = (c1 = c2 = 0)
    while (n < e.length) {
      r = e.charCodeAt(n)
      if (r < 128) {
        t += String.fromCharCode(r)
        n++
      } else if (r > 191 && r < 224) {
        c2 = e.charCodeAt(n + 1)
        t += String.fromCharCode(((r & 31) << 6) | (c2 & 63))
        n += 2
      } else {
        c2 = e.charCodeAt(n + 1)
        c3 = e.charCodeAt(n + 2)
        t += String.fromCharCode(
          ((r & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)
        )
        n += 3
      }
    }
    return t
  }
}
export default {
  tyywEncrypt,
  Base64
}
export { tyywEncrypt, Base64 }
