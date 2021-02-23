const klawSync = require('klaw-sync');
const through2 = require('through2');
const fs = require('fs-extra');
const homedir = require('os').homedir();
var server_paths = [];

const client_dir = homedir + "\\Documents\\";


const server_dir = klawSync('\\\\192.168.8.13\\Share\\MFMB', {nofile: true});

function arr_diff (array1, array2) {
  var array = [], diff = [];
  for (var i = 0; i < array1.length; i++) {
      array[array1[i]] = true;
  }

  for (var i = 0; i < array2.length; i++) {
      if (array[array2[i]]) {
          delete array[array2[i]];
      } else {
          array[array2[i]] = true;
      }
  }
  for (var k in array) {
      diff.push(k);
  }
  return diff;
}

function format (obj){
  var buffer = obj.path.split('\\')
  while(buffer[0] != 'MFMB'){
    buffer.shift();
    }
    return buffer.join('/');
}




var i =0;
server_dir.forEach(function (item){
  if(item.path.includes('video') || item.path.includes('image')){
    pathBuffer = server_dir[i].path.split('\\');
    while(pathBuffer[0] != 'MFMB'){
      pathBuffer.shift();
      }
      server_paths = pathBuffer.join('/');
      pathBuffer = [];
      //console.log(client_dir + server_paths);
      fs.ensureDirSync(client_dir + server_paths);
  }
    i++;
});

const client_dirs = klawSync(client_dir + 'MFMB', {nofile: true});
var diff = arr_diff(server_dir.map(obj => format(obj)),client_dirs.map(obj => format(obj)));
diff.forEach(element =>{
  fs.removeSync(client_dir + element);
});



/*
i=0;
server_dir.forEach(function (dir) {
    fs.ensureDirSync(dir.path);
});
*/
/*
const excludeDirFilter = through2.obj(function (item, enc, next) {
  if (!item.stats.isDirectory()) this.push(item)
  next()
})

const dirs = klawSync('\\\\192.168.8.13\\Share', {nofile: true});
const otherdirs = klawSync('./Client', {nofile: true});

  console.log(dirs);
  console.log(otherdirs);
  console.log(dirs[0].stats.ctime);
  console.log(otherdirs[0].stats.ctime);
  console.log(dirs[0].stats.ctime-otherdirs[0].stats.ctime);
  
  
  if((dirs[0].stats.ctime-otherdirs[0].stats.ctime) > 0){
      fs.remove(otherdirs[0].path);
      fs.copy(dirs[0].path,otherdirs[0].path);
      console.log("updated");
  }
  else{
    console.log("already up to date");
  }
*/


