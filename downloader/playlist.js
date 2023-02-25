const ytfps = require("ytfps");

module.exports = async (link) => {
  return ytfps(link)
    .then(playlist => {
      return {
        status: "Success",
        result: playlist
      };
    })
    .catch(err => {
      return {
        status: "Error",
        result: err
      };
    });
};