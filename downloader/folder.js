const fs = require("fs");
const path = require("path");

module.exports = folder;


function folder(win, root, title) {
  let results;

  let folderPath = path.join(root, title);

  try {
    if(fs.existsSync(folderPath)) {
      results = {
        root,
        folderPath, 
        response: {
          status: "ALREADY_CREATED",
          result: root
        }
      };
    } else {
      fs.mkdirSync(folderPath);
    }    

    results = {
      root,
      folderPath, 
      response: {
        status: "SUCCESS",
        result: folderPath
      }
    };
  } catch (err) {
    results = {
      root,
      folderPath, 
      response: {
        status: "ERROR",
        result: err
      }
    };
  }

  return results;
}