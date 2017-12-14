import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import expresstful from 'expresstful'
import * as resources from '@/resources'

const env = process.env.NODE_ENV || 'development'
const api = express()

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGO_DB, {
  useMongoClient: true
});

api.use(morgan(env === 'production' ? 'combined' : 'dev'))
api.use(bodyParser.urlencoded({extended: false}))
api.use(bodyParser.json())

api.use(expresstful(resources))

export default api
