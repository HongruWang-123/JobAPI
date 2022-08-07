require('dotenv').config();
require('express-async-errors');

const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const ratelimit = require('express-rate-limit');
const yaml = require('yamljs');
const swaggerUI = require('swagger-ui-express');
const doc = yaml.load('./swagger.yaml');
const express = require('express');
const app = express();
//middleware
const errorHandler = require('./middleware/errorHandler');
const routeNotFound = require('./middleware/routeNotFound');
//db connection
const db = require('./db/connect');
//router
const router = require('./routes/main');

app.set('truse proxy',1);
const limiter = ratelimit({
    windowsMs: 15*60*1000,
    max:100
})
app.use(limiter);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.get('/',(req,res) => {
    res.send('<h1>Job API</h1><a href = "/api-doc">Documentation</a>');
})
app.use('/api-doc',swaggerUI.serve, swaggerUI.setup(doc));
app.use('/api/v1',router);

app.use(routeNotFound);
app.use(errorHandler);

const Port = process.env.PORT || 3000;

const start = async () => {
    try {
        await db(process.env.MONGO_URI)
        app.listen(Port, () => console.log(`app is listening to ${Port}`));
    } catch (error) {
        console.log(error);
    }
}

start();
