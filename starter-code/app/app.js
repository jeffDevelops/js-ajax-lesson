$(document).on('ready', function() {
  console.log("CONNECTED");

  var list = $('#cats');
  var listItem;

  var catIndex = $.get('https://ga-cat-rescue.herokuapp.com/api/cats')
                  .done(function(data) {
                    var parsedCats = JSON.parse(data);
                    for(var i = 0; i < parsedCats.length; i++) {
                      console.log("Name: " + parsedCats[i].name);
                      console.log("Note: " + parsedCats[i].note);
                      console.log("_____________________________");
                      var listItem = document.createElement('li');
                      listItem.innerHTML = parsedCats[i].name + ' - <span><em>' + parsedCats[i].note + '</em></span>';
                      list.append(listItem);
                    }
                  });


  $('form').on('submit', function(event) {
    event.preventDefault();
    
    var catData = $('#cat-name').val();
    var noteData = $('#cat-note').val();

    var newCat = {
      name: catData,
      note: noteData
    };

    var stringifiedCat = JSON.stringify(newCat);
    $.ajax({
      url: 'https://ga-cat-rescue.herokuapp.com/api/cats',
      dataType: 'json',
      method: 'POST',
      data: stringifiedCat
    }).done(function(data) {
      var listItem = document.createElement('li');
      listItem.innerHTML = data.name + ' - <em>' + data.note + '</em>';
      list.append(listItem);
    });
  });


});

