var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan      = require('morgan');
var cors          = require('cors');
var multer = require('multer')

var routes = require('./routes/index');
var cases = require('./routes/cases');
var recipe = require('./routes/recipe');
var user =require('./routes/user') ;
var search =require('./routes/recipe_search');
var messages =require('./routes/messages');
var ingredients =require('./routes/ingredients');
var wanted =require('./routes/wanted');
var map =require('./routes/map');

var config = require('./config'); // get our config file

var Authenticate   = require('./middleware/authenticate'); // get our mongoose model
var Converter   = require('./middleware/converter'); // get our mongoose model

//mongo db connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://c4c5nf3@gmail.com:foncl1234@ds023425.mlab.com:23425/heroku_0gn01fzn', function(err) {
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

/*app.use(multer({ dest: './uploads/',
 rename: function (fieldname, filename) {
   return filename;
 },
}));
*/

app.use('/', routes);
app.use('/api', user);
app.use(Converter.convert);//middlewarer for authnticate users
//app.use(Authenticate.isAuth);//middlewarer for convert response to csv and json
app.use('/api/recipe', recipe);
app.use('/api/search', search);
app.use('/api/messages', messages);
app.use('/api/ingredients', ingredients);
app.use('/api/cases',cases);
app.use('/api/wanted',wanted);
app.use('/api/map',map);
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
