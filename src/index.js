var ScrollAnimate = function(el, binding) {

  var params = binding.value;
  var modifiers = binding.modifiers;
  var oldClasses = el.className;

  function isInScrollView(rect){
    return rect.top < document.documentElement.clientHeight && rect.bottom > 0;
  }

  function shouldResetAnimation(isUpwards) {
    return modifiers.repeat &&
      (isUpwards && params.down || !isUpwards && params.up);
  }

  return {
    dispatch: function(isUpwards) {
      if(!isInScrollView(el.getBoundingClientRect())) {
        return;
      }

      if (typeof params === 'string') { // implicit repeat
        el.className = params;
        return;
      }

      if (params.down && params.up) { // implicit repeat
        el.className = isUpwards ? params.up : params.down;
        return;
      }
      
      if(shouldResetAnimation(isUpwards)) {
        el.className = oldClasses;
        return;
      }
      el.className = params.up || params.down;
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
    });
  }
}