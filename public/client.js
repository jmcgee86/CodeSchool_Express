/*global $*/

$(function(){
    
    $.get('/cities', appendToList);
    
    function appendToList(cities){
        var list = [];
        var content, city
        for (var i in cities){
            city = cities[i];
            content = '<a href ="/cities/'+city+'">' + city + '</a>';
            list.push($('<option>', {html: content} ));
        }
        $('#cityList').append(list);
    }
    
    $('form').on('submit', function(event){
        event.preventDefault();
        var form = $(this);
        var cityInfo = form.serialize();
        
        $.ajax({
            type: 'POST', url: '/cities', data: cityInfo
        }).done(function(cityName){
                appendToList([cityName]);
                form.trigger('reset');
            });
    });
});


