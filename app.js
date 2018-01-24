var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

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

app.get('/cities', function(request,response){
  if(request.query.limit > cities.length){
    response.send("The limit cannot exceed " + cities.length)
  }
  else if (request.query.limit > 0){
    response.json(cities.slice(0, request.query.limit));
  }else{
  response.json(Object.keys(cities));
  }
});

app.post('/cities', parseUrlencoded, function(request, response){
//  var newCity = request.body;
//  cities[newCity.city] = newCity.state;
if (request.body.city.length>=4 && request.body.state.length>=2){
    var newCity = createCity(request.body.city, request.body.state);
    response.status(201).json(newCity);
  }else{
    console.log('Please enter valid city and state');
    response.status(400).json('Please enter valid city and state')
  }
});

var createCity = function(city, state){
    cities[city] = state;
    return city; 
};

app.listen(process.env.PORT, function(){
    console.log("Express is Running");
});