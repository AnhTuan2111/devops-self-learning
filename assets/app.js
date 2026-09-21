/* Theme toggle + tự lưu checkbox đã tick trong phần "Tự kiểm tra".
   Mọi thứ đều bọc try/catch: localStorage có thể bị chặn (private mode). */

(function () {
  var root = document.documentElement;

  function read(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function write(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  // --- Theme ---
  var saved = read('devops-theme');
  if (saved === 'dark' || saved === 'light') root.setAttribute('data-theme', saved);

  function currentTheme() {
    var attr = root.getAttribute('data-theme');
    if (attr) return attr;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function paintBtn(btn) { btn.textContent = currentTheme() === 'dark' ? 'Sáng' : 'Tối'; }

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.querySelector('.theme-btn');
    if (btn) {
      paintBtn(btn);
      btn.addEventListener('click', function () {
        var next = currentTheme() === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        write('devops-theme', next);
        paintBtn(btn);
      });
    }

    // --- Checklist: click để đánh dấu đã làm được ---
    var page = document.body.getAttribute('data-lesson') || location.pathname;
    document.querySelectorAll('ul.check li').forEach(function (li, i) {
      var key = 'devops-check:' + page + ':' + i;
      if (read(key) === '1') li.classList.add('done');
      li.style.cursor = 'pointer';
      li.title = 'Bấm để đánh dấu đã nắm được';
      li.addEventListener('click', function () {
        li.classList.toggle('done');
        write(key, li.classList.contains('done') ? '1' : '0');
      });
    });
  });
})();
