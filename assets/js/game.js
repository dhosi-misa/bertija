(() => {
  const screen = document.getElementById("game-screen");
  const intro = document.getElementById("intro-panel");
  const countdown = document.getElementById("countdown-panel");
  const countdownNumber = document.getElementById("countdown-number");
  const play = document.getElementById("play-panel");
  const result = document.getElementById("result-panel");
  const scoreNode = document.getElementById("result-score");
  const messageNode = document.getElementById("result-message");
  const countNode = document.getElementById("click-count");
  const timeNode = document.getElementById("time-left");
  const ring = document.getElementById("ring-progress");
  const circumference = 2 * Math.PI * 108;
  let clicks = 0, startedAt = 0, raf = 0, running = false, confettiTimer = 0;

  ring.style.strokeDasharray = circumference;
  ring.style.strokeDashoffset = 0;

  function show(panel) {
    [intro, countdown, play, result].forEach(p => p.classList.add("hidden"));
    panel.classList.remove("hidden");
  }
  function openGame() {
    screen.classList.add("active");
    screen.setAttribute("aria-hidden", "false");
    screen.classList.remove("alt-bg");
    show(intro);
  }
  function closeGame() {
    stopGame();
    screen.classList.remove("active");
    screen.setAttribute("aria-hidden", "true");
    clearConfetti();
  }
  function stopGame() { running = false; cancelAnimationFrame(raf); }
  function startCountdown() {
    show(countdown);
    let n = 3;
    countdownNumber.textContent = n;
    const tick = () => {
      n--;
      if (n > 0) {
        countdownNumber.textContent = n;
        countdownNumber.style.animation = "none";
        void countdownNumber.offsetWidth;
        countdownNumber.style.animation = "";
        setTimeout(tick, 800);
      } else {
        countdownNumber.textContent = "GO!";
        setTimeout(startRound, 450);
      }
    };
    setTimeout(tick, 800);
  }
  function startRound() {
    clicks = 0; countNode.textContent = "0";
    timeNode.textContent = "10.0";
    ring.style.strokeDashoffset = 0;
    show(play);
    startedAt = performance.now();
    running = true;
    requestAnimationFrame(updateTimer);
  }
  function updateTimer(now) {
    if (!running) return;
    const elapsed = now - startedAt;
    const remaining = Math.max(0, 10000 - elapsed);
    const progress = remaining / 10000;
    timeNode.textContent = (remaining / 1000).toFixed(1);
    ring.style.strokeDashoffset = circumference * (1 - progress);
    if (remaining <= 0) finishGame();
    else raf = requestAnimationFrame(updateTimer);
  }
  function finishGame() {
    stopGame();
    show(result);
    scoreNode.classList.remove("typing");
    scoreNode.textContent = String(clicks);
    void scoreNode.offsetWidth;
    scoreNode.classList.add("typing");
    const isWin = clicks >= 50;
    messageNode.textContent = isWin ? window.getGameText("victory") : window.getGameText("almost");
    if (isWin) launchConfetti();
  }
  function tap() {
    if (!running) return;
    clicks++;
    countNode.textContent = clicks;
    screen.classList.toggle("alt-bg");
  }
  function launchConfetti() {
    clearConfetti();
    const layer = document.getElementById("confetti-layer");
    const colors = ["#f8d49b", "#e78c73", "#fff2d6", "#a7d6b2", "#d99bd5"];
    for (let i = 0; i < 90; i++) {
      const piece = document.createElement("i");
      piece.className = "confetti";
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.background = colors[i % colors.length];
      piece.style.setProperty("--drift", `${Math.random() * 180 - 90}px`);
      piece.style.animationDelay = `${Math.random() * .55}s`;
      layer.appendChild(piece);
    }
    confettiTimer = setTimeout(clearConfetti, 2800);
  }
  function clearConfetti() {
    clearTimeout(confettiTimer);
    document.getElementById("confetti-layer").replaceChildren();
  }

  document.getElementById("game-open").addEventListener("click", openGame);
  document.getElementById("game-close").addEventListener("click", closeGame);
  document.getElementById("game-ok").addEventListener("click", startCountdown);
  document.getElementById("tap-button").addEventListener("click", tap);
  document.getElementById("back-to-menu").addEventListener("click", closeGame);
  document.getElementById("try-again").addEventListener("click", () => { clearConfetti(); screen.classList.remove("alt-bg"); startCountdown(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && screen.classList.contains("active")) closeGame(); });
})();
