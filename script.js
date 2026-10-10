// Frases románticas estilo Y2K
const loveNotes = [
  "Eres mi canción favorita de los 2000s ♡",
  "Nuestra conexión es más fuerte que el Wi-Fi ✨",
  "Guardado en mi corazón como un archivo importante 💾",
  "Tú + Yo = La playlist perfecta 🎧",
  "Eres el destello de brillo que le faltaba a mi día ✧"
];

let currentNoteIndex = 0;
const typedTextElement = document.getElementById("typed-text");
const newNoteBtn = document.getElementById("new-note-btn");
const playBtn = document.getElementById("play-btn");
const albumCover = document.querySelector(".album-cover");
let isPlaying = false;

// Efecto de máquina de escribir
function typeWriter(text, i = 0) {
  if (i === 0) typedTextElement.textContent = "";
  if (i < text.length) {
    typedTextElement.textContent += text.charAt(i);
    setTimeout(() => typeWriter(text, i + 1), 35);
  }
}

// Cambiar nota de amor
newNoteBtn.addEventListener("click", () => {
  currentNoteIndex = (currentNoteIndex + 1) % loveNotes.length;
  typeWriter(loveNotes[currentNoteIndex]);
});

// Control básico del reproductor
playBtn.addEventListener("click", () => {
  isPlaying = !isPlaying;
  playBtn.textContent = isPlaying ? "⏸" : "▶";
  if (isPlaying) {
    albumCover.classList.add("playing");
  } else {
    albumCover.classList.remove("playing");
  }
});

// Generador de corazones flotantes en el fondo
function createFloatingHearts() {
  const container = document.getElementById("hearts-bg");
  for (let i = 0; i < 15; i++) {
    const heart = document.createElement("div");
    heart.classList.add("floating-heart");
    heart.innerHTML = "♡";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 3 + 4 + "s";
    heart.style.fontSize = Math.random() * 15 + 15 + "px";
    container.appendChild(heart);
  }
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  typeWriter(loveNotes[0]);
  createFloatingHearts();
});
