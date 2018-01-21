var express = require('express');
var app = express();

app.use(express.static('public'));

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

var cities = {
  'Providence': 'Rhode Island',
  'Boston': 'Massachusetts',
  'Portland': 'Maine',
  'Burlington': 'Vermont',
  'Hartford': 'Connecticut'
};

app.param('name', function(request, response, next){
  request.cityName = parseCityName(request.params.name);
  next();
});

app.get('/cities', function(request,response){
  if(request.query.limit > cities.length){
    response.send("The limit cannot exceed " +cities.length)
  }
  else if (request.query.limit > 0){
    response.json(cities.slice(0, request.query.limit));
  }else{
  response.json(Object.keys(cities));
  }
});

app.get('/cities/:name', function(request, response){
  var state = cities[request.cityName];
  if (!state){
    response.status(404).json('City not found');
  }else{
    response.json(state);
  }
});

function parseCityName(name) {
  var parsedName = name[0].toUpperCase() + name.slice(1).toLowerCase();
  return parsedName;
}

app.listen(process.env.PORT, function(){
    console.log("Express is Running");
});