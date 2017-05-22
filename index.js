var express = require('express');
var path = require('path');
var router = express.Router();

var app = express();

app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use('/', express.static(path.join(__dirname, '.tmp')));

app.use('', router.get('/*', function (req, res) {
    // load the single view file (angular will handle the page changes on the front-end)
    res.sendFile(path.join(__dirname, 'src/index.html'));
})); 

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
