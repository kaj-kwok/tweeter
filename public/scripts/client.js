/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//temp hardcoded tweet

$(document).ready(function() {

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  }

  const createTweetElement = function(obj){
    let convertedTime = timeago.format(obj["created_at"])
    let $tweet =
    `<article class="tweet_container">
      <header class="article_tweet header">
        <div class="article_tweet user_block">
          <img class="avatar" src="${obj.user.avatars}" /img>${obj.user.name}</div>
        <div class="article_tweet handle_text">${obj.user.handle}</div>
      </header>
      <div class="article_tweet body">${obj.content.text}</div>
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
      renderTweets(data);
    })
  };

  loadTweets()

  //submit Post for tweet Form
  $("#submit_tweet").submit(function(event) {
    event.preventDefault();
    const tweetContent = $(this).serialize();

    // const post = $.ajax({
    //   type: "POST", 
    //   url: "/tweets", 
    //   data: tweetContent,
    //   processData: false
    // }
    //   )
    const post = $.post(url="/tweets", {text: tweetContent})
  });


});