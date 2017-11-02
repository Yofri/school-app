const app = require('express')();
const bodyParser = require('body-parser');
const ejs = require('ejs');

const index = require('./routes/index');
const teacher = require('./routes/teacher');
const subject = require('./routes/subject');

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', index);
app.use('/teachers', teacher);
app.use('/subjects', subject);

app.listen(3000, () => { console.log(`App started on port 3000`) });