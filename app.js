let progress = document.getElementById("progressbar");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
let coverImg = document.getElementById("cover-img");
let songTitle = document.getElementById("song-title");
let songArtist = document.getElementById("song-artist");
let songList = document.getElementById("song-list");

let songs = [
    { title: "Maroon Color Sadiya", artist: "Nirahua Lal Yadav", src: "songs/1.mp3", cover: "covers/1.jpg" },
    { title: "One Love", artist: "Shubh", src: "songs/2.mp3", cover: "covers/2.jpg" },
    { title: "Morni Banke", artist: "Guru Randhawa", src: "songs/3.mp3", cover: "covers/3.jpg" },
    { title: "Main Tera Boyfriend", artist: "Meet Bros", src: "songs/4.mp3", cover: "covers/4.jpg" },
    { title: "Jeena Jeena", artist: "Atif Aslam", src: "songs/5.mp3", cover: "covers/5.jpg" },
    { title: "52 Gaj ka Daman", artist: "Renuka Panwar", src: "songs/6.mp3", cover: "covers/6.jpg" },
    { title: "Never Fold", artist: "Sidhu Moosewala", src: "songs/7.mp3", cover: "covers/7.jpg" },
    { title: "Blue Eyes", artist: "Honey Singh", src: "songs/8.mp3", cover: "covers/8.jpg" },
    { title: "Hindi Song", artist: "Arijit Singh", src: "songs/9.mp3", cover: "covers/9.jpg" },
    { title: "Bhool Bhulaiyaa 3", artist: "Pitbull, Diljit Dosanjh, Neeraj Shridhar", src: "songs/10.mp3", cover: "covers/10.jpg" }
];

let currentSongIndex = 0;

song.onloadedmetadata = function() {
    progress.max = song.duration;
    progress.value = song.currentTime;
}

function playPause() {
    if (ctrlIcon.classList.contains("fa-pause")) {
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    } else {
        song.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
    }
}

if (song.play()) {
    setInterval(() => {
        progress.value = song.currentTime;
    }, 500);
}

progress.onchange = function() {
    song.play();
    song.currentTime = progress.value;
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
}

function loadSong(index) {
    song.src = songs[index].src;
    coverImg.src = songs[index].cover;
    songTitle.textContent = songs[index].title;
    songArtist.textContent = songs[index].artist;
    song.play();
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
}

function toggleSongList() {
    if (songList.style.display === "none" || songList.style.display === "") {
        songList.style.display = "block";
        populateSongList();
    } else {
        songList.style.display = "none";
    }
}

function populateSongList() {
    let ul = document.createElement("ul");
    songs.forEach((song, index) => {
        let li = document.createElement("li");
        li.textContent = song.title;
        li.onclick = () => {
            loadSong(index);
            songList.style.display = "none";
        };
        ul.appendChild(li);
    });
    songList.innerHTML = "";
    songList.appendChild(ul);
}

// Load the first song initially
loadSong(currentSongIndex);
