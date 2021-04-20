$(document).ready(function() {
  var key = "AIzaSyB7mPs042i3i0IF0k5f3H1OimLbvBHeYk0";
  var playlistId = "PLkSaehvtoPcxdDhbdig_EYYVl5ONrhAqt";
  var URL = "https://www.googleapis.com/youtube/v3/playlistItems";

  var options = {
    part: "snippet",
    key: key,
    maxResults: 20,
    playlistId: playlistId
  };

  loadVids();

  function loadVids() {
    $.getJSON(URL, options, function(data) {
      var id = data.items[0].snippet.resourceId.videoId;
      console.log(data);
      mainVid(id);
      resultsLoop(data);
    });
  }

  function mainVid(id) {
    $("#video").html(`
					<iframe width="100%" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
				`);
  }
  
      function resultsLoop(data) {

        $.each(data.items, function (i, item) {
          
            var thumb = item.snippet.thumbnails.high.url;
            var title = item.snippet.title;
            var desc = item.snippet.description.substring(0, 100);
            var vid = item.snippet.resourceId.videoId;

            $('.list-inner').append(`
							<article class="item" data-key="${vid}">
								<img src="${thumb}" alt="" class="thumb">
								<div class="details">
									<div class="title">${title}</div>
									<div class="description">${desc}...</div>
								</div>

							</article>
						`);
        });
    }
  
      $('.list-inner').on('click', 'article', function () {
        var id = $(this).attr('data-key');
        mainVid(id);
    });
  
});