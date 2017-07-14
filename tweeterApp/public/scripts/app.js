/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$( document ).ready(function() {
  function createTweetElement(tweetObj) {


    var $tweet = $("<article>").addClass("posted-tweet");

// Header Element Appending
    var $header = $("<header>").addClass("article-header");
    var $name = $("<span>").addClass("name").text(tweetObj.user.name);
    var $handle = $("<span>").addClass("twitter-handle").text(tweetObj.user.handle);
    var $profile = $("<img>").addClass("profile-pic").attr("src", tweetObj.user.avatars.regular);
    $($header).append($profile)
              .append($name)
              .append($handle);
    $($tweet).append($header);

// Content Element Appending
    var $content = $("<div>").addClass("content-tweet").text(tweetObj.content.text);
    var $tweetBody = $("<span>");
    $($content).append($tweetBody);
    $($tweet).append($content);

// Footer Element Appending
    var $footer = $("<footer>").addClass("article-footer");
    var $timePosted = $("<span>").text(tweetObj.created_at);
    var $iconDiv = $("<div>").addClass("icons");
    var $flag = $("<i>").addClass("fa fa-flag").attr("aria-hidden", "true");
    var $retweet = $("<i>").addClass("fa fa-retweet").attr("aria-hidden", "true");
    var $heart = $("<i>").addClass("fa fa-heart").attr("aria-hidden", "true");
    $($footer).append($timePosted)
              .append($iconDiv);
    $($iconDiv).append($flag)
              .append($retweet)
              .append($heart);
    $($tweet).append($footer);

    //returns the final tweet with all parts appended
    return $tweet;
  }

  function renderTweets(tweets) {
    // loops through tweets
    for (each of tweets) {
      // calls createTweetElement for each tweet
      var $tweet = createTweetElement(each);

       // takes return value and appends it to the tweets container
      $('#tweets-container').prepend($tweet);
    }
  }

  function loadTweets() {
    $.ajax({
        url: '/tweets',
        method: 'GET',
        })
        .done(function (data) {
          renderTweets(data);
          // console.log(data);
        });
  }

  // Uses AJAX functionality to post the new data
  function postTweet(data) {

     return $.ajax({
        url:'/tweets',
        method: 'POST',
        data: data,
        datatype: 'JSON'
      })
  }





$( "#submitForm" ).on("submit", function( event ) {
  event.preventDefault();
  // alert( "You need to write something to post your tweet!" );
  var $input = $( "#textArea" ).val();
  var tweetContent = $(this).serialize();

  if (!$input) {
    alert( "You need to write something to post your tweet!" );

  } else if ($input.length > 140) {
    alert("You've exceeded the character count!");
  } else {
    postTweet(tweetContent).done(loadTweets);
    $input = "";
  }

});

loadTweets();

$( ".compose-button" ).click(function() {
  $( "#new-tweet" ).slideToggle( 400 , function() {
    $("#textArea").focus();
  });
});

});