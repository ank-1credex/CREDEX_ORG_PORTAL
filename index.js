const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
global.Joi = require('joi');
dotenv.config();

const db = require('./db/db');
const routes = require("./routes");
const port = parseInt(process.env.PORT);

app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '300mb', extended: true }));
app.use(cors());
app.use('/api/v1/', routes);

db.sequelize.authenticate().then(() => {
    app.listen(port, () => {
        console.log(`Backend server started on port 4000`)
    });
});