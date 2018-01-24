/*global $*/

$(function(){
    
      $.get('/cities', appendToList);
    
    function appendToList(cities){
        var list = [];
        //var content, city
        for (var i in cities){
            var cityToList = cities[i];
            var content = '<a href ="/cities/'+cityToList+'">' + cityToList + '</a>' + '<a href ="#" data-block="'+cityToList+'">(X)</a>' ;
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
    
    $('#cityList').on('click', 'a[data-block]', function(event){
        if (!confirm('Are you sure?')){
            return false;
        }
        var target = $(event.currentTarget);
        
        $.ajax({
            method:'DELETE',
            url: '/cities/' +target.data('cityToList')
        }).done(function(){
            target.parents('li').remove();
        });
        
    });
});
