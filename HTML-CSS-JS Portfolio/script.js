/* --- NAVIGATION --- */
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

/* --- WELLE-ANIMATION --- */
document.addEventListener("DOMContentLoaded", function () {
  const title = document.querySelector(".title");

  if (title) {
    const text = title.textContent;
    title.innerHTML = "";

    [...text].forEach((letter, index) => {
      const span = document.createElement("span");
      span.textContent = letter === " " ? "\u00A0" : letter;
      span.style.setProperty("--i", index);
      title.appendChild(span);
    });
  }
});

/* --- DARK MODE LOGIC --- */

const storageKey = 'theme-preference';

const onClick = () => {
  // Aktuellen Wert umdrehen
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  setPreference();
}

const getColorPreference = () => {
  // 1. Prüfen: Hat der Nutzer schonmal was eingestellt? (LocalStorage)
  if (localStorage.getItem(storageKey))
    return localStorage.getItem(storageKey);
  
  // 2. Fallback: Wenn nicht, was sagt das System? (PRÜFUNGSAUFGABE: Query ohne Auflösung)
  else
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

const setPreference = () => {
  localStorage.setItem(storageKey, theme.value);
  reflectPreference();
}

const reflectPreference = () => {
  // 1. Für die Button-Animation (data-theme auf HTML Tag für CSS Selektoren)
  document.firstElementChild.setAttribute('data-theme', theme.value);

  // 2. Für dein CSS-Design (Klasse auf Body hinzufügen/entfernen)
  if (theme.value === 'dark') {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }

  // 3. Accessibility Updates für beide Buttons
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.setAttribute('aria-label', theme.value);
  });
}

const theme = {
  value: getColorPreference(),
}

// Sofort beim Laden ausführen (Verhindert Flackern)
reflectPreference();

window.onload = () => {
  // Event Listener auf ALLE Theme-Buttons setzen (Desktop & Mobil)
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', onClick);
  });
}

// Synchronisierung mit System-Einstellungen (Live-Change)
// Wenn der Nutzer während des Besuchs sein System umstellt
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', ({matches: isDark}) => {
    theme.value = isDark ? 'dark' : 'light';
    setPreference();
  });


  /* --- KONTAKTFORMULAR LOGIK --- */

function sendMail(event) {
  // 1. Verhindern, dass die Seite neu lädt
  event.preventDefault(); 
  
  const form = event.target;

  // Sicherheitscheck: Falls schon eine Meldung da ist, nicht noch eine erzeugen
  if (form.querySelector(".success-message")) return;

  // 2. DOM-Element erstellen 
  const msg = document.createElement("div");
  msg.className = "success-message";
  msg.innerHTML = "Vielen Dank! Ihre Nachricht wurde erfolgreich versendet.";

  // 3. Element in den DOM einfügen (am Ende des Formulars)
  form.appendChild(msg);

  // 4. Formularfelder leeren
  form.reset();

  // 5. Nach 4 Sekunden die Meldung wieder entfernen (Cleanup)
  setTimeout(() => {
    msg.remove();
  }, 4000);
}