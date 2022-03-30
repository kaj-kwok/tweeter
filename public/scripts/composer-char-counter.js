$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    let charCount = 140 - $(this).val().length;
    let count = $(this).parent().find(".counter")
    if(charCount < 0) {
      count.text(charCount).css("color", "red")
    }else {
      count.text(charCount).css("color", '')
    }
  });
});

