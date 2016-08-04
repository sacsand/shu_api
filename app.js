var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan  = require('morgan');
var cors  = require('cors');
var multer = require('multer')

var routes = require('./routes/index');
var cases = require('./routes/cases');
var user =require('./routes/user') ;
var messages =require('./routes/messages');
var wanted =require('./routes/wanted');
var map =require('./routes/map');
var cases_library=require('./routes/cases_library');
var config = require('./config');
var Authenticate   = require('./middleware/authenticate');
var Converter   = require('./middleware/converter');


//mongo db connection
//var mongoURI = 'mongodb://localhost/test';
var mongoose = require('mongoose');
//mongoose.connect(config.database , function(err) {
mongoose.connect('mongodb://sacsand:sac1234@ds023495.mlab.com:23495/heroku_tdf52rkr' , function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('superSecret', config.secret); // secret variable


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cors({
    origin: '*',
    withCredentials: false,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin' ]
}));
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

app.use('/', routes);
app.use('/api', user);

app.use(Converter.convert);
//app.use(Authenticate.isAuth);

app.use('/api/messages', messages);
app.use('/api/cases',cases);
app.use('/api/wanted',wanted);
app.use('/api/map',map);
app.use('/api/caseslibry',cases_library);
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
