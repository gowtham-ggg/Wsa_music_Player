document.addEventListener("DOMContentLoaded", function() {
    const songs = [
        {
            title: "Drive breakbeat",
            duration: "1:49",
            thumbnail: "icons/music-icon.svg",  
            src: "data/track1.mp3",
            artist: "Rocket",
            year: 2023,
        },
        {
            title: "Titanium",
            duration: "1:46",
            thumbnail: "icons/music-icon.svg",  
            src: "data/track2.mp3",
            artist: "AlishBeats",
            year: 2023,
        },
        {
            title: "Science Documentary",
            duration: "2:07",
            thumbnail: "icons/music-icon.svg",  
            src: "data/track3.mp3",
            artist: "Lexin_Music",
            year: 2023,
        },
        {
            title: "Once In Paris",
            duration: "2:12",
            thumbnail: "icons/music-icon.svg",  
            src: "data/track4.mp3",
            artist: "Pumpupthemind",
            year: 2023,
        },
    ];

    // Access elements 
    const songList = document.getElementById("song-list");
    const thumbnail = document.getElementById("thumbnail");
    const playPauseBtn = document.getElementById("play-pause");
    const restartBtn = document.getElementById("restart");
    const stopBtn = document.getElementById("stop");
    const progress = document.getElementById("progress");
    const currentTime = document.getElementById("current-time");
    const timeLeft = document.getElementById("time-left");
    const volumeControl = document.getElementById("volume");
    const trackTitle = document.getElementById("player-title");
    const trackDescription = document.getElementById("player-description");

    let currentSongIndex = 0;
    let audio = new Audio();

    loadSong(currentSongIndex);

    const updatePlayPauseButton = (paused) => {
        playPauseBtn.innerHTML = paused
            ? `<img src="icons/play-button.svg">`
            : `<img src="icons/pause-button.svg">`;
    }

    function playPause(){
        if(audio.paused){
            audio.play();
            updatePlayPauseButton(true);  // when playing, show play button
        }
        else{
            audio.pause();
            updatePlayPauseButton(false);  // when paused, show pause button
        }
    }

    playPauseBtn.addEventListener("click", playPause);

    function updateCurrentSongHighlight(){
        const songItems = document.querySelectorAll(".item-container");
        songItems.forEach((element) => {
            element.classList.remove("current-song");
        });

        const currentSongElement = document.querySelector(`.item-container[data-index="${currentSongIndex}"]`);
        if(currentSongElement) {
            currentSongElement.classList.add("current-song");
        }
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    }

    function loadSong(index) {
        const currentSong = songs[index];  // Corrected to use "songs"
        audio.src = currentSong.src;
        thumbnail.src = currentSong.thumbnail;
        trackTitle.textContent = currentSong.title;
        trackDescription.textContent = currentSong.artist;
        timeLeft.textContent = formatTime(0);  // Reset the displayed current time
        currentTime.textContent = formatTime(0); // Reset time left as well

        audio.addEventListener("loadedmetadata", function() {
            progress.max = audio.duration;
            timeLeft.textContent = formatTime(audio.duration);
        });

        audio.addEventListener("timeupdate", function() {
            currentTime.textContent = formatTime(audio.currentTime);
            const remainingTime = audio.duration - audio.currentTime;
            timeLeft.textContent = formatTime(remainingTime);
            progress.value = audio.currentTime;
        });

        updateCurrentSongHighlight();
    }

    function renderSongList(){
        songList.innerHTML = "";
        songs.forEach((song, index) => {
            const itemContainer = document.createElement("div");
            const itemImg = document.createElement("div");
            const imgElement = document.createElement("img");
            const trackDataContainer = document.createElement("div");
            const trackTitle = document.createElement("p");
            const trackDescription = document.createElement("p");
            const trackDurationContainer = document.createElement("div");
            const trackDuration = document.createElement("p");
            const trackYear = document.createElement("p");

            itemContainer.classList.add("item-container");
            itemContainer.setAttribute("data-index", index); //his line sets a unique data-index attribute on each itemContainer. For example, if index is 2, it would look like:
            //<div class="item-container" data-index="2"></div>
            itemImg.classList.add("item-img");
            trackDataContainer.classList.add("track-data-container");
            trackTitle.classList.add("track-list");
            trackDescription.classList.add("track-artist");
            trackDurationContainer.classList.add("track-duration-container");
            trackDuration.classList.add("track-duration");
            trackYear.classList.add("track-year");

            itemContainer.addEventListener("click", () => {
                currentSongIndex = index;
                loadSong(currentSongIndex);
                audio.play();
                updatePlayPauseButton(true); 
            });

            imgElement.src = "icons/outline.svg";
            trackTitle.textContent = song.title;
            trackDescription.textContent = song.artist || "Unknown artist";
            trackDuration.textContent = song.duration;
            trackYear.textContent = song.year || "Unknown Year";

            itemImg.appendChild(imgElement);
            trackDataContainer.appendChild(trackTitle);
            trackDataContainer.appendChild(trackDescription);
            trackDurationContainer.appendChild(trackDuration);
            trackDurationContainer.appendChild(trackYear);

            itemContainer.appendChild(itemImg);
            itemContainer.appendChild(trackDataContainer);
            itemContainer.appendChild(trackDurationContainer);

            songList.appendChild(itemContainer);
        });
    }

    renderSongList();
});
