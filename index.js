const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');


const PORT = process.env.PORT || 3000;

const index = require('./routes/main')
const add = require('./routes/add')
const courses = require('./routes/courses')


const app = express();

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: 'hbs',
  layoutsDir: path.join(__dirname, './views/layouts'),
  partialsDir: [
    path.join(__dirname, './views/partials'),
  ]
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views')

app.use(express.static(path.join(__dirname, "static")));

app.use(express.urlencoded({extended: true}))

app.use('/', index)
app.use('/add', add)
app.use('/courses', courses)

app.listen(PORT, () => {
  console.log(`server has been started on port ${PORT}`);
})