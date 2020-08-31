import express from 'express'
import path from 'path'

import DinnerServer from './DinnerServer'

const app: express.Application = express()

app.use(express.json())
app.use(express.static('../build'))

app.use('/', (request, response, next) => {
  const origin = request.headers['origin']
  response.setHeader('Access-Control-Allow-Origin', origin || '*')
  next()
})

app.use('/dinner', DinnerServer)

app.get('*', (request, response) => {
  response.sendFile(path.resolve('build', 'index.html'))
})

app.listen(5000, () => console.log('Server is running on port 5000'))
