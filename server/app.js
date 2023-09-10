var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var indexRouter = require('./routes/GET/initialData');
var addItemsRouter = require('./routes/POST/addItems')
var deleteItemRouter = require('./routes/DELETE/deleteItems')
var localItem = require('./src/controller/inventoryStorage');
var app = express();
require('dotenv').config();

const corsOptions = {
    origin: ["http://localhost:3000", "https://bookinvfe.onrender.com/"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
}

const PORT = process.env.PORT || 8000


app.use(express.json());
app.use(cors(corsOptions));
app.locals.localStorage = new localItem(process.env.MONGO_URI)

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/add', addItemsRouter);
app.use('/delete', deleteItemRouter);

app.listen(PORT, () => {
    console.log(`App is Listening on PORT ${PORT}`);
})

module.exports = app;
