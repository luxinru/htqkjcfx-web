/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// eslint-disable-next-line camelcase
const _wps_np_ = {
  isWpsLocalPluginUsable: () => {
    const version =
      navigator.plugins['WPS extension for browser'] ||
      navigator.plugins['Kingsoft WPS Plugin']
    return typeof version !== 'undefined'
  },
  getOS: () => {
    const userAgent = window.navigator.userAgent
    const platform = window.navigator.platform
    const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K']
    const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE']
    const iosPlatforms = ['iPhone', 'iPad', 'iPod']

    if (macosPlatforms.indexOf(platform) !== -1) {
      return 'MacOS'
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      return 'iOS'
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      return 'Windows'
    } else if (/Android/.test(userAgent)) {
      return 'Android'
    } else if (/Linux/.test(platform)) {
      return 'Linux'
    }

    return null
  },
  createNew: (parentNode, wrapIframe) => {
    if (!_wps_np_.isWpsLocalPluginUsable()) {
      throw Error('WPS阅读器NP插件不可用, 请确认已安装专用版WPS软件')
    }

    if (!parentNode) {
      throw Error('缺少parentNode参数, 必须提供该参数作为WPS插件的父节点')
    }

    const rootParentNode = parentNode
    parentNode.style.position = 'relative'

    // TODO 如果出现问题了，就用回iframe
    // if (wrapIframe) {
    //   parentNode.innerHTML = `<iframe style="width: 100%;height:100%;margin: 0 !important;padding: 0 !important;border: 0 !important;"></iframe>`
    //   const iframe = parentNode.firstElementChild

    //   iframe.contentDocument.write(
    //     `<body style="margin: 0 !important;"> <div id="__inner_wps__"></div> </body>`
    //   )

    //   parentNode = iframe.contentWindow.document.getElementById('__inner_wps__')
    // } else {
    parentNode.innerHTML = ''
    // }

    const os = _wps_np_.getOS()

    let _wps = document.createElement('embed')
    // _wpsElement总是指向embed标签
    const _wpsElement = _wps
    if (os === 'Windows') {
      _wps.setAttribute('type', 'application/x-wps-np-plugin')
    } else if (os === 'Linux') {
      _wps.setAttribute('type', 'application/x-wps')
    } else {
      throw Error(`当前使用的操作系统(${os})不支持WPS NP插件.`)
    }

    _wps.setAttribute('height', '100%')
    _wps.setAttribute('width', '100%')

    parentNode.appendChild(_wps)

    // 在Linux平台下，需要在_wps.app对象中调用相关的NP插件接口
    if (_wps_np_.getOS() === 'Linux') {
      _wps = _wps.Application
    }

    _wps.WpsApplication = function () {
      if (_wps_np_.getOS() === 'Linux') {
        return _wps
      }

      return _wps.Application
    }

    const wpsExt = {}

    wpsExt.innerWps = _wps
    const state = {}

    wpsExt.apis = {}
    wpsExt.enums = _wps_np_.enums

    // ======= TODO 删除日志
    if (window) {
      window.readWpsLog = param => {
        return _wps.WpsApplication().readlog(param)
      }
      window.readTimeConsumerRecord = param => {
        return _wps.WpsApplication().readTimeConsumerRecord(param)
      }
    }
    // =======

    wpsExt.hidePlugin = () => {
      _wpsElement.style.visibility = 'hidden'
    }

    wpsExt.showPlugin = () => {
      _wpsElement.style.visibility = 'visible'
    }

    function showMask () {
      wpsExt.hidePlugin()
    }

    function hideMask () {
      wpsExt.showPlugin()
    }

    /**
     * 获取WPS的版本号
     */
    wpsExt.apis.getWPSVersion = async function () {
      return _wps.WpsApplication().Version
    }

    wpsExt.getApplication = function () {
      return _wps.WpsApplication()
    }

    wpsExt.apis.getPageCount = async function (params = {}) {
      const doc = wpsExt.apis.getDoc(params)
      return doc.ActiveWindow.ActivePane.Pages.Count
    }

    wpsExt.apis.getFilePath = async function (params) {
      const doc = wpsExt.apis.getDoc(params)
      return `${doc.Path}/${doc.Name}`
    }

    wpsExt.apis.fitWindowSize = async function () {
      const app = _wps.WpsApplication()
      const doc = wpsExt.apis.getDoc({})

      app.ActiveWindow.ActivePane.View.Zoom.PageFit = 2
      const zoomRadio = doc.ActiveWindow.View.Zoom.Percentage
      if (zoomRadio > 150) {
        doc.Application.ActiveWindow.View.Zoom.Percentage = 150
      }
    }

    wpsExt.apis.toggleShowRevision = async function (params = { show: true }) {
      const doc = wpsExt.apis.getDoc(params)
      doc.ActiveWindow.View.ShowRevisionsAndComments = params.show
    }

    wpsExt.apis.toggleRevisionMode = async function (
      params = { enable: false }
    ) {
      wpsExt.apis.getDoc(params).TrackRevisions = params.enable
    }

    /**
     * params = {
     *     filePath, // 要复制的内容所在文档的路径
     * }
     */
    wpsExt.apis.copyFrom = async function (params) {
      const selection = _wps.WpsApplication().Selection
      console.log(`要插入源文件路径: ${params.filePath}`)
      try {
        selection.InsertFile(params.filePath)
      } catch (e) {
        console.log(e)
        throw Error(
          `插入文档内容失败，请确认源文件是否存在: ${params.filePath}`
        )
      }
    }

    // ========== 书签相关函数

    /**
     * params = {
     *     bookmarkName, // 书签名
     *     bookmarkValue, // 书签上显示的文本
     *     append: true为追加文本，false为替换文本
     * }
     *
     * 无返回值
     *
     * 如果要添加的bookmarkName已存在, 则抛出异常
     */
    wpsExt.apis.setBookmarkValue = async function (params = {}) {
      const doc = wpsExt.apis.getDoc(params)
      const bookmarkName = params.bookmarkName
      const bookmarkValue = params.bookmarkValue
      const bookmarks = doc.Bookmarks

      if (bookmarks.Exists(bookmarkName)) {
        const bookmark = bookmarks.Item(bookmarkName)
        const range = bookmark.Range

        bookmark.Delete()
        range.Select()

        if (params.append) {
          range.Text = range.Text + bookmarkValue
        } else {
          range.Text = bookmarkValue
        }

        bookmarks.Add(bookmarkName, range)
      } else {
        throw Error(`书签[${bookmarkName}]不存在`)
      }
    }

    /**
     * params = {
     *     bookmarkName, // 根据书签名删除书签
     *     keepText, // 是否保留书签上的文字，默认true
     * }
     *
     * 无返回值
     *
     * 如果书签不存在，则抛出异常
     */
    wpsExt.apis.deleteBookmark = async function (
      params = {
        keepText: true
      }
    ) {
      const doc = wpsExt.apis.getDoc(params)
      const bookmarks = doc.Bookmarks
      const bookmarkIndex = params.bookmarkIndex
      const bookmarkName = params.bookmarkName

      let item = null
      if (bookmarkIndex) {
        if (bookmarkIndex > bookmarks.Count) {
          throw Error(
            `书签索引溢出, 书签数量: ${
              bookmarks.Count
            }, 下标参数: ${bookmarkIndex}`
          )
        }

        item = bookmarks.Item(bookmarkIndex)
      } else if (bookmarkName) {
        item = bookmarks.Item(bookmarkName)
      }

      if (item) {
        item.Range.Select()

        if (!params.keepText) item.Range.Text = ''

        item.Delete()
      } else {
        throw Error('书签不存在')
      }
    }

    /**
     * params = {
     *     bookmarkName // 根据书签名定位
     * }
     *
     * 无返回值
     *
     * 如果书签不存在，则抛出异常
     */
    wpsExt.apis.goToBookmark = async function (params = {}) {
      const doc = wpsExt.apis.getDoc(params)
      const bookmarks = doc.Bookmarks
      const bookmarkIndex = params.bookmarkIndex
      const bookmarkName = params.bookmarkName

      let item = null
      if (bookmarkIndex) {
        if (bookmarkIndex > bookmarks.Count) {
          throw Error(
            `书签索引溢出, 书签数量: ${
              bookmarks.Count
            }, 下标参数: ${bookmarkIndex}`
          )
        }

        item = bookmarks.Item(bookmarkIndex)
      } else if (bookmarkName) {
        item = bookmarks.Item(bookmarkName)
      }

      if (item) {
        item.Select()
      } else {
        throw Error('书签不存在')
      }
    }

    /**
     * params = {
     *     bookmarkName, // 书签名
     *     picPath, // 图片的下载地址
     *     width, // 图片的宽度，单位mm
     *     height, // 图片的高度，单位mm
     *     align, // 0为居左，2为居右
     * }
     *
     * 无返回值
     *
     * 如果书签不存在，则抛出异常
     */
    wpsExt.apis.insertImageToBookmark = async function (params = {}) {
      const doc = wpsExt.apis.getDoc(params)
      const bookmarks = doc.Bookmarks
      const bookmarkIndex = params.bookmarkIndex
      const bookmarkName = params.bookmarkName

      let item = null
      if (bookmarkIndex) {
        if (bookmarkIndex > bookmarks.Count) {
          throw Error(
            `书签索引溢出, 书签数量: ${
              bookmarks.Count
            }, 下标参数: ${bookmarkIndex}`
          )
        }

        item = bookmarks.Item(bookmarkIndex)
      } else if (bookmarkName) {
        item = bookmarks.Item(bookmarkName)
      }

      if (item) {
        let addBookmark = false
        if (
          (await wpsExt.apis.getBookmarkText({
            bookmarkName: params.bookmarkName
          })).text === ''
        ) {
          item.Delete()
          addBookmark = true
        }

        const range = item.Range
        const pic = range.InlineShapes.AddPicture(
          params.picPath,
          false,
          true,
          range
        )

        if (!pic) {
          throw Error(`图片插入失败, 请确认图片是否存在: ${params.picPath}`)
        }

        const height = params.height
        const width = params.width

        pic.LockAspectRatio = 0

        if (height) {
          pic.Height = height
        }
        if (width) {
          pic.Width = width
        }

        if (params.align && (params.align === 0 || params.align === 2)) {
          range.ParagraphFormat.Alignment = params.align
        }
        if (addBookmark) {
          pic.Range.Select()
          bookmarks.Add(bookmarkName, pic.Range)
        }
      } else {
        throw Error('书签不存在')
      }
    }

    /**
     * params = {
     * }
     *
     * 无返回值
     */
    wpsExt.apis.showBookmarks = async function (params = {}) {
      const doc = wpsExt.apis.getDoc(params)
      doc.ActiveWindow.View.ShowBookmarks = params.show
    }

    /**
     * params = {
     * }
     *
     * 无返回值
     *
     * 如果要设置的bookmarkName已存在则抛出异常
     */
    wpsExt.apis.setSelectedTextAsBookmark = async function (params = {}) {
      const doc = wpsExt.apis.getDoc(params)
      const bookmarkName = params.bookmarkName
      const bookmarks = doc.Bookmarks

      if (bookmarks.Exists(bookmarkName)) {
        throw Error(`书签 ${bookmarkName} 已存在`)
      } else {
        const range = doc.ActiveWindow.Selection.Range

        range.Select()
        bookmarks.Add(bookmarkName, range)
      }
    }

    /**
     * params = {
     * }
     *
     * 返回值 = {
     *     text, // 书签的文本值
     * }
     *
     * 如果书签不存在则抛出异常
     */
    wpsExt.apis.getBookmarkText = async function (params = {}) {
      const doc = wpsExt.apis.getDoc(params)
      const bookmarkName = params.bookmarkName
      const bookmarks = doc.Bookmarks

      if (bookmarks.Exists(bookmarkName)) {
        return {
          text: bookmarks.Item(bookmarkName).Range.Text
        }
      } else {
        throw Error(`书签[${bookmarkName}]不存在`)
      }
    }

    /**
     * params = {
     *
     * 返回值 = {
     *     count, // 书签数量
     * }
     */
    wpsExt.apis.getBookmarkCount = async function (params = {}) {
      const doc = wpsExt.apis.getDoc(params)
      const bookmarks = doc.Bookmarks

      return {
        count: bookmarks.Count
      }
    }

    /**
     * params = {
     * }
     *
     * 返回值 = {
     *     exists, // true代表存在, false代表不存在
     * }
     */
    wpsExt.apis.bookmarkExists = async function (params = {}) {
      const doc = wpsExt.apis.getDoc(params)
      const bookmarkName = params.bookmarkName
      const bookmarks = doc.Bookmarks

      return {
        exists: bookmarks.Exists(bookmarkName)
      }
    }

    /**
     * params = {
     * }
     *
     * 返回值 = [书签列表]
     */
    wpsExt.apis.getBookmarkList = async function (params = {}) {
      const doc = wpsExt.apis.getDoc(params)

      const bookmarkList = []
      const bookmarks = doc.Bookmarks

      const count = bookmarks.Count
      if (count <= 0) {
        return bookmarkList
      }

      for (let i = 1; i <= count; i++) {
        bookmarkList.push(bookmarks.Item(i).Name)
      }

      return bookmarkList
    }

    // ========== 书签相关函数
    // ========== 公文域相关函数

    /**
     * params = {
     *     id, // 公文域的ID
     * }
     *
     * 无返回值
     *
     * 如果要添加的id已存在, 则会移除旧的公文域，并将当前光标选中的部分设置为新的公文域
     */
    wpsExt.apis.insertDocumentField = async function (params = {}) {
      const wpsApp = _wps.WpsApplication()
      const id = params.id

      if (id === null || id === undefined) {
        throw Error(`未提供要插入的公文域id: ${id}`)
      }

      wpsApp.insertDocumentField(id)
    }

    /**
     * params = {
     *     target, // 0：不带边框和底纹(默认)，1：带边框和底纹，2：带边框不带底纹
     * }
     *
     * 无返回值
     */
    wpsExt.apis.setDocumentFieldDisplay = async function (
      params = { target: 0 }
    ) {
      const wpsApp = _wps.WpsApplication()

      wpsApp.put_ShowDocumentFieldTarget(params.target)
    }

    /**
     * params = {
     *     id, // 公文域的ID
     *     keepText, // 是否保留公文域的内容
     * }
     *
     * 如果删除成功则返回true，如果删除失败或者对应的公文域不存在，则返回false
     */
    wpsExt.apis.deleteDocumentField = async function (params = {}) {
      const wpsApp = _wps.WpsApplication()
      const id = params.id
      const keepText = params.keepText

      if (id === null || id === undefined) {
        throw Error(`未提供要删除的公文域id: ${id}`)
      }
      if (await wpsExt.apis.documentFieldExists({ id: id })) {
        // false是保留文字，true是不保留
        return wpsApp.deleteDocumentField(id, !keepText)
      }

      return false
    }

    /**
     * params = {
     *     id, // 公文域的ID
     * }
     * 返回true代表存在, false代表不存在
     */
    wpsExt.apis.documentFieldExists = async function (params = {}) {
      const wpsApp = _wps.WpsApplication()
      const id = params.id

      if (id === null || id === undefined) {
        return false
      }

      const ids = wpsApp.getAllDocumentField()
      if (ids !== null && ids !== undefined) {
        return ids.split(',').indexOf(id) >= 0
      }

      return false
    }

    /**
     * params = {
     *     id, // 非必须，如果不传入，则默认切换所有的公文域的显示状态,
     *     show, // true为显示，false为隐藏
     * }
     */
    wpsExt.apis.showDocumentField = async function (params = {}) {
      const wpsApp = _wps.WpsApplication()
      const id = params.id
      const show = params.show

      if (id === null || id === undefined) {
        const ids = wpsApp.getAllDocumentField()
        if (ids !== null && ids !== undefined) {
          const idArr = ids.split(',')
          for (let i = 0; i < idArr.length; i++) {
            wpsApp.showDocumentField(idArr[i], show)
          }
        }
      } else if (await wpsExt.apis.documentFieldExists({ id: id })) {
        wpsApp.showDocumentField(id, show)
      }
    }

    /**
     * params = {
     *     id, // 要切换编辑状态的公文域id
     *     enable, // true为允许编辑，false为禁止编辑
     * }
     */
    wpsExt.apis.enableDocumentField = async function (params = {}) {
      const wpsApp = _wps.WpsApplication()
      const id = params.id
      const enable = params.enable

      if (id === null || id === undefined) {
        throw Error(`未提供要切换编辑状态的公文域id: ${id}`)
      }

      wpsApp.enableDocumentField(id, enable)
    }

    /**
     * 光标切换到公文域上
     * params = {
     *     id, // 要切换编辑状态的公文域id，
     *     position, // 0选中公文域，1移动到公文域的前一个字末尾，2移动到公文域的后一个字开头，3移动到公文域开头，4移动到公文域末尾
     * }
     */
    wpsExt.apis.cursorToDocumentField = async function (params = {}) {
      const wpsApp = _wps.WpsApplication()
      const id = params.id
      const position = params.position

      if (id === null || id === undefined) {
        throw Error(`未提供要切换编辑状态的公文域id: ${id}`)
      }
      if (!position || position < 0 || position > 4) {
        throw Error(`position取值必须在0～4之间: ${position}`)
      }

      wpsApp.cursorToDocumentField(id, position)
    }

    // ========== 公文域相关函数

    // ==========对话框相关函数

    /**
     * params = {
     *
     * 无返回值
     */
    wpsExt.apis.printDoc = async function (params = {}) {
      const doc = wpsExt.apis.getDoc(params)

      const wpsApp = _wps.WpsApplication()
      wpsApp.Dialogs.Item(_wps_np_.enums.WdWordDialog.wdDialogFilePrint).Show()
    }

    /**
     * params = {
     * }
     *
     * 无返回值
     */
    wpsExt.apis.showDialog = async function (params = {}) {
      const doc = wpsExt.apis.getDoc(params)
      const wdWordDialog = params.wdWordDialog
      const dialogs = doc.Application.Dialogs

      dialogs.Item(wdWordDialog).Show()
    }

    /**
     * params = {
     *
     * 无返回值
     */
    wpsExt.apis.printPreview = async function (params = {}) {
      const doc = wpsExt.apis.getDoc(params)
      doc.PrintPreview()
    }

    // ==========对话框相关函数

    // ==========文档相关函数

    /**
     * 注意：该方法不返回Promise
     */
    wpsExt.apis.getDoc = function (params = {}) {
      const wpsApp = _wps.WpsApplication()

      if (params && params.docName) {
        const docs = wpsApp.Documents
        const count = docs.Count

        for (let i = 0; i < count; i++) {
          const doc = docs.Item(i)
          if (params.docName === doc.Name) {
            if (params.activate) {
              doc.Activate()
            }
            return doc
          }
        }

        throw Error('未找到指定文档')
      } else {
        const doc = wpsApp.ActiveDocument
        if (params.activate) {
          doc.Activate()
        }
        return doc
      }
    }

    /**
     * params = {
     * }
     *
     * 无返回值
     */
    wpsExt.apis.newDoc = async function () {
      _wps.createDocument('wps')

      wpsExt.apis.fitWindowSize({})
    }

    /**
     * params = {
     *     filePath, // 文件路径，如果不传递该参数则打开一个选择框
     *     readOnly, // true或false，是否以只读模式打开
     *     revisionMode: true或false，是否以修订模式打开
     * }
     *
     * 返回值 = {
     *     filePath: 打开的文件路径, 如果用户取消打开则该值为undefined,
     * }
     *
     */
    wpsExt.apis.openLocalDoc = async function (
      params = {
        readOnly: false,
        revisionMode: false
      }
    ) {
      const app = _wps.WpsApplication()
      state.readOnly = !!params.readOnly
      let filePath = params.filePath

      if (!filePath && app.get_FileDialog(1).Show() === -1) {
        filePath = app.get_FileDialog(1).SelectedItems.Item(1)
      }

      if (filePath) {
        console.log(`是否只读模式打开: ${state.readOnly}`)
        _wps.LoadDocument(filePath)

        if (state.readOnly) {
          await wpsExt.apis.protect({
            protectionType: 3,
            password: `${Math.random() * 1000}${Date.now()}`
          })
        } else if (params.revisionMode) {
          wpsExt.apis.getDoc(params).TrackRevisions = true
        }

        wpsExt.apis.fitWindowSize({})
      }

      return {
        filePath: filePath
      }
    }

    /**
     * params = {
     *     url, // 远程文档的URL，必须是http://......这一类的地址
     *     readOnly, // true或false，是否以只读模式打开
     *     revisionMode: true或false，是否以修订模式打开
     * }
     *
     * 返回值：远程文档在本地的临时路径。
     *
     * 异常：如果远程文档下载失败，则会抛出异常。由于WPS方实现的原因，无法得知具体的异常信息。
     */
    wpsExt.apis.openRemoteDoc = async function (
      params = {
        readOnly: false,
        revisionMode: false
      }
    ) {
      if (!params || !params.url) {
        throw Error('openRemoteDoc必须传入param.url参数')
      }
      if (params.url.indexOf('http') !== 0) {
        throw Error('param.url参数必须是http开头')
      }

      state.readOnly = !!params.readOnly
      console.log(
        `wps打开远程文档, url: ${params.url}, 只读模式: ${state.readOnly}`
      )

      let downloadReply = null
      try {
        showMask()
        // 如果下载成功，则downloadReply为文档的本地路径，否则downloadReply为错误信息
        const localTmpPath = (downloadReply = _wps.DownloadFile(params.url))
        hideMask()

        _wps.LoadDocument(localTmpPath)

        if (state.readOnly) {
          await wpsExt.apis.protect({
            protectionType: 3,
            password: `${Math.random() * 1000}${Date.now()}`
          })
        } else if (params.revisionMode) {
          // 只读模式打开的话，则无法进行编辑，因此修订模式就没必要开启了撒
          wpsExt.apis.getDoc(params).TrackRevisions = true
        }

        wpsExt.apis.fitWindowSize({})

        return localTmpPath
      } catch (e) {
        throw Error(
          `打开远程WPS文档失败，请检查地址是否有效: ${
            params.url
          }. ${downloadReply}`
        )
      } finally {
        hideMask()
      }
    }

    /**
     * ，会调用Promise.reject('用户已取消保存')
     *
     * params = {
     *     savePath, //保存的路径, 如果不提供的话，则弹出对话框选择保存路径
     *     format, // 保存格式
     * }
     *
     * 返回值 = {
     *     savePath, // 保存路径, 如果用户取消保存则该值为undefined
     * }
     */
    wpsExt.apis.saveToLocal = async function (params = {}) {
      if (state.readOnly) {
        throw Error('该文档处于只读模式, 不允许执行保存操作')
      }

      const app = _wps.WpsApplication()
      const doc = wpsExt.apis.getDoc(params)
      let savePath = params.savePath
      const format =
        params.format || wpsExt.enums.WdSaveFormat.wdFormatDocument97

      if (!savePath) {
        const fileDialog = app.get_FileDialog(2)
        if (fileDialog.Show() === -1) {
          savePath = fileDialog.SelectedItems.Item(1)
          doc.SaveAs2(savePath, format)
        }
      } else {
        doc.SaveAs2(savePath, format)
      }

      return {
        savePath: savePath
      }
    }

    /**
     * params = {
     *     url, // 文件的保存地址
     *     format, // 保存格式
     * }
     *
     * 返回值：服务器的响应
     *
     * 异常：当上传到服务器失败时，会抛出异常，由于WPS方的原因，无法得知具体的异常信息
     */
    wpsExt.apis.saveToRemote = async function (params = {}) {
      if (state.readOnly) {
        throw Error('该文档处于只读模式, 不允许执行保存操作')
      }

      const doc = wpsExt.apis.getDoc(params)
      const format =
        params.format || wpsExt.enums.WdSaveFormat.wdFormatDocument97

      if (!params.url || params.url.trim() === '') {
        throw Error('saveToRemote必须传入param.url参数')
      }
      if (params.url.indexOf('http') !== 0) {
        throw Error('param.url参数必须是http开头')
      }

      const tmpSavePath = `${_wps.GetTempPath()}` + new Date().getMilliseconds()
      const v = await wpsExt.apis.saveToLocal({
        savePath: tmpSavePath,
        format: format
      })
      try {
        return _wps.UploadFile(params.url, `${doc.Path}/${doc.Name}`)
      } catch (e) {
        throw Error(
          'WPS文档保存到服务器失败，请检查地址是否有效: ' + params.url
        )
      }
    }

    /**
     * 无参数
     *
     * 返回值：如果指定的文档或模板从上次保存后一直没有更改，则该属性值为 True。如果关闭文档时，WPS 提示保存对文档所做的更改，则该属性值为 False
     */
    wpsExt.apis.saved = async function (params = {}) {
      const doc = wpsExt.apis.getDoc(params)

      return doc.Saved
    }

    wpsExt.apis.savedSync = function (params = {}) {
      return wpsExt.apis.getDoc(params).Saved
    }

    /**
     * params = {
     * }
     *
     * 无返回值
     */
    wpsExt.apis.setUserName = async function (params = {}) {
      const doc = wpsExt.apis.getDoc(params)
      const userName = params.userName

      if (!userName) {
        throw Error(`setUserName必须传入正确的参数, userName: ${userName}`)
      }

      doc.Application.UserName = userName
    }

    /**
     * params = {
     *     text, // 要查找的文本内容
     * }
     *
     * 返回值：boolean，是否找到
     */
    wpsExt.apis.findText = async function (params = {}) {
      const doc = wpsExt.apis.getDoc(params)
      const text = params.text
      const continueFind = 1 // 到达搜索范围的开始或结尾时，继续执行查找操作

      // 详见word开发文档, Find.Execute
      return doc.Application.Selection.Find.Execute(
        text,
        false,
        false,
        false,
        false,
        false,
        true,
        continueFind,
        false
      )
    }

    /**
     * params = {
     *     to, // 要替换成的文本
     * }
     *
     * 返回值：boolean，是否有替换到
     */
    wpsExt.apis.findAndReplace = async function (params = {}) {
      const doc = wpsExt.apis.getDoc(params)
      const from = params.from
      const to = params.to
      const continueFind = 1 // 到达搜索范围的开始或结尾时，继续执行查找操作
      const replaceType = 1 // 只替换第一个

      // 详见word开发文档, Find.Execute
      return doc.Application.Selection.Find.Execute(
        from,
        false,
        false,
        false,
        false,
        false,
        true,
        continueFind,
        false,
        to,
        replaceType
      )
    }

    /**
     * params = {
     *
     * 无返回值
     */
    wpsExt.apis.acceptAllRevisions = async function (params) {
      const doc = wpsExt.apis.getDoc(params)
      doc.AcceptAllRevisions()
    }

    // ==========文档相关函数

    // ==========文档属性相关函数

    /**
     * params = {
     *     value, // 属性值
     * }
     *
     * 无返回值
     */
    wpsExt.apis.setDocProperty = async function (params = {}) {
      const doc = wpsExt.apis.getDoc(params)

      const item = doc.BuiltInDocumentProperties.get_Item(params.name)

      item.Value = params.value
    }

    /**
     * params = {
     * }
     *
     * 返回值 = {
     *     value, // 文档属性值
     * }
     *
     * 如果指定的文档属性不存在则抛出异常
     */
    wpsExt.apis.getDocProperty = async function (params = {}) {
      const doc = wpsExt.apis.getDoc(params)

      const item = doc.BuiltInDocumentProperties.get_Item(params.name)
      if (item) {
        return {
          value: item.Value
        }
      } else {
        throw Error(`文档属性[${params.name}]不存在`)
      }
    }

    /**
     * params = {
     * }
     *
     * 无返回值
     *
     * 如果指定的文档属性不存在则抛出异常
     */
    wpsExt.apis.deleteDocProperty = async function (params = {}) {
      const doc = wpsExt.apis.getDoc(params)

      const item = doc.BuiltInDocumentProperties.get_Item(params.name)
      if (item) {
        item.Delete()
      } else {
        throw Error(`文档属性[${params.name}]不存在`)
      }
    }

    // ==========文档属性相关函数

    // ==========超链接相关函数

    /**
     * params = {
     *     address, // 超链接地址
     * }
     *
     * 无返回值
     */
    wpsExt.apis.insertHyperlink = async function (params = {}) {
      const doc = wpsExt.apis.getDoc({ ...params, activate: true })
      const selection = doc.Application.Selection

      const text = params.text
      if (text) {
        selection.InsertAfter(text)
      }

      const range = selection.Range
      const address = params.address

      doc.Hyperlinks.Add(range, address)
    }

    // ==========超链接相关函数

    // ==========图片相关函数

    /**
     * params = {
     *     picPath，// 图片的地址
     *     height, // 图片的高度
     *     width, // 图片的宽度
     *     shapeType, // 是否转换为粘贴型图片
     *     horizontalPos, // 图片的相对水平位置, 可设置的值详见Wps.enums.WdRelativeHorizontalPosition
     *     verticalPos, // 图片的相对垂直位置, 可设置的值详见Wps.enums.WdRelativeHorizontalPosition
     *     left, // 设置指定形状或形状范围的水平位置（以磅为单位）
     *     top, // 设置指定形状或形状范围的垂直位置（以磅为单位）
     * }
     *
     * 无返回值
     */
    wpsExt.apis.insertImage = async function (params = {}) {
      const picPath = params.picPath
      if (!picPath) {
        throw Error('insertImage必须提供params.picPath参数')
      }

      const selection = _wps.WpsApplication().ActiveWindow.Selection
      const pic = selection.InlineShapes.AddPicture(picPath, false, true)

      if (!pic) {
        throw Error(`图片插入失败, 请确认图片是否存在: ${picPath}`)
      }

      const height = params.height
      const width = params.width

      pic.LockAspectRatio = 0

      if (height) {
        pic.Height = height
      }
      if (width) {
        pic.Width = width
      }

      pic.Select()

      if (
        params.shapeType &&
        params.horizontalPos !== undefined &&
        params.verticalPos !== undefined &&
        params.left !== undefined &&
        params.top !== undefined
      ) {
        const sealShape = pic.ConvertToShape()

        sealShape.RelativeHorizontalPosition = params.horizontalPos
        sealShape.RelativeVerticalPosition = params.verticalPos
        sealShape.Left = params.left
        sealShape.Top = params.top
      }
    }

    /**
     * params = {
     *     picPath, // 图片的地址
     *     height, // 图片的高度
     *     width, // 图片的宽度
     *     left, // 设置指定形状或形状范围的水平位置（以磅为单位）
     *     top, // 设置指定形状或形状范围的垂直位置（以磅为单位）
     *     sectionIndex, // 整数，从1开始，表示插入到第sectionIndex个节的页脚, 如不填写则默认是最后一节
     *     linkToPrevious, // 是否取消“同前节”,
     *     toInlineImage, // 是否转为嵌入型图片,
     *     position, // 对齐方式，可以是Wps.enums.WdShapePosition常量之一
     * }
     *
     * 无返回值
     */
    wpsExt.apis.insertImageToFooter = async function (params = {}) {
      const doc = wpsExt.apis.getDoc({ ...params, activate: true })

      const picPath = params.picPath
      if (!picPath) {
        throw Error('insertImage必须提供params.picPath参数')
      }

      let section
      if (params.sectionIndex) {
        if (doc.Sections.Count < params.sectionIndex) {
          throw Error(
            `sectionIndex(${params.sectionIndex})超过当前文档总节数: ${
              doc.Sections.Count
            }`
          )
        }

        section = doc.Sections.Item(params.sectionIndex)
      } else {
        section = doc.Sections.Item(doc.Sections.Count)
      }

      const footers = section.Footers
      const footer = footers.Item(
        _wps_np_.enums.WdHeaderFooterIndex.wdHeaderFooterPrimary
      )

      const r = doc.Application.Selection.Range
      // WPS的bug，必须先把光标聚焦到页脚才能插入图片, 已反馈，待修复(2019-08-01)
      footer.Range.Select()

      try {
        footer.LinkToPrevious = !!params.linkToPrevious

        const pic = footer.Shapes.AddPicture(
          picPath,
          false,
          true,
          params.left,
          params.top,
          params.width,
          params.height
        )

        if (!pic) {
          throw Error(`图片插入失败, 请确认图片是否存在: ${picPath}`)
        }

        if (params.position) {
          pic.Left = params.position
        }

        if (params.toInlineImage) {
          pic.ConvertToInlineShape()
        }
      } finally {
        r.Select()
      }
    }

    /**
     * 将图片插入指定的单元格
     * params = {
     *     tableIndex, // 要插入图片的表格的下标，从1开始计数
     *     rowIndex, // 要插入图片的行下标，从1开始计数
     *     colIndex, // 要插入图片的列下标，从1开始计数
     *     picPath, // 图片的下载地址
     *     width, // 图片的宽度，单位mm
     *     height, // 图片的高度，单位mm
     *     align, // 0为居左，2为居右
     * }
     *
     * 无返回值
     */
    wpsExt.apis.insertTablePicture = async function (params = {}) {
      const app = _wps.WpsApplication()
      const doc = wpsExt.apis.getDoc({ ...params, activate: true })
      const tables = doc.Tables
      const tableIndex = params.tableIndex

      __ensureIndex(params, tables)

      const range = tables
        .Item(tableIndex)
        .Cell(params.rowIndex, params.colIndex).Range

      range.Select()

      const pic = range.InlineShapes.AddPicture(
        params.picPath,
        false,
        true,
        range
      )

      if (!pic) {
        throw Error(`图片插入失败, 请确认图片是否存在: ${params.picPath}`)
      }

      const height = params.height
      const width = params.width

      pic.LockAspectRatio = 0

      if (height) {
        pic.Height = height
      }
      if (width) {
        pic.Width = width
      }

      if (params.align && (params.align === 0 || params.align === 2)) {
        range.ParagraphFormat.Alignment = params.align
      }
    }

    // ==========图片相关函数

    // ==========分节符相关函数

    /**
     * 无参数
     */
    wpsExt.apis.getSectionCount = async function (params = {}) {
      const doc = wpsExt.apis.getDoc(params)

      return doc.Sections.Count
    }

    /**
     * params = {
     *     page, // 在第page个页面的前一页的末尾插入分节符, 该参数优先于range参数
     *     range, // 要在其之前插入分节符的区域。如果省略该参数，则将分节符插至文档末尾,
     *     start, // 要添加的分节符的类型。可以是 Wps.enums.WdSectionStart 常量之一。如果省略该参数，则添加“下一页”类型的分节符。
     * }
     *
     * 无返回值
     */
    wpsExt.apis.addSection = async function (params = {}) {
      const doc = wpsExt.apis.getDoc({ ...params, activate: true })

      if (params.page) {
        const count = doc.ActiveWindow.ActivePane.Pages.Count
        if (params.page > count) {
          throw Error(`page(${params.page})超过当前文档总页数: ${count}`)
        }

        const page = doc.ActiveWindow.ActivePane.Pages.Item(params.page)
        doc.Sections.Add(page.Breaks.Item(1).Range, params.start)
      } else {
        doc.Sections.Add(params.range, params.start)
      }
    }

    // ==========分节符相关函数

    // ==========文档保护相关函数

    /**
     * params = {
     *     password, // 密码
     * }
     *
     * 无返回值
     */
    wpsExt.apis.protect = async function (params = {}) {
      const doc = wpsExt.apis.getDoc(params)
      const protectionType = params.protectionType
      const password = params.password

      if (protectionType !== doc.ProtectionType) {
        doc.Protect(protectionType, null, password)
      }

      if (!params.force) {
        return
      }

      await wpsExt.apis.clearEditableField()
    }

    wpsExt.apis.clearEditableField = async function (params = {}) {
      const doc = wpsExt.apis.getDoc(params)
      const tables = doc.Tables
      const tableCount = tables.Count
      if (tableCount <= 0) {
        return
      }

      for (let tableIndex = 1; tableIndex <= tableCount; tableIndex++) {
        const table = tables.Item(tableIndex)
        const rowCount = table.Rows.Count
        const colCount = table.Columns.Count

        for (let i = 1; i <= rowCount; i++) {
          for (let j = 1; j <= colCount; j++) {
            try {
              const cell = table.Cell(i, j)

              if (
                cell === null ||
                cell === undefined ||
                !cell.Range ||
                !cell.Range.Editors
              ) {
                continue
              }

              const editors = cell.Range.Editors

              while (editors.Count > 0) {
                editors.Item(1).Delete()
              }
            } catch (ignored) {}
          }
        }
      }
    }

    /**
     * params = {
     * }
     *
     * 无返回值
     */
    wpsExt.apis.unprotect = async function (params = {}) {
      const doc = wpsExt.apis.getDoc(params)
      const password = params.password

      if (doc.ProtectionType !== -1) {
        doc.Unprotect(password)
      }
    }

    /**
     * params = {
     *
     * 返回值 = {
     *     protectionType, // 保护类型枚举值
     * }
     */
    wpsExt.apis.getProtectionType = async function (params = {}) {
      const doc = wpsExt.apis.getDoc(params)
      const protectionType = doc.ProtectionType

      return {
        protectionType: protectionType
      }
    }

    // ==========文档保护相关函数

    // ==========表格相关函数

    function __ensureIndex (
      params,
      tables,
      requireColIndex = false,
      requireRowIndex = false
    ) {
      if (!params || !tables) {
        return
      }

      const tableIndex = params.tableIndex
      const rowIndex = params.rowIndex
      const colIndex = params.colIndex

      if (tableIndex === 0) throw Error('表的下标不允许为0, 从1开始计数')
      if (rowIndex === 0) throw Error('表的行下标不允许为0, 从1开始计数')
      if (colIndex === 0) throw Error('表的列下标不允许为0, 从1开始计数')

      if (!tableIndex) throw Error('参数不合法, 未提供params.tableIndex')
      if (tableIndex > tables.Count) {
        throw Error(
          `表索引溢出, 表数量: ${tables.Count || 0}, 下标参数: ${tableIndex}`
        )
      }

      if (requireRowIndex && !rowIndex) { throw Error('参数不合法, 未提供params.rowIndex') }
      if (requireColIndex && !colIndex) { throw Error('参数不合法, 未提供params.colIndex') }

      if (!colIndex && !rowIndex) {
        return
      }

      const table = tables.Item(tableIndex)

      if (colIndex && colIndex > table.Columns.Count) {
        throw Error(
          `列索引溢出, 列数量: ${table.Columns.Count}, 下标参数: ${colIndex}`
        )
      }
      if (rowIndex > table.Rows.Count) {
        throw Error(
          `行索引溢出, 行数量: ${table.Rows.Count}, 下标参数: ${rowIndex}`
        )
      }
    }

    /**
     * params = {
     *     colIndex, // 要删除的列索引, 从1开始
     * }
     *
     * 无返回值
     *
     * 索引若溢出则抛出异常
     */
    wpsExt.apis.deleteTableColumn = async function (params = {}) {
      const doc = wpsExt.apis.getDoc(params)
      const tables = doc.Tables
      const tableIndex = params.tableIndex

      __ensureIndex(params, tables, true)

      const table = tables.Item(tableIndex)

      table.Columns.Item(params.colIndex).Delete()
    }

    /**
     * params = {
     *     rowIndex, // 要删除的行索引,  从1开始
     * }
     *
     * 无返回值
     *
     * 索引若溢出则抛出异常
     */
    wpsExt.apis.deleteTableRow = async function (params = {}) {
      const doc = wpsExt.apis.getDoc(params)
      const tables = doc.Tables
      const tableIndex = params.tableIndex

      __ensureIndex(params, tables, false, true)

      const table = tables.Item(tableIndex)

      table.Rows.Item(params.rowIndex).Delete()
    }

    /**
     * params = {
     *     colIndex, // 列下表, 从1开始
     *     rowIndex, // 行下标, 从1开始
     *     text,  // 单元格值,
     *     position, // 0为插入在单元格最前面, 1为插入在单元格最后面, 其他情况则默认为设置整个单元格的值
     * }
     *
     * 无返回值
     *
     * 索引若溢出则抛出异常
     */
    wpsExt.apis.setTableCellValue = async function (params = {}) {
      const doc = wpsExt.apis.getDoc(params)
      const tables = doc.Tables
      const tableIndex = params.tableIndex
      const colIndex = params.colIndex
      const rowIndex = params.rowIndex
      const text = params.text
      const position = params.position

      __ensureIndex(params, tables, true, true)

      const table = tables.Item(tableIndex)
      const range = table.Cell(rowIndex, colIndex).Range

      range.Select()

      if (position === 0) {
        range.InsertBefore(text)
      } else if (position === 1) {
        range.InsertAfter(text)
      } else {
        range.Text = text
      }
    }

    /**
     * 指定单元格内包含的InlineShape对象数量
     * params = {
     *     colIndex, // 列下表, 从1开始
     *     rowIndex, // 行下标, 从1开始
     * }
     *
     * 索引若溢出则抛出异常
     */
    wpsExt.apis.tableCellShapesCount = async function (params = {}) {
      const doc = wpsExt.apis.getDoc(params)
      const tables = doc.Tables
      const tableIndex = params.tableIndex
      const colIndex = params.colIndex
      const rowIndex = params.rowIndex

      __ensureIndex(params, tables, true, true)

      const table = tables.Item(tableIndex)
      return table.Cell(rowIndex, colIndex).Range.InlineShapes.Count
    }

    /**
     * params = {
     *     tableIndex, // 表格下标，从1开始
     *     cellList: [{
     *         colIndex, // 列下表, 从1开始
     *         rowIndex // 行下标, 从1开始
     *     }, {
     *         colIndex,
     *         rowIndex
     *     },
     *     ...
     *     ]
     *     password, // 密码
     * }
     *
     * 无返回值
     *
     * 索引若溢出则抛出异常
     */
    wpsExt.apis.docProtectExceptCell = async function (params = {}) {
      if (!params.cellList || params.cellList < 1) { throw Error('至少需要指定一个要保护的单元格') }

      const doc = wpsExt.apis.getDoc(params)
      const password = params.password

      // 先解锁文档
      const unprotectParams = {
        doc: doc,
        password: password
      }

      wpsExt.apis.unprotect(unprotectParams)

      // 重新以只读的方式加锁
      const protectParams = {
        doc: doc,
        password: password,
        protectionType: 3 // 只读
      }

      wpsExt.apis.protect(protectParams)

      // 此时整个文档都是只读的, 然后再设置允许编辑的表格部分
      const tables = doc.Tables

      __ensureIndex(params, tables)

      const tableIndex = params.tableIndex
      const table = tables.Item(tableIndex)

      const cellCount = params.cellList.length
      for (let i = 0; i < cellCount; i++) {
        const rowIndex = params.cellList[i].rowIndex
        const colIndex = params.cellList[i].colIndex

        try {
          __ensureIndex(
            {
              tableIndex: tableIndex,
              rowIndex: rowIndex,
              colIndex: colIndex
            },
            tables,
            true,
            true
          )
        } catch (e) {
          console.warn(e)
          continue
        }

        try {
          const cell = table.Cell(rowIndex, colIndex)
          cell.Range.Editors.Add(-1) // 允许所有打开文档的用户编辑
        } catch (ignored) {}
      }
    }

    /**
     * params = {
     *     tableIndex, // 表格下标，从1开始
     *     colIndex, // 列下表, 从1开始
     *     rowIndex // 行下标, 从1开始
     * }
     *
     * 单元格是否可编辑。如果未指定单元格，则返回当前光标所在位置是否可编辑
     *
     * 索引若溢出则抛出异常
     * 当前选中的单元格超过1个则抛出异常
     */
    wpsExt.apis.isCurrentPositionEditable = async function (params = {}) {
      const doc = wpsExt.apis.getDoc(params)
      const tables = doc.Tables
      const tableIndex = params.tableIndex
      const colIndex = params.colIndex
      const rowIndex = params.rowIndex

      const docProtectionType = (await wpsExt.apis.getProtectionType({}))
        .protectionType
      if (docProtectionType < 1) {
        return true
      }

      if (tableIndex || colIndex || rowIndex) {
        __ensureIndex(params, tables, true, true)

        const table = tables.Item(tableIndex)
        const cell = table.Cell(rowIndex, colIndex)

        return cell.Range.Editors.Count > 0
      } else {
        if (doc.Application.Selection.Cells) {
          if (doc.Application.Selection.Cells.Count > 1) {
            throw Error('当前选中了超过一个单元格')
          }

          return doc.Application.Selection.Cells.Item(1).Range.Editors.Count > 0
        } else {
          return docProtectionType < 1
        }
      }
    }

    /**
     * params = {
     *     colIndex, // 插入到colIndex之前, 不设置该字段则插入到最后一列之后
     * }
     *
     * 无返回值
     *
     * 索引若溢出则抛出异常
     */
    wpsExt.apis.addTableColumn = async function (params = {}) {
      const doc = wpsExt.apis.getDoc(params)
      const tables = doc.Tables
      const tableIndex = params.tableIndex

      __ensureIndex(params, tables)

      const table = tables.Item(tableIndex)

      if (params.colIndex) {
        const beforeColumn = table.Columns.Item(params.colIndex)
        table.Columns.Add(beforeColumn)
      } else {
        table.Columns.Add()
      }
    }

    /**
     * params = {
     *     rowIndex, // 插入到rowIndex之前, 不设置该字段则插入到最后一行之后
     *     afterRow, // true代表添加到rowIndex对应的行之后，不填或false代表之前
     * }
     *
     * 无返回值
     *
     * 索引若溢出则抛出异常
     */
    wpsExt.apis.addTableRow = async function (params = {}) {
      const doc = wpsExt.apis.getDoc(params)
      const tables = doc.Tables
      const tableIndex = params.tableIndex

      __ensureIndex(params, tables)

      const table = tables.Item(tableIndex)

      if (!params.rowIndex || params.rowIndex > table.Rows.Count) {
        table.Rows.Add()
        return
      }

      table.Cell(params.rowIndex, 1).Select()

      if (params.afterRow) {
        _wps.WpsApplication().Selection.InsertRowsBelow(1)
      } else {
        if (params.rowIndex < 1) {
          throw Error(
            `无法在第${params.rowIndex}行之前添加行, 行数下标从1开始计数`
          )
        }

        _wps.WpsApplication().Selection.InsertRowsAbove(1)
      }
    }

    /**
     * params = {
     *     colIndex, // 列下表, 从1开始
     *     rowIndex, // 行下标, 从1开始
     * }
     *
     * 无返回值
     *
     * 索引若溢出则抛出异常
     */
    wpsExt.apis.goToTable = async function (params = {}) {
      const doc = wpsExt.apis.getDoc(params)
      const tables = doc.Tables
      const tableIndex = params.tableIndex

      __ensureIndex(params, tables)

      const table = tables.Item(tableIndex)

      const colIndex = params.colIndex
      const rowIndex = params.rowIndex

      if (colIndex && rowIndex) {
        __ensureIndex(params, tables, true, true)

        table.Cell(rowIndex, colIndex).Select()
      } else {
        table.Select()
      }
    }

    /**
     * params = {
     *     colIndex, // 列下表, 从1开始
     *     rowIndex, // 行下标, 从1开始
     *     cb, // 回调函数, 接收一个参数: text, 指定单元格的内容
     * }
     *
     * 返回值 = {
     *     text, //指定单元格的值
     * }
     *
     * 索引若溢出则抛出异常
     */
    wpsExt.apis.getTableCellValue = async function (params = {}) {
      const doc = wpsExt.apis.getDoc(params)
      const tables = doc.Tables
      const tableIndex = params.tableIndex
      const colIndex = params.colIndex
      const rowIndex = params.rowIndex

      __ensureIndex(params, tables, true, true)

      const table = tables.Item(tableIndex)
      const range = table.Cell(rowIndex, colIndex).Range

      // FIXME 12.0版WPS总最后总会多出一个ascii码为7的字符
      if (range.Text.endsWith('\ra')) {
        return range.Text.substring(0, range.Text.length - 2)
      }

      return {
        text: range.Text.replace('\ra', '')
      }
    }

    /**
     * params = {
     *     // colIndex, // 可选, 列下表, 从1开始
     *     cb, // 回调函数, 接收一个参数: count, 指定表(的指定列)的行数
     * }
     *
     * 返回值 = {
     *     count, // 行数
     * }
     *
     * 索引若溢出则抛出异常
     */
    wpsExt.apis.getTableRowCount = async function (params = {}) {
      const doc = wpsExt.apis.getDoc(params)
      const tables = doc.Tables
      const tableIndex = params.tableIndex
      const colIndex = params.colIndex

      if (colIndex) {
        __ensureIndex(params, tables, true)

        const table = tables.Item(tableIndex)
        const rowCount = table.Rows.Count

        let count = 0
        for (let i = 1; i <= rowCount; i++) {
          const cell = table.Cell(i, colIndex)

          if (cell === null || cell === undefined) {
            continue
          }
          if (cell.RowIndex !== i || cell.ColumnIndex !== colIndex) {
            continue
          }

          count++
        }

        return {
          count: count
        }
      } else {
        __ensureIndex(params, tables)

        const table = tables.Item(tableIndex)

        return {
          count: table.Rows.Count
        }
      }
    }

    /**
     * params = {
     *     // rowIndex, // 可选，列下表, 从1开始
     *     cb, // 回调函数, 接收一个参数: count, 指定表(的指定行)的列数
     * }
     *
     * 返回值 = {
     *     count, // 列数
     * }
     *
     * 索引若溢出则抛出异常
     */
    wpsExt.apis.getTableColCount = async function (params = {}) {
      const doc = wpsExt.apis.getDoc(params)
      const tables = doc.Tables
      const tableIndex = params.tableIndex
      const rowIndex = params.rowIndex

      if (rowIndex) {
        __ensureIndex(params, tables, false, true)

        const table = tables.Item(tableIndex)
        const colCount = table.Columns.Count

        let count = 0
        for (let i = 1; i <= colCount; i++) {
          const cell = table.Cell(rowIndex, i)

          if (cell === null || cell === undefined) {
            continue
          }
          if (cell.RowIndex !== rowIndex || cell.ColumnIndex !== i) {
            continue
          }

          count++
        }

        return {
          count: count
        }
      } else {
        __ensureIndex(params, tables)

        const table = tables.Item(tableIndex)

        return {
          count: table.Columns.Count
        }
      }
    }

    /**
     * params = {
     *     cb, // 回调函数, 接收一个参数: count, 表示文档表格数量
     * }
     *
     * 返回值 = {
     *     count, // 表数量
     * }
     *
     * 索引若溢出则抛出异常
     */
    wpsExt.apis.getTableCount = async function (params = {}) {
      const doc = wpsExt.apis.getDoc(params)
      const tables = doc.Tables

      return {
        count: tables.Count || 0
      }
    }

    /**
     * params = {
     *     text, // 要定位的文本
     *     cb, // 回调函数, 接收两个参数: rowIndex和colIndex, 表示指定内容所在行索引和列索引, 不存在时两个参数的值都为-1
     * }
     *
     * 返回值 {
     *     rowIndex, // 文本在表中的行下标, 不存在时该字段值为-1
     *     colIndex, //  文本在表中的列下标, 不存在时该字段值为-1
     * }
     *
     * 索引若溢出则抛出异常
     */
    wpsExt.apis.getTableTextIndex = async function (params = {}) {
      const doc = wpsExt.apis.getDoc(params)
      const tables = doc.Tables
      const tableIndex = params.tableIndex
      const text = params.text

      __ensureIndex(params, tables)

      const table = tables.Item(tableIndex)
      const rowCount = table.Rows.Count
      const colCount = table.Columns.Count

      for (let i = 1; i <= rowCount; i++) {
        for (let j = 1; j <= colCount; j++) {
          const cell = table.Cell(i, j)

          if (cell === null || cell === undefined) {
            continue
          }
          if (cell.RowIndex !== i || cell.ColumnIndex !== j) {
            continue
          }

          // WPS的单元格取值最后都会有\r\a
          let t = cell.Range.Text
          if (!t || t.length === 0) {
            continue
          }
          if (t[t.length - 1].charCodeAt(0) === 7) {
            t = t.substring(0, t.length - 1)
          }
          if (t[t.length - 1].charCodeAt(0) === 13) {
            t = t.substring(0, t.length - 1)
          }

          if (t === text) {
            return {
              rowIndex: i,
              colIndex: j
            }
          }
        }
      }

      return {
        rowIndex: -1,
        colIndex: -1
      }
    }

    /**
     * params = {
     *     text, // 要匹配的文本
     *     cb, // 回调函数, 接收一个参数: count, 表示包含指定文本的行数(同一行多次出现仅算一次)
     * }
     *
     * 返回值 = {
     *     count, // 包含指定文本的行的数量
     * }
     *
     * 索引若溢出则抛出异常
     */
    wpsExt.apis.getTableTextOccurRowCount = async function (params = {}) {
      // FIXME 计算错误
      const doc = wpsExt.apis.getDoc(params)
      const tables = doc.Tables
      const tableIndex = params.tableIndex
      const text = params.text

      __ensureIndex(params, tables)

      const table = tables.Item(tableIndex)

      const rowCount = table.Rows.Count
      const colCount = table.Columns.Count

      let count = 0
      for (let i = 1; i <= rowCount; i++) {
        for (let j = 1; j <= colCount; j++) {
          const cell = table.Cell(i, j)

          if (cell === null || cell === undefined) {
            continue
          }
          if (cell.RowIndex !== i || cell.ColumnIndex !== j) {
            continue
          }

          // WPS的单元格取值最后都会有\r\a
          let t = cell.Range.Text
          if (!t || t.length === 0) {
            continue
          }
          if (t[t.length - 1].charCodeAt(0) === 7) {
            t = t.substring(0, t.length - 1)
          }
          if (t[t.length - 1].charCodeAt(0) === 13) {
            t = t.substring(0, t.length - 1)
          }

          if (t === text) {
            count++
            break
          }
        }
      }

      return {
        count: count
      }
    }

    /**
     * params = {
     *     tableIndex, // 表格下标，从1开始
     *     rowIndex, // 行坐标，从1开始
     *     colIndex, // 列坐标，从1开始
     * }
     *
     * 返回值：无
     *
     * 索引若溢出则抛出异常
     */
    wpsExt.apis.selectOnTableCell = async function (params = {}) {
      const doc = wpsExt.apis.getDoc(params)
      const tables = doc.Tables
      const tableIndex = params.tableIndex
      const rowIndex = params.rowIndex
      const colIndex = params.colIndex

      __ensureIndex(params, tables, true, true)

      try {
        const table = tables.Item(tableIndex)
        const cell = table.Cell(rowIndex, colIndex)
        if (cell === null || cell === undefined) {
          return
        }

        cell.Range.Select()
        cell.Range.MoveStart()
      } catch (e) {}
    }

    /**
     * params = {
     * }
     *
     * 无返回值
     */
    wpsExt.apis.shadeEditableRanges = async function (params = {}) {
      const doc = wpsExt.apis.getDoc(params)

      doc.ActiveWindow.View.ShadeEditableRanges = params.show
    }

    /**
     * 获取单元格里的段落数
     * params = {
     *     tableIndex, // 表格下表，从1开始
     *     colIndex, // 列下表, 从1开始
     *     rowIndex, // 行下标, 从1开始
     * }
     *
     * 索引若溢出则抛出异常
     */
    wpsExt.apis.getTableCellParagraphCount = async function (params = {}) {
      const doc = wpsExt.apis.getDoc(params)
      const tables = doc.Tables
      const tableIndex = params.tableIndex
      const colIndex = params.colIndex
      const rowIndex = params.rowIndex

      __ensureIndex(params, tables, true, true)

      const table = tables.Item(tableIndex)
      return table.Cell(rowIndex, colIndex).Range.Paragraphs.Count
    }

    /**
     * 设置单元格里某个段落的对齐方式
     * params = {
     *     tableIndex, // 表格下表，从1开始
     *     colIndex, // 列下表, 从1开始
     *     rowIndex, // 行下标, 从1开始
     *     paragraphIndex, // 从1开始
     *     align, // 0是左对齐，2是右对齐
     * }
     *
     * 索引若溢出则抛出异常
     */
    wpsExt.apis.setTableCellParagraphAlignment = async function (params = {}) {
      const doc = wpsExt.apis.getDoc(params)
      const tables = doc.Tables
      const tableIndex = params.tableIndex
      const colIndex = params.colIndex
      const rowIndex = params.rowIndex
      const paragraphsIndex = params.paragraphIndex

      __ensureIndex(params, tables, true, true)

      const table = tables.Item(tableIndex)
      const paragraphs = table.Cell(rowIndex, colIndex).Range.Paragraphs

      if (paragraphsIndex < 1) {
        throw Error(`段落下标不允许为${paragraphsIndex}, 从1开始计数`)
      }
      if (paragraphs.Count < paragraphsIndex) {
        throw Error(
          `段落索引溢出, 单元格(table: ${tableIndex}, row: ${rowIndex}, col: ${colIndex})内段落数为: ${
            paragraphs.Count
          }`
        )
      }
      if (params.align < 0 || params.align > 9 || params.align === 6) {
        throw Error(`参数错误, 无法设置段落的对齐方式: ${params.align}`)
      }

      paragraphs.Item(paragraphsIndex).Range.ParagraphFormat.Alignment =
        params.align
    }

    // ==========表格相关函数

    // ==========文本相关函数

    /**
     * params = {
     * }
     *
     * 无返回值
     */
    wpsExt.apis.insertText = async function (params = {}) {
      const doc = wpsExt.apis.getDoc(params)
      const text = params.text
      const selection = doc.Application.Selection

      return selection.InsertAfter(text)
    }

    /**
     * params = {
     *
     * 返回值 = {
     *     text, // 选中的文本
     * }
     */
    wpsExt.apis.getSelectedText = async function (params = {}) {
      const doc = wpsExt.apis.getDoc(params)

      return {
        text: doc.ActiveWindow.Selection.Range.Text
      }
    }

    // ==========文本相关函数

    return wpsExt
  },
  enums: {
    WdWordDialog: {
      wdDialogHelpAbout: 9,
      wdDialogHelpWordPerfectHelp: 10,
      wdDialogDocumentStatistics: 78,
      wdDialogFileNew: 79,
      wdDialogFileOpen: 80,
      wdDialogMailMergeOpenDataSource: 81,
      wdDialogMailMergeOpenHeaderSource: 82,
      wdDialogFileSaveAs: 84,
      wdDialogFileSummaryInfo: 86,
      wdDialogToolsTemplates: 87,
      wdDialogFilePrint: 88,
      wdDialogFilePrintSetup: 97,
      wdDialogFileFind: 99,
      wdDialogFormatAddrFonts: 103,
      wdDialogEditPasteSpecial: 111,
      wdDialogEditFind: 112,
      wdDialogEditReplace: 117,
      wdDialogEditStyle: 120,
      wdDialogEditLinks: 124,
      wdDialogEditObject: 125,
      wdDialogTableToText: 128,
      wdDialogTextToTable: 127,
      wdDialogTableInsertTable: 129,
      wdDialogTableInsertCells: 130,
      wdDialogTableInsertRow: 131,
      wdDialogTableDeleteCells: 133,
      wdDialogTableSplitCells: 137,
      wdDialogTableRowHeight: 142,
      wdDialogTableColumnWidth: 143,
      wdDialogToolsCustomize: 152,
      wdDialogInsertBreak: 159,
      wdDialogInsertSymbol: 162,
      wdDialogInsertPicture: 163,
      wdDialogInsertFile: 164,
      wdDialogInsertDateTime: 165,
      wdDialogInsertField: 166,
      wdDialogInsertMergeField: 167,
      wdDialogInsertBookmark: 168,
      wdDialogMarkIndexEntry: 169,
      wdDialogInsertIndex: 170,
      wdDialogInsertTableOfContents: 171,
      wdDialogInsertObject: 172,
      wdDialogToolsCreateEnvelope: 173,
      wdDialogFormatFont: 174,
      wdDialogFormatParagraph: 175,
      wdDialogFormatSectionLayout: 176,
      wdDialogFormatColumns: 177,
      wdDialogFileDocumentLayout: 178,
      wdDialogFilePageSetup: 178,
      wdDialogFormatTabs: 179,
      wdDialogFormatStyle: 180,
      wdDialogFormatDefineStyleFont: 181,
      wdDialogFormatDefineStylePara: 182,
      wdDialogFormatDefineStyleTabs: 183,
      wdDialogFormatDefineStyleFrame: 184,
      wdDialogFormatDefineStyleBorders: 185,
      wdDialogFormatDefineStyleLang: 186,
      wdDialogFormatPicture: 187,
      wdDialogToolsLanguage: 188,
      wdDialogFormatBordersAndShading: 189,
      wdDialogFormatFrame: 190,
      wdDialogToolsThesaurus: 194,
      wdDialogToolsHyphenation: 195,
      wdDialogToolsBulletsNumbers: 196,
      wdDialogToolsHighlightChanges: 197,
      wdDialogToolsRevisions: 197,
      wdDialogToolsCompareDocuments: 198,
      wdDialogTableSort: 199,
      wdDialogToolsOptionsGeneral: 203,
      wdDialogToolsOptionsView: 204,
      wdDialogToolsAdvancedSettings: 206,
      wdDialogToolsOptionsPrint: 208,
      wdDialogToolsOptionsSave: 209,
      wdDialogToolsOptionsSpellingAndGrammar: 211,
      wdDialogToolsOptionsUserInfo: 213,
      wdDialogToolsMacroRecord: 214,
      wdDialogToolsMacro: 215,
      wdDialogWindowActivate: 220,
      wdDialogFormatRetAddrFonts: 221,
      wdDialogOrganizer: 222,
      wdDialogToolsOptionsEdit: 224,
      wdDialogToolsOptionsFileLocations: 225,
      wdDialogToolsWordCount: 228,
      wdDialogControlRun: 235,
      wdDialogInsertPagvarbers: 294,
      wdDialogFormatPagvarber: 298,
      wdDialogCopyFile: 300,
      wdDialogFormatChangeCase: 322,
      wdDialogUpdateTOC: 331,
      wdDialogInsertDatabase: 341,
      wdDialogTableFormula: 348,
      wdDialogFormFieldOptions: 353,
      wdDialogInsertCaption: 357,
      wdDialogInsertCaptionNumbering: 358,
      wdDialogInsertAutoCaption: 359,
      wdDialogFormFieldHelp: 361,
      wdDialogInsertCrossReference: 367,
      wdDialogInsertFootnote: 370,
      wdDialogNoteOptions: 373,
      wdDialogToolsAutoCorrect: 378,
      wdDialogToolsOptionsTrackChanges: 386,
      wdDialogConvertObject: 392,
      wdDialogInsertAddCaption: 402,
      wdDialogConnect: 420,
      wdDialogToolsCustomizeKeyboard: 432,
      wdDialogToolsCustomizeMenus: 433,
      wdDialogToolsMergeDocuments: 435,
      wdDialogMarkTableOfContentsEntry: 442,
      wdDialogFileMacPageSetupGX: 444,
      wdDialogFilePrintOneCopy: 445,
      wdDialogEditFrame: 458,
      wdDialogMarkCitation: 463,
      wdDialogTableOfContentsOptions: 470,
      wdDialogInsertTableOfAuthorities: 471,
      wdDialogInsertTableOfFigures: 472,
      wdDialogInsertIndexAndTables: 473,
      wdDialogInsertFormField: 483,
      wdDialogFormatDropCap: 488,
      wdDialogToolsCreateLabels: 489,
      wdDialogToolsProtectDocument: 503,
      wdDialogFormatStyleGallery: 505,
      wdDialogToolsAcceptRejectChanges: 506,
      wdDialogHelpWordPerfectHelpOptions: 511,
      wdDialogToolsUnprotectDocument: 521,
      wdDialogToolsOptionsCompatibility: 525,
      wdDialogTableOfCaptionsOptions: 551,
      wdDialogTableAutoFormat: 563,
      wdDialogMailMergeFindRecord: 569,
      wdDialogReviewAfmtRevisions: 570,
      wdDialogViewZoom: 577,
      wdDialogToolsProtectSection: 578,
      wdDialogFontSubstitution: 581,
      wdDialogInsertSubdocument: 583,
      wdDialogNewToolbar: 586,
      wdDialogToolsEnvelopesAndLabels: 607,
      wdDialogFormatCallout: 610,
      wdDialogTableFormatCell: 612,
      wdDialogToolsCustomizeMenuBar: 615,
      wdDialogFileRoutingSlip: 624,
      wdDialogEditTOACategory: 625,
      wdDialogToolsManageFields: 631,
      wdDialogDrawSnapToGrid: 633,
      wdDialogDrawAlign: 634,
      wdDialogMailMergeCreateDataSource: 642,
      wdDialogMailMergeCreateHeaderSource: 643,
      wdDialogMailMerge: 676,
      wdDialogMailMergeCheck: 677,
      wdDialogMailMergeHelper: 680,
      wdDialogMailMergeQueryOptions: 681,
      wdDialogFileMacPageSetup: 685,
      wdDialogListCommands: 723,
      wdDialogEditCreatePublisher: 732,
      wdDialogEditSubscribeTo: 733,
      wdDialogEditPublishOptions: 735,
      wdDialogEditSubscribeOptions: 736,
      wdDialogFileMacCustomPageSetupGX: 737,
      wdDialogToolsOptionsTypography: 739,
      wdDialogToolsAutoCorrectExceptions: 762,
      wdDialogToolsOptionsAutoFormatAsYouType: 778,
      wdDialogMailMergeUseAddressBook: 779,
      wdDialogToolsHangulHanjaConversion: 784,
      wdDialogToolsOptionsFuzzy: 790,
      wdDialogEditGoToOld: 811,
      wdDialogInsertNumber: 812,
      wdDialogLetterWizard: 821,
      wdDialogFormatBulletsAndNumbering: 824,
      wdDialogToolsSpellingAndGrammar: 828,
      wdDialogToolsCreateDirectory: 833,
      wdDialogTableWrapping: 854,
      wdDialogFormatTheme: 855,
      wdDialogTableProperties: 861,
      wdDialogEmailOptions: 863,
      wdDialogCreateAutoText: 872,
      wdDialogToolsAutoSummarize: 874,
      wdDialogToolsGrammarSettings: 885,
      wdDialogEditGoTo: 896,
      wdDialogWebOptions: 898,
      wdDialogInsertHyperlink: 925,
      wdDialogToolsAutoManager: 915,
      wdDialogFileVersions: 945,
      wdDialogToolsOptionsAutoFormat: 959,
      wdDialogFormatDrawingObject: 960,
      wdDialogToolsOptions: 974,
      wdDialogFitText: 983,
      wdDialogEditAutoText: 985,
      wdDialogPhoneticGuide: 986,
      wdDialogToolsDictionary: 989,
      wdDialogFileSaveVersion: 1007,
      wdDialogToolsOptionsBidi: 1029,
      wdDialogFrameSetProperties: 1074,
      wdDialogTableTableOptions: 1080,
      wdDialogTableCellOptions: 1081,
      wdDialogIMESetDefault: 1094,
      wdDialogTCSCTranslator: 1156,
      wdDialogHorizontalInVertical: 1160,
      wdDialogTwoLinesInOne: 1161,
      wdDialogFormatEncloseCharacters: 1162,
      wdDialogConsistencyChecker: 1121,
      wdDialogToolsOptionsSmartTag: 1395,
      wdDialogFormatStylesCustom: 1248,
      wdDialogCSSLinks: 1261,
      wdDialogInsertWebComponent: 1324,
      wdDialogToolsOptionsEditCopyPaste: 1356,
      wdDialogToolsOptionsSecurity: 1361,
      wdDialogSearch: 1363,
      wdDialogShowRepairs: 1381,
      wdDialogMailMergeInsertAsk: 4047,
      wdDialogMailMergeInsertFillIn: 4048,
      wdDialogMailMergeInsertIf: 4049,
      wdDialogMailMergeInsertNextIf: 4053,
      wdDialogMailMergeInsertSet: 4054,
      wdDialogMailMergeInsertSkipIf: 4055,
      wdDialogMailMergeFieldMapping: 1304,
      wdDialogMailMergeInsertAddressBlock: 1305,
      wdDialogMailMergeInsertGreetingLine: 1306,
      wdDialogMailMergeInsertFields: 1307,
      wdDialogMailMergeRecipients: 1308,
      wdDialogMailMergeFindRecipient: 1326,
      wdDialogMailMergeSetDocumentType: 1339,
      wdDialogLabelOptions: 1367,
      wdDialogXMLElementAttributes: 1460,
      wdDialogSchemaLibrary: 1417,
      wdDialogPermission: 1469,
      wdDialogMyPermission: 1437,
      wdDialogXMLOptions: 1425,
      wdDialogFormattingRestrictions: 1427,
      wdDialogSourceManager: 1920,
      wdDialogCreateSource: 1922,
      wdDialogDocumentInspector: 1482,
      wdDialogStyleManagement: 1948,
      wdDialogInsertSource: 2120,
      wdDialogOMathRecognizedFunctions: 2165,
      wdDialogInsertPlaceholder: 2348,
      wdDialogBuildingBlockOrganizer: 2067,
      wdDialogContentControlProperties: 2394,
      wdDialogCompatibilityChecker: 2439,
      wdDialogExportAsFixedFormat: 2349,
      wdDialogFileNew2007: 1116
    },
    docProperty: {
      msoPropertyNumber: 1,
      msoPropertyBoolean: 2,
      msoPropertyDate: 3,
      msoPropertyString: 4,
      msoPropertyFloat: 5
    },
    WdSaveFormat: {
      wdFormatDocument: 0,
      wdFormatDocument97: 0,
      wdFormatTemplate: 1,
      wdFormatTemplate97: 1,
      wdFormatText: 2,
      wdFormatTextLineBreaks: 3,
      wdFormatDOSText: 4,
      wdFormatDOSTextLineBreaks: 5,
      wdFormatRTF: 6,
      wdFormatUnicodeText: 7,
      wdFormatEncodedText: 7,
      wdFormatHTML: 8,
      wdFormatWebArchive: 9,
      wdFormatFilteredHTML: 10,
      wdFormatXML: 11,
      wdFormatXMLDocument: 12,
      wdFormatXMLDocumentMacroEnabled: 13,
      wdFormatXMLTemplate: 14,
      wdFormatXMLTemplateMacroEnabled: 15,
      wdFormatDocumentDefault: 16,
      // PDF格式
      wdFormatPDF: 17,
      wdFormatXPS: 18,
      wdFormatFlatXML: 19,
      wdFormatFlatXMLMacroEnabled: 20,
      wdFormatFlatXMLTemplate: 21,
      wdFormatFlatXMLTemplateMacroEnabled: 22,
      wdFormatOpenDocumentText: 23,
      wdFormatStrictOpenXMLDocument: 24,
      // OFD格式
      wdFormatOFD: 102
    },
    WdRelativeHorizontalPosition: {
      // 相对于字符
      wdRelativeHorizontalPositionCharacter: 3,
      // 相对于列
      wdRelativeHorizontalPositionColumn: 2,
      // 相对于边距
      wdRelativeHorizontalPositionMargin: 0,
      // 相对于页面
      wdRelativeHorizontalPositionPage: 1,
      // 相对于内空白区
      wdRelativeHorizontalPositionInnerMarginArea: 6,
      // 相对于左边距
      wdRelativeHorizontalPositionLeftMarginArea: 4,
      // 相对于外空白区
      wdRelativeHorizontalPositionOuterMarginArea: 7,
      // 相对于右边距
      wdRelativeHorizontalPositionRightMarginArea: 5
    },
    WdProtectionType: {
      wdNoProtection: -1,
      wdAllowOnlyRevisions: 0,
      wdAllowOnlyComments: 1,
      wdAllowOnlyFormFields: 2,
      wdAllowOnlyReading: 3
    },
    WdHeaderFooterIndex: {
      wdHeaderFooterEvenPages: 3,
      wdHeaderFooterFirstPage: 2,
      wdHeaderFooterPrimary: 1
    },
    WdSectionStart: {
      // “连续”分节符。
      wdSectionContinuous: 0,
      // “偶数页”分节符。
      wdSectionEvenPage: 3,
      // “新栏”分节符。
      wdSectionNewColumn: 1,
      // “新页”分节符。
      wdSectionNewPage: 2,
      // “奇数页”分节符。
      wdSectionOddPage: 4
    },
    WdShapePosition: {
      // 底部
      wdShapeBottom: -999997,
      // 中央
      wdShapeCenter: -999995,
      // 所选区域内部
      wdShapeInside: -999994,
      // 左侧
      wdShapeLeft: -999998,
      // 所选区域外部
      wdShapeOutside: -999993,
      // 右侧
      wdShapeRight: -999996,
      // 顶部
      wdShapeTop: -999999
    }
  }
}
// eslint-disable-next-line camelcase
export default _wps_np_
