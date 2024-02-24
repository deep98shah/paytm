const express = require("express");
const rootRouter = require("./routes/index")

const app = express()
const cors = require("cors")

app.use(cors())
app.use(express.json())

app.use('/api/v1', rootRouter)

app.listen(80, () => {
    console.log('Paytm backend listening on 80...')
})
