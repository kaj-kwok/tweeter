$(document).ready(() => {
  $('.nav_text_arrow').on("click", (e) => {
    if($('html').scrollTop() === 0){
      $('.new-tweet').slideToggle()
    } else {
      $('html').animate({scrollTop: '0'}, 1000);
      $('.new-tweet').show()
    }
  })

});