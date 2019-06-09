'use strict'

const port = 6000 || process.env.PORT

const express = require('express')
const bodyParser = require('body-parser')

const app = express().use(bodyParser.json())

app.listen(port, () => console.log(`App is listening on port ${port}`))