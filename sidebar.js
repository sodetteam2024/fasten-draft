(function () {
  var SIDEBAR_HTML = `
<aside class="sidebar" id="sidebar">
  <div class="sidebar-toggle" onclick="toggleSidebar()"><i data-lucide="chevron-right"></i></div>
  <div class="sidebar-inner">
    <div class="sidebar-logo">
      <div class="logo-mark">F</div>
      <span class="logo-name">FASTEN</span>
    </div>
    <nav class="sidebar-nav">
      <a href="dashboard.html"     class="nav-item" data-page="dashboard.html"     data-label="Inicio"><i data-lucide="house"></i><span class="nav-label">Inicio</span></a>
      <a href="pagos.html"         class="nav-item" data-page="pagos.html"         data-label="Pagos"><i data-lucide="credit-card"></i><span class="nav-label">Pagos</span><span class="nav-badge">10</span></a>
      <a href="publicaciones.html" class="nav-item" data-page="publicaciones.html" data-label="Publicaciones"><i data-lucide="megaphone"></i><span class="nav-label">Publicaciones</span></a>
      <a href="solicitudes.html"   class="nav-item" data-page="solicitudes.html"   data-label="Solicitudes"><i data-lucide="message-square-warning"></i><span class="nav-label">Solicitudes</span><span class="nav-badge">7</span></a>
      <a href="reservas.html"      class="nav-item" data-page="reservas.html"      data-label="Reservas"><i data-lucide="calendar-check"></i><span class="nav-label">Reservas</span></a>
    </nav>
    <div class="sidebar-divider"></div>
    <div class="sidebar-footer">
      <div class="user-trigger" id="userTrigger" onclick="toggleUserMenu()">
        <div class="user-avatar">GP</div>
        <div class="user-texts">
          <div class="user-name">Gustavo Petro</div>
          <div class="user-role">Administrador</div>
        </div>
        <div class="user-dropdown" id="userDropdown" onclick="event.stopPropagation()">
          <div class="ud-profile">
            <div class="ud-avatar">GP</div>
            <div class="ud-profile-info">
              <div class="ud-name">Gustavo Petro</div>
              <span class="ud-role-badge">Admin</span>
              <div class="ud-email">gpetro@lospinos.co</div>
            </div>
          </div>
          <div class="ud-plan-block">
            <div class="ud-plan-label">Plan Actual</div>
            <div class="ud-plan-row">
              <div class="ud-plan-info">
                <i data-lucide="sparkles"></i>
                <span class="ud-plan-name">Plan Pro</span>
                <span class="ud-plan-sep">·</span>
                <span class="ud-plan-units">50 unidades</span>
              </div>
              <a href="#" class="ud-plan-manage">Gestionar</a>
            </div>
          </div>
          <div class="ud-actions">
            <a href="configuracion.html" class="ud-action-item"><i data-lucide="settings-2"></i><span>Configuración</span></a>
            <div class="ud-divider"></div>
            <div class="ud-action-item ud-logout"><i data-lucide="log-out"></i><span>Cerrar sesión</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</aside>`;

  var MOBILE_HEADER_HTML = `
<header class="mobile-header">
  <div class="mobile-logo">
    <div class="logo-mark">F</div>
    <span class="mobile-logo-name">FASTEN</span>
  </div>
  <div class="mobile-header-right">
    <span class="mobile-conjunto-pill">Los Pinos</span>
    <div class="mobile-user-btn" id="mobileUserBtn" onclick="toggleMobileMenu()">
      GP
      <div class="mobile-user-dropdown" id="mobileUserMenu">
        <div class="ud-profile">
          <div class="ud-avatar">GP</div>
          <div class="ud-profile-info">
            <div class="ud-name">Gustavo Petro</div>
            <span class="ud-role-badge">Admin</span>
            <div class="ud-email">gpetro@lospinos.co</div>
          </div>
        </div>
        <div class="ud-plan-block">
          <div class="ud-plan-label">Plan Actual</div>
          <div class="ud-plan-row">
            <div class="ud-plan-info">
              <i data-lucide="sparkles"></i>
              <span class="ud-plan-name">Plan Pro</span>
              <span class="ud-plan-sep">·</span>
              <span class="ud-plan-units">50 unidades</span>
            </div>
            <a href="#" class="ud-plan-manage">Gestionar</a>
          </div>
        </div>
        <div class="ud-actions">
          <a href="configuracion.html" class="ud-action-item"><i data-lucide="settings-2"></i><span>Configuración</span></a>
          <div class="ud-divider"></div>
          <div class="ud-action-item ud-logout"><i data-lucide="log-out"></i><span>Cerrar sesión</span></div>
        </div>
      </div>
    </div>
  </div>
</header>`;

  var BOTTOM_NAV_HTML = `
<nav class="bottom-nav">
  <a href="dashboard.html"     class="bottom-nav-item" data-page="dashboard.html"><i data-lucide="home"></i><span class="bottom-nav-label">Inicio</span></a>
  <a href="pagos.html"         class="bottom-nav-item" data-page="pagos.html"><i data-lucide="credit-card"></i><span class="bottom-nav-label">Pagos</span><span class="bottom-nav-badge">10</span></a>
  <a href="publicaciones.html" class="bottom-nav-item" data-page="publicaciones.html"><i data-lucide="megaphone"></i><span class="bottom-nav-label">Noticias</span></a>
  <a href="solicitudes.html"   class="bottom-nav-item" data-page="solicitudes.html"><i data-lucide="message-square-warning"></i><span class="bottom-nav-label">Solicitudes</span><span class="bottom-nav-badge">7</span></a>
  <a href="reservas.html"      class="bottom-nav-item" data-page="reservas.html"><i data-lucide="calendar-check"></i><span class="bottom-nav-label">Reservas</span></a>
</nav>`;

  // Inject HTML into placeholder
  var container = document.getElementById('sidebar-container');
  if (!container) return;
  var wrapper = document.createRange().createContextualFragment(
    SIDEBAR_HTML + MOBILE_HEADER_HTML + BOTTOM_NAV_HTML
  );
  container.replaceWith(wrapper);

  // Mark active nav item based on current page filename
  var page = (window.location.pathname.split('/').pop() || 'dashboard.html').toLowerCase();
  document.querySelectorAll('.nav-item[data-page]').forEach(function (el) {
    if (el.dataset.page === page) el.classList.add('active');
  });
  document.querySelectorAll('.bottom-nav-item[data-page]').forEach(function (el) {
    if (el.dataset.page === page) el.classList.add('active');
  });

  // Sidebar open/close — suppress transition on initial load
  document.body.classList.add('sidebar-init');
  var sidebar = document.getElementById('sidebar');
  if (localStorage.getItem('fasten-sidebar') === 'open') sidebar.classList.add('open');
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      document.body.classList.remove('sidebar-init');
    });
  });

  window.toggleSidebar = function () {
    sidebar.classList.toggle('open');
    localStorage.setItem('fasten-sidebar', sidebar.classList.contains('open') ? 'open' : 'closed');
  };

  // Desktop user dropdown — opens to the right of the sidebar
  var userTrigger = document.getElementById('userTrigger');
  var userDropdown = document.getElementById('userDropdown');

  window.toggleUserMenu = function () {
    var isOpen = userDropdown.classList.toggle('open');
    if (isOpen) {
      var sr = sidebar.getBoundingClientRect();
      var tr = userTrigger.getBoundingClientRect();
      userDropdown.style.left   = (sr.right + 8) + 'px';
      userDropdown.style.bottom = (window.innerHeight - tr.bottom) + 'px';
      userDropdown.style.top    = 'auto';
      userDropdown.style.width  = '260px';
    }
  };

  // Mobile user dropdown
  window.toggleMobileMenu = function () {
    document.getElementById('mobileUserMenu').classList.toggle('open');
  };

  // Click-outside closes both dropdowns
  document.addEventListener('click', function (e) {
    if (userTrigger && !userTrigger.contains(e.target)) {
      userDropdown.classList.remove('open');
    }
    var mobileBtn = document.getElementById('mobileUserBtn');
    if (mobileBtn && !mobileBtn.contains(e.target)) {
      document.getElementById('mobileUserMenu').classList.remove('open');
    }
  });
})();