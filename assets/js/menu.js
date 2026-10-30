const menuData = {
  sr: {
    draft: "TOČENA PIVA", bottle: "PIVO FLAŠA", spirits: "ŽESTINE", wine: "VINO",
    hot: "TOPLI NAPICI", soft: "SOKOVI I VODE", food: "HRANA", hours: "RADNO VREME",
    sunThu: "NED – ČET", fri: "PET", sat: "SUB", gameButton: "IGRA / GAME",
    items: {
      "draft-beer": [
        ["Nektar", "240 / 300", "0,3 l / 0,5 l"], ["Leskovačko", "270 / 360", "0,3 l / 0,5 l"],
        ["Pale Ale", "290 / 380", "0,3 l / 0,5 l"], ["IPA", "310 / 400", "0,3 l / 0,5 l"],
        ["Radler", "280", "0,3 l · točeno pivo sa domaćim sokom"]
      ],
      "bottled-beer": [["Leskovačko", "260", "0,5 l"], ["Niško", "240", "0,33 l"]],
      spirits: [
        ["Stomaklija", "160 / 210", "0,03 l / 0,05 l"], ["Vinjak", "160 / 210", "0,03 l / 0,05 l"],
        ["Vodka 1906", "160 / 210", "0,03 l / 0,05 l"], ["Džin", "160 / 210", "0,03 l / 0,05 l"],
        ["Rum", "160 / 210", "0,03 l / 0,05 l"], ["Gorki list", "180 / 240", "0,03 l / 0,05 l"],
        ["Jameson", "240 / 300", "0,03 l / 0,05 l"], ["Tekila", "230", "0,03 l"],
        ["Gin & Tonic", "260", ""]
      ],
      wine: [["Belo", "290", "0,25 l"], ["Crveno", "290", "0,25 l"], ["Nameštaj", "390", "0,5 l"], ["Somersby", "270", "0,33 l"]],
      "hot-drinks": [["Domaća kafa", "130", ""], ["Čaj", "130", ""], ["Dolce Gusto", "160", ""]],
      "soft-drinks": [
        ["Sokovi – limenka", "220", "Coca-Cola, Fanta, Bitter Lemon, tonic, Cockta, Sprite, Guarana i dr. · 0,33 l"],
        ["Domaći ceđeni", "260", "Jabuka, dunja, višnja, jagoda, malina, mix · 0,2 l"],
        ["Heba flašica", "160", "0,25 l"]
      ],
      food: [["Pomfrit", "340", "300 g"], ["Kobasica", "410", "200 g"], ["Ćevapi", "440", "200 g"]]
    }
  },
  en: {
    draft: "DRAFT BEER", bottle: "BOTTLED BEER", spirits: "SPIRITS", wine: "WINE",
    hot: "HOT DRINKS", soft: "JUICES & WATER", food: "FOOD", hours: "OPENING HOURS",
    sunThu: "SUN – THU", fri: "FRI", sat: "SAT", gameButton: "PLAY GAME",
    items: {
      "draft-beer": [
        ["Nektar", "240 / 300", "0.3 l / 0.5 l"], ["Leskovačko", "270 / 360", "0.3 l / 0.5 l"],
        ["Pale Ale", "290 / 380", "0.3 l / 0.5 l"], ["IPA", "310 / 400", "0.3 l / 0.5 l"],
        ["Radler", "280", "0.3 l · draft beer with homemade juice"]
      ],
      "bottled-beer": [["Leskovačko", "260", "0.5 l"], ["Niško", "240", "0.33 l"]],
      spirits: [
        ["Stomaklija (plum brandy)", "160 / 210", "0.03 l / 0.05 l"], ["Vinjak (brandy)", "160 / 210", "0.03 l / 0.05 l"],
        ["Vodka 1906", "160 / 210", "0.03 l / 0.05 l"], ["Gin", "160 / 210", "0.03 l / 0.05 l"],
        ["Rum", "160 / 210", "0.03 l / 0.05 l"], ["Gorki list (herbal liqueur)", "180 / 240", "0.03 l / 0.05 l"],
        ["Jameson", "240 / 300", "0.03 l / 0.05 l"], ["Tequila", "230", "0.03 l"],
        ["Gin & Tonic", "260", ""]
      ],
      wine: [["White wine", "290", "0.25 l"], ["Red wine", "290", "0.25 l"], ["Nameštaj", "390", "0.5 l"], ["Somersby", "270", "0.33 l"]],
      "hot-drinks": [["Turkish coffee", "130", ""], ["Tea", "130", ""], ["Dolce Gusto", "160", ""]],
      "soft-drinks": [
        ["Canned soft drinks", "220", "Coca-Cola, Fanta, Bitter Lemon, tonic, Cockta, Sprite, Guarana, etc. · 0.33 l"],
        ["Fresh-squeezed juice", "260", "Apple, quince, sour cherry, strawberry, raspberry or mix · 0.2 l"],
        ["Heba bottled water", "160", "0.25 l"]
      ],
      food: [["French fries", "340", "300 g"], ["Sausage", "410", "200 g"], ["Ćevapi (grilled minced meat)", "440", "200 g"]]
    }
  }
};

let currentLanguage = "sr";
const staticText = {
  sr: { challenge: "Napi se za 10 sekundi", challengeEn: "Wasted in 10 seconds", ok: "OK", seconds: "SEKUNDI", clicks: "KLIKOVA", tap: "KLIKNI!", result: "REZULTAT", menu: "MENI", again: "PONOVO", almost: "SKORO!", victory: "POBEDA!" },
  en: { challenge: "Napi se za 10 sekundi", challengeEn: "Wasted in 10 seconds", ok: "OK", seconds: "SECONDS", clicks: "CLICKS", tap: "TAP!", result: "SCORE", menu: "MENU", again: "TRY AGAIN", almost: "ALMOST!", victory: "VICTORY!" }
};

function renderMenu(language) {
  currentLanguage = language;
  const data = menuData[language];
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (data[key]) el.textContent = data[key];
    else if (staticText[language][key]) el.textContent = staticText[language][key];
  });
  Object.entries(data.items).forEach(([id, items]) => {
    const target = document.getElementById(id);
    target.innerHTML = items.map(([name, price, detail]) => `
      <article class="menu-item">
        <span class="item-name">${name}</span><span class="item-price">${price}</span>
        ${detail ? `<span class="item-detail">${detail}</span>` : ""}
      </article>`).join("");
  });
  document.documentElement.lang = language;
  document.getElementById("language-toggle").textContent = language === "sr" ? "English" : "Srpski";
}
document.getElementById("language-toggle").addEventListener("click", () => renderMenu(currentLanguage === "sr" ? "en" : "sr"));
renderMenu("sr");
window.getMenuLanguage = () => currentLanguage;
window.getGameText = key => staticText[currentLanguage][key] || key;
