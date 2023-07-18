const express = require('express')
const session = require('express-session')
const member_routes = require("./src/routes/auth_users").auth_users
const guest_routes = require("./src/routes/public_users").public_users

const app = express()
const PORT = 5174

app.use(express.json())
app.use("/auth", member_routes)
app.use("/", guest_routes)

app.get('/', (req, res) => {
    res.send('Hey this is my API running 🥳')
})

app.listen(PORT, () => {
    console.log(`API listening on PORT ${PORT} `)
})

// Export the Express API
module.exports = app