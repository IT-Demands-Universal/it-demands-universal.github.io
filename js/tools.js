(function () {
  function wire(id, cfg) {
    var f = document.getElementById(id);
    if (!f) return;

    var boxes = [].slice.call(f.querySelectorAll('input[type="checkbox"]'));
    var ports = [].slice.call(f.querySelectorAll('.port'));
    var selects = [].slice.call(f.querySelectorAll('select'));
    var res = f.querySelector('.res');
    var tips = f.querySelector('.tips');
    var send = f.querySelector('.send');
    var summary = '';

    function update() {
      var picked = boxes.filter(function (b) { return b.checked; });

      boxes.forEach(function (b, i) {
        if (ports[i]) ports[i].classList.toggle('on', b.checked);
      });

      res.textContent = picked.length ? cfg.some(picked.length) : cfg.none;
      tips.textContent = cfg.tips
        ? picked.slice(0, 2).map(function (b) { return b.getAttribute('data-tip'); }).join(' ')
        : '';

      var lines = [cfg.intro];
      picked.forEach(function (b) { lines.push('- ' + b.nextElementSibling.textContent); });
      selects.forEach(function (s) { lines.push(s.getAttribute('data-label') + ': ' + s.value); });
      summary = lines.join('\n');
    }

    // hand the choices to the call-back form, then the link scrolls down to it
    send.addEventListener('click', function () {
      var ta = document.querySelector('#request [name="message"]');
      if (ta) ta.value = summary;
    });

    f.addEventListener('change', update);
    update();
  }

  wire('install', {
    intro: 'Install request:',
    tips: false,
    none: 'Pick what you need.',
    some: function (n) { return n + ' selected. Photos of the space and any equipment help me quote faster.'; }
  });

  wire('triage', {
    intro: 'What’s going on:',
    tips: true,
    none: 'Tick what’s happening.',
    some: function (n) { return n + ' noted. Here’s what to do first:'; }
  });
})();
