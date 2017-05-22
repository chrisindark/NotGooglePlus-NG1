var express = require('express');
var router = express.Router();
var path = require('path');

var app = express();
app.set('port', (process.env.PORT || 5000));

app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'src')));

router.get('/*', function (req, res) {
    // load the single view file (angular will handle the page changes on the front-end)
    res.sendFile('index.html', {root: 'src'});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
