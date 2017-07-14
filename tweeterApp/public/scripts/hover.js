$( document ).ready(function() {
  $('.posted-tweet').hover(function() {
    $(this).css({'color': '#244751',
                 'border': '1px solid gray'});
    $(".profile-pic").css('opacity', '1');,
    // $(this).css({'color': '#244751',
    //              'border': '1px solid lightgray'});
    // $(".profile-pic").css('opacity', '.5');

  });

});