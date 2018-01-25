var express = require('express');
var router = express.Router();


var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

var cities = {
  'Providence': 'Rhode Island',
  'Boston': 'Massachusetts',
  'Portland': 'Maine',
  'Burlington': 'Vermont',
  'Hartford': 'Connecticut'
};

router.route('/')
  .get(function(request,response){
    if(request.query.limit > cities.length){
      response.send("The limit cannot exceed " + cities.length)
    }
    else if (request.query.limit > 0){
      //response.json(cities.slice(0, request.query.limit));
      response.json(Object.keys(cities).slice(0, request.query.limit));
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
router.route('/:name')
    .all(function(request, resonse, next){
        request.cityName = parseCityName(request.params.name);
        next();
    })
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
      
var createCity = function(city, state){
    cities[city] = state;
    return city; 
};

function parseCityName(name) {
  var parsedName = name[0].toUpperCase() + name.slice(1).toLowerCase();
  return parsedName;
};

module.exports = router;
