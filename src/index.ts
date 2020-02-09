import axios from 'axios'
import Koa from 'koa'
import logger from 'koa-logger'
import responseTime from 'koa-response-time'
import Router from 'koa-router'

const router = new Router()
router.get('/api/(.+)', async ctx => {
  const response = await axios.get(ctx.path, { baseURL: 'https://scrapbox.io' })

  ctx.type = response.headers['Content-Type']
  ctx.body = response.data
})

const app = new Koa()
app.use(logger())
app.use(responseTime())
app.use(router.routes())

if (!process.env.IS_NOW) {
  const port = process.env.PORT || 5000
  app.listen(port)
  console.log(`Application has booted on http://localhost:${port}`)
}

export default app.callback()
