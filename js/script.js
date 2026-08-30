// Countdown naar zaterdag 12 september 2026, 12:00 (verzameltijd bij de kazerne)
const EVENT_DATE = new Date("2026-09-12T12:00:00+02:00");

const els = {
  days: document.getElementById("cd-days"),
  hours: document.getElementById("cd-hours"),
  min: document.getElementById("cd-min"),
  sec: document.getElementById("cd-sec"),
};

function updateCountdown() {
  const diff = EVENT_DATE.getTime() - Date.now();

  if (diff <= 0) {
    els.days.textContent = "🚒";
    els.hours.textContent = "00";
    els.min.textContent = "00";
    els.sec.textContent = "00";
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  els.days.textContent = String(days);
  els.hours.textContent = String(hours).padStart(2, "0");
  els.min.textContent = String(minutes).padStart(2, "0");
  els.sec.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Scroll reveal
const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealEls.forEach((el) => observer.observe(el));

// Alarm knop easter egg
const alarmBtn = document.getElementById("alarmBtn");
const alarmFlash = document.getElementById("alarmFlash");
const alarmSound = document.getElementById("alarmSound");
const alarmOriginalText = alarmBtn.textContent;
let alarmCooldown = false;

function resetAlarm() {
  alarmFlash.classList.remove("active");
  alarmBtn.textContent = alarmOriginalText;
  alarmBtn.disabled = false;
  alarmCooldown = false;
}

alarmBtn.addEventListener("click", () => {
  if (alarmCooldown) return;
  alarmCooldown = true;

  alarmBtn.disabled = true;
  alarmBtn.textContent = "🚒💨 Vals alarm! Iedereen weer rustig...";
  alarmFlash.classList.add("active");
  setTimeout(() => alarmFlash.classList.remove("active"), 1800);

  alarmSound.currentTime = 0;
  alarmSound.volume = 0.7;
  const playback = alarmSound.play();
  if (playback && typeof playback.catch === "function") {
    // Autoplay kan geblokkeerd zijn; val dan terug op de vaste flash-duur.
    playback.catch(() => setTimeout(resetAlarm, 1800));
  }
});

alarmSound.addEventListener("ended", resetAlarm);
