(function () {
  var form = document.getElementById('check');
  if (!form) return;

  var boxes = [].slice.call(form.querySelectorAll('input[type="checkbox"]'));
  var ports = [].slice.call(form.querySelectorAll('.port'));
  var result = document.getElementById('result');
  var gapsEl = document.getElementById('gaps');
  var send = document.getElementById('send');
  var total = boxes.length;
  var summary = '';

  function update() {
    var yes = 0;
    var gaps = [];

    boxes.forEach(function (box, i) {
      if (ports[i]) ports[i].classList.toggle('on', box.checked);
      if (box.checked) yes++;
      else gaps.push(box.getAttribute('data-gap'));
    });

    if (yes === 0) {
      result.textContent = 'Tick the boxes that apply.';
    } else if (yes === total) {
      result.textContent = yes + ' of ' + total + ': strong basics. A quick review can still catch what a checklist can’t.';
    } else if (yes >= 4) {
      result.textContent = yes + ' of ' + total + ': a solid start with a few gaps worth closing.';
    } else {
      result.textContent = yes + ' of ' + total + ': several easy wins are available.';
    }

    gapsEl.textContent = gaps.length && yes > 0 ? 'Start here: ' + gaps.slice(0, 3).join(' ') : '';

    summary = 'Security check-up: ' + yes + ' of ' + total + '.' + (gaps.length ? '\n\nGaps:\n- ' + gaps.join('\n- ') : '');
  }

  send.addEventListener('click', function () {
    var ta = document.querySelector('#request [name="message"]');
    if (ta) ta.value = summary;
  });

  boxes.forEach(function (box) { box.addEventListener('change', update); });
  update();
})();
