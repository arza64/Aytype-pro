document.addEventListener("DOMContentLoaded", () => {
  // --- DOM Elements ---
  const wordBar = document.getElementById("wordbar");
  const input = document.getElementById("input");
  const inputBar = document.getElementById("inputBar");
  const timerDisplay = document.getElementById("timer");
  const resultStruk = document.getElementById("resultStruk");
  const keyboard = document.getElementById("virtualKeyboard");
  
  const btnHome = document.getElementById("btnHome");
  const btnTyping = document.getElementById("btnTyping");
  const btnMode = document.getElementById("btnMode");
  const btnDownload = document.getElementById("btnDownloadImage");
  const btnShareResult = document.getElementById("btnShareResult");
  const btnRestartTest = document.getElementById("btnRestartTest");
  const btnRefresh = document.querySelector(".btn-restart");

  const homeSection = document.getElementById("homeSection");
  const typingSection = document.getElementById("typingSection");
  const modeSection = document.getElementById("modeSection");

  // --- Data & State ---
  let words = [];
  let wordsPerLine = 0;
  let maxActiveWords = 0;
  let activeWords = [];
  let startActiveIndex = 0;
  let currentWordGlobalIndex = 0;

  let correctCount = 0;
  let incorrectCount = 0;
  let correctCharCount = 0;
  let incorrectCharCount = 0;

  let timeLeft = 60;
  let timerInterval = null;
  let timerStarted = false;

  // --- Word List ---
  const wordList = [
    "yaitu", "nanti", "mudah", "di", "datang", "dia", "biasa", "biasa", "sesuatu", "orang",
    "memberikan", "sangat", "jangan", "memberi", "menjadi", "merupakan", "benar", "tidak",
    "tapi", "suatu", "pada", "kamu", "sering", "malam", "namun", "juta", "sudah", "lagi",
    "hari", "tentang", "tengah", "sangat", "makanan", "harus", "itu", "dan", "kepada",
    "menjadi", "uang", "secara", "terjadi", "pusat", "dan", "salah", "nama", "yaitu", "oleh",
    "kamu", "sendiri", "jelas", "antara", "pula", "hari", "cara", "langsung", "sekalipun",
    "ku", "oleh", "sekali", "orang", "waktu", "baru", "akibat", "ada", "terjadi", "ini",
    "sementara", "jelas", "tinggi", "oleh", "datang", "setiap", "akan", "sebab", "ketika",
    "ku", "jumlah", "naik", "tempat", "khusus", "hal", "paling", "kepada", "terlalu",
    "semua", "mungkin", "terjadi", "ke", "menurut", "sekarang", "seperti", "tanpa", "makin",
    "mereka", "tetapi", "telah", "terus", "anak", "waktu", "sementara", "bahkan", "terus",
    "dapat", "terjadi", "sering", "saat", "bila", "masuk", "tak", "tiba", "jangan", "kali",
    "sudah", "kecil", "hati", "antara", "termasuk", "barang", "bukan", "selalu", "namun",
    "seluruh", "bersama", "maupun", "oleh", "baik", "tetapi", "telah", "pusat", "baru",
    "lalu", "sedikit", "seperti", "suatu", "siap", "sesuai", "aku", "banyak", "selalu",
    "kami", "ia", "luar", "benar", "banyak", "makin", "akan", "kemudian", "untuk",
    "memberi", "ini", "kepada", "terlalu", "bisa", "ketika", "makan", "sendiri", "bagian",
    "tiba", "bagi", "juta", "setiap", "kita", "serta", "selama", "uang", "sini", "sementara",
    "bukan", "mulai", "jauh", "uang", "anak", "tahu", "malam", "nanti", "bila", "hal", "dia",
    "jalan", "sekarang", "memang", "sini", "ada", "tersebut", "kamu", "memberikan", "jalan",
    "mungkin", "sehingga", "baik", "sesuai", "suatu", "mau", "orang", "datang", "kecil",
    "yaitu", "sambil", "setelah", "termasuk", "melakukan", "tetapi", "hati", "waktu", "suatu",
    "secara", "lagi", "boleh", "dari", "sekitar", "kalau", "mencari", "apa", "ini", "karena",
    "tentang", "bahkan", "kepada", "ke", "tanpa", "hari", "anda", "cara", "kepala", "pulang",
    "serta", "akibat", "bagian", "tak", "ada", "jangan", "terhadap", "ketika", "paling",
    "seluruh", "jumlah", "diri", "sebelum", "cukup", "menurut", "perlu", "lain", "barang",
    "pulang", "tinggi", "mencari", "pusat", "kalau", "itu", "mudah", "ku", "saat", "mudah",
    "tanpa", "sekali", "pertama", "sebab", "ada", "bukan", "pertama", "segera", "cara",
    "tapi", "bagian", "luar", "harga", "telah", "makanan", "mencari", "baik", "lalu", "makan",
    "besar", "sejak", "dari", "hal", "karena", "membuat", "sebelum", "tahu", "yang", "masuk",
    "mulai", "sekali", "segera", "jalan", "selalu", "punya", "bahwa", "masalah", "bukan",
    "sedikit", "datang", "ke", "tiba", "tinggi", "malam", "ke", "memiliki", "hal", "kerja",
    "pernah", "air", "sama", "malam", "kerja", "maka", "sering", "apa", "seperti", "untuk",
    "bila", "sangat", "cepat", "mana", "setelah", "ini", "mata", "tahu", "kamu", "bagi",
    "saat", "orang", "ada", "sering", "dia", "sini", "sementara", "harga", "di", "harus",
    "hati", "tanpa", "kembali", "pernah", "cara", "uang", "sekarang", "tiba", "pernah",
    "sekali", "sendiri", "tanpa", "sering", "maupun", "hari", "memberi", "sedang", "mulai",
    "terlalu", "sementara", "tanpa", "karena", "kini", "kalau", "memberikan", "jumlah",
    "sini", "secara", "tetapi", "malam", "selalu", "sehingga", "tinggi", "jalan", "tahu",
    "dengan", "merupakan", "ke", "harus", "sementara", "maka", "benar", "waktu", "lalu",
    "hal", "semua", "mungkin", "ingin", "seluruh", "memiliki", "serta", "akibat", "melakukan",
    "terhadap", "jangan", "ketika", "besar", "ku", "cepat", "mulai", "mana", "pula", "air",
    "banyak", "tiba", "memiliki", "semua", "cara", "tiba", "melalui", "sedikit", "baru",
    "namun", "kamu", "bagi", "termasuk", "tahu", "dari", "mencari", "baik", "namun", "luar",
    "belum", "sekali", "sudah", "ia", "juga", "selama", "kali", "terhadap", "tengah", "ini",
    "suatu", "tersebut", "tinggi", "bukan", "bagi", "sudah", "pertama", "anak", "terjadi",
    "melalui", "bila", "siap", "bahwa", "itu", "boleh", "menurut", "suatu", "makin", "antara",
    "tengah", "naik", "dia", "akan", "karena", "waktu", "di", "baru", "setelah", "kamu",
    "jumlah", "sekarang", "jalan", "ingin", "punya", "terlalu", "anak", "setelah", "naik",
    "tak", "baik", "mau", "pernah", "kurang", "ku", "orang", "tidak", "diri", "jangan",
    "pulang", "nanti", "waktu", "tapi", "lalu", "paling", "aku", "makanan", "mengatakan",
    "sambil", "ini", "baru", "telah", "kecil", "membuat", "serta", "jadi", "akan", "apa",
    "khusus", "tinggi", "sendiri", "mampu", "ada", "maupun", "kepada", "langsung", "makan",
    "mulai", "antara", "aku", "terlalu", "pula", "terus", "kembali", "hal", "yaitu", "siap",
    "kali", "dari", "sama", "bagian", "orang", "mengatakan", "sangat", "barang", "mau",
    "sering", "jalan", "bila", "mencari", "tahu", "malam", "dan", "bahkan", "luar", "cara",
    "tahu", "kamu", "terjadi", "seperti", "juta", "belum", "tengah", "mungkin", "dan", "bila",
    "sebab", "setiap", "dan", "anda", "oleh", "menurut", "mudah", "sekali", "orang", "makanan",
    "bagian", "terlalu", "pusat", "sini", "akan", "lagi", "pada", "diri", "menjadi", "bukan",
    "jelas", "tanpa", "suatu", "tengah", "termasuk", "jalan", "kepala", "mana", "barang",
    "sangat", "sejak", "telah", "sekalipun", "mampu", "juta", "datang", "sampai", "hari",
    "bahwa", "juga", "dia", "sekitar", "untuk", "kalau", "bersama", "dapat", "yaitu", "ku",
    "bila", "tak", "ketika", "juta", "banyak", "ke", "tetapi", "telah", "dapat", "benar",
    "sudah", "kamu", "anak", "juta", "salah", "akibat", "sangat", "memberikan", "kemudian",
    "seperti", "membuat", "telah", "paling", "setiap", "juga", "segera", "yang", "langsung",
    "cukup", "jadi", "bersama", "jumlah", "ia", "terus", "jangan", "tetapi", "kepada", "air",
    "uang", "di", "sudah", "kepala", "anda", "tentang", "mata", "jelas", "jauh", "ke", "mata",
    "sedang", "datang", "makin", "punya", "boleh", "di", "mudah", "jangan", "perlu"
  ];

  // --- Functions ---
  function showSection(sectionId) {
    document.querySelectorAll(".content-section").forEach(section => {
      section.classList.remove("active");
    });
    document.querySelectorAll(".nav-btn").forEach(btn => {
      btn.classList.remove("active");
    });

    document.getElementById(sectionId).classList.add("active");
    document.getElementById(`btn${sectionId.charAt(0).toUpperCase() + sectionId.slice(1, -7)}`).classList.add("active");
    
    localStorage.setItem("lastSection", sectionId);
    
    // Fokus pada input jika bagian mengetik aktif
    if (sectionId === "typingSection") {
      setTimeout(() => input.focus(), 100);
    }
  }

  function calculateWordsPerLineByDom() {
    const wordSpans = wordBar.querySelectorAll('.word');
    if (wordSpans.length === 0) return 0;
    let firstLineTop = wordSpans[0].offsetTop;
    let count = 0;
    for (let span of wordSpans) {
      if (span.offsetTop !== firstLineTop) break;
      count++;
    }
    return count;
  }

  function updateActiveWords() {
    wordBar.innerHTML = "";
    const numberOfLines = 3; // Sesuaikan dengan CSS
    const tentativeWordsCount = maxActiveWords || 20;
    activeWords = words.slice(startActiveIndex, startActiveIndex + tentativeWordsCount);

    activeWords.forEach((word, index) => {
      const wordSpan = document.createElement("span");
      wordSpan.className = "word";
      wordSpan.setAttribute("data-index", index);
      word.split("").forEach((char) => {
        const charSpan = document.createElement("span");
        charSpan.className = "char";
        charSpan.textContent = char;
        wordSpan.appendChild(charSpan);
      });
      wordBar.appendChild(wordSpan);
      wordBar.appendChild(document.createTextNode(" "));
    });

    wordsPerLine = calculateWordsPerLineByDom() || 8;
    maxActiveWords = wordsPerLine * numberOfLines;

    if (activeWords.length !== maxActiveWords) {
      activeWords = words.slice(startActiveIndex, startActiveIndex + maxActiveWords);
      // Re-render if needed (logic can be optimized)
      updateActiveWords(); 
    }
  }

  function resetTest() {
    words = [...wordList];
    shuffle(words);
    activeWords = [];
    startActiveIndex = 0;
    currentWordGlobalIndex = 0;
    correctCount = 0;
    incorrectCount = 0;
    correctCharCount = 0;
    incorrectCharCount = 0;
    timeLeft = 60;
    timerStarted = false;
    clearInterval(timerInterval);
    input.value = "";
    timerDisplay.textContent = "60";
    resultStruk.classList.add("hidden");
    inputBar.classList.remove("hidden");
    wordBar.classList.remove("hidden");
    keyboard.classList.remove("hidden");
  }

  function startTest() {
    resetTest();
    maxActiveWords = 16;
    updateActiveWords();
    highlightCurrentWord();
    input.focus();
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function highlightCurrentWord() {
    document.querySelectorAll('.word').forEach(w => w.classList.remove('active-word'));
    const relativeIndex = currentWordGlobalIndex - startActiveIndex;
    const currentWordSpan = document.querySelector(`.word[data-index="${relativeIndex}"]`);
    if (currentWordSpan) {
      currentWordSpan.classList.add('active-word');
      currentWordSpan.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }
  }

  function startTimer() {
    if (timerStarted) return;
    timerStarted = true;
    timerInterval = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        timerStarted = false;
        endTest();
      }
    }, 1000);
  }

  function endTest() {
    clearInterval(timerInterval);
    timerStarted = false;
    
    inputBar.classList.add("hidden");
    wordBar.classList.add("hidden");
    keyboard.classList.add("hidden");

    const today = new Date();
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    const formattedDate = today.toLocaleDateString("id-ID", options);
    const [dayName, ...dateParts] = formattedDate.split(", ");
    document.getElementById("dayName").textContent = dayName;
    document.getElementById("fullDate").textContent = dateParts.join(", ");

    const accuracy = correctCharCount / (correctCharCount + incorrectCharCount) * 100 || 0;
    const minutes = 60 / 60;
    const wpmFinal = (correctCount / minutes) * 0.5 + (correctCharCount / 5 / minutes) * 0.5;

    document.querySelector(".wpm").textContent = `${Math.round(wpmFinal)} WPM`;
    document.querySelector(".result-section").innerHTML = `
      <p>Total Benar     : ${correctCount} kata</p>
      <p>Total Salah     : ${incorrectCount} kata</p>
      <p>Akurasi         : ${accuracy.toFixed(2)}%</p>
      <p>Total Karakter  : ${correctCharCount + incorrectCharCount}</p>
      <p class="indent">Hijau : ${correctCharCount}</p>
      <p class="indent">Merah : ${incorrectCharCount}</p>
      <p>Waktu           : 60 Detik</p>
      <p>Title           : <span id="title">${getTitle(wpmFinal)}</span></p>
    `;
    
    // Tambahkan animasi untuk resultStruk
    resultStruk.classList.remove("hidden");
    resultStruk.style.animation = "slideInUp 0.8s ease forwards";
  }

  function getTitle(wpm) {
    if (wpm <= 20) return "Baby's Fingers";
    if (wpm <= 40) return "Beginner";
    if (wpm <= 60) return "Competent";
    if (wpm <= 80) return "Pro Typer";
    if (wpm <= 100) return "Expert";
    return "The God";
  }

  function setTheme(themeName) {
    document.body.className = '';
    if (themeName !== 'blue') { // Blue is default
      document.body.classList.add(`theme-${themeName}`);
    }
    localStorage.setItem("theme", themeName);
  }

