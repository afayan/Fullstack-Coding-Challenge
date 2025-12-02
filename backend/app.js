import express from 'express'
import bodyParser from 'json-body-parser'
import handleUserReg from './controllers/handleUserRegister.js'
import handleLogin from './controllers/handleLogin.js'
import handleAddStore from './controllers/handleAddStore.js'
import handleGetStores from './controllers/handleGetStores.js'
import handleGetUsers from './controllers/handleGetUsers.js'
import handleRate from './controllers/handleRate.js'

const app = express()
app.use(bodyParser)

app.post('/signup', handleUserReg)
app.post('/login', handleLogin)
app.post('/addstore', handleAddStore)
app.get('/getstores', handleGetStores)
app.get('/getusers', handleGetUsers)
app.post('/rate', handleRate)

export default app