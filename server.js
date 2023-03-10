const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const db = require('./config/db')

const playerRoutes = require('./routes/player-routes')
const teamRoutes = require('./routes/team-routes')
const userRoutes = require('./routes/user-routes')

const PORT = 8000

mongoose.set('strictQuery', true)

mongoose.connect(db, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

const app = express()

app.use(cors({ origin: `http://127.0.0.1:5500` }))

app.use(express.json())

app.use(playerRoutes)
app.use(teamRoutes)
app.use(userRoutes)

app.listen(PORT, () => {
	console.log('listening on port ' + PORT)
})

module.exports = app