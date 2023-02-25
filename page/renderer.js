$(() => {
  const link_form = $("#link_form");
  const link_input = $("#link_input");
  const progress_list = $("#progress_list");

  link_form.on("submit", e => {
    e.preventDefault();

    let link = link_input.val();
    link_input.val("");

    switch(getType(link)) {
    case YT_NOT:
      alert("This is not a youtube link!");
      break;
    case YT_BROKEN:
      alert("This youtube link is broken!");
      break;
    case YT_PLAYLIST:
      downloadPlaylist(link);
      break;
    case YT_SONG:
      downloadSong(link);
      break;  
    }
  });

  const YT_NOT = "YT_NOT";
  const YT_BROKEN = "YT_BROKEN";
  const YT_PLAYLIST = "YT_PLAYLIST";
  const YT_SONG = "YT_SONG";
  function getType(link) {
    if(/youtube.com\//gi.test(link) || /youtu\.be\//gi.test(link)) {
      if(/playlist\?list=/gi.test(link)) {
        return YT_PLAYLIST;
      } else if(/watch\?v=/gi.test(link)) {
        return YT_SONG;
      } else {
        return YT_BROKEN;
      }
    } else {
      return YT_NOT;
    }
  }

  // const SUCCESS = "SUCCESS";
  const ALREADY_CREATED = "ALREADY_CREATED";
  const ERROR = "ERROR";
  function downloadPlaylist(link) {
    let index = link.indexOf("=");
    let playlistID = link.substring(index+1, link.length);
    let playlistTaskTitle = `Scraping Playlist (${playlistID})`;
    // eslint-disable-next-line no-undef
    let playlistTask = new Task(playlistTaskTitle, playlistID, progress_list);

    // eslint-disable-next-line no-undef
    downloader.getPlaylist(link).then(playlistResponse => {
      const playlistStatus = playlistResponse.status;
      const playlistResult = playlistResponse.result;

      playlistTask.remove();

      if(playlistStatus == ERROR) {
        alert("Something went wrong! (Getting Playlist)");
        throw playlistResult;
      } else {
        return playlistResult;
      }
    }).then(playlist => {
      let playlistTitle = playlist.title;
      let playlistID = playlist.id;
      let playlistVideos = playlist.videos;

      let folderID = playlistID;
      let folderTaskTitle = `Creating Playlist Folder (${playlistTitle})`;
      // eslint-disable-next-line no-undef
      let folderTask = new Task(folderTaskTitle, folderID, progress_list);

      // eslint-disable-next-line no-undef
      downloader.createFolder(playlistTitle).then(folderResponse => {
        const folderStatus = folderResponse.status;
        const folderResult = folderResponse.result;

        folderTask.remove();

        if(folderStatus == ERROR) {
          alert("Something went wrong! (Making folder)");
          throw folderResult;
        } else {
          // TODO: Ask user if they want to redownload.
          if(folderStatus == ALREADY_CREATED) { alert("This playlist has already be downloaded. Redownloading "); }
          return playlistVideos;
        }
      }).then(async (videos) => {
        let processedVideos = [];
        for(let i = 0; i < videos.length; i++) {
          let video = {
            title: videos[i].title,
            link: videos[i].url,
            id: videos[i].id,
            // eslint-disable-next-line no-undef
            task: new Task(`Queued Song (${videos[i].title})`, videos[i].id, progress_list)
          };

          processedVideos.push(video);
        }

        for(let i = 0; i < processedVideos.length; i++) {
          let video = processedVideos[i];
          let videoTitle = video.title;
          let videoLink = video.link;
          let videoID = video.id;
          let videoTask = video.task;
  
          videoTask.changeTitle(`Downloading Song (${videos[i].title})`);
  
          let info = {
            title: videoTitle,
            link: videoLink
          };

          // eslint-disable-next-line no-undef
          await downloader.downloadVideo(info).then(videoReponse => {
            const videoStatus = videoReponse.status;
            const videoResult = videoReponse.result;
  
            videoTask.remove();
    
            if(videoStatus == ERROR) {
              alert("Something went wrong! (Downloading video)");
              console.error(videoResult);
            }
          });
        }
      });
    }).catch(err => {
      alert("Something went wrong! (Overall error)");
      console.error(err);
    });
  }

  function downloadSong(link) {
    console.log(link);
  }


});