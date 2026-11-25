(function () {
  // Paste your form service link here (for example a Formspree link like https://formspree.io/f/abcdwxyz).
  // While this is empty, the form opens the visitor's email app with their answers filled in.
  var ENDPOINT = '';
  var TO = 'itdemandsuniversal@gmail.com';

  var form = document.getElementById('request');
  if (!form) return;
  var status = form.querySelector('.status');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var d = new FormData(form);
    var topic = form.getAttribute('data-topic') || 'Website';
    if (d.get('_gotcha')) return;

    if (!ENDPOINT) {
      var body = 'Name: ' + d.get('name') + '\nPhone: ' + d.get('phone') + '\nTown: ' + d.get('town') +
        '\nBest time to call: ' + d.get('time') + '\n\n' + d.get('message');
      window.location.href = 'mailto:' + TO + '?subject=' + encodeURIComponent(topic + ' request') +
        '&body=' + encodeURIComponent(body);
      status.textContent = 'Your email app should open. If it doesn’t, please call or text 352-626-8805.';
      return;
    }

    d.append('topic', topic);
    status.textContent = 'Sending…';
    fetch(ENDPOINT, { method: 'POST', body: d, headers: { Accept: 'application/json' } })
      .then(function (r) {
        if (!r.ok) throw new Error('failed');
        form.reset();
        status.textContent = 'Thank you! I’ll call you back as soon as I can.';
      })
      .catch(function () {
        status.textContent = 'Something went wrong. Please call or text 352-626-8805.';
      });
  });
})();
