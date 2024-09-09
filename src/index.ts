
import express, { Request, Response } from "express"
import { Env } from "./core-internal/utils/env"
import { Application } from "./core/application"
import { Router } from "./core/route"
import cors from "cors"
import morgan from "morgan"
import fileUpload from "express-fileupload"


const e = express()
e.use(express.json())
e.use(express.urlencoded({ extended: false }))
e.use(cors())
e.use(morgan("combined"))
e.use(fileUpload({ createParentPath: true }))


const application = new Application()
Router(e, application)

e.listen(Env.port, () => {
    console.log(`listening on port ${Env.port}`)
})

// initialize migration: npx db-migrate init

// create a new migration file: 
//npx db-migrate create initialize_tables -e pg --sql-file

// up
// npx db-migrate up -e pg

