const path = require('path')
const glob = require('glob')
// 配置pages多页面获取当前文件夹下的html和js
function getEntry(globpath) {
  let entries = {}
  let tmp
  let pathname
  let files
  glob.sync(globpath).forEach((entry) => {
    files = path.dirname(entry).split('/')
    tmp = entry.split('/').splice(-3)
    pathname = files[files.length - 1]
    entries[pathname] = {
      entry: ['src/' + tmp[0] + '/' + tmp[1] + '/' + tmp[2]],
      template: 'public/index.html',
      title: tmp[1],
      filename: tmp[1] + '.html',
    }
  })
  return entries
}
const pages = getEntry('./src/views/**?/*.js')
module.exports = pages
