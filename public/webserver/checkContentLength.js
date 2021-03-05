const { getVideoDurationInSeconds } = require('get-video-duration')
const homedir = require('os').homedir();
var childProcess = require('child_process');
var fs = require('fs-extra');
var dur;

function runScript(scriptPath, callback) {

  // keep track of whether callback has been invoked to prevent multiple invocations
  var invoked = false;

  var process = childProcess.fork(scriptPath);

  // listen for errors as they may prevent the exit event from firing
  process.on('error', function (err) {
      if (invoked) return;
      invoked = true;
      callback(err);
  });

  // execute the callback once the process has finished running
  process.on('exit', function (code) {
      if (invoked) return;
      invoked = true;
      var err = code === 0 ? null : new Error('exit code ' + code);
      callback(err);
  });

}

async function write (data) {
  try {
    for(var i = 0; i < data.length; i++){
      try{  
          dur = await getVideoDurationInSeconds(data[i].videolink)
        } catch (err) {
          console.error(err)
        }
        data[i].contentLength = Math.round(dur);
}
    await fs.writeJson(homedir + '/AppData/Roaming/MFMB/AutoData/updateData.json', data, {spaces: 1 })
    runScript(__dirname + '/insertData.js', function (err) {
      if (err) throw err;
      console.log('finished running checkContentLength.js');
    });
  } catch (err) {
    console.error(err)
  }
}

async function read () {
  var data = await fs.readJson(homedir + '/AppData/Roaming/MFMB/AutoData/updateData.json', { throws: false,})
  write(data)
}

read();