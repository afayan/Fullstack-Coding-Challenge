import express from 'express'
import bodyParser from 'json-body-parser'
import handleUserReg from './controllers/handleUserRegister.js'
import handleLogin from './controllers/handleLogin.js'
import handleAddStore from './controllers/handleAddStore.js'
import handleGetStores from './controllers/handleGetStores.js'
import handleGetUsers from './controllers/handleGetUsers.js'
import handleRate from './controllers/handleRate.js'
import verifyToken from './utils/verifyUser.js'
import verifyAdmin from './utils/verifyAdmin.js'
import changePassword from './controllers/changePassword.js'

const app = express()
app.use(bodyParser)

app.post('/signup', handleUserReg)
app.post('/login', handleLogin)
app.post('/addstore', verifyAdmin, handleAddStore)
app.get('/getstores', handleGetStores)
app.get('/getusers', verifyToken, handleGetUsers)
app.post('/rate', handleRate)
app.post('/changepassword', verifyToken, changePassword)

export default app