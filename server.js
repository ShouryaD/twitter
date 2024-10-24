const express = require('express')
const app = express()
const db = require('./dbConfig')
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoute')
const cors = require('cors')
db()

const port = 4000
const hostName = '127.0.0.1'

//middlewares
app.use(cors())
app.use(express.json())
app.use('/users', userRoutes)
app.use('/posts', postRoutes)
app.use(express.static('uploads'))

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(port, hostName, () => {
    console.log(`Server is running on http://${hostName}:${port}`)
})