// Simple array of songs (replace with your real songs/URLs)
const songs = [
    {
      title: "稻香",
      artist: "Jay Chow",
      album: "稻香",
      duration: "03:43",
      src: "./audio/稻香.mp3",
      albumArt: "./album_pics/稻香.jpg"
    },

    {
      title: "稻香",
      artist: "Jay Chow",
      album: "稻香",
      duration: "03:43",
      src: "./audio/稻香.mp3",
      albumArt: "./album_pics/稻香.jpg"
    },

    {
      title: "稻香",
      artist: "Jay Chow",
      album: "稻香",
      duration: "03:43",
      src: "./audio/稻香.mp3",
      albumArt: "./album_pics/稻香.jpg"
    },

    {
      title: "稻香",
      artist: "Jay Chow",
      album: "稻香",
      duration: "03:43",
      src: "./audio/稻香.mp3",
      albumArt: "./album_pics/稻香.jpg"
    },

    {
      title: "稻香",
      artist: "Jay Chow",
      album: "稻香",
      duration: "03:43",
      src: "./audio/稻香.mp3",
      albumArt: "./album_pics/稻香.jpg"
    },

    {
      title: "稻香",
      artist: "Jay Chow",
      album: "稻香",
      duration: "03:43",
      src: "./audio/稻香.mp3",
      albumArt: "./album_pics/稻香.jpg"
    },
    
  ];
  
  // DOM Elements
  const songTableBody = document.getElementById("song-table-body");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const progressBar = document.getElementById("progressBar");
  const trackName = document.getElementById("trackName");
  const artistName = document.getElementById("artistName");
  const albumArt = document.getElementById("albumArt");
  
  //==== Create an audio object
  let currentSongIndex = 0;
  let isPlaying = false;
  const audio = new Audio(songs[currentSongIndex].src);
  
  // Populate the table with songs
  function loadSongList() {
    songTableBody.innerHTML = ""; // Clear existing rows
    songs.forEach((song, index) => {
      const row = document.createElement("tr");
      
      // When a row is clicked, play that song
      row.addEventListener("click", () => {
        currentSongIndex = index;
        loadSong(currentSongIndex);
        playAudio();
      });
      
      const titleCell = document.createElement("td");
      titleCell.textContent = song.title;
      
      const artistCell = document.createElement("td");
      artistCell.textContent = song.artist;
      
      const albumCell = document.createElement("td");
      albumCell.textContent = song.album;
      
      const durationCell = document.createElement("td");
      durationCell.textContent = song.duration;
      
      row.appendChild(titleCell);
      row.appendChild(artistCell);
      row.appendChild(albumCell);
      row.appendChild(durationCell);
      
      songTableBody.appendChild(row);
    });
  }
  
  // Load a specific song
  function loadSong(index) {
    const song = songs[index];
    audio.src = song.src;
    trackName.textContent = song.title;
    artistName.textContent = song.artist;
    albumArt.src = song.albumArt;
    progressBar.value = 0;
    isPlaying = false;
    playPauseBtn.textContent = "▶";
  }
  
  // Play the audio
  function playAudio() {
    audio.play();
    isPlaying = true;
    playPauseBtn.textContent = "⏸";
  }
  
  // Pause the audio
  function pauseAudio() {
    audio.pause();
    isPlaying = false;
    playPauseBtn.textContent = "▶";
  }
  
  // Play/Pause toggle
  playPauseBtn.addEventListener("click", () => {
    if (!isPlaying) {
      playAudio();
    } else {
      pauseAudio();
    }
  });
  
  // Next song
  nextBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    playAudio();
  });
  
  // Previous song
  prevBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    playAudio();
  });
  
  // Update progress bar as the song plays
  audio.addEventListener("timeupdate", () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progressPercent || 0;
  });
  
  // Seek when user moves the progress bar
  progressBar.addEventListener("input", () => {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
  });
  
  // Initialize
  window.addEventListener("DOMContentLoaded", () => {
    loadSongList();
    loadSong(currentSongIndex);
  });