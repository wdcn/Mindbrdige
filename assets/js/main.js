// MindBridge — progressive enhancements. The site reads fine without JS.
(function () {
  "use strict";
  var root = document.documentElement;
  root.classList.add("js");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Mobile nav
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "Close" : "Menu";
    });
  }

  // Footer year
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Rotating multilingual label
  var list = document.querySelector(".phrases");
  if (list && !reduceMotion) {
    var items = list.querySelectorAll("li");
    var i = 0;
    items[0].classList.add("is-active");
    setInterval(function () {
      items[i].classList.remove("is-active");
      i = (i + 1) % items.length;
      items[i].classList.add("is-active");
    }, 2600);
  }

  // ---------------------------------------------------------------
  // Constellation: outlined triangular particles forming a shape.
  // Usage: <div class="constellation" data-shape="mind|bridge|voices"><canvas></canvas></div>
  // ---------------------------------------------------------------
  var PALETTE = ["#8052ff", "#8052ff", "#a98bff", "#ffb829", "#ffb829", "#1fae90", "#15846e", "#e256c8", "#4f86ff", "#6f5cff"];

  function rand(a, b) { return a + Math.random() * (b - a); }
  function gauss() { return (Math.random() + Math.random() + Math.random() - 1.5) / 1.5; }

  // Shape samplers return points in a unit space roughly [-1, 1] x [-1, 1].
  var SHAPES = {
    // Two-lobed mind with cerebellum and stem; wobbly outline for an organic edge.
    mind: function () {
      for (;;) {
        var x = rand(-1, 1), y = rand(-1, 1);
        var t = Math.atan2(y + 0.05, x / 1.18);
        var r = Math.hypot(x / 1.18, (y + 0.05) / 0.82);
        var edge = 0.86 + 0.05 * Math.sin(t * 7) + 0.035 * Math.sin(t * 13 + 1.3);
        var inCortex = r < edge && y < 0.5;
        var inCereb = Math.hypot((x - 0.42) / 0.36, (y - 0.5) / 0.2) < 1;
        var inStem = Math.abs(x - 0.12 + (y - 0.55) * 0.35) < 0.09 && y > 0.4 && y < 0.95;
        if (inCortex || inCereb || inStem) {
          // Denser toward the outline and along folds.
          var fold = Math.abs(Math.sin(x * 9 + Math.sin(y * 6) * 1.4));
          if (inCortex && Math.random() > 0.35 + 0.55 * Math.pow(r / edge, 2) * (0.6 + 0.4 * fold)) continue;
          return [x * 0.92, y * 0.92];
        }
      }
    },
    // Suspension bridge: two towers, sagging main cable, deck, hangers.
    bridge: function () {
      var T = 0.62, TOP = -0.52, DECK = 0.3, SAG = 0.14;
      function cable(x) {
        var ax = Math.abs(x);
        if (ax <= T) return SAG - (SAG - TOP) * Math.pow(ax / T, 2);
        return TOP + (DECK - TOP) * ((ax - T) / (1 - T));
      }
      var k = Math.random(), x = rand(-1, 1);
      if (k < 0.38) return [x, cable(x) + gauss() * 0.03];                 // main cable
      if (k < 0.66) return [x, DECK + gauss() * 0.028];                    // deck
      if (k < 0.84) {                                                      // hangers
        var hx = Math.round(x * 9) / 9;
        if (Math.abs(Math.abs(hx) - T) < 0.05) hx += 0.11;
        var top = cable(hx);
        return [hx + gauss() * 0.01, rand(Math.min(top, DECK), DECK)];
      }
      var side = Math.random() < 0.5 ? -T : T;                             // towers
      return [side + gauss() * 0.022, rand(TOP - 0.06, 0.72)];
    },
    // Many voices converging: small clusters around a ring, streams into a shared centre.
    voices: function () {
      var n = 7, k = Math.random();
      if (k < 0.28) return [gauss() * 0.2, gauss() * 0.2];
      var c = Math.floor(Math.random() * n);
      var a = c * (Math.PI * 2 / n) + 0.5 + (c % 2) * 0.18;
      var R = 0.72 + (c % 3) * 0.06;
      var bx = Math.cos(a) * R, by = Math.sin(a) * R * 0.86;
      if (k < 0.72) return [bx + gauss() * 0.11, by + gauss() * 0.11];
      var t = Math.pow(Math.random(), 0.8);                                 // stream inward
      var spread = 0.07 * (1 - t) + 0.02;
      return [bx * (1 - t) + gauss() * spread, by * (1 - t) + gauss() * spread];
    }
  };

  function Constellation(host) {
    this.host = host;
    this.canvas = host.querySelector("canvas") || host.appendChild(document.createElement("canvas"));
    this.ctx = this.canvas.getContext("2d");
    this.shape = SHAPES[host.dataset.shape] || SHAPES.mind;
    this.density = parseFloat(host.dataset.density || "1");
    this.assemble = host.dataset.assemble === "true" && !reduceMotion;
    this.mouse = { x: -9999, y: -9999 };
    this.visible = true;
    this.start = performance.now();
    this.resize();
    var self = this;
    window.addEventListener("resize", function () { self.resize(); self.draw(99); });
    host.addEventListener("pointermove", function (e) {
      var r = self.canvas.getBoundingClientRect();
      self.mouse.x = e.clientX - r.left; self.mouse.y = e.clientY - r.top;
    });
    host.addEventListener("pointerleave", function () { self.mouse.x = self.mouse.y = -9999; });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        self.visible = entries[0].isIntersecting;
        if (self.visible && !reduceMotion) self.loop();
      }).observe(host);
    }
    this.draw(this.assemble ? 0 : 99);
    if (!reduceMotion) this.loop();
  }

  Constellation.prototype.resize = function () {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = this.host.clientWidth, h = this.host.clientHeight;
    if (!w || !h) return;
    this.w = w; this.h = h;
    this.canvas.width = Math.round(w * dpr);
    this.canvas.height = Math.round(h * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var count = Math.round(Math.min(1800, (w * h) / 190) * this.density);
    var scale = Math.min(w, h) * (parseFloat(this.host.dataset.scale || "0.5"));
    var cx = w / 2, cy = h / 2;
    this.particles = [];
    for (var i = 0; i < count; i++) {
      var ambient = Math.random() < 0.14;
      var p = ambient ? [rand(-1, 1) * (w / 2 / scale), rand(-1, 1) * (h / 2 / scale)] : this.shape();
      var hx = cx + p[0] * scale, hy = cy + p[1] * scale;
      this.particles.push({
        hx: hx, hy: hy,
        sx: cx + rand(-1.4, 1.4) * w * 0.5, sy: cy + rand(-1.4, 1.4) * h * 0.5,
        size: ambient ? rand(1.6, 3) : rand(1.8, 4.2),
        rot: rand(0, Math.PI * 2), spin: rand(-0.6, 0.6),
        phase: rand(0, Math.PI * 2), amp: ambient ? rand(3, 9) : rand(0.6, 2.6),
        color: PALETTE[(Math.random() * PALETTE.length) | 0],
        alpha: ambient ? rand(0.18, 0.45) : rand(0.55, 1),
        delay: rand(0, 0.35)
      });
    }
  };

  Constellation.prototype.loop = function () {
    if (this.running) return;
    this.running = true;
    var self = this;
    function frame(now) {
      if (!self.visible) { self.running = false; return; }
      self.draw((now - self.start) / 1000);
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  };

  function ease(t) { return t < 0 ? 0 : t > 1 ? 1 : 1 - Math.pow(1 - t, 3); }

  Constellation.prototype.draw = function (t) {
    var ctx = this.ctx, ps = this.particles;
    if (!ps) return;
    ctx.clearRect(0, 0, this.w, this.h);
    ctx.lineWidth = 1.1;
    ctx.lineJoin = "miter";
    var mx = this.mouse.x, my = this.mouse.y;
    for (var i = 0; i < ps.length; i++) {
      var p = ps[i];
      var x = p.hx + Math.sin(t * 0.6 + p.phase) * p.amp;
      var y = p.hy + Math.cos(t * 0.5 + p.phase * 1.3) * p.amp;
      if (this.assemble) {
        var k = ease((t - p.delay) / 2.2);
        x = p.sx + (x - p.sx) * k;
        y = p.sy + (y - p.sy) * k;
      }
      // Gentle push away from the pointer.
      var dx = x - mx, dy = y - my, d2 = dx * dx + dy * dy;
      if (d2 < 6400) {
        var f = (1 - Math.sqrt(d2) / 80) * 14;
        var d = Math.sqrt(d2) || 1;
        x += (dx / d) * f; y += (dy / d) * f;
      }
      var a = p.rot + t * p.spin;
      var s = p.size;
      var tw = 0.75 + 0.25 * Math.sin(t * 1.4 + p.phase * 2);
      ctx.globalAlpha = p.alpha * tw;
      ctx.strokeStyle = p.color;
      ctx.beginPath();
      ctx.moveTo(x + Math.cos(a) * s, y + Math.sin(a) * s);
      ctx.lineTo(x + Math.cos(a + 2.094) * s, y + Math.sin(a + 2.094) * s);
      ctx.lineTo(x + Math.cos(a + 4.189) * s, y + Math.sin(a + 4.189) * s);
      ctx.closePath();
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  };

  document.querySelectorAll(".constellation").forEach(function (el) {
    if (el.getContext || !document.createElement("canvas").getContext) return;
    new Constellation(el);
  });
})();

// Donate form: live button label; hands off to processor URL (or email until one is set).
(function () {
  var form = document.querySelector("form.donate");
  if (!form) return;
  var btn = form.querySelector("button[type=submit]");
  var other = form.querySelector(".other-amount");
  var otherInput = other.querySelector("input");

  function state() {
    var freq = form.querySelector("input[name=frequency]:checked").value;
    var pick = form.querySelector("input[name=amount]:checked");
    var amt = pick ? pick.value : "";
    other.hidden = amt !== "other";
    if (amt === "other") amt = otherInput.value && Number(otherInput.value) > 0 ? String(Math.round(Number(otherInput.value))) : "";
    return { freq: freq, amt: amt };
  }
  function render() {
    var s = state();
    btn.textContent = s.amt ? "Donate $" + s.amt + (s.freq === "monthly" ? " monthly" : "") : "Donate";
  }
  form.addEventListener("change", render);
  otherInput.addEventListener("input", render);
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var s = state();
    if (!s.amt) { otherInput.focus(); return; }
    var url = form.dataset.processorUrl;
    if (url) {
      var u = new URL(url, location.href);
      u.searchParams.set("amount", s.amt);
      u.searchParams.set("frequency", s.freq);
      location.href = u.toString();
    } else {
      var subject = "Donation: $" + s.amt + " " + (s.freq === "monthly" ? "monthly" : "one time");
      var body = "Hi MindBridge,\n\nI'd like to give $" + s.amt + (s.freq === "monthly" ? " each month" : "") + ". Please let me know how to complete my gift.\n\nThank you.";
      location.href = "mailto:" + form.dataset.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    }
  });
  render();
})();
