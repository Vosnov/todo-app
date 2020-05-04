const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const webpack = require('webpack')
const bodyParser = require('body-parser')
const path = require('path')

const isProd = process.env.NODE_ENV === 'prod' || false
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/todo', require('./routes/todo.routes'))

app.use(require('connect-history-api-fallback')())

if (!isProd) {
  webpackDevMiddleware()
} else {
  app.use(express.static(path.resolve(__dirname, 'client', 'public')))
}

start()

function webpackDevMiddleware() {
  const webpackConfig = require('./webpack.config.dev.js')
  const compiler = webpack(webpackConfig)

  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
  }));
  app.use(require("webpack-hot-middleware")(compiler))
}

async function start() {
  const PORT = config.get('port') || 3000

  try {
    await mongoose.connect(config.get('mongoURI'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })

    app.listen(PORT, () => {
      console.log(`Server started on port: ${PORT}...`)
    })
  } catch (e) {
    console.log('Server Error', e.message)
    mongoose.disconnect()
    process.exit(1)
  }
}
