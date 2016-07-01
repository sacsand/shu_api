var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan      = require('morgan');


var routes = require('./routes/index');
var recipe = require('./routes/recipe');
var user =require('./routes/user') ;
var search =require('./routes/recipe_search');
var comments =require('./routes/comment');
var ingredients =require('./routes/ingredients');


var config = require('./config'); // get our config file

var Authenticate   = require('./middleware/authenticate'); // get our mongoose model
var Converter   = require('./middleware/converter'); // get our mongoose model

//mongo db connection
var mongoose = require('mongoose');
mongoose.connect(config.database, function(err) {
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));


app.use('/', routes);
app.use('/api', user);
app.use(Converter.convert);//middlewarer for authnticate users
app.use(Authenticate.isAuth);//middlewarer for convert response to csv and json
app.use('/api/recipe', recipe);
app.use('/api/search', search);
app.use('/api/comments', comments);
app.use('/api/ingredients', ingredients);


app.get('/setup', function(req, res) {

  // create a sample user
  var nick = new User({
    name: 'sac',
    password: 'password',
    admin: true
  });

  // save the sample user
  nick.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

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
