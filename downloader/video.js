const yt = require("yt-converter");

module.exports = {
  download,
  init
};

let root;
function init(_root) {
  root = _root;
}

function download(folder, title, link) {
  console.log(`root: ${root}\nfolder: ${folder}\nlink: ${link}\ntitle: ${title}`);
  return yt.convertAudio({
    url: link,
    itag: 140,
    directoryDownload: folder,
    title
  }, (data) => console.log(data), id => {
    console.log(id);
    return {
      status: "SUCCESS",
      result: id
    };
  });
}

// y.Download('https://www.youtube.com/watch?v=vBGRz6s-1UA', 'your/path/filename.mp3')
//     .then(videoInfo => console.log(videoInfo))
//     .catch(e => console.log(e))

// y.on('start',  function (commandLine) {
//     console.log(commandLine)
// })

// y.on('progress',  function (progress) {
//     console.log(progress)
// })

// y.on('finish',  function (fileName) {
//     console.log(fileName)
// })

// y.on('error', function (e) {
//     console.log(e)
// })


// const YoutubeMp3Downloader = require("youtube-mp3-downloader");

// let first = true;
// let YD;


// function init(root) {
//   YD = new YoutubeMp3Downloader({
//     "ffmpegPath": "/ffmpeg",        // FFmpeg binary location
//     "outputPath": root,    // Output file location (default: the home directory)
//     "youtubeVideoQuality": "highestaudio",  // Desired video quality (default: highestaudio)
//     "queueParallelism": 2,                  // Download parallelism (default: 1)
//     "progressTimeout": 2000,                // Interval in ms for the progress reports (default: 1000)
//     "allowWebm": false                      // Enable download from WebM sources (default: false)
//   });
// }

// function download(folder, id) {
//   console.log(`Downloading (${id})`);

//   YD.download(id);

//   await YD.on("finished", (err, data) => {
//     if(err) {
//       console.error(err);
//       return {
//         status: "ERROR",
//         result: JSON.stringify(err)
//       };
//     }
  
//     return {
//       status: "SUCCESS",
//       result: JSON.stringify(data)
//     };
//   });
// };