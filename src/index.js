var ScrollAnimate = function(el, binding) {

  var params = binding.value;
  var modifiers = binding.modifiers;
  var defaultClass = el.className;

  function isInScrollView(rect){
    return rect.top < document.documentElement.clientHeight && rect.bottom > 0;
  }

  return {
    dispatch: function(isUpwards) {
      if(!isInScrollView(el.getBoundingClientRect())) {
        if (modifiers.repeat) { // there will be a decision matrix for isUpwards and params.up or params.down
          // el.className = oldClasses;
        }
        return;
      }

      var classToApply;
      if (typeof params === 'string') {
        classToApply = params;
      }
      else if (params.down && params.up) { // implicit repeat
        classToApply = isUpwards ? params.up : params.down;
      } else {
        classToApply = params.up || params.down;
      }
      el.className = defaultClass + ' ' + classToApply;
    }
  }
}

export default {
  install(Vue, os = {}) {
    var scrollAnimate;
    Vue.directive('animate-onscroll', {
      bind(el, binding) {
        scrollAnimate = ScrollAnimate(el, binding);
      },
      inserted(el, binding) {
        window.addEventListener('scroll', function() {
          var isUpwards = this.oldScroll > this.scrollY;
          scrollAnimate.dispatch(isUpwards);
          this.oldScroll = this.scrollY;
        });
      }
    })
  }
}