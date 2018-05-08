'use strict';
function createFailAlert(status, responseText) {
  let alert = $(
  `<div class="alert alert-warning alert-dismissible fade show" role="alert">
    Failed ${status}: ${responseText}.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`);

  $('#alerts').append(alert);

  setTimeout(() => alert.alert('close'), 3000);
}

$(document).on('submit', '#form', (event) => {
  event.preventDefault();
  let url = $('#url-input').val();
  $.ajax({
    url: '/api/recipe',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({url})
  }).then(res => {
    location.reload();
  }).fail((jqXHR, textStatus) => {
    createFailAlert(jqXHR.status, jqXHR.responseText);
  });
  
  $('#url-input').val('');
});

$(document).on('click', '.card-img-top', function(event) {
  let id = $(this).data('id');
  $.ajax({
    url: '/api/recipe/' + id,
    method: 'GET',
    contentType: 'application/json',
  }).then(res => {
    $('#modal-title').text(res.title);
    let ingredients = $('#ingredients');
    let directions = $('#directions');

    res.ingredients.forEach(step => {
      ingredients.append($(`<li>${step}</li>`));
    });
    
    res.directions.forEach(step => {
      directions.append($(`<li>${step}</li>`));
    });

    $('#recipe-modal').modal('toggle');
  });
});