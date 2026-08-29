/* 日本語の本文を文節単位で折り返す。
   CSS の word-break:auto-phrase は Chrome 系のみ対応のため、
   Safari / iOS でも同じ折り返しになるよう BudouX で補う。
   読み込みに失敗しても、本文は通常どおり表示される。 */
(function () {
  var TARGETS = ".prose p, .prose h2, .intro p, .callout, .toc .ja, .grid .ja, .affirmation-list p, .quote p, .quote strong, .chapter-hero .jp, .lede";

  function apply() {
    if (!window.customElements || !customElements.get("budoux-ja")) return;
    document.querySelectorAll(TARGETS).forEach(function (el) {
      if (el.dataset.budoux) return;
      el.dataset.budoux = "1";
      var wrap = document.createElement("budoux-ja");
      while (el.firstChild) wrap.appendChild(el.firstChild);
      el.appendChild(wrap);
    });
  }

  if (window.customElements && customElements.whenDefined) {
    customElements.whenDefined("budoux-ja").then(apply).catch(function () {});
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply);
  } else {
    apply();
  }
})();
