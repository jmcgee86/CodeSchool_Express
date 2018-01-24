/*global $*/

$(function(){
    
      $.get('/cities', appendToList);
    
    function appendToList(cities){
        var list = [];
        //var content, city
        for (var i in cities){
            var cityToList = cities[i];
            var content = '<a href ="/cities/'+cityToList+'">' + cityToList + '</a>';
            list.push($('<li>', {html: content} ));
        }
        $('#cityList').append(list);
    }
    
        $('#addNewCity').on('submit', function(event){
        event.preventDefault();
        var form = $(this);
        var cityInfo = form.serialize();
        //console.log('submitted!' + cityInfo);
        $.ajax({
            method: 'POST', 
            url: '/cities', 
            data: cityInfo
            }).done(function(addedCity){
                appendToList([addedCity]);
                form.trigger('reset');
            }).fail(function(addedCity){
                console.log('failed');
            });
    });
});
