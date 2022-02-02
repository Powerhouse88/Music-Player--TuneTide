const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEL = document.getElementById('current-time');
const durationEL = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// MUSIC
const songs = [
  {
      name: "s1",
      displayName: 'Bekhayali',
      artist: 'Sachet Tandon',
  },
  {
     name: "s2",
     displayName: 'Bewafa',
     artist: 'Imran Khan',
  },
  {
     name: "s3",
     displayName: 'Brown Munde',
     artist: 'A.P Dhillon',
  },
  {
     name: "s4",
     displayName: 'Excuses',
     artist: 'A.P Dhillon',
  },
  {
     name: "s5",
     displayName: 'High Heels',
     artist: ' Yo Yo Honey Singh',
  },

  {
     name: "s6",
     displayName: 'Insane',
     artist: 'A.P Dhillon',
  },
  {
     name: "s7",
     displayName: 'Jingle',
     artist: ' Yo Yo Honey Singh',
  },
  {
     name: "s8",
     displayName: 'Lover',
     artist: ' Diljit Dosanjh',
  },
  {
     name: "s9",
     displayName: 'Naah',
     artist: 'Hardy Sandhu',
  },
  {
     name: "s10",
     displayName: 'Japdi',
     artist: ' Yo Yo Honey Singh',
  },
  {
     name: "s11",
     displayName: 'Titlian-2',
     artist: ' Hardy Sandhu',
  },
  {
     name: "s12",
     displayName: 'Waalian',
     artist: 'Haarnoor',
  },
  {
     name: "s13",
     displayName: 'Mere Sohneya',
     artist: 'parampara thakur ',
  },
  {
     name: "s14",
     displayName: 'Hae Mera Dil',
     artist: ' Yo Yo Honey Singh',
  },
  {
     name: "s15",
     displayName: 'Blue Eyes',
     artist: ' Yo Yo Honey Singh',
  },
  {
    name: "s16",
    displayName: 'Kitna chahane lage',
    artist: 'Arijit Singh',
  },
  {
     name: "s17",
     displayName: 'Bhaag DK Bose',
     artist: 'Ram Sampath',
  },
  {
   name: "s18",
   displayName: '12 Saal',
   artist: 'Bilal Saeed',
  },
  {
   name: "s19",
   displayName: 'Birthday Bash',
   artist: 'Yo Yo Honey Singh',
  },
  {
   name: "s20",
   displayName: 'Brown Rang',
   artist: 'Yo Yo Honey Singh',
  },
  {
   name: "s21",
   displayName: 'Manali Trance',
   artist: 'Yo Yo Honey Singh',
  },
  


];

//CHECK IF PLAYING
let isPlaying = false;


//PLAY
function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title','Pause');
    music.play();
}
// PAUSE
function pauseSong(){
    isPlaying=false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title','Play');
    music.pause();
}

//PLAY OR PAUSE EVENT LISTENER
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

//UPDATE DOM
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// current song
let songIndex = 0;

// Previous song
function prevSong(){
    songIndex--;
    if(songIndex<0){
        songIndex = songs.length -1;
    }
   
    loadSong(songs[songIndex]); 
    playSong();
}

// Next song
function nextSong(){
    songIndex++;
    if(songIndex > songs.length - 1){
        songIndex = 0;
    }
    
    loadSong(songs[songIndex]); 
    playSong();
}

// ON LOAD SELECT FIRST SONG
loadSong(songs[songIndex]); 

//UPDATE PROGRESS BAR AND TIME
function updateProgressBar(e){
  if(isPlaying){
      const {duration,currentTime} = e.srcElement;
      
      // update progress bar  width
      const progressPercent=( currentTime / duration) * 100;
      progress.style.width = `${progressPercent}%`;
       //   Calculate display of duration
     const durationMinutes = Math.floor(duration / 60);
     let durationSeconds =  Math.floor(duration % 60);
     if(durationSeconds<10){
         durationSeconds = `0${durationSeconds}`;
     }
   
      // DELAY SWITCHING DURATION ELEMNT TO AVOID NaN
    if(durationSeconds){
        durationEL.textContent = `${durationMinutes}:${durationSeconds}`;
    }
     //   Calculate display of duration
     const currentMinutes = Math.floor(currentTime / 60);
     
     let currentSeconds =  Math.floor(currentTime % 60);
     if(currentSeconds<10){
        currentSeconds = `0${currentSeconds}`;
     }
     currentTimeEL.textContent = `${currentMinutes}:${currentSeconds}`;

  }
}

// SET PROGRESS BAR
function setProgressBar(e){

const width = this.clientWidth;
const clickX = e.offsetX;
const {duration}=music;
music.currentTime =  (clickX / width) * duration;
}
// EVENT LISTENERS
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('ended',nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click',setProgressBar);
