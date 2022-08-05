import express, { Express, Router, Request, Response } from 'express'
import axios from 'axios'

const app: Express = express()
// 解决跨域
app.use('*',(req,res,next) =>{
  res.header('Access-Control-Allow-Origin','*')
  next()
})

const router: Router = express.Router()

app.use('/api', router)

router.get('/list', async (req: Request, res: Response) => {
  const result = await axios.post(
    'https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=localCityNCOVDataList,diseaseh5Shelf'
  )
  // 将数据返回给前端
  res.json({
    ...result.data.data
  })
})

app.listen(8080, () => {
  console.log('服务启动在本地8080端口')
})