/* slskd spec — small progressive-enhancement helpers (no dependencies). */
(function () {
  "use strict";

  // ---- Theme (persisted, respects system preference) ----
  var root = document.documentElement;
  try {
    var saved = localStorage.getItem("slskd-spec-theme");
    if (saved) {
      root.setAttribute("data-theme", saved);
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      root.setAttribute("data-theme", "dark");
    }
  } catch (e) {}

  function toggleTheme() {
    var cur = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", cur);
    try { localStorage.setItem("slskd-spec-theme", cur); } catch (e) {}
  }

  document.addEventListener("DOMContentLoaded", function () {
    // theme button
    var tt = document.querySelector(".theme-toggle");
    if (tt) tt.addEventListener("click", toggleTheme);

    // mobile drawer
    var menuBtn = document.querySelector(".menu-btn");
    var scrim = document.querySelector(".scrim");
    if (menuBtn) menuBtn.addEventListener("click", function () { document.body.classList.toggle("nav-open"); });
    if (scrim) scrim.addEventListener("click", function () { document.body.classList.remove("nav-open"); });

    // sidebar filter
    var filter = document.querySelector(".nav-filter");
    if (filter) {
      filter.addEventListener("input", function () {
        var q = filter.value.trim().toLowerCase();
        document.querySelectorAll(".sidebar nav li").forEach(function (li) {
          var t = (li.textContent || "").toLowerCase();
          li.style.display = !q || t.indexOf(q) !== -1 ? "" : "none";
        });
      });
    }

    // anchor links on headings
    document.querySelectorAll(".content h2[id], .content h3[id], .content h4[id]").forEach(function (h) {
      var a = document.createElement("a");
      a.className = "anchor";
      a.href = "#" + h.id;
      a.setAttribute("aria-label", "Permalink");
      a.textContent = "#";
      h.appendChild(a);
    });

    // copy buttons on <pre>
    document.querySelectorAll("pre").forEach(function (pre) {
      var btn = document.createElement("button");
      btn.className = "copy-btn";
      btn.type = "button";
      btn.textContent = "copy";
      btn.addEventListener("click", function () {
        var code = pre.querySelector("code");
        var text = code ? code.innerText : pre.innerText;
        navigator.clipboard.writeText(text).then(function () {
          btn.textContent = "copied";
          setTimeout(function () { btn.textContent = "copy"; }, 1400);
        });
      });
      pre.appendChild(btn);
    });
  });
})();
