/*global $*/

$(function(){
    
        $('form').on('submit', function(event){
        event.preventDefault();
        var form = $(this);
        var cityInfo = form.serialize();
        console.log('submitted!' + cityInfo);
        $.ajax({
            method: 'POST', url: '/cities', data: cityInfo
        }).done(function(cityName){
                console.log('ajax called!')
                appendToList([cityName]);
                form.trigger('reset');
            });
    });
    
    $.get('/cities', appendToList);
    
    function appendToList(cities){
        var list = [];
        var content, city
        for (var i in cities){
            city = cities[i];
            content = '<a href ="/cities/'+city+'">' + city + '</a>';
            list.push($('<li>', {html: content} ));
        }
        $('#cityList').append(list);
    }
    
    // $('form').on('submit', function(event){
    //     event.preventDefault();
    //     var form = $(this);
    //     var cityInfo = form.serialize();
    //     console.log('submitted!' + cityInfo);
    //     $.ajax({
    //         method: 'POST', url: '/cities', data: cityInfo
    //     }).done(function(cityName){
    //             console.log('ajax called!')
    //             appendToList([cityName]);
    //             form.trigger('reset');
    //         });
    // });
});


