$(document).ready(() => {

  //new tweet button, reset view and open textarea
  $('.nav_text_arrow').on("click", (e) => {
    if ($('html').scrollTop() === 0) {
      $('.new-tweet').slideToggle(function() {
        $('#tweet-text').focus();
      })
    } else {
      $('html').animate({scrollTop: '0'}, 1000);
      $('.new-tweet').show();
    };
  });

  //trigger event to show scroll to top if user scrolls past certain point
  $(window).on("scroll", () => {
    if ($('html').scrollTop() > 30) {
      $('#scrollToTop').show();
      $('nav').hide();
    }
    else if ($('html').scrollTop() === 0) {
      $('#scrollToTop').hide();
      $('nav').show();
    };
  });

  //event button scroll to top
  $('#scrollToTop').on("click", () => {
    $('html').animate({scrollTop: '0'}, 1000);
    $('.new-tweet').show();
  });
});