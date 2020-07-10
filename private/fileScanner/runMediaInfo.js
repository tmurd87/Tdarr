const fs = require("fs");
const path = require("path");
if (fs.existsSync(path.join(process.cwd(), "/npm"))) {
  var rootModules = path.join(process.cwd(), "/npm/node_modules/");
} else {
  var rootModules = "";
}

module.exports = function runMediaInfo(filePath) {

  const MediaInfo = require(rootModules + 'mediainfo.js')

  return new Promise((resolve) => {

    (async function () {

      let mediainfo
      try {

        fd = fs.openSync(filePath, 'r')
        var getSize = function () { return fs.statSync(filePath).size }
        mediainfo = await MediaInfo({ format: 'JSON' })
        const readChunk = (size, offset) => {
          const buffer = new Uint8Array(size)
          var result = fs.readSync(fd, buffer, 0, size, offset)
          return buffer
        }
        var result = await mediainfo.analyzeData(getSize, readChunk)

        result = JSON.parse(result).media

        mediainfo && mediainfo.close()

        resolve({
          result: "success",
          data: result,
        });

      } catch (err) {

        mediainfo && mediainfo.close()

        console.log(err.stack);
        resolve({
          result: "err",
          data: "MediaInfo encountered an err:" + err,
        });
      }
    })();
  });
};
