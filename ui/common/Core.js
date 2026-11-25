window.UI_CORE = (function () {
  let alertTimer = null;

  function initStandardHeader(options) {
    const {
      title = "Application",
      version = "v0.1",
      mode = "En ligne",
      logoPath = "common/Logo.png",
      help = { title: "Aide", html: "<p>Aucune aide renseignée pour ce module.</p>" }
    } = options || {};

    const host = document.getElementById("app-header");
    if (!host) return;

    host.innerHTML = `
      <header class="topbar">
        <div class="brand">
          <img src="${logoPath}" alt="Logo" class="brand-logo" />
          <div class="brand-info">
            <div class="brand-title-row">
              <span class="brand-title">${title}</span>
              <span class="version-pill">${version}</span>
              <span class="mode-pill">${mode}</span>
            </div>
            <span style="font-size: 0.78rem; color: var(--text-muted);">
              Parapente Cross Addict · Socle Standard UI
            </span>
          </div>
        </div>
        <div class="topbar-actions">
          <button type="button" id="btn-std-help" class="btn btn-primary" title="Afficher l'aide du module">
            ? Aide
          </button>
        </div>
      </header>

      <div id="std-help-modal" class="modal-backdrop hidden" role="dialog" aria-modal="true">
        <div class="modal-card">
          <div class="modal-header">
            <h2 id="std-help-title" style="margin:0; font-size:1.05rem;"></h2>
            <button type="button" id="btn-std-help-close" class="btn btn-sm">Fermer</button>
          </div>
          <div id="std-help-body" class="modal-body"></div>
        </div>
      </div>
    `;

    const modal = document.getElementById("std-help-modal");
    const btnOpen = document.getElementById("btn-std-help");
    const btnClose = document.getElementById("btn-std-help-close");

    btnOpen.addEventListener("click", () => {
      document.getElementById("std-help-title").textContent = help.title || `Aide — ${title}`;
      document.getElementById("std-help-body").innerHTML = help.html || "";
      modal.classList.remove("hidden");
    });

    btnClose.addEventListener("click", () => modal.classList.add("hidden"));
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.add("hidden");
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        modal.classList.add("hidden");
      }
    });
  }

  function showAlert(message, level = "info") {
    const zone = document.getElementById("app-alert");
    if (!zone) return;

    if (alertTimer) {
      clearTimeout(alertTimer);
      alertTimer = null;
    }

    const labels = {
      info: "Info",
      success: "Validé",
      warning: "Vigilance",
      danger: "Erreur"
    };

    zone.innerHTML = `
      <div class="alert-banner ${level}" role="status">
        <div>
          <strong>[${labels[level] || "Info"}]</strong> ${message}
        </div>
        <button type="button" class="btn btn-sm" id="btn-alert-close">✕</button>
      </div>
    `;

    document.getElementById("btn-alert-close").addEventListener("click", () => {
      zone.innerHTML = "";
    });

    if (level === "info" || level === "success") {
      alertTimer = setTimeout(() => {
        zone.innerHTML = "";
      }, 6000);
    }
  }

  return {
    initStandardHeader,
    showAlert
  };
})();