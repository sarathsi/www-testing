"use strict";

var LOG = true;
function debugprint(msg) {
 if(LOG === true) {
  var timestamp = '[' + Date.now() + ' ms] ';
  //console.log(msg);
  document.getElementById("log").innerHTML = document.getElementById("log").innerHTML + "<br>" + timestamp + ": " + msg;
 }
}
function logEvent(event) {
 debugprint(event.type + " ");
}

console.logCopy = console.log.bind(console);
console.log = function() {
 if (arguments.length) {
  var timestamp = '[' + Date.now() + ' ms] ';
  this.logCopy(timestamp, arguments);
 }
 //var currentDate = '[' + new Date().toUTCString() + '] ';
};

//===================================

function startup() {

 var audio1 = document.getElementById("audio1");

 audio1.addEventListener("play", logEvent); // media is ready to start playing
 audio1.addEventListener("playing", logEvent); // media actually has started playing
 audio1.addEventListener("pause", logEvent);
 audio1.addEventListener("ended", logEvent); // media has reach the end

 audio1.addEventListener("canplay", logEvent);
 // can play through the audio/video without stopping for buffering
 audio1.addEventListener("canplaythrough", logEvent);

 // error occurred during the loading of an audio/video
 audio1.addEventListener("error", logEvent);

 audio1.addEventListener("durationchange", logEvent);
 audio1.addEventListener("ratechange", logEvent);
 audio1.addEventListener("volumechange", logEvent);

 audio1.addEventListener("loadstart", logEvent); // just as the file begins to load before anything is actually loaded
 audio1.addEventListener("loadedmetadata", logEvent); // meta data (like dimensions and duration) are loaded
 audio1.addEventListener("loadeddata", logEvent); // media data is loaded


 // browser is in the process of getting the media data
 //audio1.addEventListener("progress", logEvent); 
 audio1.addEventListener('progress', function(event) {
  logEvent(event);
  var ranges = [];
  for(var i = 0; i < audio1.buffered.length; i ++) {
    ranges.push([
      audio1.buffered.start(i),
      audio1.buffered.end(i)
      ]);
    debugprint(audio1.buffered.start(i) + ", " + audio1.buffered.end(i));
  }
 }, false);

 // fetching the media data is stopped before it is completely loaded for whatever reason
 audio1.addEventListener("suspend", logEvent);

 // media has paused but is expected to resume (like when the media pauses to buffer more data)
 audio1.addEventListener("waiting", logEvent);

 // browser is unable to fetch the media data for whatever reason
 audio1.addEventListener("stalled", logEvent);

 var btnLoad = document.getElementById("btnLoad");
 var btnPlay = document.getElementById("btnPlay");
 var btnPause = document.getElementById("btnPause");
 var btnClearlog = document.getElementById("btnClearlog");

 btnLoad.onclick = function() {
  debugprint("load()");
  audio1.load();
 };

 btnPlay.onclick = function() {
  debugprint("play()");
  audio1.play();
 };

 btnPause.onclick = function() {
  debugprint("pause()");
  audio1.pause();
 };

 btnClearlog.onclick = function() {
  document.getElementById("log").innerHTML = "";
 };

 debugprint("startup() done");
}

document.addEventListener( 'DOMContentLoaded', startup);