function restartTest() {
  console.log("Restart test dipanggil!");
  resetTest();
  startTest();

  setTimeout(() => input.focus(), 100);

  window.scrollTo({ top: 0, behavior: "smooth" });


  // Pastikan fokus kembali ke input
  setTimeout(() => {
    input.focus();
  }, 100);
  
  // Scroll ke atas untuk melihat input field
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

  // --- Event Listeners ---
  btnHome.addEventListener("click", () => showSection("homeSection"));
  btnTyping.addEventListener("click", () => {
    showSection("typingSection");
    startTest();
  });
  btnMode.addEventListener("click", () => showSection("modeSection"));

  input.addEventListener("input", () => {
    if (!timerStarted && input.value.length > 0) {
      startTimer();
    }
    const typed = input.value;
    const currentWord = words[currentWordGlobalIndex];
    const relativeIndex = currentWordGlobalIndex - startActiveIndex;
    const currentWordSpan = document.querySelector(`.word[data-index="${relativeIndex}"]`);
    if (!currentWordSpan) return;

    const charSpans = currentWordSpan.querySelectorAll(".char");
    charSpans.forEach(charSpan => charSpan.classList.remove("correct-char", "incorrect-char", "underline-active"));

    if (typed.length > currentWord.length) {
      charSpans.forEach(charSpan => charSpan.classList.add("incorrect-char"));
    } else {
      for (let i = 0; i < typed.length; i++) {
        if (typed[i] === currentWord[i]) {
          charSpans[i].classList.add("correct-char");
        } else {
          charSpans[i].classList.add("incorrect-char");
        }
      }
    }
    if (typed.length < charSpans.length) {
      charSpans[typed.length].classList.add("underline-active");
    }
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === " ") {
      e.preventDefault();
      const typed = input.value.trim();
      if (typed === "") return;
      const currentWord = words[currentWordGlobalIndex];
      const relativeIndex = currentWordGlobalIndex - startActiveIndex;
      const currentWordSpan = document.querySelector(`.word[data-index="${relativeIndex}"]`);
      if (!currentWordSpan) return;

      if (typed === currentWord) {
        currentWordSpan.classList.add("correct-word");
        correctCount++;
        correctCharCount += currentWord.length;
      } else {
        currentWordSpan.classList.add("incorrect-word");
        incorrectCount++;
        incorrectCharCount += currentWord.length;
      }

      input.value = "";
      currentWordGlobalIndex++;
      if (currentWordGlobalIndex - startActiveIndex >= wordsPerLine) {
        startActiveIndex += wordsPerLine;
        updateActiveWords();
      }
      highlightCurrentWord();
    }
  });

  document.addEventListener("keydown", (e) => {
    const key = e.key.toUpperCase();
    const keyEl = document.querySelector(`.key[data-key="${key}"]`);
    if (keyEl) {
      keyEl.classList.add("active", "pressed");
      setTimeout(() => keyEl.classList.remove("pressed"), 200);
    }
  });

  document.addEventListener("keyup", (e) => {
    const key = e.key.toUpperCase();
    const keyEl = document.querySelector(`.key[data-key="${key}"]`);
    if (keyEl) keyEl.classList.remove("active");
  });

  btnShareResult.addEventListener("click", () => {
    const wpm = document.querySelector(".wpm")?.textContent || "0 WPM";
    const accuracy = document.querySelector(".result-section")?.children[2]?.textContent.split(":")[1]?.trim() || "-";
    const title = document.getElementById("title")?.textContent || "-";
    const shareText = `📊 Hasil Tes AyType:\n🖋️ ${wpm}\n🎯 Akurasi: ${accuracy}\n🏅 Title: ${title}\n\nCoba kamu juga di aytype.com`;
    if (navigator.share) {
      navigator.share({ title: "Hasil Tes AyType", text: shareText, url: window.location.href });
    } else {
      navigator.clipboard.writeText(shareText);
      alert("Teks hasil telah disalin ke clipboard!");
    }
  });

  btnDownload.addEventListener("click", () => {
    // Pastikan resultStruk terlihat
    resultStruk.classList.remove("hidden");
    resultStruk.classList.add("temp-visible");
    
    setTimeout(() => {
      html2canvas(resultStruk, { 
        scale: 2, 
        backgroundColor: "#1a1a1a", 
        useCORS: true,
        logging: false 
      }).then(canvas => {
        const link = document.createElement("a");
        link.download = "hasil-aytype.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
        resultStruk.classList.remove("temp-visible");
        if (resultStruk.classList.contains("hidden")) {
          resultStruk.classList.add("hidden");
        }
      });
    }, 500);
  });

  btnRestartTest.addEventListener("click", () => {
  restartTest();
});

btnRefresh.addEventListener("click", () => {
  restartTest();
});
  // --- Initialization ---
  const lastSection = localStorage.getItem("lastSection") || "homeSection";
  showSection(lastSection);
  if (lastSection === "typingSection") {
    startTest();
  }

  const savedTheme = localStorage.getItem("theme") || 'blue';
  setTheme(savedTheme);

  // Fokus pada input saat halaman dimuat
  if (lastSection === "typingSection") {
    setTimeout(() => input.focus(), 500);
  }
});

