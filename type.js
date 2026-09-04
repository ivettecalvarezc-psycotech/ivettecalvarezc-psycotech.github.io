(function(){
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = document.querySelectorAll('.eyebrow');
  if(!els.length) return;
  if(reduceMotion) return;

  function typeEyebrow(el){
    var text = el.textContent.trim();
    if(!text) return;
    el.textContent = '';
    var wrap = document.createElement('span');
    var textSpan = document.createElement('span');
    var cursor = document.createElement('span');
    cursor.className = 'type-cursor';
    wrap.appendChild(textSpan);
    wrap.appendChild(cursor);
    el.appendChild(wrap);
    var i = 0;
    function tick(){
      if(i <= text.length){
        textSpan.textContent = text.slice(0, i);
        i++;
        setTimeout(tick, 28);
      } else {
        setTimeout(function(){ if(cursor.parentNode) cursor.parentNode.removeChild(cursor); }, 700);
      }
    }
    tick();
  }

  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          typeEyebrow(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, {threshold:.4});
    els.forEach(function(el){ io.observe(el); });
  } else {
    els.forEach(function(el){ typeEyebrow(el); });
  }
})();
