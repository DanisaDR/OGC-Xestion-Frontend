$(document).ready(function() {
  $('.navbar-link').click(function(e) {
    alert('Salgo?');
    if ($('.navbar-collapse').hasClass('show')) {
      $('.navbar-collapse').removeClass('show');
      e.preventDefault();
    }
  });
});
