// const dotenv = require('dotenv')
// const express = require('express')
// const bodyParser = require('body-parser')
// const { readdirSync } = require('fs')
// const { basename } = require('path')

// dotenv.config()

// const app = express()

// app.use(bodyParser.json())

// const files = readdirSync(__dirname)
//   .filter(n => n.endsWith('.js') && n !== 'index.js')

// for (const file of files) {
//   const route = `/${file.replace('.js', '')}`
//   const fn = require(`./${file}`)
//   console.log(route)
//   app.use(route, (req, res, next) => {
//     Promise.resolve(fn(req, res))
//       .catch(error => next(error))
//   })
// }

// module.exports = {
//   path: '/api',
//   handler: app
// }
