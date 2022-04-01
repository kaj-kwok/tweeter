/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//temp hardcoded tweet

$(document).ready(function() {

  //function to loop through tweets
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    };
  };

  //function to escape text content
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //create html markup of tweet
  const createTweetElement = function(obj){
    let convertedTime = timeago.format(obj["created_at"]);
    let $tweet =
    `<article class="tweet_container">
      <header class="article_tweet header">
        <div class="article_tweet user_block">
          <img class="avatar" src="${obj.user.avatars}" /img>${obj.user.name}</div>
        <div class="article_tweet handle_text">${obj.user.handle}</div>
      </header>
      <div class="article_tweet body">${escape(obj.content.text)}</div>
      <footer class="article_tweet footer">
        <div class="article_tweet counter">${convertedTime}</div>
        <div class="article_tweet icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>`
    return $tweet;
    };

  //function to load tweets from server
  const loadTweets = function() {
    $.get('/tweets', function(data) {
      $('#tweets-container').empty();
      renderTweets(data);
    });
  };

  //initiate first load of stored tweets
  loadTweets();

  //submit Post for tweet Form
  $("#submit_tweet").submit(function(event) {
    event.preventDefault();
    $('#tweet-text').removeClass("error");
    $('#tweet_error').slideUp();
    let currentText = $("#tweet-text").val();
    if (!currentText){
      $('#tweet_error').slideDown().html(`<i class="fa-solid fa-triangle-exclamation"></i> Please enter your Tweet`);
      $('#tweet-text').addClass("error");
    }
    if (currentText.length > 140) {
      $('#tweet_error').slideDown().html(`<i class="fa-solid fa-triangle-exclamation"></i>Tweet has too many characters`);
      $('#tweet-text').addClass("error");
    } else {
      const tweetContent = $(this).serialize();
      const post = $.post(url="/tweets", tweetContent, function() {
        $("#tweet-text").val('');
        loadTweets();
      });
    };
  });

  //added function to clear error messages if textarea loses focus
  $("#submit_tweet").focusout(() => {
    $('#tweet-text').removeClass("error");
    $('#tweet_error').slideUp();
  });

});