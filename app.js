
/**
 * Module dependencies
 */

var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api'),
<<<<<<< HEAD
=======
  beer = require('./routes/beer'),
>>>>>>> a75b6b485088eba638565476ef4165d0dd307fbd
  http = require('http'),
  path = require('path');

var app = module.exports = express();
<<<<<<< HEAD
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
=======

>>>>>>> a75b6b485088eba638565476ef4165d0dd307fbd

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
  // TODO
};


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);
<<<<<<< HEAD
=======
app.get('/expose/:dir/:name', routes.expose);
>>>>>>> a75b6b485088eba638565476ef4165d0dd307fbd

// JSON API
app.get('/api/name', api.name);

<<<<<<< HEAD
// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Socket.io Communication
io.sockets.on('connection', require('./routes/socket'));
=======

app.get('/api/beers', beer.list);
app.post('/api/beers', beer.create);
app.get('/api/beers/:id', beer.retrieve);
app.put('/api/beers/:id', beer.update);
app.delete('/api/beers/:id', beer.delete);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


>>>>>>> a75b6b485088eba638565476ef4165d0dd307fbd

/**
 * Start Server
 */

<<<<<<< HEAD
server.listen(app.get('port'), function () {
=======
http.createServer(app).listen(app.get('port'), function () {
>>>>>>> a75b6b485088eba638565476ef4165d0dd307fbd
  console.log('Express server listening on port ' + app.get('port'));
});
