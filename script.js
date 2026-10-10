const romanticNotes = [
  "A veces las palabras faltan, por eso preparé este espacio...",
  "Hay cosas que solo cobran sentido cuando se escuchan con calma.",
  "Gracias por tomarte el tiempo de escuchar esto.",
  "Un pequeño detalle pensado sinceramente para ti."
];

let noteIndex = 0;
const typedTextElement = document.getElementById("typed-text");
const nextNoteBtn = document.getElementById("next-note-btn");

const audio = document.getElementById("main-audio");
const playBtn = document.getElementById("play-btn");
const playIcon = document.getElementById("play-icon");
const pauseIcon = document.getElementById("pause-icon");
const progressBar = document.getElementById("progress-bar");
const progressContainer = document.getElementById("progress-container");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const vinyl = document.getElementById("vinyl");

function typeWriter(text, i = 0) {
  if (i === 0) typedTextElement.textContent = "";
  if (i < text.length) {
    typedTextElement.textContent += text.charAt(i);
    setTimeout(() => typeWriter(text, i + 1), 30);
  }
}

nextNoteBtn.addEventListener("click", () => {
  noteIndex = (noteIndex + 1) % romanticNotes.length;
  typeWriter(romanticNotes[noteIndex]);
});

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

audio.addEventListener("play", () => {
  playIcon.style.display = "none";
  pauseIcon.style.display = "block";
  vinyl.classList.add("playing");
});

audio.addEventListener("pause", () => {
  playIcon.style.display = "block";
  pauseIcon.style.display = "none";
  vinyl.classList.remove("playing");
});

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    currentTimeEl.textContent = formatTime(audio.currentTime);
  }
});

progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  if (duration) {
    audio.currentTime = (clickX / width) * duration;
  }
});

function createStars() {
  const container = document.getElementById("stars-bg");
  for (let i = 0; i < 25; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    star.style.left = Math.random() * 100 + "vw";
    star.style.top = Math.random() * 100 + "vh";
    const size = Math.random() * 3 + 1;
    star.style.width = size + "px";
    star.style.height = size + "px";
    star.style.animationDelay = Math.random() * 4 + "s";
    container.appendChild(star);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  typeWriter(romanticNotes[0]);
  createStars();
});
