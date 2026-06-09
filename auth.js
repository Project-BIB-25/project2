/**
 * auth.js — \u0441\u0435\u0441\u0441\u0438\u043e\u043d\u043d\u0430\u044f \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u0430\u0446\u0438\u044f / \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f \u0434\u043b\u044f Inter_mag1
 * \u0414\u0430\u043d\u043d\u044b\u0435 \u0445\u0440\u0430\u043d\u044f\u0442\u0441\u044f \u0432 localStorage (\u0431\u0435\u0437 \u0431\u044d\u043a\u0435\u043d\u0434\u0430)
 */

;(function () {
  'use strict'

  // ── localStorage helpers ─────────────────────────────────────
  function getUsers()    { return JSON.parse(localStorage.getItem('auth_users') || '[]') }
  function getUser()     { return JSON.parse(localStorage.getItem('auth_user')  || 'null') }
  function saveUser(u)   { localStorage.setItem('auth_user', JSON.stringify(u)) }
  function clearUser()   { localStorage.removeItem('auth_user') }

  function authLogin(email, password) {
    var users = getUsers()
    var found = users.find(function(u) { return u.email === email && u.password === password })
    if (!found) return '\u041d\u0435\u0432\u0435\u0440\u043d\u044b\u0439 email \u0438\u043b\u0438 \u043f\u0430\u0440\u043e\u043b\u044c'
    saveUser(found)
    return null
  }

  function authLogout() { clearUser() }

  function authRegister(name, email, password) {
    var users = getUsers()
    if (users.find(function(u) { return u.email === email }))
      return '\u042d\u0442\u043e\u0442 email \u0443\u0436\u0435 \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u043d'
    var newUser = { id: Date.now(), name: name, email: email, password: password }
    users.push(newUser)
    localStorage.setItem('auth_users', JSON.stringify(users))
    saveUser(newUser)
    return null
  }

  // ── DOM injection ────────────────────────────────────────────
  function injectModal() {
    var html = [
      '<div id="authOverlay" class="auth-overlay" style="display:none" role="dialog" aria-modal="true">',
      '  <div class="auth-modal" id="authModal">',
      '    <div class="auth-modal-head">',
      '      <h2 class="auth-title" id="authModalTitle">\u0412\u0445\u043e\u0434 \u0432 \u0430\u043a\u043a\u0430\u0443\u043d\u0442</h2>',
      '      <button class="auth-close" id="authCloseBtn" aria-label="\u0417\u0430\u043a\u0440\u044b\u0442\u044c">&times;</button>',
      '    </div>',
      '    <div class="auth-tabs">',
      '      <button class="auth-tab auth-tab--active" id="tabLogin">\u0412\u043e\u0439\u0442\u0438</button>',
      '      <button class="auth-tab" id="tabRegister">\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u0442\u044c\u0441\u044f</button>',
      '    </div>',
      '    <div id="authMsg"></div>',
      '    <!-- \u0424\u043e\u0440\u043c\u0430 \u0432\u0445\u043e\u0434\u0430 -->',
      '    <form class="auth-form" id="formLogin">',
      '      <label class="auth-label">',
      '        <span>Email</span>',
      '        <input class="auth-input" type="email" id="loginEmail" placeholder="you@example.com" required>',
      '      </label>',
      '      <label class="auth-label">',
      '        <span>\u041f\u0430\u0440\u043e\u043b\u044c</span>',
      '        <input class="auth-input" type="password" id="loginPassword" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" required>',
      '      </label>',
      '      <button class="btn auth-submit" type="submit">\u0412\u043e\u0439\u0442\u0438</button>',
      '      <p class="auth-hint">\u041d\u0435\u0442 \u0430\u043a\u043a\u0430\u0443\u043d\u0442\u0430? <a href="#" class="auth-link" id="switchToReg">\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u0443\u0439\u0442\u0435\u0441\u044c</a></p>',
      '    </form>',
      '    <!-- \u0424\u043e\u0440\u043c\u0430 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438 -->',
      '    <form class="auth-form" id="formRegister" style="display:none">',
      '      <label class="auth-label">',
      '        <span>\u0418\u043c\u044f</span>',
      '        <input class="auth-input" type="text" id="regName" placeholder="\u0418\u0432\u0430\u043d \u041f\u0435\u0442\u0440\u043e\u0432" required>',
      '      </label>',
      '      <label class="auth-label">',
      '        <span>Email</span>',
      '        <input class="auth-input" type="email" id="regEmail" placeholder="you@example.com" required>',
      '      </label>',
      '      <label class="auth-label">',
      '        <span>\u041f\u0430\u0440\u043e\u043b\u044c</span>',
      '        <input class="auth-input" type="password" id="regPassword" placeholder="\u043c\u0438\u043d\u0438\u043c\u0443\u043c 4 \u0441\u0438\u043c\u0432\u043e\u043b\u0430" required>',
      '      </label>',
      '      <label class="auth-label">',
      '        <span>\u041f\u043e\u0432\u0442\u043e\u0440\u0438\u0442\u0435 \u043f\u0430\u0440\u043e\u043b\u044c</span>',
      '        <input class="auth-input" type="password" id="regConfirm" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" required>',
      '      </label>',
      '      <button class="btn auth-submit" type="submit">\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u0442\u044c\u0441\u044f</button>',
      '      <p class="auth-hint">\u0423\u0436\u0435 \u0435\u0441\u0442\u044c \u0430\u043a\u043a\u0430\u0443\u043d\u0442? <a href="#" class="auth-link" id="switchToLogin">\u0412\u043e\u0439\u0442\u0438</a></p>',
      '    </form>',
      '  </div>',
      '</div>'
    ].join('\n')

    var div = document.createElement('div')
    div.innerHTML = html
    document.body.appendChild(div.firstElementChild)
  }

  function injectNavButton() {
    var nav = document.querySelector('#nav .nav-list') || document.querySelector('.nav-list')
    if (!nav) return

    var li = document.createElement('li')
    li.id = 'authNavItem'
    nav.appendChild(li)
    updateNavButton()
  }

  function updateNavButton() {
    var li = document.getElementById('authNavItem')
    if (!li) return
    var user = getUser()
    if (user) {
      li.innerHTML =
        '<span class="auth-nav-user">\uD83D\uDC64 ' + escHtml(user.name) + '</span>' +
        ' <a href="#" class="auth-nav-logout" id="authLogoutLink">\u0412\u044b\u0439\u0442\u0438</a>'
      var logoutLink = document.getElementById('authLogoutLink')
      if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
          e.preventDefault()
          authLogout()
          updateNavButton()
        })
      }
    } else {
      li.innerHTML = '<a href="#" class="auth-nav-btn" id="authOpenBtn">\uD83D\uDD12 \u0412\u043e\u0439\u0442\u0438</a>'
      var openBtn = document.getElementById('authOpenBtn')
      if (openBtn) {
        openBtn.addEventListener('click', function(e) {
          e.preventDefault()
          openModal('login')
        })
      }
    }
  }

  function escHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
  }

  // ── Modal open / close ───────────────────────────────────────
  function openModal(tab) {
    var overlay = document.getElementById('authOverlay')
    if (!overlay) return
    overlay.style.display = 'flex'
    clearMsg()
    switchTab(tab || 'login')
    document.getElementById('loginEmail') && document.getElementById('loginEmail').focus()
  }

  function closeModal() {
    var overlay = document.getElementById('authOverlay')
    if (overlay) overlay.style.display = 'none'
    clearMsg()
  }

  function clearMsg() {
    var msg = document.getElementById('authMsg')
    if (msg) msg.innerHTML = ''
  }

  function showMsg(text, type) {
    var msg = document.getElementById('authMsg')
    if (!msg) return
    var cls = type === 'ok' ? 'auth-success' : 'auth-error'
    msg.innerHTML = '<div class="' + cls + '">' + escHtml(text) + '</div>'
  }

  function switchTab(tab) {
    var tl = document.getElementById('tabLogin')
    var tr = document.getElementById('tabRegister')
    var fl = document.getElementById('formLogin')
    var fr = document.getElementById('formRegister')
    var title = document.getElementById('authModalTitle')
    clearMsg()
    if (tab === 'login') {
      tl && tl.classList.add('auth-tab--active')
      tr && tr.classList.remove('auth-tab--active')
      fl && (fl.style.display = '')
      fr && (fr.style.display = 'none')
      if (title) title.textContent = '\uD83D\uDD12 \u0412\u0445\u043e\u0434 \u0432 \u0430\u043a\u043a\u0430\u0443\u043d\u0442'
    } else {
      tr && tr.classList.add('auth-tab--active')
      tl && tl.classList.remove('auth-tab--active')
      fr && (fr.style.display = '')
      fl && (fl.style.display = 'none')
      if (title) title.textContent = '\uD83D\uDD13 \u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f'
    }
  }

  // ── Event wiring ─────────────────────────────────────────────
  function wireEvents() {
    // close
    document.getElementById('authCloseBtn').addEventListener('click', closeModal)
    document.getElementById('authOverlay').addEventListener('click', function(e) {
      if (e.target === this) closeModal()
    })
    // Esc
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeModal()
    })
    // tabs
    document.getElementById('tabLogin').addEventListener('click', function() { switchTab('login') })
    document.getElementById('tabRegister').addEventListener('click', function() { switchTab('register') })
    document.getElementById('switchToReg').addEventListener('click', function(e) { e.preventDefault(); switchTab('register') })
    document.getElementById('switchToLogin').addEventListener('click', function(e) { e.preventDefault(); switchTab('login') })

    // login form
    document.getElementById('formLogin').addEventListener('submit', function(e) {
      e.preventDefault()
      var email = document.getElementById('loginEmail').value.trim()
      var password = document.getElementById('loginPassword').value
      var err = authLogin(email, password)
      if (err) { showMsg(err, 'error'); return }
      showMsg('\u0412\u044b \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u0432\u043e\u0448\u043b\u0438!', 'ok')
      setTimeout(function() { closeModal(); updateNavButton() }, 900)
    })

    // register form
    document.getElementById('formRegister').addEventListener('submit', function(e) {
      e.preventDefault()
      var name     = document.getElementById('regName').value.trim()
      var email    = document.getElementById('regEmail').value.trim()
      var password = document.getElementById('regPassword').value
      var confirm  = document.getElementById('regConfirm').value
      if (!name)               { showMsg('\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043c\u044f', 'error'); return }
      if (password.length < 4) { showMsg('\u041f\u0430\u0440\u043e\u043b\u044c \u043c\u0438\u043d\u0438\u043c\u0443\u043c 4 \u0441\u0438\u043c\u0432\u043e\u043b\u0430', 'error'); return }
      if (password !== confirm) { showMsg('\u041f\u0430\u0440\u043e\u043b\u0438 \u043d\u0435 \u0441\u043e\u0432\u043f\u0430\u0434\u0430\u044e\u0442', 'error'); return }
      var err = authRegister(name, email, password)
      if (err) { showMsg(err, 'error'); return }
      showMsg('\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f \u0443\u0441\u043f\u0435\u0448\u043d\u0430!', 'ok')
      setTimeout(function() { closeModal(); updateNavButton() }, 900)
    })
  }

  // ── Init ─────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function() {
    injectModal()
    injectNavButton()
    wireEvents()
  })

})()