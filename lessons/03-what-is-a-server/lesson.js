// Riêng Bài 03: Hình 1 là cái máy ở cột trái, đổi cảnh theo đoạn đang đọc ở cột phải (mỗi đoạn mang data-scene); ở màn hẹp
// nó tự chạy qua các cảnh khi đang nằm trên màn hình. Hình 2 kể một đêm server hết RAM, lặp khi đang nằm trên màn hình.
// Bật giảm chuyển động thì mỗi cảnh hiện ngay trạng thái cuối, không chạy. Không có JS thì Hình 1 hiện đủ ba lớp, Hình 2 hiện
// thanh RAM lúc script sao lưu vừa chạy, kèm năm bước bằng chữ.
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const seenState = (el) => {
    const s = { visible: false };
    new IntersectionObserver((e) => { s.visible = e[0].isIntersecting; }, { threshold: 0.2 }).observe(el);
    return s;
  };

  // ======================= Hình 1: cái máy =======================
  const fig = document.querySelector('.machine');
  if (fig) {
    const $ = (sel) => fig.querySelector(sel);
    const $$ = (sel) => [...fig.querySelectorAll(sel)];
    const proc = (p) => $(`.proc[data-p="${p}"]`);
    const seg = (p) => $(`.ram-bar .seg[data-p="${p}"]`);
    const say = (t) => { $('.mc-say').textContent = t; };
    const job = (...names) => $$('.kernel-jobs span').forEach((s) => s.classList.toggle('on', names.includes(s.dataset.k)));
    const hw = (...names) => $$('.hw').forEach((h) => h.classList.toggle('on', names.includes(h.dataset.hw)));
    const port = (num, state) => { const r = $(`.ports tr[data-port="${num}"]`); r.classList.toggle('off', state === 'off'); r.classList.toggle('on', state === 'on'); };
    const file = (f, on) => $(`.file[data-f="${f}"]`).classList.toggle('on', on);
    const ram = (map) => Object.entries(map).forEach(([p, pct]) => { seg(p).style.flexBasis = `${pct}%`; });
    const backupLabel = (name, pid) => { const b = proc('backup'); b.querySelector('b').textContent = name; b.querySelector('span').textContent = pid; seg('backup').querySelector('b').textContent = name; };
    const ramName = (t) => { $('.ram-total').textContent = t; };
    const note = (t) => { $('.ram-note').textContent = t; };
    const NAMES = { java: 'java', nginx: 'nginx', postgres: 'postgres', bash: 'bash', backup: 'sao lưu' };

    // CPU: bốn nhân chia lượt cho các process đang bật, process còn lại đứng ở hàng chờ
    const cores = $$('.core i');
    const queue = $('.q-items');
    const paintCpu = (list, start, animate) => {
      cores.forEach((c, i) => {
        const p = list.length ? list[(start + i) % list.length] : null;
        if (!p || i >= list.length) { c.removeAttribute('data-p'); c.textContent = ''; return; }
        c.dataset.p = p; c.textContent = NAMES[p];
        if (animate) { c.classList.remove('swap'); void c.offsetWidth; c.classList.add('swap'); }
      });
      queue.innerHTML = '';
      if (list.length > cores.length) {
        const w = list[(start + cores.length) % list.length];
        const tag = document.createElement('span'); tag.dataset.p = w; tag.textContent = NAMES[w]; queue.append(tag);
      }
    };

    // Trạng thái nền của mỗi cảnh: process nào bật, RAM chia ra sao, port nào có trong sổ
    const base = (on) => {
      Object.keys(NAMES).forEach((p) => { const el = proc(p); el.classList.toggle('on', on.includes(p)); el.classList.remove('dead', 'hot'); });
      backupLabel('sao lưu', 'PID 2410'); ramName('4 GB'); note('');
      ram({ kernel: 15, nginx: on.includes('nginx') ? 5 : 0, postgres: on.includes('postgres') ? 22.5 : 0, java: on.includes('java') ? 30 : 0, backup: on.includes('backup') ? 7.5 : 0 });
      $$('.ram-bar .seg').forEach((s) => s.classList.remove('marked'));
      $('.ram-bar').classList.remove('full');
      port(443, on.includes('nginx') ? '' : 'off'); port(5432, on.includes('postgres') ? '' : 'off'); port(8080, on.includes('java') ? '' : 'off');
      ['jar', 'log', 'pg'].forEach((f) => file(f, false));
      paintCpu(on, 0, false);
      job(); hw(); say('');
    };

    // Mỗi cảnh chạy một lượt; t.live() thành false khi đã đổi sang cảnh khác
    const SCENES = {
      async box(t) {
        base([]);
        const parts = [['cpu', 'CPU: chạy từng bước của chương trình'], ['ram', 'RAM: giữ dữ liệu chương trình đang dùng'],
          ['disk', 'ổ đĩa: giữ những thứ phải còn sau khi tắt máy, như tệp jar, log'], ['nic', 'card mạng: request của người dùng đi vào qua đây']];
        for (const [h, text] of parts) { hw(h); say(text); if (!(await t.wait(1700))) return; }
        hw('cpu', 'ram', 'disk', 'nic'); say('bốn món ấy cũng có trong laptop của bạn');
        await t.wait(1800);
      },
      async jar(t) {
        base([]); hw('disk'); file('jar', true);
        say('tệp sample-app.jar nằm trên ổ đĩa, 23 MB, không làm gì cả');
        if (!(await t.wait(1900))) return;
        say('gõ java -jar thì hệ điều hành đọc chương trình java lên RAM và cấp cho nó một vùng RAM riêng');
        hw('disk', 'ram'); job('ram', 'disk'); ram({ java: 12 });
        if (!(await t.wait(2000))) return;
        proc('java').classList.add('on'); hw('cpu', 'ram'); job('cpu');
        paintCpu(['java'], 0, true);
        say('CPU chạy chương trình java, giờ nó là một process');
        if (!(await t.wait(1900))) return;
        hw('cpu', 'ram', 'disk'); job('disk');
        say('java đọc tệp jar, nạp các class của bạn, app bắt đầu nhận request'); ram({ java: 30 });
        await t.wait(2600);
      },
      async port(t) {
        base(['java']); hw('nic'); job('port'); port(8080, 'off');
        say('app xin hệ điều hành cho nhận kết nối ở port 8080');
        if (!(await t.wait(1600))) return;
        job('port'); port(8080, 'on');
        say('sổ port ghi thêm một dòng: port 8080 kèm PID 6088');
        await t.wait(2600);
      },
      async kill(t) {
        base(['java']); port(8080, 'on'); file('jar', true);
        say('taskkill //F //PID 6088');
        if (!(await t.wait(1500))) return;
        proc('java').classList.add('dead'); ram({ java: 0 }); port(8080, 'off'); paintCpu([], 0, false);
        hw('ram', 'nic', 'disk');
        say('process chết, hệ điều hành lấy lại RAM và xoá dòng port 8080; tệp jar trên ổ đĩa vẫn còn');
        await t.wait(2800);
      },
      async core(t) {
        base(['java', 'nginx', 'postgres', 'bash']); job('cpu', 'ram', 'port', 'disk');
        say('kernel là lõi của hệ điều hành, nạp lên đầu tiên; nó chia CPU, cấp RAM và ghi sổ port cho các process');
        await t.wait(3000);
      },
      async full(t) {
        base(['nginx', 'postgres', 'java', 'backup']); hw('ram'); job('ram');
        ram({ backup: 27.5 }); $('.ram-bar').classList.add('full');
        say('RAM hết thì kernel không bắt process chờ mà chọn một process để giết');
        await t.wait(3000);
      },
      async kernel(t) {
        base(['java', 'nginx', 'postgres', 'bash']);
        const asks = [['java xin thêm RAM', 'ram', 'ram'], ['java xin đọc tệp sample-app.jar', 'disk', 'disk'], ['java xin nhận kết nối ở port 8080', 'port', 'nic']];
        for (const [text, k, h] of asks) {
          say(`system call: ${text}; kernel kiểm tra rồi làm hộ`); job(k); hw(h);
          if (h === 'disk') file('jar', true); else file('jar', false);
          if (!(await t.wait(1900))) return;
        }
      },
      async cpu(t) {
        const list = ['java', 'nginx', 'postgres', 'bash', 'backup'];
        base(list); hw('cpu'); job('cpu');
        say('bốn nhân mà năm process, nên kernel cho mỗi process chạy một lượt ngắn rồi cất sang bên, đưa process đang chờ vào');
        for (let i = 1; i <= 10; i++) { if (!(await t.wait(900))) return; paintCpu(list, i, true); }
      },
      async ram(t) {
        base(['nginx', 'postgres', 'java']); hw('ram'); job('ram');
        ram({ nginx: 0, postgres: 0, java: 0 });
        const add = [['nginx', 5], ['postgres', 22.5], ['java', 30]];
        for (const [p, pct] of add) {
          if (!(await t.wait(900))) return;
          ram({ [p]: pct }); say(`${p} xin RAM, kernel cấp cho nó một vùng riêng`);
        }
        if (!(await t.wait(1200))) return;
        say('vùng của process nào thuộc về process ấy, process khác không dùng được');
        await t.wait(2200);
      },
      async oom(t) {
        // Thí nghiệm ở bài: python3 trong một nhóm giới hạn 300 MB, mỗi 0,2 giây giữ thêm 50 MB
        base(['bash']); hw('ram'); job('ram');
        ram({ kernel: 0, backup: 0 }); ramName('giới hạn 300 MB'); backupLabel('python3', 'PID 2628');
        proc('backup').classList.add('on');
        for (let mb = 50; mb <= 250; mb += 50) {
          ram({ backup: (mb / 300) * 100 }); note(`held ${mb} MB`); say('python3 giữ thêm 50 MB mỗi 0,2 giây');
          if (!(await t.wait(650))) return;
        }
        $('.ram-bar').classList.add('full'); say('python3 xin thêm 50 MB nữa; cộng phần Python tự dùng là vượt 300 MB');
        if (!(await t.wait(1500))) return;
        proc('backup').classList.add('dead'); ram({ backup: 0 }); $('.ram-bar').classList.remove('full');
        note('Killed process 2628 (python3)'); say('kernel giết PID 2628 ngay, mã thoát 137, không kịp in dòng lỗi nào');
        await t.wait(2600);
      },
      async score(t) {
        base(['nginx', 'postgres', 'java', 'backup']); hw('ram', 'nic'); job('ram');
        say('nửa đêm, script sao lưu giữ RAM mỗi lúc một nhiều');
        for (const pct of [12, 16, 20, 27.5]) { ram({ backup: pct }); if (!(await t.wait(600))) return; }
        $('.ram-bar').classList.add('full'); say('RAM đầy, kernel không còn chỗ để cấp');
        if (!(await t.wait(1500))) return;
        proc('java').classList.add('hot'); seg('java').classList.add('marked'); say('OOM killer chấm điểm, java giữ nhiều RAM nhất');
        if (!(await t.wait(1700))) return;
        proc('java').classList.remove('hot'); proc('java').classList.add('dead'); ram({ java: 0 }); port(8080, 'off');
        $('.ram-bar').classList.remove('full'); say('java bị giết, port 8080 trống, Nginx trả 502 cho người dùng');
        await t.wait(2800);
      },
      async lab() { base(['java', 'nginx', 'postgres', 'bash']); say(''); },
    };

    let current = null, token = 0;
    const play = async (name, loop) => {
      const id = ++token;
      current = name; fig.dataset.scene = name;
      const t = { wait: async (ms) => { if (!reduced) await sleep(ms); return id === token; } };
      do {
        await SCENES[name](t);
        if (id !== token || reduced || !loop) return;
        await sleep(600);
      } while (id === token);
    };

    const wide = matchMedia('(min-width: 1100px)');
    const marks = [...document.querySelectorAll('.reading [data-scene]')];
    const pick = () => {
      const line = innerHeight * 0.45;
      let name = 'box';
      marks.forEach((m) => { if (m.getBoundingClientRect().top <= line) name = m.dataset.scene; });
      if (name !== current) play(name, name !== 'lab');
    };
    if (wide.matches) {
      let frame = 0;
      addEventListener('scroll', () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(pick); }, { passive: true });
      pick();
    } else {
      // Màn hẹp: cái máy nằm trên đầu bài, tự chạy qua các cảnh khi đang trên màn hình
      const seen = seenState(fig);
      const order = ['box', 'jar', 'port', 'kill', 'core', 'kernel', 'cpu', 'ram', 'full', 'oom', 'score'];
      if (reduced) { play('lab', false); }
      else {
        (async () => {
          for (let i = 0; ; i = (i + 1) % order.length) {
            while (!seen.visible) await sleep(400);
            await play(order[i], false);
            await sleep(500);
          }
        })();
      }
    }
  }

  // ======================= Hình 2: một đêm hết RAM, lặp lại câu chuyện =======================
  const night = document.querySelector('.ram');
  if (night && !reduced) {
    const seg = (p) => night.querySelector(`.seg[data-p="${p}"]`);
    const steps = [...night.querySelectorAll('.ram-log li')];
    const bar = night.querySelector('.ram-bar');
    const seen = seenState(night);
    // Chờ khi hình ra khỏi màn hình, để câu chuyện không trôi mất lúc không ai xem
    const hold = async (ms) => { await sleep(ms); while (!seen.visible) await sleep(250); };
    const step = (i) => steps.forEach((li, k) => li.classList.toggle('now', k === i));
    const width = (p, pct) => { seg(p).style.flexBasis = `${pct}%`; };
    (async () => {
      for (;;) {
        bar.classList.remove('full'); seg('java').classList.remove('marked');
        width('java', 42.5); width('backup', 0);
        step(0); await hold(2200);
        step(1);
        for (const pct of [3, 6, 9, 12, 15]) { width('backup', pct); await hold(450); }
        bar.classList.add('full'); step(2); await hold(1600);
        seg('java').classList.add('marked'); step(3); await hold(1800);
        width('java', 0); bar.classList.remove('full'); step(4); await hold(2800);
      }
    })();
  }
})();
