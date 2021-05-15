require("dotenv").config() // eslint-disable-line
import * as bodyParser from "body-parser"
import express from "express"
import cors from "cors"
import routes from "./routes"

const app: express.Application = express()
const port = process.env.PORT || 8080


app.use(bodyParser.json())
app.use(cors())
app.use(routes)
app.listen(port, () => {
	console.info("melyon started on *:" + port)
})
