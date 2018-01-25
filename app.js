var express = require('express');
var app = express();
app.use(express.static('public'));

var router = require('./routes/cities.js');
app.use('/cities', router);

app.listen(process.env.PORT, function(){
    console.log("Express is Running");
});