(function () {
  "use strict";

  var videos = Array.isArray(window.H2C_VIDEOS) ? window.H2C_VIDEOS : [];
  var categoryOrder = Array.isArray(window.H2C_CATEGORY_ORDER)
    ? window.H2C_CATEGORY_ORDER
    : [];

  var state = {
    category: "All",
    query: ""
  };

  var chipsEl = document.getElementById("chips");
  var listEl = document.getElementById("videoList");
  var countEl = document.getElementById("resultCount");
  var emptyEl = document.getElementById("emptyState");
  var searchEl = document.getElementById("search");

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function shortChipLabel(cat) {
    var map = {
      "Getting Started / Unboxing & Setup": "Getting Started",
      "Maintenance & Calibration": "Maintenance",
      "Multicolor & Vortek / Hotend Swap": "Vortek / Multicolor",
      "AMS & Filament": "AMS & Filament",
      "Bambu Studio / Slicing": "Bambu Studio",
      "3D Modeling for Print": "3D Modeling",
      "Laser Cutting": "Laser Cutting",
      "Laser Engraving": "Laser Engraving",
      "Materials & Engineering Prints": "Materials",
      "Troubleshooting": "Troubleshooting",
      "Tips & Workflows": "Tips"
    };
    return map[cat] || cat;
  }

  function videoCategories(v) {
    if (Array.isArray(v.categories) && v.categories.length) return v.categories;
    return v.category ? [v.category] : [];
  }

  function matches(v) {
    var cats = videoCategories(v);
    if (state.category !== "All" && cats.indexOf(state.category) === -1) {
      return false;
    }
    var q = state.query.trim().toLowerCase();
    if (!q) return true;
    var hay = [
      v.appTitle || "",
      v.description || "",
      v.channel || "",
      v.youtubeTitle || "",
      v.category || "",
      cats.join(" ")
    ]
      .join(" ")
      .toLowerCase();
    return hay.indexOf(q) !== -1;
  }

  function filtered() {
    return videos.filter(matches);
  }

  function sortForCategory(list) {
    // Keep catalog order; optionally nudge selected category's primary items first
    if (state.category === "All") return list;
    return list.slice().sort(function (a, b) {
      var ap = a.category === state.category ? 0 : 1;
      var bp = b.category === state.category ? 0 : 1;
      return ap - bp;
    });
  }

  function renderChips() {
    var html = "";
    var all = ["All"].concat(categoryOrder);
    all.forEach(function (cat) {
      var pressed = state.category === cat ? "true" : "false";
      var label = cat === "All" ? "All" : shortChipLabel(cat);
      html +=
        '<button type="button" class="chip" data-category="' +
        escapeHtml(cat) +
        '" aria-pressed="' +
        pressed +
        '">' +
        escapeHtml(label) +
        "</button>";
    });
    chipsEl.innerHTML = html;
  }

  function renderList() {
    var list = sortForCategory(filtered());
    countEl.textContent =
      list.length +
      " video" +
      (list.length === 1 ? "" : "s") +
      (state.category === "All" ? "" : " · " + shortChipLabel(state.category));

    if (!list.length) {
      listEl.innerHTML = "";
      emptyEl.hidden = false;
      return;
    }
    emptyEl.hidden = true;

    listEl.innerHTML = list
      .map(function (v) {
        var badgeCat = state.category !== "All" ? state.category : v.category;
        return (
          '<article class="card">' +
          '<div class="card-top">' +
          "<h2 class=\"app-title\">" +
          escapeHtml(v.appTitle || "Untitled") +
          "</h2>" +
          '<span class="duration">' +
          escapeHtml(v.duration || "—") +
          "</span>" +
          "</div>" +
          (v.youtubeTitle
            ? '<p class="yt-title">' + escapeHtml(v.youtubeTitle) + "</p>"
            : "") +
          '<p class="channel">' +
          escapeHtml(v.channel || "Unknown channel") +
          "</p>" +
          '<span class="cat-badge">' +
          escapeHtml(badgeCat || "") +
          "</span>" +
          '<p class="desc">' +
          escapeHtml(v.description || "") +
          "</p>" +
          '<a class="watch-btn" href="' +
          escapeHtml(v.url) +
          '" target="_blank" rel="noopener noreferrer">' +
          "Watch on YouTube" +
          "</a>" +
          "</article>"
        );
      })
      .join("");
  }

  function render() {
    renderChips();
    renderList();
  }

  chipsEl.addEventListener("click", function (e) {
    var btn = e.target.closest(".chip");
    if (!btn) return;
    state.category = btn.getAttribute("data-category") || "All";
    render();
    // Keep active chip visible in the horizontal scroller
    btn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  });

  var searchTimer = null;
  searchEl.addEventListener("input", function () {
    var value = searchEl.value;
    clearTimeout(searchTimer);
    searchTimer = setTimeout(function () {
      state.query = value;
      renderList();
    }, 120);
  });

  render();
})();
