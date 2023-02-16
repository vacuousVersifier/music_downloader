$(() => {
  let link_form = $("#link_form");
  let link_input = $("#link_input");
  let link;

  let response_text = $("#response");

  link_form.on("submit", e => {
    e.preventDefault();
    link = link_input.val();
    link_input.val("");

    let response = "";
    if(/youtube.com\//gi.test(link)) {
      // This is a youtube link
      if(/playlist\?list=/gi.test(link)) {
        // This is a playlist link
        response = "Playlist link!";
      } else if(/watch\?v=/gi.test(link)) {
        // This is a song link
        response = "Song link!";
      } else {
        response = "This isn't a song or playlist link";
      }
    } else if(/youtu\.be\//gi.test(link)) {
      // This is a short song link
      response = "Short song link!";
    } else {
      response = "This isn't a youtube link";
    }
    response_text.text(response);
  });
});