var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

app.use(express.static('public'));


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

app.route('/cities')
  .get(function(request,response){
    if(request.query.limit > cities.length){
      response.send("The limit cannot exceed " + cities.length)
    }
    else if (request.query.limit > 0){
      response.json(cities.slice(0, request.query.limit));
    }else{
    response.json(Object.keys(cities));
    }
  })
  .post(parseUrlencoded, function(request, response){
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

app.route('/cities/:name')
  .get(function(request, response){
    var state = cities[request.cityName];
    if (!state){
      response.status(404).json('City not found');
    }else{
      response.json(state);
    }
  })
  .delete(function(request, response){
      delete cities[request.cityName];
      response.sendStatus(200);
  });

app.listen(process.env.PORT, function(){
    console.log("Express is Running");
});