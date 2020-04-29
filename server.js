const Vue = require('vue')
const Koa = require('koa')
const fs = require('fs')
const path = require('path')
const koaStatic = require('koa-static')

const app = new Koa()

const resolve = (file) => path.resolve(__dirname, file)
// 开放dist目录
app.use(koaStatic(resolve('./dist')))


// 第 2 步：获得一个createBundleRenderer
// eslint-disable-next-line import/no-extraneous-dependencies
const { createBundleRenderer } = require('vue-server-renderer')
const bundle = require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')

const renderer = createBundleRenderer(bundle, {
  runInNewContext: false,
  template: fs.readFileSync(resolve('./src/index.temp.html'), 'utf-8'),
  clientManifest,
})
function renderToString(context) {
  return new Promise((res, rej) => {
    renderer.renderToString(context, (err, html) => {
      if (err) {
        console.log(err)
        rej(err)
      } else {
        res(html)
      }
    })
  })
}
// 第 3 步：添加一个中间件来处理所有请求
app.use(async (ctx) => {
  const context = {
    title: 'ssr test',
    url: ctx.url,
  }
  // 将 context 数据渲染为 HTML
  const html = await renderToString(context)
  // eslint-disable-next-line no-param-reassign
  ctx.body = html
})

const port = 3000
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})
