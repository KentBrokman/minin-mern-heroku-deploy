const express = require("express")
const mongoose = require("mongoose")
const config = require('config')
const path = require('path')

const app = express()

app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))

app.use(express.static(path.join(__dirname, 'client', 'build')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

// if (process.env.NODE_ENV === 'production') {
//     app.use('/', express.static(path.join(__dirname, 'client', 'build')))

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//     })
// }

const PORT = process.env.PORT || 5000;

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'))

        app.listen(PORT, () => {
            console.log(`App has been started at ${PORT} port`)
        })
    } catch (e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start()
