const express = require('express');
const mongoose = require('mongoose')
const chalk = require('chalk')
require('dotenv').config()
const postRoutes = require('./routes/post-routes')
const contactRoutes = require('./routes/contact-routes')
const postApiRoutes = require('./routes/api-post-routes')
const createPath = require('./helpers/create-path')

const errorMsg  = chalk.bgKeyword('white').redBright;
const successMsg = chalk.bgKeyword('green').white;

const app = express();
const methodOverride = require('method-override')
const morgan = require('morgan')
app.set('view engine', 'ejs');



mongoose
  .connect(process.env.MONGO_URL)
  .then((res)=>console.log(successMsg('Connected to db')))
  .catch((error)=>console.log(errorMsg(error) ))

  app.listen(process.env.PORT || 3000, (error) => {
    error ? console.log(errorMsg(error)) : console.log(successMsg(`Listening port: ${process.env.PORT}`));
  });

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(express.urlencoded({extended: false}))
app.use(express.static('styles'));
app.use(methodOverride('_method'))
app.get('/', (req, res) => {
  const title = 'Home'
  res.render(createPath('index'), {title});
});

app.use(postRoutes)
app.use(contactRoutes)
app.use(postApiRoutes)
app.get('/about', (req, res) => {
  const title = 'About'
  res.render(createPath('about'), {title});
});
app.use((req, res) => {
  const title = 'Error'
  res.status(404).render(createPath('error'), {title});
});
