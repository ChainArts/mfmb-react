const klawSync = require('klaw-sync');
const fs = require('fs-extra');
const homedir = require('os').homedir();
const { getVideoDurationInSeconds } = require('get-video-duration');

function File(path,mtime,fname,type,campaign,company) {
  this.path = path;
  this.mtime = mtime;
  this.fname = fname;
  this.type = type;
  this.campaign = campaign;
  this.company = company;
  this.getcontentLength = function(){
    getVideoDurationInSeconds(client_DocDir + this.path).then((duration) => {
      console.log(duration)
    })
  };
}

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

function removeDeletedData (){
  var diff = arr_diff(serverFiles.map(obj => obj.path),clientFiles.map(obj => obj.path));
  diff.forEach(item =>{
    console.log(client_DocDir + item);
    fs.removeSync(client_DocDir + item);
  });
}

function removeFilename (path){
  var buffer = path.split('/');
  buffer.pop();
  path = buffer.join('/');
  return path;
}

function format (obj){
  var buffer = obj.path.split('\\');
  while(buffer[0] != 'Companies'){
    buffer.shift();
    }
    return buffer.join('/');
}

function getInfo (obj,i){                   //i: 0 = Error; i: 1 = Filename; i: 2 = media-type; i: 3 = Campaign number; i: 4 = Company Name
  if(0<i<5){
    var buffer = format(obj).split('/');
    return buffer[buffer.length - i];
  }else{
    return "error";
  }

}

var server_DocDir = '\\\\192.168.8.13\\Share\\MFMB\\'
var server_DocDir = server_DocDir.split('\\').join('/');
var client_DocDir = homedir + "\\Documents\\MFMB\\";
var client_DocDir = client_DocDir.split('\\').join('/');

const server = klawSync(server_DocDir, {nodir: true});
var serverFiles = [];
server.forEach(function (obj, index){
  serverFiles[index] = new File(format(obj),obj.stats.birthtime,getInfo(obj,1),getInfo(obj,2),getInfo(obj,3),getInfo(obj,4));
});

serverFiles.forEach(item =>{
  fs.ensureDirSync(client_DocDir + removeFilename(item.path));
  var files = fs.readdirSync(client_DocDir + removeFilename(item.path));
  var length = files.length
  if(!fs.pathExistsSync(client_DocDir + item.path) && length == 0){
    fs.copySync(server_DocDir + item.path,client_DocDir + item.path);
  }
});


const client = klawSync(client_DocDir, {nodir: true});
var clientFiles = [];
client.forEach(function (obj, index){
  clientFiles[index] = new File(format(obj),obj.stats.birthtime,getInfo(obj,1),getInfo(obj,2),getInfo(obj,3),getInfo(obj,4));
});


serverFiles.forEach(item =>{
  if(item.mtime > clientFiles[clientFiles.findIndex(function(file){ return removeFilename(item.path) == removeFilename(file.path)})].mtime){
    console.log(item);
    console.log(clientFiles[clientFiles.findIndex(function(file){ return removeFilename(item.path) == removeFilename(file.path)})]);
    fs.copySync(server_DocDir + item.path, client_DocDir + removeFilename(item.path) + "/buffer-" + item.fname);
    fs.removeSync(client_DocDir + clientFiles[clientFiles.findIndex(function(file){ return removeFilename(item.path) == removeFilename(file.path)})].path);
    fs.renameSync(client_DocDir + removeFilename(item.path) + "/buffer-" + item.fname, client_DocDir + item.path)
  }
});


const client_new = klawSync(client_DocDir, {nodir: true});
var clientFiles = [];
client_new.forEach(function (obj, index){
  clientFiles[index] = new File(format(obj),obj.stats.birthtime,getInfo(obj,1),getInfo(obj,2),getInfo(obj,3),getInfo(obj,4));
});

clientFiles.forEach(item =>{
  if(item.type == 'video'){
    item.getcontentLength();
  }

})

//removeDeletedData();

















/*
function removeDeletedData (server_dir,client_DocDir){
  const client_dir = klawSync(client_DocDir + 'MFMB', {nofile: true});
  var diff = arr_diff(server_dir.map(obj => format(obj)),client_dir.map(obj => format(obj)));
  diff.forEach(element =>{
    console.log(client_DocDir + element);
    fs.removeSync(client_DocDir + element);
  });
}



var server_paths = [];


console.log(client_DocDir);

var server_dir = klawSync('\\\\192.168.8.13\\Share\\MFMB', {nofile: true});


var i =0;
server_dir.forEach(function (item){
  if(item.path.includes('video') || item.path.includes('image')){
      server_paths = format(server_dir[i]);
      console.log(client_DocDir + server_paths);
      fs.ensureDirSync(client_DocDir + server_paths);
  }
    i++;
});

removeDeletedData(server_dir,client_DocDir);

*/


