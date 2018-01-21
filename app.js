var express = require('express');
var app = express();

app.get('/', function (request, response) {
  response.send('Hello World');
});

app.get('/name', function (request, response){
  var myName = 'Jim'
  response.send(myName);
});

app.get('/redirect', function (request, response){
  response.redirect(301,'/surprise');
});

app.get('/surprise', function(request, response){
  response.send("You have been redirected");
});

app.get('/date', function(request, response){
  response.send("Today is " + new Date());
})

app.listen(process.env.PORT, function(){
    console.log("Express is Running");
});