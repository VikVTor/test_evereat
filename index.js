const express = require("express");
const app = express();
const api = require('./API/index');
const errorHandler = require("./API/middlewares/error-handler");

app.use((req, res, next) => {
    console.log(req.url);
    next();
});

app.use('/api/v1', api);

app.use(errorHandler);

app.listen(3001, () => {
    console.log("listening on http://localhost:3001");
})