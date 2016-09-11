var express = require('express');
var app = express();

app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);

app.use('/js', express.static(__dirname + '/public/js'));
app.use('/css', express.static(__dirname + '/public/css'));

app.use('/', require('./lib/routes/index'));

app.listen(3000, function() {
	console.log('Listening on port 3000.');
});
