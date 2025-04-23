// document.body.addEventListener('click', () => {
//   const audio = document.getElementById('background-music');
//   audio.volume = 0.2; // Set volume to 50%
//   audio.muted = false; // Unmute the audio
//   audio.play().catch(err => console.error("Error playing audio:", err));
// });

document.addEventListener("DOMContentLoaded", function () {
  // Select the divs where the header and footer will be inserted
  const headerDiv = document.getElementById("header");
  const footerDiv = document.getElementById("footer");

  // Fetch and insert the header HTML
  fetch("header.html")
    .then((response) => response.text())
    .then((data) => {
      headerDiv.innerHTML = data;

      // After the header is inserted, initialize the audio
      initializeAudio();
    })
    .catch((error) => {
      console.error("Error loading header:", error);
    });

  // Fetch and insert the footer HTML
  fetch("footer.html")
    .then((response) => response.text())
    .then((data) => {
      footerDiv.innerHTML = data;
    })
    .catch((error) => {
      console.error("Error loading footer:", error);
    });
});

document.addEventListener("DOMContentLoaded", function () {
  // Ensure audio is available before attempting to play it
  const audio = document.getElementById("background-music");
  const playButton = document.getElementById("play-music");

  // Set the volume
  audio.volume = 0.1;

  // Attempt to play the audio on page load
  if (audio.paused) {
    try {
      // Try to play the audio
      audio.play().catch(function (err) {
        // If autoplay is blocked, show the play button
        console.log("Autoplay is blocked, showing play button.");
        playButton.style.display = "inline";
      });
    } catch (err) {
      // Catch any other errors during autoplay
      console.error("Error playing audio:", err);
    }
  }

  // If autoplay is blocked, allow the user to manually start the audio
  playButton.onclick = function () {
    audio.play().catch(function (err) {
      console.error("Error playing audio:", err);
    });
    playButton.style.display = "none"; // Hide the play button after it's clicked
  };

  // Ensure music continues after it ends
  audio.onended = function () {
    audio.play(); // Restart the song when it ends
  };
});

// Ensure the audio continues playing across pages
window.addEventListener("beforeunload", function () {
  const audio = document.getElementById("background-music");
  if (audio && !audio.paused) {
    localStorage.setItem("audioPlaying", true);
  }
});

// When the page is loaded, check if the music should continue playing
window.addEventListener("load", function () {
  const audio = document.getElementById("background-music");
  const wasAudioPlaying = localStorage.getItem("audioPlaying");

  if (audio && wasAudioPlaying) {
    audio.play().catch(function (err) {
      console.error("Error playing audio:", err);
    });
  }
});
