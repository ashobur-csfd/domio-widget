class AudioPlayerManager {
    constructor() {
        this.initializePlayers();
        this.currentlyPlaying = null;
    }

    initializePlayers() {
        const audioPlayers = document.querySelectorAll("[data-cdx-audio-player]");
        audioPlayers.forEach((player) => this.setupPlayer(player));
    }

    setupPlayer(player) {
        const audio = player.querySelector("audio");
        if (!audio) return;

        const progressbarId = player.getAttribute("data-player-progressbar");
        const progressbar = document.getElementById(progressbarId);

        player.addEventListener("click", () => this.handlePlayerClick(player, audio, progressbar));
        this.setupAudioEventListeners(player, audio, progressbar);
    }

    handlePlayerClick(player, audio, progressbar) {
        if (audio.paused) {
            this.playAudio(player, audio);
        } else {
            this.pauseAudio(player, audio);
        }
    }

    stopOtherPlayers(currentAudio) {
        const audioPlayers = document.querySelectorAll("[data-cdx-audio-player]");
        audioPlayers.forEach((player) => {
            const audio = player.querySelector("audio");
            if (audio && audio !== currentAudio) {
                this.pauseAudio(player, audio);
                audio.currentTime = 0;
            }
        });
    }

    playAudio(player, audio) {
        this.stopOtherPlayers(audio);

        audio.play().catch((error) => {
            console.error("Error playing audio:", error);
            this.handlePlayError();
        });
        player.classList.add("playing");
        this.currentlyPlaying = audio;
    }

    pauseAudio(player, audio) {
        audio.pause();
        player.classList.remove("playing");
        if (this.currentlyPlaying === audio) {
            this.currentlyPlaying = null;
        }
    }

    setupAudioEventListeners(player, audio, progressbar) {
        audio.addEventListener("timeupdate", () => this.updateProgressIndicator(audio, progressbar));
        audio.addEventListener("ended", () => this.handleAudioEnd(player, progressbar));
    }

    updateProgressIndicator(audio, progressbar) {
        if (audio.duration) {
            const percent = (audio.currentTime / audio.duration) * 100;
            if (progressbar) {
                progressbar.style.backgroundSize = `${percent}% 100%`;
            }
        }
    }

    handleAudioEnd(player, progressbar) {
        player.classList.remove("playing");
        progressbar.style.backgroundSize = "0% 100%";
    }

    handlePlayError() {
        window.alert("Error playing this audio.");
    }
}

// Initialize the audio player manager
const audioPlayerManager = new AudioPlayerManager();
