document.addEventListener("DOMContentLoaded", function(){

    const songs = [
        {
            title: "Drive breakbeat",
            duration: "1:49",
            thumbnail: "data/preview-img-1.jpg",  
            src: "data/track1.mp3",
            artist: "Rocket",
            year: 2023,
            isverified:true,       //added some properties
            followers : 1397979,
            monthlyListener: 203040,
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia itaque ex, sequi iste vero dignissimos eligendi excepturi quas delectus mollitia eaque commodi harum laborum velit, et neque animi voluptatum error."
        },
        {
            title: "Titanium",
            duration: "1:46",
            thumbnail: "data/preview-img-2.jpg",  
            src: "data/track2.mp3",
            artist: "AlishBeats",
            year: 2023,
            isverified:true,       //added some properties
            followers : 13849403,
            monthlyListener: 201242,
            description: "this song is sung by alishbeats "
        },
        {
            title: "Science Documentary",
            duration: "2:07",
            thumbnail: "data/preview-img-3.jpg",  
            src: "data/track3.mp3",
            artist: "Lexin_Music",
            year: 2023,
            isverified:false,       //added some properties
            followers : 1397979,
            monthlyListener: 203040,
            description: "this song is ung by anirudh"
        },
        {
            title: "Once In Paris",
            duration: "2:12",
            thumbnail: "data/preview-img-4.jpg",  
            src: "data/track4.mp3",
            artist: "Pumpupthemind",
            year: 2023,
            isverified:true,       //added some properties
            followers : 1397979,
            monthlyListener: 203040,
            description: "this song is ung by anirudh"
        },
    ];
   
    let audio = new Audio();
   
    const songList = document.getElementById("song-list");
    const thumbnail = document.getElementById("thumbnail");
    const trackTitle = document.getElementById("player-title");
    const trackDescription = document.getElementById("player-description");
    const progress = document.getElementById("progress");
    const currTime = document.getElementById("current-time");
    const leftTime = document.getElementById("time-left");
    const playPauseBtn = document.getElementById("play-pause");
    const volumeControl = document.getElementById("volume"); 
    //level 2 new buttons
    const shuffleBtn = document.getElementById("shuffle");
    const shuffleImg = document.getElementById("shuffle-img");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");
    const loopImg = document.getElementById("loop-img");
    const repeatBtn = document.getElementById("repeat");
    const customDropdown = document.getElementById("custom-dropdown");
    const dropDownItems = document.querySelectorAll(".custom-dropdown-item");
    const thumbnailContainer =document.getElementById("thumbnail-container");  //acessing thumnail id conatiner for sisplay thumnail images


    playPauseBtn.addEventListener("click", playPause);
    progress.addEventListener("input", function(){
        audio.currentTime = progress.value;
    });
    volumeControl.addEventListener("input", updateVolume);
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("play", () => updatePlayPauseButton(true));
    audio.addEventListener("pause", () => updatePlayPauseButton(false));
    // ///////////////////////Level 2 adding the event listener
    prevBtn.addEventListener("click", prevSong);
    nextBtn.addEventListener("click", ()=>nextSong(true));
    audio.addEventListener("ended", ()=> nextSong(false));
    shuffleBtn.addEventListener("click", toggleShuffleMode);
    repeatBtn.addEventListener("click", toggleRepeatMode);
    customDropdown.addEventListener("click", toggleDropDown);

    //add the event for preview details
    thumbnailContainer.addEventListener("click",openPreviewModal);



    let currentSongIndex = 0;
    loadSong(currentSongIndex);

    ///////////level 2
    let isShufflemode = true;
    let isRepeatMode = false;

    const updatePlayPauseButton = (paused) => {
        playPauseBtn.innerHTML = paused
            ? `<img src="icons/pause-button.svg">`
            : `<img src="icons/play-button.svg">`;
    };

    function playPause(){
        if(audio.paused){
            audio.play();
            updatePlayPauseButton(audio.paused);
        } else {
            audio.pause();
            updatePlayPauseButton(audio.paused);
        }
    }

    function loadSong(index){
        const currentSong = songs[index];
        audio.src = currentSong.src;
        thumbnail.src = currentSong.thumbnail;
        trackTitle.innerText = currentSong.title;
        trackDescription.innerText = currentSong.artist;
        leftTime.textContent = "00:00";
        audio.addEventListener("loadedmetadata", function(){
            progress.max = audio.duration;
        });
        updateCurrentSongHighlight(index);
    }
    

    //level 2////////////////////////////////
    function prevSong(){
        currentSongIndex = currentSongIndex -1;
        loadSong(currentSongIndex);
        audio.play();
    }

    function nextSong(isBtnClicked){
        if(isShufflemode  || isBtnClicked ){
            currentSongIndex = currentSongIndex + 1;
            loadSong(currentSongIndex);
            audio.play();
        }
        else{
            audio.currentTime =0;
            progress.value =0;
            audio.play();
        }
    }

    function toggleShuffleMode(){
        isShufflemode = true;
        isRepeatMode =false;
        shuffleImg.src="/icons/shuffle-highlighted.svg";
        loopImg.src = "/icons/loop.svg";
        updateButtonState(shuffleBtn, isShufflemode);
    }
    function toggleRepeatMode(){
        isShufflemode =false;
        isRepeatMode = true;
        shuffleImg.src ="/icons/shuffle.svg";
        loopImg.src = "/icons/loop-highlighted.svg";
        updateButtonState(repeatBtn, isRepeatMode);
    }
    function updateButtonState(button, isActive){
        if(isActive){
            button.classList.add("selected");
        }
        else{
            button.classList.remove("selected");
        }
    }

    function toggleDropDown(){
        if( document.getElementById("dropdown-list-items").style.display === "block"){
            document.getElementById("dropdown-list-items").style ="display: none";
        }
        else{
            document.getElementById("dropdown-list-items").style= "display : block";
        }
    }

    dropDownItems.forEach(function (item) {
        item.addEventListener("click", function() {
            const selectedVal = this.getAttribute("data-value");
            audio.playbackRate = parseFloat(selectedVal);
    
            dropDownItems.forEach(function(item) {
                item.classList.remove("selected-speed");
            });
            this.classList.add("selected-speed")
        });
    });
    

   

    function updateVolume(){
        audio.volume = volumeControl.value;
    }

    function updateProgress(){
        const currentTime = audio.currentTime;
        const duration = audio.duration;
        const remainingTime = duration - currentTime;

        progress.value = currentTime;
        currTime.textContent = formatTime(currentTime);
        leftTime.textContent = `-${remainingTime >= 0 ? formatTime(remainingTime) : "00:00"}`;
    }

    function formatTime(time){
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${padZero(minutes)}:${padZero(seconds)}`;
    }

    function padZero(number){
        return (number < 10 ? "0" : "") + number;
    }

    function updateCurrentSongHighlight(index){
        const songItems = document.querySelectorAll(".item-container");
        songItems.forEach((element) => {
            element.classList.remove("current-song");
        });

        const currentSongElement = document.querySelector(`.item-container[data-index="${index}"]`);
        if (currentSongElement) {
            currentSongElement.classList.add("current-song");
        }
    }

    function renderSongList(){
        songList.innerHTML = "";
        songs.forEach((song, index) => {
            const itemContainer = document.createElement("div");
            //////lvl thumnail container
            const thumnailImg = document.createElement("img");
            const itemImg = document.createElement("div");
            const imgElement = document.createElement("img");
            const trackDataContainer = document.createElement("div");
            const trackTitle = document.createElement("p");
            const trackDescription = document.createElement("p");
            const trackDurationContainer = document.createElement("div");
            const trackDuration = document.createElement("p");
            const trackYear = document.createElement("p");

            itemContainer.classList.add("item-container");
            //lvl 2 added class name here
            thumnailImg.classList.add("list-thumbnail");
            itemContainer.setAttribute("data-index", index);
            itemImg.classList.add("item-img");
            trackDataContainer.classList.add("track-data-container");
            trackTitle.classList.add("track-title");
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
            //lvl2 added
            thumnailImg.src = song.thumbnail;
            trackTitle.textContent = song.title;
            trackDescription.textContent = song.artist || "Unknown artist";
            trackDuration.textContent = song.duration;
            trackYear.textContent = song.year || "Unknown Year";

            itemImg.appendChild(imgElement);
            //lvl2
            itemImg.appendChild(thumnailImg);
            trackDataContainer.appendChild(trackTitle);
            trackDataContainer.appendChild(trackDescription);
            trackDurationContainer.appendChild(trackDuration);
            trackDurationContainer.appendChild(trackYear);

            itemContainer.appendChild(itemImg);
            itemContainer.appendChild(trackDataContainer);
            itemContainer.appendChild(trackDurationContainer);

            songList.appendChild(itemContainer);
        });

        updateCurrentSongHighlight(currentSongIndex);
    }

    renderSongList();

    //modal js
    //acessing modal elemnts
    const previewModal = document.getElementById("preview-modal");
    const closeModal = document.getElementById("close-modal");
    const previewImg = document.getElementById("preview-img");
    const previewDescription = document.getElementById("preview-description");
    const previewArtist = document.getElementById("preview-artist");
    const followCount = document.getElementById("follow-count");
    const listenerCount = document.getElementById("listener-count");

    function openPreviewModal(){
        const currentTrack = songs[currentSongIndex];
        previewModal.style.display = "flex";
        previewImg.src = currentTrack.thumbnail;
        previewArtist.innerText = currentTrack.artist;
        followCount.innerText =currentTrack.followers;
        listenerCount.innerText =currentTrack.monthlyListener;
        previewDescription.innerText = currentTrack.description;
        if(!currentTrack.isverified){
            document.getElementById("verified").style.display="none";

        }
        else{
            document.getElementById("verified").style.display = "flex";
        }
    }
    closeModal.addEventListener("click", closePreviewModal);
    function closePreviewModal(){
        previewModal.style.display = "none"
    }
    window.addEventListener("click", function (event){
        if(event.target === previewModal){
            closePreviewModal();
        }
    });
        
    
});

