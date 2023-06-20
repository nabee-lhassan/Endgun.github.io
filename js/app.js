




//*********************************** */ song play first controller start 

let hero_btn = document.querySelector('.hero-btn')


let div_progress = document.querySelector('#div-progress')

function play(){

  document.querySelector('#first_play').play()
  document.querySelector('#first-play-btn').classList.add('d-none');
  document.querySelector('#first-play-btn').classList.remove('d-block');
  document.querySelector('#first-pause-btn').classList.add('d-block');
  document.querySelector('#first-pause-btn').classList.remove('d-none');
  hero_btn.setAttribute('style', 'display:none;')
  
 }

function pause(){
  document.querySelector('#first_play').pause()
  document.querySelector('#first-play-btn').classList.remove('d-none');
  document.querySelector('#first-play-btn').classList.add('d-block');
  document.querySelector('#first-pause-btn').classList.remove('d-block');
  document.querySelector('#first-pause-btn').classList.add('d-none');
  hero_btn.setAttribute('style', 'display:block;')
 }

 function Forward(){
  document.querySelector('#first_play').currentTime += 10;
 }
 
 function Backward(){
  document.querySelector('#first_play').currentTime += -10;
 }
 
 function reload(){
  document.querySelector('#first_play').load()
  document.querySelector('#first_play').play()
  document.querySelector('#first-play-btn').classList.remove('d-block');
  document.querySelector('#first-play-btn').classList.add('d-none');
  document.querySelector('#first-pause-btn').classList.remove('d-none');
  document.querySelector('#first-pause-btn').classList.add('d-block');
  
 

 }


 

 let audio_player = document.querySelector('#first_play')

 

 
 let first_duration = document.querySelector('#first-duration')
 let first_currentTime = document.querySelector('#first-currentTime')
 
 audio_player.addEventListener('timeupdate', function(e){

// converting currentTime in minutes and second

  let min_currentTime = Math.floor(audio_player.currentTime / 60);
  let sec_currentTime = Math.floor(audio_player.currentTime % 60);
  
  

  let total_currentTime = `${min_currentTime}: ${sec_currentTime}`

  // console.log(total_currentTime);

  // converting duration in minutes and second

  let min_duration = Math.floor(audio_player.duration / 60);
  let sec_duration = Math.floor(audio_player.duration % 60);
  
  

  let total_duration = `${min_duration}: ${sec_duration}`

  // console.log(total_duration);

  first_currentTime.innerHTML = total_currentTime;

  
  first_duration.innerHTML = total_duration ; 
 

  div_progress.style.width = "0%"
  
  
div_progress.style.width = audio_player.currentTime*100 / audio_player.duration +"%";


 })

 let div_progressbar_main = document.querySelector('.div-progressbar-main');

 div_progressbar_main.addEventListener('click',function(e){

audio_player.currentTime = ((e.offsetX/div_progressbar_main.offsetWidth)* audio_player.duration)

 })



 
     
     
 // ******************************** song play first controller end    

     
     
     
     function createTrackItem(index,name,duration){
    var trackItem = document.createElement('div');
    trackItem.setAttribute("class", "playlist-track-ctn");
    trackItem.setAttribute("id", "ptc-"+index);
    trackItem.setAttribute("data-index", index);
    document.querySelector(".playlist-ctn").appendChild(trackItem);

    var playBtnItem = document.createElement('div');
    playBtnItem.setAttribute("class", "playlist-btn-play");
    playBtnItem.setAttribute("id", "pbp-"+index);
    document.querySelector("#ptc-"+index).appendChild(playBtnItem);

    var btnImg = document.createElement('i');
    btnImg.setAttribute("class", "fas fa-play");
    btnImg.setAttribute("height", "40");
    btnImg.setAttribute("width", "40");
    btnImg.setAttribute("id", "p-img-"+index);
    document.querySelector("#pbp-"+index).appendChild(btnImg);

    var trackInfoItem = document.createElement('div');
    trackInfoItem.setAttribute("class", "playlist-info-track");
    trackInfoItem.innerHTML = name
    document.querySelector("#ptc-"+index).appendChild(trackInfoItem);

    var trackDurationItem = document.createElement('div');
    trackDurationItem.setAttribute("class", "playlist-duration");
    trackDurationItem.innerHTML = duration
    document.querySelector("#ptc-"+index).appendChild(trackDurationItem);
  }

  var listAudio = [
    {
      name:"Tyrone Stephney - Find God",
      file:"https://codelabs.live/new/Find%20GOD.mp3",
      duration:"08:47"
    },
    {
      name:"Tyrone Stephney - I'M  I N  L U V",
      file:"https://codelabs.live/new/I'M%20%20I%20N%20%20L%20U%20V.mp3",
      duration:"05:53"
    },
    {
      name:"Tyrone Stephney - Freedom3",
      file:"https://codelabs.live/new/freedom3%20(1).mp3",
      duration:"00:27"
    }
  ]

  for (var i = 0; i < listAudio.length; i++) {
      createTrackItem(i,listAudio[i].name,listAudio[i].duration);
  }
  var indexAudio = 0;

  function loadNewTrack(index){
    var player = document.querySelector('#source-audio')
    player.src = listAudio[index].file
    document.querySelector('.title').innerHTML = listAudio[index].name
    this.currentAudio = document.getElementById("myAudio");
    this.currentAudio.load()
    this.toggleAudio()
    this.updateStylePlaylist(this.indexAudio,index)
    this.indexAudio = index;
  }

  var playListItems = document.querySelectorAll(".playlist-track-ctn");

  for (let i = 0; i < playListItems.length; i++){
    playListItems[i].addEventListener("click", getClickedElement.bind(this));
  }

  function getClickedElement(event) {
    for (let i = 0; i < playListItems.length; i++){
      if(playListItems[i] == event.target){
        var clickedIndex = event.target.getAttribute("data-index")
        if (clickedIndex == this.indexAudio ) { // alert('Same audio');
            this.toggleAudio()
        }else{
            loadNewTrack(clickedIndex);
        }
      }
    }
  }

  document.querySelector('#source-audio').src = listAudio[indexAudio].file
  document.querySelector('.title').innerHTML = listAudio[indexAudio].name


  var currentAudio = document.getElementById("myAudio");

  currentAudio.load()
  
  currentAudio.onloadedmetadata = function() {
        document.getElementsByClassName('duration')[0].innerHTML = this.getMinutes(this.currentAudio.duration)
  }.bind(this);

  var interval1;

  function toggleAudio() {

    if (this.currentAudio.paused) {
      document.querySelector('#icon-play').style.display = 'none';
      document.querySelector('#icon-pause').style.display = 'block';
      document.querySelector('#ptc-'+this.indexAudio).classList.add("active-track");
      this.playToPause(this.indexAudio)
      this.currentAudio.play();
    }else{
      document.querySelector('#icon-play').style.display = 'block';
      document.querySelector('#icon-pause').style.display = 'none';
      this.pauseToPlay(this.indexAudio)
      this.currentAudio.pause();
    }
  }

  function pauseAudio() {
    this.currentAudio.pause();
    clearInterval(interval1);
  }

  var timer = document.getElementsByClassName('timer')[0]

  var barProgress = document.getElementById("myBar");


  var width = 0;

  function onTimeUpdate() {
    var t = this.currentAudio.currentTime
    timer.innerHTML = this.getMinutes(t);
    this.setBarProgress();
    if (this.currentAudio.ended) {
      document.querySelector('#icon-play').style.display = 'block';
      document.querySelector('#icon-pause').style.display = 'none';
      this.pauseToPlay(this.indexAudio)
      if (this.indexAudio < listAudio.length-1) {
          var index = parseInt(this.indexAudio)+1
          this.loadNewTrack(index)
      }
    }
  }


  function setBarProgress(){
    var progress = (this.currentAudio.currentTime/this.currentAudio.duration)*100;
    document.getElementById("myBar").style.width = progress + "%";
  }


  function getMinutes(t){
    var min = parseInt(parseInt(t)/60);
    var sec = parseInt(t%60);
    if (sec < 10) {
      sec = "0"+sec
    }
    if (min < 10) {
      min = "0"+min
    }
    return min+":"+sec
  }

  var progressbar = document.querySelector('#myProgress')
  progressbar.addEventListener("click", seek.bind(this));


  function seek(event) {
    var percent = event.offsetX / progressbar.offsetWidth;
    this.currentAudio.currentTime = percent * this.currentAudio.duration;
    barProgress.style.width = percent*100 + "%";
  }

  function forward(){
    this.currentAudio.currentTime = this.currentAudio.currentTime + 5
    this.setBarProgress();
  }

  function rewind(){
    this.currentAudio.currentTime = this.currentAudio.currentTime - 5
    this.setBarProgress();
  }


  function next(){
    if (this.indexAudio <listAudio.length-1) {
        var oldIndex = this.indexAudio
        this.indexAudio++;
        updateStylePlaylist(oldIndex,this.indexAudio)
        this.loadNewTrack(this.indexAudio);
    }
  }

  function previous(){
    if (this.indexAudio>0) {
        var oldIndex = this.indexAudio
        this.indexAudio--;
        updateStylePlaylist(oldIndex,this.indexAudio)
        this.loadNewTrack(this.indexAudio);
    }
  }

  function updateStylePlaylist(oldIndex,newIndex){
    document.querySelector('#ptc-'+oldIndex).classList.remove("active-track");
    this.pauseToPlay(oldIndex);
    document.querySelector('#ptc-'+newIndex).classList.add("active-track");
    this.playToPause(newIndex)
  }

  function playToPause(index){
    var ele = document.querySelector('#p-img-'+index)
    ele.classList.remove("fa-play");
    ele.classList.add("fa-pause");
  }

  function pauseToPlay(index){
    var ele = document.querySelector('#p-img-'+index)
    ele.classList.remove("fa-pause");
    ele.classList.add("fa-play");
  }


  function toggleMute(){
    var btnMute = document.querySelector('#toggleMute');
    var volUp = document.querySelector('#icon-vol-up');
    var volMute = document.querySelector('#icon-vol-mute');
    if (this.currentAudio.muted == false) {
       this.currentAudio.muted = true
       volUp.style.display = "none"
       volMute.style.display = "block"
    }else{
      this.currentAudio.muted = false
      volMute.style.display = "none"
      volUp.style.display = "block"
    }
  }







