// const bodyParser = require("body-parser");
// import { apiDocumentation } from './docs/apiDoc';

const express = require("express");

const cors = require('cors');
const sellRoute = require('./routes/sellRoute')
const userRoute = require('./routes/userRoute');
const donationRoute = require('./routes/donationRoute');
// const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
// const { apiDocumentation } = require('./docs/apiDoc')
// const {swaggerSpec,swaggerUi} = require('./utils/swagger')
// const formidableMiddleware = require('express-formidable');
// const multer = require('./middleware/uploadImage')

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: false }));
// app.use(formidableMiddleware())
app.use(express.json());

app.use(
  cors({
    method: ["GET", "POST", "PUT", "DELETE"],
    origin: "*",
  })
);


// app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiDocumentation));
app.use('/', userRoute);
app.use('/donation', donationRoute);
app.use('/sell', sellRoute);



app.use((error, req, res, next) => {
  res.status(400).json({
    message: error.message,
  });
});
// app.get('/', (req, res) => {
//     res.send('<h1>hello wold</h1>');
// })
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
